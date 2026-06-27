import Link from "next/link";
import { Button } from "@/components/ui/button";

type FinalCtaSectionProps = {
  eyebrow?: string;
  heading: string;
  subcopy: string;
  primary: string;
  secondary: string;
  primaryHref?: string;
  secondaryHref?: string;
};

export function FinalCtaSection({
  eyebrow = "Ready when you are",
  heading,
  subcopy,
  primary,
  secondary,
  primaryHref = "/plan/journey",
  secondaryHref = "/#how-it-works",
}: FinalCtaSectionProps) {
  return (
    <section className="relative w-full overflow-hidden bg-[var(--color-brand)] py-24 md:py-32 mt-12">
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.2)_0%,transparent_100%)]" />
      <div className="absolute left-[-10%] top-[-20%] h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.06)_0%,transparent_60%)] blur-3xl" />
      <div className="absolute bottom-[-20%] right-[-10%] h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(204,178,139,0.08)_0%,transparent_60%)] blur-3xl" />

      <div className="page-shell relative z-10 flex flex-col items-center text-center">
        <p className="type-eyebrow text-[color-mix(in_srgb,var(--color-light)_70%,transparent)] mb-4 md:mb-5">
          {eyebrow}
        </p>
        <h2 className="type-section text-balance-pretty font-serif tracking-tight text-[var(--color-light)] max-w-[20ch] mx-auto mb-4 md:mb-5">
          {heading}
        </h2>
        <p className="type-body-lg max-w-[42ch] text-[color-mix(in_srgb,var(--color-light)_85%,transparent)] font-light mb-10 md:mb-11">
          {subcopy}
        </p>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <Button
            asChild
            size="lg"
            className="bg-[var(--color-light)] text-[var(--color-brand)] hover:bg-white"
          >
            <Link href={primaryHref}>{primary}</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-[color-mix(in_srgb,var(--color-light)_30%,transparent)] text-[var(--color-light)] hover:bg-[color-mix(in_srgb,var(--color-light)_10%,transparent)] hover:text-white hover:border-[color-mix(in_srgb,var(--color-light)_50%,transparent)]"
          >
            <Link href={secondaryHref}>{secondary}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
