<script setup lang="ts">
import { ref } from 'vue'
import { ChevronDown } from 'lucide-vue-next'
import { cn } from '../ui/cn'
import TokenChip from './TokenChip.vue'
import { GROUPS, tokensIn, type TokenGroup } from '../lib/tokens'
import { valueOf } from '../lib/tweaks'
import { usageOf } from '../lib/inspect/usage'

/** All tokens by group, as found in the theme. Click one to inspect it. */
const LIST = GROUPS.map((g) => ({ group: g.ns.id, label: g.ns.label }))
const open = ref(new Set<TokenGroup>(['color']))
function toggle(g: TokenGroup): void {
  const next = new Set(open.value)
  if (next.has(g)) next.delete(g)
  else next.add(g)
  open.value = next
}
</script>

<template>
  <div v-for="g in LIST" :key="g.group" class="dse:border-b dse:border-border-default">
    <button
      type="button"
      class="dse:flex dse:h-10 dse:w-full dse:items-center dse:gap-2 dse:text-left dse:text-ui dse:font-medium dse:outline-none dse:focus-visible:text-base-foreground"
      :aria-expanded="open.has(g.group)"
      @click="toggle(g.group)"
    >
      <span class="dse:flex-1">{{ g.label }}</span>
      <span class="dse:text-ui dse:text-subtle-foreground">{{ tokensIn(g.group).length }}</span>
      <ChevronDown
        :size="14"
        :class="
          cn('dse:text-subtle-foreground dse:transition-transform', open.has(g.group) && 'dse:rotate-180')
        "
      />
    </button>
    <div v-if="open.has(g.group)" class="dse:flex dse:flex-col dse:gap-1 dse:pb-3">
      <div v-for="t in tokensIn(g.group)" :key="t.name" class="dse:flex dse:items-center dse:gap-2">
        <TokenChip :token="t" class="dse:max-w-44" />
        <span class="dse:min-w-0 dse:flex-1 dse:truncate dse:text-right dse:font-mono dse:text-ui dse:text-subtle-foreground">{{
          valueOf(t)
        }}</span>
        <span class="dse:w-10 dse:shrink-0 dse:text-right dse:font-mono dse:text-ui dse:text-subtle-foreground dse:tabular-nums"
          >{{ usageOf(t).total }}×</span
        >
      </div>
    </div>
  </div>
</template>
