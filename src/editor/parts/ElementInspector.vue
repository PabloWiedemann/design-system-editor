<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watchEffect } from 'vue'
import { ArrowUpRight } from 'lucide-vue-next'
import Badge from '../ui/Badge.vue'
import Button from '../ui/Button.vue'
import SegmentedControl from '../ui/SegmentedControl.vue'
import Select from '../ui/Select.vue'
import PropControl from './PropControl.vue'
import TokenChip from './TokenChip.vue'
import { declaration, KIND_GROUP, PROP_LABEL, stateLabel, swapClass } from '../lib/inspect/classes'
import { inspect, type TokenRow } from '../lib/inspect/inspect'
import { selectToken, tick, tokenByName } from '../lib/inspect/selection'
import { scopedActions } from '../lib/inspect/actions'
import { componentReference } from '../lib/reference'
import CopyRef from './CopyRef.vue'
import { usageOf } from '../lib/inspect/usage'
import { playgroundState, sectionOf } from '../lib/specimens'
import { hintOf } from '../lib/inspect/selection'
import { cssVarName, shortName, tokensIn } from '../lib/tokens'
import { tokenOptions } from '../lib/tokenOptions'
import { componentUsage } from '../lib/inspect/usage'
import UsageList from './UsageList.vue'
import { draft, isChanged, revertComponent, setSwap, swapFor, swapsOf, valueOf } from '../lib/tweaks'

/**
 * A selected element: the tokens behind each of its properties (swap one
 * for another, or open a token to change its value everywhere), what is
 * hardcoded, and its layout values.
 */
const { el } = defineProps<{ el: HTMLElement }>()

const info = computed(() => {
  void tick.value
  void draft.swaps.length
  const i = inspect(el, hintOf(el))
  // Default state first, then hover, focus, …
  i.tokens.sort((a, b) => a.use.states.length - b.use.states.length)
  return i
})
// Root first, then each inner part that uses tokens.
const groups = computed(() =>
  [
    { label: 'Root', rows: info.value.tokens },
    ...info.value.parts.map((p) => ({ label: p.label, rows: p.tokens }))
  ].filter((g) => g.rows.length)
)
// The section whose playground this element is, if it is one.
const playground = computed(() => {
  const sec = el.closest('[data-playground]') ? sectionOf(el) : undefined
  return sec?.playground ? sec : undefined
})

const canSwap = (r: TokenRow): boolean => !!(r.source && r.selector !== null)
// cva components are edited in their variants file; others in their own file.
const target = () => ({
  id: info.value.match?.component.id ?? info.value.kit!.file,
  file: info.value.match?.component.file ?? info.value.kit!.file
})
const key = (r: TokenRow) => ({
  component: target().id,
  axis: r.source!.axis,
  option: r.source!.option,
  from: r.use.cls
})
/** The token in effect for a row, after any draft swap. */
function current(r: TokenRow) {
  const s = canSwap(r) ? swapFor(key(r)) : undefined
  return (s && tokenByName(s.toToken)) || r.use.token
}
const options = (r: TokenRow) => tokenOptions(KIND_GROUP[r.use.kind])
function swap(r: TokenRow, name: string): void {
  const t = tokensIn(KIND_GROUP[r.use.kind]).find((x) => x.name === name)!
  // A CSS rule: swap the var() in its declaration, in its own file.
  if (r.source?.axis === 'css' && r.property) {
    const from = `var(--${r.cssVar ?? cssVarName(r.use.token)})`
    const to = `var(--${cssVarName(t)})`
    const value = r.use.cls.slice(r.property.length + 2)
    setSwap({
      ...key(r),
      componentName: info.value.name,
      file: r.file ?? target().file,
      to: name === r.use.token.name ? r.use.cls : `${r.property}: ${value.replace(from, to)}`,
      fromToken: r.use.token.name,
      toToken: name,
      selector: r.selector!,
      css: `${r.property}: ${value.replace(from, to)} !important;`,
      property: r.property
    })
    return
  }
  setSwap({
    ...key(r),
    componentName: info.value.name,
    file: target().file,
    to: name === r.use.token.name ? r.use.cls : swapClass(r.use, t),
    fromToken: r.use.token.name,
    toToken: name,
    selector: `${r.selector}${r.stateSuffix}`,
    css: declaration(r.use.kind, t, r.use.opacity)
  })
}
// This component's draft: its swaps, plus value changes of tokens it uses.
const mine = computed(() => (info.value.kit || info.value.match ? swapsOf(target().id) : []))
const usedTokens = computed(() => [
  ...new Set(groups.value.flatMap((g) => g.rows.map((r) => current(r))).filter(isChanged))
])
const llmScope = computed(() => ({ tokens: usedTokens.value, swaps: mine.value, merges: [] }))
// Footer actions: copy / revert this component's changes.
watchEffect(() => {
  if (!info.value.kit && !info.value.match) return void (scopedActions.value = null)
  const id = target().id
  scopedActions.value = {
    label: info.value.name,
    changes: mine.value.length + usedTokens.value.length,
    scope: llmScope.value,
    revert: mine.value.length ? () => revertComponent(id) : undefined
  }
})
onBeforeUnmount(() => (scopedActions.value = null))
const usage = computed(() => (info.value.kit ? componentUsage(info.value.kit.name) : null))

