import { SectionHeader } from "@/components/section-header";

type StayItem = {
  title: string;
  description: string;
  image: string;
  alt: string;
};

type StaysSectionProps = {
  id: string;
  eyebrow: string;
  heading: string;
  supporting: string;
  footerNote: string;
  items: readonly StayItem[];
};

export function StaysSection({ id, eyebrow, heading, supporting, footerNote, items }: StaysSectionProps) {
  return (
    <section id={id} className="mx-auto w-full max-w-6xl px-4 py-[var(--section-space-mobile)] md:px-6 md:py-[var(--section-space-desktop)]">
      <SectionHeader eyebrow={eyebrow} heading={heading} supporting={supporting} className="md:mb-12" />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5 lg:gap-5">
        {items.map((stay, index) => (
          <article
            key={stay.title}
            className={`group relative overflow-hidden rounded-[var(--radius-card)] h-[240px] md:h-[260px] lg:h-[300px] ${
              index === 0
                ? "lg:col-span-3"
                : index === 1
                  ? "lg:col-span-2"
                  : index === 2
                    ? "lg:col-span-2"
                    : "lg:col-span-3"
            }`}
          >
            <img
              src={stay.image}
              alt={stay.alt}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 ease-out motion-reduce:transform-none motion-reduce:transition-none lg:group-hover:scale-[1.03]"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.60) 0%, rgba(0,0,0,0.32) 45%, rgba(0,0,0,0.10) 80%, rgba(0,0,0,0.00) 100%)",
              }}
            />
            <div className="absolute bottom-5 left-5 z-10 max-w-[360px] md:bottom-6 md:left-6">
              <h3 className="type-subheading font-serif font-medium text-white">{stay.title}</h3>
              <p className="type-meta mt-2 text-white/95 md:type-body">{stay.description}</p>
            </div>
          </article>
        ))}
      </div>

      <p className="type-meta mt-6 text-muted-foreground md:mt-7">{footerNote}</p>
    </section>
  );
}
