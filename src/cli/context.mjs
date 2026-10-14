// Turns design.config + CLI flags into everything the hosts need.
import { execFileSync } from 'node:child_process'
import { existsSync, readFileSync } from 'node:fs'
import { dirname, isAbsolute, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createJiti } from 'jiti'

export const PKG_DIR = resolve(dirname(fileURLToPath(import.meta.url)), '../..')

const CONFIG_NAMES = ['design/dse.config.ts', 'design/dse.config.mjs', 'design/dse.config.js', 'dse.config.ts', 'dse.config.mjs']

export const DEFAULT_CODE = ['**/*.{vue,ts,tsx,js,jsx,mjs,css,astro,svelte,html}']
export const IGNORE = [
  '**/node_modules/**',
  '**/dist/**',
  '**/build/**',
  '**/.nuxt/**',
  '**/.output/**',
  '**/.next/**',
  '**/out/**',
  '**/coverage/**',
  '**/.git/**',
  '**/*.d.ts',
  '**/*.min.*',
  '**/*.map',
  '**/playwright-report/**',
  '**/test-results/**'
]

function findConfig(cwd, explicit) {
  if (explicit) return resolve(cwd, explicit)
  for (const name of CONFIG_NAMES) if (existsSync(join(cwd, name))) return join(cwd, name)
  throw new Error(`No design config found. Looked for ${CONFIG_NAMES.join(', ')} in ${cwd}.`)
}

function gitRoot(dir) {
  try {
    return execFileSync('git', ['-C', dir, 'rev-parse', '--show-toplevel'], { encoding: 'utf8' }).trim()
  } catch {
    return dir
  }
}

const list = (v) => (v === undefined ? [] : Array.isArray(v) ? v : [v])

/** @returns {Promise<import('./types').Context>} */
export async function loadContext({ cwd = process.cwd(), config: explicit, root: rootFlag, port }) {
  const configFile = findConfig(cwd, explicit)
  const configDir = dirname(configFile)
  // The config imports this package; it may run through npx, uninstalled.
  const jiti = createJiti(import.meta.url, {
    interopDefault: true,
    moduleCache: false,
    alias: { 'design-system-editor': join(PKG_DIR, 'src/index.mjs') }
  })
  const config = await jiti.import(configFile, { default: true })

  // The app root: --root, else config.root (relative to the config file),
  // else the folder that holds design/ (or the config itself).
  const root = rootFlag
    ? resolve(cwd, rootFlag)
    : config.root
      ? resolve(configDir, config.root)
      : configDir.endsWith('/design')
        ? dirname(configDir)
        : configDir
  const git = gitRoot(root)
  const fromConfig = (p) => (isAbsolute(p) ? p : resolve(configDir, p))

  const shared = {
    theme: config.theme,
    css: config.css,
    code: config.code,
    kit: config.kit,
    specimens: config.specimens,
    stories: config.stories,
    public: config.public
  }
  const systems = (config.systems?.length ? config.systems : [{ id: 'default', label: config.name ?? 'Design system', ...shared }]).map(
    (s) => ({
      id: s.id,
      label: s.label ?? s.id,
      theme: list(s.theme ?? shared.theme),
      css: list(s.css ?? shared.css ?? s.theme ?? shared.theme),
      code: list(s.code ?? shared.code ?? DEFAULT_CODE),
      kits: list(s.kit ?? shared.kit).map((k) => k.replace(/\/$/, '')),
      stories: list(s.stories ?? shared.stories),
      verify: list(s.verify),
      // Static folders served at /, like Vite's publicDir (apps in a
      // monorepo each have their own).
      public: list(s.public ?? shared.public),
      specimens: list(s.specimens ?? shared.specimens ?? 'specimens/**/*.{ts,tsx,js,jsx,mjs}').map(fromConfig),
      setup: s.setup ? fromConfig(s.setup) : config.setup ? fromConfig(config.setup) : null
    })
  )
  if (!systems[0]?.theme.length) throw new Error('design config: `theme` (your @theme CSS files) is required.')

  const framework = config.framework ?? detectFramework(root)
  return {
    pkgDir: PKG_DIR,
    configFile,
    configDir,
    root,
    gitRoot: git,
    repoPrefix: relative(git, root),
    name: config.name ?? root.split('/').pop(),
    framework,
    systems,
    prototype: config.prototype ?? (framework === 'vue' ? null : null),
    verify: list(config.verify),
    scopeClass: config.scopeClass ?? '',
    head: config.head ?? '',
    vite: config.vite ?? {},
    nuxt: config.nuxt ?? {},
    port: Number(port ?? config.port ?? 5290)
  }
}

function detectFramework(root) {
  try {
    const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'))
    const deps = { ...pkg.dependencies, ...pkg.devDependencies }
    if (deps.nuxt) return 'nuxt'
    if (deps.react) return 'react'
  } catch {
    /* default */
  }
  return 'vue'
}