// Preview (props: try variants, changes nothing) vs Tokens (edits the
// design system). Only stage specimens have props.
// Edit tokens (changes the design system), Variants (props: try variants,
// changes nothing; stage specimens only) and Info (layout, where used).
type Tab = 'tokens' | 'preview' | 'info'
const mode = ref<Tab>('tokens')
const tab = computed<Tab>({
  get: () => (mode.value === 'preview' && !playground.value ? 'tokens' : mode.value),
  set: (v) => (mode.value = v)
})
const tabs = computed(() => [
  { value: 'tokens' as Tab, label: 'Edit tokens', count: changeCount.value || undefined },
  ...(playground.value ? [{ value: 'preview' as Tab, label: 'Variants' }] : []),
  { value: 'info' as Tab, label: 'Info' }
])
// "variant primary · size md · ui/button.variants.ts": the variant parts
// go next to the tokens, the file stays in the header.
const detailParts = computed(() => info.value.detail?.split(' · ') ?? [])
const variantParts = computed(() => detailParts.value.filter((d) => !d.includes('/')))
const fileParts = computed(() => detailParts.value.filter((d) => d.includes('/')))
const changeCount = computed(() => mine.value.length + usedTokens.value.length)

const sourceLabel = (r: TokenRow): string =>
  !r.source
    ? 'Set at the call site or repeated in the file · not swappable'
    : r.source.axis === 'base'
      ? `Base · every ${info.value.name.toLowerCase()}`
      : r.source.axis === 'file'
        ? r.source.option.split('/').pop()!
        : r.source.axis === 'css'
          ? `CSS · ${r.source.option}`
          : `${r.source.axis} ${r.source.option}`
</script>

