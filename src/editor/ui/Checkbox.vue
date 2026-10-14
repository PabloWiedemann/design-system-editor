<script setup lang="ts">
import { Check } from 'lucide-vue-next'
import { CheckboxIndicator, CheckboxRoot } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { cn } from './cn'

/** `overlay` sits on imagery (gallery selection); `default` on surfaces. */
const { variant = 'default', class: className } = defineProps<{
  variant?: 'default' | 'overlay'
  class?: HTMLAttributes['class']
}>()
const model = defineModel<boolean>({ default: false })
</script>

<template>
  <CheckboxRoot
    v-model="model"
    :class="
      cn(
        'dse:inline-flex dse:size-5 dse:shrink-0 dse:items-center dse:justify-center dse:rounded-min dse:border dse:outline-none dse:transition-colors dse:focus-visible:ring-2 dse:focus-visible:ring-border-focus',
        'dse:data-[state=checked]:border-inverted-background dse:data-[state=checked]:bg-inverted-background dse:data-[state=checked]:text-inverted-foreground',
        variant === 'overlay'
          ? 'dse:size-6 dse:border-white/50 dse:bg-media-overlay dse:backdrop-blur-sm'
          : 'dse:border-border-strong dse:bg-secondary-background',
        className
      )
    "
  >
    <CheckboxIndicator><Check :size="13" /></CheckboxIndicator>
  </CheckboxRoot>
</template>
