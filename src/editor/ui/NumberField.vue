<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue'
import { Minus, Plus } from 'lucide-vue-next'
import {
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
  NumberFieldRoot
} from 'reka-ui'
import { cn } from './cn'
import { fieldInputClass, fieldVariants, type FieldVariants } from './field.variants'

/** Number entry on the shared field shell, with − / + steppers. Arrow
 *  keys step, Page Up/Down step ×10, Home/End jump to min/max; typed values
 *  are clamped on blur. `unit` sits inside the field after the number. */
const {
  size = 'sm',
  min,
  max,
  step = 1,
  unit,
  ariaLabel,
  disabled = false,
  class: className
} = defineProps<{
  size?: FieldVariants['size']
  min?: number
  max?: number
  step?: number
  unit?: string
  ariaLabel?: string
  disabled?: boolean
  class?: HTMLAttributes['class']
}>()
const model = defineModel<number>({ required: true })
// Clearing the field mid-edit sends no value: keep the last good one.
const value = computed({
  get: () => model.value,
  set: (v: number | undefined) => {
    if (v !== undefined && Number.isFinite(v)) model.value = v
  }
})
const stepper =
  'dse:flex dse:size-5 dse:shrink-0 dse:items-center dse:justify-center dse:rounded-min dse:text-muted-foreground dse:outline-none dse:transition-colors dse:hover:bg-secondary-background dse:hover:text-base-foreground dse:focus-visible:ring-2 dse:focus-visible:ring-border-focus dse:disabled:pointer-events-none dse:disabled:opacity-40'
</script>

<template>
  <NumberFieldRoot
    v-model="value"
    :min
    :max
    :step
    :disabled
    :class="cn(fieldVariants({ size }), 'dse:gap-1 dse:px-1', className)"
  >
    <NumberFieldDecrement :class="stepper"><Minus :size="12" /></NumberFieldDecrement>
    <NumberFieldInput
      :aria-label="ariaLabel"
      :class="cn(fieldInputClass, 'dse:w-0 dse:text-center dse:tabular-nums')"
    />
    <span v-if="unit" class="dse:shrink-0 dse:text-ui dse:text-subtle-foreground">{{ unit }}</span>
    <NumberFieldIncrement :class="stepper"><Plus :size="12" /></NumberFieldIncrement>
  </NumberFieldRoot>
</template>
