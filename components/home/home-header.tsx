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
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 md:px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-sm text-[20px] font-medium tracking-tight md:text-[22px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Image src="/logo-icon.png" alt="Luna Voyages logo" width={34} height={34} priority />
          <span className="font-wordmark leading-none">{brand}</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button asChild>
            <Link href={cta.href}>{cta.label}</Link>
          </Button>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[290px]">
            <nav className="mt-8 flex flex-col gap-4" aria-label="Mobile">
              {links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="rounded-sm text-base text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {link.label}
                </Link>
              ))}
              <Separator className="my-2" />
              <Button asChild>
                <Link href={cta.href}>{cta.label}</Link>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
