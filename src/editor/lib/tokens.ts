import { project } from './project'
import { NAMESPACE_ORDER, NAMESPACES, namespaceOf, SUB_NAMESPACE, type Namespace } from './theme'

/**
 * Every design token, read straight from the `@theme` blocks of the repo's
 * theme CSS (project.theme) so the editor never drifts from the source. Works
 * for any Tailwind v4 theme: every `--name: value` declared in a `@theme`
 * block is a token, grouped by namespace (theme.ts). Keyframes declared in
 * the theme are kept for the animations that use them.
 */
export type TokenGroup = string

export interface Token {
  name: string
  value: string
  group: TokenGroup
  /** For sub-properties (`text-ui--line-height`): the token they belong to. */
  parent?: string
  /** shadcn-style themes: `--color-x: var(--x)` points at a `:root`
   *  variable, which holds the real value (and is what utilities read). */
  alias?: string
  /** Declared in `@theme inline`: Tailwind inlines it into utilities and
   *  emits no `--name` variable. */
  inline?: boolean
  /** Declared on `:root` rather than in `@theme` (no Tailwind utility). */
  root?: boolean
}

/** Plain CSS variables declared on `:root` (shadcn's raw values). */
export const RAW_VARS = new Map<string, string>()

/** The CSS variable that actually carries a token's value at runtime. */
export const cssVarName = (t: Token): string => t.alias ?? t.name
/** A token's value in source (through its `:root` alias, if any). */
export const baseValue = (t: Token): string => (t.alias ? (RAW_VARS.get(t.alias) ?? t.value) : t.value)

/** `@keyframes name { … }` declared inside `@theme`, by name. */
export const KEYFRAMES = new Map<string, string>()

