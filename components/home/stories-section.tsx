import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionHeader } from "@/components/section-header";

type Story = {
  couple: string;
  route: string;
  budget: string;
  summary: string;
  quote: string;
};

type StoriesSectionProps = {
  id: string;
  eyebrow: string;
  heading: string;
  supporting: string;
  caseStudies: readonly Story[];
};

export function StoriesSection({
  id,
  eyebrow,
  heading,
  supporting,
  caseStudies,
}: StoriesSectionProps) {
  return (
    <section id={id} className="mx-auto w-full max-w-6xl px-4 py-[var(--section-space-mobile)] md:px-6 md:py-[var(--section-space-desktop)]">
      <SectionHeader eyebrow={eyebrow} heading={heading} supporting={supporting} className="mb-10 max-w-3xl" />
      <div className="grid gap-4 md:grid-cols-3">
        {caseStudies.map((story) => (
          <Card key={story.couple} className="border-border">
            <CardHeader>
              <CardTitle className="type-subheading flex items-center justify-between gap-4 font-serif font-medium">
                <span>{story.couple}</span>
                <Badge variant="secondary">{story.budget}</Badge>
              </CardTitle>
              <CardDescription>{story.route}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="type-body mb-2 text-muted-foreground">{story.summary}</p>
              <p className="type-eyebrow mb-4 text-muted-foreground">
                {story.quote}
              </p>
              <Button asChild variant="outline">
                <Link href="/real-honeymoons">See this honeymoon</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
