// next/image outside Next: a plain <img> with the same layout props.
import { createElement, forwardRef } from 'react'

const Image = forwardRef(function Image(
  { src, fill, priority, quality, placeholder, blurDataURL, loader, unoptimized, sizes, style, ...rest },
  ref
) {
  const url = typeof src === 'string' ? src : (src?.src ?? '')
  const fillStyle = fill ? { position: 'absolute', inset: 0, width: '100%', height: '100%' } : null
  return createElement('img', { ...rest, ref, src: url, style: { ...fillStyle, ...style } })
})
export default Image
export const getImageProps = (props) => ({ props })
