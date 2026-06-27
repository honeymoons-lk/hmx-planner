import type { Metadata } from "next";
import Link from "next/link";
import { HeartHandshake, Map, PlaneTakeoff } from "lucide-react";

import { HomeHeader } from "@/components/home/home-header";
import { SiteFooter } from "@/components/home/site-footer";
import { SectionHeader } from "@/components/section-header";
import { Button } from "@/components/ui/button";
import { homeContent } from "@/content/home-content";

export const metadata: Metadata = {
  title: "About | Luna Voyages",
  description:
    "Luna Voyages is a romantic travel concierge for personalised honeymoons, anniversaries and private journeys with curated planning and local support.",
};

const principles = [
  {
    title: "Personal before packaged",
    body: "Every journey begins with the couple: the occasion, pace, travel style, and moments they want to remember.",
    icon: HeartHandshake,
  },
  {
    title: "Designed with restraint",
    body: "We prefer routes that breathe, stays with atmosphere, and enough space for the trip to feel like yours.",
    icon: Map,
  },
  {
    title: "Supported locally",
    body: "We only open destinations where local relationships and on-ground support can protect the experience.",
    icon: PlaneTakeoff,
  },
] as const;

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[var(--color-bg)] text-foreground">
      <HomeHeader
        brand={homeContent.header.brand}
        links={homeContent.header.links}
        cta={homeContent.header.cta}
      />

      <section className="section-shell w-full">
        <div className="page-shell grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-end lg:gap-20">
          <div>
            <SectionHeader
              eyebrow="About Luna Voyages"
              heading="Romantic travel, planned with care and restraint."
              supporting="Luna Voyages designs thoughtful honeymoons, anniversaries and private couple journeys for travellers who want something more personal than a package and calmer than planning every detail alone."
              className="mb-0"
            />
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/plan/journey">Start Planning Your Journey</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/sri-lanka">Explore Sri Lanka</Link>
              </Button>
            </div>
          </div>
          <figure className="overflow-hidden rounded-[var(--radius-card)] border border-[color-mix(in_srgb,var(--color-border-strong)_70%,transparent)] bg-[var(--color-surface-muted)] shadow-[var(--shadow-panel)]">
            <img
              src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1800&q=80"
              alt="Quiet romantic travel scene at sunset"
              className="aspect-[4/3] w-full object-cover"
              loading="eager"
            />
          </figure>
        </div>
      </section>

      <section className="section-shell-tight w-full bg-[var(--color-bg-alt)] border-y border-[var(--color-border-strong)]">
        <div className="page-shell">
          <div className="mb-12 max-w-3xl">
            <p className="type-eyebrow eyebrow-rule text-[var(--color-text-muted)]">How we think</p>
            <h2 className="type-section mt-5 font-serif text-[var(--color-text)]">
              A concierge brand for slower, more meaningful travel.
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {principles.map((principle) => {
              const Icon = principle.icon;
              return (
                <article
                  key={principle.title}
                  className="surface-outline bg-[color-mix(in_srgb,var(--color-surface)_94%,var(--color-bg))] p-6 shadow-[var(--shadow-soft)]"
                >
                  <Icon className="h-5 w-5 text-[var(--color-brand)]" />
                  <h3 className="type-subheading mt-6 font-serif text-[var(--color-text)]">
                    {principle.title}
                  </h3>
                  <p className="type-body mt-4 text-[var(--color-text-secondary)]">{principle.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-shell w-full">
        <div className="page-shell max-w-4xl">
          <p className="type-eyebrow eyebrow-rule text-[var(--color-text-muted)]">Current destination focus</p>
          <h2 className="type-section mt-5 font-serif text-[var(--color-text)]">
            Sri Lanka is where our destination work is active today.
          </h2>
          <p className="type-body-lg mt-5 max-w-[58ch] text-[var(--color-text-secondary)]">
            More destinations may be added later, but only when there is enough local depth to support the
            Luna Voyages standard. For now, Sri Lanka is the destination with live planning, local
            coordination, and detailed journey design.
          </p>
          <Link
            href="/sri-lanka/about"
            className="type-ui-sm mt-7 inline-flex text-[var(--color-brand)] underline decoration-[color-mix(in_srgb,var(--color-brand)_35%,transparent)] underline-offset-4 transition-colors hover:text-[var(--color-brand-hover)]"
          >
            Read about our Sri Lanka local support
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
