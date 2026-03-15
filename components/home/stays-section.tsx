import { SectionHeader } from "@/components/section-header";
import { proxiedImageUrl } from "@/lib/media";

type StayProperty = {
  name: string;
  location: string;
  image: string;
  alt: string;
};

type StayCategory = {
  id: string;
  title: string;
  description: string;
  framingLine: string;
  reassuranceLine: string;
  properties: readonly StayProperty[];
};

type StaysSectionProps = {
  id: string;
  eyebrow: string;
  heading: string;
  supporting: string;
  footerNote: string;
  items: readonly StayCategory[];
};

export function StaysSection({ id, eyebrow, heading, supporting, footerNote, items }: StaysSectionProps) {
  const layouts = [
    {
      container: "lg:flex-row lg:items-center",
      image: "lg:w-[60%] aspect-[4/5] lg:aspect-[3/4]",
      text: "lg:w-[32%] lg:pl-8 xl:pl-16",
    },
    {
      container: "lg:flex-row-reverse lg:items-end",
      image: "lg:w-[50%] aspect-[4/5] lg:aspect-[4/5]",
      text: "lg:w-[40%] lg:pr-8 xl:pr-16 lg:pb-32",
    },
    {
      container: "lg:flex-row lg:items-start",
      image: "lg:w-[65%] aspect-[4/5] lg:aspect-[16/9]",
      text: "lg:w-[28%] lg:pl-8 xl:pl-12 lg:pt-48",
    },
    {
      container: "lg:flex-row-reverse lg:items-center",
      image: "lg:w-[55%] aspect-[4/5] lg:aspect-[3/4]",
      text: "lg:w-[35%] lg:pr-8 xl:pr-16",
    }
  ];

  return (
    <section id={id} className="section-shell w-full bg-[var(--color-surface)] pt-32 md:pt-48 lg:pt-56 rounded-t-[2.5rem] md:rounded-t-[4rem]">
      <div className="w-full px-4 md:px-8 lg:px-12 xl:px-16 2xl:px-24">
        <SectionHeader 
          eyebrow={eyebrow} 
          heading={heading} 
          supporting={supporting} 
          className="mb-32 md:mb-48 max-w-3xl mx-auto text-center flex flex-col items-center" 
        />

        <div className="flex flex-col gap-40 md:gap-56 lg:gap-72 w-full">
          {items.map((category, index) => {
            const layout = layouts[index % layouts.length];
            const mainProperty = category.properties[0];
            if (!mainProperty) return null;

            return (
              <div 
                key={category.id} 
                className={`flex flex-col ${layout.container} justify-between gap-16 md:gap-20 lg:gap-0`}
              >
                {/* Image Side */}
                <div className={`w-[calc(100%+2rem)] -mx-4 md:w-full md:mx-0 ${layout.image}`}>
                  <div className="relative w-full h-full overflow-hidden bg-[var(--color-bg-alt)] md:rounded-[2px]">
                    <img
                      src={proxiedImageUrl(mainProperty.image)}
                      alt={mainProperty.alt}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-[2s] ease-out hover:scale-[1.03]"
                    />
                  </div>
                </div>

                {/* Text Side */}
                <div className={`w-full flex flex-col ${layout.text}`}>
                  <span className="type-eyebrow text-[var(--color-brand)] mb-6 md:mb-8 block tracking-widest">
                    {category.framingLine}
                  </span>
                  
                  <h3 className="font-serif text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.05] tracking-tight text-[var(--color-text)] mb-8 md:mb-10">
                    {category.title}
                  </h3>
                  
                  <p className="text-[1.05rem] md:text-[1.125rem] leading-[1.9] text-[var(--color-text-secondary)] font-light mb-16 md:mb-20 max-w-[38ch]">
                    {category.description}
                  </p>

                  <div className="border-t border-[color-mix(in_srgb,var(--color-border-strong)_40%,transparent)] pt-8 md:pt-10">
                    <p className="type-eyebrow text-[var(--color-text-muted)] mb-6 md:mb-8">
                      Curated Examples
                    </p>
                    <ul className="space-y-4 md:space-y-5">
                      {category.properties.map((prop) => (
                        <li key={`${prop.name}-${prop.location}`} className="flex items-baseline gap-4 md:gap-5 group">
                          <span className="w-4 md:w-6 h-[1px] bg-[color-mix(in_srgb,var(--color-border-strong)_60%,transparent)] flex-shrink-0 relative top-[-4px] md:top-[-5px] transition-colors group-hover:bg-[var(--color-brand)]" />
                          <div>
                            <span className="text-[15px] md:text-[16px] text-[var(--color-text)] font-medium block mb-1">
                              {prop.name}
                            </span>
                            <span className="text-[13px] md:text-[14px] text-[var(--color-text-muted)] italic font-serif">
                              — {prop.location}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <p className="mt-12 md:mt-16 text-[14px] md:text-[15px] text-[var(--color-text-muted)] italic font-serif max-w-[38ch] leading-relaxed">
                    {category.reassuranceLine}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-32 md:mt-48 border-t border-[color-mix(in_srgb,var(--color-border-strong)_40%,transparent)] pt-12">
          <p className="text-[14px] max-w-[52rem] text-[var(--color-text-muted)]">
            {footerNote}
          </p>
        </div>
      </div>
    </section>
  );
}
