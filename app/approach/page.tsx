import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const steps = [
  {
    title: "Discovery",
    detail: "Your dates, budget, and what matters most to you.",
  },
  {
    title: "Design",
    detail: "We craft a tailored route, stays, and moments.",
  },
  {
    title: "Refinement",
    detail: "You review. We adjust until it feels right.",
  },
  {
    title: "Seamless travel",
    detail: "We handle bookings, transfers, and on-ground support.",
  },
];

export default function ApproachPage() {
  return (
    <main className="min-h-screen bg-background px-4 py-12 md:px-6">
      <div className="mx-auto w-full max-w-6xl space-y-10">
        <section className="max-w-3xl space-y-4">
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">Our approach</h1>
          <p className="text-muted-foreground md:text-lg">
            Every honeymoon is handled by one concierge team from first brief to final airport transfer.
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <Card key={step.title} className="border-border">
              <CardHeader>
                <CardTitle className="text-lg">{step.title}</CardTitle>
                <CardDescription>{step.detail}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </section>

        <section className="space-y-3 rounded-xl border border-border bg-muted/40 p-6">
          <h2 className="text-2xl font-semibold tracking-tight">FAQs</h2>
          <p className="text-sm text-muted-foreground">How quickly do you reply? Typically within 24–48 hours.</p>
          <p className="text-sm text-muted-foreground">Do you only do fixed packages? No, everything is tailored around your brief.</p>
          <p className="text-sm text-muted-foreground">Can you handle transfers and support on trip? Yes, end-to-end.</p>
          <Button asChild>
            <Link href="/start">Start planning</Link>
          </Button>
        </section>
      </div>
    </main>
  );
}
