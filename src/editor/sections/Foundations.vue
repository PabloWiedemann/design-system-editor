<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted } from 'vue'
import { Check } from 'lucide-vue-next'
import Badge from '../ui/Badge.vue'
import Card from '../ui/Card.vue'
import AnimationPlayer from '../parts/AnimationPlayer.vue'
import GallerySection from '../parts/GallerySection.vue'
import PlanMark from '../parts/PlanMark.vue'
import { sampleClass } from '../lib/consolidate/session'
import type { ConsolidateGroup } from '../lib/consolidate/rules'
import { usageOf } from '../lib/inspect/usage'
import {
  GRID_GROUPS,
  GROUPS,
  KEYFRAMES,
  onGrid,
  px,
  shortName,
  TOKENS,
  type Token
} from '../lib/tokens'
import { valueOf } from '../lib/tweaks'

/**
 * Every token group found in the theme (tokens.ts), each previewed the way
 * its namespace is used (theme.ts): swatches, type, boxes, curves, played
 * animations… Unknown namespaces fall back to a value list. Values follow
 * live tweaks.
 */
const CONSOLIDATE = ['color', 'text', 'radius', 'shadow']
const groups = GROUPS.filter((g) => g.ns.id !== 'spacing')
const uses = (t: Token): number => usageOf(t).total
const byName = (name: string): Token | undefined => TOKENS.find((t) => t.name === name)
const leadingOf = (t: Token): Token | undefined => byName(`${t.name}--line-height`)

/** Resolve var(--token) references to the token's (draft) value. */
const resolve = (v: string): string =>
  v.replace(/var\(--([\w-]+)\)/g, (m, n: string) => {
    const t = byName(n)
    return t ? resolve(valueOf(t)) : m
  })

// ── Easing: plot the curve ─────────────────────────────────
const KEYWORD: Record<string, number[]> = {
  linear: [0, 0, 1, 1],
  ease: [0.25, 0.1, 0.25, 1],
  'ease-in': [0.42, 0, 1, 1],
  'ease-out': [0, 0, 0.58, 1],
  'ease-in-out': [0.42, 0, 0.58, 1]
}
function curve(v: string): string {
  const m = /cubic-bezier\(([^)]+)\)/.exec(v)
  const b = m ? m[1]!.split(',').map(Number) : KEYWORD[v.trim()]
  if (!b || b.length !== 4) return ''
  const [x1, y1, x2, y2] = b as [number, number, number, number]
  const y = (n: number): number => 48 - n * 48
  return `M0,48 C${x1 * 48},${y(y1)} ${x2 * 48},${y(y2)} 48,0`
}

// ── Animation: keyframes from the theme ─────────────────
const keyframesOf = (v: string): string | undefined =>
  [...KEYFRAMES.keys()].find((k) => new RegExp(`(^|\\s)${k}(\\s|,|$)`).test(v))
// Theme keyframes are only emitted when a utility uses them: inject them.
let sheet: HTMLStyleElement | null = null
onMounted(() => {
  sheet = document.createElement('style')
  sheet.textContent = [...KEYFRAMES.values()].join('\n')
  document.head.appendChild(sheet)
})
onBeforeUnmount(() => sheet?.remove())

// ── Sizes (breakpoints, containers): bars relative to the largest ──
const widthOf = (tokens: Token[], t: Token): string => {
  const max = Math.max(...tokens.map((x) => px(valueOf(x)) ?? 0), 1)
  return `${((px(valueOf(t)) ?? 0) / max) * 100}%`
}

// ── Blur: a busy backdrop so the blur shows ───────────────
const BLUR_BACKDROP =
  'repeating-linear-gradient(45deg, oklch(0.75 0.15 60) 0 10px, oklch(0.6 0.18 260) 10px 20px, oklch(0.8 0.12 150) 20px 30px)'

// ── Spacing: the theme's step, or Tailwind's default ───────
const spacing = byName('spacing')
const step = computed(() => (spacing && px(valueOf(spacing))) || 4)
const SPACING = [1, 2, 3, 4, 5, 6, 8, 10, 12, 16]

const offGrid = computed(() =>
  TOKENS.filter((t) => GRID_GROUPS.includes(t.group) && !onGrid(valueOf(t)))
)
</script>

