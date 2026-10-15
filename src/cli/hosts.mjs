// Start the repo's dev server with the editor added. Vue and React repos
// get a Vite server (the repo's own Vite and plugins); Nuxt repos run
// Nuxt's dev server with the editor module added through overrides.
// Nothing in the repo is modified.
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { dsePlugin } from './plugin.mjs'
import { importFrom, packageDir } from './resolve.mjs'

const NEXT_SHIMS = ['link', 'image', 'navigation', 'router', 'dynamic', 'script', 'headers', 'font/google', 'font/local']

/** JSON with comments and trailing commas (tsconfig), string-aware. */
function readJsonc(file) {
  const src = readFileSync(file, 'utf8')
  let out = ''
  for (let i = 0; i < src.length; i++) {
    const c = src[i]
    if (c === '"') {
      const start = i
      for (i++; i < src.length && src[i] !== '"'; i++) if (src[i] === '\\') i++
      out += src.slice(start, i + 1)
    } else if (c === '/' && src[i + 1] === '/') {
      while (i < src.length && src[i] !== '\n') i++
      out += '\n'
    } else if (c === '/' && src[i + 1] === '*') {
      i = src.indexOf('*/', i + 2)
      if (i < 0) break
      i++
    } else out += c
  }
  return JSON.parse(out.replace(/,(\s*[}\]])/g, '$1'))
}

/** Path aliases from the repo's tsconfig(s): `@/*` → `./src/*` … */
export function tsconfigAliases(root) {
  const out = []
  const seen = new Set()
  const visit = (file) => {
    if (seen.has(file) || !existsSync(file)) return
    seen.add(file)
    let json
    try {
      json = readJsonc(file)
    } catch {
      return
    }
    const dir = dirname(file)
    for (const ext of [json.extends].flat().filter((e) => typeof e === 'string' && e.startsWith('.')))
      visit(resolve(dir, ext.endsWith('.json') ? ext : `${ext}.json`))
    for (const ref of json.references ?? []) if (ref.path) visit(resolve(dir, ref.path.endsWith('.json') ? ref.path : join(ref.path, 'tsconfig.json')))
    const base = resolve(dir, json.compilerOptions?.baseUrl ?? '.')
    for (const [key, targets] of Object.entries(json.compilerOptions?.paths ?? {})) {
      const target = targets?.[0]
      if (!target) continue
      if (key.endsWith('/*') && target.endsWith('/*'))
        out.push({ find: new RegExp(`^${key.slice(0, -2).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}/`), replacement: `${resolve(base, target.slice(0, -2))}/` })
      else if (!key.includes('*')) out.push({ find: key, replacement: resolve(base, target) })
    }
  }
  for (const name of ['tsconfig.json', 'tsconfig.app.json', 'tsconfig.web.json']) visit(join(root, name))
  // First match wins: exact paths, then longer prefixes.
  const weight = (a) => (typeof a.find === 'string' ? 1e6 + a.find.length : a.find.source.length)
  return out.sort((a, b) => weight(b) - weight(a))
}

/**
 * tsconfig `paths`, resolved per importing file from its nearest
 * tsconfig: in a monorepo, `@/` means a different folder in each app.
 * Files outside the repo (specimens elsewhere) use the app root's.
 */
function tsconfigPathsPlugin(ctx) {
  const byDir = new Map()
  const configDirOf = (file) => {
    for (let dir = dirname(file); dir.startsWith(ctx.gitRoot); dir = dirname(dir)) {
      if (byDir.has(dir)) return dir
      if (['tsconfig.json', 'tsconfig.app.json', 'tsconfig.web.json'].some((n) => existsSync(join(dir, n)))) return dir
      if (dir === ctx.gitRoot) break
    }
    return ctx.root
  }
  const aliasesFor = (importer) => {
    const dir = importer && importer.startsWith(ctx.gitRoot) && !importer.startsWith(ctx.configDir) ? configDirOf(importer) : ctx.root
    if (!byDir.has(dir)) byDir.set(dir, tsconfigAliases(dir))
    return byDir.get(dir)
  }
  return {
    name: 'design-system-editor:tsconfig-paths',
    enforce: 'pre',
    async resolveId(id, importer, options) {
      if (id.startsWith('\0') || id.startsWith('.') || id.startsWith('/')) return
      for (const a of aliasesFor(importer?.split('?')[0])) {
        const hit = typeof a.find === 'string' ? id === a.find : a.find.test(id)
        if (!hit) continue
        const mapped = id.replace(a.find, a.replacement)
        const resolved = await this.resolve(mapped, importer, { ...options, skipSelf: true })
        if (resolved) return resolved
      }
    }
  }
}

/**
 * Specimens, setup and adapters may live outside the app (a design/ folder
 * next to apps/web, an example elsewhere, this package): their imports
 * resolve as if from the app, so they share its Vue/React and libraries.
 */
