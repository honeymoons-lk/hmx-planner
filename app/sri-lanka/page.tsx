import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const flow = [
  "Colombo (1 night)",
  "Cultural Triangle (2–3 nights)",
  "Tea Country (2 nights)",
  "South Coast (3–5 nights)",
  "Optional: Maldives (3–5 nights)",
];

const moments = [
  "Private beach dinners",
  "Tea country slow mornings",
  "Safari sundowners",
  "Heritage evenings",
];

export default function SriLankaPage() {
  return (
    <main className="min-h-screen bg-background px-4 py-12 md:px-6">
      <div className="mx-auto w-full max-w-6xl space-y-10">
        <section className="max-w-3xl space-y-4">
          <h1 className="font-serif text-5xl font-medium tracking-tight md:text-6xl">Honeymoons in Sri Lanka</h1>
          <p className="text-muted-foreground md:text-lg">
            A concierge-crafted balance of tea country, culture, and coastline, tailored around your pace.
          </p>
          <Button asChild size="lg">
            <Link href="/start">Start planning</Link>
          </Button>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Typical flow</CardTitle>
              <CardDescription>A proven rhythm we adapt to your dates.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              {flow.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle>Moments we design</CardTitle>
              <CardDescription>Highlights we build each honeymoon around.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              {moments.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}
