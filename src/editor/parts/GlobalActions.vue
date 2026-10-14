<script setup lang="ts">
import { ref } from 'vue'
import { FileText, RotateCcw } from 'lucide-vue-next'
import { DialogDescription, DialogRoot, DialogTitle } from 'reka-ui'
import Button from '../ui/Button.vue'
import DialogContent from '../ui/DialogContent.vue'
import Tooltip from '../ui/Tooltip.vue'
import { toast } from '../ui/toast'
import DraftChanges from './DraftChanges.vue'
import { copyLlm } from '../lib/llm'
import { changedCount, discardDraft } from '../lib/tweaks'

/** Global actions for the whole draft, in the top bar: discard it, or copy
 *  it as llm.txt for a coding agent to apply (and open a PR). Per
 *  component / token actions live in the inspector footer. */
const discarding = ref(false)

async function copy(): Promise<void> {
  const ok = await copyLlm()
  toast(ok ? 'Copied llm.txt - paste it into your coding agent' : 'No changes to copy')
}
function discard(): void {
  discardDraft()
  discarding.value = false
  toast('Draft discarded')
}
</script>

<template>
  <div class="dse:flex dse:items-center dse:gap-2">
    <!-- Tooltips sit on wrappers so they still show while a button is disabled. -->
    <Tooltip
      wrap
      side="bottom"
      content="Discards the whole draft: every token, component and merge change. To undo one component or token, use Revert in the inspector."
    >
      <Button variant="ghost" size="sm" :disabled="!changedCount" @click="discarding = true"
        ><RotateCcw :size="13" />Discard draft</Button
      >
    </Tooltip>
    <Tooltip
      wrap
      side="bottom"
      content="Copies the draft as llm.txt: exact edits for your coding agent (Claude Code, Cursor…). Paste it there to apply the changes and open a pull request. Nothing is written to the repo from here."
    >
      <Button variant="primary" size="sm" :disabled="!changedCount" @click="copy"
        ><FileText :size="13" />Copy llm.txt{{ changedCount ? ` · ${changedCount}` : '' }}</Button
      >
    </Tooltip>

    <DialogRoot v-model:open="discarding">
      <DialogContent size="md" class="dse:p-6">
        <DialogTitle class="dse:text-heading dse:font-semibold">Discard the draft?</DialogTitle>
        <DialogDescription class="dse:mt-1 dse:text-ui dse:text-muted-foreground">
          Removes {{ changedCount }} {{ changedCount === 1 ? 'change' : 'changes' }}. The repo is
          not affected.
        </DialogDescription>
        <div class="dse:mt-4 dse:max-h-72 dse:overflow-y-auto"><DraftChanges /></div>
        <div class="dse:mt-6 dse:flex dse:justify-end dse:gap-2">
          <Button variant="ghost" @click="discarding = false">Keep drafting</Button>
          <Button variant="destructive" @click="discard">Discard</Button>
        </div>
      </DialogContent>
    </DialogRoot>
  </div>
</template>
