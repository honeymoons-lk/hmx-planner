import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/section-header";
import { proxiedImageUrl } from "@/lib/media";

type MomentPanel = { title: string; label: string; body: string; image: string };

type MomentsSectionProps = {
  id: string;
  eyebrow: string;
  heading: string;
  supporting: string;
  panels: readonly MomentPanel[];
};

export function MomentsSection({ id, eyebrow, heading, supporting, panels }: MomentsSectionProps) {
  return (
    <section id={id} className="moments-section section-shell w-full bg-[#171412]" data-header-tone="dark">
      <div className="page-shell">
        <div className="mb-12 border-b border-[color-mix(in_srgb,var(--color-light)_14%,transparent)] pb-8">
          <SectionHeader
            eyebrow={eyebrow}
            heading={heading}
            supporting={supporting}
            className="mb-0 max-w-2xl [&_p]:text-[color-mix(in_srgb,var(--color-light)_72%,transparent)] [&_h2]:text-[var(--color-light)]"
          />
        </div>

        <div className="grid grid-cols-1 gap-9 md:grid-cols-2 lg:grid-cols-3">
          {panels.map((panel, index) => (
            <article
              key={`${panel.title}-${index}`}
              tabIndex={0}
              className="group flex flex-col focus:outline-none"
            >
              <div className="relative mb-5 aspect-[4/5] overflow-hidden rounded-[4px] bg-[#211c19]">
                <img
                  src={proxiedImageUrl(panel.image)}
                  alt={panel.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-1000 ease-out motion-reduce:transition-none group-hover:scale-[1.03] group-focus:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-[rgba(23,20,18,0.35)] transition-colors duration-500 group-hover:bg-[rgba(23,20,18,0.18)] group-focus:bg-[rgba(23,20,18,0.18)]" />
              </div>

              <span className="type-eyebrow mb-2 text-[color-mix(in_srgb,var(--color-light)_64%,transparent)]">
                {panel.label}
              </span>
              <h3 className="mb-2 text-[2rem] font-serif leading-[1.02] tracking-tight text-[var(--color-light)] transition-colors duration-300 group-hover:text-[#c8a96a]">
                {panel.title}
              </h3>
              <p className="type-body font-light text-[color-mix(in_srgb,var(--color-light)_78%,transparent)]">
                {panel.body}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-14">
          <Link href="#journey-directions" className="inline-flex items-center gap-2 text-sm text-[color-mix(in_srgb,var(--color-light)_78%,transparent)] transition-colors hover:text-[#c8a96a]">
            Explore Experiences
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
