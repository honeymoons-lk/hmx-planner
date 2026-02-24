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
    <section className="mx-auto w-full max-w-6xl px-4 pb-14 md:px-6 md:pb-20">
      <Card className="border-border bg-gradient-to-r from-[var(--brand-tint-2)] to-[var(--brand-tint-1)]">
        <CardContent className="flex flex-col gap-6 p-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl space-y-2">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{heading}</h2>
            <p className="text-muted-foreground">{subcopy}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/start">{primary}</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/approach">{secondary}</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
