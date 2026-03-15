import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "bg-white/50 border-[rgba(0,0,0,0.08)] file:text-foreground placeholder:text-[color-mix(in_srgb,var(--color-text-muted)_88%,transparent)] selection:bg-primary selection:text-primary-foreground h-14 w-full min-w-0 rounded-[var(--radius-input)] border px-4 py-3 text-[15px] leading-[1.45] text-[var(--color-text)] transition-[color,box-shadow,border-color,background-color] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "focus-visible:border-[var(--color-brand)] focus-visible:ring-[3px] focus-visible:ring-ring/20",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Input }
