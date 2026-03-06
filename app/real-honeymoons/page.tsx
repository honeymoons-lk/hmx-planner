"use client";

import { useMemo, useState } from "react";
import { homeContent } from "@/content/home-content";
import { HomeHeader } from "@/components/home/home-header";
import { FinalCtaSection } from "@/components/home/final-cta-section";
import { SiteFooter } from "@/components/home/site-footer";
import { Badge } from "@/components/ui/badge";
import { proxiedImageUrl } from "@/lib/media";

type JourneyStop = {
  id: string;
  dayRange: string;
  title: string;
  body: string;
  image: string;
};

type JourneyCase = {
  id: string;
  couple: string;
  route: string;
  pricingTier: "Comfortable" | "Premium" | "Exceptional";
  intro: string;
  testimonial: string;
  mapImage: string;
  stayName: string;
  stayRegion: string;
  stayNote: string;
  stops: JourneyStop[];
};

const realJourneys: JourneyCase[] = [
  {
    id: "na",
    couple: "N + A",
    route: "Colombo → Ella → Tangalle",
    pricingTier: "Premium",
    intro: "10 nights with tea trails, private moments, and a quiet beach finale.",
    testimonial: "It felt perfectly paced from day one.",
    mapImage: "/api/map/flow-static",
    stayName: "Amanwella",
    stayRegion: "South Coast",
    stayNote: "Minimal beachfront suites and uninterrupted sea views.",
    stops: [
      {
        id: "na-colombo",
        dayRange: "Days 1-2",
        title: "Landing softly in Colombo",
        body: "Private transfer, gentle first-night pacing, and an easy city rhythm before moving inland.",
        image:
          "https://images.unsplash.com/photo-1531201890865-fb64780d43d8?auto=format&fit=crop&w=2200&q=80",
      },
      {
        id: "na-ella",
        dayRange: "Days 3-6",
        title: "Tea hills and scenic rail in Ella",
        body: "Mornings on misty terraces, estate walks, and one of the island’s most beautiful rail journeys.",
        image:
          "https://images.unsplash.com/photo-1544737151-6e4b4f8d6b5b?auto=format&fit=crop&w=2200&q=80",
      },
      {
        id: "na-tangalle",
        dayRange: "Days 7-10",
        title: "Barefoot close on the South Coast",
        body: "Private beach time, long dinners, and a final stretch designed around rest and connection.",
        image:
          "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=2200&q=80",
      },
    ],
  },
  {
    id: "rm",
    couple: "R + M",
    route: "Sigiriya → Kandy → Galle",
    pricingTier: "Comfortable",
    intro: "8 nights balancing culture landmarks and coastal downtime.",
    testimonial: "Every transfer and check-in was seamless.",
    mapImage: "/api/map/flow-static",
    stayName: "Fort Bazaar",
    stayRegion: "Galle Fort",
    stayNote: "A refined boutique base in the heart of the fort.",
    stops: [
      {
        id: "rm-sigiriya",
        dayRange: "Days 1-3",
        title: "Ancient cities and Sigiriya mornings",
        body: "Sunrise climbs, private guiding, and slow afternoons with views over the Cultural Triangle.",
        image:
          "https://images.unsplash.com/photo-1588598198321-9735b3f9d55b?auto=format&fit=crop&w=2200&q=80",
      },
      {
        id: "rm-kandy",
        dayRange: "Days 4-5",
        title: "Kandy’s cultural core",
        body: "Temple visits, relaxed city pacing, and curated local experiences without overloading the day.",
        image:
          "https://images.unsplash.com/photo-1464790719320-516ecd75af6c?auto=format&fit=crop&w=2200&q=80",
      },
      {
        id: "rm-galle",
        dayRange: "Days 6-8",
        title: "Fort walks and ocean evenings in Galle",
        body: "Golden-hour ramparts, design-led boutique stays, and an elegant coastal finish.",
        image:
          "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?auto=format&fit=crop&w=2200&q=80",
      },
    ],
  },
  {
    id: "ds",
    couple: "D + S",
    route: "Bentota → Yala → Weligama",
    pricingTier: "Exceptional",
    intro: "9 nights with villa stays, safari, and signature dining.",
    testimonial: "It felt designed for us, not a template.",
    mapImage: "/api/map/flow-static",
    stayName: "Cape Weligama",
    stayRegion: "Weligama",
    stayNote: "Clifftop villas with expansive Indian Ocean views.",
    stops: [
      {
        id: "ds-bentota",
        dayRange: "Days 1-3",
        title: "Riverside calm in Bentota",
        body: "A serene start with private villa living, river excursions, and unhurried beach afternoons.",
        image:
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2200&q=80",
      },
      {
        id: "ds-yala",
        dayRange: "Days 4-6",
        title: "Safari days around Yala",
        body: "Dawn game drives, slow lodge mornings, and nature-led moments layered with comfort.",
        image:
          "https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=2200&q=80",
      },
      {
        id: "ds-weligama",
        dayRange: "Days 7-9",
        title: "Ocean-facing final days in Weligama",
        body: "Signature dining, sunset rituals, and full-service ease until departure.",
        image:
          "https://images.unsplash.com/photo-1493558103817-58b2924bce98?auto=format&fit=crop&w=2200&q=80",
      },
    ],
  },
];

