import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-button)] text-[14px] font-medium tracking-[0.03em] transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/20 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--color-brand)] text-white shadow-[0_8px_20px_rgba(110,44,58,0.12)] hover:-translate-y-[1px] hover:bg-[var(--color-brand-hover)] hover:shadow-[0_12px_24px_rgba(110,44,58,0.18)] active:translate-y-0 active:shadow-none",
        destructive:
          "bg-destructive text-white hover:-translate-y-[1px] hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border border-[color-mix(in_srgb,var(--color-border-strong)_60%,transparent)] bg-transparent text-[var(--color-text)] hover:-translate-y-[1px] hover:border-[var(--color-brand)] hover:text-[var(--color-brand)] hover:bg-[color-mix(in_srgb,var(--color-brand)_2%,transparent)]",
        secondary:
          "bg-[color-mix(in_srgb,var(--color-bg-alt)_80%,var(--color-surface))] text-[var(--color-text-secondary)] hover:-translate-y-[1px] hover:bg-[color-mix(in_srgb,var(--color-border)_40%,transparent)] hover:text-[var(--color-text)]",
        ghost:
          "bg-transparent text-[var(--color-text-secondary)] hover:bg-[color-mix(in_srgb,var(--color-bg-alt)_60%,transparent)] hover:text-[var(--color-text)]",
        link: "h-auto bg-transparent px-0 text-[var(--color-brand)] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-12 px-8 py-3 has-[>svg]:px-6",
        xs: "h-8 px-3 text-[12px] has-[>svg]:px-2.5",
        sm: "h-10 px-6 has-[>svg]:px-4",
        lg: "h-14 px-10 text-[15px] has-[>svg]:px-8",
        icon: "size-12",
        "icon-xs": "size-8",
        "icon-sm": "size-10",
        "icon-lg": "size-14",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
