<script setup lang="ts">
import { computed } from 'vue'
import type { Area, Usage } from '../lib/inspect/usage'

/** Files grouped by area (Kit / Components / Pages / Other) with counts. */
const { usage, noun = 'places' } = defineProps<{ usage: Usage; noun?: string }>()
const AREAS: Area[] = ['Kit', 'Components', 'Pages', 'Other']
const byArea = computed(() =>
  AREAS.map((a) => ({ area: a, files: usage.files.filter((f) => f.area === a) })).filter(
    (g) => g.files.length
  )
)
const fileName = (p: string): string =>
  p
    .split('/')
    .pop()!
    .replace(/\.(vue|[jt]sx?|css)$/, '')
</script>

<template>
  <div>
    <div class="dse:mb-2 dse:flex dse:items-baseline dse:justify-between">
      <h4 class="dse:text-ui dse:font-semibold">Used in</h4>
      <span class="dse:text-ui dse:text-subtle-foreground"
        >{{ usage.files.length }} files · {{ usage.total }} {{ noun }}</span
      >
    </div>
    <p v-if="!usage.files.length" class="dse:text-ui dse:text-subtle-foreground">Not used anywhere yet.</p>
    <div v-for="g in byArea" :key="g.area" class="dse:mb-3">
      <p class="dse:mb-1 dse:text-ui dse:font-medium dse:tracking-wider dse:text-subtle-foreground dse:uppercase">
        {{ g.area }} · {{ g.files.length }}
      </p>
      <div
        v-for="f in g.files"
        :key="f.path"
        class="dse:flex dse:items-center dse:gap-2 dse:rounded-control dse:px-2 dse:py-1 dse:hover:bg-secondary-background"
        :title="f.utilities.join('  ') || f.path"
      >
        <span class="dse:min-w-0 dse:flex-1 dse:truncate dse:text-ui">{{ fileName(f.path) }}</span>
        <span class="dse:truncate dse:font-mono dse:text-ui dse:text-subtle-foreground">{{
          f.path.split('/').slice(0, -1).join('/') || '.'
        }}</span>
        <span class="dse:w-6 dse:text-right dse:text-ui dse:text-muted-foreground dse:tabular-nums">{{ f.count }}</span>
      </div>
    </div>
  </div>
</template>
