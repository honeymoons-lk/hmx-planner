"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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
  stayName: string;
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
    stayName: "Amanwella",
    stayNote: "Minimal beachfront suites and uninterrupted sea views.",
    stops: [
      {
        id: "na-colombo",
        dayRange: "Day 1-2",
        title: "Landing softly in Colombo",
        body: "Private transfer, gentle first-night pacing, and an easy city rhythm before moving inland.",
        image:
          "https://images.unsplash.com/photo-1531201890865-fb64780d43d8?auto=format&fit=crop&w=2200&q=80",
      },
      {
        id: "na-ella",
        dayRange: "Day 3-6",
        title: "Tea hills and scenic rail in Ella",
        body: "Mornings on misty terraces, estate walks, and one of the island’s most beautiful rail journeys.",
        image:
          "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=2200&q=80",
      },
      {
        id: "na-tangalle",
        dayRange: "Day 7-10",
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
    stayName: "Fort Bazaar",
    stayNote: "A refined boutique base in the heart of the fort.",
    stops: [
      {
        id: "rm-sigiriya",
        dayRange: "Day 1-3",
        title: "Ancient cities and Sigiriya mornings",
        body: "Sunrise climbs, private guiding, and slow afternoons with views over the Cultural Triangle.",
        image:
          "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=2200&q=80",
      },
      {
        id: "rm-kandy",
        dayRange: "Day 4-5",
        title: "Kandy’s cultural core",
        body: "Temple visits, relaxed city pacing, and curated local experiences without overloading the day.",
        image:
          "https://images.unsplash.com/photo-1464790719320-516ecd75af6c?auto=format&fit=crop&w=2200&q=80",
      },
      {
        id: "rm-galle",
        dayRange: "Day 6-8",
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
    stayName: "Cape Weligama",
    stayNote: "Clifftop villas with expansive Indian Ocean views.",
    stops: [
      {
        id: "ds-bentota",
        dayRange: "Day 1-3",
        title: "Riverside calm in Bentota",
        body: "A serene start with private villa living, river excursions, and unhurried beach afternoons.",
        image:
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2200&q=80",
      },
      {
        id: "ds-yala",
        dayRange: "Day 4-6",
        title: "Safari days around Yala",
        body: "Dawn game drives, slow lodge mornings, and nature-led moments layered with comfort.",
        image:
          "https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=2200&q=80",
      },
      {
        id: "ds-weligama",
        dayRange: "Day 7-9",
        title: "Ocean-facing final days in Weligama",
        body: "Signature dining, sunset rituals, and full-service ease until departure.",
        image:
          "https://images.unsplash.com/photo-1493558103817-58b2924bce98?auto=format&fit=crop&w=2200&q=80",
      },
    ],
  },
];

const routePoints = [
  { x: 173, y: 172, labelX: 108, labelY: 164 },
  { x: 225, y: 250, labelX: 252, labelY: 242 },
  { x: 212, y: 372, labelX: 238, labelY: 368 },
  { x: 170, y: 500, labelX: 202, labelY: 492 },
] as const;

function indexToPointIndex(index: number, total: number): number {
  if (total <= 1) return 1;
  if (total === 2) return [0, 3][index] ?? 3;
  if (total === 3) return [0, 1, 3][index] ?? 3;
  return [0, 1, 2, 3][index] ?? 3;
}

function buildRoutePath(stopsCount: number): string {
  const points = Array.from({ length: stopsCount }, (_, index) => routePoints[indexToPointIndex(index, stopsCount)]);
  if (!points.length) return "";
  if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;

  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i += 1) {
    const prev = points[i - 1];
    const curr = points[i];
    const cx = (prev.x + curr.x) / 2;
    const cy = (prev.y + curr.y) / 2 - 24;
    d += ` Q ${cx} ${cy} ${curr.x} ${curr.y}`;
  }
  return d;
}

export default function RealHoneymoonsPage() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const blockRefs = useRef<Record<string, HTMLElement | null>>({});
  const activeJourney = realJourneys[0];
  const [activeStopId, setActiveStopId] = useState(activeJourney.stops[0].id);
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setHasEntered(true);
        });
      },
      { threshold: 0.3 },
    );
    observer.observe(sectionEl);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const blocks = activeJourney.stops
      .map((stop) => blockRefs.current[stop.id])
      .filter((element): element is HTMLElement => Boolean(element));
    if (!blocks.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (!visible.length) return;
        const stepId = visible[0].target.getAttribute("data-step-id");
        if (stepId) setActiveStopId(stepId);
      },
      {
        threshold: [0.3, 0.5, 0.7],
        rootMargin: "-24% 0px -34% 0px",
      },
    );

    blocks.forEach((block) => observer.observe(block));
    return () => observer.disconnect();
  }, [activeJourney.stops]);

  const routePath = useMemo(() => buildRoutePath(activeJourney.stops.length), [activeJourney.stops.length]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-[var(--color-bg-alt)] via-background to-[var(--color-bg)] text-foreground">
      <HomeHeader
        brand={homeContent.header.brand}
        links={homeContent.header.links}
        cta={homeContent.header.cta}
      />

      <section
        ref={sectionRef}
        className="mx-auto w-full max-w-6xl px-4 py-[var(--section-space-mobile)] md:px-6 md:py-[var(--section-space-desktop)]"
      >
        <header className="max-w-3xl">
          <p className="type-eyebrow text-muted-foreground">REAL HONEYMOONS</p>
          <h1 className="type-section mt-4 font-serif tracking-tight">Journeys we have designed in detail</h1>
          <p className="type-body-lg mt-[var(--heading-body-gap)] text-[var(--color-text-secondary)]">
            Explore real route structures, pacing decisions, and the kinds of stays we match to each couple.
          </p>
        </header>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Badge variant="secondary">{activeJourney.pricingTier}</Badge>
          <p className="type-body text-[var(--color-text-secondary)]">{activeJourney.intro}</p>
        </div>

        <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,43%)_minmax(0,57%)] lg:gap-12">
          <div className="relative pl-8 md:pl-10">
            <span className="absolute bottom-6 left-0 top-2 w-px bg-[color-mix(in_srgb,var(--color-border-strong)_86%,transparent)]" />

            <div className="space-y-14">
              {activeJourney.stops.map((stop) => {
                const isActive = stop.id === activeStopId;
                return (
                  <article
                    key={stop.id}
                    data-step-id={stop.id}
                    ref={(element) => {
                      blockRefs.current[stop.id] = element;
                    }}
                    className={`relative transition-opacity duration-500 ${isActive ? "opacity-100" : "opacity-70"}`}
                  >
                    <span
                      className={`absolute -left-[34px] top-1 h-2.5 w-2.5 rounded-full border border-[var(--color-bg)] transition-all duration-300 ${
                        isActive ? "bg-[var(--color-brand)] scale-110" : "bg-[var(--color-border-strong)]"
                      }`}
                    />

                    <p className="type-eyebrow text-[var(--color-text-muted)]">{stop.dayRange.toUpperCase()}</p>
                    <h2 className="mt-3 font-serif text-[clamp(28px,3.2vw,40px)] leading-[1.16] text-[var(--color-text)]">
                      {stop.title}
                    </h2>
                    <p className="type-body mt-4 text-[var(--color-text-secondary)]">{stop.body}</p>

                    <img
                      src={proxiedImageUrl(stop.image)}
                      alt={stop.title}
                      loading="lazy"
                      className="mt-7 aspect-[16/10] w-full rounded-[var(--radius-card)] object-cover object-center"
                    />

                    <div className="mt-6">
                      <p className="font-serif text-[30px] leading-[1.15] text-[var(--color-text)]">Where you could stay</p>
                      <p className="mt-3 font-sans text-[18px] font-medium leading-[1.5] text-[var(--color-text)]">{activeJourney.stayName}</p>
                      <p className="type-body mt-2 text-[var(--color-text-secondary)]">{activeJourney.stayNote}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          <aside className="order-last lg:order-none lg:sticky lg:top-24 lg:self-start xl:mr-[-160px] 2xl:mr-[-200px]">
            <div className="overflow-hidden rounded-[var(--radius-card)] border border-[color-mix(in_srgb,var(--color-border)_80%,transparent)] bg-[var(--color-bg-alt)]">
              <div className="relative aspect-[4/5] min-h-[420px] md:aspect-[5/6] lg:min-h-[620px]">
                <svg viewBox="0 0 420 620" className="h-full w-full" role="img" aria-label={`${activeJourney.route} route map`}>
                  <rect x="0" y="0" width="420" height="620" fill="color-mix(in srgb, var(--color-bg-alt) 82%, var(--color-surface))" />
                  <path
                    d="M168 84C196 79 222 88 238 103C258 122 271 154 273 184C276 221 269 257 257 293C249 318 250 343 257 370C266 404 263 441 249 472C235 504 215 527 194 542C178 553 157 555 143 547C127 537 120 518 121 497C123 462 137 430 138 397C138 365 128 334 121 303C114 271 114 237 124 206C133 177 149 153 157 125C162 107 160 95 168 84Z"
                    fill="color-mix(in srgb, var(--color-surface) 95%, var(--color-bg-alt))"
                    stroke="color-mix(in srgb, var(--color-border-strong) 88%, transparent)"
                    strokeWidth="2"
                  />
                  <path
                    d={routePath}
                    fill="none"
                    stroke="color-mix(in srgb, var(--color-brand) 88%, var(--color-text))"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    pathLength={1}
                    style={{
                      strokeDasharray: 1,
                      strokeDashoffset: hasEntered ? 0 : 1,
                      transition: "stroke-dashoffset 1400ms ease-out",
                    }}
                  />

                  {activeJourney.stops.map((stop, index) => {
                    const point = routePoints[indexToPointIndex(index, activeJourney.stops.length)];
                    const isActive = stop.id === activeStopId;
                    return (
                      <g key={`${stop.id}-map-marker`}>
                        <circle
                          cx={point.x}
                          cy={point.y}
                          r={isActive ? 10 : 7}
                          fill={isActive ? "var(--color-brand)" : "color-mix(in srgb, var(--color-text-muted) 75%, var(--color-border-strong))"}
                          opacity={isActive ? 1 : 0.88}
                          style={{ transition: "all 280ms ease" }}
                        />
                        <circle
                          cx={point.x}
                          cy={point.y}
                          r={isActive ? 16 : 0}
                          fill="none"
                          stroke="color-mix(in srgb, var(--color-brand) 45%, transparent)"
                          strokeWidth="1.5"
                          style={{ transition: "all 280ms ease" }}
                        />
                        <text
                          x={point.labelX}
                          y={point.labelY}
                          fill="color-mix(in srgb, var(--color-text-secondary) 82%, var(--color-text-muted))"
                          style={{ fontSize: "11px", fontFamily: "var(--font-body), Inter, sans-serif", letterSpacing: "0.04em" }}
                        >
                          {stop.dayRange}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>

              <div className="border-t border-[color-mix(in_srgb,var(--color-border)_82%,transparent)] p-5">
                <p className="type-eyebrow text-[var(--color-text-muted)]">{activeJourney.route}</p>
                <p className="type-body mt-2 text-[var(--color-text-secondary)]">“{activeJourney.testimonial}”</p>
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
