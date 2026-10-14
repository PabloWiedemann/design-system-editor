// Vue host adapter: renders the repo's Vue components into the editor's
// cells with the repo's own Vue (and its plugins: i18n, stores, PrimeVue…).
// Each cell is a vnode rendered with the app's context, so global
// components, provides and plugins work as they do in the app.
import { createApp, Fragment, h, isVNode, render } from 'vue'

function slotsOf(children) {
  if (children === undefined || children === null) return undefined
  if (typeof children === 'function') return { default: children }
  if (typeof children === 'object' && !isVNode(children) && !Array.isArray(children))
    return children // already a slots object
  return { default: () => children }
}

/**
 * @param {{ setup?: (app: import('vue').App) => unknown, app?: import('vue').App }} [options]
 *   `setup` installs what components need (i18n, pinia, router, UI library);
 *   `app` reuses an existing app instead (Nuxt).
 */
export async function createVueAdapter(options = {}) {
  // design/setup: a function `(app) => …`, or `{ setup, wrapper }` where
  // `wrapper` is a component every cell renders inside (a provider).
  const setup = typeof options.setup === 'function' ? options.setup : options.setup?.setup
  const wrapper = typeof options.setup === 'object' ? options.setup?.wrapper : undefined
  let app = options.app
  if (!app) {
    app = createApp({ render: () => null })
    if (setup) await setup(app)
    app.mount(document.createElement('div'))
  }
  app.config.errorHandler ??= (err) => console.error('[design-system-editor]', err)
  const context = app._context

  const vnodeOf = (spec) => {
    let node = spec.render ? spec.render(spec.props ?? {}) : h(spec.component, spec.props ?? null, slotsOf(spec.children))
    // Render functions may return a component, several nodes, or text.
    if (Array.isArray(node)) node = h(Fragment, null, node)
    else if (typeof node === 'string' || typeof node === 'number') node = h(Fragment, null, [String(node)])
    else if (!isVNode(node)) node = h(node)
    if (wrapper) {
      const inner = node
      node = h(wrapper, null, { default: () => inner })
    }
    node.appContext = context
    return node
  }

  return {
    framework: 'vue',
    mount(el, spec) {
      render(vnodeOf(spec), el)
      return {
        update: (next) => render(vnodeOf(next), el),
        unmount: () => render(null, el)
      }
    },
    nameOf: (c) => c?.__name ?? c?.name ?? c?.__file?.split('/').pop()?.replace(/\.vue$/, '')
  }
}
