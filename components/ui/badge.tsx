import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center justify-center gap-1 whitespace-nowrap overflow-hidden rounded-[4px] px-2.5 py-1 text-[11px] font-semibold tracking-[0.1em] uppercase [&>svg]:size-3 [&>svg]:pointer-events-none transition-[color,box-shadow,border-color,background-color]",
  {
    variants: {
      variant: {
        default:
          "border border-[color-mix(in_srgb,var(--color-border-strong)_40%,transparent)] bg-[var(--color-surface-strong)] text-[var(--color-text-secondary)]",
        brand:
          "border border-[var(--color-brand)] bg-[var(--color-brand)] text-white",
        glass:
          "border border-[rgba(255,255,255,0.2)] bg-white/90 backdrop-blur-sm text-[var(--color-text)] shadow-sm",
        outline:
          "border border-[var(--color-border-strong)] text-[var(--color-text-secondary)] bg-transparent",
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
