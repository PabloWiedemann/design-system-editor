<script setup lang="ts">
import { computed, ref } from 'vue'
import { Check, ChevronDown, Combine, X } from 'lucide-vue-next'
import { DropdownMenuRoot, DropdownMenuTrigger } from 'reka-ui'
import Button from '../ui/Button.vue'
import { cardVariants } from '../ui/card.variants'
import { cn } from '../ui/cn'
import DropdownMenuContent from '../ui/DropdownMenuContent.vue'
import { editing, startEdit, stopEdit } from '../lib/inspect/selection'
import type { ConsolidateGroup } from '../lib/consolidate/rules'
import { shortName, type Token } from '../lib/tokens'
import TargetItem from './TargetItem.vue'
import CopyRef from './CopyRef.vue'
import { kitOf } from '../lib/inspect/registry'
import { componentReference, groupReference } from '../lib/reference'
import { cancelConsolidate, session, startConsolidate } from '../lib/consolidate/session'

/**
 * One section (bento). Clicking an unselected component section selects
 * it (edit mode): its playground (`playground`, with props) or the kit
 * component clicked (`components`). Until then clicks select instead of
 * reaching the component; once selected it works normally. While editing, the whole bento gets
 * the accent ring and an "Editing … · Done" control, and other bentos dim;
 * the component itself is never outlined, so changes stay easy to see.
 *
 * Token sections pass `consolidate` instead: their button starts a
 * consolidation session for that token group (see consolidate/).
 */
const {
  id,
  title,
  description,
  playground,
  components = [],
  tokens = [],
  consolidate
} = defineProps<{
  id: string
  title: string
  description?: string
  /** Name of the playground's component: the section edits its playground. */
  playground?: string
  /** Kit component names in this section that can be edited. */
  components?: string[]
  /** Tokens shown in this section (selected one by one in the page). */
  tokens?: Token[]
  /** Token group this section shows; enables "Consolidate". */
  consolidate?: ConsolidateGroup
}>()

const consolidating = computed(() => !!consolidate && session.value?.group === consolidate)
const active = computed(() => editing.value?.section === id || consolidating.value)
/** Another section is being edited or consolidated: step back. */
const dimmed = computed(() => !active.value && (!!editing.value || !!session.value))
interface Target {
  component: string | null
  label: string
  token?: Token
}
const targets = computed<Target[]>(() =>
  playground
    ? [{ component: null, label: playground }]
    : tokens.length
      ? tokens.map((t) => ({ component: null, label: shortName(t), token: t }))
      : components.map((c) => ({ component: c, label: c }))
)
// Copy reference: the token group, or every kit component rendered here.
const root = ref<HTMLElement>()
function reference(): string {
  if (tokens.length) return groupReference(tokens[0]!.group)
  const names = new Set<string>([...(playground ? [playground] : []), ...components])
  // Content only: the header's own buttons (Tooltip…) don't count.
  for (const el of root.value?.querySelectorAll(':scope > :not(header) *') ?? []) {
    const kit = kitOf(el)
    if (kit) names.add(kit.name)
  }
  return names.size
    ? [...names].map((n) => componentReference(n)).join('\n\n---\n\n')
    : `# ${title}\n\n${description ?? ''}`
}
/** Component sections can be selected by clicking them (tokens are
 *  selected one by one, in the page). */
const selectable = computed(
  () => !active.value && !session.value && !tokens.length && targets.value.length > 0
)
/** The target under the click: the kit component it lands on, else the
 *  section's first target. */
function targetAt(el: Element): Target {
  for (let n: Element | null = el; n && n !== root.value; n = n.parentElement) {
    const kit = kitOf(n)
    const hit = kit && targets.value.find((t) => t.component === kit.name)
    if (hit) return hit
  }
  return targets.value[0]!
}
function intercept(e: Event): void {
  // Selected, with several components: clicking another one follows it
  // (the click still goes through).
  if (active.value && e.type === 'click' && targets.value.length > 1) {
    const t = targetAt(e.target as Element)
    if (t.component !== editing.value?.component) tweak(t)
    return
  }
  if (!selectable.value) return
  if (e instanceof KeyboardEvent && e.key !== 'Enter' && e.key !== ' ') return
  e.preventDefault()
  e.stopPropagation()
  if (e.type === 'click' || e instanceof KeyboardEvent) tweak(targetAt(e.target as Element))
}
function tweak(t: Target): void {
  cancelConsolidate()
  startEdit({ section: id, component: t.component, label: t.label, token: t.token?.name })
}
</script>

