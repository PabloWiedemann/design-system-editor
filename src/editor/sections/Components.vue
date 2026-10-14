<script setup lang="ts">
import GallerySection from '../parts/GallerySection.vue'
import HostMount from '../parts/HostMount.vue'
import Specimen from '../parts/Specimen.vue'
import Stage from '../parts/Stage.vue'
import VariantGroup from '../parts/VariantGroup.vue'
import { sections } from '../lib/specimens'

/**
 * The Components tab: one bento per specimens section, as the repo
 * describes them (design/specimens). Playground first, then each variant
 * group in equal cells, then any free-form content.
 */
</script>

<template>
  <GallerySection
    v-for="s in sections"
    :id="s.id"
    :key="s.id"
    :title="s.title"
    :description="s.description"
    :components="s.names"
    :playground="s.playground ? (s.playgroundName ?? s.title) : undefined"
  >
    <Stage v-if="s.playground" :section="s" />
    <VariantGroup
      v-for="g in s.groups"
      :key="g.title + (g.prop ?? '')"
      :title="g.title"
      :prop="g.prop"
      :note="g.note"
      :cell="g.cell"
    >
      <Specimen v-for="i in g.items" :key="i.label" :item="i" />
    </VariantGroup>
    <div v-if="s.content" class="dse:flex dse:flex-col dse:gap-4">
      <HostMount :spec="s.content" />
    </div>
  </GallerySection>
  <p v-if="!sections.length" class="dse:text-ui dse:text-muted-foreground">
    No specimens yet. Add files to design/specimens (see the README) to show your components here.
  </p>
</template>
