import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/section-header";
import { proxiedImageUrl } from "@/lib/media";

type Story = {
  title: string;
  framingLine: string;
  idealFor: string;
  route: string;
  whyWeShapeIt: string;
  image: string;
};

type StoriesSectionProps = {
  id: string;
  eyebrow: string;
  heading: string;
  supporting: string;
  cta?: {
    label: string;
    href: string;
  };
  caseStudies: readonly Story[];
};

export function StoriesSection({
  id,
  eyebrow,
  heading,
  supporting,
  cta,
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
                    Direction {String(index + 1).padStart(2, "0")}
                  </Badge>
                </div>
              </div>
              
              <div className="flex flex-col flex-1">
                <h3 className="type-subheading font-serif text-[var(--color-text)] mb-2">
                  {story.title}
                </h3>
                
                <p className="type-body text-[var(--color-text-secondary)] italic mb-6">
                  {story.framingLine}
                </p>

                <div className="flex flex-col gap-4 mb-8">
                  <div>
                    <p className="type-eyebrow text-[var(--color-text-muted)] mb-1">
                      The Route
                    </p>
                    <p className="type-ui-sm text-[var(--color-text)]">
                      {story.route}
                    </p>
                  </div>
                  
                  <div>
                    <p className="type-eyebrow text-[var(--color-text-muted)] mb-1">
                      Ideal For
                    </p>
                    <p className="type-ui-sm text-[var(--color-text)]">
                      {story.idealFor}
                    </p>
                  </div>
                </div>

                <div className="mt-auto border-t border-[var(--color-border-strong)] pt-6">
                  <p className="type-eyebrow text-[var(--color-text-muted)] mb-3">
                    Why we shape it this way
                  </p>
                  <p className="type-body text-[var(--color-text-secondary)] font-light">
                    {story.whyWeShapeIt}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {cta && (
          <div className="mt-16 flex justify-center">
            <Button asChild size="lg" className="px-8">
              <Link href={cta.href}>{cta.label}</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
