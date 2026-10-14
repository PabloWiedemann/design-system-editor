<script setup lang="ts">
import { computed } from 'vue'
import { Check } from 'lucide-vue-next'
import { markOf } from '../lib/consolidate/session'
import { shortName, type Token } from '../lib/tokens'

/** A token's fate in the open consolidation, shown under its sample:
 *  kept (and how many merge into it), merging into another, changing
 *  value, or picked for a merge by hand. Renders nothing otherwise. */
const { token } = defineProps<{ token: Token }>()
const mark = computed(() => markOf(token))
</script>

<template>
  <span
    v-if="mark?.kind === 'keep' || (mark?.kind === 'picked' && mark.keep)"
    class="dse:inline-flex dse:h-5 dse:shrink-0 dse:items-center dse:gap-1 dse:self-start dse:rounded-full dse:bg-accent/15 dse:px-2 dse:font-sans dse:text-ui dse:font-medium dse:text-base-foreground"
    ><Check :size="11" class="dse:text-accent" />Keep<template v-if="mark.kind === 'keep'">
      · +{{ mark.absorbs }}</template
    ></span
  >
  <span
    v-else-if="mark?.kind === 'picked'"
    class="dse:inline-flex dse:h-5 dse:shrink-0 dse:items-center dse:self-start dse:rounded-full dse:px-2 dse:font-sans dse:text-ui dse:font-medium dse:text-base-foreground dse:ring-1 dse:ring-accent dse:ring-inset"
    >Picked</span
  >
  <span
    v-else-if="mark?.kind === 'retire'"
    class="dse:inline-flex dse:h-5 dse:min-w-0 dse:items-center dse:truncate dse:font-mono dse:text-ui dse:text-subtle-foreground"
    >→ {{ shortName(mark.into) }}</span
  >
  <span
    v-else-if="mark?.kind === 'set'"
    class="dse:inline-flex dse:h-5 dse:shrink-0 dse:items-center dse:font-mono dse:text-ui dse:text-base-foreground"
    >→ {{ mark.value }}</span
  >
</template>
