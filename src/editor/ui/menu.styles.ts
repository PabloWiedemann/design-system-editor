/** Shared by DropdownMenu, Popover and Select content so every floating
 *  surface looks the same. Menu radius 12, padding 4 -> items radius 8. */
export const floatingSurface =
  'dse-float dse:z-[2147483100] dse:rounded-card dse:border dse:border-border-default dse:bg-card-background dse:p-1 dse:text-base-foreground dse:shadow-popover dse:outline-none dse:data-[state=open]:animate-pop-in'

export const menuItem =
  'dse:relative dse:flex dse:min-h-8 dse:cursor-pointer dse:items-center dse:gap-2.5 dse:rounded-control dse:px-2.5 dse:py-1.5 dse:text-ui dse:text-base-foreground dse:outline-none dse:select-none dse:data-disabled:pointer-events-none dse:data-disabled:opacity-40 dse:data-highlighted:bg-secondary-background dse:[&>svg]:shrink-0 dse:[&>svg]:text-muted-foreground'
