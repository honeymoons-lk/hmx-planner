import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export function PlanningHeader() {
  return (
    <header className="border-b border-border bg-background/92 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-4 md:px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Image src="/logo-icon.png" alt="Luna Voyages logo" width={30} height={30} priority />
          <span className="font-wordmark type-ui-sm text-[var(--color-text)]">LUNA VOYAGES</span>
        </Link>
        <Link
          href="/"
          className="type-ui-sm inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </Link>
      </div>
    </header>
  );
}

export function PlanningMicroFooter() {
  return (
    <footer className="border-t border-border/80 bg-background">
      <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-5 md:px-6">
        <Link href="/" className="type-ui-sm text-muted-foreground transition-colors hover:text-foreground">
          Back to home
        </Link>
        <nav aria-label="Planning footer links" className="flex items-center gap-4">
          <Link href="/privacy" className="type-ui-sm text-muted-foreground transition-colors hover:text-foreground">
            Privacy
          </Link>
          <Link href="/terms" className="type-ui-sm text-muted-foreground transition-colors hover:text-foreground">
            Terms
          </Link>
        </nav>
      </div>
    </footer>
  );
}

