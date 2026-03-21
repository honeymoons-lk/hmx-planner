import type { Metadata } from "next";

import { FinalCtaSection } from "@/components/home/final-cta-section";
import { HomeHeader } from "@/components/home/home-header";
import { SiteFooter } from "@/components/home/site-footer";
import { SectionHeader } from "@/components/section-header";
import { homeContent } from "@/content/home-content";

export const metadata: Metadata = {
  title: "About | Luna Voyages",
  description:
    "Meet the couple behind Luna Voyages — Sri Lanka honeymoon planners who care deeply about the quiet, unrepeatable moments.",
};

/** Stock imagery for layout only; replace with your own photography. */
const sampleImages = {
  heroDestination:
    "https://images.unsplash.com/photo-1596395819057-e37f55a8516b?auto=format&fit=crop&w=2400&q=80",
  coast:
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
  portraitOne:
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=900&q=80",
  portraitTwo:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=900&q=80",
} as const;

const expertiseParagraphs = [
  "Sri Lanka's finest properties, guides, and experiences are not always visible from the outside. The relationships that unlock them — the right contact at the right boutique estate, the guide who knows the quiet path nobody else takes — are built over decades.",
  "Between us, we bring decades of combined experience inside Sri Lanka's tourism ecosystem, including long-standing relationships with respected hospitality teams and the kind of on-the-ground judgment you only get from living and working here.",
  "Luna Voyages exists so couples do not have to trade warmth and access for a modern planning experience. We built it the way we would want to be looked after — clear, thoughtful, and relentlessly personal.",
] as const;

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

      {/* Hero Section */}
      <section className="w-full pt-[calc(var(--section-space-mobile)*1.5)] md:pt-[calc(var(--section-space-desktop)*1.2)] pb-12 md:pb-16">
        <div className="page-shell">
          <div className="max-w-3xl">
            <SectionHeader
              eyebrow="OUR STORY"
              heading="A couple-led studio for honeymoons that feel unmistakably Sri Lanka."
              supporting="We are two people who love this island — its light, its pace, and the way a well-timed stop can turn an ordinary afternoon into a memory you revisit for years. Luna Voyages is our answer to a simple question: what would it look like if honeymoon planning felt as caring as showing friends the places you actually go?"
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
          <p className="type-meta mt-4 text-[var(--color-text-muted)]">
            Sample photo — swap for a cinematic shot of your favorite Sri Lankan region.
          </p>
        </div>
      </section>

      {/* Why We Care & How We Work */}
      <section className="section-shell w-full bg-[var(--color-bg-alt)] border-y border-[var(--color-border-strong)]">
        <div className="page-shell">
          <div className="grid gap-16 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-start lg:gap-24">
            
            <div className="lg:sticky lg:top-[calc(var(--header-height)+40px)]">
              <SectionHeader
                eyebrow="WHY WE CARE"
                heading="Because a honeymoon is not a generic holiday."
                supporting="We have planned our own milestones here — and helped friends do the same. The difference is never only the hotel. It is the driver who waits without rushing you, the table that catches golden hour, and the room category that actually matches what you pictured when you said you wanted &quot;quiet luxury.&quot;"
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
              
              <div className="max-w-[54ch]">
                <h3 className="type-subheading font-serif tracking-tight text-[var(--color-text)] mb-6">
                  The access that takes years to earn
                </h3>
                <div className="space-y-6">
                  {expertiseParagraphs.map((paragraph, index) => (
                    <p key={index} className="type-body text-[var(--color-text-secondary)] font-light">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* The Two of Us */}
      <section className="section-shell w-full">
        <div className="page-shell">
          <div className="grid gap-16 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-start lg:gap-24">
            <div className="lg:sticky lg:top-[calc(var(--header-height)+40px)]">
              <SectionHeader
                eyebrow="THE TWO OF US"
                heading="Product craft meets island instinct."
                supporting="One of us spent years building digital products with an eye for clarity and flow. The other grew up inside Sri Lanka's travel world — introductions, nuance, and knowing who to call when the plan needs a gentle reroute. Together, we are small on purpose: you work directly with the people who own the outcome."
                className="mb-0 max-w-none"
              />
              <div className="mt-7 h-[1px] w-12 bg-[var(--color-brand)]" aria-hidden="true" />
            </div>

            <div className="grid gap-10 sm:grid-cols-2">
              <article className="flex flex-col gap-5">
                <SamplePhotoFrame
                  src={sampleImages.portraitOne}
                  alt="Sample portrait placeholder for Luna Voyages founder"
                  caption="Sample portrait — replace with your photo."
                  className="w-full"
                />
                <div>
                  <h3 className="type-subheading font-serif tracking-tight text-[var(--color-text)]">
                    Partnerships &amp; on-island detail
                  </h3>
                  <p className="type-body mt-2 text-[var(--color-text-secondary)] font-light">
                    Properties, guides, drivers, and the small requests that rarely fit neatly on a form — handled with the care of someone who treats your dates as real life, not a line item.
                  </p>
                </div>
              </article>

              <article className="flex flex-col gap-5 sm:mt-16">
                <SamplePhotoFrame
                  src={sampleImages.portraitTwo}
                  alt="Sample portrait placeholder for Luna Voyages founder"
                  caption="Sample portrait — replace with your photo."
                  className="w-full"
                />
                <div>
                  <h3 className="type-subheading font-serif tracking-tight text-[var(--color-text)]">
                    Experience, systems &amp; your brief
                  </h3>
                  <p className="type-body mt-2 text-[var(--color-text-secondary)] font-light">
                    A calm planning rhythm, thoughtful defaults, and the structure that keeps everything moving — so you can focus on the feeling of the trip, not the spreadsheet behind it.
                  </p>
                </div>
              </article>
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
