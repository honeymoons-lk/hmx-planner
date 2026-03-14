import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-button)] border text-[14px] font-medium tracking-[0.01em] transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-[4px] focus-visible:ring-ring/20 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "border-[color-mix(in_srgb,var(--color-brand)_82%,var(--color-brand-hover))] bg-[linear-gradient(180deg,var(--color-brand)_0%,var(--color-brand-hover)_100%)] text-primary-foreground shadow-[0_18px_42px_rgba(110,44,58,0.22)] hover:-translate-y-0.5 hover:bg-[linear-gradient(180deg,var(--color-brand-hover)_0%,var(--color-brand-active)_100%)] hover:shadow-[0_24px_46px_rgba(110,44,58,0.26)] active:translate-y-0 active:shadow-[0_16px_28px_rgba(110,44,58,0.18)]",
        destructive:
          "border-destructive bg-destructive text-white hover:-translate-y-0.5 hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border-[color-mix(in_srgb,var(--color-border-strong)_82%,transparent)] bg-[color-mix(in_srgb,var(--color-surface-strong)_82%,var(--color-bg))] text-[var(--color-text)] shadow-[inset_0_1px_0_rgba(255,255,255,0.68)] hover:-translate-y-0.5 hover:border-[color-mix(in_srgb,var(--color-brand)_28%,var(--color-border-strong))] hover:bg-[color-mix(in_srgb,var(--color-surface-strong)_94%,var(--color-bg-alt))] hover:text-[var(--color-text)]",
        secondary:
          "border-[color-mix(in_srgb,var(--color-border)_76%,transparent)] bg-[color-mix(in_srgb,var(--color-bg-alt)_78%,var(--color-surface))] text-[var(--color-text-secondary)] shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] hover:-translate-y-0.5 hover:bg-[color-mix(in_srgb,var(--color-bg-alt)_92%,var(--color-surface-strong))] hover:text-[var(--color-text)]",
        ghost:
          "border-transparent bg-transparent text-[var(--color-text-secondary)] hover:bg-[color-mix(in_srgb,var(--color-bg-alt)_72%,transparent)] hover:text-[var(--color-text)] dark:hover:bg-accent/50",
        link: "h-auto border-transparent bg-transparent px-0 text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-12 px-6 py-3 has-[>svg]:px-4",
        xs: "h-6 gap-1 rounded-md px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-11 rounded-[var(--radius-button)] gap-1.5 px-5 has-[>svg]:px-3",
        lg: "h-14 rounded-[var(--radius-button)] px-8 has-[>svg]:px-6",
        icon: "size-12",
        "icon-xs": "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-10",
        "icon-lg": "size-12",
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
