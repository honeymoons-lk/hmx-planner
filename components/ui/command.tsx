"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

function Command({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="command"
      className={cn(
        "bg-popover text-popover-foreground flex h-full w-full flex-col overflow-hidden rounded-[calc(var(--radius-input)+2px)]",
        className,
      )}
      {...props}
    />
  );
}

function CommandInput({ className, ...props }: React.ComponentProps<"input">) {
  return (
    <div className="border-b border-[color-mix(in_srgb,var(--color-border)_82%,transparent)] p-2.5">
      <input
        data-slot="command-input"
        className={cn(
          "field-surface placeholder:text-muted-foreground h-10 w-full rounded-[var(--radius-input)] border border-input px-3 text-[15px] leading-[1.45] outline-none focus-visible:ring-[3px] focus-visible:ring-ring/14",
          className,
        )}
        {...props}
      />
    </div>
  );
}

function CommandList({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="command-list"
      className={cn("max-h-64 overflow-y-auto p-1", className)}
      {...props}
    />
  );
}

function CommandEmpty({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="command-empty"
      className={cn("px-2 py-3 text-[15px] leading-[1.45] text-muted-foreground", className)}
      {...props}
    />
  );
}

function CommandGroup({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="command-group" className={cn("space-y-1", className)} {...props} />;
}

function CommandItem({ className, ...props }: React.ComponentProps<"button">) {
  return (
    <button
      type="button"
      data-slot="command-item"
      className={cn(
        "hover:bg-[color-mix(in_srgb,var(--color-bg-alt)_86%,var(--color-surface))] hover:text-[var(--color-text)] focus-visible:bg-[color-mix(in_srgb,var(--color-bg-alt)_86%,var(--color-surface))] focus-visible:text-[var(--color-text)] flex w-full items-center gap-2 rounded-[14px] px-3 py-2 text-left text-[15px] leading-[1.45] text-[var(--color-text-secondary)] outline-none",
        className,
      )}
      {...props}
    />
  );
}

export { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList };
