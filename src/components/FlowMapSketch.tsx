"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { SectionHeader } from "@/components/section-header";
import { proxiedImageUrl } from "@/lib/media";

type FlowStep = {
  id: string;
  stop: string;
  nights: string;
  caption: string;
};

type FlowMapSketchProps = {
  id: string;
  eyebrow: string;
  heading: string;
  subcopy: string;
  steps: readonly FlowStep[];
  note: string;
};

type ItineraryDetail = {
  days: string;
  title: string;
  body: string;
  image: string;
  stayName: string;
  stayNote: string;
};

const itineraryDetails: Record<string, ItineraryDetail> = {
  colombo: {
    days: "Days 1-2",
    title: "Arrival reset in Colombo",
    body:
      "Land gently with a private transfer, a calm city hotel, and time to recover from the flight. Evening plans stay light: a long dinner, a rooftop drink, and an easy first night.",
    image:
      "https://images.unsplash.com/photo-1531201890865-fb64780d43d8?auto=format&fit=crop&w=2200&q=80",
    stayName: "Uga Residence",
    stayNote: "A quiet city retreat for your first nights.",
  },
  cultural: {
    days: "Days 3-5",
    title: "Slow luxury in the Cultural Triangle",
    body:
      "Move north for Sigiriya and the ancient cities with early starts and long relaxed afternoons. Private guiding and deliberate pacing keep the experience immersive, not rushed.",
    image:
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=2200&q=80",
    stayName: "Water Garden Sigiriya",
    stayNote: "Villa-style stays with direct rock fortress views.",
  },
  tea: {
    days: "Days 6-7",
    title: "Tea Country and highland mornings",
    body:
      "Take the scenic rail route into the hills and settle into estate life. Cool air, misty views, and unhurried mornings create a strong emotional midpoint in the itinerary.",
    image:
      "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=2200&q=80",
    stayName: "Ceylon Tea Trails",
    stayNote: "Historic bungalows with deeply personal service.",
  },
  south: {
    days: "Day 8-10",
    title: "Beach time on the South Coast",
    body:
      "Finish where it feels effortless: ocean-facing villas, slow lunches, and candlelit evenings. This final stretch is designed for downtime, connection, and a graceful end to the journey.",
    image:
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=2200&q=80",
    stayName: "Amanwella",
    stayNote: "Minimal beachfront suites with complete privacy.",
  },
};

const markerPositions: Record<string, { x: number; y: number; labelX: number; labelY: number }> = {
  colombo: { x: 173, y: 172, labelX: 108, labelY: 164 },
  cultural: { x: 225, y: 250, labelX: 252, labelY: 242 },
  tea: { x: 212, y: 372, labelX: 238, labelY: 368 },
  south: { x: 170, y: 500, labelX: 202, labelY: 492 },
};

