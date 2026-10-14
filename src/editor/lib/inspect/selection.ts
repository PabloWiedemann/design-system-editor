import { ref, shallowRef, watch } from 'vue'
import { TOKENS, type Token } from '../tokens'

/** What the inspector panel is showing. */
export type Selection = { kind: 'token'; token: Token } | { kind: 'element'; el: HTMLElement }

export const selection = shallowRef<Selection | null>(null)
/** Bumped when the edited element's classes change, to re-inspect. */
export const tick = ref(0)

/**
 * Edit mode: entered by clicking a section (or a token). Targets the
 * section's playground or the first specimen of a named component.
 * Nothing is drawn on the component itself.
 */
export interface Editing {
  section: string
  /** Kit component name, or null for the section's stage specimen. */
  component: string | null
  /** Name shown in the indicators. */
  label: string
  /** Token sections: the token being tweaked. */
  token?: string
}
export const editing = ref<Editing | null>(null)

export const tokenByName = (name: string): Token | undefined => TOKENS.find((t) => t.name === name)

/** The rendered root element of the edited component: the first element
 *  the host framework mounted in its specimen cell (or the playground). */
function resolve(e: Editing): HTMLElement | null {
  const section = document.getElementById(e.section)
  if (!section) return null
  const mount = e.component
    ? section.querySelector(`[data-dse-component="${CSS.escape(e.component)}"] [data-dse-mount]`)
    : section.querySelector('[data-playground] [data-dse-mount]')
  const el = mount?.firstElementChild
  return el instanceof HTMLElement ? el : null
}

/** The component a specimen cell says it renders (for the inspector). */
export const hintOf = (el: Element): string | undefined =>
  el.closest<HTMLElement>('[data-dse-component]')?.dataset.dseComponent || undefined

let observer: MutationObserver | null = null
/** Keep the target fresh when props swap the specimen (e.g. Input -> Select). */
function follow(e: Editing | null): void {
  observer?.disconnect()
  if (!e || e.token) return
  const section = document.getElementById(e.section)
  if (!section) return
  observer = new MutationObserver(() => {
    const el = resolve(e)
    if (el && (selection.value?.kind !== 'element' || selection.value.el !== el))
      selection.value = { kind: 'element', el }
    tick.value++
  })
  observer.observe(section, {
    subtree: true,
    childList: true,
    attributes: true,
    attributeFilter: ['class', 'style', 'data-state']
  })
}
watch(editing, follow)

export function startEdit(e: Editing): void {
  editing.value = e
  if (e.token) {
    const t = tokenByName(e.token)
    if (t) selection.value = { kind: 'token', token: t }
    return
  }
  const el = resolve(e)
  if (el) selection.value = { kind: 'element', el }
}
export function stopEdit(): void {
  editing.value = null
  selection.value = null
}

export function selectToken(token: Token): void {
  selection.value = { kind: 'token', token }
}
/** Back from a token: to the component being edited, or to the overview. */
export function back(): void {
  if (selection.value?.kind === 'token' && editing.value && !editing.value.token)
    startEdit(editing.value)
  else stopEdit()
}

/** Tokens tab: clicking a token sample selects it. */
export function pickToken(target: Element): Token | null {
  const sample = target.closest<HTMLElement>('[data-token]')
  return sample ? (tokenByName(sample.dataset.token!) ?? null) : null
}
