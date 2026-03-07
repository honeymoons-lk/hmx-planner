"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { PlanningHeader, PlanningMicroFooter } from "@/components/plan/planning-chrome";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { proxiedImageUrl } from "@/lib/media";
import { readSubmittedCallRequest, type CallRequest } from "@/lib/call-request";

const thanksImage =
  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1800&q=80";

const methodLabels: Record<CallRequest["preferredMethod"], string> = {
  whatsapp: "WhatsApp",
  phone: "Phone",
  email: "Email first",
};

const timingLabels: Record<CallRequest["preferredTiming"], string> = {
  asap: "As soon as possible",
  "this-week": "This week",
  "next-week": "Next week",
  flexible: "I'm flexible",
};

const countryLabels: Record<string, string> = {
  au: "Australia",
  nz: "New Zealand",
  uk: "United Kingdom",
  us: "United States",
  ca: "Canada",
  sg: "Singapore",
  other: "Other",
};

export default function BookACallThankYouPage() {
  const [request, setRequest] = useState<CallRequest | null>(null);

  useEffect(() => {
    setRequest(readSubmittedCallRequest());
  }, []);

  return (
    <>
      <PlanningHeader />
      <main className="min-h-[calc(100vh-64px)] bg-background px-4 py-10 md:px-6 md:py-14">
        <div className="mx-auto w-full max-w-5xl space-y-6">
          <Card className="overflow-hidden border-[color-mix(in_srgb,var(--color-border)_88%,transparent)] bg-[color-mix(in_srgb,var(--color-surface)_94%,var(--color-bg))] shadow-[var(--shadow-soft)]">
            <img
              src={proxiedImageUrl(thanksImage)}
              alt="Coastal horizon in Sri Lanka"
              className="h-40 w-full object-cover object-center md:h-48"
              loading="lazy"
            />
            <CardHeader className="space-y-3">
              <CardTitle className="type-section font-serif">Your call request is with us</CardTitle>
              <CardDescription className="type-body text-[var(--color-text-secondary)]">
                Thank you. We’ll reach out personally to arrange a suitable time for your call.
              </CardDescription>
            </CardHeader>
          </Card>

          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <Card className="border-[color-mix(in_srgb,var(--color-border)_88%,transparent)] bg-[color-mix(in_srgb,var(--color-surface)_94%,var(--color-bg))] shadow-[var(--shadow-soft)]">
              <CardHeader>
                <CardTitle className="type-subheading font-serif">Call request summary</CardTitle>
                <CardDescription className="type-meta text-[var(--color-text-muted)]">
                  Here’s what we’ll use to arrange your conversation.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="type-meta text-muted-foreground">Name</p>
                    <p className="type-ui-sm text-foreground">{request?.firstName || "Provided"}</p>
                  </div>
                  <div>
                    <p className="type-meta text-muted-foreground">Email</p>
                    <p className="type-ui-sm text-foreground">{request?.email || "Provided"}</p>
                  </div>
                  <div>
                    <p className="type-meta text-muted-foreground">Country</p>
                    <p className="type-ui-sm text-foreground">
                      {request?.country ? countryLabels[request.country] || request.country : "Provided"}
                    </p>
                  </div>
                  <div>
                    <p className="type-meta text-muted-foreground">Phone / WhatsApp</p>
                    <p className="type-ui-sm text-foreground">{request?.phone || "Provided"}</p>
                  </div>
                  <div>
                    <p className="type-meta text-muted-foreground">Preferred contact method</p>
                    <p className="type-ui-sm text-foreground">
                      {request?.preferredMethod ? methodLabels[request.preferredMethod] : "Provided"}
                    </p>
                  </div>
                  <div>
                    <p className="type-meta text-muted-foreground">Preferred timing</p>
                    <p className="type-ui-sm text-foreground">
                      {request?.preferredTiming ? timingLabels[request.preferredTiming] : "Provided"}
                    </p>
                  </div>
                  <div className="sm:col-span-2">
                    <p className="type-meta text-muted-foreground">Notes</p>
                    <p className="type-ui-sm text-foreground">{request?.notes?.trim() || "No extra notes shared."}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-[color-mix(in_srgb,var(--color-border)_88%,transparent)] bg-[color-mix(in_srgb,var(--color-surface)_94%,var(--color-bg))] shadow-[var(--shadow-soft)]">
              <CardHeader>
                <CardTitle className="type-subheading font-serif">What happens next</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div>
                  <p className="type-ui-sm text-foreground">1. Personal review</p>
                  <p className="type-meta text-muted-foreground">We review your request and preferred contact timing.</p>
                </div>
                <div>
                  <p className="type-ui-sm text-foreground">2. We reach out</p>
                  <p className="type-meta text-muted-foreground">We’ll contact you personally to arrange a suitable time.</p>
                </div>
                <div>
                  <p className="type-ui-sm text-foreground">3. Next-step guidance</p>
                  <p className="type-meta text-muted-foreground">From there, we’ll help shape the right next step for your journey.</p>
                </div>
                <p className="type-ui-sm text-[var(--color-text-secondary)]">
                  If a tailored proposal makes more sense after the call, we’ll guide that too.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-3 text-center">
            <Button asChild variant="outline">
              <Link href="/">Return to Luna Voyages</Link>
            </Button>
            <p className="type-ui-sm text-[var(--color-text-muted)]">
              Prefer to share your preferences first?{" "}
              <Link href="/plan/journey" className="text-[var(--color-brand)] underline underline-offset-4">
                Start planning instead
              </Link>
            </p>
          </div>
        </div>
      </main>
      <PlanningMicroFooter />
    </>
  );
}