<template>
  <GallerySection
    v-for="g in groups"
    :id="g.ns.id"
    :key="g.ns.id"
    :title="g.ns.label"
    :description="g.ns.description"
    :tokens="g.tokens"
    :consolidate="CONSOLIDATE.includes(g.ns.id) ? (g.ns.id as ConsolidateGroup) : undefined"
  >
    <!-- Color: swatches -->
    <div v-if="g.ns.preview === 'color'" class="dse:grid dse:grid-cols-4 dse:gap-3">
      <div v-for="t in g.tokens" :key="t.name" class="dse:flex dse:flex-col dse:gap-2">
        <span
          :class="['dse:h-12 dse:rounded-control dse:border dse:border-border-default', sampleClass(t)]"
          :data-token="t.name"
          :style="{ background: valueOf(t) }"
        />
        <span class="dse:flex dse:items-baseline dse:gap-2 dse:font-mono dse:text-ui dse:text-muted-foreground"
          ><span class="dse:truncate">{{ shortName(t) }}</span
          ><span class="dse:ml-auto dse:shrink-0 dse:text-subtle-foreground dse:tabular-nums"
            >{{ uses(t) }}×</span
          ></span
        >
        <PlanMark :token="t" />
      </div>
    </div>

    <!-- Type: sizes with their line-height -->
    <div v-else-if="g.ns.preview === 'text'" class="dse:flex dse:flex-col dse:gap-4">
      <div v-for="t in g.tokens" :key="t.name" class="dse:flex dse:items-baseline dse:gap-6">
        <span class="dse:w-40 dse:shrink-0 dse:font-mono dse:text-ui dse:text-subtle-foreground"
          >{{ shortName(t) }} · {{ valueOf(t)
          }}<template v-if="leadingOf(t)"> / {{ valueOf(leadingOf(t)!) }}</template></span
        >
        <span class="dse:w-12 dse:shrink-0 dse:text-right dse:font-mono dse:text-ui dse:text-subtle-foreground dse:tabular-nums"
          >{{ uses(t) }}×</span
        >
        <span
          :class="['dse:rounded-min', sampleClass(t)]"
          :data-token="t.name"
          :style="{
            fontSize: resolve(valueOf(t)),
            lineHeight: leadingOf(t) ? resolve(valueOf(leadingOf(t)!)) : undefined,
            fontFamily: 'var(--dse-host-font)'
          }"
          >The quick brown fox jumps over the lazy dog</span
        >
        <PlanMark :token="t" class="dse:ml-auto" />
      </div>
    </div>

    <!-- Line height: two lines at that height -->
    <div v-else-if="g.ns.preview === 'leading'" class="dse:grid dse:grid-cols-2 dse:gap-3">
      <div v-for="t in g.tokens" :key="t.name" class="dse:flex dse:flex-col dse:gap-2">
        <p
          class="dse:rounded-control dse:border dse:border-border-default dse:bg-secondary-background/60 dse:px-3"
          :data-token="t.name"
          :style="{
            lineHeight: valueOf(t),
            fontSize: t.parent && byName(t.parent) ? resolve(valueOf(byName(t.parent)!)) : undefined
          }"
        >
          Two lines of text set<br />at this line height
        </p>
        <span class="dse:font-mono dse:text-ui dse:text-muted-foreground"
          >{{ shortName(t) }} · {{ valueOf(t) }} · {{ uses(t) }}×</span
        >
      </div>
    </div>

    <!-- Radius: boxes, with the nesting example -->
    <div v-else-if="g.ns.preview === 'radius'" class="dse:flex dse:flex-wrap dse:items-end dse:gap-4">
      <div v-for="t in g.tokens" :key="t.name" class="dse:flex dse:flex-col dse:items-center dse:gap-2">
        <span
          :class="['dse:size-20 dse:border dse:border-border-strong dse:bg-card-background', sampleClass(t)]"
          :data-token="t.name"
          :style="{ borderRadius: resolve(valueOf(t)) }"
        />
        <span class="dse:font-mono dse:text-ui dse:text-muted-foreground"
          >{{ shortName(t) }} · {{ valueOf(t) }} · {{ uses(t) }}×</span
        >
        <PlanMark :token="t" />
      </div>
    </div>

    <!-- Shadow: raised tiles. Tailwind inlines shadow values into its
         utilities (no --shadow-* variables at runtime): use the value. -->
    <div v-else-if="g.ns.preview === 'shadow'" class="dse:flex dse:flex-wrap dse:gap-x-10 dse:gap-y-8 dse:py-4">
      <div v-for="t in g.tokens" :key="t.name" class="dse:flex dse:flex-col dse:items-center dse:gap-3">
        <span
          :class="['dse:size-24 dse:rounded-card dse:bg-card-background-hover', sampleClass(t)]"
          :data-token="t.name"
          :style="{ boxShadow: resolve(valueOf(t)) }"
        />
        <span class="dse:font-mono dse:text-ui dse:text-muted-foreground"
          >{{ shortName(t) }} · {{ uses(t) }}×</span
        >
        <PlanMark :token="t" />
      </div>
    </div>

    <!-- Blur: frosted half over an image -->
    <div v-else-if="g.ns.preview === 'blur'" class="dse:flex dse:flex-wrap dse:gap-6">
      <div v-for="t in g.tokens" :key="t.name" class="dse:flex dse:flex-col dse:items-center dse:gap-2">
        <span class="dse:relative dse:block dse:h-24 dse:w-40 dse:overflow-hidden dse:rounded-card" :data-token="t.name">
          <!-- Something with detail to blur, independent of the repo's assets. -->
          <span class="dse:block dse:size-full" :style="{ background: BLUR_BACKDROP }" />
          <span
            class="dse:absolute dse:inset-y-0 dse:right-0 dse:w-1/2 dse:border-l dse:border-border-strong"
            :style="{ backdropFilter: `blur(${valueOf(t)})` }"
          />
        </span>
        <span class="dse:font-mono dse:text-ui dse:text-muted-foreground"
          >{{ shortName(t) }} · {{ valueOf(t) }} · {{ uses(t) }}×</span
        >
      </div>
    </div>

    <!-- Easing: the curve; hover to run a dot along it -->
    <div v-else-if="g.ns.preview === 'ease'" class="dse:grid dse:grid-cols-3 dse:gap-3">
      <div
        v-for="t in g.tokens"
        :key="t.name"
        class="dse:group dse:flex dse:flex-col dse:gap-3 dse:rounded-control dse:border dse:border-border-default dse:p-4"
        :data-token="t.name"
      >
        <svg viewBox="-4 -8 56 64" class="dse:h-20 dse:w-full dse:overflow-visible" aria-hidden="true">
          <path d="M0,48 L48,0" class="dse:stroke-border-strong" stroke-dasharray="2 3" fill="none" />
          <path
            :d="curve(valueOf(t))"
            class="dse:stroke-base-foreground"
            stroke-width="2"
            fill="none"
          />
        </svg>
        <span class="dse:relative dse:h-1 dse:rounded-full dse:bg-secondary-background">
          <span
            class="dse:absolute dse:-top-1 dse:left-0 dse:size-3 dse:rounded-full dse:bg-base-foreground dse:transition-[left] dse:duration-700 dse:group-hover:left-[calc(100%-12px)]"
            :style="{ transitionTimingFunction: resolve(valueOf(t)) }"
          />
        </span>
        <span class="dse:truncate dse:font-mono dse:text-ui dse:text-muted-foreground"
          >{{ shortName(t) }} · {{ uses(t) }}×</span
        >
        <span class="dse:truncate dse:font-mono dse:text-ui dse:text-subtle-foreground">{{ valueOf(t) }}</span>
      </div>
    </div>

    <!-- Animation: a player with a timeline, speed and loop -->
    <div v-else-if="g.ns.preview === 'animate'" class="dse:grid dse:grid-cols-2 dse:gap-3">
      <div
        v-for="t in g.tokens"
        :key="t.name"
        class="dse:flex dse:flex-col dse:gap-3 dse:rounded-control dse:border dse:border-border-default dse:p-4"
        :data-token="t.name"
      >
        <AnimationPlayer :animation="resolve(valueOf(t))" />
        <span class="dse:truncate dse:font-mono dse:text-ui dse:text-muted-foreground"
          >{{ shortName(t) }} · {{ uses(t) }}×</span
        >
        <span class="dse:truncate dse:font-mono dse:text-ui dse:text-subtle-foreground">{{ valueOf(t) }}</span>
        <span v-if="!keyframesOf(valueOf(t))" class="dse:text-ui dse:text-subtle-foreground"
          >Keyframes not declared in the theme.</span
        >
      </div>
    </div>

    <!-- Font family / weight / letter spacing: text samples -->
    <div
      v-else-if="['font', 'weight', 'tracking'].includes(g.ns.preview)"
      class="dse:flex dse:flex-col dse:gap-3"
    >
      <div v-for="t in g.tokens" :key="t.name" class="dse:flex dse:items-baseline dse:gap-6">
        <span class="dse:w-40 dse:shrink-0 dse:truncate dse:font-mono dse:text-ui dse:text-subtle-foreground"
          >{{ shortName(t) }} · {{ uses(t) }}×</span
        >
        <span
          class="dse:text-heading"
          :data-token="t.name"
          :style="{
            fontFamily: g.ns.preview === 'font' ? valueOf(t) : undefined,
            fontWeight: g.ns.preview === 'weight' ? valueOf(t) : undefined,
            letterSpacing: g.ns.preview === 'tracking' ? valueOf(t) : undefined,
            fontSize: t.parent && byName(t.parent) ? resolve(valueOf(byName(t.parent)!)) : undefined
          }"
          >The quick brown fox jumps over the lazy dog</span
        >
        <span class="dse:ml-auto dse:truncate dse:font-mono dse:text-ui dse:text-subtle-foreground">{{
          valueOf(t)
        }}</span>
      </div>
    </div>

    <!-- Breakpoints, containers: widths relative to the largest -->
    <div v-else-if="g.ns.preview === 'size'" class="dse:flex dse:flex-col dse:gap-2">
      <div v-for="t in g.tokens" :key="t.name" class="dse:flex dse:items-center dse:gap-4">
        <span class="dse:w-40 dse:shrink-0 dse:truncate dse:font-mono dse:text-ui dse:text-subtle-foreground"
          >{{ shortName(t) }} · {{ valueOf(t) }}</span
        >
        <span class="dse:h-3 dse:flex-1">
          <span
            class="dse:block dse:h-full dse:rounded-min dse:bg-inverted-background"
            :data-token="t.name"
            :style="{ width: widthOf(g.tokens, t) }"
          />
        </span>
      </div>
    </div>

    <!-- Aspect ratio: frames -->
    <div v-else-if="g.ns.preview === 'aspect'" class="dse:flex dse:flex-wrap dse:items-end dse:gap-4">
      <div v-for="t in g.tokens" :key="t.name" class="dse:flex dse:flex-col dse:items-center dse:gap-2">
        <span
          class="dse:h-20 dse:rounded-control dse:border dse:border-border-strong dse:bg-secondary-background"
          :data-token="t.name"
          :style="{ aspectRatio: valueOf(t) }"
        />
        <span class="dse:font-mono dse:text-ui dse:text-muted-foreground"
          >{{ shortName(t) }} · {{ valueOf(t) }}</span
        >
      </div>
    </div>

    <!-- Anything else: name, value, uses -->
    <div v-else class="dse:flex dse:flex-col">
      <div
        v-for="t in g.tokens"
        :key="t.name"
        class="dse:flex dse:items-center dse:gap-4 dse:border-t dse:border-border-default dse:py-2 dse:text-ui"
        :data-token="t.name"
      >
        <span class="dse:w-48 dse:shrink-0 dse:truncate dse:font-mono">--{{ t.name }}</span>
        <span class="dse:min-w-0 dse:flex-1 dse:truncate dse:font-mono dse:text-muted-foreground">{{
          valueOf(t)
        }}</span>
        <span class="dse:font-mono dse:text-subtle-foreground dse:tabular-nums">{{ uses(t) }}×</span>
      </div>
    </div>
  </GallerySection>

  <GallerySection
    id="spacing"
    title="Spacing"
    :description="`${spacing ? 'The theme’s' : 'Tailwind’s'} ${step}px step behind p-*, m-*, gap-*, w-* … Use whole steps; half steps (2.5, 1.5) fall off the grid.`"
  >
    <div class="dse:flex dse:flex-col dse:gap-2">
      <div v-for="n in SPACING" :key="n" class="dse:flex dse:items-center dse:gap-4">
        <span class="dse:w-24 dse:font-mono dse:text-ui dse:text-subtle-foreground"
          >{{ n }} · {{ n * step }}px</span
        >
        <span class="dse:h-3 dse:rounded-min dse:bg-inverted-background" :style="{ width: `${n * step}px` }" />
      </div>
    </div>
  </GallerySection>

  <GallerySection
    id="grid"
    title="Grid check"
    description="Size tokens (radius, line-height, blur) must be multiples of 4. Updates as you tweak."
  >
    <Card
      v-if="!offGrid.length"
      variant="inset"
      padding="md"
      class="dse:flex dse:items-center dse:gap-2 dse:text-ui"
    >
      <Check :size="14" class="dse:text-status-running" />Every size token is on the 4px grid.
    </Card>
    <Card v-else variant="inset" padding="md" class="dse:flex dse:flex-col dse:gap-2">
      <div v-for="t in offGrid" :key="t.name" class="dse:flex dse:items-center dse:gap-2 dse:text-ui">
        <Badge variant="outline" size="sm">off grid</Badge>
        <span class="dse:font-mono">--{{ t.name }}</span>
        <span class="dse:text-muted-foreground">{{ valueOf(t) }}</span>
      </div>
    </Card>
  </GallerySection>
</template>
