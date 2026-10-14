<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { Combine, SlidersHorizontal } from 'lucide-vue-next'
import { TooltipProvider } from 'reka-ui'
import Badge from './ui/Badge.vue'
import Button from './ui/Button.vue'
import SegmentedControl from './ui/SegmentedControl.vue'
import Toaster from './ui/Toaster.vue'
import GlobalActions from './parts/GlobalActions.vue'
import Inspector from './parts/Inspector.vue'
import Select from './ui/Select.vue'
import Components from './sections/Components.vue'
import Foundations from './sections/Foundations.vue'
import { editing, pickToken, startEdit, stopEdit } from './lib/inspect/selection'
import { attach, changedCount, detach } from './lib/tweaks'
import { GROUPS, shortName } from './lib/tokens'
import { cancelConsolidate, session, sessionLabel, togglePick } from './lib/consolidate/session'
import { project, storageKey } from './lib/project'
import { sections } from './lib/specimens'

/**
 * The design system editor. Tabs: Tokens (every token in the repo's
 * theme), Components (the repo's specimens), Prototype (the running app
 * with the draft applied, when the config names one).
 *
 * Components and tokens are selected by clicking them; until then a click
 * selects instead of using them. Selecting enters edit mode (shown in the
 * top bar, the nav, the section ring and the inspector); the selected
 * component then works normally. Esc or Done leaves it.
 *
 * Token sections also have a Consolidate button: it opens a session
 * (rules, then review) in the inspector; clicking tokens in that section
 * picks them for a merge by hand.
 */
type Tab = 'tokens' | 'components' | 'prototype'
interface NavGroup {
  group: string
  items: [string, string][]
}
const NAV: Record<'tokens' | 'components', NavGroup[]> = {
  tokens: [
    {
      group: 'Foundations',
      items: [
        ...GROUPS.filter((g) => g.ns.id !== 'spacing').map(
          (g) => [g.ns.id, g.ns.label] as [string, string]
        ),
        ['spacing', 'Spacing'],
        ['grid', 'Grid check']
      ]
    }
  ],
  // Sections grouped by their `nav` label, in order.
  components: sections.value.reduce<NavGroup[]>((out, sec) => {
    const label = sec.nav ?? 'Components'
    let g = out.find((x) => x.group === label)
    if (!g) out.push((g = { group: label, items: [] }))
    g.items.push([sec.id, sec.title])
    return out
  }, [])
}

// Several design systems in one repo (a monorepo): switch reloads with it.
const systemOptions = project.systems.map((x) => ({ value: x.id, label: x.label }))
const system = ref(project.system.id)
watch(system, (id) => {
  const url = new URL(location.href)
  url.searchParams.set('system', id)
  location.href = url.toString()
})

const TABS = [
  { value: 'tokens' as Tab, label: 'Tokens' },
  { value: 'components' as Tab, label: 'Components' },
  ...(project.prototype ? [{ value: 'prototype' as Tab, label: 'Prototype' }] : [])
]
const saved = localStorage.getItem(storageKey('tab')) as Tab | null
const tab = ref<Tab>(saved && TABS.some((t) => t.value === saved) ? saved : 'components')
watch(tab, (t) => localStorage.setItem(storageKey('tab'), t))
// The section being edited or consolidated gets its icon in the nav.
const workingOn = computed(() =>
  session.value
    ? { id: session.value.group, icon: Combine, label: 'Consolidating' }
    : editing.value
      ? { id: editing.value.section, icon: SlidersHorizontal, label: 'Editing' }
      : null
)

// The selected token is marked without drawing on it: an outline would
// sit on the very edges, radius, color or shadow being edited. Instead a
// short accent bar sits in the gap below the sample, and the other samples
// in its section step back (full again on hover, to compare). A rule,
// since the name is only known at runtime.
const selectedToken = computed(() => editing.value?.token ?? null)
const selectedSheet = document.createElement('style')
document.head.appendChild(selectedSheet)
watch(selectedToken, (name) => {
  const group = editing.value?.section
  if (!name || !group) return void (selectedSheet.textContent = '')
  const sel = `[data-token="${CSS.escape(name)}"]`
  const others = `#${CSS.escape(group)} [data-token]:not(${sel})`
  selectedSheet.textContent = [
    `${others} { opacity: 0.55; transition: opacity 150ms; }`,
    `${others}:hover { opacity: 1; }`,
    `${sel} { position: relative; }`,
    `${sel}::after { content: ''; position: absolute; left: 0; bottom: -6px; width: 16px; height: 2px; border-radius: 2px; background: var(--dse-color-accent); pointer-events: none; }`
  ].join('\n')
})
onBeforeUnmount(() => selectedSheet.remove())

