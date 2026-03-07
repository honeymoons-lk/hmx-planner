"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
import { PlanningHeader, PlanningMicroFooter } from "@/components/plan/planning-chrome";
import { ProgressIndicator } from "@/components/plan/progress-indicator";
import { readPlanningDraft, writePlanningDraft } from "@/lib/planning-draft";
import { proxiedImageUrl } from "@/lib/media";

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

function nightsLabel(nights: string) {
  if (!nights) return "Not provided";
  if (nights === "not-sure") return "Not sure yet";
  if (/^\d+$/.test(nights)) return `${nights} nights`;
  return `${nights} nights`;
}

const detailsImage =
  "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1800&q=80";

export default function DetailsPage() {
  const router = useRouter();
  const draft = useMemo(() => readPlanningDraft(), []);
  const [budget, setBudget] = useState(draft.budget);
  const [occasion, setOccasion] = useState(draft.occasion);
  const [notes, setNotes] = useState(draft.notes);

  const canContinue = Boolean(budget && occasion);

  return (
    <>
      <PlanningHeader />
      <main className="min-h-[calc(100vh-64px)] bg-background px-4 py-10 md:px-6 md:py-14">
        <div className="mx-auto w-full max-w-5xl space-y-6">
          <ProgressIndicator stage={2} />

          <Card className="overflow-hidden border-[color-mix(in_srgb,var(--color-border)_88%,transparent)] bg-[color-mix(in_srgb,var(--color-surface)_92%,var(--color-bg))] shadow-[var(--shadow-soft)]">
            <div className="relative h-44 overflow-hidden md:h-56">
              <img
                src={proxiedImageUrl(detailsImage)}
                alt="Soft interior scene for journey details"
                className="h-full w-full object-cover object-center"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(28,23,21,0.54)_0%,rgba(28,23,21,0.18)_44%,rgba(28,23,21,0.06)_100%)]" />
              <div className="absolute bottom-5 left-5 right-5 md:bottom-7 md:left-7 md:right-7">
                <p className="type-eyebrow text-[color-mix(in_srgb,var(--color-light)_88%,var(--color-bg-alt))]">
                  Tailoring the journey
                </p>
                <p className="mt-2 max-w-[42ch] font-serif text-[clamp(22px,2.4vw,30px)] leading-[1.2] text-[color-mix(in_srgb,var(--color-light)_95%,var(--color-bg-alt))]">
                  Thoughtful choices that shape the tone, comfort, and rhythm of your honeymoon.
                </p>
              </div>
            </div>
            <CardHeader>
              <CardTitle className="type-subheading font-serif">A few final details</CardTitle>
              <CardDescription className="type-body text-muted-foreground">
                This helps us shape options that match your comfort level and occasion.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-7">
              <div className="rounded-[var(--radius-form)] border border-[color-mix(in_srgb,var(--color-border)_82%,transparent)] bg-[color-mix(in_srgb,var(--color-bg)_78%,var(--color-surface))] p-5 md:p-6">
                <p className="type-ui-sm mb-3 text-foreground">Your honeymoon snapshot</p>
                <div className="type-meta grid gap-3 md:grid-cols-2">
                  <div>
                    <p className="text-muted-foreground">When</p>
                    <p className="type-ui-sm text-foreground">{timeframeLabels[draft.timeframe] || "Not provided"}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Dates</p>
                    <p className="type-ui-sm text-foreground">
                      {draft.start && draft.end ? `${draft.start} → ${draft.end}` : "Not provided"}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Trip length</p>
                    <p className="type-ui-sm text-foreground">{nightsLabel(draft.nights)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Styles</p>
                    <div className="mt-1 flex flex-wrap gap-1.5">
                      {draft.styles.length > 0 ? (
                        draft.styles.map((style) => (
                          <Badge key={style} variant="secondary">
                            {styleLabels[style] || style}
                          </Badge>
                        ))
                      ) : (
                        <span className="type-ui-sm text-foreground">Not provided</span>
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Wow moment</p>
                    <p className="type-ui-sm text-foreground">{wowLabels[draft.wow] || "Not provided"}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Day-flow vibe</p>
                    <p className="type-ui-sm text-foreground">{paceLabels[draft.pace] || "Not provided"}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Label>Property comfort / stay tier</Label>
                <RadioGroup value={budget} onValueChange={setBudget} className="grid gap-3 sm:grid-cols-3">
                  {[
                    {
                      value: "value",
                      label: "Boutique & Comfortable",
                      description: "intimate, beautiful, thoughtfully chosen",
                    },
                    {
                      value: "mid",
                      label: "Premium",
                      description: "refined stays with elevated comfort",
                    },
                    {
                      value: "lux",
                      label: "Exceptional",
                      description: "standout properties and signature settings",
                    },
                  ].map((option) => (
                    <Label
                      key={option.value}
                      htmlFor={`budget-${option.value}`}
                      className={`flex min-h-[120px] cursor-pointer flex-col items-start gap-2 rounded-[var(--radius-form)] border px-4 py-4 transition-colors ${
                        budget === option.value
                          ? "border-[var(--color-brand)] bg-[color-mix(in_srgb,var(--color-bg-alt)_62%,var(--color-surface))]"
                          : "border-input bg-background hover:bg-[color-mix(in_srgb,var(--color-bg-alt)_40%,var(--color-surface))]"
                      }`}
                    >
                      <div className="flex w-full items-center justify-between gap-3">
                        <p className="type-ui-sm text-foreground">{option.label}</p>
                        <RadioGroupItem id={`budget-${option.value}`} value={option.value} />
                      </div>
                      <p className="type-meta text-[var(--color-text-muted)]">{option.description}</p>
                    </Label>
                  ))}
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="occasion">Occasion</Label>
                <Select value={occasion} onValueChange={setOccasion}>
                  <SelectTrigger id="occasion">
                    <SelectValue placeholder="Select occasion" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="honeymoon">Honeymoon</SelectItem>
                    <SelectItem value="babymoon">Babymoon</SelectItem>
                    <SelectItem value="anniversary">Anniversary</SelectItem>
                    <SelectItem value="proposal">Proposal trip</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Anything that would make this feel personal?</Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                  placeholder="Surprises, must-see places, dietary needs, accessibility, departure city…"
                />
              </div>

              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                <Button variant="outline" onClick={() => router.push("/plan/journey")}>
                  Back
                </Button>
                <Button
                  onClick={() => {
                    writePlanningDraft({ budget, occasion, notes });
                    router.push("/plan/contact");
                  }}
                  disabled={!canContinue}
                >
                  Continue
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <PlanningMicroFooter />
    </>
  );
}
