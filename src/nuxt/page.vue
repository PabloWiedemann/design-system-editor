<script setup lang="ts">
import { onMounted } from 'vue'
import { useNuxtApp } from '#app'
// @ts-expect-error virtual module from the editor's Vite plugin
import { boot } from 'virtual:dse/nuxt-entry'

/** The editor page inside the Nuxt app: boots the editor with the app's
 *  own Vue app, so specimens render with its plugins and providers. */
const nuxtApp = useNuxtApp()
onMounted(() => boot(nuxtApp.vueApp, new URLSearchParams(location.search).get('system') ?? ''))
</script>

<template>
  <div />
</template>
