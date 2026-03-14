import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type FinalCtaSectionProps = {
  heading: string;
  subcopy: string;
  primary: string;
  secondary: string;
};

export function FinalCtaSection({ heading, subcopy, primary, secondary }: FinalCtaSectionProps) {
  return (
    <section className="relative w-full overflow-hidden bg-[var(--color-brand)] py-24 md:py-32 mt-12">
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.2)_0%,transparent_100%)]" />
      <div className="absolute left-[-10%] top-[-20%] h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.06)_0%,transparent_60%)] blur-3xl" />
      <div className="absolute bottom-[-20%] right-[-10%] h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(204,178,139,0.08)_0%,transparent_60%)] blur-3xl" />
      
      <div className="page-shell relative z-10 flex flex-col items-center text-center">
        <p className="type-eyebrow text-[color-mix(in_srgb,var(--color-light)_70%,transparent)] mb-6">
          Ready when you are
        </p>
        <h2 className="type-section text-balance-pretty font-serif tracking-tight text-[var(--color-light)] max-w-[20ch] mx-auto mb-6">
          {heading}
        </h2>
        <p className="type-body-lg max-w-[42ch] text-[color-mix(in_srgb,var(--color-light)_85%,transparent)] font-light mb-12">
          {subcopy}
        </p>
        
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <Button asChild size="lg" className="bg-[var(--color-light)] text-[var(--color-brand)] hover:bg-white h-14 px-8 text-[14px] tracking-wide shadow-lg">
            <Link href="/plan/journey">{primary}</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="h-14 px-8 text-[14px] tracking-wide border-[color-mix(in_srgb,var(--color-light)_30%,transparent)] text-[var(--color-light)] hover:bg-[color-mix(in_srgb,var(--color-light)_10%,transparent)] hover:text-white bg-transparent">
            <Link href="/#our-approach">{secondary}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
