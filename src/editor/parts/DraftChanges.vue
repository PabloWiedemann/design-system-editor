<script setup lang="ts">
import { ArrowRight, GitMerge, X } from 'lucide-vue-next'
import Button from '../ui/Button.vue'
import TokenChip from './TokenChip.vue'
import { tokenByName } from '../lib/inspect/selection'
import { shortName } from '../lib/tokens'
import { changedTokens, draft, removeSwap, resetToken, revertToken, valueOf } from '../lib/tweaks'

/** Every draft change: token values and component token swaps. */
</script>

<template>
  <div class="dse:flex dse:flex-col">
    <div
      v-for="t in changedTokens"
      :key="t.name"
      class="dse:flex dse:items-center dse:gap-2 dse:border-t dse:border-border-default dse:py-2"
    >
      <TokenChip :token="t" class="dse:max-w-36" />
      <span class="dse:min-w-0 dse:flex-1 dse:truncate dse:font-mono dse:text-ui dse:text-subtle-foreground"
        >{{ t.value }} → <span class="dse:text-base-foreground">{{ valueOf(t) }}</span></span
      >
      <Button
        variant="ghost"
        size="icon-xs"
        :aria-label="`Undo ${shortName(t)}`"
        @click="resetToken(t)"
        ><X :size="12"
      /></Button>
    </div>
    <div
      v-for="s in draft.swaps"
      :key="`${s.component}${s.axis}${s.option}${s.from}`"
      class="dse:flex dse:flex-col dse:gap-1.5 dse:border-t dse:border-border-default dse:py-2"
    >
      <div class="dse:flex dse:items-center dse:gap-2">
        <span class="dse:min-w-0 dse:flex-1 dse:truncate dse:text-ui"
          >{{ s.componentName }}
          <span class="dse:text-subtle-foreground">{{
            s.axis === 'base' ? 'base' : s.axis === 'file' ? s.file : `${s.axis} ${s.option}`
          }}</span></span
        >
        <Button variant="ghost" size="icon-xs" aria-label="Undo swap" @click="removeSwap(s)"
          ><X :size="12"
        /></Button>
      </div>
      <div class="dse:flex dse:items-center dse:gap-1.5">
        <TokenChip v-if="tokenByName(s.fromToken)" :token="tokenByName(s.fromToken)!" struck />
        <ArrowRight :size="12" class="dse:shrink-0 dse:text-subtle-foreground" />
        <TokenChip v-if="tokenByName(s.toToken)" :token="tokenByName(s.toToken)!" />
      </div>
    </div>
    <div
      v-for="[from, to] in Object.entries(draft.merges)"
      :key="`merge-${from}`"
      class="dse:flex dse:items-center dse:gap-2 dse:border-t dse:border-border-default dse:py-2"
    >
      <TokenChip v-if="tokenByName(from)" :token="tokenByName(from)!" struck />
      <GitMerge :size="12" class="dse:shrink-0 dse:text-subtle-foreground" />
      <TokenChip v-if="tokenByName(to)" :token="tokenByName(to)!" />
      <span class="dse:min-w-0 dse:flex-1 dse:truncate dse:text-ui dse:text-subtle-foreground">merge</span>
      <Button
        variant="ghost"
        size="icon-xs"
        aria-label="Undo merge"
        @click="revertToken(tokenByName(from)!)"
        ><X :size="12"
      /></Button>
    </div>
  </div>
</template>