export default function RealHoneymoonsPage() {
  const [activeJourneyId, setActiveJourneyId] = useState(realJourneys[0].id);
  const activeJourney = useMemo(
    () => realJourneys.find((journey) => journey.id === activeJourneyId) ?? realJourneys[0],
    [activeJourneyId],
  );
  const [activeStopId, setActiveStopId] = useState(activeJourney.stops[0].id);

  const activeStop = useMemo(
    () => activeJourney.stops.find((stop) => stop.id === activeStopId) ?? activeJourney.stops[0],
    [activeJourney, activeStopId],
  );

  return (
    <main className="min-h-screen bg-gradient-to-b from-[var(--color-bg-alt)] via-background to-[var(--color-bg)] text-foreground">
      <HomeHeader
        brand={homeContent.header.brand}
        links={homeContent.header.links}
        cta={homeContent.header.cta}
      />

      <section className="mx-auto w-full max-w-6xl px-4 py-[var(--section-space-mobile)] md:px-6 md:py-[var(--section-space-desktop)]">
        <header className="max-w-3xl">
          <p className="type-eyebrow text-muted-foreground">Real honeymoons</p>
          <h1 className="type-section mt-4 font-serif tracking-tight">Journeys we have designed in detail</h1>
          <p className="type-body-lg mt-[var(--heading-body-gap)] text-[var(--color-text-secondary)]">
            Explore real route structures, pacing decisions, and the kinds of stays we match to each couple.
          </p>
        </header>

        <div className="mt-8 -mx-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="inline-flex min-w-full items-center gap-3">
            {realJourneys.map((journey) => (
              <button
                key={journey.id}
                type="button"
                onClick={() => {
                  setActiveJourneyId(journey.id);
                  setActiveStopId(journey.stops[0].id);
                }}
                className={`rounded-[var(--radius-input)] border px-4 py-3 text-left transition-colors ${
                  journey.id === activeJourneyId
                    ? "border-[var(--color-border-strong)] bg-[var(--color-surface)]"
                    : "border-border bg-[var(--color-bg)] hover:bg-[var(--color-surface)]"
                }`}
              >
                <p className="type-ui-sm text-[var(--color-text)]">{journey.couple}</p>
                <p className="type-meta text-[var(--color-text-muted)]">{journey.route}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <Badge variant="secondary">{activeJourney.pricingTier}</Badge>
          <p className="type-body text-[var(--color-text-secondary)]">{activeJourney.intro}</p>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,0.92fr)] lg:gap-10">
          <div className="relative pl-7 lg:pl-10">
            <span className="absolute bottom-0 left-2 top-2 w-px border-l border-dashed border-[color-mix(in_srgb,var(--color-border-strong)_92%,transparent)]" />

            <article className="relative mb-8 rounded-[var(--radius-card)] border border-[color-mix(in_srgb,var(--color-border)_78%,transparent)] bg-[var(--color-surface)] p-5 md:p-6">
              <span className="absolute -left-[26px] top-8 h-2.5 w-2.5 rounded-full bg-[var(--color-brand)]" />
              <p className="type-eyebrow text-[var(--color-text-muted)]">{activeStop.dayRange}</p>
              <h2 className="mt-3 font-serif text-[clamp(30px,3.5vw,44px)] leading-[1.12] tracking-tight text-[var(--color-text)]">
                {activeStop.title}
              </h2>
              <p className="type-body mt-4 max-w-[62ch] text-[var(--color-text-secondary)]">{activeStop.body}</p>

              <img
                src={proxiedImageUrl(activeStop.image)}
                alt={activeStop.title}
                loading="lazy"
                className="mt-6 h-[360px] w-full rounded-[var(--radius-card)] object-cover object-center md:h-[440px]"
              />

              <div className="mt-6">
                <h3 className="font-serif text-[32px] leading-[1.1] text-[var(--color-text)]">Where they stayed</h3>
                <div className="mt-4 grid overflow-hidden rounded-[var(--radius-card)] border border-[color-mix(in_srgb,var(--color-border)_78%,transparent)] bg-[var(--color-surface)] md:grid-cols-[220px_1fr]">
                  <img
                    src={proxiedImageUrl(activeStop.image)}
                    alt={`${activeJourney.stayName} preview`}
                    loading="lazy"
                    className="h-[210px] w-full object-cover object-center md:h-full"
                  />
                  <div className="space-y-2 p-5">
                    <p className="type-eyebrow text-[var(--color-text-muted)]">{activeJourney.stayRegion}</p>
                    <p className="font-serif text-[32px] leading-[1.1] text-[var(--color-text)]">{activeJourney.stayName}</p>
                    <p className="type-body text-[var(--color-text-secondary)]">{activeJourney.stayNote}</p>
                  </div>
                </div>
              </div>
            </article>

            <div className="space-y-2">
              {activeJourney.stops.map((stop) => {
                const isActive = stop.id === activeStopId;
                return (
                  <button
                    key={stop.id}
                    type="button"
                    onClick={() => setActiveStopId(stop.id)}
                    className={`relative flex w-full items-start gap-3 rounded-[var(--radius-input)] px-3 py-3 text-left transition-colors ${
                      isActive
                        ? "bg-[color-mix(in_srgb,var(--color-bg-alt)_72%,transparent)]"
                        : "hover:bg-[color-mix(in_srgb,var(--color-bg-alt)_46%,transparent)]"
                    }`}
                  >
                    <span
                      className={`mt-2 h-2 w-2 rounded-full transition-colors ${
                        isActive ? "bg-[var(--color-brand)]" : "bg-[var(--color-border-strong)]"
                      }`}
                    />
                    <div>
                      <p className="type-ui-sm text-[var(--color-text)]">{stop.title}</p>
                      <p className="type-meta text-[var(--color-text-muted)]">{stop.dayRange}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="overflow-hidden rounded-[var(--radius-card)] border border-[color-mix(in_srgb,var(--color-border)_82%,transparent)] bg-[var(--color-bg-alt)]">
              <div className="relative h-[520px]">
                <img
                  src={activeJourney.mapImage}
                  alt={`${activeJourney.route} map`}
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(248,243,238,0.08)_0%,rgba(248,243,238,0.16)_100%)]" />
              </div>

              <div className="space-y-2 border-t border-[color-mix(in_srgb,var(--color-border)_82%,transparent)] p-5">
                <p className="type-eyebrow text-[var(--color-text-muted)]">{activeJourney.route}</p>
                <p className="type-body text-[var(--color-text-secondary)]">“{activeJourney.testimonial}”</p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <FinalCtaSection
        heading={homeContent.finalCta.heading}
        subcopy={homeContent.finalCta.subcopy}
        primary={homeContent.finalCta.primary}
        secondary={homeContent.finalCta.secondary}
      />

      <SiteFooter
        note={homeContent.footer.note}
        links={homeContent.footer.links}
        copyright={homeContent.footer.copyright}
      />
    </main>
  );
}
