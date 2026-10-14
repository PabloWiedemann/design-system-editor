<script setup lang="ts">
import { SwitchRoot, SwitchThumb } from 'reka-ui'
import { useId } from 'vue'

/** On/off control. With `label` it renders as a labelled row; without one
 *  it renders the bare switch (pass `dse:aria-label` for inline use in lists). */
const { label, ariaLabel } = defineProps<{ label?: string; ariaLabel?: string }>()
const model = defineModel<boolean>({ default: false })
const id = useId()
const root =
  'dse:relative dse:inline-flex dse:h-5 dse:w-9 dse:shrink-0 dse:items-center dse:rounded-full dse:bg-secondary-background-hover dse:p-0.5 dse:outline-none dse:transition-colors dse:focus-visible:ring-2 dse:focus-visible:ring-border-focus dse:data-[state=checked]:bg-inverted-background'
const thumb =
  'dse:block dse:size-4 dse:rounded-full dse:bg-base-foreground dse:shadow dse:transition-transform dse:duration-150 dse:data-[state=checked]:translate-x-4 dse:data-[state=checked]:bg-inverted-foreground'
</script>

<template>
  <div v-if="label" class="dse:flex dse:items-center dse:justify-between dse:gap-3">
    <label :for="id" class="dse:cursor-pointer dse:text-ui dse:text-base-foreground">{{ label }}</label>
    <SwitchRoot :id v-model="model" :class="root"><SwitchThumb :class="thumb" /></SwitchRoot>
  </div>
  <SwitchRoot v-else v-model="model" :aria-label="ariaLabel" :class="root"
    ><SwitchThumb :class="thumb"
  /></SwitchRoot>
</template>