<template>
  <div class="dse:flex dse:flex-col dse:gap-6">
    <header class="dse:relative dse:pr-8">
      <CopyRef
        class="dse:absolute dse:top-0 dse:right-0"
        :what="info.name"
        :text="
          () =>
            componentReference(info.kit?.name ?? info.match?.component.name ?? info.name, {
              options: info.match?.options,
              rows: groups.flatMap((g) => g.rows)
            })
        "
      />
      <h3 class="dse:text-ui dse:font-semibold">{{ info.name }}</h3>
      <p class="dse:mt-0.5 dse:truncate dse:text-ui dse:text-subtle-foreground">
        {{
          [
            ...(playground ? fileParts : detailParts),
            usage && `used ${usage.total}× in ${usage.files.length} files`
          ]
            .filter(Boolean)
            .join(' · ')
        }}
      </p>
    </header>

    <SegmentedControl v-model="tab" variant="contained" class="dse:[&>*]:flex-1" :options="tabs" />

    <!-- Preview: props drive the Playground only -->
    <section v-if="playground && tab === 'preview'" class="dse:flex dse:flex-col dse:gap-4">
      <p class="dse:text-ui dse:text-subtle-foreground">Preview only. Doesn't change the design system.</p>
      <PropControl
        v-for="c in playground.playground!.controls"
        :key="c.key"
        v-model="playgroundState[playground.id]![c.key] as string | boolean"
        :control="c"
      />
    </section>

    <!-- Info: layout values and where the component is used -->
    <template v-else-if="tab === 'info'">
      <section>
        <h4 class="dse:mb-2 dse:text-ui dse:font-semibold">Layout</h4>
        <div
          v-for="r in info.layout"
          :key="r.label"
          class="dse:flex dse:items-center dse:gap-2 dse:border-t dse:border-border-default dse:py-2 dse:text-ui"
        >
          <span class="dse:w-24 dse:shrink-0 dse:text-muted-foreground">{{ r.label }}</span>
          <span class="dse:min-w-0 dse:flex-1 dse:truncate dse:font-mono dse:text-ui">{{ r.value }}</span>
          <Badge v-if="r.offGrid" variant="outline" size="sm">off grid</Badge>
          <span v-else-if="r.cls" class="dse:truncate dse:font-mono dse:text-ui dse:text-subtle-foreground">{{
            r.cls
          }}</span>
        </div>
      </section>
      <UsageList v-if="usage" :usage noun="instances" />
    </template>

    <!-- Tokens: edits the design system (into the draft) -->
    <template v-else>
      <section>
        <p
          v-if="playground && variantParts.length"
          class="dse:mb-3 dse:flex dse:flex-wrap dse:items-center dse:gap-1.5 dse:text-ui"
        >
          <Badge v-for="d in variantParts" :key="d" size="md">{{ d }}</Badge>
          <Button variant="link" size="sm" class="dse:ml-auto" @click="tab = 'preview'">Change</Button>
        </p>
        <p v-if="!groups.length" class="dse:text-ui dse:text-subtle-foreground">
          No design tokens on this element.
        </p>
        <template v-for="group in groups" :key="group.label">
          <p
            v-if="groups.length > 1"
            class="dse:mt-3 dse:mb-1 dse:text-ui dse:font-medium dse:tracking-wider dse:text-subtle-foreground dse:uppercase"
          >
            {{ group.label }}
          </p>
          <div
            v-for="r in group.rows"
            :key="group.label + r.use.cls"
            class="dse:flex dse:flex-col dse:gap-2 dse:border-t dse:border-border-default dse:py-3"
          >
            <div class="dse:flex dse:items-center dse:gap-2">
              <span class="dse:flex-1 dse:text-ui">{{ PROP_LABEL[r.use.kind] }}</span>
              <Badge v-if="r.use.states.length" size="sm">{{ stateLabel(r.use.states) }}</Badge>
              <span v-if="r.use.opacity" class="dse:text-ui dse:text-subtle-foreground"
                >{{ r.use.opacity }}%</span
              >
            </div>
            <div class="dse:flex dse:items-center dse:gap-2">
              <template v-if="canSwap(r)">
                <span
                  v-if="current(r).group === 'color'"
                  class="dse:size-6 dse:shrink-0 dse:rounded-control dse:border dse:border-border-strong"
                  :style="{ background: valueOf(current(r)) }"
                />
                <Select
                  :model-value="current(r).name"
                  size="sm"
                  class="dse:min-w-0 dse:flex-1"
                  :options="options(r)"
                  @update:model-value="(v: string) => swap(r, v)"
                />
                <Button
                  variant="ghost"
                  size="icon-sm"
                  :aria-label="`Edit ${shortName(current(r))} everywhere`"
                  title="Edit this token everywhere"
                  @click="selectToken(current(r))"
                  ><ArrowUpRight :size="14"
                /></Button>
              </template>
              <TokenChip v-else :token="current(r)" />
            </div>
            <p class="dse:flex dse:items-center dse:gap-2 dse:text-ui dse:text-subtle-foreground">
              <span class="dse:flex-1 dse:truncate">{{ sourceLabel(r) }}</span>
              <span>used in {{ usageOf(current(r)).files.length }} files</span>
            </p>
          </div>
        </template>
      </section>

      <section v-if="info.hardcoded.length">
        <h4 class="dse:mb-1 dse:text-ui dse:font-semibold">Hardcoded</h4>
        <p class="dse:mb-2 dse:text-ui dse:text-subtle-foreground">
          Literal values, not tokens. They can't be tweaked here until they become tokens.
        </p>
        <div
          v-for="r in info.hardcoded"
          :key="r.label"
          class="dse:flex dse:items-center dse:gap-2 dse:border-t dse:border-border-default dse:py-2 dse:text-ui"
        >
          <span class="dse:w-24 dse:shrink-0 dse:text-muted-foreground">{{ r.label }}</span>
          <span class="dse:min-w-0 dse:flex-1 dse:truncate dse:font-mono dse:text-ui">{{ r.value }}</span>
          <span v-if="r.cls" class="dse:truncate dse:font-mono dse:text-ui dse:text-subtle-foreground">{{
            r.cls
          }}</span>
        </div>
      </section>
    </template>
  </div>
</template>
