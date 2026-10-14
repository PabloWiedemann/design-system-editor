import { createApp } from 'vue'
import App from './App.vue'
import './styles.css'
import { initClasses } from './lib/inspect/classes'
import { initRegistry } from './lib/inspect/registry'
import { initSession } from './lib/consolidate/session'
import { setProject, type ProjectData } from './lib/project'
import { host, initSpecimens, type HostAdapter, type SpecimenSection } from './lib/specimens'
import { initTokens } from './lib/tokens'
import { initDraft } from './lib/tweaks'

export type { HostAdapter, ProjectData, SpecimenSection }

export interface StartOptions {
  /** Renders the repo's components (design-system-editor/adapters/vue|react). */
  adapter: HostAdapter
  /** The repo's specimens sections (design/specimens/*). */
  specimens: SpecimenSection[]
  /** The project description, or the URL to fetch it from. */
  project: ProjectData | string
  /** Where to mount; a new element on <body> by default. */
  el?: HTMLElement
}

/**
 * Start the editor on this page: read the repo's theme and code (from the
 * dev server), index tokens and components, load the saved draft, then
 * mount the editor UI over the page.
 */
/** Is a computed color (rgb() / oklch()) light? */
function isLight(color: string): boolean {
  const probe = document.createElement('canvas').getContext('2d')
  if (!probe) return false
  probe.fillStyle = color
  probe.fillRect(0, 0, 1, 1)
  const [r, g, b] = probe.getImageData(0, 0, 1, 1).data
  return 0.2126 * r! + 0.7152 * g! + 0.0722 * b! > 150
}

export async function startEditor(options: StartOptions): Promise<void> {
  const data: ProjectData =
    typeof options.project === 'string'
      ? await (await fetch(options.project)).json()
      : options.project
  setProject(data)
  initTokens()
  initClasses()
  initRegistry()
  initDraft()
  initSession()
  initSpecimens(options.specimens, options.adapter)

  // The repo's text and page defaults, read before the editor covers the
  // page: cells render the repo's components with them.
  const body = getComputedStyle(document.body)
  const page = [body.backgroundColor, getComputedStyle(document.documentElement).backgroundColor].find(
    (c) => c && c !== 'rgba(0, 0, 0, 0)' && c !== 'transparent'
  )
  const el = options.el ?? document.body.appendChild(document.createElement('div'))
  el.id = 'dse-root'
  el.classList.add('dse-root')
  el.style.setProperty('--dse-host-font', body.fontFamily)
  el.style.setProperty('--dse-host-size', body.fontSize)
  el.style.setProperty('--dse-host-leading', body.lineHeight)
  el.style.setProperty('--dse-host-color', body.color)
  // Light repos get their own page color behind their components; dark
  // ones sit on the editor's surface as they would on theirs.
  host.surface = page && isLight(page) ? page : null
  document.title = `${data.name || 'Design system'} · Design system editor`
  createApp(App).mount(el)
}
