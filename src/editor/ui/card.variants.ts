import { cva, type VariantProps } from 'cva'

export const cardVariants = cva({
  base: 'dse:relative dse:border',
  variants: {
    variant: {
      /** Default raised card: hairline edge + top highlight + soft shadow. */
      elevated: 'dse:rounded-card dse:border-border-default dse:bg-card-background dse:shadow-elev',
      /** Frosted glass, same recipe as the sidebar. */
      glass:
        'dse:rounded-panel dse:border-border-default dse:bg-media-overlay dse:shadow-popover dse:backdrop-blur-glass dse:backdrop-saturate-[1.6]',
      /** Placeholder / create-new tiles. */
      dashed: 'dse:rounded-card dse:border-dashed dse:border-border-strong dse:bg-transparent',
      /** Quiet group inside another surface. */
      inset: 'dse:rounded-control dse:border-border-default dse:bg-secondary-background/60'
    },
    padding: { none: '', xs: 'dse:p-1', sm: 'dse:p-3', md: 'dse:p-4', lg: 'dse:p-7' },
    interactive: {
      true: 'dse:cursor-pointer dse:outline-none dse:transition-[background-color,box-shadow] dse:duration-200 dse:focus-visible:ring-2 dse:focus-visible:ring-border-focus'
    }
  },
  compoundVariants: [
    {
      variant: 'elevated',
      interactive: true,
      class: 'dse:hover:bg-card-background-hover dse:hover:shadow-elev-hover'
    },
    {
      variant: 'dashed',
      interactive: true,
      class: 'dse:text-muted-foreground dse:hover:bg-secondary-background/50 dse:hover:text-base-foreground'
    }
  ],
  defaultVariants: { variant: 'elevated', padding: 'none' }
})

export type CardVariants = VariantProps<typeof cardVariants>
