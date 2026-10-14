import { inKit, project } from '../project'

/**
 * The kit's components, as far as the editor can tell from source and
 * the DOM:
 * - cva definitions found in the kit (`buttonVariants = cva(…)`), parsed so
 *   the editor knows which classes each variant adds, can recognise a
 *   rendered element, and can say where a class is defined;
 * - which kit component rendered an element, from the framework's dev-mode
 *   bookkeeping on DOM nodes (Vue instances, React fibers).
 */
export interface CvaDef {
  base: string[]
  axes: Record<string, Record<string, string[]>>
}

export interface Component {
  id: string
  /** Component name, e.g. 'Button' (from `buttonVariants`). */
  name: string
  /** File with the cva definition, relative to the app root. */
  file: string
  def: CvaDef
}

const words = (s: string): string[] => s.split(/\s+/).filter(Boolean)
// A quoted string, honouring its own quote (classes like [class*='size-']
// put single quotes inside double-quoted strings).
const STRING = /(['"`])((?:(?!\1)[^\\]|\\.)*)\1/
const strings = (s: string): string[] =>
  [...s.matchAll(new RegExp(STRING.source, 'g'))].map((m) => m[2]!)
const firstString = (s: string): string => STRING.exec(s)?.[2] ?? ''

/** Text between the brace/bracket opening at `from` and its match. */
function block(src: string, from: number): string {
  const open = src[from]!
  const close = open === '{' ? '}' : open === '[' ? ']' : ')'
  let depth = 0
  for (let i = from; i < src.length; i++) {
    if (src[i] === open) depth++
    else if (src[i] === close && --depth === 0) return src.slice(from + 1, i)
  }
  return ''
}

/** Parse a cva definition. Handles both `cva({ base, variants })` (cva 1.x)
 *  and `cva('base', { variants })` (class-variance-authority). */
export function parseCva(source: string, at = 0): CvaDef {
  // Find the call in the original text (offsets come from it), then drop
  // comments from there on.
  const start = source.indexOf('cva(', at)
  const src = (start >= 0 ? source.slice(start) : source)
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/(^|[^:'"])\/\/[^\n]*/g, '$1')
  const body = start >= 0 ? block(src, 3) : src
  const def: CvaDef = { base: [], axes: {} }

  const lead = body.trimStart()
  if (/^['"`[]/.test(lead)) {
    // class-variance-authority: base is the first argument.
    def.base = lead.startsWith('[') ? words(strings(block(lead, 0)).join(' ')) : words(firstString(lead))
  } else {
    const baseAt = body.search(/\bbase:\s*/)
    if (baseAt >= 0) {
      const rest = body.slice(baseAt).replace(/^base:\s*/, '')
      def.base = rest.startsWith('[') ? words(strings(block(rest, 0)).join(' ')) : words(firstString(rest))
    }
  }

  const varAt = body.search(/\bvariants:\s*\{/)
  if (varAt >= 0) {
    const variants = block(body, body.indexOf('{', varAt))
    for (const m of variants.matchAll(/['"]?(\w+)['"]?:\s*\{/g)) {
      const axis = m[1]!
      const inner = block(variants, m.index! + m[0].length - 1)
      def.axes[axis] = {}
      for (const o of inner.matchAll(/['"]?([\w-]+)['"]?\s*:\s*(['"`])((?:(?!\2)[^\\]|\\.)*)\2/g))
        def.axes[axis]![o[1]!] = words(o[3]!)
    }
  }
  return def
}

export let COMPONENTS: Component[] = []

/** Find every cva definition in the kit. `buttonVariants` → Button. */
export function initRegistry(): void {
  COMPONENTS = []
  for (const [file, src] of Object.entries(project.code)) {
    if (!inKit(file)) continue
    for (const m of src.matchAll(/(?:export\s+)?const\s+(\w+?)(?:Variants)?\s*=\s*cva\(/g)) {
      const raw = m[1]!
      const name = raw.charAt(0).toUpperCase() + raw.slice(1)
      const def = parseCva(src, m.index)
      if (!def.base.length && !Object.keys(def.axes).length) continue
      COMPONENTS.push({ id: raw.toLowerCase(), name, file, def })
    }
  }
}

export interface Match {
  component: Component
  /** Matched option per axis, e.g. { variant: 'primary', size: 'md' }. */
  options: Record<string, string>
  el: HTMLElement
}

const ratio = (needles: string[], have: Set<string>): number =>
  needles.length ? needles.filter((c) => have.has(c)).length / needles.length : 0

/** Recognise a cva component from its rendered classes. Tolerates a few
 *  classes dropped by tailwind-merge at the call site. `prefer` breaks
 *  ties in favour of the component the specimen says it renders. */
export function identify(el: HTMLElement, prefer?: string): Match | null {
  const have = new Set(el.classList)
  let best: { m: Match; score: number } | null = null
  for (const c of COMPONENTS) {
    const baseScore = ratio(c.def.base, have)
    if (baseScore < 0.75) continue
    const options: Record<string, string> = {}
    let axisScore = 0
    let axes = 0
    for (const [axis, opts] of Object.entries(c.def.axes)) {
      let top: [string, number] | null = null
      for (const [opt, cls] of Object.entries(opts)) {
        const r = ratio(cls, have)
        if (
          r > 0.6 &&
          (!top || r > top[1] || (r === top[1] && cls.length > (opts[top[0]]?.length ?? 0)))
        )
          top = [opt, r]
      }
      if (top) {
        options[axis] = top[0]
        axisScore += top[1]
        axes++
      }
    }
    // A generic base (Card is just `relative border`) needs a variant match too.
    if (c.def.base.length < 4 && !axes) continue
    const score = baseScore + axisScore + (prefer && c.name === prefer ? 0.5 : 0)
    if (!best || score > best.score) best = { m: { component: c, options, el }, score }
  }
  return best?.m ?? null
}

/** Where a class on a matched element comes from: base or an axis option.
 *  Classes from compound variants or the call site return null. */
export function sourceOf(m: Match, cls: string): { axis: string; option: string } | null {
  if (m.component.def.base.includes(cls)) return { axis: 'base', option: 'base' }
  for (const [axis, opt] of Object.entries(m.options))
    if (m.component.def.axes[axis]?.[opt]?.includes(cls)) return { axis, option: opt }
  return null
}

/** Selector for every element of this component with this axis option. */
export function selectorFor(m: Match, axis: string, option: string): string {
  const own = axis === 'base' ? [] : (m.component.def.axes[axis]?.[option] ?? [])
  const base = m.component.def.base.filter((c) => m.el.classList.contains(c))
  return [...new Set([...base, ...own])].map((c) => `.${CSS.escape(c)}`).join('')
}

// ── Which kit component rendered an element ────────────────────────────
export interface Kit {
  name: string
  /** File relative to the app root. */
  file: string
}

/** Kit files by lowercased base name: `button`, `dropdownmenuitem`… */
let KIT_FILES: Map<string, string> | null = null
function kitFile(name: string): string | null {
  if (!KIT_FILES) {
    KIT_FILES = new Map()
    for (const file of Object.keys(project.code)) {
      if (!inKit(file)) continue
      if (!/\.(vue|[jt]sx)$/.test(file)) continue
      const base = file
        .split('/')
        .pop()!
        .replace(/\.(vue|[jt]sx)$/, '')
        .replace(/[-_]/g, '')
        .toLowerCase()
      if (!KIT_FILES.has(base)) KIT_FILES.set(base, file)
    }
  }
  return KIT_FILES.get(name.replace(/[-_]/g, '').toLowerCase()) ?? null
}

// Vue: dev builds tag elements with their component instance.
interface VNodeLike {
  el: unknown
  component?: { subTree: VNodeLike } | null
  children?: unknown
}
interface VueInstance {
  type: { __name?: string; __file?: string; name?: string }
  subTree: VNodeLike
  parent: VueInstance | null
}
/** First real DOM element a vnode renders (components and fragments
 *  like reka's SelectRoot render no element of their own). */
function firstEl(v: VNodeLike | undefined, depth = 0): Element | null {
  if (!v || depth > 12) return null
  if (v.el instanceof Element) return v.el
  if (v.component) return firstEl(v.component.subTree, depth + 1)
  if (Array.isArray(v.children))
    for (const c of v.children as VNodeLike[]) {
      const el = firstEl(c, depth + 1)
      if (el) return el
    }
  return null
}
function vueKitOf(el: Element): Kit[] {
  let inst = (el as { __vueParentComponent?: VueInstance }).__vueParentComponent ?? null
  const found: Kit[] = []
  while (inst && firstEl(inst.subTree) === el) {
    const file = inst.type.__file ?? ''
    const rel = file.startsWith(`${project.root}/`) ? file.slice(project.root.length + 1) : ''
    if (rel && project.system.kits.length && inKit(rel)) {
      const name = inst.type.__name ?? rel.split('/').pop()!.replace(/\.vue$/, '')
      found.push({ name, file: rel })
    } else if (!file && inst.type.__name && kitFile(inst.type.__name)) {
      found.push({ name: inst.type.__name, file: kitFile(inst.type.__name)! })
    }
    inst = inst.parent
  }
  return found
}

// React: dev builds keep the fiber on each DOM node.
interface Fiber {
  tag: number
  type: unknown
  stateNode: unknown
  child: Fiber | null
  return: Fiber | null
}
const fiberName = (type: unknown): string | null => {
  if (typeof type === 'function')
    return (type as { displayName?: string; name?: string }).displayName ?? type.name ?? null
  if (type && typeof type === 'object') {
    const t = type as { displayName?: string; render?: { name?: string }; type?: unknown }
    return t.displayName ?? t.render?.name ?? (t.type ? fiberName(t.type) : null) ?? null
  }
  return null
}
function hostOf(f: Fiber | null): Element | null {
  for (let n = f; n; n = n.child) if (n.stateNode instanceof Element) return n.stateNode
  return null
}
function reactKitOf(el: Element): Kit[] {
  const key = Object.keys(el).find((k) => k.startsWith('__reactFiber$'))
  if (!key) return []
  let fiber = (el as unknown as Record<string, Fiber>)[key]!.return
  const found: Kit[] = []
  while (fiber && hostOf(fiber) === el) {
    const name = fiberName(fiber.type)
    const file = name ? kitFile(name) : null
    if (name && file) found.push({ name, file })
    fiber = fiber.return
  }
  return found
}

/** The kit component whose root element is `el`, if any: the one the
 *  specimen cell names, else the outermost (a Button inside a provider
 *  that renders nothing of its own shares its root element). */
export function kitOf(el: Element): Kit | null {
  const chain = project.framework === 'react' ? reactKitOf(el) : vueKitOf(el)
  const hint = el.closest<HTMLElement>('[data-dse-component]')?.dataset.dseComponent
  return chain.find((k) => k.name === hint) ?? chain.at(-1) ?? null
}

/** The kit file for a component name (`Button` → `ui/Button.vue`). */
export const kitFileOf = (name: string): string | null => kitFile(name)
