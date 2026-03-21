import type { Metadata } from "next";

import { FinalCtaSection } from "@/components/home/final-cta-section";
import { HomeHeader } from "@/components/home/home-header";
import { SiteFooter } from "@/components/home/site-footer";
import { SectionHeader } from "@/components/section-header";
import { homeContent } from "@/content/home-content";

export const metadata: Metadata = {
  title: "About | Luna Voyages",
  description:
    "Luna Voyages was founded by a technology leader with deep roots in Sri Lanka's travel industry — combining generations of local expertise with a modern approach to planning.",
};

/** Stock imagery for layout only; replace with your own photography. */
const sampleImages = {
  heroDestination:
    "https://images.unsplash.com/photo-1596395819057-e37f55a8516b?auto=format&fit=crop&w=2400&q=80",
  coast:
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
  portraitOne:
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=900&q=80",
} as const;

const homeLinks = homeContent.header.links.map((link) => ({
  ...link,
  href: link.href.startsWith("#") ? `/${link.href}` : link.href,
}));

function SamplePhotoFrame({
  src,
  alt,
  caption,
  className,
  priority,
}: {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <figure className={className}>
      <div className="overflow-hidden rounded-[var(--radius-card)] border border-[color-mix(in_srgb,var(--color-border-strong)_70%,transparent)] bg-[var(--color-surface-muted)] shadow-[var(--shadow-panel)]">
        <img
          src={src}
          alt={alt}
          className="aspect-[4/5] h-full w-full object-cover sm:aspect-[5/6]"
          loading={priority ? "eager" : "lazy"}
          decoding="async"
        />
      </div>
      {caption && (
        <figcaption className="type-meta mt-3 text-[var(--color-text-muted)]">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[var(--color-bg)] text-foreground">
      <HomeHeader
        brand={homeContent.header.brand}
        links={homeLinks}
        cta={homeContent.header.cta}
      />

      {/* SECTION 1 — Page header */}
      <section className="w-full pt-[calc(var(--section-space-mobile)*1.5)] md:pt-[calc(var(--section-space-desktop)*1.2)] pb-12 md:pb-16">
        <div className="page-shell">
          <div className="max-w-3xl">
            <SectionHeader
              eyebrow="OUR STORY"
              heading="Built on decades of knowing Sri Lanka from the inside."
              supporting="Luna Voyages was founded by a technology leader with deep roots in Sri Lanka's travel industry — combining generations of local expertise with a modern, detail-obsessed approach to planning."
              className="mb-0 [&_p.type-body-lg]:max-w-[54ch]"
            />
          </div>
        </div>
      </section>

      <section className="w-full pb-[var(--section-space-mobile)] md:pb-[var(--section-space-desktop)]">
        <div className="page-shell">
          <figure className="w-full overflow-hidden rounded-[var(--radius-card)] border border-[color-mix(in_srgb,var(--color-border-strong)_70%,transparent)] bg-[var(--color-surface-muted)] shadow-[var(--shadow-panel)]">
            <img
              src={sampleImages.heroDestination}
              alt="Cinematic Sri Lanka landscape"
              className="aspect-[16/9] md:aspect-[21/9] w-full object-cover"
              loading="eager"
              decoding="async"
            />
          </figure>
        </div>
      </section>

      {/* SECTION 2 — The expertise block */}
      <section className="section-shell w-full bg-[var(--color-bg-alt)] border-y border-[var(--color-border-strong)]">
        <div className="page-shell">
          <div className="grid gap-16 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-start lg:gap-24">
            
            <div className="lg:sticky lg:top-[calc(var(--header-height)+40px)]">
              <SectionHeader
                eyebrow="WHY IT MATTERS"
                heading="The kind of access that takes 30 years to build."
                supporting=""
                className="mb-0 max-w-none"
              />
              <div className="mt-7 h-[1px] w-12 bg-[var(--color-brand)]" aria-hidden="true" />
            </div>

            <div className="flex flex-col gap-12">
              <figure className="w-full overflow-hidden rounded-[var(--radius-card)] border border-[color-mix(in_srgb,var(--color-border-strong)_70%,transparent)] bg-[var(--color-surface-muted)] shadow-[var(--shadow-soft)]">
                <img
                  src={sampleImages.coast}
                  alt="Calm tropical coastline at sunset"
                  className="aspect-[4/3] md:aspect-[16/9] w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </figure>
              
              <div className="max-w-[54ch] space-y-6">
                <p className="type-body text-[var(--color-text-secondary)] font-light">
                  Sri Lanka&apos;s finest properties, guides, and experiences are not always visible from the outside. The relationships that unlock them — the right contact at the right boutique estate, the guide who knows the quiet path nobody else takes — are built over decades.
                </p>
                <p className="type-body text-[var(--color-text-secondary)] font-light">
                  Our founding team brings over 30 years of combined experience inside Sri Lanka&apos;s tourism industry, including active partnerships with the Sri Lanka Tourism Board and long-standing relationships with the country&apos;s most respected hospitality groups.
                </p>
                <p className="type-body text-[var(--color-text-secondary)] font-light">
                  Luna Voyages was built to make that access available to couples planning the most meaningful trip of their lives — delivered through a modern, seamless planning experience.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 3 — The founder note */}
      <section className="section-shell w-full">
        <div className="page-shell">
          <div className="grid gap-16 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center lg:gap-24">
            
            <div className="order-2 lg:order-1">
              <SamplePhotoFrame
                src={sampleImages.portraitOne}
                alt="Founder of Luna Voyages"
                caption="Sample portrait — replace with your photo."
                className="w-full max-w-md mx-auto lg:mx-0"
              />
            </div>

            <div className="order-1 lg:order-2 lg:sticky lg:top-[calc(var(--header-height)+40px)]">
              <SectionHeader
                eyebrow="THE PERSON BEHIND IT"
                heading="Technology meets local knowledge."
                supporting="I spent 20 years building digital products. My family spent 30 years building relationships across Sri Lanka's travel landscape. Luna Voyages is what happens when those two things come together — a concierge service that is as carefully engineered as it is personally guided."
                className="mb-0 max-w-none"
              />
              <div className="mt-7 h-[1px] w-12 bg-[var(--color-brand)]" aria-hidden="true" />
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 4 — CTA */}
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
