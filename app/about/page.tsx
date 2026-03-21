import type { Metadata } from "next";

import { FinalCtaSection } from "@/components/home/final-cta-section";
import { HomeHeader } from "@/components/home/home-header";
import { SiteFooter } from "@/components/home/site-footer";
import { homeContent } from "@/content/home-content";

export const metadata: Metadata = {
  title: "About | Luna Voyages",
  description:
    "Learn how Luna Voyages combines decades of Sri Lanka travel expertise with a modern concierge planning experience.",
};

const expertiseParagraphs = [
  "Sri Lanka's finest properties, guides, and experiences are not always visible from the outside. The relationships that unlock them — the right contact at the right boutique estate, the guide who knows the quiet path nobody else takes — are built over decades.",
  "Our founding team brings over 30 years of combined experience inside Sri Lanka's tourism industry, including active partnerships with the Sri Lanka Tourism Board and long-standing relationships with the country's most respected hospitality groups.",
  "Luna Voyages was built to make that access available to couples planning the most meaningful trip of their lives — delivered through a modern, seamless planning experience.",
] as const;

const homeLinks = homeContent.header.links.map((link) => ({
  ...link,
  href: link.href.startsWith("#") ? `/${link.href}` : link.href,
}));

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[var(--color-bg-alt)] via-background to-[var(--color-bg)] text-foreground">
      <HomeHeader
        brand={homeContent.header.brand}
        links={homeLinks}
        cta={homeContent.header.cta}
      />

      <section className="w-full">
        <div className="page-shell py-[var(--section-space-mobile)] md:py-[var(--section-space-desktop)]">
          <header className="max-w-3xl">
            <p className="type-eyebrow eyebrow-rule text-[var(--color-text-muted)]">
              OUR STORY
            </p>
            <h1 className="type-section mt-5 text-balance-pretty font-serif tracking-tight text-[var(--color-text)]">
              Built on decades of knowing Sri Lanka from the inside.
            </h1>
            <p className="type-body-lg mt-[var(--heading-body-gap)] max-w-[44ch] text-[var(--color-text-secondary)] font-light">
              Luna Voyages was founded by a technology leader with deep roots in
              Sri Lanka&apos;s travel industry — combining generations of local
              expertise with a modern, detail-obsessed approach to planning.
            </p>
          </header>
        </div>
      </section>

      <section className="section-shell w-full bg-[var(--color-bg-alt)]">
        <div className="page-shell">
          <div className="grid gap-16 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-start lg:gap-24">
            <div className="lg:sticky lg:top-[calc(var(--header-height)+40px)]">
              <p className="type-eyebrow eyebrow-rule text-[var(--color-text-muted)]">
                WHY IT MATTERS
              </p>
              <h2 className="type-section mt-5 max-w-[12ch] text-balance-pretty font-serif tracking-tight text-[var(--color-text)]">
                The kind of access that takes 30 years to build.
              </h2>
              <div
                className="mt-7 h-[1px] w-12 bg-[var(--color-brand)]"
                aria-hidden="true"
              />
            </div>

            <div className="premium-panel-strong rounded-[var(--radius-card)] p-8 md:p-10 lg:p-12">
              <div className="space-y-8">
                {expertiseParagraphs.map((paragraph, index) => (
                  <div
                    key={paragraph}
                    className={
                      index === 0
                        ? ""
                        : "border-t border-[var(--color-border-strong)] pt-8"
                    }
                  >
                    <p className="type-body text-[var(--color-text-secondary)] font-light">
                      {paragraph}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell w-full">
        <div className="page-shell">
          <div className="premium-panel-strong rounded-[var(--radius-card)] p-8 md:p-10 lg:p-12">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-start lg:gap-16">
              <div>
                <p className="type-eyebrow eyebrow-rule text-[var(--color-text-muted)]">
                  THE PERSON BEHIND IT
                </p>
                <h2 className="type-section mt-5 max-w-[12ch] text-balance-pretty font-serif tracking-tight text-[var(--color-text)]">
                  Technology meets local knowledge.
                </h2>
              </div>

              <p className="type-body-lg max-w-[40ch] text-[var(--color-text-secondary)] font-light">
                I spent 20 years building digital products. My family spent 30
                years building relationships across Sri Lanka&apos;s travel
                landscape. Luna Voyages is what happens when those two things
                come together — a concierge service that is as carefully
                engineered as it is personally guided.
              </p>
            </div>
          </div>
        </div>
      </section>

      <FinalCtaSection
        heading="Ready to plan your Sri Lanka honeymoon?"
        subcopy="Share your brief and we'll come back with tailored options within 48 hours."
        primary="Start Planning"
        secondary="Book a Call"
        primaryHref="/plan/journey"
        secondaryHref="/book-a-call"
      />

      <SiteFooter />
    </main>
  );
}
