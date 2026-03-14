"use client";

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
  const featuredTestimonial = content.testimonials[0];

  return (
    <section className="relative isolate overflow-hidden">
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

      <div className="page-shell section-shell relative z-10 grid grid-cols-1 items-start gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(400px,0.85fr)] lg:gap-16 lg:pt-[calc(var(--section-space-desktop)+40px)]">
        <div className="max-w-[42rem] md:pt-12">
          {/* Replaced UI Badge with an elegant editorial eyebrow */}
          <div className="flex items-center gap-3">
            <Sparkles className="h-4 w-4 text-[color-mix(in_srgb,var(--color-accent)_80%,var(--color-light))]" />
            <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[color-mix(in_srgb,var(--color-light)_90%,var(--color-bg-alt))]">
              {content.kicker}
            </span>
            <div className="h-[1px] w-12 bg-[color-mix(in_srgb,var(--color-light)_30%,transparent)]" />
          </div>

          <div className="mt-8 space-y-6">
            <h1 className="font-serif text-[clamp(48px,6.5vw,84px)] leading-[1.02] tracking-tight text-[var(--color-light)]">
              {content.heading}
            </h1>
            <p className="text-[22px] leading-[1.5] max-w-[34ch] text-[color-mix(in_srgb,var(--color-light)_95%,var(--color-bg-alt))] font-light">
              {content.emotionSentence}
            </p>
            <p className="text-[13px] font-medium tracking-[0.15em] uppercase text-[color-mix(in_srgb,var(--color-accent)_90%,var(--color-light))]">
              {content.emotionTagline}
            </p>
          </div>

          {/* Replaced the heavy carousel box with a refined, floating typographic quote */}
          <div className="mt-16 max-w-[32rem] border-l border-[color-mix(in_srgb,var(--color-light)_20%,transparent)] pl-6">
            <p className="font-serif text-[22px] leading-[1.4] text-[color-mix(in_srgb,var(--color-light)_85%,var(--color-bg-alt))] italic">
              &ldquo;{featuredTestimonial?.quote}&rdquo;
            </p>
            <p className="mt-4 text-[12px] font-medium tracking-[0.1em] uppercase text-[color-mix(in_srgb,var(--color-light)_50%,var(--color-bg-alt))]">
              — {featuredTestimonial?.name}, {featuredTestimonial?.origin}
            </p>
          </div>

          {/* Replaced the secondary strip box with a clean typographic list */}
          <div className="mt-16 flex flex-wrap items-center gap-x-6 gap-y-3">
            <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-[color-mix(in_srgb,var(--color-light)_50%,var(--color-bg-alt))]">
              {content.secondaryStrip.label}
            </p>
            <div className="flex flex-wrap gap-4">
              {content.secondaryStrip.items.map((item, i) => (
                <div key={item} className="flex items-center gap-4">
                  <span className="text-[13px] text-[color-mix(in_srgb,var(--color-light)_80%,var(--color-bg-alt))]">
                    {item}
                  </span>
                  {i < content.secondaryStrip.items.length - 1 && (
                    <span className="h-1 w-1 rounded-full bg-[color-mix(in_srgb,var(--color-light)_20%,transparent)]" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <BriefIntakeCard
          id="brief-card"
          className="overflow-hidden lg:sticky lg:top-[calc(var(--header-height)+32px)] lg:justify-self-end w-full"
        />
      </div>
    </section>
  );
}
