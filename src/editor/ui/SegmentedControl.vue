<script setup lang="ts" generic="T extends string">
import { ToggleGroupItem, ToggleGroupRoot } from 'reka-ui'
import type { Component, HTMLAttributes } from 'vue'
import { cn } from './cn'

export interface SegmentOption<V extends string = string> {
  value: V
  label?: string
  icon?: Component
  count?: number
  /** Required when the option is icon-only. */
  ariaLabel?: string
}

/** Single-choice toggle group. `contained` draws a track behind the options
 *  (used for primary scopes like All / Local / Cloud); `plain` is for quiet
 *  section switches. */
const {
  options,
  variant = 'plain',
  size = 'md',
  class: className
} = defineProps<{
  options: SegmentOption<T>[]
  variant?: 'plain' | 'contained'
  size?: 'sm' | 'md'
  class?: HTMLAttributes['class']
}>()
const model = defineModel<T>({ required: true })

function onUpdate(v: unknown): void {
  // A segmented control always has a selection.
  if (typeof v === 'string' && v) model.value = v as T
}
</script>

<template>
  <ToggleGroupRoot
    type="single"
    :model-value="model"
    :class="
      cn(
        'dse:inline-flex dse:items-center dse:gap-0.5',
        variant === 'contained' &&
          'dse:rounded-control dse:border dse:border-border-default dse:bg-secondary-background dse:p-0.5',
        className
      )
    "
    @update:model-value="onUpdate"
  >
    <ToggleGroupItem
      v-for="o in options"
      :key="o.value"
      :value="o.value"
      :aria-label="o.ariaLabel ?? o.label"
      :class="
        cn(
          'dse:inline-flex dse:shrink-0 dse:items-center dse:justify-center dse:gap-1.5 dse:whitespace-nowrap dse:text-muted-foreground dse:transition-colors dse:duration-150 dse:outline-none',
          'dse:hover:text-base-foreground dse:focus-visible:ring-2 dse:focus-visible:ring-border-focus',
          'dse:data-[state=on]:bg-secondary-background-hover dse:data-[state=on]:text-base-foreground',
          variant === 'contained' ? 'dse:rounded-control' : 'dse:rounded-control',
          size === 'sm' ? 'dse:h-6 dse:px-2 dse:text-ui' : 'dse:h-7 dse:px-2.5 dse:text-ui',
          !o.label && (size === 'sm' ? 'dse:w-6 dse:px-0' : 'dse:w-7 dse:px-0')
        )
      "
    >
      <component :is="o.icon" v-if="o.icon" :size="13" />
      <span v-if="o.label">{{ o.label }}</span>
      <span v-if="o.count !== undefined" class="dse:text-ui dse:text-subtle-foreground dse:tabular-nums">{{
        o.count
      }}</span>
    </ToggleGroupItem>
  </ToggleGroupRoot>
</template>
