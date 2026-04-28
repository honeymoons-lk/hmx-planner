"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  const curatedImages = [
    { src: content.backgroundImage, label: "Hill Country Escape" },
    { src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2200&q=80", label: "South Coast Retreat" },
    { src: "https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=2200&q=80", label: "Wilderness Sundown" },
    { src: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=2200&q=80", label: "Secluded Tropical Villa" }
  ];

  const activeImage = curatedImages[0];

  return (
    <section className="relative isolate overflow-hidden min-h-[88svh] lg:min-h-[calc(100svh-var(--header-height))]" data-header-tone="dark">
      <img
        src={activeImage.src}
        alt="Luna Voyages hero background"
        className="absolute inset-0 h-full w-full object-cover object-[54%_center]"
        loading="eager"
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(23,20,18,0.8)_0%,rgba(23,20,18,0.54)_44%,rgba(23,20,18,0.28)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(23,20,18,0.22)_0%,rgba(23,20,18,0.62)_100%)]" />
      <div className="absolute left-[-10%] top-[5%] h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(circle,rgba(204,178,139,0.15)_0%,transparent_60%)] blur-3xl" />

      <div className="page-shell relative z-10 flex min-h-[88svh] items-end py-24 md:py-28 lg:min-h-[calc(100svh-var(--header-height))] lg:items-center lg:py-20">
        <div className="max-w-[48rem] md:pt-12 lg:pt-0">
          <div className="flex items-center gap-3">
            <Sparkles className="h-4 w-4 text-[color-mix(in_srgb,var(--color-accent)_80%,var(--color-light))]" />
            <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[color-mix(in_srgb,var(--color-light)_90%,var(--color-bg-alt))]">
              {content.kicker}
            </span>
            <div className="h-[1px] w-12 bg-[color-mix(in_srgb,var(--color-light)_30%,transparent)]" />
          </div>

          <div className="mt-6 max-w-[40rem] space-y-5 md:mt-9">
            <h1 className="type-hero text-balance-pretty font-serif tracking-tight text-[var(--color-light)]">
              {content.heading}
            </h1>
            <p className="type-body-lg max-w-[46ch] text-[color-mix(in_srgb,var(--color-light)_92%,transparent)] font-normal">
              {content.emotionSentence}
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <Button asChild size="lg" className="px-7">
                <Link href="/plan/journey">Start Planning Your Journey</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-[color-mix(in_srgb,var(--color-light)_44%,transparent)] text-[var(--color-light)] hover:bg-[color-mix(in_srgb,var(--color-light)_10%,transparent)] hover:text-[var(--color-light)]"
              >
                <Link href="/book-a-call">
                  Book a Private Call
                  <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="pt-2">
              <p className="text-[13px] text-[color-mix(in_srgb,var(--color-light)_82%,transparent)]">
                {content.emotionTagline}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
