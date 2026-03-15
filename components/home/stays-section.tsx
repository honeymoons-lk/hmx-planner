import { proxiedImageUrl } from "@/lib/media";
import { SectionHeader } from "@/components/section-header";

type StayProperty = {
  name: string;
  location: string;
};

type StayCategory = {
  id: string;
  title: string;
  mood: string;
  whyWeUseIt: string;
  image: string;
  alt: string;
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

type LayoutConfig = {
  container: string;
  image: string;
  text: string;
};

function StayCategoryBlock({ category, layout }: { category: StayCategory; layout: LayoutConfig }) {
  return (
    <div className={`flex flex-col ${layout.container} justify-between gap-10 md:gap-16 lg:gap-0`}>
      {/* Image Side */}
      <div className={`w-[calc(100%+2rem)] -mx-4 md:w-full md:mx-0 ${layout.image}`}>
        <div className="relative w-full h-full overflow-hidden bg-[var(--color-bg-alt)] md:rounded-[2px] group/image">
          <div className="absolute inset-0 h-full w-full transition-transform duration-[2.5s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover/image:scale-[1.03]">
            <img
              src={proxiedImageUrl(category.image)}
              alt={category.alt}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Text Side */}
      <div className={`w-full flex flex-col ${layout.text}`}>
        <h3 className="type-section font-serif tracking-tight text-[var(--color-text)] mb-6 md:mb-8">
          {category.title}
        </h3>
        
        <p className="type-body-lg text-[var(--color-text-secondary)] font-light mb-12 md:mb-16 max-w-[40ch]">
          {category.mood}
        </p>

        <div className="mb-12 md:mb-16">
          <p className="type-eyebrow text-[var(--color-text-muted)] mb-6 md:mb-8">
            A few places we return to
          </p>
          <ul className="space-y-3 md:space-y-4">
            {category.properties.map((prop) => (
              <li key={`${prop.name}-${prop.location}`} className="text-base md:text-lg">
                <span className="text-[var(--color-text)]">{prop.name}</span>
                <span className="text-[var(--color-text-muted)]">, {prop.location}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-8 md:pt-10 border-t border-[color-mix(in_srgb,var(--color-border-strong)_40%,transparent)]">
          <p className="text-base md:text-lg text-[var(--color-text-secondary)] leading-relaxed max-w-[40ch]">
            {category.whyWeUseIt}
          </p>
        </div>
      </div>
    </div>
  );
}

export function StaysSection({ id, eyebrow, heading, supporting, footerNote, items }: StaysSectionProps) {
  const layouts = [
    {
      container: "lg:flex-row lg:items-start",
      image: "lg:w-[60%] aspect-[4/3] md:aspect-[4/5] lg:aspect-[3/4]",
      text: "lg:w-[32%] lg:pl-8 xl:pl-16",
    },
    {
      container: "lg:flex-row-reverse lg:items-start",
      image: "lg:w-[50%] aspect-[4/3] md:aspect-[4/5] lg:aspect-[4/5]",
      text: "lg:w-[40%] lg:pr-8 xl:pr-16",
    },
    {
      container: "lg:flex-row lg:items-start",
      image: "lg:w-[65%] aspect-[4/3] md:aspect-[4/5] lg:aspect-[16/9]",
      text: "lg:w-[28%] lg:pl-8 xl:pl-12",
    },
    {
      container: "lg:flex-row-reverse lg:items-start",
      image: "lg:w-[55%] aspect-[4/3] md:aspect-[4/5] lg:aspect-[3/4]",
      text: "lg:w-[35%] lg:pr-8 xl:pr-16",
    }
  ];

  return (
    <section id={id} className="section-shell w-full bg-[var(--color-surface)] pt-32 md:pt-48 lg:pt-56 rounded-t-[2.5rem] md:rounded-t-[4rem]">
      <div className="page-shell">
        <div className="border-b border-[color-mix(in_srgb,var(--color-border-strong)_40%,transparent)] pb-8 mb-16 md:mb-24 lg:mb-32">
          <SectionHeader
            eyebrow={eyebrow}
            heading={heading}
            supporting={supporting}
            className="mb-0 max-w-2xl"
          />
        </div>
      </div>

      <div className="w-full px-4 md:px-8 lg:px-12 xl:px-16 2xl:px-24">
        <div className="flex flex-col gap-24 md:gap-40 lg:gap-72 w-full">
          {items.map((category, index) => (
            <StayCategoryBlock 
              key={category.id} 
              category={category} 
              layout={layouts[index % layouts.length]} 
            />
          ))}
        </div>
      </div>

      <div className="page-shell mt-32 md:mt-48 pb-24 md:pb-32">
        <div className="border-t border-[color-mix(in_srgb,var(--color-border-strong)_40%,transparent)] pt-12">
          <p className="type-meta max-w-[52rem] text-[var(--color-text-muted)]">
            {footerNote}
          </p>
        </div>
      </div>
    </section>
  );
}
