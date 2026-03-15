"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";
import { BriefIntakeCard } from "@/components/brief-intake-card";

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
  return (
    <section className="relative isolate overflow-hidden lg:h-[min(calc(100svh-var(--header-height)),820px)] lg:min-h-[700px]">
      <img
        src={content.backgroundImage}
        alt="Luna Voyages hero background"
        className="absolute inset-0 h-full w-full object-cover object-[54%_center]"
        loading="eager"
      />
      {/* Deepened the gradient for a more cinematic, moody feel that makes text pop without needing boxes */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(14,11,10,0.82)_0%,rgba(17,13,12,0.5)_45%,rgba(19,15,14,0.15)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(28,23,21,0.1)_0%,rgba(28,23,21,0.5)_100%)]" />
      <div className="absolute left-[-10%] top-[5%] h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(circle,rgba(204,178,139,0.15)_0%,transparent_60%)] blur-3xl" />

      <div className="page-shell relative z-10 grid grid-cols-1 gap-12 py-24 md:py-28 lg:h-full lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.85fr)] lg:items-center lg:gap-20 lg:py-10 xl:py-12">
        <div className="max-w-[42rem] md:pt-12 lg:self-center lg:pt-0">
          <div className="flex items-center gap-3">
            <Sparkles className="h-4 w-4 text-[color-mix(in_srgb,var(--color-accent)_80%,var(--color-light))]" />
            <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[color-mix(in_srgb,var(--color-light)_90%,var(--color-bg-alt))]">
              {content.kicker}
            </span>
            <div className="h-[1px] w-12 bg-[color-mix(in_srgb,var(--color-light)_30%,transparent)]" />
          </div>

          <div className="mt-6 max-w-[36rem] space-y-4 md:mt-7 md:space-y-5">
            <h1 className="type-hero text-balance-pretty font-serif tracking-tight text-[var(--color-light)]">
              {content.heading}
            </h1>
            <p className="type-body-lg max-w-[34ch] text-[color-mix(in_srgb,var(--color-light)_95%,var(--color-bg-alt))] font-light">
              {content.emotionSentence}
            </p>
            <div className="pt-2">
              <p className="type-ui-sm text-[color-mix(in_srgb,var(--color-accent)_90%,var(--color-light))]">
                {content.emotionTagline}
              </p>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-3 border-t border-[color-mix(in_srgb,var(--color-light)_15%,transparent)] pt-6 md:mt-12">
            <p className="type-eyebrow text-[color-mix(in_srgb,var(--color-light)_60%,var(--color-bg-alt))]">
              {content.secondaryStrip.label}
            </p>
            <div className="flex flex-wrap gap-3">
              {content.secondaryStrip.items.map((item, i) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="type-ui-sm text-[color-mix(in_srgb,var(--color-light)_85%,var(--color-bg-alt))]">
                    {item}
                  </span>
                  {i < content.secondaryStrip.items.length - 1 && (
                    <span className="h-[3px] w-[3px] rounded-full bg-[color-mix(in_srgb,var(--color-light)_30%,transparent)]" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="relative w-full lg:max-w-[400px] lg:justify-self-end lg:self-center">
          <BriefIntakeCard
            id="brief-card"
            mode="starter"
            className="w-full overflow-hidden"
          />
          <p className="type-meta mt-4 text-center text-[color-mix(in_srgb,var(--color-light)_74%,var(--color-bg-alt))] lg:absolute lg:left-1/2 lg:top-full lg:mt-3 lg:w-max lg:-translate-x-1/2">
            Prefer to talk first?{" "}
            <Link
              href="/book-a-call"
              className="text-[color-mix(in_srgb,var(--color-light)_92%,var(--color-bg-alt))] underline underline-offset-4 transition-colors hover:text-white"
            >
              Book a call
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
