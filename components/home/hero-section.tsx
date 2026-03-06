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
    <section className="mx-auto grid w-full max-w-6xl grid-cols-1 items-start gap-10 px-4 py-[var(--section-space-mobile)] md:grid-cols-12 md:gap-10 md:px-6 md:py-[var(--section-space-desktop)]">
      <div className="space-y-6 md:col-span-5 md:max-w-xl md:pt-4">
        <Badge variant="secondary" className="bg-[var(--color-bg-alt)] text-[var(--color-text-secondary)]">
          <Sparkles className="mr-1 h-3.5 w-3.5" />
          {content.kicker}
        </Badge>

        <h1 className="type-hero font-serif font-medium tracking-tight">
          {content.heading}
        </h1>
        <p className="type-body-lg text-muted-foreground">{content.emotionSentence}</p>
        <p className="type-body text-[var(--color-text-secondary)]">{content.emotionTagline}</p>

        <div className="mt-8 max-w-[520px]">
          <Carousel setApi={setTestimonialApi} className="rounded-[var(--radius-card)] border border-border bg-card p-6 shadow-[var(--shadow-soft)]">
            <CarouselContent className="-ml-0 gap-0">
              {content.testimonials.map((item) => (
                <CarouselItem key={`${item.name}-${item.origin}`} className="pl-0">
                  <div className="space-y-3">
                    <Quote className="h-4 w-4 text-primary/70" aria-hidden="true" />
                    <p className="type-body text-foreground/90">{item.quote}</p>
                    <p className="type-ui-sm text-foreground/75">{`— ${item.name}, ${item.origin}`}</p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        <div className="mt-14">
          <p className="type-body">
            <span className="font-medium text-foreground">{content.secondaryStrip.label}</span>
          </p>
          <p className="type-meta mt-1 text-muted-foreground">
            {content.secondaryStrip.items[0]} · {content.secondaryStrip.items[1]} ·{" "}
            {content.secondaryStrip.items[2]}
          </p>
        </div>
      </div>

      <BriefIntakeCard
        id="brief-card"
        className="overflow-hidden border-border bg-card shadow-[var(--shadow-soft)] md:col-span-7 md:sticky md:top-24 md:max-w-[620px] md:justify-self-end"
      />
    </section>
  );
}
