<script setup lang="ts">
import { computed, onBeforeUnmount, watchEffect } from 'vue'
import { Combine } from 'lucide-vue-next'
import Button from '../ui/Button.vue'
import SegmentedControl from '../ui/SegmentedControl.vue'
import Select from '../ui/Select.vue'
import { scopedActions, tokenTab } from '../lib/inspect/actions'
import { declarationOf, tokenReference, utilitiesOf } from '../lib/reference'
import type { ConsolidateGroup } from '../lib/consolidate/rules'
import { startConsolidate } from '../lib/consolidate/session'
import { namespaceOf } from '../lib/theme'
import CopyRef from './CopyRef.vue'
import TokenControl from './TokenControl.vue'
import UsageList from './UsageList.vue'
import { tokenByName } from '../lib/inspect/selection'
import { usageOf } from '../lib/inspect/usage'
import { tokenOptions } from '../lib/tokenOptions'
import { cssVarName, groupLabel, shortName, type Token } from '../lib/tokens'
import { draft, isChanged, mergedInto, mergeToken, revertToken } from '../lib/tweaks'

/** A selected token, in tabs like a component's: Edit token (its value,
 *  everywhere), Merge (move its uses onto another token) and Info (where
 *  it's declared and used). Sub-properties travel with their parent, so
 *  they can't merge on their own. */
const { token } = defineProps<{ token: Token }>()
const usage = computed(() => usageOf(token))
const merge = computed(() => mergedInto(token))
const changed = computed(() => isChanged(token) || !!merge.value)
const mergeOptions = computed(() =>
  tokenOptions(token.group).filter((o) => o.value !== token.name && !draft.merges[o.value])
)
const scope = computed(() => ({
  tokens: isChanged(token) ? [token] : [],
  swaps: [],
  merges: merge.value ? ([[token.name, merge.value]] as [string, string][]) : []
}))
// Footer actions: copy / revert this token's changes.
watchEffect(() => {
  scopedActions.value = {
    label: shortName(token),
    changes: changed.value ? 1 : 0,
    scope: scope.value,
    revert: changed.value ? () => revertToken(token) : undefined
  }
})
onBeforeUnmount(() => (scopedActions.value = null))

type Tab = 'edit' | 'merge' | 'info'
// Sticks while moving between tokens.
const mode = tokenTab
const canMerge = computed(() => !token.parent)
const tab = computed<Tab>({
  get: () => (mode.value === 'merge' && !canMerge.value ? 'edit' : mode.value),
  set: (v) => (mode.value = v)
})
const tabs = computed(() => [
  { value: 'edit' as Tab, label: 'Edit token', count: isChanged(token) ? 1 : undefined },
  ...(canMerge.value
    ? [{ value: 'merge' as Tab, label: 'Merge', count: merge.value ? 1 : undefined }]
    : []),
  { value: 'info' as Tab, label: 'Info' }
])
const consolidatable = computed(() => ['color', 'text', 'radius', 'shadow'].includes(token.group))
const facts = computed(() => {
  const ns = namespaceOf(token.parent ?? token.name)
  return [
    { label: 'Value', value: token.value },
    { label: 'Declared', value: declarationOf(token)?.split(' → ')[0] ?? '—' },
    { label: 'Namespace', value: `--${ns.prefix}*` },
    {
      label: 'Use as',
      value: [...utilitiesOf(token), `var(--${cssVarName(token)})`].join(', ')
    },
    ...(token.parent ? [{ label: 'Carried by', value: `--${token.parent}` }] : [])
  ]
})
</script>

<template>
  <div class="dse:flex dse:flex-col dse:gap-6">
    <header class="dse:relative dse:pr-8">
      <CopyRef
        class="dse:absolute dse:top-0 dse:right-0"
        :what="`--${token.name}`"
        :text="() => tokenReference(token)"
      />
      <h3 class="dse:font-mono dse:text-ui dse:font-semibold dse:break-all">--{{ token.name }}</h3>
      <p class="dse:mt-0.5 dse:truncate dse:text-ui dse:text-subtle-foreground">
        {{ groupLabel(token.group) }} · used {{ usage.total }}× in {{ usage.files.length }} files
      </p>
    </header>

    <SegmentedControl v-model="tab" variant="contained" class="dse:[&>*]:flex-1" :options="tabs" />

    <!-- Edit token: its value, everywhere -->
    <section v-if="tab === 'edit'" class="dse:flex dse:flex-col dse:gap-3">
      <TokenControl v-if="!merge" :token />
      <p v-else class="dse:text-ui dse:text-subtle-foreground">
        Merging into {{ shortName(tokenByName(merge)!) }}: its value no longer applies.
        <Button variant="link" size="sm" @click="tab = 'merge'">See merge</Button>
      </p>
      <p class="dse:text-ui dse:text-subtle-foreground">
        Changes it in all {{ usage.total }} places.
        <template v-if="token.parent"
          >Travels with --{{ token.parent }}, wherever that is used.</template
        >
      </p>
    </section>

    <!-- Merge: move every use onto another token, then remove this one -->
    <section v-else-if="tab === 'merge'" class="dse:flex dse:flex-col dse:gap-3">
      <Select
        :model-value="merge ?? ''"
        size="sm"
        label="Merge into"
        :options="mergeOptions"
        @update:model-value="(v: string) => mergeToken(token, tokenByName(v) ?? null)"
      />
      <p class="dse:text-ui dse:text-subtle-foreground">
        {{
          merge
            ? `All ${usage.total} uses switch to ${shortName(tokenByName(merge)!)}, and ${shortName(token)} is deleted (in the llm.txt).`
            : 'Replaces every use with another token, then deletes this one.'
        }}
      </p>
      <Button
        v-if="consolidatable"
        size="sm"
        class="dse:self-start"
        @click="startConsolidate(token.group as ConsolidateGroup)"
        ><Combine :size="13" />Consolidate all {{ groupLabel(token.group).toLowerCase() }}</Button
      >
    </section>

    <!-- Info: where it's declared and used -->
    <template v-else>
      <section class="dse:flex dse:flex-col">
        <div
          v-for="r in facts"
          :key="r.label"
          class="dse:flex dse:items-start dse:gap-2 dse:border-t dse:border-border-default dse:py-2 dse:text-ui"
        >
          <span class="dse:w-20 dse:shrink-0 dse:text-muted-foreground">{{ r.label }}</span>
          <span class="dse:min-w-0 dse:flex-1 dse:font-mono dse:break-all">{{ r.value }}</span>
        </div>
      </section>
      <UsageList :usage />
    </template>
  </div>
</template>
