<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { Pause, Play, Repeat } from 'lucide-vue-next'
import { SliderRange, SliderRoot, SliderThumb, SliderTrack } from 'reka-ui'
import Button from '../ui/Button.vue'
import SegmentedControl from '../ui/SegmentedControl.vue'

/**
 * Plays a CSS animation on a sample tile with a timeline: play / pause,
 * scrub to any frame, slow it down, loop it. Drives the real CSS animation
 * through the Web Animations API, so what you see is what ships.
 */
const { animation } = defineProps<{
  /** The `animation` shorthand, var() references already resolved. */
  animation: string
}>()

const tile = ref<HTMLElement>()
// Start on the last frame: many entrances begin invisible.
const progress = ref(1)
const playing = ref(false)
const loop = ref(true)
const speed = ref('1')
const SPEEDS = [
  { value: '0.1', label: '0.1×' },
  { value: '0.25', label: '¼×' },
  { value: '0.5', label: '½×' },
  { value: '1', label: '1×' }
]
const duration = ref(0)
const ms = computed(() => Math.round(progress.value * duration.value))

let anim: Animation | null = null
let raf = 0

function setup(): void {
  anim?.cancel()
  const el = tile.value
  if (!el) return
  // Restart the CSS animation, one iteration, holding its end frames.
  el.style.animation = 'none'
  void el.offsetWidth
  el.style.animation = animation
  el.style.animationIterationCount = '1'
  el.style.animationFillMode = 'both'
  anim = el.getAnimations()[0] ?? null
  if (!anim) return
  anim.pause()
  duration.value = Number(anim.effect?.getComputedTiming().duration ?? 0)
  anim.currentTime = progress.value * duration.value
  anim.onfinish = () => {
    if (loop.value && playing.value) {
      anim!.currentTime = 0
      anim!.play()
    } else stop(1)
  }
}
function tick(): void {
  if (anim && duration.value)
    progress.value = Math.min(1, Number(anim.currentTime ?? 0) / duration.value)
  if (playing.value) raf = requestAnimationFrame(tick)
}
function play(): void {
  if (!anim) setup()
  if (!anim) return
  if (progress.value >= 1) anim.currentTime = 0
  anim.playbackRate = Number(speed.value)
  anim.play()
  playing.value = true
  raf = requestAnimationFrame(tick)
}
function stop(at?: number): void {
  anim?.pause()
  playing.value = false
  cancelAnimationFrame(raf)
  if (at !== undefined) progress.value = at
}
function scrub(v?: number[]): void {
  if (!v || !anim) return
  stop(v[0]! / 100)
  anim.currentTime = progress.value * duration.value
}
watch(speed, (s) => anim && (anim.playbackRate = Number(s)))
watch(
  () => animation,
  () => {
    stop(1)
    setup()
  }
)
onMounted(setup)
onBeforeUnmount(() => {
  cancelAnimationFrame(raf)
  anim?.cancel()
})
</script>

<template>
  <div class="dse:flex dse:flex-col dse:gap-3">
    <div class="dse:flex dse:h-24 dse:items-center dse:justify-center dse:rounded-control dse:bg-secondary-background/60">
      <span ref="tile" class="dse:size-12 dse:rounded-card dse:bg-inverted-background" />
    </div>
    <div class="dse:flex dse:items-center dse:gap-2">
      <Button
        variant="ghost"
        size="icon-sm"
        :aria-label="playing ? 'Pause' : 'Play'"
        @click="playing ? stop() : play()"
        ><Pause v-if="playing" :size="14" /><Play v-else :size="14"
      /></Button>
      <SliderRoot
        :model-value="[progress * 100]"
        :max="100"
        :step="0.1"
        class="dse:relative dse:flex dse:h-4 dse:flex-1 dse:touch-none dse:items-center dse:select-none"
        @update:model-value="scrub"
      >
        <SliderTrack class="dse:relative dse:h-1 dse:grow dse:rounded-full dse:bg-secondary-background-hover">
          <SliderRange class="dse:absolute dse:h-full dse:rounded-full dse:bg-base-foreground" />
        </SliderTrack>
        <SliderThumb
          aria-label="Timeline"
          class="dse:block dse:size-3 dse:rounded-full dse:bg-base-foreground dse:outline-none dse:focus-visible:ring-2 dse:focus-visible:ring-border-focus"
        />
      </SliderRoot>
      <span class="dse:w-24 dse:shrink-0 dse:text-right dse:font-mono dse:text-ui dse:text-subtle-foreground dse:tabular-nums"
        >{{ ms }} / {{ duration }}ms</span
      >
    </div>
    <div class="dse:flex dse:items-center dse:gap-2">
      <SegmentedControl v-model="speed" size="sm" variant="contained" :options="SPEEDS" />
      <Button
        variant="ghost"
        size="sm"
        class="dse:ml-auto"
        :aria-pressed="loop"
        :class="loop && 'dse:bg-secondary-background dse:text-base-foreground'"
        @click="loop = !loop"
        ><Repeat :size="13" />Loop</Button
      >
    </div>
  </div>
</template>
