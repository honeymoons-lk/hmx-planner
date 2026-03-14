import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "bg-white/50 border-[rgba(0,0,0,0.08)] placeholder:text-[color-mix(in_srgb,var(--color-text-muted)_88%,transparent)] focus-visible:border-[var(--color-brand)] focus-visible:ring-[3px] focus-visible:ring-ring/20 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive flex field-sizing-content min-h-[120px] w-full rounded-[4px] border px-4 py-3 text-[15px] text-[var(--color-text)] transition-[color,box-shadow,border-color,background-color] outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
