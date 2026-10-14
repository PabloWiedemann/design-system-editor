<script setup lang="ts">
import { computed } from 'vue'
import Card from '../ui/Card.vue'
import HostMount from './HostMount.vue'
import { host } from '../lib/specimens'
import { playgroundSpec, type Section } from '../lib/specimens'

/** The live specimen driven by the inspector's Variants tab, on a quiet
 *  surface. Never driven by the design system. */
const { section } = defineProps<{ section: Section }>()
const spec = computed(() => playgroundSpec(section))
</script>

<template>
  <Card
    variant="inset"
    padding="lg"
    class="dse:flex dse:min-h-32 dse:items-center dse:justify-center"
    data-playground
    :style="host.surface ? { background: host.surface } : undefined"
    :data-dse-component="section.playgroundName"
  >
    <span class="dse:absolute dse:top-2.5 dse:left-3 dse:text-ui dse:text-subtle-foreground"
      >Playground</span
    >
    <HostMount :spec />
  </Card>
</template>
