"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

function Command({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="command"
      className={cn("bg-popover text-popover-foreground flex h-full w-full flex-col overflow-hidden rounded-[var(--radius-input)]", className)}
      {...props}
    />
  );
}

function CommandInput({ className, ...props }: React.ComponentProps<"input">) {
  return (
    <div className="border-b border-border p-2">
      <input
        data-slot="command-input"
        className={cn(
          "placeholder:text-muted-foreground h-9 w-full rounded-[var(--radius-input)] border border-input bg-transparent px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring",
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
      className={cn("px-2 py-3 text-sm text-muted-foreground", className)}
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
        "hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left text-sm outline-none",
        className,
      )}
      {...props}
    />
  );
}

export { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList };
