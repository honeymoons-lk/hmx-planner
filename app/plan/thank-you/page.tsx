"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlanningHeader, PlanningMicroFooter } from "@/components/plan/planning-chrome";
import { proxiedImageUrl } from "@/lib/media";
import {
  readPlanningDraft,
  readSubmittedPlanningRequest,
  type PlanningDraft,
} from "@/lib/planning-draft";

const timeframeLabels: Record<string, string> = {
  "next-3-months": "Next 3 months",
  "3-6-months": "3–6 months",
  "6-12-months": "6–12 months",
  "pick-dates": "Exact dates",
};

const styleLabels: Record<string, string> = {
  luxury: "Luxury",
  beach: "Beach",
  adventure: "Adventure",
  culture: "Culture",
};

const wowLabels: Record<string, string> = {
  "private-dinner": "Private dinner",
  safari: "Safari",
  "scenic-train": "Scenic train",
  "beach-villa": "Beach villa",
};

const paceLabels: Record<string, string> = {
  relaxed: "Light & easy",
  balanced: "A bit of both",
  packed: "Packed with highlights",
};

const budgetLabels: Record<string, string> = {
  value: "Boutique & Comfortable",
  mid: "Premium",
  lux: "Exceptional",
};

const occasionLabels: Record<string, string> = {
  honeymoon: "Honeymoon",
  babymoon: "Babymoon",
  anniversary: "Anniversary",
  proposal: "Proposal trip",
  other: "Other",
};

function nightsLabel(nights?: string) {
  if (!nights) return "Not provided";
  if (nights === "not-sure") return "Not sure yet";
  if (/^\d+$/.test(nights)) return `${nights} nights`;
  return `${nights} nights`;
}

const thankYouImage =
  "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1800&q=80";

export default function ThankYouPage() {
  const [request, setRequest] = useState<PlanningDraft | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRequest(readSubmittedPlanningRequest() ?? readPlanningDraft());
  }, []);

  return (
    <>
      <PlanningHeader />
      <main className="min-h-[calc(100vh-64px)] bg-[var(--color-bg)] px-4 py-8 md:px-6 md:py-16 lg:py-24">
        <div className="mx-auto w-full max-w-5xl space-y-8 md:space-y-12">
          <Card className="plan-step-card">
            <img
              src={proxiedImageUrl(thankYouImage)}
              alt="Sri Lanka coastline at dusk"
              className="h-36 w-full object-cover object-center md:h-56"
              loading="lazy"
            />
            <CardHeader className="px-5 pt-6 pb-6 md:px-10 md:pt-10">
              <CardTitle className="type-subheading font-serif">Thank you. Your request is with us.</CardTitle>
              <CardDescription className="type-body max-w-[54ch] text-[var(--color-text-muted)] font-light mt-2">
                We will review your details and share a tailored direction within 48 hours.
              </CardDescription>
            </CardHeader>
          </Card>

          <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[1.25fr_0.75fr] lg:items-start">
            <Card className="plan-step-card">
              <CardHeader className="px-5 pt-6 pb-5 border-b border-[rgba(0,0,0,0.06)] md:px-10 md:pt-10 md:pb-6">
                <CardTitle className="type-subheading font-serif">Your journey summary</CardTitle>
              </CardHeader>
              <CardContent className="px-5 pb-6 pt-6 md:px-10 md:pb-10 md:pt-8">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <p className="type-eyebrow text-[var(--color-text-muted)] mb-1">Timing</p>
                    <p className="type-ui-sm text-foreground">{timeframeLabels[request?.timeframe || ""] || "Not provided"}</p>
                  </div>
                  <div>
                    <p className="type-eyebrow text-[var(--color-text-muted)] mb-1">Dates</p>
                    <p className="type-ui-sm text-foreground">
                      {request?.start && request?.end ? `${request.start} → ${request.end}` : "Not provided"}
                    </p>
                  </div>
                  <div>
                    <p className="type-eyebrow text-[var(--color-text-muted)] mb-1">Duration</p>
                    <p className="type-ui-sm text-foreground">{nightsLabel(request?.nights)}</p>
                  </div>
                  <div>
                    <p className="type-eyebrow text-[var(--color-text-muted)] mb-1">Experience</p>
                    <p className="type-ui-sm text-foreground">
                      {request?.styles?.length ? request.styles.map((style) => styleLabels[style] || style).join(", ") : "Not provided"}
                    </p>
                  </div>
                  <div>
                    <p className="type-eyebrow text-[var(--color-text-muted)] mb-1">Highlights</p>
                    <p className="type-ui-sm text-foreground">
                      {[wowLabels[request?.wow || ""], paceLabels[request?.pace || ""]].filter(Boolean).join(" · ") || "Not provided"}
                    </p>
                  </div>
                  <div>
                    <p className="type-eyebrow text-[var(--color-text-muted)] mb-1">Comfort & Occasion</p>
                    <p className="type-ui-sm text-foreground">
                      {[budgetLabels[request?.budget || ""], occasionLabels[request?.occasion || ""]].filter(Boolean).join(" · ") || "Not provided"}
                    </p>
                  </div>
                  <div className="sm:col-span-2">
                    <p className="type-eyebrow text-[var(--color-text-muted)] mb-1">Notes</p>
                    <p className="type-ui-sm text-foreground">{request?.notes?.trim() || "None shared yet"}</p>
                  </div>
                  <div className="sm:col-span-2">
                    <p className="type-eyebrow text-[var(--color-text-muted)] mb-1">Contact</p>
                    <p className="type-ui-sm text-foreground">
                      {[request?.firstName, request?.email].filter(Boolean).join(" · ") || "Provided in your request"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-8">
            <Card className="plan-step-card bg-[color-mix(in_srgb,var(--color-bg-alt)_40%,transparent)]">
              <CardHeader className="px-5 pt-6 pb-5 border-b border-[rgba(0,0,0,0.06)] md:px-8 md:pt-8 md:pb-6">
                <CardTitle className="type-subheading font-serif">Next steps</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 px-5 pb-6 pt-6 md:px-8 md:pb-8 md:pt-8">
                <div>
                  <p className="type-ui-sm text-foreground mb-1">1. Personal review</p>
                  <p className="type-meta text-[var(--color-text-secondary)] font-light">We review your request personally, without automation.</p>
                </div>
                <div>
                  <p className="type-ui-sm text-foreground mb-1">2. Tailored direction</p>
                  <p className="type-meta text-[var(--color-text-secondary)] font-light">We design options around your pace, priorities, and style.</p>
                </div>
                <div>
                  <p className="type-ui-sm text-foreground mb-1">3. Concierge follow-up</p>
                  <p className="type-meta text-[var(--color-text-secondary)] font-light">You’ll hear from us within 48 hours.</p>
                </div>
              </CardContent>
              </Card>
            </div>
          </div>

          <div className="flex flex-col items-center text-center mt-12 space-y-6">
            <p className="type-body text-[var(--color-text-secondary)] max-w-[48ch]">
              We look forward to designing something memorable for you.
            </p>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
              <Link href="/">Return to homepage</Link>
            </Button>
          </div>
        </div>
      </main>
      <PlanningMicroFooter />
    </>
  );
}