const stripComments = (css: string): string => css.replace(/\/\*[\s\S]*?\*\//g, '')

/** Index just past the block that opens at `open` (a `{`). */
function blockEnd(css: string, open: number): number {
  let depth = 0
  for (let i = open; i < css.length; i++) {
    if (css[i] === '{') depth++
    else if (css[i] === '}' && --depth === 0) return i + 1
  }
  return css.length
}

/** The body of every `@theme`, `@theme inline`, `@theme static` … block. */
function themeBlocks(css: string): { body: string; inline: boolean }[] {
  const out: { body: string; inline: boolean }[] = []
  for (const m of css.matchAll(/@theme\b([^{;]*)\{/g)) {
    const open = m.index + m[0].length - 1
    out.push({ body: css.slice(open + 1, blockEnd(css, open) - 1), inline: /\binline\b/.test(m[1]!) })
  }
  return out
}

/** `:root { --x: … }` blocks (light theme values; `.dark` is ignored). */
function rootBlocks(css: string): string[] {
  const out: string[] = []
  for (const m of css.matchAll(/(^|[\s,}])(:root|html)\s*\{/g)) {
    const open = m.index + m[0].length - 1
    out.push(css.slice(open + 1, blockEnd(css, open) - 1))
  }
  return out
}

/** Top-level `--name: value;` declarations of a theme block. Nested blocks
 *  (keyframes) are skipped, and kept aside when they are keyframes. */
function declarations(block: string): [string, string][] {
  const out: [string, string][] = []
  let buf = ''
  for (let i = 0; i < block.length; i++) {
    const c = block[i]!
    if (c === '{') {
      const end = blockEnd(block, i)
      const kf = /@keyframes\s+([\w-]+)\s*$/.exec(buf)
      if (kf) KEYFRAMES.set(kf[1]!, `@keyframes ${kf[1]} ${block.slice(i, end)}`)
      i = end - 1
      buf = ''
    } else if (c === ';') {
      const d = /^\s*--([\w-]+)\s*:\s*([\s\S]*)$/.exec(buf)
      if (d) out.push([d[1]!, d[2]!.replace(/\s+/g, ' ').trim()])
      buf = ''
    } else buf += c
  }
  return out
}

function toToken(name: string, value: string, inline: boolean): Token {
  // shadcn's mapping, `--color-background: var(--background)`: the theme
  // token is a name for the :root variable, which holds the value. Other
  // references (`--focus-ring: var(--color-primary)`) are just references.
  const ref = /^var\(--([\w-]+)\)$/.exec(value)?.[1]
  const mapped = !!ref && RAW_VARS.has(ref) && name.slice(namespaceOf(name).prefix.length) === ref
  const extra = { ...(mapped ? { alias: ref } : {}), ...(inline ? { inline } : {}) }
  const sub = /^(.+?)--([\w-]+)$/.exec(name)
  if (sub) {
    const [, parent, prop] = sub as unknown as [string, string, string]
    return { name, value, parent, group: SUB_NAMESPACE[prop] ?? namespaceOf(parent).id, ...extra }
  }
  return { name, value, group: namespaceOf(name).id, ...extra }
}

function parse(sources: string[]): Token[] {
  RAW_VARS.clear()
  for (const css of sources)
    for (const block of rootBlocks(stripComments(css)))
      for (const [name, value] of declarations(block)) if (!RAW_VARS.has(name)) RAW_VARS.set(name, value)
  const byName = new Map<string, Token>()
  for (const css of sources)
    for (const { body, inline } of themeBlocks(stripComments(css)))
      for (const [name, value] of declarations(body)) {
        // `--color-*: initial` resets Tailwind's defaults; not a token.
        if (name.includes('*') || value === 'initial') continue
        byName.set(name, toToken(name, value, inline))
      }
  // Semantic variables declared on :root are tokens too, unless a theme
  // token already points at them (shadcn's raw values).
  const aliased = new Set([...byName.values()].map((t) => t.alias).filter(Boolean))
  for (const [name, value] of RAW_VARS) {
    if (aliased.has(name) || byName.has(name) || name.startsWith('tw-')) continue
    byName.set(name, { ...toToken(name, value, false), root: true })
  }
  const rank = (g: string): number => {
    const i = NAMESPACE_ORDER.indexOf(g)
    return i < 0 ? NAMESPACE_ORDER.length : i
  }
  return [...byName.values()].sort(
    (a, b) =>
      rank(a.group) - rank(b.group) ||
      (rank(a.group) === NAMESPACE_ORDER.length ? a.group.localeCompare(b.group) : 0)
  )
}

export let TOKENS: Token[] = []
export const tokensIn = (group: TokenGroup): Token[] => TOKENS.filter((t) => t.group === group)
export const tokenByNameIn = (name: string): Token | undefined => TOKENS.find((t) => t.name === name)

/** Groups that have tokens, in namespace order, with their namespace. */
export let GROUPS: { ns: Namespace; tokens: Token[] }[] = []

/** Parse the repo's theme. Called once before the app mounts. */
export function initTokens(): void {
  KEYFRAMES.clear()
  TOKENS = parse(Object.values(project.theme))
  GROUPS = [...new Set(TOKENS.map((t) => t.group))].map((g) => ({
    ns: NAMESPACES.find((n) => n.id === g) ?? namespaceOf(`${g}-x`),
    tokens: tokensIn(g)
  }))
}
export const groupLabel = (g: TokenGroup): string =>
  GROUPS.find((x) => x.ns.id === g)?.ns.label ?? g

/** A value with every var(--x) replaced by x's value (tokens, then :root),
 *  for parsing colors and sizes behind references. */
export function resolveValue(value: string, draftOf?: (name: string) => string | undefined, depth = 0): string {
  if (depth > 8) return value
  return value.replace(/var\(--([\w-]+)(?:,\s*([^)]*))?\)/g, (m, name: string, fallback?: string) => {
    const t = TOKENS.find((x) => x.name === name)
    const v = draftOf?.(name) ?? (t ? baseValue(t) : RAW_VARS.get(name)) ?? fallback
    return v === undefined ? m : resolveValue(v, draftOf, depth + 1)
  })
}

/** Short label: `color-muted-foreground` -> `muted-foreground`;
 *  `text-ui--line-height` -> `ui`. */
export function shortName(t: Pick<Token, 'name' | 'parent'>): string {
  if (t.parent) {
    const base = shortName({ name: t.parent })
    const prop = t.name.slice(t.parent.length + 2)
    return SUB_NAMESPACE[prop] ? base : `${base} ${prop}`
  }
  const ns = namespaceOf(t.name)
  return t.name === ns.prefix || !t.name.startsWith(ns.prefix)
    ? t.name
    : t.name.slice(ns.prefix.length) || t.name
}

/** Pixel value of a size token, or null when it isn't a plain px value. */
export const px = (value: string): number | null => {
  const m = /^(-?\d+(?:\.\d+)?)px$/.exec(value.trim())
  if (m) return Number(m[1])
  const rem = /^(-?\d+(?:\.\d+)?)rem$/.exec(value.trim())
  return rem ? Number(rem[1]) * 16 : null
}

/** Size tokens that must sit on the 4px grid (theme.ts `grid`). */
export const GRID_GROUPS: TokenGroup[] = NAMESPACES.filter((n) => n.grid).map((n) => n.id)
export const onGrid = (value: string): boolean => {
  const n = px(value)
  return n === null || n % 4 === 0
}

/** Short, readable value for lists: text as size / leading, long values
 *  trimmed. */
export function displayValue(t: Token, value: string, leading?: string): string {
  if (t.group === 'text') return leading ? `${value} / ${leading}` : value
  return value.length > 28 ? `${value.slice(0, 26)}…` : value
}
