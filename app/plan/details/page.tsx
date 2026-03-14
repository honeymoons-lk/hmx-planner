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
      <main className="min-h-[calc(100vh-64px)] bg-[var(--color-bg)] px-4 py-16 md:px-6 md:py-24">
        <div className="mx-auto w-full max-w-5xl space-y-12">
          <ProgressIndicator stage={2} />

          <Card className="overflow-hidden border border-[color-mix(in_srgb,var(--color-border)_88%,transparent)] bg-[color-mix(in_srgb,var(--color-surface)_92%,var(--color-bg))] shadow-sm">
            <div className="relative h-44 overflow-hidden md:h-64">
              <img
                src={proxiedImageUrl(detailsImage)}
                alt="Soft interior scene for journey details"
                className="h-full w-full object-cover object-center"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(28,23,21,0.6)_0%,rgba(28,23,21,0.2)_44%,rgba(28,23,21,0.06)_100%)]" />
              <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-8">
                <p className="type-eyebrow text-[color-mix(in_srgb,var(--color-light)_88%,var(--color-bg-alt))] mb-3">
                  Tailoring the journey
                </p>
                <p className="max-w-[42ch] font-serif text-[clamp(24px,3vw,34px)] leading-[1.1] text-[color-mix(in_srgb,var(--color-light)_95%,var(--color-bg-alt))]">
                  Thoughtful choices that shape the tone, comfort, and rhythm of your honeymoon.
                </p>
              </div>
            </div>
            <CardHeader className="px-8 pt-8 pb-6 border-b border-[rgba(0,0,0,0.06)]">
              <CardTitle className="type-subheading font-serif">A few final details</CardTitle>
              <CardDescription className="type-body text-[var(--color-text-muted)] font-light mt-2">
                This helps us shape options that match your comfort level and occasion.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-10 px-8 py-8">
              <div className="rounded-[8px] border border-[rgba(0,0,0,0.08)] bg-white/50 p-6 md:p-8">
                <p className="type-eyebrow mb-6 text-[var(--color-text-secondary)]">Your honeymoon snapshot</p>
                <div className="type-meta grid gap-6 md:grid-cols-2">
                  <div>
                    <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-[var(--color-text-muted)] mb-1">When</p>
                    <p className="type-ui-sm text-foreground">{timeframeLabels[draft.timeframe] || "Not provided"}</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-[var(--color-text-muted)] mb-1">Dates</p>
                    <p className="type-ui-sm text-foreground">
                      {draft.start && draft.end ? `${draft.start} → ${draft.end}` : "Not provided"}
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-[var(--color-text-muted)] mb-1">Trip length</p>
                    <p className="type-ui-sm text-foreground">{nightsLabel(draft.nights)}</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-[var(--color-text-muted)] mb-2">Styles</p>
                    <div className="flex flex-wrap gap-2">
                      {draft.styles.length > 0 ? (
                        draft.styles.map((style) => (
                          <Badge key={style} variant="default">
                            {styleLabels[style] || style}
                          </Badge>
                        ))
                      ) : (
                        <span className="type-ui-sm text-foreground">Not provided</span>
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-[var(--color-text-muted)] mb-1">Wow moment</p>
                    <p className="type-ui-sm text-foreground">{wowLabels[draft.wow] || "Not provided"}</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-[var(--color-text-muted)] mb-1">Day-flow vibe</p>
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
                      className={`flex min-h-[120px] cursor-pointer flex-col items-start gap-2 rounded-[8px] border px-4 py-4 transition-colors ${
                        budget === option.value
                          ? "border-[var(--color-brand)] bg-[color-mix(in_srgb,var(--color-bg-alt)_62%,var(--color-surface))]"
                          : "border-[rgba(0,0,0,0.08)] bg-white/50 hover:bg-white/80"
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

              <div className="space-y-3">
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

              <div className="space-y-3">
                <Label htmlFor="notes">Anything that would make this feel personal?</Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                  placeholder="Surprises, must-see places, dietary needs, accessibility, departure city…"
                />
              </div>

              <div className="flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between pt-4">
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
