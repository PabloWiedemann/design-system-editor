<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { host, type MountHandle, type RenderSpec } from '../lib/specimens'
import { project } from '../lib/project'

/**
 * Where the repo's own component renders: the host adapter (Vue or React,
 * the repo's framework) mounts `spec` into this element. `display:
 * contents`, so the component lays out as a direct child of the cell.
 */
const { spec } = defineProps<{ spec: RenderSpec }>()
const el = ref<HTMLElement>()
const error = ref('')
let handle: MountHandle | null = null

onMounted(() => {
  try {
    handle = host.adapter!.mount(el.value!, spec)
  } catch (e) {
    error.value = e instanceof Error ? e.message : String(e)
  }
})
watch(
  () => spec,
  (s) => handle?.update(s)
)
onBeforeUnmount(() => handle?.unmount())
</script>

<template>
  <div ref="el" data-dse-mount :class="['dse:contents', project.scopeClass]" />
  <p v-if="error" class="dse:font-mono dse:text-ui dse:text-status-danger">{{ error }}</p>
</template>
