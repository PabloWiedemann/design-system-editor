<script setup lang="ts">
import { computed } from 'vue'
import {
  ArrowRight,
  Check,
  CornerLeftUp,
  MousePointerClick,
  Sparkles,
  Undo2,
  X
} from 'lucide-vue-next'
import Badge from '../ui/Badge.vue'
import Button from '../ui/Button.vue'
import Card from '../ui/Card.vue'
import NumberField from '../ui/NumberField.vue'
import SegmentedControl from '../ui/SegmentedControl.vue'
import Select from '../ui/Select.vue'
import Switch from '../ui/Switch.vue'
import TokenChip from './TokenChip.vue'
import { rulesFor, comparable } from '../lib/consolidate/rules'
import {
  changeCount,
  choices,
  customised,
  dontChange,
  dontMerge,
  keepers,
  keepInstead,
  mergeByHand,
  mergePicked,
  pickKeeper,
  plan,
  proposed,
  reasonsOf,
  resetRules,
  restore,
  session,
  sessionLabel,
  setRule,
  settingOf,
  skipped,
  stats,
  togglePick,
  valueChanges
} from '../lib/consolidate/session'
import { copyAdvicePrompt } from '../lib/consolidate/prompt'
import { toast } from '../ui/toast'
import { tokenByName } from '../lib/inspect/selection'
import { usageOf } from '../lib/inspect/usage'
import { tokenOptions } from '../lib/tokenOptions'
import { shortName, type Token } from '../lib/tokens'
import { valueOf } from '../lib/tweaks'

/**
 * Consolidation, in the inspector: 1 Rules (proposed from the group's
 * tokens and usage, each one tunable), 2 Review (what stays, what merges
 * into it, value changes, and anything that needs a person). Clicking
 * tokens in the section picks them for a merge by hand.
 */
const rules = computed(() => rulesFor(session.value!.group))
const step = computed({
  get: () => session.value!.step,
  set: (s) => (session.value!.step = s)
})
const uses = (t: Token): number => usageOf(t).total
/** Values short enough to sit in a row; colors show as the chip's swatch. */
const short = (v: string): string => (v.length > 10 ? '' : v)
const picked = computed(() => choices.picked.map((n) => tokenByName(n)!))
const flagged = computed(() => [...(plan.value?.flagged.values() ?? [])].map((f) => f.token))
const live = (t: Token): boolean =>
  !plan.value?.merges.has(t.name) && !choices.manual.some((m) => m.retire.includes(t.name))
const homesFor = (t: Token) =>
  tokenOptions(t.group).filter((o) => {
    const other = tokenByName(o.value)!
    return comparable(t, other) && live(other)
  })
const absorbed = (retire: Token[]): number => retire.reduce((sum, t) => sum + uses(t), 0)

async function askAgent(): Promise<void> {
  await copyAdvicePrompt(session.value!.group, plan.value!, settingOf)
  toast('Copied - paste it into your coding agent for a merge strategy')
}
</script>