export function FlowMapSketch({ id, eyebrow, heading, subcopy, steps, note }: FlowMapSketchProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const blockRefs = useRef<Record<string, HTMLElement | null>>({});
  const [activeStopId, setActiveStopId] = useState<string>(steps[0]?.id ?? "");
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHasEntered(true);
          }
        });
      },
      { threshold: 0.3 },
    );

    sectionObserver.observe(sectionEl);
    return () => sectionObserver.disconnect();
  }, []);

  useEffect(() => {
    const blocks = steps
      .map((step) => blockRefs.current[step.id])
      .filter((el): el is HTMLElement => Boolean(el));
    if (!blocks.length) return;

    const blockObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (!visible.length) return;
        const next = visible[0].target.getAttribute("data-step-id");
        if (next) setActiveStopId(next);
      },
      {
        threshold: [0.3, 0.5, 0.7],
        rootMargin: "-24% 0px -34% 0px",
      },
    );

    blocks.forEach((block) => blockObserver.observe(block));
    return () => blockObserver.disconnect();
  }, [steps]);

  const narrativeSteps = useMemo(
    () =>
      steps.map((step) => {
        const detail = itineraryDetails[step.id] ?? {
          days: "Day by day",
          title: step.stop,
          body: step.caption,
          image: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=2200&q=80",
          stayName: "Curated stay",
          stayNote: "Selected to match your pace and style.",
        };
        return { ...step, detail };
      }),
    [steps],
  );

  return (
    <section ref={sectionRef} id={id} className="w-full py-[var(--section-space-mobile)] md:py-[var(--section-space-desktop)]">
      <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
        <SectionHeader eyebrow={eyebrow} heading={heading} supporting={subcopy} className="max-w-3xl" />

        <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,43%)_minmax(0,57%)] lg:gap-12">
          <div className="relative pl-8 md:pl-10">
            <span className="absolute bottom-6 left-0 top-2 w-px bg-[color-mix(in_srgb,var(--color-border-strong)_86%,transparent)]" />

            <div className="space-y-14">
              {narrativeSteps.map((step) => {
                const isActive = step.id === activeStopId;
                return (
                  <article
                    key={step.id}
                    data-step-id={step.id}
                    ref={(element) => {
                      blockRefs.current[step.id] = element;
                    }}
                    className={`relative transition-opacity duration-500 ${isActive ? "opacity-100" : "opacity-70"}`}
                  >
                    <span
                      className={`absolute -left-[34px] top-1 h-2.5 w-2.5 rounded-full border border-[var(--color-bg)] transition-all duration-300 ${
                        isActive ? "bg-[var(--color-brand)] scale-110" : "bg-[var(--color-border-strong)]"
                      }`}
                    />

                    <p className="type-eyebrow text-[var(--color-text-muted)]">{step.detail.days.toUpperCase()}</p>
                    <h3 className="mt-3 font-serif text-[clamp(28px,3.2vw,40px)] leading-[1.16] text-[var(--color-text)]">
                      {step.detail.title}
                    </h3>
                    <p className="type-body mt-4 text-[var(--color-text-secondary)]">{step.detail.body}</p>

                    <img
                      src={proxiedImageUrl(step.detail.image)}
                      alt={step.detail.title}
                      loading="lazy"
                      className="mt-7 aspect-[16/10] w-full rounded-[var(--radius-card)] object-cover object-center"
                    />

                    <div className="mt-6">
                      <p className="font-serif text-[30px] leading-[1.15] text-[var(--color-text)]">Where you could stay</p>
                      <p className="mt-3 font-sans text-[18px] font-medium leading-[1.5] text-[var(--color-text)]">{step.detail.stayName}</p>
                      <p className="type-body mt-2 text-[var(--color-text-secondary)]">{step.detail.stayNote}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          <aside className="order-last lg:order-none lg:sticky lg:top-24 lg:self-start xl:mr-[-160px] 2xl:mr-[-200px]">
            <div className="overflow-hidden rounded-[var(--radius-card)] border border-[color-mix(in_srgb,var(--color-border)_80%,transparent)] bg-[var(--color-bg-alt)]">
              <div className="relative aspect-[4/5] min-h-[420px] md:aspect-[5/6] lg:min-h-[620px]">
                <svg viewBox="0 0 420 620" className="h-full w-full" role="img" aria-label="Sri Lanka route map">
                  <rect x="0" y="0" width="420" height="620" fill="color-mix(in srgb, var(--color-bg-alt) 82%, var(--color-surface))" />
                  <path
                    d="M168 84C196 79 222 88 238 103C258 122 271 154 273 184C276 221 269 257 257 293C249 318 250 343 257 370C266 404 263 441 249 472C235 504 215 527 194 542C178 553 157 555 143 547C127 537 120 518 121 497C123 462 137 430 138 397C138 365 128 334 121 303C114 271 114 237 124 206C133 177 149 153 157 125C162 107 160 95 168 84Z"
                    fill="color-mix(in srgb, var(--color-surface) 95%, var(--color-bg-alt))"
                    stroke="color-mix(in srgb, var(--color-border-strong) 88%, transparent)"
                    strokeWidth="2"
                  />

                  <path
                    d="M173 172Q198 204 225 250Q220 308 212 372Q190 438 170 500"
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

                  {steps.map((step) => {
                    const marker = markerPositions[step.id] ?? { x: 210, y: 300, labelX: 230, labelY: 292 };
                    const isActive = step.id === activeStopId;

                    return (
                      <g key={`${step.id}-map`}>
                        <circle
                          cx={marker.x}
                          cy={marker.y}
                          r={isActive ? 10 : 7}
                          fill={isActive ? "var(--color-brand)" : "color-mix(in srgb, var(--color-text-muted) 75%, var(--color-border-strong))"}
                          opacity={isActive ? 1 : 0.88}
                          style={{ transition: "all 280ms ease" }}
                        />
                        <circle
                          cx={marker.x}
                          cy={marker.y}
                          r={isActive ? 16 : 0}
                          fill="none"
                          stroke="color-mix(in srgb, var(--color-brand) 45%, transparent)"
                          strokeWidth="1.5"
                          style={{ transition: "all 280ms ease" }}
                        />
                        <text
                          x={marker.labelX}
                          y={marker.labelY}
                          fill="color-mix(in srgb, var(--color-text-secondary) 82%, var(--color-text-muted))"
                          style={{ fontSize: "11px", fontFamily: "var(--font-body), Inter, sans-serif", letterSpacing: "0.04em" }}
                        >
                          {step.stop}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>
          </aside>
        </div>

        <p className="type-body mt-10 max-w-[68ch] text-muted-foreground">{note}</p>
      </div>
    </section>
  );
}
