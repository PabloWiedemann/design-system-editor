import { ref } from 'vue'

/** One short confirmation at a time ("Copied …"). */
export const toastMessage = ref('')
let timer: ReturnType<typeof setTimeout> | undefined
export function toast(message: string): void {
  toastMessage.value = message
  clearTimeout(timer)
  timer = setTimeout(() => (toastMessage.value = ''), 2200)
}
