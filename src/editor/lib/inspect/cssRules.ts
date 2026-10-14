import { project } from '../project'
import { cssVarName, TOKENS, type Token } from '../tokens'
import { tokenUse, type PropKind } from './classes'
import type { TokenRow } from './inspect'

/**
 * Tokens an element gets from plain CSS rules: scoped <style> blocks, CSS
 * modules, a component library's stylesheet. Any matching rule whose
 * declaration reads a token through var() becomes an editable row, with
 * the rule's selector and file (Vite tags dev styles with their file).
 */
const PROPERTY_KIND: Record<string, PropKind> = {
  background: 'background',
  'background-color': 'background',
  color: 'text',
  'border-color': 'border',
  'border-top-color': 'border',
  'border-right-color': 'border',
  'border-bottom-color': 'border',
  'border-left-color': 'border',
  border: 'border',
  'border-top': 'border',
  'border-bottom': 'border',
  outline: 'outline',
  'outline-color': 'outline',
  fill: 'fill',
  stroke: 'stroke',
  'border-radius': 'radius',
  'border-top-left-radius': 'radius',
  'border-top-right-radius': 'radius',
  'border-bottom-left-radius': 'radius',
  'border-bottom-right-radius': 'radius',
  'box-shadow': 'shadow',
  'font-size': 'font-size',
  'backdrop-filter': 'blur',
  filter: 'blur'
}

const STATES: [RegExp, string][] = [
  [/:hover\b/g, 'hover'],
  [/:focus-visible\b/g, 'focus-visible'],
  [/:focus-within\b/g, 'focus-within'],
  [/:focus\b/g, 'focus'],
  [/:active\b/g, 'active'],
  [/:disabled\b/g, 'disabled'],
  [/:checked\b/g, 'data-[state=checked]']
]

/** Split a selector list at top-level commas. */
function parts(selector: string): string[] {
  const out: string[] = []
  let depth = 0
  let cur = ''
  for (const ch of selector) {
    if (ch === '(' || ch === '[') depth++
    if (ch === ')' || ch === ']') depth--
    if (ch === ',' && depth === 0) {
      out.push(cur.trim())
      cur = ''
    } else cur += ch
  }
  if (cur.trim()) out.push(cur.trim())
  return out
}

/** The selector without its state pseudo-classes, and those states. */
function stripStates(sel: string): { base: string; states: string[] } {
  let base = sel
  const states: string[] = []
  for (const [re, state] of STATES)
    if (re.test(base)) {
      states.push(state)
      base = base.replace(re, '')
    }
  return { base: base.trim() || '*', states }
}

/** File (relative to the app root) a stylesheet came from, if known. */
function fileOf(sheet: CSSStyleSheet): string | null {
  const owner = sheet.ownerNode as Element | null
  const id = owner?.getAttribute?.('data-vite-dev-id') ?? sheet.href ?? ''
  if (!id) return null
  const path = decodeURI(id.split('?')[0]!.replace(/^https?:\/\/[^/]+/, '').replace(/^\/@fs/, ''))
  return path.startsWith(`${project.root}/`) ? path.slice(project.root.length + 1) : path
}

/** Is this the editor's own stylesheet (or its draft overrides)? */
const isOwn = (sheet: CSSStyleSheet): boolean => {
  const owner = sheet.ownerNode as Element | null
  const id = `${owner?.id ?? ''} ${owner?.getAttribute?.('data-vite-dev-id') ?? ''} ${sheet.href ?? ''}`
  return /dse-draft|dist\/editor\/editor\.css|design-system-editor\/dist/.test(id)
}

export function cssRows(el: Element): (TokenRow & { file: string | null; property: string })[] {
  const byVar = new Map<string, Token>()
  // Aliases first, so a token's own name wins.
  for (const t of TOKENS) byVar.set(cssVarName(t), t)
  for (const t of TOKENS) byVar.set(t.name, t)
  const out: (TokenRow & { file: string | null; property: string; cssVar: string })[] = []
  const seen = new Set<string>()
  const visit = (rules: CSSRuleList, file: string | null): void => {
    for (const rule of rules) {
      if (rule instanceof CSSStyleRule) {
        for (const part of parts(rule.selectorText)) {
          const { base, states } = stripStates(part)
          let hit = false
          try {
            hit = el.matches(base)
          } catch {
            hit = false
          }
          if (!hit) continue
          // Utility classes are read from the class list already.
          const single = /^\.((?:\\.|[^.:#\s[\]>+~])+)/.exec(part)?.[1]?.replace(/\\(.)/g, '$1')
          if (single && el.classList.contains(single) && tokenUse(single)) continue
          // By name: a var() in a shorthand (`background: var(--x)`) leaves
          // its longhands empty in the CSSOM.
          for (const [property, kind] of Object.entries(PROPERTY_KIND)) {
            const value = rule.style.getPropertyValue(property)
            if (!value.includes('var(')) continue
            for (const m of value.matchAll(/var\(--([\w-]+)/g)) {
              const token = byVar.get(m[1]!)
              if (!token) continue
              const key = `${part}|${kind}|${token.name}`
              if (seen.has(key)) continue
              seen.add(key)
              out.push({
                use: { cls: `${property}: ${value}`, states, utility: property, kind, token },
                // As written in the source: without Vue's scoped `[data-v-…]`.
                source: { axis: 'css', option: part.replace(/\[data-v-[\w]+\]/g, '') },
                selector: part,
                stateSuffix: '',
                file,
                property,
                cssVar: m[1]!
              })
            }
          }
        }
      } else if ('cssRules' in rule) visit((rule as CSSGroupingRule).cssRules, file)
    }
  }
  for (const sheet of document.styleSheets) {
    if (isOwn(sheet)) continue
    try {
      visit(sheet.cssRules, fileOf(sheet))
    } catch {
      /* cross-origin sheet */
    }
  }
  return out
}
