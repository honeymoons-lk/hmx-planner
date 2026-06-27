import type { Metadata } from "next";
import Link from "next/link";

import { homeContent } from "@/content/home-content";
import { FlowMapSketch } from "@/src/components/FlowMapSketch";
import { HomeHeader } from "@/components/home/home-header";
import { HeroSection } from "@/components/home/hero-section";
import { TrustBridgeSection } from "@/components/home/trust-bridge-section";
import { MomentsSection } from "@/components/home/moments-section";
import { StaysSection } from "@/components/home/stays-section";
import { PartnersSection } from "@/components/home/partners-section";
import { PhilosophySection } from "@/components/home/philosophy-section";
import { StoriesSection } from "@/components/home/stories-section";
import { ApproachSection } from "@/components/home/approach-section";
import { WhySection } from "@/components/home/why-section";
import { FinalCtaSection } from "@/components/home/final-cta-section";
import { SiteFooter } from "@/components/home/site-footer";

export const metadata: Metadata = {
  title: "Sri Lanka Honeymoons & Romantic Travel | Luna Voyages",
  description:
    "Plan a personalised Sri Lanka honeymoon or romantic journey with Luna Voyages. Curated stays, private transfers, local support and flexible itinerary planning.",
  alternates: {
    canonical: "/sri-lanka",
  },
};

const travelStyles = [
  {
    title: "Honeymoons",
    body: "Private, unhurried routes shaped around your first journey together.",
  },
  {
    title: "Anniversaries",
    body: "Meaningful escapes with beautiful stays, memorable meals, and time to reconnect.",
  },
  {
    title: "Private couple journeys",
    body: "Tailored travel for two with a private driver and a pace that feels personal.",
  },
  {
    title: "Luxury escapes",
    body: "Exceptional hotels, villas, and hosted experiences without the noise of a package tour.",
  },
  {
    title: "Boutique stays",
    body: "Small hotels and characterful villas chosen for privacy, mood, and service.",
  },
  {
    title: "Wildlife and nature",
    body: "Safari, coastline, forest, and hill country moments woven into one coherent journey.",
  },
  {
    title: "Beach + hill country",
    body: "A classic Sri Lanka rhythm: misty estate mornings followed by warm coastal evenings.",
  },
] as const;

const itineraryThemes = [
  "7-day romantic Sri Lanka escape",
  "10-day honeymoon journey",
  "14-day beach, wildlife and hill country route",
] as const;

const supportItems = [
  "Airport pickup",
  "Private transfers",
  "Hotel coordination",
  "Local drivers",
  "Flexible itinerary support",
  "Help during the trip if plans change",
] as const;