// ── Scroll spy: the nav marks the section being read ───────
const main = ref<HTMLElement>()
const nav = ref<HTMLElement>()
const active = ref('')
/** Set while a nav click scrolls, so the clicked item stays marked. */
let pinned: string | null = null

function spy(): void {
  const box = main.value
  if (!box || pinned || tab.value === 'prototype') return
  const ids = NAV[tab.value].flatMap((g) => g.items.map(([id]) => id))
  const atEnd = box.scrollTop + box.clientHeight >= box.scrollHeight - 4
  const top = box.getBoundingClientRect().top
  // The last section whose top has passed a line near the top of the view.
  let current = ids[0] ?? ''
  for (const id of ids) {
    const el = document.getElementById(id)
    if (el && el.getBoundingClientRect().top - top <= 96) current = id
  }
  active.value = atEnd ? (ids[ids.length - 1] ?? current) : current
}
let frame = 0
const onScroll = (): void => {
  cancelAnimationFrame(frame)
  frame = requestAnimationFrame(spy)
}
function jump(id: string): void {
  pinned = id
  active.value = id
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  // Release once the smooth scroll settles (scrollend, with a fallback).
  const release = (): void => void (pinned = null)
  main.value?.addEventListener('scrollend', release, { once: true })
  setTimeout(release, 1200)
}
watch(tab, () => nextTick(spy))
// Keep the marked item visible in a long nav.
watch(active, () =>
  nextTick(() => nav.value?.querySelector('[aria-current]')?.scrollIntoView({ block: 'nearest' }))
)
onMounted(() => nextTick(spy))

// Tokens: an unselected token is selected by clicking it (the click never
// reaches the sample); once selected it works normally (e.g. an animation
// player). While consolidating, clicks pick tokens for a merge by hand.
function onPick(e: Event): void {
  if (tab.value !== 'tokens') return
  const t = pickToken(e.target as Element)
  if (!t) return
  if (!session.value && editing.value?.token === t.name) return
  e.preventDefault()
  e.stopPropagation()
  if (e.type !== 'click') return
  if (session.value) {
    if (t.group === session.value.group) togglePick(t)
  } else startEdit({ section: t.group, component: null, label: shortName(t), token: t.name })
}
function onKey(e: KeyboardEvent): void {
  // Esc closes the topmost thing first: an open menu, select or dialog.
  const layerOpen = document.querySelector(
    '[data-reka-popper-content-wrapper], [role="dialog"][data-state="open"]'
  )
  if (e.key !== 'Escape' || layerOpen || e.defaultPrevented) return
  if (session.value) cancelConsolidate()
  else if (editing.value) stopEdit()
}
// Capture phase: check for open layers before they close themselves.
onMounted(() => window.addEventListener('keydown', onKey, true))
onBeforeUnmount(() => window.removeEventListener('keydown', onKey, true))

// Push the draft into the embedded prototype (same origin only: another
// dev server's page can't be reached from here).
let frameDoc: Document | null = null
const crossOrigin = ref(false)
function onFrameLoad(e: Event): void {
  let doc: Document | null = null
  try {
    doc = (e.target as HTMLIFrameElement).contentDocument
  } catch {
    doc = null
  }
  crossOrigin.value = !doc
  if (frameDoc) detach(frameDoc)
  frameDoc = doc
  if (doc) attach(doc)
}
onBeforeUnmount(() => frameDoc && detach(frameDoc))
</script>

