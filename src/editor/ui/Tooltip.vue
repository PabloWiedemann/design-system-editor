<script setup lang="ts">
import { TooltipContent, TooltipPortal, TooltipRoot, TooltipTrigger } from 'reka-ui'
import { PORTAL_TO } from './portal'

/**
 * Wrap an interactive element; it becomes the trigger. Needs the
 * TooltipProvider mounted by App.vue.
 *
 * `wrap`: anchor on a wrapping span instead of the child. Use it around a
 * whole DropdownMenuRoot/PopoverRoot (never between a Root and its
 * Trigger: the trigger would register with the tooltip's popper and the
 * menu would have no anchor).
 */
const {
  content,
  side = 'top',
  wrap = false
} = defineProps<{
  content: string
  side?: 'top' | 'bottom' | 'left' | 'right'
  wrap?: boolean
}>()
</script>

<template>
  <TooltipRoot>
    <TooltipTrigger v-if="wrap" as="span" class="dse:inline-flex"><slot /></TooltipTrigger>
    <TooltipTrigger v-else as-child><slot /></TooltipTrigger>
    <TooltipPortal :to="PORTAL_TO" defer>
      <TooltipContent
        :side
        :side-offset="6"
        class="dse-float dse:z-[2147483100] dse:max-w-64 dse:rounded-control dse:bg-inverted-background dse:px-2 dse:py-1 dse:text-ui dse:font-medium dse:text-inverted-foreground dse:shadow-popover dse:data-[state=delayed-open]:animate-fade-in"
      >
        {{ content }}
      </TooltipContent>
    </TooltipPortal>
  </TooltipRoot>
</template>
