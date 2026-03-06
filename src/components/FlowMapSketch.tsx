"use client";

import { useMemo, useState } from "react";
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
  stayRegion: string;
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
    stayRegion: "Colombo",
    stayName: "Uga Residence",
    stayNote: "A quiet city retreat for your first nights.",
  },
  cultural: {
    days: "Days 3-5",
    title: "Slow luxury in the Cultural Triangle",
    body:
      "Move north for Sigiriya and the ancient cities with early starts and long relaxed afternoons. Private guiding and deliberate pacing keep the experience immersive, not rushed.",
    image:
      "https://images.unsplash.com/photo-1588598198321-9735b3f9d55b?auto=format&fit=crop&w=2200&q=80",
    stayRegion: "Cultural Triangle",
    stayName: "Water Garden Sigiriya",
    stayNote: "Villa-style stays with direct rock fortress views.",
  },
  tea: {
    days: "Days 6-7",
    title: "Tea Country and highland mornings",
    body:
      "Take the scenic rail route into the hills and settle into estate life. Cool air, misty views, and unhurried mornings create a strong emotional midpoint in the itinerary.",
    image:
      "https://images.unsplash.com/photo-1544737151-6e4b4f8d6b5b?auto=format&fit=crop&w=2200&q=80",
    stayRegion: "Tea Country",
    stayName: "Ceylon Tea Trails",
    stayNote: "Historic bungalows with deeply personal service.",
  },
  south: {
    days: "Days 8-12",
    title: "Beach time on the South Coast",
    body:
      "Finish where it feels effortless: ocean-facing villas, slow lunches, and candlelit evenings. This final stretch is designed for downtime, connection, and a graceful end to the journey.",
    image:
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=2200&q=80",
    stayRegion: "South Coast",
    stayName: "Amanwella",
    stayNote: "Minimal beachfront suites with complete privacy.",
  },
};

const markerPositions: Record<string, { left: string; top: string }> = {
  colombo: { left: "48%", top: "22%" },
  cultural: { left: "58%", top: "30%" },
  tea: { left: "55%", top: "47%" },
  south: { left: "50%", top: "68%" },
};

export function FlowMapSketch({ id, eyebrow, heading, subcopy, steps, note }: FlowMapSketchProps) {
  const [activeStopId, setActiveStopId] = useState<string>(steps[0]?.id ?? "");
  const activeStep = useMemo(
    () => steps.find((step) => step.id === activeStopId) ?? steps[0],
    [activeStopId, steps],
  );

  const detail = itineraryDetails[activeStep?.id] ?? {
    days: "Day by day",
    title: activeStep?.stop ?? "Journey highlight",
    body: activeStep?.caption ?? "",
    image: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=2200&q=80",
    stayRegion: "Sri Lanka",
    stayName: "Curated stay",
    stayNote: "Selected to match your pace and style.",
  };

  return (
    <section id={id} className="mx-auto w-full max-w-6xl px-4 py-[var(--section-space-mobile)] md:px-6 md:py-[var(--section-space-desktop)]">
      <SectionHeader eyebrow={eyebrow} heading={heading} supporting={subcopy} className="max-w-3xl" />

      <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,0.92fr)] lg:gap-10">
        <div className="relative pl-7 lg:pl-10">
          <span className="absolute bottom-0 left-2 top-2 w-px border-l border-dashed border-[color-mix(in_srgb,var(--color-border-strong)_92%,transparent)]" />

          <article className="relative mb-8 rounded-[var(--radius-card)] border border-[color-mix(in_srgb,var(--color-border)_78%,transparent)] bg-[var(--color-surface)] p-5 md:p-6">
            <span className="absolute -left-[26px] top-8 h-2.5 w-2.5 rounded-full bg-[var(--color-brand)]" />
            <p className="type-eyebrow text-[var(--color-text-muted)]">{detail.days}</p>
            <h3 className="mt-3 font-serif text-[clamp(30px,3.5vw,44px)] leading-[1.12] tracking-tight text-[var(--color-text)]">
              {detail.title}
            </h3>
            <p className="type-body mt-4 max-w-[62ch] text-[var(--color-text-secondary)]">{detail.body}</p>

            <img
              src={proxiedImageUrl(detail.image)}
              alt={detail.title}
              loading="lazy"
              className="mt-6 h-[380px] w-full rounded-[var(--radius-card)] object-cover object-center md:h-[460px]"
            />

            <div className="mt-6">
              <h4 className="font-serif text-[34px] leading-[1.1] text-[var(--color-text)]">Where you could stay</h4>
              <div className="mt-4 grid overflow-hidden rounded-[var(--radius-card)] border border-[color-mix(in_srgb,var(--color-border)_78%,transparent)] bg-[var(--color-surface)] md:grid-cols-[220px_1fr]">
                <img
                  src={proxiedImageUrl(detail.image)}
                  alt={`${detail.stayName} preview`}
                  loading="lazy"
                  className="h-[210px] w-full object-cover object-center md:h-full"
                />
                <div className="space-y-2 p-5">
                  <p className="type-eyebrow text-[var(--color-text-muted)]">{detail.stayRegion}</p>
                  <p className="font-serif text-[34px] leading-[1.1] text-[var(--color-text)]">{detail.stayName}</p>
                  <p className="type-body text-[var(--color-text-secondary)]">{detail.stayNote}</p>
                </div>
              </div>
            </div>
          </article>

          <div className="space-y-2">
            {steps.map((step) => {
              const isActive = step.id === activeStopId;
              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => setActiveStopId(step.id)}
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
                    <p className="type-ui-sm text-[var(--color-text)]">{step.stop}</p>
                    <p className="type-meta text-[var(--color-text-muted)]">{step.nights}</p>
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
                src="/api/map/flow-static"
                alt="Sri Lanka itinerary route map"
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(248,243,238,0.08)_0%,rgba(248,243,238,0.16)_100%)]" />

              {steps.map((step) => {
                const marker = markerPositions[step.id] ?? { left: "50%", top: "50%" };
                const isActive = step.id === activeStopId;
                return (
                  <button
                    key={`${step.id}-map`}
                    type="button"
                    aria-label={`Focus ${step.stop}`}
                    onClick={() => setActiveStopId(step.id)}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{ left: marker.left, top: marker.top }}
                  >
                    <span
                      className={`block rounded-full border border-[var(--color-light)] transition-all ${
                        isActive
                          ? "h-4 w-4 bg-[var(--color-brand)] shadow-[0_0_0_5px_rgba(110,44,58,0.22)]"
                          : "h-3 w-3 bg-[var(--color-text)]/70"
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            <div className="space-y-3 border-t border-[color-mix(in_srgb,var(--color-border)_82%,transparent)] p-5">
              {steps.map((step) => (
                <button
                  key={`${step.id}-legend`}
                  type="button"
                  onClick={() => setActiveStopId(step.id)}
                  className={`flex w-full items-center gap-2 rounded-[var(--radius-input)] px-2 py-2 text-left transition-colors ${
                    step.id === activeStopId
                      ? "bg-[color-mix(in_srgb,var(--color-bg)_90%,var(--color-bg-alt))]"
                      : "hover:bg-[color-mix(in_srgb,var(--color-bg)_88%,var(--color-bg-alt))]"
                  }`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-brand)]" />
                  <span className="type-ui-sm text-[var(--color-text-secondary)]">
                    {step.stop} <span className="text-[var(--color-text-muted)]">· {step.nights}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </aside>
      </div>

      <p className="type-body mt-7 text-muted-foreground">{note}</p>
    </section>
  );
}
