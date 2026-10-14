<script setup lang="ts">
import { FileText } from 'lucide-vue-next'
import Button from '../ui/Button.vue'
import { toast } from '../ui/toast'
import { copyLlm, type LlmScope } from '../lib/llm'

/** One click: copy these changes as llm.txt (exact edit instructions). */
const {
  scope,
  label = 'Copy llm.txt',
  block = false,
  disabled = false
} = defineProps<{
  scope?: LlmScope
  label?: string
  block?: boolean
  disabled?: boolean
}>()
async function copy(): Promise<void> {
  const ok = await copyLlm(scope)
  toast(ok ? 'Copied llm.txt - paste it into your coding agent' : 'No changes to copy')
}
</script>

<template>
  <Button size="sm" :block :disabled @click="copy"><FileText :size="13" />{{ label }}</Button>
</template>
