import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

type HomeHeaderProps = {
  brand: string;
  links: readonly { label: string; href: string }[];
  cta: { label: string; href: string };
};

export function HomeHeader({ brand, links, cta }: HomeHeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-[color-mix(in_srgb,var(--color-border)_72%,transparent)] bg-[color-mix(in_srgb,var(--color-bg)_86%,rgba(255,255,255,0.72))] backdrop-blur-xl supports-[backdrop-filter]:bg-[color-mix(in_srgb,var(--color-bg)_82%,rgba(255,255,255,0.68))]">
      <div className="page-shell flex h-[74px] items-center justify-between md:h-[84px]">
        <Link
          href="/"
          className="inline-flex items-center gap-3 rounded-full px-1 py-1 text-[20px] font-medium tracking-tight transition-colors hover:text-[var(--color-brand)] focus-visible:outline-none focus-visible:ring-[4px] focus-visible:ring-ring/16 md:text-[22px]"
        >
          <Image src="/logo-icon.png" alt="Luna Voyages logo" width={38} height={38} priority />
          <span className="font-wordmark text-[0.92em] leading-none text-[var(--color-text)]">{brand}</span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="type-ui-sm relative rounded-full px-1 py-2 text-[var(--color-text-secondary)] transition-colors duration-300 after:absolute after:bottom-1 after:left-1 after:h-px after:w-[calc(100%-0.5rem)] after:origin-left after:scale-x-0 after:bg-[color-mix(in_srgb,var(--color-brand)_62%,var(--color-border-strong))] after:transition-transform after:duration-300 hover:text-[var(--color-brand)] hover:after:scale-x-100 focus-visible:outline-none focus-visible:ring-[4px] focus-visible:ring-ring/16"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button asChild size="sm" className="px-6 h-10">
            <Link href={cta.href}>{cta.label}</Link>
          </Button>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon-sm" className="lg:hidden" aria-label="Open menu">
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
              <Button asChild size="lg" className="w-full mt-4">
                <Link href={cta.href}>{cta.label}</Link>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
