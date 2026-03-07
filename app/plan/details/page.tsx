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

          <Card className="border-border bg-[var(--color-surface)]">
            <CardHeader>
              <CardTitle className="type-subheading font-serif">A few final details</CardTitle>
              <CardDescription className="type-body text-muted-foreground">
                This helps us shape options that match your comfort level and occasion.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-7">
              <div className="rounded-[var(--radius-form)] border border-border bg-[var(--color-bg)] p-5">
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
                <RadioGroup value={budget} onValueChange={setBudget} className="grid gap-2 sm:grid-cols-3">
                  {[
                    { value: "value", label: "Boutique & Comfortable" },
                    { value: "mid", label: "Premium" },
                    { value: "lux", label: "Exceptional" },
                  ].map((option) => (
                    <Label
                      key={option.value}
                      htmlFor={`budget-${option.value}`}
                      className="flex cursor-pointer items-center gap-3 rounded-[var(--radius-input)] border border-input bg-background px-3 py-3"
                    >
                      <RadioGroupItem id={`budget-${option.value}`} value={option.value} />
                      {option.label}
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