<template>
  <!-- Each section is its own bento: the kit's elevated card. -->
  <section
    :id
    ref="root"
    :class="
      cn(
        cardVariants({ padding: 'lg' }),
        'dse:flex dse:scroll-mt-6 dse:flex-col dse:gap-6 dse:transition-[opacity,box-shadow] dse:duration-200',
        active && 'dse:ring-2 dse:ring-accent',
        dimmed && 'dse:opacity-40 dse:hover:opacity-100',
        selectable && 'dse:cursor-pointer dse:hover:ring-1 dse:hover:ring-border-strong dse:[&_*]:cursor-pointer!'
      )
    "
  >
    <header class="dse:flex dse:items-start dse:gap-4">
      <div class="dse:min-w-0 dse:flex-1">
        <h2 class="dse:flex dse:items-center dse:gap-1 dse:text-heading dse:font-semibold">
          {{ title }}
          <CopyRef :what="title" :text="reference" />
        </h2>
        <p v-if="description" class="dse:mt-1 dse:max-w-xl dse:text-ui dse:text-muted-foreground">
          {{ description }}
        </p>
      </div>

      <div v-if="consolidating" class="dse:flex dse:items-center dse:gap-2">
        <span
          class="dse:flex dse:h-7 dse:items-center dse:gap-2 dse:rounded-full dse:bg-accent/15 dse:px-3 dse:text-ui"
        >
          <span class="dse:size-1.5 dse:rounded-full dse:bg-accent" />Consolidating
          <span class="dse:text-ui dse:text-muted-foreground">· click tokens to merge by hand</span>
        </span>
        <Button variant="ghost" size="sm" @click="cancelConsolidate"><X :size="13" />Cancel</Button>
      </div>

      <div v-else-if="active" class="dse:flex dse:items-center dse:gap-2">
        <!-- Several targets: the pill switches between them. -->
        <DropdownMenuRoot v-if="targets.length > 1" :modal="false">
          <DropdownMenuTrigger as-child>
            <button
              type="button"
              class="dse:flex dse:h-7 dse:items-center dse:gap-2 dse:rounded-full dse:bg-accent/15 dse:px-3 dse:text-ui dse:outline-none dse:hover:bg-accent/25 dse:focus-visible:ring-2 dse:focus-visible:ring-border-focus"
            >
              <span class="dse:size-1.5 dse:rounded-full dse:bg-accent" />Editing {{ editing!.label
              }}<ChevronDown :size="12" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" class="dse:min-w-52">
            <TargetItem v-for="t in targets" :key="t.label" :target="t" @select="tweak(t)" />
          </DropdownMenuContent>
        </DropdownMenuRoot>
        <span
          v-else
          class="dse:flex dse:h-7 dse:items-center dse:gap-2 dse:rounded-full dse:bg-accent/15 dse:px-3 dse:text-ui"
        >
          <span class="dse:size-1.5 dse:rounded-full dse:bg-accent" />Editing
          {{ editing!.label }}
        </span>
        <Button size="sm" @click="stopEdit"><Check :size="13" />Done</Button>
      </div>

      <div v-else class="dse:flex dse:items-center dse:gap-1">
        <Button v-if="consolidate" variant="ghost" size="sm" @click="startConsolidate(consolidate)"
          ><Combine :size="13" />Consolidate</Button
        >
      </div>
    </header>
    <!-- Unselected: a click selects the component instead of using it.
         Selected: everything inside works normally. -->
    <div
      class="dse:flex dse:flex-col dse:gap-6"
      @pointerdown.capture="intercept"
      @mousedown.capture="intercept"
      @click.capture="intercept"
      @keydown.capture="intercept"
    >
      <slot />
    </div>
  </section>
</template>
