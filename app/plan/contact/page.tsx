"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlanningHeader, PlanningMicroFooter } from "@/components/plan/planning-chrome";
import { ProgressIndicator } from "@/components/plan/progress-indicator";
import {
  clearPlanningDraft,
  readPlanningDraft,
  writePlanningDraft,
  writeSubmittedPlanningRequest,
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

function nightsLabel(nights: string) {
  if (!nights) return "Not provided";
  if (nights === "not-sure") return "Not sure yet";
  if (/^\d+$/.test(nights)) return `${nights} nights`;
  return `${nights} nights`;
}

export default function ContactPage() {
  const router = useRouter();
  const draft = useMemo(() => readPlanningDraft(), []);

  const [firstName, setFirstName] = useState(draft.firstName);
  const [email, setEmail] = useState(draft.email);
  const [country, setCountry] = useState(draft.country);
  const [phone, setPhone] = useState(draft.phone);
  const [whatsappOptIn, setWhatsappOptIn] = useState(draft.whatsappOptIn);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [showValidation, setShowValidation] = useState(false);

  const emailValid = useMemo(() => /.+@.+\..+/.test(email.trim()), [email]);
  const canSubmit = Boolean(firstName.trim() && emailValid && country);

  const submit = async () => {
    setSubmitError("");
    setShowValidation(true);
    if (!canSubmit) return;

    const payload = writePlanningDraft({ firstName, email, country, phone, whatsappOptIn });
    setSubmitting(true);
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("Submit failed");
      writeSubmittedPlanningRequest(payload);
      clearPlanningDraft();
      router.push("/plan/thank-you");
    } catch {
      setSubmitError("We couldn’t submit right now. Please try again in a moment.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <PlanningHeader />
      <main className="min-h-[calc(100vh-64px)] bg-background px-4 py-10 md:px-6 md:py-14">
        <div className="mx-auto w-full max-w-5xl space-y-6">
          <ProgressIndicator stage={3} />

          <Card className="border-border bg-[var(--color-surface)]">
            <CardHeader>
              <CardTitle className="type-subheading font-serif">Contact and review</CardTitle>
              <CardDescription className="type-body text-muted-foreground">
                We&apos;re almost there. Share your contact details and send your request.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First name</Label>
                    <Input
                      id="first-name"
                      value={firstName}
                      onChange={(event) => setFirstName(event.target.value)}
                      placeholder="Your first name"
                      aria-invalid={showValidation && firstName.trim().length === 0}
                    />
                    {showValidation && firstName.trim().length === 0 ? (
                      <p className="type-ui-sm text-muted-foreground">Please add your first name.</p>
                    ) : null}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="name@email.com"
                      aria-invalid={showValidation && !emailValid}
                    />
                    {showValidation && !emailValid ? (
                      <p className="type-ui-sm text-muted-foreground">Please add a valid email.</p>
                    ) : null}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Select value={country} onValueChange={setCountry}>
                      <SelectTrigger id="country" aria-invalid={showValidation && !country}>
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="au">Australia</SelectItem>
                        <SelectItem value="nz">New Zealand</SelectItem>
                        <SelectItem value="uk">United Kingdom</SelectItem>
                        <SelectItem value="us">United States</SelectItem>
                        <SelectItem value="eu">Europe</SelectItem>
                        <SelectItem value="sg">Singapore</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {showValidation && !country ? (
                      <p className="type-ui-sm text-muted-foreground">Please select your country.</p>
                    ) : null}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone (optional)</Label>
                    <Input
                      id="phone"
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                      placeholder="Include country code"
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <Checkbox
                      id="whatsapp-optin"
                      checked={whatsappOptIn}
                      onCheckedChange={(checked) => setWhatsappOptIn(checked === true)}
                    />
                    <Label htmlFor="whatsapp-optin">You may contact me on WhatsApp</Label>
                  </div>
                </div>

                <aside className="rounded-[var(--radius-form)] border border-border bg-[var(--color-bg)] p-5">
                  <p className="type-ui-sm mb-3 text-foreground">Review your request</p>
                  <div className="type-meta space-y-2">
                    <p className="text-muted-foreground">When</p>
                    <p className="type-ui-sm text-foreground">{timeframeLabels[draft.timeframe] || "-"}</p>

                    <p className="text-muted-foreground">Dates</p>
                    <p className="type-ui-sm text-foreground">
                      {draft.start && draft.end ? `${draft.start} → ${draft.end}` : "-"}
                    </p>

                    <p className="text-muted-foreground">Trip length</p>
                    <p className="type-ui-sm text-foreground">{nightsLabel(draft.nights)}</p>

                    <p className="text-muted-foreground">Styles</p>
                    <p className="type-ui-sm text-foreground">
                      {draft.styles.map((style) => styleLabels[style] || style).join(", ") || "-"}
                    </p>

                    <p className="text-muted-foreground">Wow + vibe</p>
                    <p className="type-ui-sm text-foreground">
                      {[wowLabels[draft.wow], paceLabels[draft.pace]].filter(Boolean).join(" · ") || "-"}
                    </p>

                    <p className="text-muted-foreground">Comfort + occasion</p>
                    <p className="type-ui-sm text-foreground">
                      {[budgetLabels[draft.budget], occasionLabels[draft.occasion]].filter(Boolean).join(" · ") || "-"}
                    </p>

                    <p className="text-muted-foreground">Contact notes</p>
                    <p className="type-ui-sm text-foreground">{draft.notes.trim() || "-"}</p>
                  </div>
                </aside>
              </div>

              {submitError ? <p className="type-ui-sm text-muted-foreground">{submitError}</p> : null}

              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                <Button variant="outline" onClick={() => router.push("/plan/details")}>
                  Back
                </Button>
                <Button onClick={submit} disabled={!canSubmit || submitting}>
                  {submitting ? "Sending your request..." : "Request my proposal"}
                </Button>
              </div>
            </CardContent>
          </Card>

          <p className="type-ui-sm text-center text-muted-foreground">
            Prefer a quick chat first?{" "}
            <Link href="/plan/contact" className="font-medium text-foreground underline underline-offset-4">
              Book a call
            </Link>
          </p>
        </div>
      </main>
      <PlanningMicroFooter />
    </>
  );
}
