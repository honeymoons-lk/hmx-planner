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
    <section id={id} className="mx-auto w-full max-w-6xl px-4 py-20 md:px-6 md:py-28">
      <SectionHeader eyebrow={eyebrow} heading={heading} supporting={supporting} className="md:mb-12" />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:grid-rows-[280px_220px] lg:grid-cols-[1.6fr_1fr] lg:grid-rows-[320px_240px] lg:gap-5">
        {items.map((stay, index) => (
          <article
            key={stay.title}
            className={`group relative overflow-hidden rounded-xl ${
              index === 0
                ? "h-[260px] md:h-auto"
                : index === 1
                  ? "h-[240px] md:h-auto"
                  : index === 2
                    ? "h-[240px] md:h-auto"
                    : "h-[240px] md:h-auto"
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
              <h3 className="text-[18px] font-semibold text-white md:text-[22px]">{stay.title}</h3>
              <p className="mt-2 text-[14px] leading-[1.6] text-white/95 md:text-[16px]">{stay.description}</p>
            </div>
          </article>
        ))}
      </div>

      <p className="mt-6 text-sm leading-relaxed text-muted-foreground md:mt-7">{footerNote}</p>
    </section>
  );
}
