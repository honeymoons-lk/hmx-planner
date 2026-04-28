"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

type HomeHeaderProps = {
  brand: string;
  links: readonly { label: string; href: string }[];
  cta: { label: string; href: string };
};

export function HomeHeader({ brand, links, cta }: HomeHeaderProps) {
  const [tone, setTone] = useState<"transparent" | "light" | "dark">("transparent");

  useEffect(() => {
    const updateTone = () => {
      if (window.scrollY < 12) {
        setTone("transparent");
        return;
      }

      const marker = document.elementFromPoint(window.innerWidth / 2, 100)?.closest("[data-header-tone]");
      const markerTone = marker?.getAttribute("data-header-tone");
      if (markerTone === "dark") {
        setTone("dark");
      } else {
        setTone("light");
      }
    };

    updateTone();
    window.addEventListener("scroll", updateTone, { passive: true });
    window.addEventListener("resize", updateTone);

    return () => {
      window.removeEventListener("scroll", updateTone);
      window.removeEventListener("resize", updateTone);
    };
  }, []);

  const isDark = tone === "dark";
  const isTransparent = tone === "transparent";

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b backdrop-blur-xl transition-colors duration-500",
        isTransparent && "border-transparent bg-transparent",
        !isTransparent && !isDark && "border-[color-mix(in_srgb,var(--color-border)_70%,transparent)] bg-[color-mix(in_srgb,var(--color-bg)_92%,white)]",
        isDark && "border-[color-mix(in_srgb,var(--color-light)_16%,transparent)] bg-[rgba(23,20,18,0.75)]",
      )}
    >
      <div className="page-shell flex h-[74px] items-center justify-between md:h-[84px]">
        <Link
          href="/"
          className={cn(
            "inline-flex items-center gap-3 rounded-full px-1 py-1 text-[20px] font-medium tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-[4px] focus-visible:ring-ring/16 md:text-[22px]",
            isDark || isTransparent ? "text-[var(--color-light)]" : "text-[var(--color-text)]",
          )}
        >
          <Image src="/logo-icon.png" alt="Luna Voyages logo" width={38} height={38} priority />
          <span className="font-wordmark text-[0.92em] leading-none">{brand}</span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={cn(
                "type-ui-sm relative rounded-full px-1 py-2 transition-colors duration-300 after:absolute after:bottom-1 after:left-1 after:h-px after:w-[calc(100%-0.5rem)] after:origin-left after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100 focus-visible:outline-none focus-visible:ring-[4px] focus-visible:ring-ring/16",
                isDark || isTransparent
                  ? "text-[color-mix(in_srgb,var(--color-light)_85%,transparent)] hover:text-[var(--color-light)] after:bg-[color-mix(in_srgb,var(--color-light)_52%,transparent)]"
                  : "text-[var(--color-text-secondary)] hover:text-[var(--color-brand)] after:bg-[color-mix(in_srgb,var(--color-brand)_62%,var(--color-border-strong))]",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button
            asChild
            size="sm"
            variant={isDark || isTransparent ? "outline" : "default"}
            className={cn(
              "h-10 px-6",
              isDark || isTransparent
                ? "border-[color-mix(in_srgb,var(--color-light)_40%,transparent)] text-[var(--color-light)] hover:bg-[color-mix(in_srgb,var(--color-light)_8%,transparent)]"
                : "",
            )}
          >
            <Link href={cta.href}>{cta.label}</Link>
          </Button>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon-sm" className={cn("lg:hidden", isDark || isTransparent ? "text-[var(--color-light)] border-[color-mix(in_srgb,var(--color-light)_40%,transparent)]" : "")} aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[320px] border-l border-[color-mix(in_srgb,var(--color-border)_72%,transparent)] bg-[linear-gradient(180deg,rgba(255,251,247,0.98)_0%,rgba(246,238,230,0.96)_100%)] px-6"
          >
            <nav className="mt-10 flex flex-col gap-4" aria-label="Mobile">
              {links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="type-ui-sm rounded-[18px] px-3 py-2 text-[var(--color-text)] transition-colors hover:text-[var(--color-brand)] focus-visible:outline-none focus-visible:ring-[4px] focus-visible:ring-ring/16"
                >
                  {link.label}
                </Link>
              ))}
              <Separator className="my-2" />
              <Button asChild size="lg" className="mt-4 w-full">
                <Link href={cta.href}>{cta.label}</Link>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
