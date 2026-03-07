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
    <section className="mx-auto w-full max-w-6xl px-4 pb-[var(--section-space-mobile)] md:px-6 md:pb-[var(--section-space-desktop)]">
      <Card className="border-border bg-[var(--color-bg-alt)]">
        <CardContent className="flex flex-col gap-6 p-[var(--card-padding)] md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl space-y-3">
            <h2 className="type-section font-serif tracking-tight">{heading}</h2>
            <p className="type-body text-[var(--color-text-secondary)]">{subcopy}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/start">{primary}</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/#our-approach">{secondary}</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
