import Link from "next/link";

type SiteFooterProps = {
  note: string;
  links: readonly { label: string; href: string }[];
  copyright: string;
};

export function SiteFooter({ note, links, copyright }: SiteFooterProps) {
  return (
    <footer className="border-t border-border bg-background/90">
      <div className="mx-auto w-full max-w-6xl px-4 py-8 md:px-6">
        <div className="flex flex-col gap-4 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>{note}</p>
          <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">{copyright}</p>
      </div>
    </footer>
  );
}
