// The Vite plugin behind every host: serves the editor page (/__dse) and
// two virtual modules - the entry (repo CSS, adapter, setup, specimens,
// editor bundle) and the project data (the repo's theme and code).
import { createReadStream, existsSync, statSync } from 'node:fs'
import { readFile, stat } from 'node:fs/promises'
import { extname, join, relative } from 'node:path'
import { glob } from 'tinyglobby'
import { IGNORE } from './context.mjs'

const ENTRY = 'virtual:dse/entry'
// Nuxt: one static entry (imported by the page) that loads a system's entry.
const NUXT_ENTRY = 'virtual:dse/nuxt-entry'
const NUXT_SYSTEM = 'virtual:dse/nuxt-system'
const PROJECT = 'virtual:dse/project'
const MAX_FILE = 512 * 1024

const fsUrl = (abs) => JSON.stringify(`/@fs${abs}`)

function systemOf(ctx, id) {
  const q = new URLSearchParams(id.split('?')[1] ?? '')
  return ctx.systems.find((s) => s.id === q.get('system')) ?? ctx.systems[0]
}

async function readAll(root, patterns, ignore = IGNORE) {
  const files = await glob(patterns, { cwd: root, ignore, dot: false, absolute: true })
  const out = {}
  for (const abs of files.sort()) {
    try {
      if ((await stat(abs)).size > MAX_FILE) continue
      out[relative(root, abs)] = await readFile(abs, 'utf8')
    } catch {
      /* unreadable: skip */
    }
  }
  return out
}

/** What the editor needs to know about the repo, for one system. */
export async function projectData(ctx, sys) {
  return {
    name: ctx.name,
    framework: ctx.framework,
    root: ctx.root,
    repoPrefix: ctx.repoPrefix,
    systems: ctx.systems.map((s) => ({ id: s.id, label: s.label })),
    system: { id: sys.id, label: sys.label, kits: sys.kits, theme: sys.theme },
    theme: await readAll(ctx.root, sys.theme, []),
    code: await readAll(ctx.root, sys.code),
    prototype: ctx.prototype ?? null,
    verify: sys.verify.length ? sys.verify : ctx.verify,
    scopeClass: ctx.scopeClass
  }
}

/** Named exports in source order (a module namespace sorts them). */
const exportOrder = (src) =>
  [...src.matchAll(/^export\s+(?:const|let|var|function)\s+([\w$]+)/gm)].map((m) => m[1])

async function entryCode(ctx, sys, nuxt) {
  const specimens = sys.specimens.length ? (await glob(sys.specimens, { absolute: true, ignore: ['**/node_modules/**'] })).sort() : []
  const stories = sys.stories.length ? (await glob(sys.stories, { cwd: ctx.root, absolute: true, ignore: IGNORE })).sort() : []
  const css = nuxt ? [] : await glob(sys.css, { cwd: ctx.root, absolute: true, ignore: IGNORE })
  const react = ctx.framework === 'react'
  const adapterFile = join(ctx.pkgDir, 'src/adapters', react ? 'react.mjs' : 'vue.mjs')
  const create = react ? 'createReactAdapter' : 'createVueAdapter'
  const lines = [
    ...css.map((f) => `import ${fsUrl(f)}`),
    `import ${fsUrl(join(ctx.pkgDir, 'dist/editor/editor.css'))}`,
    `import { startEditor } from ${fsUrl(join(ctx.pkgDir, 'dist/editor/index.js'))}`,
    `import { ${create} } from ${fsUrl(adapterFile)}`,
    `import project from ${JSON.stringify(`${PROJECT}?system=${sys.id}`)}`,
    sys.setup ? `import setup from ${fsUrl(sys.setup)}` : 'const setup = undefined',
    ...specimens.map((f, i) => `import * as s${i} from ${fsUrl(f)}`),
    `const specimens = [${specimens.map((_, i) => `s${i}`).join(', ')}].flatMap((m) => {`,
    '  const d = m.default ?? Object.values(m).find((v) => v && typeof v === "object" && v.id)',
    '  return Array.isArray(d) ? d : d ? [d] : []',
    '})'
  ]
  // Storybook stories, after the specimens: a specimen with the same id wins.
  if (stories.length)
    lines.push(
      `import { fromStories } from ${fsUrl(join(ctx.pkgDir, 'src/stories.mjs'))}`,
      ...(react ? [] : ["import { reactive } from 'vue'"]),
      ...stories.map((f, i) => `import * as t${i} from ${fsUrl(f)}`),
      `const order = ${JSON.stringify(Object.fromEntries(await Promise.all(stories.map(async (f) => [relative(ctx.root, f), exportOrder(await readFile(f, 'utf8'))]))))}`,
      `specimens.push(...fromStories({ ${stories.map((f, i) => `${JSON.stringify(relative(ctx.root, f))}: t${i}`).join(', ')} }, { framework: ${JSON.stringify(react ? 'react' : 'vue')}, order${react ? '' : ', reactive'} }))`
    )
  if (nuxt)
    lines.push(
      'export async function boot(app) {',
      `  const adapter = await ${create}({ app })`,
      '  await startEditor({ adapter, specimens, project })',
      '}'
    )
  else
    lines.push(
      `const adapter = await ${create}(${react ? '{ wrapper: setup }' : '{ setup }'})`,
      'await startEditor({ adapter, specimens, project })'
    )
  return lines.join('\n')
}

const page = (ctx, sys) => `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Design system editor</title>
    ${ctx.head ?? ''}
  </head>
  <body>
    <script type="module" src="/@id/${ENTRY}?system=${encodeURIComponent(sys.id)}"></script>
  </body>
</html>`

