import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const stories = [
  {
    couple: "N + A",
    route: "Colombo → Ella → Tangalle",
    budget: "$4,200–$5,000",
    note: "10 nights with tea trails, private moments, and a quiet beach finale.",
    testimonial: "It felt perfectly paced from day one.",
  },
  {
    couple: "R + M",
    route: "Sigiriya → Kandy → Galle",
    budget: "$2,800–$3,400",
    note: "8 nights balancing culture landmarks and coastal downtime.",
    testimonial: "Every transfer and check-in was seamless.",
  },
  {
    couple: "D + S",
    route: "Bentota → Yala → Weligama",
    budget: "$5,500–$6,600",
    note: "9 nights with villa stays, safari, and signature dining.",
    testimonial: "It felt designed for us, not a template.",
  },
];

export default function RealHoneymoonsPage() {
  return (
    <main className="min-h-screen bg-background px-4 py-12 md:px-6">
      <div className="mx-auto w-full max-w-6xl space-y-8">
        <section className="max-w-3xl space-y-3">
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">Real honeymoons</h1>
          <p className="text-muted-foreground md:text-lg">
            Example journeys we have curated across different styles and budget bands.
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {stories.map((story) => (
            <Card key={story.couple} className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center justify-between gap-3 text-lg">
                  <span>{story.couple}</span>
                  <Badge variant="secondary">{story.budget}</Badge>
                </CardTitle>
                <CardDescription>{story.route}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">{story.note}</p>
                <p className="text-sm font-medium text-foreground/80">“{story.testimonial}”</p>
                <Button asChild variant="outline">
                  <Link href="/start">Plan something similar</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </section>
      </div>
    </main>
  );
}
