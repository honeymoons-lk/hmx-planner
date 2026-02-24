import { Separator } from "@/components/ui/separator";
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
    <section id={id} className="mx-auto w-full max-w-6xl px-4 py-14 md:px-6 md:py-20">
      <SectionHeader eyebrow={eyebrow} heading={heading} supporting={supporting} className="mb-8 max-w-3xl" />
      <div className="max-w-4xl space-y-8">
        {objections.map((item, index) => (
          <article key={item.question} className="space-y-2">
            <h3 className="text-lg font-semibold tracking-tight text-foreground">{item.question}</h3>
            <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">{item.answer}</p>
            {index < objections.length - 1 ? <Separator className="mt-6" /> : null}
          </article>
        ))}
        <p className="pt-1 text-sm text-muted-foreground">{closing}</p>
      </div>
    </section>
  );
}
