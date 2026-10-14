// Nuxt module, added by `dse dev` through Nuxt's config overrides (the
// repo's nuxt.config is untouched): a dev-only /__dse page, the editor's
// Vite plugin, and the `@repo` alias. Specimens render inside the Nuxt app,
// so they get its plugins (PrimeVue, i18n, Pinia…) for free.
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { dsePlugin } from '../cli/plugin.mjs'

const HERE = dirname(fileURLToPath(import.meta.url))

export default function designSystemEditor(_options, nuxt) {
  const ctx = globalThis.__DSE_CONTEXT__
  if (!ctx || !nuxt.options.dev) return
  nuxt.options.alias['@repo'] = ctx.root
  nuxt.hook('pages:extend', (pages) => {
    pages.push({ name: 'design-system-editor', path: '/__dse', file: join(HERE, 'page.vue'), meta: { layout: false } })
  })
  nuxt.hook('vite:extendConfig', (config, env) => {
    if (env && env.isClient === false) return
    config.plugins = [...(config.plugins ?? []), dsePlugin(ctx, { nuxt: true })]
    config.server ??= {}
    config.server.fs ??= {}
    config.server.fs.allow = [...(config.server.fs.allow ?? []), ctx.gitRoot, ctx.configDir, ctx.pkgDir]
  })
}
