"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlanningHeader, PlanningMicroFooter } from "@/components/plan/planning-chrome";

type RequestPayload = {
  timeframe?: string;
  start?: string;
  end?: string;
  nights?: string;
  styles?: string[];
  wow?: string;
  pace?: string;
  budget?: string;
  occasion?: string;
  notes?: string;
  firstName?: string;
  email?: string;
};

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

export default function PlanThanksPage() {
  const [request, setRequest] = useState<RequestPayload | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = window.sessionStorage.getItem("luna_latest_request");
    if (!raw) return;
    try {
      setRequest(JSON.parse(raw) as RequestPayload);
    } catch {
      setRequest(null);
    }
  }, []);

  return (
    <>
      <PlanningHeader />
      <main className="min-h-[calc(100vh-64px)] bg-background px-4 py-10 md:px-6 md:py-14">
        <div className="mx-auto w-full max-w-5xl space-y-6">
          <Card className="border-border bg-[var(--color-surface)]">
            <CardHeader className="space-y-3">
              <CardTitle className="type-section font-serif">Your request is with us</CardTitle>
              <CardDescription className="type-body text-[var(--color-text-secondary)]">
                Thank you for sharing your plans. We’ll review everything personally and come back with
                a tailored direction within 24–48 hours.
              </CardDescription>
            </CardHeader>
          </Card>

          <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
            <Card className="border-border bg-[var(--color-surface)]">
              <CardHeader>
                <CardTitle className="type-subheading font-serif">Here’s what we’re shaping for you</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="type-meta text-muted-foreground">When</p>
                    <p className="type-ui-sm text-foreground">{timeframeLabels[request?.timeframe || ""] || "Not provided"}</p>
                  </div>
                  <div>
                    <p className="type-meta text-muted-foreground">Dates</p>
                    <p className="type-ui-sm text-foreground">
                      {request?.start && request?.end ? `${request.start} → ${request.end}` : "Not provided"}
                    </p>
                  </div>
                  <div>
                    <p className="type-meta text-muted-foreground">Trip length</p>
                    <p className="type-ui-sm text-foreground">{nightsLabel(request?.nights)}</p>
                  </div>
                  <div>
                    <p className="type-meta text-muted-foreground">Styles</p>
                    <p className="type-ui-sm text-foreground">
                      {request?.styles?.length ? request.styles.map((style) => styleLabels[style] || style).join(", ") : "Not provided"}
                    </p>
                  </div>
                  <div>
                    <p className="type-meta text-muted-foreground">Wow + vibe</p>
                    <p className="type-ui-sm text-foreground">
                      {[wowLabels[request?.wow || ""], paceLabels[request?.pace || ""]].filter(Boolean).join(" · ") || "Not provided"}
                    </p>
                  </div>
                  <div>
                    <p className="type-meta text-muted-foreground">Comfort + occasion</p>
                    <p className="type-ui-sm text-foreground">
                      {[budgetLabels[request?.budget || ""], occasionLabels[request?.occasion || ""]].filter(Boolean).join(" · ") || "Not provided"}
                    </p>
                  </div>
                  <div className="sm:col-span-2">
                    <p className="type-meta text-muted-foreground">Special notes</p>
                    <p className="type-ui-sm text-foreground">{request?.notes?.trim() || "None shared yet"}</p>
                  </div>
                  <div className="sm:col-span-2">
                    <p className="type-meta text-muted-foreground">Contact</p>
                    <p className="type-ui-sm text-foreground">
                      {[request?.firstName, request?.email].filter(Boolean).join(" · ") || "Provided in your request"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="border-border bg-[var(--color-surface)]">
                <CardHeader>
                  <CardTitle className="type-subheading font-serif">What happens next</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="type-ui-sm text-foreground">1. Personal review</p>
                    <p className="type-meta text-muted-foreground">We review your request with care, not automation.</p>
                  </div>
                  <div>
                    <p className="type-ui-sm text-foreground">2. Tailored direction</p>
                    <p className="type-meta text-muted-foreground">We shape options around your pace, priorities, and style.</p>
                  </div>
                  <div>
                    <p className="type-ui-sm text-foreground">3. Concierge follow-up</p>
                    <p className="type-meta text-muted-foreground">You’ll hear from us personally within 24–48 hours.</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border bg-[var(--color-surface)]">
                <CardContent className="space-y-4 p-6">
                  <p className="type-body text-[var(--color-text-secondary)]">
                    Prefer to talk sooner?
                  </p>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/plan/consultation">Book a call</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="text-center">
            <p className="type-body text-[var(--color-text-secondary)]">
              Every proposal is shaped around your pace, priorities, and the kind of experience you want to remember.
            </p>
            <Button asChild variant="link" className="mt-2 px-0 text-muted-foreground">
              <Link href="/">Return to Luna Voyages</Link>
            </Button>
          </div>
        </div>
      </main>
      <PlanningMicroFooter />
    </>
  );
}

