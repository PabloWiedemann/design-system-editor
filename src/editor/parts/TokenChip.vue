<script setup lang="ts">
import { cn } from '../ui/cn'
import { shortName, type Token } from '../lib/tokens'
import { isChanged, mergedInto, valueOf } from '../lib/tweaks'
import { selectToken } from '../lib/inspect/selection'

/** A token reference: swatch/value preview + name. Click to inspect it. */
const { token, struck = false } = defineProps<{ token: Token; struck?: boolean }>()
</script>

<template>
  <button
    type="button"
    :class="
      cn(
        'dse:inline-flex dse:h-6 dse:min-w-0 dse:items-center dse:gap-2 dse:rounded-control dse:border dse:border-border-default dse:bg-secondary-background dse:px-2 dse:font-mono dse:text-ui dse:text-base-foreground dse:outline-none dse:hover:bg-secondary-background-hover dse:focus-visible:ring-2 dse:focus-visible:ring-border-focus',
        (struck || mergedInto(token)) && 'dse:line-through dse:opacity-50'
      )
    "
    :title="
      mergedInto(token)
        ? `Merging into --${mergedInto(token)}`
        : `--${token.name}: ${valueOf(token)}`
    "
    @click="selectToken(token)"
  >
    <span
      v-if="token.group === 'color'"
      class="dse:size-3 dse:shrink-0 dse:rounded-min dse:border dse:border-border-strong"
      :style="{ background: valueOf(token) }"
    />
    <span class="dse:truncate">{{ shortName(token) }}</span>
    <span v-if="isChanged(token)" class="dse:size-1.5 dse:shrink-0 dse:rounded-full dse:bg-status-running" />
  </button>
</template>
