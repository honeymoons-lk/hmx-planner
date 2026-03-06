import { SectionHeader } from "@/components/section-header";

type Objection = {
  question: string;
  answer: string;
};

type WhySectionProps = {
  id: string;
  eyebrow: string;
  heading: string;
  supporting: string;
  objections: readonly Objection[];
  closing: string;
};

export function WhySection({ id, eyebrow, heading, supporting, objections, closing }: WhySectionProps) {
  return (
    <section id={id} className="mx-auto w-full max-w-6xl px-4 py-[var(--section-space-mobile)] md:px-6 md:py-[var(--section-space-desktop)]">
      <SectionHeader eyebrow={eyebrow} heading={heading} supporting={supporting} className="max-w-3xl" />

      <div className="mt-8 md:mt-10">
        <div>
          {objections.map((item, index) => (
            <article key={item.question} className="px-1 py-8 md:py-9 lg:px-2 lg:py-10">
              {index > 0 ? (
                <div
                  className="mb-8 ml-0 h-px w-full bg-black/10 lg:mb-9 lg:ml-[44%] lg:w-[56%]"
                  aria-hidden="true"
                />
              ) : null}
              <div className="grid gap-4 lg:grid-cols-[19fr_1px_31fr] lg:items-start lg:gap-x-8">
                <h3 className="type-subheading font-serif font-medium leading-[1.3] tracking-tight text-foreground/90">
                  {item.question}
                </h3>
                <div className="hidden h-full w-px bg-black/10 lg:block" aria-hidden="true" />
                <p className="type-body-lg max-w-[62ch] font-normal text-muted-foreground">
                  {item.answer}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center md:mt-18 lg:mt-20">
          <div className="h-px w-28 bg-black/10 md:w-32" aria-hidden="true" />
          <p className="type-eyebrow mt-5 text-center text-foreground/75">
            {closing}
          </p>
        </div>
      </div>
    </section>
  );
}