function SriLankaIntroSections() {
  return (
    <>
      <section className="section-shell-tight w-full bg-[var(--color-surface)]">
        <div className="page-shell grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start lg:gap-20">
          <div>
            <p className="type-eyebrow eyebrow-rule text-[var(--color-text-muted)]">Sri Lanka, personally planned</p>
            <h2 className="type-section mt-5 max-w-[12ch] font-serif text-[var(--color-text)]">
              Beaches, hills, wildlife, culture, and space for two.
            </h2>
          </div>
          <div className="space-y-6">
            <p className="type-body-lg text-[var(--color-text-secondary)]">
              Sri Lanka is unusually rich for honeymoons, anniversaries, and private romantic journeys. In one
              considered route, you can move from boutique beach stays and scenic drives to misty hill country,
              wildlife, heritage towns, warm food culture, and slow days designed around each other.
            </p>
            <p className="type-body text-[var(--color-text-secondary)]">
              We are not just planning from a distance. We have people on the ground for airport pickups,
              hotel transfers, drivers, local coordination, and support while you travel.
            </p>
            <Link
              href="/sri-lanka/about"
              className="type-ui-sm inline-flex text-[var(--color-brand)] underline decoration-[color-mix(in_srgb,var(--color-brand)_35%,transparent)] underline-offset-4 transition-colors hover:text-[var(--color-brand-hover)]"
            >
              Learn about Sri Lanka local support
            </Link>
          </div>
        </div>
      </section>

      <section id="travel-styles" className="section-shell w-full">
        <div className="page-shell">
          <div className="mb-12 max-w-3xl">
            <p className="type-eyebrow eyebrow-rule text-[var(--color-text-muted)]">Sri Lanka travel styles</p>
            <h2 className="type-section mt-5 font-serif text-[var(--color-text)]">
              The journey can be quiet, adventurous, indulgent, or all three.
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {travelStyles.map((style) => (
              <article
                key={style.title}
                className="surface-outline bg-[color-mix(in_srgb,var(--color-surface)_94%,var(--color-bg))] p-6 shadow-[var(--shadow-soft)]"
              >
                <h3 className="type-subheading font-serif text-[var(--color-text)]">{style.title}</h3>
                <p className="type-body mt-3 text-[var(--color-text-secondary)]">{style.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="itinerary-ideas" className="section-shell-tight w-full bg-[var(--color-bg-alt)]">
        <div className="page-shell grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-start lg:gap-20">
          <div>
            <p className="type-eyebrow eyebrow-rule text-[var(--color-text-muted)]">Itinerary themes</p>
            <h2 className="type-section mt-5 font-serif text-[var(--color-text)]">
              Suggested Sri Lanka journey shapes.
            </h2>
            <p className="type-body mt-5 max-w-[42ch] text-[var(--color-text-secondary)]">
              These are starting points, not fixed packages. We adjust the route around season, pace, flight
              times, stay preferences, and the kind of trip you want to remember.
            </p>
            <Link
              href="/sri-lanka/itineraries"
              className="type-ui-sm mt-7 inline-flex text-[var(--color-brand)] underline decoration-[color-mix(in_srgb,var(--color-brand)_35%,transparent)] underline-offset-4 transition-colors hover:text-[var(--color-brand-hover)]"
            >
              View Sri Lanka itinerary ideas
            </Link>
          </div>
          <div className="grid gap-4">
            {itineraryThemes.map((theme, index) => (
              <div
                key={theme}
                className="flex items-start gap-5 border-t border-[var(--color-border-strong)] pt-5"
              >
                <span className="type-eyebrow text-[var(--color-brand)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="type-subheading font-serif text-[var(--color-text)]">{theme}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="on-ground-support" className="section-shell w-full">
        <div className="page-shell grid gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start lg:gap-20">
          <div>
            <p className="type-eyebrow eyebrow-rule text-[var(--color-text-muted)]">On-ground support</p>
            <h2 className="type-section mt-5 font-serif text-[var(--color-text)]">
              Local coordination from arrival through the journey.
            </h2>
            <p className="type-body-lg mt-5 max-w-[44ch] text-[var(--color-text-secondary)]">
              Sri Lanka rewards careful routing and reliable local handling. We coordinate the details that
              make the trip feel calm, especially when plans need to flex.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {supportItems.map((item) => (
              <div
                key={item}
                className="surface-outline bg-[color-mix(in_srgb,var(--color-surface)_94%,var(--color-bg))] px-5 py-4"
              >
                <p className="type-ui-sm text-[var(--color-text)]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default function SriLankaPage() {
  return (
    <main className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      <HomeHeader
        brand={homeContent.header.brand}
        links={homeContent.header.links}
        cta={homeContent.header.cta}
      />

      <HeroSection content={homeContent.hero} />

      <SriLankaIntroSections />

      <TrustBridgeSection
        eyebrow={homeContent.trustBridge.eyebrow}
        heading={homeContent.trustBridge.heading}
        subcopy={homeContent.trustBridge.subcopy}
        proofPoints={homeContent.trustBridge.proofPoints}
      />

      <MomentsSection
        id={homeContent.moments.id}
        eyebrow={homeContent.moments.eyebrow}
        heading={homeContent.moments.heading}
        supporting={homeContent.moments.subcopy}
        panels={homeContent.moments.panels}
      />

      <StaysSection
        id={homeContent.stays.id}
        eyebrow={homeContent.stays.eyebrow}
        heading={homeContent.stays.heading}
        supporting={homeContent.stays.subcopy}
        footerNote={homeContent.stays.footerNote}
        items={homeContent.stays.items}
      />

      <FlowMapSketch
        id={homeContent.flow.id}
        eyebrow={homeContent.flow.eyebrow}
        heading={homeContent.flow.heading}
        subcopy={homeContent.flow.subcopy}
        steps={homeContent.flow.steps}
        note={homeContent.flow.note}
      />

      <StoriesSection
        id={homeContent.stories.id}
        eyebrow={homeContent.stories.eyebrow}
        heading={homeContent.stories.heading}
        supporting={homeContent.stories.subcopy}
        cta={homeContent.stories.cta}
        caseStudies={homeContent.stories.caseStudies}
      />

      <ApproachSection
        id={homeContent.approach.id}
        eyebrow={homeContent.approach.eyebrow}
        heading={homeContent.approach.heading}
        supporting={homeContent.approach.subcopy}
        steps={homeContent.approach.steps}
      />

      <PartnersSection
        id={homeContent.partners.id}
        eyebrow={homeContent.partners.eyebrow}
        heading={homeContent.partners.heading}
        supporting={homeContent.partners.subcopy}
        logos={homeContent.partners.logos}
      />

      <PhilosophySection
        id={homeContent.philosophy.id}
        eyebrow={homeContent.philosophy.eyebrow}
        heading={homeContent.philosophy.heading}
        body={homeContent.philosophy.body}
        link={homeContent.philosophy.link}
      />

      <WhySection
        id={homeContent.why.id}
        eyebrow={homeContent.why.eyebrow}
        heading={homeContent.why.heading}
        supporting={homeContent.why.subcopy}
        objections={homeContent.why.objections}
        closing={homeContent.why.closing}
      />

      <FinalCtaSection
        heading={homeContent.finalCta.heading}
        subcopy={homeContent.finalCta.subcopy}
        primary={homeContent.finalCta.primary}
        secondary={homeContent.finalCta.secondary}
        primaryHref="/plan/journey"
        secondaryHref="/sri-lanka/itineraries"
      />

      <SiteFooter />
    </main>
  );
}
