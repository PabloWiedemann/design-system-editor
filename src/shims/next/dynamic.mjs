// next/dynamic outside Next: React.lazy with an optional loading component.
import { createElement, lazy, Suspense } from 'react'

export default function dynamic(loader, options = {}) {
  const Lazy = lazy(async () => {
    const mod = await loader()
    return { default: mod.default ?? mod }
  })
  return function Dynamic(props) {
    return createElement(Suspense, { fallback: options.loading ? createElement(options.loading) : null }, createElement(Lazy, props))
  }
}
