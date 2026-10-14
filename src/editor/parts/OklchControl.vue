<script setup lang="ts">
import { computed } from 'vue'
import { SliderRoot, SliderThumb, SliderTrack } from 'reka-ui'
import Badge from '../ui/Badge.vue'
import Button from '../ui/Button.vue'
import Input from '../ui/Input.vue'
import { clampToGamut, formatOklch, inGamut, maxChroma, parseColor, type Oklch } from '../lib/color'
import { baseValue, resolveValue, shortName, type Token } from '../lib/tokens'
import { draft, setToken, valueOf } from '../lib/tweaks'

/**
 * Color token editor in OKLCH: lightness, chroma, hue and alpha sliders
 * whose tracks show what each channel does, a before/after swatch, and an
 * sRGB gamut check (fit lowers chroma, keeps L and H). The text field takes
 * any CSS color; values are written back as oklch().
 */
const { token } = defineProps<{ token: Token }>()

const raw = computed({
  get: () => valueOf(token),
  set: (v: string) => {
    const o = parseColor(v)
    setToken(token, o ? formatOklch(o) : v)
  }
})
// Values may reference other tokens (var(--…)): edit what they resolve to.
const draftOf = (name: string): string | undefined => draft.tokens[name]
const color = computed(() => parseColor(resolveValue(raw.value, draftOf)))
const original = computed(() => parseColor(resolveValue(baseValue(token))))
const set = (patch: Partial<Oklch>): void =>
  setToken(token, formatOklch({ ...color.value!, ...patch }))

const fits = computed(() => !color.value || inGamut(color.value))
const cMax = computed(() => (color.value ? maxChroma(color.value.l, color.value.h) : 0.4))

/** Each track paints its channel across the full range, others held. */
const css = (o: Oklch): string => formatOklch(o)
const channels = computed(() => {
  const o = color.value!
  const hueC = Math.max(o.c, 0.1)
  return [
    {
      key: 'l' as const,
      label: 'Lightness',
      max: 1,
      step: 0.001,
      show: o.l.toFixed(3),
      track: `linear-gradient(to right in oklch, ${css({ ...o, l: 0, alpha: 1 })}, ${css({ ...o, l: 1, alpha: 1 })})`
    },
    {
      key: 'c' as const,
      label: 'Chroma',
      max: 0.4,
      step: 0.001,
      show: o.c.toFixed(3),
      track: `linear-gradient(to right in oklch, ${css({ ...o, c: 0, alpha: 1 })}, ${css({ ...o, c: 0.4, alpha: 1 })})`
    },
    {
      key: 'h' as const,
      label: 'Hue',
      max: 360,
      step: 0.5,
      show: `${o.h.toFixed(1)}°`,
      track: `linear-gradient(to right in oklch longer hue, ${css({ ...o, c: hueC, h: 0, alpha: 1 })}, ${css({ ...o, c: hueC, h: 359.9, alpha: 1 })})`
    },
    {
      key: 'alpha' as const,
      label: 'Alpha',
      max: 1,
      step: 0.01,
      show: o.alpha.toFixed(2),
      track: `linear-gradient(to right, ${css({ ...o, alpha: 0 })}, ${css({ ...o, alpha: 1 })})`
    }
  ]
})
</script>

<template>
  <div class="dse:flex dse:flex-col dse:gap-3">
    <!-- Before / after -->
    <div class="dse:flex dse:h-10 dse:overflow-hidden dse:rounded-control dse:border dse:border-border-strong">
      <span
        class="dse:flex dse:flex-1 dse:items-end dse:p-1.5 dse:text-ui dse:text-muted-foreground"
        :style="{ background: token.value }"
        :title="`Before: ${original ? formatOklch(original) : token.value}`"
        ><span class="dse:rounded-min dse:bg-media-overlay dse:px-1">before</span></span
      >
      <span
        class="dse:flex dse:flex-1 dse:items-end dse:justify-end dse:p-1.5 dse:text-ui dse:text-muted-foreground"
        :style="{ background: raw }"
        :title="`Now: ${raw}`"
        ><span class="dse:rounded-min dse:bg-media-overlay dse:px-1">now</span></span
      >
    </div>

    <Input v-model="raw" size="sm" mono :aria-label="`${shortName(token)} value`" />

    <template v-if="color">
      <div v-for="ch in channels" :key="ch.key" class="dse:flex dse:flex-col dse:gap-1">
        <div class="dse:flex dse:items-center dse:justify-between dse:text-ui">
          <span class="dse:text-muted-foreground">{{ ch.label }}</span>
          <span class="dse:font-mono dse:text-subtle-foreground dse:tabular-nums"
            >{{ ch.show
            }}<template v-if="ch.key === 'c'"> · max {{ cMax.toFixed(3) }}</template></span
          >
        </div>
        <SliderRoot
          :model-value="[color[ch.key]]"
          :min="0"
          :max="ch.max"
          :step="ch.step"
          class="dse:relative dse:flex dse:h-4 dse:touch-none dse:items-center dse:select-none"
          @update:model-value="(v?: number[]) => v && set({ [ch.key]: v[0] })"
        >
          <SliderTrack
            class="dse:relative dse:h-2 dse:grow dse:rounded-full dse:ring-1 dse:ring-border-default dse:ring-inset"
            :style="{ background: ch.track }"
          />
          <SliderThumb
            :aria-label="`${shortName(token)} ${ch.label}`"
            class="dse:block dse:size-3.5 dse:rounded-full dse:border-2 dse:border-base-foreground dse:bg-card-background dse:shadow-popover dse:outline-none dse:focus-visible:ring-2 dse:focus-visible:ring-border-focus"
          />
        </SliderRoot>
      </div>

      <div v-if="!fits" class="dse:flex dse:items-center dse:gap-2">
        <Badge variant="outline">outside sRGB</Badge>
        <span class="dse:flex-1 dse:text-ui dse:text-muted-foreground"
          >Chroma is above {{ cMax.toFixed(3) }} for this lightness and hue; screens clip it.</span
        >
        <Button size="sm" @click="setToken(token, formatOklch(clampToGamut(color)))"
          >Fit to sRGB</Button
        >
      </div>
    </template>
  </div>
</template>
