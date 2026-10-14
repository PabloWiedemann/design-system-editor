/** Something the host framework renders: a component with props and
 *  children, or a render function returning a Vue VNode / React element. */
export interface RenderSpec {
  component?: unknown
  props?: Record<string, unknown>
  children?: unknown
  render?: (props: Record<string, unknown>) => unknown
}

export type Control =
  | { key: string; label: string; type: 'select' | 'segment'; options: string[] }
  | { key: string; label: string; type: 'toggle' }
  | { key: string; label: string; type: 'text' }

export interface SpecimenItem extends RenderSpec {
  /** Caption under the cell: the option, e.g. `primary`. */
  label: string
  /** Component name, when it isn't the item's key in `components`. */
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
  /** The prop the cells vary, shown next to the title. */
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

/** One section of the Components tab. */
export interface SpecimenSection {
  id: string
  title: string
  description?: string
  /** Nav group: "Components" by default. */
  nav?: string
  order?: number
  /** Kit components in this section, by name: makes them selectable. */
  components?: Record<string, unknown>
  playground?: Playground
  groups?: SpecimenGroup[]
  /** Variant groups generated from the component's cva definition. */
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

export declare function defineSpecimens<T extends SpecimenSection | SpecimenSection[]>(def: T): T
