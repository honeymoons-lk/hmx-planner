import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeader } from "@/components/section-header";
import { proxiedImageUrl } from "@/lib/media";

type Story = {
  title: string;
  duration: string;
  route: string;
  mood: string;
  stayStyle: string;
  summary: string;
  image: string;
};

type StoriesSectionProps = {
  id: string;
  eyebrow: string;
  heading: string;
  supporting: string;
  caseStudies: readonly Story[];
};

export function StoriesSection({
  id,
  eyebrow,
  heading,
  supporting,
  caseStudies,
}: StoriesSectionProps) {
  return (
    <section id={id} className="section-shell w-full">
      <div className="page-shell">
        <SectionHeader eyebrow={eyebrow} heading={heading} supporting={supporting} className="mb-16 max-w-3xl" />
        <div className="grid gap-12 md:grid-cols-2 xl:grid-cols-3 xl:gap-16">
          {caseStudies.map((story, index) => (
            <article key={story.title} className="group flex flex-col">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[4px] mb-8">
                <img
                  src={proxiedImageUrl(story.image)}
                  alt={story.title}
                  loading="lazy"
                  className="h-full w-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
                />
                <div className="absolute left-4 top-4 flex gap-2">
                  <span className="bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] font-semibold tracking-[0.2em] uppercase text-[var(--color-text)]">
                    Sample {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
              </div>
              
              <div className="flex flex-col flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[var(--color-text-muted)]">
                    {story.duration}
                  </span>
                  <span className="h-[1px] w-6 bg-[var(--color-border-strong)]" />
                  <span className="text-[12px] italic text-[var(--color-text-secondary)]">
                    {story.route}
                  </span>
                </div>

                <h3 className="font-serif text-[clamp(28px,3vw,34px)] leading-[1.1] text-[var(--color-text)] mb-4">
                  {story.title}
                </h3>
                
                <p className="text-[15px] leading-[1.7] text-[var(--color-text-secondary)] font-light mb-8">
                  {story.summary}
                </p>

                <div className="mt-auto border-t border-[var(--color-border-strong)] pt-6">
                  <div className="grid gap-4">
                    <div className="flex items-baseline gap-4">
                      <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[var(--color-text-muted)] w-24 shrink-0">
                        Mood
                      </p>
                      <p className="text-[14px] text-[var(--color-text)]">{story.mood}</p>
                    </div>
                    <div className="flex items-baseline gap-4">
                      <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[var(--color-text-muted)] w-24 shrink-0">
                        Stays
                      </p>
                      <p className="text-[14px] text-[var(--color-text)]">{story.stayStyle}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <Link 
                    href="/plan/journey"
                    className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-[0.15em] uppercase text-[var(--color-brand)] hover:text-[var(--color-brand-hover)] transition-colors group/link"
                  >
                    Plan a journey like this
                    <span className="transition-transform duration-300 group-hover/link:translate-x-1">→</span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
