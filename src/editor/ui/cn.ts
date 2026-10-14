import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

/** clsx + tailwind-merge for the editor's own classes. They carry the
 *  `dse:` prefix (so they never collide with the host repo's utilities),
 *  and the custom scales are listed so `text-ui` and `text-muted-foreground`
 *  aren't merged as two colors. */
const twMerge = extendTailwindMerge({
  prefix: 'dse',
  extend: {
    theme: {
      text: ['ui', 'heading', 'title', 'display'],
      radius: ['panel', 'card', 'control', 'min'],
      shadow: ['elev', 'elev-hover', 'popover', 'highlight'],
      blur: ['glass']
    }
  }
})

export type { ClassValue }

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}
