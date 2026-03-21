import type { Metadata } from "next";

import { FinalCtaSection } from "@/components/home/final-cta-section";
import { HomeHeader } from "@/components/home/home-header";
import { SiteFooter } from "@/components/home/site-footer";
import { homeContent } from "@/content/home-content";

export const metadata: Metadata = {
  title: "About | Luna Voyages",
  description:
    "Meet the couple behind Luna Voyages — Sri Lanka honeymoon planners who care deeply about the quiet, unrepeatable moments.",
};

/** Stock imagery for layout only; replace with your own photography. */
const sampleImages = {
  heroCouple:
    "https://images.unsplash.com/photo-1516589178581-6cd783cf48cd?auto=format&fit=crop&w=1400&q=80",
  teaCountry:
    "https://images.unsplash.com/photo-1587330979470-3595ac045ab0?auto=format&fit=crop&w=1600&q=80",
  coast:
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80",
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
  caption: string;
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
      <figcaption className="type-meta mt-3 text-[var(--color-text-muted)]">
        {caption}
      </figcaption>
    </figure>
  );
}

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
          <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:gap-16 xl:gap-20">
            <header className="max-w-3xl lg:pt-4">
              <p className="type-eyebrow eyebrow-rule text-[var(--color-text-muted)]">
                OUR STORY
              </p>
              <h1 className="type-section mt-5 text-balance-pretty font-serif tracking-tight text-[var(--color-text)]">
                A couple-led studio for honeymoons that feel unmistakably Sri
                Lanka.
              </h1>
              <p className="type-body-lg mt-[var(--heading-body-gap)] max-w-[44ch] text-[var(--color-text-secondary)] font-light">
                We are two people who love this island — its light, its pace,
                and the way a well-timed stop can turn an ordinary afternoon
                into a memory you revisit for years. Luna Voyages is our answer
                to a simple question: what would it look like if honeymoon
                planning felt as caring as showing friends the places you
                actually go?
              </p>
            </header>

            <SamplePhotoFrame
              src={sampleImages.heroCouple}
              alt="A couple laughing together outdoors — sample image standing in for founder photography"
              caption="Sample photo — swap for a portrait of the two of you."
              priority
              className="mx-auto w-full max-w-md lg:mx-0 lg:max-w-none"
            />
          </div>
        </div>
      </section>

      <section className="section-shell w-full bg-[var(--color-bg-alt)]">
        <div className="page-shell">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10 lg:items-start">
            <div className="lg:col-span-5 lg:sticky lg:top-[calc(var(--header-height)+40px)]">
              <p className="type-eyebrow eyebrow-rule text-[var(--color-text-muted)]">
                WHY WE CARE
              </p>
              <h2 className="type-section mt-5 text-balance-pretty font-serif tracking-tight text-[var(--color-text)]">
                Because a honeymoon is not a generic holiday.
              </h2>
              <p className="type-body mt-6 max-w-[40ch] text-[var(--color-text-secondary)] font-light">
                We have planned our own milestones here — and helped friends do
                the same. The difference is never only the hotel. It is the
                driver who waits without rushing you, the table that catches
                golden hour, and the room category that actually matches what
                you pictured when you said you wanted &quot;quiet luxury.&quot;
                That is the work we obsess over.
              </p>
              <div
                className="mt-7 h-[1px] w-12 bg-[var(--color-brand)]"
                aria-hidden="true"
              />
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:col-span-7">
              <figure className="sm:row-span-2">
                <div className="overflow-hidden rounded-[var(--radius-card)] border border-[color-mix(in_srgb,var(--color-border-strong)_70%,transparent)] bg-[var(--color-surface-muted)] shadow-[var(--shadow-panel)]">
                  <img
                    src={sampleImages.teaCountry}
                    alt="Hill country landscape with train — sample destination photography"
                    className="aspect-[3/4] h-full w-full object-cover sm:min-h-[min(520px,70vh)] sm:aspect-auto"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <figcaption className="type-meta mt-3 text-[var(--color-text-muted)]">
                  Sample — replace with your own Sri Lanka moments.
                </figcaption>
              </figure>
              <figure className="sm:mt-12">
                <div className="overflow-hidden rounded-[var(--radius-card)] border border-[color-mix(in_srgb,var(--color-border-strong)_70%,transparent)] bg-[var(--color-surface-muted)] shadow-[var(--shadow-soft)]">
                  <img
                    src={sampleImages.coast}
                    alt="Calm tropical coastline at sunset — sample destination photography"
                    className="aspect-[4/3] h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </figure>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell w-full">
        <div className="page-shell">
          <div className="grid gap-16 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-start lg:gap-24">
            <div className="lg:sticky lg:top-[calc(var(--header-height)+40px)]">
              <p className="type-eyebrow eyebrow-rule text-[var(--color-text-muted)]">
                HOW WE WORK
              </p>
              <h2 className="type-section mt-5 max-w-[14ch] text-balance-pretty font-serif tracking-tight text-[var(--color-text)]">
                The access that takes years to earn — with a process that
                respects your time.
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

      <section className="section-shell-tight w-full bg-[var(--color-bg-alt)]">
        <div className="page-shell">
          <div className="mb-12 max-w-2xl">
            <p className="type-eyebrow eyebrow-rule text-[var(--color-text-muted)]">
              THE TWO OF US
            </p>
            <h2 className="type-section mt-5 text-balance-pretty font-serif tracking-tight text-[var(--color-text)]">
              Product craft meets island instinct.
            </h2>
            <p className="type-body-lg mt-[var(--heading-body-gap)] max-w-[44ch] text-[var(--color-text-secondary)] font-light">
              One of us spent years building digital products with an eye for
              clarity and flow. The other grew up inside Sri Lanka&apos;s travel
              world — introductions, nuance, and knowing who to call when the
              plan needs a gentle reroute. Together, we are small on purpose: you
              work directly with the people who own the outcome.
            </p>
          </div>

          <div className="grid gap-12 md:grid-cols-2 md:gap-10 lg:gap-14">
            <article className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
              <SamplePhotoFrame
                src={sampleImages.portraitOne}
                alt="Sample portrait placeholder for Luna Voyages founder"
                caption="Sample portrait — replace with your photo."
                className="w-full shrink-0 sm:max-w-[220px]"
              />
              <div className="min-w-0">
                <h3 className="type-subheading font-serif tracking-tight text-[var(--color-text)]">
                  Partnerships &amp; on-island detail
                </h3>
                <p className="type-body mt-3 text-[var(--color-text-secondary)] font-light">
                  Properties, guides, drivers, and the small requests that
                  rarely fit neatly on a form — handled with the care of someone
                  who treats your dates as real life, not a line item.
                </p>
              </div>
            </article>

            <article className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
              <SamplePhotoFrame
                src={sampleImages.portraitTwo}
                alt="Sample portrait placeholder for Luna Voyages founder"
                caption="Sample portrait — replace with your photo."
                className="w-full shrink-0 sm:max-w-[220px]"
              />
              <div className="min-w-0">
                <h3 className="type-subheading font-serif tracking-tight text-[var(--color-text)]">
                  Experience, systems &amp; your brief
                </h3>
                <p className="type-body mt-3 text-[var(--color-text-secondary)] font-light">
                  A calm planning rhythm, thoughtful defaults, and the structure
                  that keeps everything moving — so you can focus on the feeling
                  of the trip, not the spreadsheet behind it.
                </p>
              </div>
            </article>
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
