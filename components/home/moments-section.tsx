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
    <section id={id} className="moments-section section-shell w-full pb-24 md:pb-32 lg:pb-40">
      <div className="page-shell">
        <div className="border-b border-[color-mix(in_srgb,var(--color-border-strong)_40%,transparent)] pb-8 mb-12">
          <SectionHeader
            eyebrow={eyebrow}
            heading={heading}
            supporting={supporting}
            className="mb-0 max-w-2xl"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-16 md:gap-x-10 md:gap-y-20 lg:gap-x-16 lg:gap-y-28">
          {panels.map((panel, index) => (
            <article
              key={`${panel.title}-${index}`}
              tabIndex={0}
              className="group flex flex-col focus:outline-none"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-[var(--color-bg-alt)] mb-6 md:mb-7">
                <img
                  src={proxiedImageUrl(panel.image)}
                  alt={panel.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-[2.5s] ease-[cubic-bezier(0.25,1,0.5,1)] motion-reduce:transition-none group-hover:scale-[1.03] group-focus:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-black/0 transition-colors duration-700 ease-in-out group-hover:bg-black/[0.03] group-focus:bg-black/[0.03]" />
              </div>
              
              <div className="flex flex-col pr-4 md:pr-6">
                <span className="type-eyebrow text-[var(--color-text-muted)] mb-3">
                  {panel.label}
                </span>
                
                <h3 className="type-subheading font-serif text-[var(--color-text)] mb-3 transition-colors duration-500 ease-out group-hover:text-[var(--color-brand)] group-focus:text-[var(--color-brand)]">
                  {panel.title}
                </h3>
                
                <p className="type-body text-[var(--color-text-secondary)] font-light">
                  {panel.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
