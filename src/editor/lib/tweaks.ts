import { computed, reactive, watch } from 'vue'
import { storageKey } from './project'
import { baseValue, cssVarName, TOKENS, tokenByNameIn, type Token } from './tokens'

/**
 * The draft: token value overrides, component token swaps and merges.
 * Applied live to the editor and the embedded prototype (CSS variables +
 * an injected stylesheet) and kept in localStorage. Nothing is written to
 * the repo: the draft leaves as llm.txt for a coding agent to apply.
 */
export interface Swap {
  /** Component id, axis and option the class belongs to (axis 'base' = all). */
  component: string
  componentName: string
  file: string
  axis: string
  option: string
  from: string
  to: string
  /** Token names before and after, for display. */
  fromToken: string
  toToken: string
  /** Draft-only CSS that previews the swap. */
  selector: string
  css: string
  /** CSS rule swaps: the declaration's property. */
  property?: string
}

interface Draft {
  tokens: Record<string, string>
  swaps: Swap[]
  /** Consolidation: token name -> the token it merges into. */
  merges: Record<string, string>
}

function load(): Draft {
  try {
    const d = JSON.parse(localStorage.getItem(storageKey('draft')) ?? '{}')
    return { tokens: d.tokens ?? {}, swaps: d.swaps ?? [], merges: d.merges ?? {} }
  } catch {
    return { tokens: {}, swaps: [], merges: {} }
  }
}

export const draft = reactive<Draft>({ tokens: {}, swaps: [], merges: {} })
export const overrides = draft.tokens

/** Every document that shows the draft (gallery + prototype iframe). */
const targets = new Set<Document>([document])
const STYLE_ID = 'dse-draft'

function applyTo(doc: Document): void {
  const style = doc.documentElement.style
  // Drafts go on the variable utilities read: the token's own, or its
  // `:root` alias (shadcn-style themes).
  for (const t of TOKENS) {
    const v = draft.tokens[t.name]
    if (v === undefined) style.removeProperty(`--${cssVarName(t)}`)
    else style.setProperty(`--${cssVarName(t)}`, v)
  }
  // A merged token points at the one it merges into (font sizes carry
  // their line-height with them).
  for (const [from, to] of Object.entries(draft.merges)) {
    const f = tokenByNameIn(from)
    const tt = tokenByNameIn(to)
    style.setProperty(`--${f ? cssVarName(f) : from}`, `var(--${tt ? cssVarName(tt) : to})`)
    if (from.startsWith('text-'))
      style.setProperty(`--${from}--line-height`, `var(--${to}--line-height)`)
  }
  let sheet = doc.getElementById(STYLE_ID)
  if (!sheet) {
    sheet = doc.createElement('style')
    sheet.id = STYLE_ID
    doc.head.appendChild(sheet)
  }
  sheet.textContent = [
    ...draft.swaps.map((s) => `${s.selector} { ${s.css} }`),
    ...shadowRules()
  ].join('\n')
}

/** Tailwind inlines shadow values into `shadow-*` utilities instead of
 *  reading --shadow-* variables, so drafted and merged shadows need their
 *  own rules to show up. */
function shadowRules(): string[] {
  const value = (name: string): string | undefined =>
    draft.tokens[name] ?? (tokenByNameIn(name) ? baseValue(tokenByNameIn(name)!) : undefined)
  const changed = new Map<string, string>()
  for (const t of TOKENS)
    if (t.group === 'shadow' && draft.tokens[t.name] !== undefined)
      changed.set(t.name, draft.tokens[t.name]!)
  for (const [from, to] of Object.entries(draft.merges))
    if (from.startsWith('shadow-') && value(to)) changed.set(from, value(to)!)
  return [...changed].map(([name, v]) => {
    const cls = name.replace(/^shadow-/, '')
    return `.shadow-${cls}, .hover\\:shadow-${cls}:hover { box-shadow: ${v} !important; }`
  })
}

/** Load this repo's saved draft and start applying it. Called once the
 *  theme is parsed. */
export function initDraft(): void {
  Object.assign(draft, load())
  watch(
    draft,
    (d) => {
      localStorage.setItem(storageKey('draft'), JSON.stringify(d))
      targets.forEach(applyTo)
    },
    { deep: true, immediate: true }
  )
}

export function attach(doc: Document): void {
  targets.add(doc)
  applyTo(doc)
}
export function detach(doc: Document): void {
  targets.delete(doc)
}

// ── Tokens ─────────────────────────────────────────────────
export const valueOf = (t: Token): string => draft.tokens[t.name] ?? baseValue(t)
export const isChanged = (t: Token): boolean =>
  draft.tokens[t.name] !== undefined && draft.tokens[t.name] !== baseValue(t)
export function setToken(t: Token, value: string): void {
  if (value === baseValue(t)) delete draft.tokens[t.name]
  else draft.tokens[t.name] = value
}
export function resetToken(t: Token): void {
  delete draft.tokens[t.name]
}

// ── Swaps ──────────────────────────────────────────────────
const swapKey = (s: Pick<Swap, 'component' | 'axis' | 'option' | 'from'>): string =>
  `${s.component}|${s.axis}|${s.option}|${s.from}`
/** The draft swap for a source class, if any. */
export const swapFor = (
  s: Pick<Swap, 'component' | 'axis' | 'option' | 'from'>
): Swap | undefined => draft.swaps.find((x) => swapKey(x) === swapKey(s))
export function setSwap(s: Swap): void {
  const i = draft.swaps.findIndex((x) => swapKey(x) === swapKey(s))
  if (s.to === s.from) {
    if (i >= 0) draft.swaps.splice(i, 1)
  } else if (i >= 0) draft.swaps[i] = s
  else draft.swaps.push(s)
}
export function removeSwap(s: Swap): void {
  const i = draft.swaps.findIndex((x) => swapKey(x) === swapKey(s))
  if (i >= 0) draft.swaps.splice(i, 1)
}

// ── Whole draft ────────────────────────────────────────────
export const changedTokens = computed(() => TOKENS.filter(isChanged))
export const changedCount = computed(
  () => changedTokens.value.length + draft.swaps.length + Object.keys(draft.merges).length
)

// ── Merges (consolidation) ─────────────────────────────────
export const mergedInto = (t: Token): string | undefined => draft.merges[t.name]
export function mergeToken(from: Token, to: Token | null): void {
  if (!to || to.name === from.name) delete draft.merges[from.name]
  else draft.merges[from.name] = to.name
}

// ── Scoped reverts ─────────────────────────────────────────
export const swapsOf = (component: string): Swap[] =>
  draft.swaps.filter((s) => s.component === component)
export function revertComponent(component: string): void {
  for (let i = draft.swaps.length - 1; i >= 0; i--)
    if (draft.swaps[i]!.component === component) draft.swaps.splice(i, 1)
}
export function revertToken(t: Token): void {
  delete draft.tokens[t.name]
  delete draft.merges[t.name]
}
export function discardDraft(): void {
  for (const k of Object.keys(draft.tokens)) delete draft.tokens[k]
  for (const k of Object.keys(draft.merges)) delete draft.merges[k]
  draft.swaps.splice(0)
}
