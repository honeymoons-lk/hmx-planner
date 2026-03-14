import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center justify-center gap-1 whitespace-nowrap overflow-hidden rounded-[999px] border px-3 py-1.5 text-[11px] font-medium tracking-[0.14em] [&>svg]:size-3 [&>svg]:pointer-events-none focus-visible:ring-[3px] focus-visible:ring-ring/18 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 transition-[color,box-shadow,border-color,background-color]",
  {
    variants: {
      variant: {
        default:
          "border-[color-mix(in_srgb,var(--color-brand)_78%,var(--color-brand-hover))] bg-[linear-gradient(180deg,var(--color-brand)_0%,var(--color-brand-hover)_100%)] text-primary-foreground [a&]:hover:bg-[linear-gradient(180deg,var(--color-brand-hover)_0%,var(--color-brand-active)_100%)]",
        secondary:
          "border-[color-mix(in_srgb,var(--color-border-strong)_74%,transparent)] bg-[color-mix(in_srgb,var(--color-surface-strong)_82%,var(--color-bg-alt))] text-[var(--color-text-secondary)] [a&]:hover:bg-[color-mix(in_srgb,var(--color-surface-strong)_92%,var(--color-bg-alt))]",
        destructive:
          "bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border-border text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        ghost: "[a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        link: "text-primary underline-offset-4 [a&]:hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
