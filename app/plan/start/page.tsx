"use client";

import { Suspense, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

type WizardStep = 1 | 2;

type Payload = {
  timeframe: string;
  start: string;
  end: string;
  nights: string;
  styles: string[];
  wow: string;
  pace: string;
  budget: string;
  occasion: string;
  notes: string;
  firstName: string;
  email: string;
  country: string;
  phone: string;
  whatsappOptIn: boolean;
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
  value: "Comfortable",
  mid: "Premium",
  lux: "Exceptional",
};

const occasionLabels: Record<string, string> = {
  honeymoon: "Honeymoon",
  minimoon: "Mini-moon",
  anniversary: "Anniversary escape",
  babymoon: "Baby-moon",
};

function splitStyles(stylesParam: string | null) {
  if (!stylesParam) return [];
  return stylesParam
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function nightsLabel(nights: string) {
  if (!nights) return "Not provided";
  if (nights === "not-sure") return "Not sure yet";
  if (/^\d+$/.test(nights)) return `${nights} nights`;
  return `${nights} nights`;
}

function Wizard() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const brief = useMemo(
    () => ({
      timeframe: searchParams.get("timeframe") || "",
      start: searchParams.get("start") || "",
      end: searchParams.get("end") || "",
      nights: searchParams.get("nights") || "",
      styles: splitStyles(searchParams.get("styles")),
      wow: searchParams.get("wow") || "",
      pace: searchParams.get("pace") || "",
    }),
    [searchParams],
  );

  const [step, setStep] = useState<WizardStep>(1);

  const [budget, setBudget] = useState("");
  const [occasion, setOccasion] = useState("");
  const [notes, setNotes] = useState("");

  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsappOptIn, setWhatsappOptIn] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const emailValid = useMemo(() => /.+@.+\..+/.test(email.trim()), [email]);

  const canStep1Continue = Boolean(budget && occasion);
  const canSubmit = Boolean(firstName.trim() && emailValid && country);

  const payload: Payload = {
    timeframe: brief.timeframe,
    start: brief.start,
    end: brief.end,
    nights: brief.nights,
    styles: brief.styles,
    wow: brief.wow,
    pace: brief.pace,
    budget,
    occasion,
    notes,
    firstName,
    email,
    country,
    phone,
    whatsappOptIn,
  };

  const submit = async () => {
    setSubmitError("");
    setSubmitting(true);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Submit failed");
      router.push("/plan/thanks");
    } catch {
      setSubmitError("We couldn’t submit right now. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-background px-4 py-[var(--section-space-mobile)] md:px-6 md:py-[var(--section-space-desktop)]">
      <div className="mx-auto w-full max-w-4xl space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Your concierge request</CardTitle>
            <CardDescription>Step {step} of 2</CardDescription>
          </CardHeader>
        </Card>

        {step === 1 ? (
          <Card>
            <CardHeader>
              <CardTitle>A few finishing touches</CardTitle>
              <CardDescription>
                This helps us shape options that match your comfort level and occasion.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-[var(--radius-input)] border border-border bg-muted p-4">
                <p className="mb-3 text-sm font-medium text-foreground">Your honeymoon snapshot</p>
                <div className="grid gap-3 text-sm md:grid-cols-2">
                  <div>
                    <p className="text-muted-foreground">When</p>
                    <p className="font-medium text-foreground">
                      {timeframeLabels[brief.timeframe] || "Not provided"}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Dates</p>
                    <p className="font-medium text-foreground">
                      {brief.start && brief.end ? `${brief.start} → ${brief.end}` : "Not provided"}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Trip length</p>
                    <p className="font-medium text-foreground">{nightsLabel(brief.nights)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Styles</p>
                    <div className="mt-1 flex flex-wrap gap-1.5">
                      {brief.styles.length > 0 ? (
                        brief.styles.map((style) => (
                          <Badge key={style} variant="secondary">
                            {styleLabels[style] || style}
                          </Badge>
                        ))
                      ) : (
                        <span className="font-medium text-foreground">Not provided</span>
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Wow moment</p>
                    <p className="font-medium text-foreground">{wowLabels[brief.wow] || "Not provided"}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Vibe</p>
                    <p className="font-medium text-foreground">{paceLabels[brief.pace] || "Not provided"}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Label>What kind of properties would you like us to focus on?</Label>
                <RadioGroup value={budget} onValueChange={setBudget} className="grid gap-2 sm:grid-cols-3">
                  {[
                    { value: "value", label: "Boutique & Comfortable" },
                    { value: "mid", label: "Premium" },
                    { value: "lux", label: "Exceptional" },
                  ].map((option) => (
                    <Label
                      key={option.value}
                      htmlFor={`budget-${option.value}`}
                      className="flex cursor-pointer items-center gap-3 rounded-md border border-input px-3 py-2"
                    >
                      <RadioGroupItem id={`budget-${option.value}`} value={option.value} />
                      {option.label}
                    </Label>
                  ))}
                </RadioGroup>
                <p className="text-xs text-muted-foreground">
                We’ll recommend stays that match this direction
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="occasion">Occasion</Label>
                <Select value={occasion} onValueChange={setOccasion}>
                  <SelectTrigger id="occasion">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="honeymoon">Honeymoon</SelectItem>
                    <SelectItem value="minimoon">Mini-moon</SelectItem>
                    <SelectItem value="anniversary">Anniversary escape</SelectItem>
                    <SelectItem value="babymoon">Baby-moon</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">What would make this unforgettable?</Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                  placeholder="Surprises, must-see places, dietary needs, accessibility, departure city…"
                />
              </div>

              <div className="flex justify-end">
                <Button onClick={() => setStep(2)} disabled={!canStep1Continue}>
                  Continue
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : null}

        {step === 2 ? (
          <Card>
            <CardHeader>
              <CardTitle>Where should we send your proposal?</CardTitle>
              <CardDescription>
                We’ll use this to confirm details and share your tailored options.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid gap-6 md:grid-cols-5">
                <div className="space-y-4 md:col-span-3">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First name</Label>
                    <Input
                      id="first-name"
                      value={firstName}
                      onChange={(event) => setFirstName(event.target.value)}
                      placeholder="Your name"
                      aria-invalid={firstName.trim().length === 0}
                    />
                    {firstName.trim().length === 0 ? (
                      <p className="text-xs text-destructive">Please add your name.</p>
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
                      aria-invalid={!emailValid}
                    />
                    {!emailValid ? (
                      <p className="text-xs text-destructive">Please add a valid email.</p>
                    ) : null}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Select value={country} onValueChange={setCountry}>
                      <SelectTrigger id="country" aria-invalid={!country}>
                        <SelectValue placeholder="Select" />
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

                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="whatsapp-optin"
                      checked={whatsappOptIn}
                      onCheckedChange={(checked) => setWhatsappOptIn(checked === true)}
                    />
                    <Label htmlFor="whatsapp-optin">Yes, you can contact me on WhatsApp</Label>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <div className="rounded-[var(--radius-input)] border border-border bg-muted p-4">
                    <p className="mb-3 text-sm font-medium text-foreground">Review your request</p>
                    <div className="space-y-2 text-sm">
                      <p className="text-muted-foreground">When</p>
                      <p className="font-medium text-foreground">{timeframeLabels[payload.timeframe] || "-"}</p>

                      <p className="text-muted-foreground">Dates</p>
                      <p className="font-medium text-foreground">
                        {payload.start && payload.end ? `${payload.start} → ${payload.end}` : "-"}
                      </p>

                      <p className="text-muted-foreground">Trip length</p>
                      <p className="font-medium text-foreground">{nightsLabel(payload.nights)}</p>

                      <p className="text-muted-foreground">Styles</p>
                      <p className="font-medium text-foreground">
                        {payload.styles.map((style) => styleLabels[style] || style).join(", ") || "-"}
                      </p>

                      <p className="text-muted-foreground">Wow + vibe</p>
                      <p className="font-medium text-foreground">
                        {[wowLabels[payload.wow], paceLabels[payload.pace]].filter(Boolean).join(" · ") || "-"}
                      </p>

                      <p className="text-muted-foreground">Comfort + occasion</p>
                      <p className="font-medium text-foreground">
                        {[budgetLabels[payload.budget], occasionLabels[payload.occasion]].filter(Boolean).join(" · ") || "-"}
                      </p>

                      <p className="text-muted-foreground">Contact</p>
                      <p className="font-medium text-foreground">
                        {[payload.firstName, payload.email, payload.country].filter(Boolean).join(" · ") || "-"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {submitError ? <p className="text-sm text-destructive">{submitError}</p> : null}

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button onClick={submit} disabled={!canSubmit || submitting}>
                  {submitting ? "Submitting..." : "Request my proposal"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : null}

        <div>
          <Button asChild variant="link" className="px-0 text-muted-foreground">
            <Link href="/">Back to home</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}

export default function PlanStartPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-background px-4 py-[var(--section-space-mobile)] md:px-6 md:py-[var(--section-space-desktop)]">
          <div className="mx-auto w-full max-w-3xl">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Loading request…</CardTitle>
              </CardHeader>
            </Card>
          </div>
        </main>
      }
    >
      <Wizard />
    </Suspense>
  );
}
