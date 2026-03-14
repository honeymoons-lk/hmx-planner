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
  stayType: string;
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
    stayType: "City retreat",
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
    stayType: "Villa hideaway",
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
    stayType: "Estate bungalow",
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
    stayType: "Beachfront suite",
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
          stayType: "Curated stay",
          stayName: "Curated stay",
          stayNote: "Selected to match your pace and style.",
        };
        return { ...step, detail };
      }),
    [steps],
  );

  return (
    <section ref={sectionRef} id={id} className="section-shell w-full">
      <div className="page-shell">
        <SectionHeader eyebrow={eyebrow} heading={heading} supporting={subcopy} className="max-w-3xl" />

        <div className="mt-16 grid gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start lg:gap-24">
          {/* Left: Editorial Timeline */}
          <div className="relative">
            {/* Continuous fine line for the timeline */}
            <div className="absolute bottom-0 left-[11px] top-4 w-[1px] bg-[color-mix(in_srgb,var(--color-border-strong)_40%,transparent)]" />

            <div className="space-y-20">
              {narrativeSteps.map((step) => {
                const isActive = step.id === activeStopId;
                return (
                  <article
                    key={step.id}
                    data-step-id={step.id}
                    ref={(element) => {
                      blockRefs.current[step.id] = element;
                    }}
                    className={`relative pl-10 transition-all duration-700 ${
                      isActive ? "opacity-100" : "opacity-40 hover:opacity-70"
                    }`}
                  >
                    {/* Timeline Dot */}
                    <div
                      className={`absolute left-0 top-2 h-6 w-6 -translate-x-[5.5px] rounded-full border bg-[var(--color-bg)] transition-all duration-500 flex items-center justify-center ${
                        isActive
                          ? "border-[var(--color-brand)]"
                          : "border-[var(--color-border-strong)]"
                      }`}
                    >
                      <div
                        className={`h-2 w-2 rounded-full transition-all duration-500 ${
                          isActive ? "bg-[var(--color-brand)] scale-100" : "bg-transparent scale-0"
                        }`}
                      />
                    </div>

                    {/* Step Header */}
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[var(--color-text-muted)]">
                        {step.detail.days}
                      </p>
                      <span className="h-[1px] w-8 bg-[color-mix(in_srgb,var(--color-border-strong)_60%,transparent)]" />
                      <p className="text-[12px] italic text-[var(--color-text-secondary)]">
                        {step.nights}
                      </p>
                    </div>

                    <h3 className="font-serif text-[clamp(28px,3vw,36px)] leading-[1.1] text-[var(--color-text)] mb-4">
                      {step.detail.title}
                    </h3>
                    
                    <p className="text-[16px] leading-[1.7] text-[var(--color-text-secondary)] font-light max-w-[42ch]">
                      {step.detail.body}
                    </p>

                    {/* Image */}
                    <div className="mt-8 overflow-hidden rounded-[4px]">
                      <img
                        src={proxiedImageUrl(step.detail.image)}
                        alt={step.detail.title}
                        loading="lazy"
                        className={`aspect-[16/9] w-full object-cover object-center transition-transform duration-1000 ${
                          isActive ? "scale-100" : "scale-105"
                        }`}
                      />
                    </div>

                    {/* Stay Cue - Typographic instead of boxed */}
                    <div className="mt-8 border-t border-[color-mix(in_srgb,var(--color-border-strong)_40%,transparent)] pt-5">
                      <div className="flex items-baseline gap-6">
                        <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[var(--color-text-muted)] w-24 shrink-0">
                          Stay Cue
                        </p>
                        <div>
                          <p className="text-[16px] font-medium text-[var(--color-text)]">
                            {step.detail.stayType}
                          </p>
                          <p className="text-[14px] text-[var(--color-text-secondary)] italic mt-1">
                            e.g. {step.detail.stayName} — {step.detail.stayNote}
                          </p>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          {/* Right: Floating Minimal Map */}
          <aside className="order-first lg:order-none lg:sticky lg:top-[calc(var(--header-height)+40px)] lg:self-start">
            <div className="relative aspect-[4/5] min-h-[500px] w-full max-w-[500px] mx-auto lg:min-h-[700px]">
              {/* Removed the heavy background and border, making the map float */}
              <svg viewBox="0 0 420 620" className="h-full w-full drop-shadow-sm" role="img" aria-label="Sri Lanka route map">
                {/* Island Base */}
                <path
                  d="M168 84C196 79 222 88 238 103C258 122 271 154 273 184C276 221 269 257 257 293C249 318 250 343 257 370C266 404 263 441 249 472C235 504 215 527 194 542C178 553 157 555 143 547C127 537 120 518 121 497C123 462 137 430 138 397C138 365 128 334 121 303C114 271 114 237 124 206C133 177 149 153 157 125C162 107 160 95 168 84Z"
                  fill="color-mix(in srgb, var(--color-surface) 60%, transparent)"
                  stroke="color-mix(in srgb, var(--color-border-strong) 60%, transparent)"
                  strokeWidth="1"
                />

                {/* Route Line */}
                <path
                  d="M173 172Q198 204 225 250Q220 308 212 372Q190 438 170 500"
                  fill="none"
                  stroke="var(--color-brand)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  pathLength={1}
                  style={{
                    strokeDasharray: 1,
                    strokeDashoffset: hasEntered ? 0 : 1,
                    transition: "stroke-dashoffset 2000ms ease-in-out",
                  }}
                />

                {/* Markers */}
                {steps.map((step) => {
                  const marker = markerPositions[step.id] ?? { x: 210, y: 300, labelX: 230, labelY: 292 };
                  const isActive = step.id === activeStopId;

                  return (
                    <g key={`${step.id}-map`} className="transition-opacity duration-500" style={{ opacity: isActive ? 1 : 0.4 }}>
                      <circle
                        cx={marker.x}
                        cy={marker.y}
                        r={isActive ? 6 : 4}
                        fill="var(--color-brand)"
                        style={{ transition: "all 500ms ease" }}
                      />
                      <circle
                        cx={marker.x}
                        cy={marker.y}
                        r={isActive ? 14 : 0}
                        fill="none"
                        stroke="var(--color-brand)"
                        strokeWidth="1"
                        opacity="0.3"
                        style={{ transition: "all 500ms ease" }}
                      />
                      <text
                        x={marker.labelX}
                        y={marker.labelY}
                        fill="var(--color-text)"
                        style={{ 
                          fontSize: isActive ? "13px" : "11px", 
                          fontFamily: "var(--font-display), serif", 
                          fontStyle: "italic",
                          transition: "all 500ms ease" 
                        }}
                      >
                        {step.stop}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </aside>
        </div>

        <div className="mt-20 border-t border-[color-mix(in_srgb,var(--color-border-strong)_40%,transparent)] pt-8">
          <p className="text-[14px] text-[var(--color-text-muted)] italic">{note}</p>
        </div>
      </div>
    </section>
  );
}
