<script setup lang="ts">
import { X } from 'lucide-vue-next'
import { DialogClose, DialogContent, DialogOverlay, DialogPortal } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { cn } from './cn'
import { PORTAL_TO } from './portal'

/** Centered modal surface with scrim. Pair with reka's DialogRoot,
 *  DialogTitle and DialogDescription. */
const {
  size = 'md',
  closable = true,
  class: className
} = defineProps<{
  size?: 'sm' | 'md' | 'lg'
  closable?: boolean
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <DialogPortal :to="PORTAL_TO" defer>
    <DialogOverlay
      class="dse-float dse:fixed dse:inset-0 dse:z-[2147483100] dse:bg-media-overlay dse:backdrop-blur-[3px] dse:data-[state=open]:animate-fade-in"
    />
    <DialogContent
      :class="
        cn(
          'dse-float dse:fixed dse:top-1/2 dse:left-1/2 dse:z-[2147483100] dse:flex dse:max-h-[calc(100vh-48px)] dse:-translate-x-1/2 dse:-translate-y-1/2 dse:flex-col dse:overflow-hidden dse:border dse:border-border-default dse:bg-card-background dse:text-base-foreground dse:shadow-elev dse:outline-none dse:data-[state=open]:animate-pop-in',
          size === 'sm' && 'dse:w-[380px] dse:rounded-panel',
          size === 'md' && 'dse:w-[420px] dse:rounded-panel',
          size === 'lg' && 'dse:w-[min(920px,calc(100vw-48px))] dse:rounded-panel',
          className
        )
      "
    >
      <slot />
      <DialogClose
        v-if="closable"
        aria-label="Close"
        class="dse:absolute dse:top-3 dse:right-3 dse:inline-flex dse:size-8 dse:items-center dse:justify-center dse:rounded-full dse:text-subtle-foreground dse:outline-none dse:hover:bg-secondary-background dse:hover:text-base-foreground dse:focus-visible:ring-2 dse:focus-visible:ring-border-focus"
      >
        <X :size="15" />
      </DialogClose>
    </DialogContent>
  </DialogPortal>
</template>
