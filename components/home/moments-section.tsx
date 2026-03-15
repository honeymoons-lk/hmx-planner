"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/section-header";
import { proxiedImageUrl } from "@/lib/media";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

type MomentPanel = { title: string; label: string; body: string; image: string };

type MomentsSectionProps = {
  id: string;
  eyebrow: string;
  heading: string;
  supporting: string;
  panels: readonly MomentPanel[];
};

export function MomentsSection({ id, eyebrow, heading, supporting, panels }: MomentsSectionProps) {
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const activePhysicalIndexRef = useRef(0);
  const logicalCount = panels.length;
  const loopedPanels = useMemo(() => [...panels, ...panels, ...panels], [panels]);

  useEffect(() => {
    if (!carouselApi) return;
    const viewport = carouselApi.getViewport();
    if (!viewport || logicalCount === 0) return;

    const updateActiveSlide = () => {
      const slides = Array.from(viewport.children) as HTMLElement[];
      if (!slides.length) return;
      const currentLeft = viewport.scrollLeft;

      let bestIndex = 0;
      let bestDistance = Number.POSITIVE_INFINITY;
      for (let index = 0; index < slides.length; index += 1) {
        const distance = Math.abs(slides[index].offsetLeft - currentLeft);
        if (distance < bestDistance) {
          bestDistance = distance;
          bestIndex = index;
        }
      }

      // Keep the viewport in the middle segment for seamless infinite loop illusion.
      if (bestIndex < logicalCount) {
        const target = slides[bestIndex + logicalCount];
        if (target) {
          viewport.scrollTo({ left: target.offsetLeft, behavior: "auto" });
          bestIndex = bestIndex + logicalCount;
        }
      } else if (bestIndex >= logicalCount * 2) {
        const target = slides[bestIndex - logicalCount];
        if (target) {
          viewport.scrollTo({ left: target.offsetLeft, behavior: "auto" });
          bestIndex = bestIndex - logicalCount;
        }
      }

      activePhysicalIndexRef.current = bestIndex;
      setActiveSlide(bestIndex % logicalCount);
    };

    // Start on the middle segment so users can scroll in both directions.
    const initial = viewport.children.item(logicalCount) as HTMLElement | null;
    if (initial) {
      viewport.scrollTo({ left: initial.offsetLeft, behavior: "auto" });
      activePhysicalIndexRef.current = logicalCount;
      setActiveSlide(0);
    }

    updateActiveSlide();
    viewport.addEventListener("scroll", updateActiveSlide, { passive: true });
    return () => viewport.removeEventListener("scroll", updateActiveSlide);
  }, [carouselApi, logicalCount]);

  useEffect(() => {
    if (!carouselApi) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setInterval(() => {
      carouselApi.scrollNext();
    }, 5200);

    return () => window.clearInterval(timer);
  }, [carouselApi]);

  return (
    <section id={id} className="moments-section section-shell w-full pb-24 md:pb-32 lg:pb-40">
      <div className="page-shell">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between border-b border-[color-mix(in_srgb,var(--color-border-strong)_40%,transparent)] pb-8 mb-12">
          <SectionHeader
            eyebrow={eyebrow}
            heading={heading}
            supporting={supporting}
            className="mb-0 max-w-2xl"
          />
          <div className="flex items-center justify-between gap-6 md:justify-end">
            <p className="type-ui-sm text-[var(--color-text-muted)] font-serif italic">
              {String(activeSlide + 1).padStart(2, "0")} <span className="mx-1 text-[var(--color-border-strong)]">/</span> {String(logicalCount).padStart(2, "0")}
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-text-secondary)] transition-all duration-300 hover:border-[var(--color-brand)] hover:text-[var(--color-brand)] hover:bg-[color-mix(in_srgb,var(--color-brand)_5%,transparent)] focus-visible:outline-none"
                onClick={() => carouselApi?.scrollPrev()}
                aria-label="Previous moment"
              >
                <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
              </button>
              <button
                type="button"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-text-secondary)] transition-all duration-300 hover:border-[var(--color-brand)] hover:text-[var(--color-brand)] hover:bg-[color-mix(in_srgb,var(--color-brand)_5%,transparent)] focus-visible:outline-none"
                onClick={() => carouselApi?.scrollNext()}
                aria-label="Next moment"
              >
                <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>

        <div>
          <Carousel setApi={setCarouselApi} className="w-full">
            <CarouselContent className="gap-6 pb-4">
              {loopedPanels.map((panel, index) => (
                <CarouselItem
                  key={`${panel.title}-${index}`}
                  className="basis-[90%] md:basis-[48%] lg:basis-[33.333%]"
                >
                <article className="group relative aspect-[3/4] overflow-hidden rounded-[2px] bg-[var(--color-bg-alt)]">
                  <img
                    src={proxiedImageUrl(panel.image)}
                    alt={panel.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-[1.5s] ease-out motion-reduce:transition-none group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(14,11,10,0.85)_0%,rgba(14,11,10,0.2)_50%,transparent_100%)] transition-opacity duration-700 group-hover:opacity-95" />
                  
                  <div className="absolute left-6 top-6 z-10 md:left-8 md:top-8">
                    <span className="type-eyebrow tracking-widest text-[color-mix(in_srgb,var(--color-light)_90%,var(--color-bg-alt))]">
                      {panel.label}
                    </span>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 z-10 p-6 md:p-8">
                    <h3 className="text-[1.5rem] md:text-[1.75rem] leading-[1.2] font-serif text-[var(--color-light)] mb-2">
                      {panel.title}
                    </h3>
                    <div className="grid grid-rows-[0fr] transition-all duration-500 ease-in-out group-hover:grid-rows-[1fr]">
                      <div className="overflow-hidden">
                        <p className="type-body mt-4 max-w-[90%] text-[color-mix(in_srgb,var(--color-light)_85%,var(--color-bg-alt))] font-light opacity-0 transition-opacity duration-500 delay-150 group-hover:opacity-100 leading-relaxed">
                          {panel.body}
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="mt-12 flex items-center justify-center gap-3">
            {panels.map((panel, index) => (
              <button
                key={`${panel.title}-dot`}
                type="button"
                aria-label={`Go to ${panel.label}`}
                onClick={() => {
                  if (!carouselApi || logicalCount === 0) return;
                  const current = activePhysicalIndexRef.current || logicalCount;
                  const segmentStart = Math.floor(current / logicalCount) * logicalCount;
                  const candidates = [segmentStart + index, segmentStart - logicalCount + index, segmentStart + logicalCount + index];
                  const nearest = candidates.reduce((best, candidate) =>
                    Math.abs(candidate - current) < Math.abs(best - current) ? candidate : best,
                  );
                  carouselApi.scrollTo(nearest);
                }}
                className={`h-[2px] transition-all duration-300 focus-visible:outline-none focus-visible:ring-[4px] focus-visible:ring-ring/14 ${
                  activeSlide === index
                    ? "w-12 bg-[var(--color-brand)]"
                    : "w-6 bg-[color-mix(in_srgb,var(--color-border-strong)_60%,transparent)] hover:bg-[var(--color-border-strong)]"
                }`}
              />
            ))}
          </div>
        </Carousel>
      </div>
      </div>
    </section>
  );
}
