import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "field-surface border-input placeholder:text-[color-mix(in_srgb,var(--color-text-muted)_88%,transparent)] focus-visible:border-[color-mix(in_srgb,var(--color-brand)_46%,var(--color-border-strong))] focus-visible:ring-[4px] focus-visible:ring-ring/14 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive flex field-sizing-content min-h-28 w-full rounded-[var(--radius-input)] border px-4 py-3 text-base text-[var(--color-text)] transition-[color,box-shadow,border-color,background-color] outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
