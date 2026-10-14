// Resolve and import packages from the repo being edited (not from this
// package), so the dev server uses the repo's own Vite, framework plugins,
// Tailwind and Nuxt versions.
import { existsSync, readFileSync, realpathSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { pathToFileURL } from 'node:url'

/** Directory of package `name` as seen from `from` (walks node_modules up). */
export function packageDir(from, name) {
  for (let dir = from; ; dir = dirname(dir)) {
    const candidate = join(dir, 'node_modules', name)
    if (existsSync(join(candidate, 'package.json'))) return realpathSync(candidate)
    if (dirname(dir) === dir) return null
  }
}

function pickExport(entry) {
  if (typeof entry === 'string') return entry
  if (!entry || typeof entry !== 'object') return null
  for (const key of ['import', 'module', 'default', 'node']) {
    const hit = pickExport(entry[key])
    if (hit) return hit
  }
  return null
}

/** The ESM entry file of `name[/subpath]` as seen from `from`, or null. */
export function resolveFrom(from, name) {
  const parts = name.startsWith('@') ? name.split('/') : [name.split('/')[0], ...name.split('/').slice(1)]
  const pkgName = name.startsWith('@') ? parts.slice(0, 2).join('/') : parts[0]
  const sub = (name.startsWith('@') ? parts.slice(2) : parts.slice(1)).join('/')
  const dir = packageDir(from, pkgName)
  if (!dir) return null
  const pkg = JSON.parse(readFileSync(join(dir, 'package.json'), 'utf8'))
  const key = sub ? `./${sub}` : '.'
  const target = pkg.exports
    ? pickExport(typeof pkg.exports === 'string' || key === '.' && !pkg.exports['.'] ? pkg.exports : pkg.exports[key])
    : sub
      ? sub
      : (pkg.module ?? pkg.main ?? 'index.js')
  return target ? join(dir, target) : null
}

/** Import `name` from the repo; fall back to this package's own copy. */
export async function importFrom(from, name, fallback = true) {
  const file = resolveFrom(from, name)
  if (file) return import(pathToFileURL(file).href)
  if (!fallback) return null
  return import(name)
}
