<script setup lang="ts">
import { ArrowLeft, Plus, Undo2 } from 'lucide-vue-next'
import Badge from '../ui/Badge.vue'
import Button from '../ui/Button.vue'
import Tooltip from '../ui/Tooltip.vue'
import { toast } from '../ui/toast'
import ConsolidatePanel from './ConsolidatePanel.vue'
import CopyLlm from './CopyLlm.vue'
import DraftChanges from './DraftChanges.vue'
import ElementInspector from './ElementInspector.vue'
import TokenBrowser from './TokenBrowser.vue'
import TokenInspector from './TokenInspector.vue'
import { back, editing, selection } from '../lib/inspect/selection'
import { changedCount } from '../lib/tweaks'
import { scopedActions } from '../lib/inspect/actions'
import {
  applyPlan,
  cancelConsolidate,
  changeCount,
  session,
  sessionLabel
} from '../lib/consolidate/session'

/**
 * Right-hand inspector. Context aware: a selected element shows its tokens
 * and values; a selected token shows its value and blast radius; nothing
 * selected shows the draft and every token. The footer holds actions for
 * what is shown (copy and revert it); Copy llm.txt and Discard draft are global and
 * live in the top bar (GlobalActions).
 */
function addPlan(): void {
  const n = applyPlan()
  selection.value = null
  toast(`Added ${n} ${n === 1 ? 'change' : 'changes'} to the draft`)
}
</script>

<template>
  <aside
    class="dse:flex dse:w-88 dse:shrink-0 dse:flex-col dse:border-l dse:border-border-default dse:bg-card-background"
    aria-label="Inspector"
  >
    <header class="dse:flex dse:h-12 dse:shrink-0 dse:items-center dse:gap-2 dse:border-b dse:border-border-default dse:px-4">
      <Button
        v-if="selection && !session"
        variant="ghost"
        size="icon-xs"
        :aria-label="
          selection.kind === 'token' && editing ? `Back to ${editing.label}` : 'Back to overview'
        "
        @click="back"
        ><ArrowLeft :size="14"
      /></Button>
      <h2 class="dse:flex dse:flex-1 dse:items-center dse:gap-2 dse:text-ui dse:font-semibold">
        <template v-if="session">
          <span class="dse:size-1.5 dse:rounded-full dse:bg-accent" />Consolidate
          {{ sessionLabel }}
        </template>
        <template v-else-if="editing">
          <span class="dse:size-1.5 dse:rounded-full dse:bg-accent" />Editing {{ editing.label }}
        </template>
        <template v-else>Inspector</template>
      </h2>
      <Badge v-if="changedCount" size="sm">{{ changedCount }} in draft</Badge>
    </header>

    <div class="dse:min-h-0 dse:flex-1 dse:overflow-y-auto dse:p-4 dse:[scrollbar-width:thin]">
      <ConsolidatePanel v-if="session" />
      <TokenInspector
        v-else-if="selection?.kind === 'token'"
        :key="selection.token.name"
        :token="selection.token"
      />
      <ElementInspector v-else-if="selection?.kind === 'element'" :el="selection.el" />
      <template v-else>
        <p class="dse:mb-4 dse:text-ui dse:text-muted-foreground">
          Click a component or a token to edit it. Changes stay in a draft; copy them as llm.txt for
          your coding agent.
        </p>
        <section v-if="changedCount" class="dse:mb-6">
          <h3 class="dse:mb-1 dse:text-ui dse:font-semibold">Draft</h3>
          <DraftChanges />
        </section>
        <h3 class="dse:mb-1 dse:text-ui dse:font-semibold">Tokens</h3>
        <TokenBrowser />
      </template>
    </div>

    <footer v-if="session" class="dse:flex dse:gap-2 dse:border-t dse:border-border-default dse:p-4">
      <Button @click="cancelConsolidate">Cancel</Button>
      <Button variant="primary" class="dse:flex-1" :disabled="!changeCount" @click="addPlan"
        ><Plus :size="13" />Add {{ changeCount }} {{ changeCount === 1 ? 'change' : 'changes' }} to
        draft</Button
      >
    </footer>
    <!-- Scoped to what the inspector shows. Global actions: top bar. -->
    <footer
      v-else-if="scopedActions"
      class="dse:flex dse:flex-col dse:gap-2 dse:border-t dse:border-border-default dse:p-4"
    >
      <p class="dse:truncate dse:text-ui dse:text-subtle-foreground">
        {{
          scopedActions?.changes
            ? `${scopedActions?.changes} ${scopedActions?.changes === 1 ? 'change' : 'changes'} to ${scopedActions?.label}`
            : `No changes to ${scopedActions?.label} yet`
        }}
      </p>
      <div class="dse:flex dse:gap-2 dse:[&>*:first-child]:flex-1">
        <CopyLlm :scope="scopedActions?.scope" :disabled="!scopedActions?.changes" />
        <Tooltip
          wrap
          :content="
            scopedActions?.revert
              ? `Undoes only ${scopedActions?.label}'s changes. Everything else stays in the draft.`
              : `${scopedActions?.label} has no changes of its own to undo.`
          "
        >
          <Button size="sm" :disabled="!scopedActions?.revert" @click="scopedActions?.revert?.()"
            ><Undo2 :size="13" />Revert {{ scopedActions?.label }}</Button
          >
        </Tooltip>
      </div>
    </footer>
    <footer v-else-if="changedCount" class="dse:flex dse:gap-2 dse:border-t dse:border-border-default dse:p-4">
      <CopyLlm label="Copy the whole draft as llm.txt" class="dse:flex-1" />
    </footer>
  </aside>
</template>
