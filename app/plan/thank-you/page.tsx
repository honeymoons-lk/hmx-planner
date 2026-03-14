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
  relaxed: "Slow & romantic",
  balanced: "A bit of both",
  packed: "Make the most of it",
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
    setRequest(readSubmittedPlanningRequest() ?? readPlanningDraft());
  }, []);

  return (
    <>
      <PlanningHeader />
      <main className="min-h-[calc(100vh-64px)] bg-background px-4 py-10 md:px-6 md:py-14">
        <div className="mx-auto w-full max-w-5xl space-y-8">
          <Card className="overflow-hidden border border-[color-mix(in_srgb,var(--color-border)_88%,transparent)] bg-[color-mix(in_srgb,var(--color-surface)_93%,var(--color-bg))] shadow-sm">
            <img
              src={proxiedImageUrl(thankYouImage)}
              alt="Sri Lanka coastline at dusk"
              className="h-36 w-full object-cover object-center md:h-56"
              loading="lazy"
            />
            <CardHeader className="space-y-4 px-8 pt-8 pb-6">
              <CardTitle className="type-section font-serif">Your request is with us</CardTitle>
              <CardDescription className="type-body max-w-[54ch] text-[var(--color-text-secondary)] font-light">
                Thank you for sharing your plans. We’ll review everything personally and come back with
                a tailored direction within 24–48 hours.
              </CardDescription>
            </CardHeader>
          </Card>

          <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr]">
            <Card className="border border-[color-mix(in_srgb,var(--color-border)_88%,transparent)] bg-[color-mix(in_srgb,var(--color-surface)_94%,var(--color-bg))] shadow-sm">
              <CardHeader className="px-8 pt-8 pb-6 border-b border-[rgba(0,0,0,0.06)]">
                <CardTitle className="type-subheading font-serif">Here’s what we’re shaping for you</CardTitle>
              </CardHeader>
              <CardContent className="px-8 py-8">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-[var(--color-text-muted)] mb-1">When</p>
                    <p className="type-ui-sm text-foreground">{timeframeLabels[request?.timeframe || ""] || "Not provided"}</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-[var(--color-text-muted)] mb-1">Dates</p>
                    <p className="type-ui-sm text-foreground">
                      {request?.start && request?.end ? `${request.start} → ${request.end}` : "Not provided"}
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-[var(--color-text-muted)] mb-1">Trip length</p>
                    <p className="type-ui-sm text-foreground">{nightsLabel(request?.nights)}</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-[var(--color-text-muted)] mb-1">Styles</p>
                    <p className="type-ui-sm text-foreground">
                      {request?.styles?.length ? request.styles.map((style) => styleLabels[style] || style).join(", ") : "Not provided"}
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-[var(--color-text-muted)] mb-1">Wow + vibe</p>
                    <p className="type-ui-sm text-foreground">
                      {[wowLabels[request?.wow || ""], paceLabels[request?.pace || ""]].filter(Boolean).join(" · ") || "Not provided"}
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-[var(--color-text-muted)] mb-1">Comfort + occasion</p>
                    <p className="type-ui-sm text-foreground">
                      {[budgetLabels[request?.budget || ""], occasionLabels[request?.occasion || ""]].filter(Boolean).join(" · ") || "Not provided"}
                    </p>
                  </div>
                  <div className="sm:col-span-2">
                    <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-[var(--color-text-muted)] mb-1">Special notes</p>
                    <p className="type-ui-sm text-foreground">{request?.notes?.trim() || "None shared yet"}</p>
                  </div>
                  <div className="sm:col-span-2">
                    <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-[var(--color-text-muted)] mb-1">Contact</p>
                    <p className="type-ui-sm text-foreground">
                      {[request?.firstName, request?.email].filter(Boolean).join(" · ") || "Provided in your request"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-8">
              <Card className="border border-[color-mix(in_srgb,var(--color-border)_88%,transparent)] bg-[color-mix(in_srgb,var(--color-surface)_94%,var(--color-bg))] shadow-sm">
                <CardHeader className="px-8 pt-8 pb-6 border-b border-[rgba(0,0,0,0.06)]">
                  <CardTitle className="type-subheading font-serif">What happens next</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 px-8 py-8">
                  <div>
                    <p className="type-ui-sm text-foreground mb-1">1. Personal review</p>
                    <p className="type-meta text-[var(--color-text-secondary)] font-light">We review your request with care, not automation.</p>
                  </div>
                  <div>
                    <p className="type-ui-sm text-foreground mb-1">2. Tailored direction</p>
                    <p className="type-meta text-[var(--color-text-secondary)] font-light">We shape options around your pace, priorities, and style.</p>
                  </div>
                  <div>
                    <p className="type-ui-sm text-foreground mb-1">3. Concierge follow-up</p>
                    <p className="type-meta text-[var(--color-text-secondary)] font-light">You’ll hear from us personally within 24–48 hours.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="type-body text-[var(--color-text-secondary)]">
              Every proposal is shaped around your pace, priorities, and the kind of experience you want to remember.
            </p>
            <Button asChild variant="outline" className="mt-6">
              <Link href="/">Return to Luna Voyages</Link>
            </Button>
          </div>
        </div>
      </main>
      <PlanningMicroFooter />
    </>
  );
}
