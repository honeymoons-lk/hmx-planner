import Link from "next/link";
import Image from "next/image";

type SiteFooterProps = {
  note: string;
  links: readonly { label: string; href: string }[];
  copyright: string;
};

export function SiteFooter({ note, links, copyright }: SiteFooterProps) {
  return (
    <footer className="border-t border-[color-mix(in_srgb,var(--color-border)_42%,transparent)] bg-[var(--color-dark)] text-[var(--color-light)]">
      <div className="page-shell py-10 md:py-12">
        <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-start">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-3 text-[20px] tracking-tight">
              <Image src="/logo-icon.png" alt="Luna Voyages logo" width={34} height={34} />
              <span className="font-wordmark text-[0.92em] leading-none">LUNA VOYAGES</span>
            </div>
            <p className="type-body max-w-[32rem] text-[color-mix(in_srgb,var(--color-light)_76%,var(--color-bg-alt))]">
              {note}
            </p>
          </div>

          <nav
            aria-label="Footer"
            className="type-ui-sm flex flex-wrap items-center gap-x-5 gap-y-2 text-[color-mix(in_srgb,var(--color-light)_72%,var(--color-bg-alt))]"
          >
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="rounded-full px-1 py-1 transition-colors hover:text-[var(--color-light)] focus-visible:outline-none focus-visible:ring-[4px] focus-visible:ring-[color-mix(in_srgb,var(--color-light)_18%,transparent)]"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="soft-divider mt-8 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.18)_18%,rgba(255,255,255,0.18)_82%,transparent_100%)]" />
        <p className="type-ui-sm mt-6 text-[color-mix(in_srgb,var(--color-light)_62%,var(--color-bg-alt))]">
          {copyright}
        </p>
      </div>
    </footer>
  );
}