const SELF_EXPORTS = {
  '.': 'src/index.mjs',
  './specimens': 'src/specimens.mjs',
  './stories': 'src/stories.mjs',
  './adapters/vue': 'src/adapters/vue.mjs',
  './adapters/react': 'src/adapters/react.mjs'
}

const MIME = { '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.gif': 'image/gif', '.avif': 'image/avif', '.woff2': 'font/woff2', '.woff': 'font/woff', '.mp4': 'video/mp4', '.webm': 'video/webm', '.json': 'application/json', '.ico': 'image/x-icon' }

export function dsePlugin(ctx, { nuxt = false } = {}) {
  const publicDirs = [...new Set(ctx.systems.flatMap((s) => s.public.map((d) => join(ctx.root, d))))]
  /** A file in a system's public folder for a URL path, if any. */
  const publicFile = (path) => {
    if (!publicDirs.length || path.includes('..')) return null
    if (existsSync(join(ctx.root, path))) return null
    for (const dir of publicDirs) {
      const file = join(dir, decodeURIComponent(path))
      if (existsSync(file) && statSync(file).isFile()) return file
    }
    return null
  }
  let entries = null
  const cssEntries = async () =>
    (entries ??= new Set(
      (await Promise.all(ctx.systems.map((s) => glob(s.css, { cwd: ctx.root, absolute: true, ignore: IGNORE })))).flat()
    ))
  return {
    name: 'design-system-editor',
    enforce: 'pre',
    resolveId(id) {
      // This package's own entry points, for repos that run it through npx
      // without installing it.
      if (id === 'design-system-editor' || id.startsWith('design-system-editor/')) {
        const sub = id.slice('design-system-editor'.length) || '.'
        const target = SELF_EXPORTS[sub === '.' ? '.' : `.${sub}`]
        if (target) return join(ctx.pkgDir, target)
      }
      // `import logo from '/icons/logo.svg'` from an app's public folder.
      if (id.startsWith('/') && !id.startsWith('/@') && !id.startsWith(ctx.root)) {
        const file = publicFile(id.split('?')[0])
        if (file) return file + (id.includes('?') ? id.slice(id.indexOf('?')) : '')
      }
      if (id.startsWith(ENTRY) || id.startsWith(NUXT_ENTRY) || id.startsWith(NUXT_SYSTEM) || id.startsWith(PROJECT))
        return `\0${id}`
    },
    // Specimens may live outside the folder Tailwind scans (design/ next to
    // apps/web, or an example elsewhere): add them as a source of the repo's
    // CSS entries, in memory only.
    async transform(code, id) {
      const file = id.split('?')[0]
      if (!file.endsWith('.css') || !/@import\s+['"]tailwindcss/.test(code)) return
      if (!(await cssEntries()).has(file)) return
      return `${code}\n@source ${JSON.stringify(ctx.configDir)};\n`
    },
    async load(id) {
      if (!id.startsWith('\0virtual:dse/')) return
      const raw = id.slice(1)
      const sys = systemOf(ctx, raw)
      if (raw.startsWith(PROJECT)) return `export default ${JSON.stringify(await projectData(ctx, sys))}`
      if (raw.startsWith(NUXT_ENTRY))
        return [
          'const systems = {',
          ...ctx.systems.map((s) => `  ${JSON.stringify(s.id)}: () => import(${JSON.stringify(`${NUXT_SYSTEM}?system=${s.id}`)}),`),
          '}',
          'export async function boot(app, system) {',
          `  const load = systems[system] ?? systems[${JSON.stringify(ctx.systems[0].id)}]`,
          '  await (await load()).boot(app)',
          '}'
        ].join('\n')
      return entryCode(ctx, sys, raw.startsWith(NUXT_SYSTEM))
    },
    configureServer(server) {
      // Specimens, setup and config live in the design folder: when they
      // change (or files are added), regenerate the entry and reload.
      // Repo code changes refresh the project data on the next load.
      server.watcher.add(ctx.configDir)
      const invalidate = (file) => {
        for (const mod of server.moduleGraph.idToModuleMap.values())
          if (mod.id?.startsWith('\0virtual:dse/')) server.moduleGraph.invalidateModule(mod)
        if (file.startsWith(ctx.configDir)) server.ws.send({ type: 'full-reload' })
      }
      for (const ev of ['add', 'unlink', 'change']) server.watcher.on(ev, invalidate)
      if (nuxt) return
      if (publicDirs.length)
        server.middlewares.use((req, res, next) => {
          const file = req.method === 'GET' ? publicFile(new URL(req.url ?? '/', 'http://x').pathname) : null
          if (!file) return next()
          res.setHeader('content-type', MIME[extname(file)] ?? 'application/octet-stream')
          createReadStream(file).pipe(res)
        })
      server.middlewares.use(async (req, res, next) => {
        const url = new URL(req.url ?? '/', 'http://localhost')
        // The bare server URL opens the editor when the app has no page there.
        if (url.pathname === '/' && !existsSync(join(ctx.root, 'index.html'))) {
          res.writeHead(302, { location: '/__dse/' })
          return res.end()
        }
        if (url.pathname !== '/__dse' && url.pathname !== '/__dse/') return next()
        try {
          const sys = ctx.systems.find((s) => s.id === url.searchParams.get('system')) ?? ctx.systems[0]
          const html = await server.transformIndexHtml(url.pathname + url.search, page(ctx, sys))
          res.setHeader('content-type', 'text/html')
          res.end(html)
        } catch (e) {
          next(e)
        }
      })
    }
  }
}
