import { cva, type VariantProps } from 'cva'

export const buttonVariants = cva({
  base: [
    'dse:relative dse:inline-flex dse:shrink-0 dse:items-center dse:justify-center dse:gap-1.5 dse:font-medium dse:whitespace-nowrap dse:select-none',
    'dse:transition-[background-color,color,box-shadow,transform] dse:duration-150 dse:active:scale-[0.98]',
    'dse:outline-none dse:focus-visible:ring-2 dse:focus-visible:ring-border-focus',
    'dse:disabled:pointer-events-none dse:disabled:opacity-40'
  ],
  variants: {
    variant: {
      /** The one white CTA per surface. */
      primary: 'dse:bg-inverted-background dse:text-inverted-foreground dse:hover:bg-inverted-background-hover',
      secondary:
        'dse:border dse:border-border-strong dse:bg-card-background-hover dse:text-base-foreground dse:shadow-highlight dse:hover:bg-card-background',
      ghost: 'dse:text-muted-foreground dse:hover:bg-secondary-background dse:hover:text-base-foreground',
      subtle: 'dse:bg-secondary-background dse:text-base-foreground dse:hover:bg-secondary-background-hover',
      /** Chips that sit on imagery. */
      overlay: 'dse:bg-media-overlay dse:text-base-foreground dse:backdrop-blur-sm dse:hover:bg-black/75',
      link: 'dse:h-auto dse:px-0 dse:text-muted-foreground dse:hover:text-base-foreground',
      /** Irreversible actions only (delete). Muted, never bright. */
      destructive: 'dse:bg-status-danger dse:text-base-foreground dse:hover:bg-status-danger/85'
    },
    size: {
      sm: 'dse:h-7 dse:rounded-control dse:px-2.5 dse:text-ui',
      md: 'dse:h-8 dse:rounded-control dse:px-3 dse:text-ui',
      lg: 'dse:h-9 dse:rounded-control dse:px-4 dse:text-ui',
      'icon-sm': 'dse:size-7 dse:rounded-control',
      icon: 'dse:size-8 dse:rounded-control',
      'icon-xs': 'dse:size-6 dse:rounded-min'
    },
    block: { true: 'dse:w-full' }
  },
  compoundVariants: [{ variant: 'link', class: 'dse:h-auto dse:px-0' }],
  defaultVariants: { variant: 'secondary', size: 'md' }
})

export type ButtonVariants = VariantProps<typeof buttonVariants>
