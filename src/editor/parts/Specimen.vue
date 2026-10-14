<script setup lang="ts">
import { cn } from '../ui/cn'
import HostMount from './HostMount.vue'
import { host } from '../lib/specimens'
import type { SpecimenItem } from '../lib/specimens'

/**
 * One option of a component, in an equal cell of a VariantGroup: the
 * sample centred on top, its value as the caption. `fill` stretches the
 * sample to the cell width; `bleed` drops the padding (samples on imagery);
 * `span` widens the cell; `contain` keeps fixed-position content in it.
 */
const { item } = defineProps<{ item: SpecimenItem }>()
</script>

<template>
  <figure
    :class="
      cn(
        'dse:flex dse:min-w-0 dse:flex-col dse:overflow-hidden dse:rounded-control dse:border dse:border-border-default',
        item.span === 2 && 'dse:col-span-2',
        item.span === 'full' && 'dse:col-span-full'
      )
    "
    :data-dse-component="item.name"
  >
    <div
      :class="
        cn(
          'dse:relative dse:flex dse:min-h-20 dse:flex-1 dse:items-center dse:justify-center',
          !item.bleed && 'dse:p-4',
          item.fill && 'dse:[&_[data-dse-mount]>*]:w-full',
          // A transform makes the cell the containing block of `fixed` content.
          item.contain && 'dse:min-h-40 dse:transform-gpu'
        )
      "
      :style="host.surface ? { background: host.surface } : undefined"
    >
      <HostMount :spec="item" />
    </div>
    <figcaption
      v-if="item.label"
      class="dse:truncate dse:border-t dse:border-border-default dse:px-3 dse:py-1.5 dse:font-mono dse:text-ui dse:text-muted-foreground"
    >
      {{ item.label }}
    </figcaption>
  </figure>
</template>
