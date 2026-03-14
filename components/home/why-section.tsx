import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
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
    <section id={id} className="section-shell w-full">
      <div className="page-shell">
        <div className="grid gap-16 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-start lg:gap-24">
          <div className="lg:sticky lg:top-[calc(var(--header-height)+40px)]">
            <SectionHeader
              eyebrow={eyebrow}
              heading={heading}
              supporting={supporting}
              className="mb-0 max-w-none"
            />
            <div className="mt-8 h-[1px] w-12 bg-[var(--color-brand)]" aria-hidden="true" />
            <p className="text-[17px] leading-[1.7] mt-8 max-w-[34ch] text-[var(--color-text-secondary)] font-light">
              Luna is built for couples who want the journey to feel personal and beautifully handled without having to piece everything together themselves.
            </p>
            <p className="text-[11px] font-semibold tracking-[0.2em] uppercase mt-12 text-[var(--color-text-muted)]">
              {closing}
            </p>
          </div>

          <div className="border-t border-[var(--color-border-strong)]">
            <Accordion type="single" collapsible defaultValue={objections[0]?.question} className="w-full">
              {objections.map((item) => (
                <AccordionItem 
                  key={item.question} 
                  value={item.question}
                  className="border-b border-[var(--color-border-strong)] py-2"
                >
                  <AccordionTrigger className="font-serif text-[22px] text-[var(--color-text)] hover:text-[var(--color-brand)] hover:no-underline text-left">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-6">
                    <p className="text-[16px] leading-[1.7] max-w-[50ch] text-[var(--color-text-secondary)] font-light">
                      {item.answer}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
