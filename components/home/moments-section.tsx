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

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-8 md:gap-x-8 md:gap-y-16 lg:gap-x-12 lg:gap-y-20">
          {panels.map((panel, index) => (
            <article
              key={`${panel.title}-${index}`}
              tabIndex={0}
              className="group relative aspect-[4/5] overflow-hidden rounded-[2px] bg-[var(--color-bg-alt)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] focus-visible:ring-offset-4"
            >
              <img
                src={proxiedImageUrl(panel.image)}
                alt={panel.title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-[2s] ease-[cubic-bezier(0.25,1,0.5,1)] motion-reduce:transition-none group-hover:scale-[1.02] group-focus:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(14,11,10,0.7)_0%,rgba(14,11,10,0.15)_40%,transparent_100%)] transition-opacity duration-700 ease-in-out group-hover:opacity-90 group-focus:opacity-90" />
              
              <div className="absolute left-6 top-6 z-10 md:left-8 md:top-8">
                <span className="type-eyebrow text-xs tracking-[0.2em] text-[color-mix(in_srgb,var(--color-light)_90%,var(--color-bg-alt))] drop-shadow-sm">
                  {panel.label}
                </span>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 z-10 p-6 md:p-8">
                <h3 className="text-xl md:text-2xl lg:text-[1.75rem] leading-[1.15] font-serif text-[var(--color-light)] mb-1 drop-shadow-sm transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-1 group-focus:-translate-y-1">
                  {panel.title}
                </h3>
                <div className="grid grid-rows-[0fr] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:grid-rows-[1fr] group-focus:grid-rows-[1fr]">
                  <div className="overflow-hidden">
                    <p className="type-body mt-3 text-sm lg:text-base text-[color-mix(in_srgb,var(--color-light)_85%,transparent)] font-light opacity-0 transition-opacity duration-700 delay-100 group-hover:opacity-100 group-focus:opacity-100 leading-relaxed">
                      {panel.body}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
