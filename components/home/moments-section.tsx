"use client";

import { useEffect, useState } from "react";
import { SectionHeader } from "@/components/section-header";
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

  useEffect(() => {
    if (!carouselApi) return;
    const viewport = carouselApi.getViewport();
    if (!viewport) return;

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
      setActiveSlide(bestIndex);
    };

    updateActiveSlide();
    viewport.addEventListener("scroll", updateActiveSlide, { passive: true });
    return () => viewport.removeEventListener("scroll", updateActiveSlide);
  }, [carouselApi]);

  useEffect(() => {
    if (!carouselApi) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setInterval(() => {
      const viewport = carouselApi.getViewport();
      if (!viewport) return;
      const atEnd = viewport.scrollLeft + viewport.clientWidth >= viewport.scrollWidth - 8;
      if (atEnd) {
        carouselApi.scrollTo(0);
      } else {
        carouselApi.scrollNext();
      }
    }, 5200);

    return () => window.clearInterval(timer);
  }, [carouselApi]);

  return (
    <section id={id} className="moments-section w-full py-[var(--section-space-mobile)] md:py-[var(--section-space-desktop)]">
      <div className="mx-auto w-full max-w-[1200px] px-4 md:px-6">
        <SectionHeader eyebrow={eyebrow} heading={heading} supporting={supporting} className="max-w-3xl md:mb-14" />
      </div>

      <div className="relative left-1/2 w-screen -translate-x-1/2">
        <Carousel setApi={setCarouselApi} className="w-full">
          <CarouselContent className="gap-4 px-4 md:gap-6 md:px-6 lg:px-10">
            {panels.map((panel) => (
              <CarouselItem
                key={panel.title}
                className="basis-[88%] md:basis-[70%] lg:basis-[56%] xl:basis-[50%]"
              >
                <article className="relative h-[52vh] min-h-[360px] overflow-hidden rounded-[var(--radius-card)] border border-[color-mix(in_srgb,var(--color-border)_62%,transparent)] bg-[var(--color-bg-alt)] md:h-[58vh] lg:min-h-[520px] lg:max-h-[760px]">
                  <img
                    src={panel.image}
                    alt={panel.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 ease-out motion-reduce:transition-none lg:hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.72)_0%,rgba(0,0,0,0.46)_42%,rgba(0,0,0,0.18)_72%,rgba(0,0,0,0.04)_100%)]" />
                  <div className="absolute bottom-8 left-6 right-6 z-10 md:bottom-10 md:left-9 md:right-9">
                    <p className="type-eyebrow text-[color-mix(in_srgb,var(--color-light)_84%,var(--color-bg-alt))]">
                      {panel.label}
                    </p>
                    <h3 className="mt-2 font-serif text-[clamp(30px,4vw,46px)] leading-[1.08] font-medium tracking-tight text-[var(--color-light)]">
                      {panel.title}
                    </h3>
                    <p className="type-body mt-3 max-w-[44ch] text-[color-mix(in_srgb,var(--color-light)_90%,var(--color-bg-alt))]">
                      {panel.body}
                    </p>
                  </div>
                </article>
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="mt-6 flex items-center justify-center gap-2">
            {panels.map((panel, index) => (
              <button
                key={`${panel.title}-dot`}
                type="button"
                aria-label={`Go to ${panel.label}`}
                onClick={() => carouselApi?.scrollTo(index)}
                className={`h-1.5 rounded-full transition-all ${
                  activeSlide === index
                    ? "w-6 bg-[var(--color-brand)]"
                    : "w-2 bg-[color-mix(in_srgb,var(--color-border-strong)_86%,transparent)]"
                }`}
              />
            ))}
          </div>
        </Carousel>
      </div>
    </section>
  );
}
