<script setup lang="ts">
/**
 * One axis of a component (variant, size, state…): a titled grid of equal
 * cells, so every option sits in the same frame and lines up. `prop` names
 * the prop the cells vary, e.g. `variant`.
 */
const {
  title,
  prop,
  note,
  cell = 'sm'
} = defineProps<{
  title: string
  prop?: string
  note?: string
  /** Minimum cell width: sm 8rem, md 12rem, lg 16rem. */
  cell?: 'sm' | 'md' | 'lg'
}>()
const COLS = {
  sm: 'dse:grid-cols-[repeat(auto-fill,minmax(8rem,1fr))]',
  md: 'dse:grid-cols-[repeat(auto-fill,minmax(12rem,1fr))]',
  lg: 'dse:grid-cols-[repeat(auto-fill,minmax(16rem,1fr))]'
}
</script>

<template>
  <section class="dse:flex dse:flex-col dse:gap-3">
    <header class="dse:flex dse:flex-wrap dse:items-baseline dse:gap-x-2 dse:gap-y-1">
      <h3 class="dse:text-ui dse:font-medium">{{ title }}</h3>
      <code
        v-if="prop"
        class="dse:rounded-min dse:bg-secondary-background dse:px-1.5 dse:font-mono dse:text-ui dse:text-muted-foreground"
        >{{ prop }}</code
      >
      <p v-if="note" class="dse:text-ui dse:text-subtle-foreground">{{ note }}</p>
    </header>
    <div :class="['dse:grid dse:gap-3', COLS[cell]]"><slot /></div>
  </section>
</template>
