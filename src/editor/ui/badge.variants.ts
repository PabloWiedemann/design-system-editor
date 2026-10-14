import { cva, type VariantProps } from 'cva'

export const badgeVariants = cva({
  base: 'dse:inline-flex dse:shrink-0 dse:items-center dse:gap-1 dse:font-medium dse:whitespace-nowrap',
  variants: {
    variant: {
      default: 'dse:bg-secondary-background dse:text-muted-foreground',
      outline: 'dse:text-base-foreground dse:ring-1 dse:ring-border-strong dse:ring-inset',
      /** On imagery: blurred dark chip. */
      overlay: 'dse:bg-media-overlay dse:text-base-foreground dse:backdrop-blur-sm',
      solid: 'dse:bg-inverted-background dse:text-inverted-foreground'
    },
    size: {
      sm: 'dse:h-5 dse:rounded-full dse:px-2 dse:text-ui',
      md: 'dse:h-6 dse:rounded-min dse:px-2 dse:text-ui',
      tag: 'dse:h-6 dse:rounded-control dse:px-2.5 dse:text-ui'
    }
  },
  defaultVariants: { variant: 'default', size: 'sm' }
})

export type BadgeVariants = VariantProps<typeof badgeVariants>
