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
    <section id={id} className="mx-auto w-full max-w-6xl px-4 py-14 md:px-6 md:py-20 lg:py-24">
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
                <h3 className="text-base font-semibold leading-[1.35] tracking-tight text-foreground/90 md:text-[17px]">
                  {item.question}
                </h3>
                <div className="hidden h-full w-px bg-black/10 lg:block" aria-hidden="true" />
                <p className="max-w-[62ch] text-[17px] font-normal leading-[1.7] text-muted-foreground md:text-[18px] md:leading-[1.75]">
                  {item.answer}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center md:mt-18 lg:mt-20">
          <div className="h-px w-28 bg-black/10 md:w-32" aria-hidden="true" />
          <p className="mt-5 text-center text-[12px] uppercase tracking-[0.14em] text-foreground/75 md:text-[13px]">
            {closing}
          </p>
        </div>
      </div>
    </section>
  );
}