<template>
  <TooltipProvider :delay-duration="300">
    <div class="dse:flex dse:h-full dse:min-h-0 dse:flex-col dse:bg-card-background">
      <header
        class="dse:relative dse:flex dse:h-12 dse:shrink-0 dse:items-center dse:gap-4 dse:border-b dse:border-border-default dse:px-4"
      >
        <h1 class="dse:text-ui dse:font-semibold">{{ project.name || 'Design system' }}</h1>
        <Select
          v-if="systemOptions.length > 1"
          v-model="system"
          size="sm"
          variant="ghost"
          :options="systemOptions"
          class="dse:-ml-2"
        />
        <SegmentedControl
          v-model="tab"
          variant="contained"
          size="sm"
          class="dse:absolute dse:left-1/2 dse:-translate-x-1/2"
          :options="TABS"
        />
        <!-- Edit-mode indicator: in the chrome, never over the content. -->
        <div class="dse:ml-auto dse:flex dse:items-center dse:gap-4">
          <span v-if="session" class="dse:flex dse:items-center dse:gap-2 dse:text-ui">
            <span class="dse:size-2 dse:rounded-full dse:bg-accent" />Consolidating
            <span class="dse:font-medium">{{ sessionLabel }}</span>
            <span class="dse:text-ui dse:text-subtle-foreground">· Esc to cancel</span>
          </span>
          <span v-else-if="editing" class="dse:flex dse:items-center dse:gap-2 dse:text-ui">
            <span class="dse:size-2 dse:rounded-full dse:bg-accent" />Editing
            <span class="dse:font-medium">{{ editing.label }}</span>
            <span class="dse:text-ui dse:text-subtle-foreground">· Esc to finish</span>
          </span>
          <Badge v-else-if="tab === 'prototype' && changedCount" size="md"
            >Previewing draft · {{ changedCount }}
            {{ changedCount === 1 ? 'change' : 'changes' }}</Badge
          >
          <!-- Global: the whole draft. Per component / token: inspector footer. -->
          <GlobalActions />
        </div>
      </header>

      <div class="dse:flex dse:min-h-0 dse:flex-1">
        <template v-if="tab !== 'prototype'">
          <nav
            ref="nav"
            class="dse:flex dse:w-56 dse:shrink-0 dse:flex-col dse:gap-4 dse:overflow-y-auto dse:border-r dse:border-border-default dse:p-3 dse:[scrollbar-width:thin]"
            aria-label="Sections"
          >
            <div v-for="g in NAV[tab]" :key="g.group" class="dse:flex dse:shrink-0 dse:flex-col">
              <p
                class="dse:px-2 dse:pb-1 dse:text-ui dse:font-medium dse:tracking-wider dse:text-subtle-foreground dse:uppercase"
              >
                {{ g.group }}
              </p>
              <Button
                v-for="[id, label] in g.items"
                :key="id"
                variant="ghost"
                size="sm"
                :class="[
                  'dse:shrink-0 dse:justify-start dse:font-normal',
                  active === id && 'dse:bg-secondary-background dse:text-base-foreground'
                ]"
                :aria-current="active === id ? 'location' : undefined"
                @click="jump(id)"
                >{{ label
                }}<component
                  :is="workingOn.icon"
                  v-if="workingOn?.id === id"
                  :size="13"
                  class="dse:ml-auto dse:text-accent"
                  :aria-label="workingOn.label"
                  role="img"
              /></Button>
            </div>
          </nav>

          <main
            ref="main"
            :class="[
              'dse:min-h-0 dse:flex-1 dse:overflow-y-auto dse:[scrollbar-width:thin]',
              tab === 'tokens' && 'dse:[&_[data-token]]:cursor-pointer'
            ]"
            @pointerdown.capture="onPick"
            @click.capture="onPick"
            @scroll.passive="onScroll"
          >
            <div class="dse:mx-auto dse:flex dse:w-full dse:max-w-4xl dse:flex-col dse:gap-6 dse:px-12 dse:pt-12 dse:pb-24">
              <header class="dse:mb-6">
                <h1 class="dse:text-title dse:font-semibold">
                  {{ tab === 'tokens' ? 'Tokens' : 'Components' }}
                </h1>
                <p class="dse:mt-1 dse:text-ui dse:text-muted-foreground">
                  {{
                    tab === 'tokens'
                      ? 'The values everything is built from. Click a token to edit it and see where it is used, or Consolidate a section to reduce them.'
                      : 'Every design-system component in its states. Click one to select it and edit the tokens behind it.'
                  }}
                </p>
              </header>
              <Foundations v-if="tab === 'tokens'" />
              <Components v-else />
            </div>
          </main>
        </template>

        <div v-else class="dse:relative dse:flex dse:min-h-0 dse:flex-1">
          <iframe
            :src="project.prototype ?? ''"
            title="Prototype with the current draft"
            class="dse:min-h-0 dse:flex-1 dse:border-0 dse:bg-white"
            @load="onFrameLoad"
          />
          <p
            v-if="crossOrigin"
            class="dse:absolute dse:bottom-3 dse:left-3 dse:rounded-control dse:bg-media-overlay dse:px-2 dse:py-1 dse:text-ui dse:text-muted-foreground"
          >
            This app runs on another server, so the draft can't be previewed in it.
          </p>
        </div>

        <Inspector />
      </div>
      <Toaster />
    </div>
  </TooltipProvider>
</template>
