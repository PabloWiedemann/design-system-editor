import { inKit, project } from '../project'
import { namespaceOf } from '../theme'
import { shortName, type Token } from '../tokens'

/**
 * Where a token or component is used across the repo (the blast radius of
 * changing it). Scans the source the dev server sent (project.code).
 */
const isTheme = (src: string): boolean => /@theme\b/.test(src)

export type Area = 'Kit' | 'Components' | 'Pages' | 'Other'
export interface FileUse {
  path: string
  area: Area
  count: number
  /** Distinct utilities found, e.g. ['bg-…', 'hover:text-…']. */
  utilities: string[]
}
export interface Usage {
  files: FileUse[]
  total: number
}

const areaOf = (path: string): Area =>
  project.system.kits.length && inKit(path)
    ? 'Kit'
    : /(^|\/)(pages|app|routes|views|layouts|portal)\//.test(path)
      ? 'Pages'
      : /(^|\/)(components|parts|ui|widgets)\//.test(path)
        ? 'Components'
        : 'Other'

const esc = (x: string): string => x.replace(/[.*+?^${}()|[\]\\-]/g, '\\$&')

/** Utilities that use the token (from its namespace, theme.ts), plus
 *  var(--token). Sub-properties (`text-ui--line-height`) are used through
 *  their parent's utility. Breakpoints are used as variants (`md:`). */
function pattern(t: Token): RegExp {
  const owner = t.parent ?? t.name
  const ns = namespaceOf(owner)
  const s = esc(shortName({ name: owner }))
  const v = `var\\(--${esc(t.name)}\\)${t.alias ? `|var\\(--${esc(t.alias)}\\)` : ''}`
  const after = '(?:\\/\\d+)?(?![\\w-])'
  const before = '(?<![\\w-])(?:[\\w\\-\\[\\]=:]+:)?'
  if (ns.id === 'breakpoint') return new RegExp(`(?<![\\w-])(?:max-)?${s}:|${v}`, 'g')
  if (!ns.utilities.length) return new RegExp(v, 'g')
  return new RegExp(`${before}(?:${ns.utilities.join('|')})-${s}${after}|${v}`, 'g')
}

const cache = new Map<string, Usage>()

export function usageOf(t: Token): Usage {
  const hit = cache.get(t.name)
  if (hit) return hit
  const re = pattern(t)
  const files: FileUse[] = []
  for (const [path, src] of Object.entries(project.code)) {
    if (isTheme(src)) continue
    const found = src.match(re)
    if (!found) continue
    files.push({
      path,
      area: areaOf(path),
      count: found.length,
      utilities: [...new Set(found)].slice(0, 4)
    })
  }
  files.sort((a, b) => b.count - a.count)
  const usage = { files, total: files.reduce((n, f) => n + f.count, 0) }
  cache.set(t.name, usage)
  return usage
}

/** Raw source of a file in the kit (`Button.vue`, `button.tsx`…). */
export const kitSource = (file: string): string =>
  project.system.kits.map((k) => project.code[`${k}/${file}`]).find((s) => s !== undefined) ??
  project.code[file] ??
  ''

/** How many times a class appears as a whole word in quoted strings. */
export function occurrences(src: string, cls: string): number {
  let n = 0
  for (const m of src.matchAll(/(['"`])([^'"`\n]*)\1/g))
    for (const w of m[2]!.split(/\s+/)) if (w === cls) n++
  return n
}

/** Where a kit component is used: `<Name …>` in templates and JSX. */
export function componentUsage(name: string): Usage {
  const key = `component:${name}`
  const hit = cache.get(key)
  if (hit) return hit
  const re = new RegExp(`<${esc(name)}(?=[\\s/>])`, 'g')
  const files: FileUse[] = []
  for (const [path, src] of Object.entries(project.code)) {
    if (!/\.(vue|[jt]sx)$/.test(path)) continue
    if (new RegExp(`(^|/)${esc(name)}\\.(vue|[jt]sx)$`, 'i').test(path)) continue
    const found = src.match(re)
    if (!found) continue
    files.push({ path, area: areaOf(path), count: found.length, utilities: [] })
  }
  files.sort((a, b) => b.count - a.count)
  const usage = { files, total: files.reduce((n, f) => n + f.count, 0) }
  cache.set(key, usage)
  return usage
}

export interface Snippet {
  path: string
  line: number
  code: string
}
/** The first `max` source lines that use a token, trimmed, for context. */
export function snippetsOf(t: Token, max = 3): Snippet[] {
  const re = pattern(t)
  const out: Snippet[] = []
  for (const [path, src] of Object.entries(project.code)) {
    if (isTheme(src)) continue
    const lines = src.split('\n')
    for (let i = 0; i < lines.length && out.length < max; i++) {
      re.lastIndex = 0
      const code = lines[i]!.trim()
      const hit = re.exec(code)
      if (!hit) continue
      // Long class strings: keep a window around the match so it shows.
      const from = Math.max(0, Math.min(hit.index - 70, code.length - 160))
      const cut = code.slice(from, from + 160)
      out.push({
        path,
        line: i + 1,
        code: (from > 0 ? '…' : '') + cut + (from + 160 < code.length ? '…' : '')
      })
    }
    if (out.length >= max) break
  }
  return out
}
