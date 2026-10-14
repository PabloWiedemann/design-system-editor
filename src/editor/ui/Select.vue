<script setup lang="ts" generic="T extends string">
import { Check, ChevronDown } from 'lucide-vue-next'
import {
  SelectContent,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectPortal,
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectViewport
} from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { cn } from './cn'
import { fieldVariants, type FieldVariants } from './field.variants'
import { floatingSurface, menuItem } from './menu.styles'
import { PORTAL_TO } from './portal'

export interface SelectOption<V extends string = string> {
  value: V
  label: string
  /** Secondary value shown right-aligned in the list (e.g. a token's value). */
  hint?: string
  /** CSS color for a small swatch before the label. */
  swatch?: string
}

/** Option-list select. `label` renders a muted prefix inside the trigger
 *  ("Sort  Newest first") so filter bars need no separate labels. */
const {
  options,
  label,
  size,
  variant = 'field',
  class: className
} = defineProps<{
  options: SelectOption<T>[]
  label?: string
  size?: FieldVariants['size']
  /** `ghost`: borderless, for inline values in lists and settings rows. */
  variant?: 'field' | 'ghost'
  class?: HTMLAttributes['class']
}>()
const model = defineModel<T>({ required: true })
</script>

<template>
  <SelectRoot v-model="model">
    <SelectTrigger
      :aria-label="label"
      :class="
        cn(
          fieldVariants({ size }),
          'dse:cursor-pointer dse:gap-1.5 dse:pr-2 dse:outline-none dse:focus-visible:border-border-focus dse:focus-visible:ring-2 dse:focus-visible:ring-border-focus/30 dse:data-[state=open]:border-border-strong',
          variant === 'ghost' &&
            'dse:w-auto dse:border-transparent dse:bg-transparent dse:text-muted-foreground dse:hover:border-transparent dse:hover:bg-secondary-background dse:hover:text-base-foreground dse:focus-within:ring-0 dse:data-[state=open]:border-transparent dse:data-[state=open]:bg-secondary-background',
          className
        )
      "
    >
      <span v-if="label" class="dse:text-subtle-foreground">{{ label }}</span>
      <SelectValue class="dse:truncate" />
      <ChevronDown :size="13" class="dse:ml-auto dse:shrink-0 dse:text-subtle-foreground" />
    </SelectTrigger>
    <SelectPortal :to="PORTAL_TO" defer>
      <SelectContent
        position="popper"
        :side-offset="6"
        align="start"
        :class="
          cn(
            floatingSurface,
            'dse:flex dse:max-h-[min(320px,var(--reka-select-content-available-height))] dse:min-w-(--reka-select-trigger-width) dse:flex-col'
          )
        "
      >
        <SelectViewport>
          <SelectItem
            v-for="o in options"
            :key="o.value"
            :value="o.value"
            :class="cn(menuItem, 'dse:pr-2')"
          >
            <span
              v-if="o.swatch"
              class="dse:size-4 dse:shrink-0 dse:rounded-min dse:border dse:border-border-strong"
              :style="{ background: o.swatch }"
            />
            <SelectItemText>{{ o.label }}</SelectItemText>
            <span
              v-if="o.hint"
              class="dse:ml-auto dse:max-w-40 dse:truncate dse:pl-4 dse:font-mono dse:text-ui dse:text-subtle-foreground"
              >{{ o.hint }}</span
            >
            <span :class="cn('dse:flex dse:w-4 dse:shrink-0 dse:justify-end', !o.hint && 'dse:ml-auto')">
              <SelectItemIndicator class="dse:text-muted-foreground"
                ><Check :size="13"
              /></SelectItemIndicator>
            </span>
          </SelectItem>
        </SelectViewport>
      </SelectContent>
    </SelectPortal>
  </SelectRoot>
</template>
