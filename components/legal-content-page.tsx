import type { ReactNode } from "react";

import { HomeHeader } from "@/components/home/home-header";
import { SiteFooter } from "@/components/home/site-footer";
import { homeContent } from "@/content/home-content";

const homeLinks = homeContent.header.links.map((link) => ({
  ...link,
  href: link.href.startsWith("#") ? `/${link.href}` : link.href,
}));

type LegalContentPageProps = {
  eyebrow: string;
  title: string;
  intro: string;
  lastUpdated?: string;
  children: ReactNode;
};

export function LegalContentPage({
  eyebrow,
  title,
  intro,
  lastUpdated,
  children,
}: LegalContentPageProps) {
  return (
    <main className="min-h-screen bg-[var(--color-bg)] text-foreground">
      <HomeHeader
        brand={homeContent.header.brand}
        links={homeLinks}
        cta={homeContent.header.cta}
      />

      <article className="w-full pt-[calc(var(--section-space-mobile)*1.5)] md:pt-[calc(var(--section-space-desktop)*1.2)] pb-[var(--section-space-mobile)] md:pb-[var(--section-space-desktop)]">
        <div className="page-shell">
          <header className="mb-12 max-w-[65ch] md:mb-16">
            <p className="type-eyebrow eyebrow-rule text-[var(--color-text-muted)]">{eyebrow}</p>
            <h1 className="type-section mt-6 text-balance-pretty font-serif tracking-tight text-[var(--color-text)]">
              {title}
            </h1>
            <p className="type-body-lg mt-5 max-w-[54ch] font-light text-[var(--color-text-secondary)]">
              {intro}
            </p>
            {lastUpdated ? (
              <p className="type-meta mt-6 text-[var(--color-text-muted)]">Last updated: {lastUpdated}</p>
            ) : null}
          </header>

          <div className="max-w-[65ch] space-y-10 border-t border-[var(--color-border-strong)] pt-10">
            {children}
          </div>
        </div>
      </article>

      <SiteFooter />
    </main>
  );
}

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-4">
      <h2 className="type-subheading font-serif tracking-tight text-[var(--color-text)]">{title}</h2>
      <div className="space-y-4 text-[var(--color-text-secondary)] [&_p]:type-body [&_p]:font-light [&_ul]:type-body [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:font-light [&_li]:mt-2">
        {children}
      </div>
    </section>
  );
}
