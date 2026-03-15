import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
                  <Badge variant="glass">
                    Sample {String(index + 1).padStart(2, "0")}
                  </Badge>
                </div>
              </div>
              
              <div className="flex flex-col flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className="type-eyebrow text-[var(--color-text-muted)]">
                    {story.duration}
                  </span>
                  <span className="h-[1px] w-6 bg-[var(--color-border-strong)]" />
                  <span className="type-meta italic text-[var(--color-text-secondary)]">
                    {story.route}
                  </span>
                </div>

                <h3 className="type-subheading font-serif text-[var(--color-text)] mb-3">
                  {story.title}
                </h3>
                
                <p className="type-body text-[var(--color-text-secondary)] font-light mb-7">
                  {story.summary}
                </p>

                <div className="mt-auto border-t border-[var(--color-border-strong)] pt-6">
                  <div className="grid gap-4">
                    <div className="flex items-baseline gap-4">
                      <p className="type-eyebrow text-[var(--color-text-muted)] w-24 shrink-0">
                        Mood
                      </p>
                      <p className="type-ui-sm text-[var(--color-text)]">{story.mood}</p>
                    </div>
                    <div className="flex items-baseline gap-4">
                      <p className="type-eyebrow text-[var(--color-text-muted)] w-24 shrink-0">
                        Stays
                      </p>
                      <p className="type-ui-sm text-[var(--color-text)]">{story.stayStyle}</p>
                    </div>
                  </div>
                </div>

                <Button asChild variant="outline" className="w-full sm:w-auto mt-6">
                  <Link href="/plan/journey">Plan a journey like this</Link>
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
