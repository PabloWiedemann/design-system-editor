// React host adapter: renders the repo's React components into the
// editor's cells with the repo's own React. An optional `wrapper`
// component provides what components need (theme, query client, i18n…).
import { Component, createElement } from 'react'
import { createRoot } from 'react-dom/client'

class Boundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }
  static getDerivedStateFromError(error) {
    return { error }
  }
  render() {
    if (!this.state.error) return this.props.children
    return createElement(
      'pre',
      { style: { color: '#e5484d', font: '12px/1.4 ui-monospace, monospace', whiteSpace: 'pre-wrap' } },
      String(this.state.error?.message ?? this.state.error)
    )
  }
}

/** @param {{ wrapper?: import('react').ComponentType<{ children?: unknown }> }} [options] */
export async function createReactAdapter(options = {}) {
  const wrap = (inner) =>
    createElement(Boundary, null, options.wrapper ? createElement(options.wrapper, null, inner) : inner)
  const nodeOf = (spec) =>
    wrap(spec.render ? spec.render(spec.props ?? {}) : createElement(spec.component, spec.props ?? null, spec.children))

  return {
    framework: 'react',
    mount(el, spec) {
      const root = createRoot(el)
      root.render(nodeOf(spec))
      return {
        update: (next) => root.render(nodeOf(next)),
        // Unmounting during React's own render throws; defer it.
        unmount: () => queueMicrotask(() => root.unmount())
      }
    },
    nameOf: (c) => c?.displayName ?? c?.name ?? c?.render?.name
  }
}
