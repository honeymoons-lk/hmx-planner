import type { Metadata } from "next";

import { FinalCtaSection } from "@/components/home/final-cta-section";
import { HomeHeader } from "@/components/home/home-header";
import { SiteFooter } from "@/components/home/site-footer";
import { StoriesSection } from "@/components/home/stories-section";
import { FlowMapSketch } from "@/src/components/FlowMapSketch";
import { homeContent } from "@/content/home-content";

export const metadata: Metadata = {
  title: "Sri Lanka Itinerary Ideas | Luna Voyages",
  description:
    "Explore Sri Lanka honeymoon and romantic itinerary ideas, from 7-day escapes to 10-day honeymoons and 14-day beach, wildlife and hill country journeys.",
  alternates: {
    canonical: "/sri-lanka/itineraries",
  },
};

const itineraryThemes = [
  {
    title: "7-day romantic Sri Lanka escape",
    body: "A shorter private route focused on easy transfers, beautiful stays and one clear coastal or hill-country rhythm.",
  },
  {
    title: "10-day honeymoon journey",
    body: "A balanced honeymoon arc with time for culture, scenic landscapes, boutique stays and a slow beach finish.",
  },
  {
    title: "14-day beach, wildlife and hill country route",
    body: "A fuller private journey with room for safari, tea country, heritage towns, food, coast and proper downtime.",
  },
] as const;

export default function SriLankaItinerariesPage() {
  return (
    <main className="min-h-screen bg-[var(--color-bg)] text-foreground">
      <HomeHeader
        brand={homeContent.header.brand}
        links={homeContent.header.links}
        cta={homeContent.header.cta}
      />

      <section className="section-shell w-full">
        <div className="page-shell max-w-4xl">
          <p className="type-eyebrow eyebrow-rule text-[var(--color-text-muted)]">Sri Lanka itinerary ideas</p>
          <h1 className="type-hero mt-6 max-w-[13ch] font-serif text-[var(--color-text)]">
            Sri Lanka Honeymoon Itinerary Ideas
          </h1>
          <p className="type-body-lg mt-6 max-w-[58ch] text-[var(--color-text-secondary)]">
            These are example journey shapes, not fixed packages. Luna Voyages adjusts the route around
            your dates, season, pace, budget band, preferred stays and the kind of romantic trip you want.
          </p>
        </div>
      </section>

      <section className="section-shell-tight w-full bg-[var(--color-bg-alt)] border-y border-[var(--color-border-strong)]">
        <div className="page-shell grid gap-4 md:grid-cols-3">
          {itineraryThemes.map((theme) => (
            <article
              key={theme.title}
              className="surface-outline bg-[color-mix(in_srgb,var(--color-surface)_94%,var(--color-bg))] p-6 shadow-[var(--shadow-soft)]"
            >
              <h2 className="type-subheading font-serif text-[var(--color-text)]">{theme.title}</h2>
              <p className="type-body mt-4 text-[var(--color-text-secondary)]">{theme.body}</p>
            </article>
          ))}
        </div>
      </section>

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

      <FinalCtaSection
        heading="Plan a Sri Lanka route around your pace."
        subcopy="Share your timing, travel style and must-have moments. We will shape a private itinerary from there."
        primary="Plan My Sri Lanka Trip"
        secondary="Explore Experiences"
        primaryHref="/plan/journey"
        secondaryHref="/sri-lanka/experiences"
      />

      <SiteFooter />
    </main>
  );
}
