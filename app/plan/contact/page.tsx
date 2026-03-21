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
import { usePlanning } from "@/components/planning-context";
import { writeSubmittedPlanningRequest } from "@/lib/planning-draft";

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

function nightsLabel(nights: string) {
  if (!nights) return "Not provided";
  if (nights === "not-sure") return "Not sure yet";
  if (/^\d+$/.test(nights)) return `${nights} nights`;
  return `${nights} nights`;
}

export default function ContactPage() {
  const router = useRouter();
  const { draft, updateDraft, clearDraft } = usePlanning();

  const firstName = draft.firstName;
  const setFirstName = (val: string) => updateDraft({ firstName: val });

  const email = draft.email;
  const setEmail = (val: string) => updateDraft({ email: val });

  const country = draft.country;
  const setCountry = (val: string) => updateDraft({ country: val });

  const phone = draft.phone;
  const setPhone = (val: string) => updateDraft({ phone: val });

  const whatsappOptIn = draft.whatsappOptIn;
  const setWhatsappOptIn = (val: boolean) => updateDraft({ whatsappOptIn: val });

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [showValidation, setShowValidation] = useState(false);

  const emailValid = useMemo(() => /.+@.+\..+/.test(email.trim()), [email]);
  const canSubmit = Boolean(firstName.trim() && emailValid && country);

  const submit = async () => {
    setSubmitError("");
    setShowValidation(true);
    if (!canSubmit) return;

    setSubmitting(true);
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draft),
      });
      if (!response.ok) throw new Error("Submit failed");
      writeSubmittedPlanningRequest(draft);
      clearDraft();
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
      <main className="min-h-[calc(100vh-64px)] bg-[var(--color-bg)] px-4 py-8 md:px-6 md:py-16 lg:py-24">
        <div className="mx-auto w-full max-w-5xl space-y-8 md:space-y-12">
          <ProgressIndicator stage={3} />

          <Card className="plan-step-card">
            <CardHeader className="px-5 pt-6 pb-5 border-b border-[rgba(0,0,0,0.06)] md:px-10 md:pt-10 md:pb-6">
              <CardTitle className="type-subheading font-serif">Your details</CardTitle>
              <CardDescription className="type-body text-[var(--color-text-muted)] font-light mt-2">
                Share your details so we can send your tailored proposal. <br />
                Every request is read by us — not filtered by an algorithm. You'll hear back within 48 hours
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8 px-5 pb-6 md:space-y-10 md:px-10 md:pb-10">
              <div className="flex flex-col gap-12 lg:grid lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
                <div className="flex flex-col gap-8">
                  <div className="space-y-6">
                    <div className="space-y-3">
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

                  <div className="space-y-3">
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

                  <div className="space-y-3">
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

                  <div className="space-y-3">
                    <Label htmlFor="phone">Phone (optional)</Label>
                    <Input
                      id="phone"
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                      placeholder="Include country code"
                    />
                  </div>

                  <div className="rounded-[var(--radius-input)] border border-[rgba(0,0,0,0.08)] bg-white/50 p-3">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="whatsapp-optin"
                        checked={whatsappOptIn}
                        onCheckedChange={(checked) => setWhatsappOptIn(checked === true)}
                      />
                      <Label htmlFor="whatsapp-optin">Contact me via WhatsApp</Label>
                    </div>
                  </div>
                </div>

                {submitError ? <p className="type-ui-sm text-destructive">{submitError}</p> : null}

                  <div className="space-y-4 pt-6 border-t border-[rgba(0,0,0,0.06)]">
                    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <Button variant="outline" size="lg" className="w-full sm:w-auto" onClick={() => router.push("/plan/details")}>
                        Back
                      </Button>
                      <Button size="lg" onClick={submit} disabled={!canSubmit || submitting} className="w-full sm:w-auto">
                        {submitting ? "Sending your request..." : "Request proposal"}
                      </Button>
                    </div>
                  </div>
                </div>

                <aside className="rounded-[var(--radius-card)] border border-[rgba(0,0,0,0.06)] bg-[color-mix(in_srgb,var(--color-bg-alt)_40%,transparent)] p-5 md:p-8">
                  <p className="type-eyebrow mb-6 text-[var(--color-text-secondary)]">Your request</p>
                  <div className="type-meta space-y-5">
                    <div>
                      <p className="type-eyebrow text-[var(--color-text-muted)] mb-1">Timing</p>
                      <p className="type-ui-sm text-foreground">{timeframeLabels[draft.timeframe] || "-"}</p>
                    </div>

                    <div>
                      <p className="type-eyebrow text-[var(--color-text-muted)] mb-1">Dates</p>
                      <p className="type-ui-sm text-foreground">
                        {draft.start && draft.end ? `${draft.start} → ${draft.end}` : "-"}
                      </p>
                    </div>

                    <div>
                      <p className="type-eyebrow text-[var(--color-text-muted)] mb-1">Duration</p>
                      <p className="type-ui-sm text-foreground">{nightsLabel(draft.nights)}</p>
                    </div>

                    <div>
                      <p className="type-eyebrow text-[var(--color-text-muted)] mb-1">Experience</p>
                      <p className="type-ui-sm text-foreground">
                        {draft.styles.map((style) => styleLabels[style] || style).join(", ") || "-"}
                      </p>
                    </div>

                    <div>
                      <p className="type-eyebrow text-[var(--color-text-muted)] mb-1">Highlights</p>
                      <p className="type-ui-sm text-foreground">
                        {[wowLabels[draft.wow], paceLabels[draft.pace]].filter(Boolean).join(" · ") || "-"}
                      </p>
                    </div>

                    <div>
                      <p className="type-eyebrow text-[var(--color-text-muted)] mb-1">Comfort & Occasion</p>
                      <p className="type-ui-sm text-foreground">
                        {[budgetLabels[draft.budget], occasionLabels[draft.occasion]].filter(Boolean).join(" · ") || "-"}
                      </p>
                    </div>

                    <div>
                      <p className="type-eyebrow text-[var(--color-text-muted)] mb-1">Notes</p>
                      <p className="type-ui-sm text-foreground">{draft.notes.trim() || "-"}</p>
                    </div>
                  </div>
                </aside>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center">
            <p className="text-[13px] text-[var(--color-text-muted)]">
              Prefer a quick chat first?{" "}
              <Link
                href="/book-a-call"
                className="underline underline-offset-4 hover:text-[var(--color-text)] transition-colors"
              >
                Book a call
              </Link>
            </p>
          </div>
        </div>
      </main>
      <PlanningMicroFooter />
    </>
  );
}