<template>
  <div v-if="plan && stats" class="dse:flex dse:flex-col dse:gap-4">
    <!-- Outcome, always visible -->
    <div>
      <p class="dse:flex dse:items-baseline dse:gap-2">
        <span class="dse:text-title dse:font-semibold dse:tabular-nums">{{ plan.before }}</span>
        <ArrowRight :size="14" class="dse:self-center dse:text-subtle-foreground" />
        <span class="dse:text-title dse:font-semibold dse:tabular-nums">{{ plan.after }}</span>
        <span class="dse:text-ui dse:text-muted-foreground">{{ sessionLabel.toLowerCase() }} tokens</span>
      </p>
      <p class="dse:text-ui dse:text-subtle-foreground">
        {{ plan.merges.size }} {{ plan.merges.size === 1 ? 'merge' : 'merges' }} ·
        {{ plan.sets.size }} value {{ plan.sets.size === 1 ? 'change' : 'changes' }}
        <template v-if="flagged.length">
          · {{ flagged.length }} {{ flagged.length === 1 ? 'needs' : 'need' }} your call</template
        >
      </p>
    </div>

    <!-- Unsure? Hand the whole picture to an agent. -->
    <Card variant="inset" padding="sm" class="dse:flex dse:flex-col dse:items-start dse:gap-2">
      <p class="dse:text-ui dse:text-muted-foreground">
        Not sure what to merge? Copy a prompt with every token, its usage and code, and paste it
        into your coding agent for a strategy.
      </p>
      <Button size="sm" @click="askAgent"><Sparkles :size="13" />Ask your agent</Button>
    </Card>

    <SegmentedControl
      v-model="step"
      variant="contained"
      size="sm"
      class="dse:self-start"
      :options="[
        { value: 'rules', label: '1  Rules' },
        { value: 'review', label: '2  Review', count: changeCount + flagged.length }
      ]"
    />

    <!-- 1 · Rules -->
    <template v-if="step === 'rules'">
      <p class="dse:text-ui dse:text-muted-foreground">
        Proposed from your {{ stats.count }} {{ sessionLabel.toLowerCase() }} tokens and how often
        each is used. Turn rules on or off and tune them; the count above updates live.
      </p>
      <div class="dse:flex dse:flex-col">
        <div
          v-for="rule in rules"
          :key="rule.id"
          class="dse:flex dse:flex-col dse:gap-1.5 dse:border-t dse:border-border-default dse:py-3"
        >
          <div class="dse:flex dse:items-center dse:gap-3">
            <Switch
              :model-value="settingOf(rule).on"
              :aria-label="rule.title"
              @update:model-value="(on: boolean) => setRule(rule, { on })"
            />
            <span class="dse:flex-1 dse:text-ui dse:font-medium">{{ rule.title }}</span>
            <span
              v-if="settingOf(rule).on && plan.hits[rule.id]"
              class="dse:text-ui dse:text-muted-foreground dse:tabular-nums"
              >{{ plan.hits[rule.id] }} {{ plan.hits[rule.id] === 1 ? 'token' : 'tokens' }}</span
            >
          </div>
          <div :class="['dse:flex dse:flex-col dse:gap-2 dse:pl-12', !settingOf(rule).on && 'dse:opacity-50']">
            <p class="dse:text-ui dse:text-muted-foreground">
              {{ rule.why(stats, settingOf(rule).value) }}
            </p>
            <div v-if="rule.param" class="dse:flex dse:items-center dse:gap-2">
              <span class="dse:text-ui dse:whitespace-nowrap dse:text-muted-foreground">{{
                rule.param.label
              }}</span>
              <NumberField
                :model-value="settingOf(rule).value"
                :min="rule.param.min"
                :max="rule.param.max(stats)"
                :step="rule.param.step"
                :unit="rule.param.unit"
                :aria-label="`${rule.title}: ${rule.param.label}`"
                :disabled="!settingOf(rule).on"
                class="dse:w-32"
                @update:model-value="(value: number) => setRule(rule, { value })"
              />
              <Button
                v-if="settingOf(rule).value !== proposed(rule).value"
                variant="link"
                size="sm"
                class="dse:ml-auto dse:text-ui"
                :title="`Use the proposed ${proposed(rule).value} ${rule.param.unit}`"
                @click="setRule(rule, { value: proposed(rule).value })"
                >proposed {{ proposed(rule).value }}</Button
              >
            </div>
          </div>
        </div>
      </div>
      <div class="dse:flex dse:flex-col dse:gap-2">
        <Button v-if="customised" variant="ghost" size="sm" class="dse:self-start" @click="resetRules"
          ><Undo2 :size="13" />Back to proposed rules</Button
        >
        <Button variant="primary" block @click="step = 'review'"
          >Review {{ changeCount }} {{ changeCount === 1 ? 'change' : 'changes'
          }}<ArrowRight :size="13"
        /></Button>
      </div>
    </template>

    <!-- 2 · Review -->
    <template v-else>
      <!-- Merge by hand -->
      <Card variant="inset" padding="sm" class="dse:flex dse:flex-col dse:gap-2">
        <p v-if="!picked.length" class="dse:flex dse:items-start dse:gap-2 dse:text-ui dse:text-muted-foreground">
          <MousePointerClick :size="13" class="dse:mt-0.5 dse:shrink-0" />
          <span
            >Merge by hand: click tokens in the {{ sessionLabel }} section, then choose the one to
            keep.</span
          >
        </p>
        <template v-else>
          <p class="dse:text-ui dse:font-medium">Merge by hand</p>
          <div v-for="t in picked" :key="t.name" class="dse:flex dse:items-center dse:gap-2">
            <Badge
              v-if="pickKeeper?.name === t.name"
              class="dse:w-16 dse:justify-center dse:bg-accent/15 dse:text-base-foreground"
              ><Check :size="11" />Keep</Badge
            >
            <Button
              v-else
              variant="ghost"
              size="sm"
              class="dse:h-5 dse:w-16 dse:px-0 dse:text-ui"
              @click="choices.pickKeep = t.name"
              >Keep this</Button
            >
            <TokenChip :token="t" :struck="pickKeeper?.name !== t.name" class="dse:max-w-36" />
            <span class="dse:ml-auto dse:text-ui dse:text-subtle-foreground dse:tabular-nums">{{ uses(t) }}×</span>
            <Button
              variant="ghost"
              size="icon-xs"
              :aria-label="`Unpick ${shortName(t)}`"
              @click="togglePick(t)"
              ><X :size="12"
            /></Button>
          </div>
          <div class="dse:flex dse:items-center dse:gap-2 dse:pt-1">
            <span class="dse:flex-1 dse:text-ui dse:text-subtle-foreground">
              <template v-if="picked.length < 2">Pick at least one more.</template>
              <template v-else
                >{{ picked.length - 1 }} merge into
                <span class="dse:text-base-foreground">{{ shortName(pickKeeper!) }}</span></template
              >
            </span>
            <Button variant="primary" size="sm" :disabled="picked.length < 2" @click="mergePicked"
              >Merge</Button
            >
          </div>
        </template>
      </Card>

      <p
        v-if="!changeCount && !flagged.length"
        class="dse:flex dse:items-center dse:gap-2 dse:text-ui dse:text-muted-foreground"
      >
        <Check :size="14" class="dse:text-status-running" />Nothing to change with these rules.
      </p>

      <!-- What stays, and what merges into it -->
      <section v-if="keepers.length" class="dse:flex dse:flex-col dse:gap-2">
        <h3 class="dse:text-ui dse:font-semibold">Merges</h3>
        <Card v-for="g in keepers" :key="g.keep.name" class="dse:overflow-hidden">
          <div class="dse:flex dse:items-center dse:gap-2 dse:bg-accent/10 dse:px-3 dse:py-2">
            <span
              class="dse:flex dse:items-center dse:gap-1 dse:text-ui dse:font-semibold dse:tracking-wider dse:text-accent dse:uppercase"
              ><Check :size="12" />Keep</span
            >
            <TokenChip :token="g.keep" class="dse:max-w-40" />
            <span class="dse:truncate dse:font-mono dse:text-ui dse:text-subtle-foreground">{{
              short(plan.sets.get(g.keep.name)?.value ?? valueOf(g.keep))
            }}</span>
            <span class="dse:ml-auto dse:shrink-0 dse:text-ui dse:tabular-nums"
              >{{ uses(g.keep) }}×<span class="dse:text-subtle-foreground">
                +{{ absorbed(g.retire) }}</span
              ></span
            >
          </div>
          <div
            v-for="t in g.retire"
            :key="t.name"
            class="dse:flex dse:flex-col dse:gap-1.5 dse:border-t dse:border-border-default dse:px-3 dse:py-2"
          >
            <div class="dse:flex dse:items-center dse:gap-2">
              <CornerLeftUp :size="13" class="dse:shrink-0 dse:text-subtle-foreground" />
              <TokenChip :token="t" struck class="dse:max-w-40" />
              <span class="dse:truncate dse:font-mono dse:text-ui dse:text-subtle-foreground">{{
                short(valueOf(t))
              }}</span>
              <span class="dse:ml-auto dse:shrink-0 dse:text-ui dse:text-subtle-foreground dse:tabular-nums"
                >{{ uses(t) }}×</span
              >
            </div>
            <div class="dse:flex dse:items-center dse:gap-1 dse:pl-5">
              <span class="dse:flex dse:min-w-0 dse:flex-1 dse:flex-wrap dse:gap-1">
                <Badge v-for="r in reasonsOf(t)" :key="r" variant="outline">{{ r }}</Badge>
              </span>
              <Button
                variant="ghost"
                size="sm"
                class="dse:h-6 dse:px-2 dse:text-ui"
                :title="`Keep ${shortName(t)} and merge ${shortName(g.keep)} into it`"
                @click="keepInstead(t, g.keep)"
                >Keep this</Button
              >
              <Button
                variant="ghost"
                size="icon-xs"
                :aria-label="`Don't merge ${shortName(t)}`"
                :title="`Don't merge ${shortName(t)}`"
                @click="dontMerge(t)"
                ><X :size="12"
              /></Button>
            </div>
          </div>
        </Card>
      </section>

      <!-- Value changes on tokens that stay -->
      <section v-if="valueChanges.length" class="dse:flex dse:flex-col dse:gap-2">
        <h3 class="dse:text-ui dse:font-semibold">Value changes</h3>
        <Card class="dse:divide-y dse:divide-border-default dse:overflow-hidden">
          <div
            v-for="s in valueChanges"
            :key="s.token.name"
            class="dse:flex dse:flex-col dse:gap-1.5 dse:px-3 dse:py-2"
          >
            <div class="dse:flex dse:items-center dse:gap-2">
              <TokenChip :token="s.token" class="dse:max-w-36" />
              <span class="dse:font-mono dse:text-ui dse:text-subtle-foreground"
                >{{ valueOf(s.token) }} →
                <span class="dse:text-base-foreground">{{ s.value }}</span></span
              >
              <Button
                variant="ghost"
                size="icon-xs"
                class="dse:ml-auto"
                :aria-label="`Don't change ${shortName(s.token)}`"
                :title="`Don't change ${shortName(s.token)}`"
                @click="dontChange(s.token)"
                ><X :size="12"
              /></Button>
            </div>
            <span class="dse:flex dse:flex-wrap dse:gap-1">
              <Badge v-for="r in reasonsOf(s.token)" :key="r" variant="outline">{{ r }}</Badge>
            </span>
          </div>
        </Card>
      </section>

      <!-- Broke a rule, but no safe merge: a person decides -->
      <section v-if="flagged.length" class="dse:flex dse:flex-col dse:gap-2">
        <h3 class="dse:text-ui dse:font-semibold">Needs your call</h3>
        <p class="dse:-mt-1 dse:text-ui dse:text-muted-foreground">
          No close neighbour: merging would visibly change these. Pick a home or leave them.
        </p>
        <Card class="dse:divide-y dse:divide-border-default dse:overflow-hidden">
          <div v-for="t in flagged" :key="t.name" class="dse:flex dse:flex-col dse:gap-2 dse:px-3 dse:py-2">
            <div class="dse:flex dse:items-center dse:gap-2">
              <TokenChip :token="t" class="dse:max-w-40" />
              <span class="dse:truncate dse:font-mono dse:text-ui dse:text-subtle-foreground">{{
                short(valueOf(t))
              }}</span>
              <span class="dse:ml-auto dse:text-ui dse:text-subtle-foreground dse:tabular-nums"
                >{{ uses(t) }}×</span
              >
            </div>
            <span class="dse:flex dse:flex-wrap dse:gap-1">
              <Badge v-for="r in reasonsOf(t)" :key="r" variant="outline">{{ r }}</Badge>
            </span>
            <div class="dse:flex dse:items-center dse:gap-2">
              <Select
                model-value=""
                size="sm"
                label="Merge into…"
                class="dse:flex-1"
                :options="homesFor(t)"
                @update:model-value="(v: string) => mergeByHand(tokenByName(v)!, [t])"
              />
              <Button variant="ghost" size="sm" @click="dontMerge(t)">Leave it</Button>
            </div>
          </div>
        </Card>
      </section>

      <!-- Kept out of the plan -->
      <section v-if="skipped.length" class="dse:flex dse:flex-col dse:gap-2">
        <h3 class="dse:text-ui dse:font-semibold">Left as is</h3>
        <div class="dse:flex dse:flex-wrap dse:gap-2">
          <span v-for="t in skipped" :key="t.name" class="dse:flex dse:items-center dse:gap-1">
            <TokenChip :token="t" />
            <Button
              variant="ghost"
              size="icon-xs"
              :aria-label="`Put ${shortName(t)} back in the plan`"
              :title="`Put ${shortName(t)} back in the plan`"
              @click="restore(t.name)"
              ><Undo2 :size="12"
            /></Button>
          </span>
        </div>
      </section>
    </template>
  </div>
</template>
