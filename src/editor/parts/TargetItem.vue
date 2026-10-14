<script setup lang="ts">
import DropdownMenuItem from '../ui/DropdownMenuItem.vue'
import type { Token } from '../lib/tokens'
import { valueOf } from '../lib/tweaks'

/** One edit target in a section's menu: a component, or a token with
 *  its swatch and value. */
defineProps<{ target: { label: string; token?: Token } }>()
defineEmits<{ select: [] }>()
</script>

<template>
  <DropdownMenuItem @select="$emit('select')">
    <span
      v-if="target.token?.group === 'color'"
      class="dse:size-3 dse:shrink-0 dse:rounded-min dse:border dse:border-border-strong"
      :style="{ background: valueOf(target.token) }"
    />
    <span class="dse:flex-1 dse:truncate">{{ target.label }}</span>
    <span v-if="target.token" class="dse:max-w-28 dse:truncate dse:font-mono dse:text-ui dse:text-subtle-foreground">{{
      valueOf(target.token)
    }}</span>
  </DropdownMenuItem>
</template>
