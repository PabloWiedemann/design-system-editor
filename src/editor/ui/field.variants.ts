import { cva, type VariantProps } from 'cva'

/** Shared shell for every text-entry control (SearchInput, Input) and the
 *  Select trigger, so they line up and share hover/focus states. Focus is
 *  drawn on the shell (focus-within), never on the native input. */
export const fieldVariants = cva({
  base: [
    'dse:flex dse:items-center dse:gap-2 dse:rounded-control dse:border dse:border-border-default dse:bg-secondary-background dse:text-ui dse:text-base-foreground',
    'dse:transition-[border-color,background-color,box-shadow] dse:duration-150',
    'dse:hover:border-border-strong',
    'dse:focus-within:border-border-focus dse:focus-within:ring-2 dse:focus-within:ring-border-focus/30',
    'dse:has-[:disabled]:pointer-events-none dse:has-[:disabled]:opacity-40'
  ],
  variants: {
    size: { sm: 'dse:h-7 dse:px-2', md: 'dse:h-8 dse:px-2.5', lg: 'dse:h-9 dse:px-3' }
  },
  defaultVariants: { size: 'md' }
})

export type FieldVariants = VariantProps<typeof fieldVariants>

/** Native input inside a field shell: no chrome of its own. */
export const fieldInputClass =
  'dse:min-w-0 dse:flex-1 dse:bg-transparent dse:text-ui dse:text-base-foreground dse:outline-none dse:placeholder:text-subtle-foreground'
