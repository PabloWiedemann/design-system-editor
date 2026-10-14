// next/link outside Next: a plain anchor.
import { createElement, forwardRef } from 'react'

const Link = forwardRef(function Link(
  { href, prefetch, replace, scroll, shallow, passHref, legacyBehavior, locale, ...rest },
  ref
) {
  const url = typeof href === 'string' ? href : (href?.pathname ?? '#')
  return createElement('a', { ...rest, ref, href: url })
})
export default Link
