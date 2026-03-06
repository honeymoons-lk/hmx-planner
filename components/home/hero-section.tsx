"use client";

import { useEffect, useState } from "react";
import { Quote, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { BriefIntakeCard } from "@/components/brief-intake-card";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";

type HeroSectionProps = {
  content: {
    kicker: string;
    heading: string;
    backgroundImage: string;
    emotionSentence: string;
    emotionTagline: string;
    testimonials: readonly { quote: string; name: string; origin: string }[];
    secondaryStrip: { label: string; items: readonly string[] };
  };
};

export function HeroSection({ content }: HeroSectionProps) {
  const [testimonialApi, setTestimonialApi] = useState<CarouselApi | null>(null);

  useEffect(() => {
    if (!testimonialApi) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const intervalId = window.setInterval(() => testimonialApi.scrollNext(), 6000);
    return () => window.clearInterval(intervalId);
  }, [testimonialApi]);

  return (
    <section className="relative isolate overflow-hidden">
      <img
        src={content.backgroundImage}
        alt="Luna Voyages hero background"
        className="absolute inset-0 h-full w-full object-cover"
        loading="eager"
      />
      <div className="absolute inset-0 bg-[linear-gradient(106deg,rgba(15,12,11,0.62)_0%,rgba(15,12,11,0.42)_42%,rgba(15,12,11,0.18)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(28,23,21,0.18)_0%,rgba(28,23,21,0.34)_100%)]" />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-start gap-10 px-4 py-[var(--section-space-mobile)] md:grid-cols-12 md:gap-10 md:px-6 md:py-[var(--section-space-desktop)]">
        <div className="space-y-6 md:col-span-5 md:max-w-xl md:pt-4">
          <Badge
            variant="secondary"
            className="bg-[color-mix(in_srgb,var(--color-light)_18%,transparent)] text-[color-mix(in_srgb,var(--color-light)_93%,var(--color-bg-alt))] backdrop-blur-sm"
          >
            <Sparkles className="mr-1 h-3.5 w-3.5" />
            {content.kicker}
          </Badge>

          <h1 className="type-hero font-serif font-medium tracking-tight text-[var(--color-light)]">
            {content.heading}
          </h1>
          <p className="type-body-lg text-[color-mix(in_srgb,var(--color-light)_90%,var(--color-bg-alt))]">
            {content.emotionSentence}
          </p>
          <p className="type-body text-[color-mix(in_srgb,var(--color-light)_82%,var(--color-bg-alt))]">
            {content.emotionTagline}
          </p>

          <div className="mt-8 max-w-[520px]">
            <Carousel
              setApi={setTestimonialApi}
              className="rounded-[var(--radius-card)] border border-[color-mix(in_srgb,var(--color-light)_16%,transparent)] bg-[color-mix(in_srgb,var(--color-dark)_35%,transparent)] p-6 backdrop-blur-sm"
            >
              <CarouselContent className="-ml-0 gap-0">
                {content.testimonials.map((item) => (
                  <CarouselItem key={`${item.name}-${item.origin}`} className="pl-0">
                    <div className="space-y-3">
                      <Quote className="h-4 w-4 text-[color-mix(in_srgb,var(--color-accent)_72%,var(--color-light))]" aria-hidden="true" />
                      <p className="type-body text-[color-mix(in_srgb,var(--color-light)_93%,var(--color-bg-alt))]">{item.quote}</p>
                      <p className="type-ui-sm text-[color-mix(in_srgb,var(--color-light)_80%,var(--color-bg-alt))]">{`— ${item.name}, ${item.origin}`}</p>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>

          <div className="mt-14 rounded-[var(--radius-input)] border border-[color-mix(in_srgb,var(--color-light)_14%,transparent)] bg-[color-mix(in_srgb,var(--color-dark)_28%,transparent)] p-4 backdrop-blur-sm">
            <p className="type-body">
              <span className="font-medium text-[color-mix(in_srgb,var(--color-light)_92%,var(--color-bg-alt))]">
                {content.secondaryStrip.label}
              </span>
            </p>
            <p className="type-meta mt-1 text-[color-mix(in_srgb,var(--color-light)_76%,var(--color-bg-alt))]">
              {content.secondaryStrip.items[0]} · {content.secondaryStrip.items[1]} ·{" "}
              {content.secondaryStrip.items[2]}
            </p>
          </div>
        </div>
        <BriefIntakeCard
          id="brief-card"
          className="overflow-hidden border-border bg-card shadow-[var(--shadow-soft)] md:col-span-7 md:sticky md:top-24 md:max-w-[620px] md:justify-self-end"
        />
      </div>
    </section>
  );
}
