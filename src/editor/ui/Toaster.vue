<script setup lang="ts">
import { ToastProvider, ToastRoot, ToastTitle, ToastViewport } from 'reka-ui'
import { computed } from 'vue'
import { toastMessage } from './toast'

const open = computed({
  get: () => Boolean(toastMessage.value),
  set: (v) => {
    if (!v) toastMessage.value = ''
  }
})
</script>

<template>
  <ToastProvider :duration="2200">
    <ToastRoot
      v-model:open="open"
      class="dse-float dse:rounded-control dse:bg-inverted-background dse:px-3.5 dse:py-2 dse:text-ui dse:font-medium dse:text-inverted-foreground dse:shadow-popover dse:data-[state=open]:animate-pop-in"
    >
      <ToastTitle>{{ toastMessage }}</ToastTitle>
    </ToastRoot>
    <ToastViewport class="dse:fixed dse:top-4 dse:left-1/2 dse:z-[2147483100] dse:-translate-x-1/2 dse:outline-none" />
  </ToastProvider>
</template>
