import { reactive, shallowRef } from 'vue'
import { COMPONENTS } from './inspect/registry'

/**
 * Specimens: what the Components tab shows, as the repo describes it in
 * `design/specimens/*` (see the README). Sections, variant groups and
 * cells are laid out by the editor; the cells' contents are the repo's
 * own components, rendered by the host adapter (Vue or React) into the
 * editor's DOM.
 */

/** Something the host framework can render: a component with props and
 *  children, or a render function returning a Vue VNode / React element. */
export interface RenderSpec {
  component?: unknown
  props?: Record<string, unknown>
  /** Text or framework node for the default slot / children. */
  children?: unknown
  render?: (props: Record<string, unknown>) => unknown
}

export interface MountHandle {
  update(spec: RenderSpec): void
  unmount(): void
}

/** The host side: mounts the repo's components into editor elements. */
export interface HostAdapter {
  framework: 'vue' | 'react'
  mount(el: HTMLElement, spec: RenderSpec): MountHandle
  /** A component's display name, when the specimen doesn't give one. */
  nameOf?(component: unknown): string | undefined
}

export type Control =
  | { key: string; label: string; type: 'select' | 'segment'; options: string[] }
  | { key: string; label: string; type: 'toggle' }
  | { key: string; label: string; type: 'text' }

export interface SpecimenItem extends RenderSpec {
  /** Caption under the cell: the option, e.g. `primary`. */
  label: string
  /** Component name, when it isn't the item's `component` key. */
  name?: string
  /** Stretch the sample to the cell width. */
  fill?: boolean
  /** No padding: for samples on imagery. */
  bleed?: boolean
  span?: 2 | 'full'
  /** Keep fixed-position content (toasts, docked panels) inside the cell. */
  contain?: boolean
}

export interface SpecimenGroup {
  /** "Variant", "Size", "State"… */
  title: string
  /** The prop the cells vary, shown as `prop`. */
  prop?: string
  note?: string
  /** Minimum cell width: sm 8rem, md 12rem, lg 16rem. */
  cell?: 'sm' | 'md' | 'lg'
  items: SpecimenItem[]
}

export interface Playground {
  component?: unknown
  name?: string
  controls: Control[]
  defaults: Record<string, unknown>
  /** Default slot / children, from the current props. */
  children?: unknown | ((props: Record<string, unknown>) => unknown)
  render?: (props: Record<string, unknown>) => unknown
}

/** One section of the Components tab, as written in a specimens file. */
export interface SpecimenSection {
  id: string
  title: string
  description?: string
  /** Nav group: "Components" by default, e.g. "In the product". */
  nav?: string
  order?: number
  /** Kit components in this section by name: makes it selectable. */
  components?: Record<string, unknown>
  playground?: Playground
  groups?: SpecimenGroup[]
  /** Generate variant groups from the component's cva definition. */
  auto?: {
    component: unknown
    name?: string
    children?: unknown
    /** Children for icon-only options (`icon`, `icon-sm`…); ✦ by default. */
    iconChildren?: unknown
    props?: Record<string, unknown>
    skip?: string[]
  }
  /** Free-form content (a whole demo) instead of, or after, groups. */
  content?: RenderSpec
}

/** A section ready to render: names resolved, auto groups expanded. */
export interface Section extends SpecimenSection {
  names: string[]
  groups: SpecimenGroup[]
  playgroundName?: string
}

export const host: { adapter: HostAdapter | null; surface: string | null } = {
  adapter: null,
  /** The repo's page color behind cells, for light repos; null otherwise. */
  surface: null
}
export const sections = shallowRef<Section[]>([])
/** Live props of each section's playground. */
export const playgroundState = reactive<Record<string, Record<string, unknown>>>({})

const titleCase = (s: string): string => s.charAt(0).toUpperCase() + s.slice(1)

function nameOf(sec: SpecimenSection, component: unknown): string | undefined {
  if (!component) return undefined
  const entry = Object.entries(sec.components ?? {}).find(([, c]) => c === component)
  return entry?.[0] ?? host.adapter?.nameOf?.(component)
}

/** Variant groups from a cva definition: one group per axis. */
function autoGroups(sec: SpecimenSection): SpecimenGroup[] {
  const auto = sec.auto!
  const name = auto.name ?? nameOf(sec, auto.component)
  const cva = COMPONENTS.find((c) => c.name === name)
  if (!cva) return []
  return Object.entries(cva.def.axes)
    .filter(([axis]) => !auto.skip?.includes(axis))
    .map(([axis, opts]) => {
      const keys = Object.keys(opts)
      const flag = keys.length === 1 && keys[0] === 'true'
      return {
        title: flag ? 'State' : titleCase(axis),
        prop: axis,
        cell: axis === 'size' ? 'md' : 'sm',
        items: (flag ? ['true'] : keys).map((o) => ({
          label: flag ? axis : o,
          name,
          component: auto.component,
          props: { ...auto.props, [axis]: flag ? true : o },
          children: /^icon/.test(o) ? (auto.iconChildren ?? '✦') : auto.children
        }))
      } satisfies SpecimenGroup
    })
}

export function initSpecimens(defs: SpecimenSection[], adapter: HostAdapter): void {
  host.adapter = adapter
  const seen = new Set<string>()
  sections.value = defs
    .filter((d) => d && d.id && !seen.has(d.id) && seen.add(d.id))
    .sort((a, b) => (a.order ?? 100) - (b.order ?? 100))
    .map((d) => {
      const groups = [...(d.auto ? autoGroups(d) : []), ...(d.groups ?? [])].map((g) => ({
        ...g,
        items: g.items.map((i) => ({ ...i, name: i.name ?? nameOf(d, i.component) }))
      }))
      const playgroundName = d.playground
        ? (d.playground.name ?? nameOf(d, d.playground.component))
        : undefined
      if (d.playground) playgroundState[d.id] = { ...d.playground.defaults }
      return { ...d, groups, playgroundName, names: Object.keys(d.components ?? {}) }
    })
}

/** The section an element sits in. */
export const sectionOf = (el: Element): Section | undefined => {
  const id = el.closest('section[id]')?.id
  return sections.value.find((s) => s.id === id)
}

/** What the playground renders for its current props. */
export function playgroundSpec(s: Section): RenderSpec {
  const p = s.playground!
  // A plain copy: the host renders with its own framework copy, which must
  // not receive the editor's reactive proxies.
  const props = { ...(playgroundState[s.id] ?? {}) }
  if (p.render) return { render: () => p.render!(props) }
  const children = typeof p.children === 'function' ? (p.children as (x: unknown) => unknown)(props) : p.children
  return { component: p.component, props, children }
}
