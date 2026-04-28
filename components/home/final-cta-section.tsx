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
  secondaryHref = "/book-a-call",
}: FinalCtaSectionProps) {
  return (
    <section className="relative mt-12 w-full overflow-hidden py-24 md:py-32" data-header-tone="dark">
      <img
        src="https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=2600&q=80"
        alt="Scenic Sri Lanka highland view"
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-[rgba(23,20,18,0.58)]" />

      <div className="page-shell relative z-10 flex flex-col items-center text-center">
        <p className="type-eyebrow mb-4 text-[color-mix(in_srgb,var(--color-light)_70%,transparent)] md:mb-5">
          {eyebrow}
        </p>
        <h2 className="type-section mx-auto mb-4 max-w-[20ch] text-balance-pretty font-serif tracking-tight text-[var(--color-light)] md:mb-5">
          {heading}
        </h2>
        <p className="type-body-lg mb-10 max-w-[42ch] font-light text-[color-mix(in_srgb,var(--color-light)_84%,transparent)] md:mb-11">
          {subcopy}
        </p>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <Button asChild size="lg" className="bg-[var(--color-light)] text-[var(--color-brand)] hover:bg-white">
            <Link href={primaryHref}>{primary}</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-[color-mix(in_srgb,var(--color-light)_30%,transparent)] text-[var(--color-light)] hover:border-[color-mix(in_srgb,var(--color-light)_50%,transparent)] hover:bg-[color-mix(in_srgb,var(--color-light)_10%,transparent)] hover:text-white"
          >
            <Link href={secondaryHref}>{secondary}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