function fromAppPlugin(ctx) {
  const outside = [ctx.configDir, join(ctx.pkgDir, 'src')]
  const anchor = join(ctx.root, 'package.json')
  return {
    name: 'design-system-editor:from-app',
    enforce: 'pre',
    async resolveId(id, importer, options) {
      if (!importer || /^[./\0]/.test(id) || id.includes(':')) return
      const file = importer.split('?')[0]
      if (!outside.some((d) => file.startsWith(`${d}/`)) || file.includes('/node_modules/')) return
      return (await this.resolve(id, anchor, { ...options, skipSelf: true })) ?? undefined
    }
  }
}

function deps(root) {
  try {
    const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'))
    return Object.keys({ ...pkg.dependencies, ...pkg.devDependencies })
  } catch {
    return []
  }
}
const hasDep = (root, name) => deps(root).includes(name)

export async function runVite(ctx) {
  // Tailwind (PostCSS) scans for classes from the working directory.
  process.chdir(ctx.root)
  const vite = await importFrom(ctx.root, 'vite')
  const react = ctx.framework === 'react'
  const repoConfig = ctx.vite.config ? resolve(ctx.root, ctx.vite.config) : false
  const plugins = []
  if (!repoConfig) {
    const fw = await importFrom(ctx.root, react ? '@vitejs/plugin-react' : '@vitejs/plugin-vue')
    plugins.push(fw.default())
    const tailwind = await importFrom(ctx.root, '@tailwindcss/vite', false)
    if (tailwind) plugins.push(tailwind.default())
  }
  plugins.push(tsconfigPathsPlugin(ctx), fromAppPlugin(ctx), dsePlugin(ctx), ...(ctx.vite.plugins ?? []))

  const alias = [
    { find: /^@repo\//, replacement: `${ctx.root}/` },
    ...Object.entries(ctx.vite.alias ?? {}).map(([find, to]) => ({ find, replacement: resolve(ctx.root, to) })),
    // Vue stories render templates (`template: '<Button v-bind="args" />'`),
    // which need Vue's build with the template compiler.
    ...(!react && ctx.systems.some((s) => s.stories.length) && packageDir(ctx.root, 'vue')
      ? [{ find: /^vue$/, replacement: join(packageDir(ctx.root, 'vue'), 'dist/vue.esm-bundler.js') }]
      : []),
    ...(react && hasDep(ctx.root, 'next')
      ? NEXT_SHIMS.map((m) => ({ find: `next/${m}`, replacement: join(ctx.pkgDir, 'src/shims/next', `${m.replace('/', '-')}.mjs`) }))
      : [])
  ]
  // Next.js inlines NEXT_PUBLIC_* at build time; do the same here.
  const env = react ? vite.loadEnv('development', ctx.root, 'NEXT_PUBLIC_') : {}

  const server = await vite.createServer({
    root: ctx.root,
    configFile: repoConfig,
    plugins,
    clearScreen: false,
    // No index.html (an app with several pages): serve its .html files by path.
    appType: existsSync(join(ctx.root, 'index.html')) ? 'spa' : readdirSync(ctx.root).some((f) => f.endsWith('.html')) ? 'mpa' : 'custom',
    resolve: { alias, dedupe: react ? ['react', 'react-dom'] : ['vue'] },
    define: {
      ...(react ? { 'process.env': JSON.stringify({ NODE_ENV: 'development', ...env }) } : {}),
      ...ctx.vite.define
    },
    server: {
      port: ctx.port,
      fs: { allow: [ctx.gitRoot, ctx.configDir, ctx.pkgDir, packageDir(ctx.root, react ? 'react' : 'vue') ?? ctx.root] }
    }
  })
  await server.listen()
  const url = server.resolvedUrls?.local?.[0] ?? `http://localhost:${ctx.port}/`
  console.log(`\n  Design system editor  ${url}__dse/\n`)
  return server
}

export async function runNuxt(ctx) {
  process.chdir(ctx.root)
  globalThis.__DSE_CONTEXT__ = ctx
  const cli = await importFrom(ctx.root, '@nuxt/cli', false)
  if (!cli?.runCommand) throw new Error('Nuxt repo, but @nuxt/cli was not found in its node_modules.')
  await cli.runCommand('dev', [ctx.root, '--no-fork', '--port', String(ctx.port)], {
    overrides: {
      modules: [join(ctx.pkgDir, 'src/nuxt/module.mjs')],
      // Its floating button would sit on top of the editor.
      devtools: { enabled: false },
      vite: { server: { fs: { allow: [ctx.gitRoot, ctx.configDir, ctx.pkgDir] } } }
    }
  })
  console.log(`\n  Design system editor  http://localhost:${ctx.port}/__dse\n`)
}
