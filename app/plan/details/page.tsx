"use client";

import { useRouter } from "next/navigation";

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
import { usePlanning } from "@/components/planning-context";
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
  relaxed: "Light & easy",
  balanced: "A bit of both",
  packed: "Packed with highlights",
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
  const { draft, updateDraft } = usePlanning();
  
  const budget = draft.budget;
  const setBudget = (val: string) => updateDraft({ budget: val });
  
  const occasion = draft.occasion;
  const setOccasion = (val: string) => updateDraft({ occasion: val });
  
  const notes = draft.notes;
  const setNotes = (val: string) => updateDraft({ notes: val });

  const canContinue = Boolean(budget && occasion);

  return (
    <>
      <PlanningHeader />
      <main className="min-h-[calc(100vh-64px)] bg-[var(--color-bg)] px-4 py-8 md:px-6 md:py-16 lg:py-24">
        <div className="mx-auto w-full max-w-5xl space-y-8 md:space-y-12">
          <ProgressIndicator stage={2} />

          <Card className="plan-step-card overflow-hidden">
            <div className="relative h-32 md:h-48 lg:h-56 w-full">
              <img
                src={proxiedImageUrl(detailsImage)}
                alt="Soft interior scene for journey details"
                className="h-full w-full object-cover object-center"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(28,23,21,0.4)_0%,rgba(28,23,21,0.1)_100%)]" />
            </div>
            <CardHeader className="px-5 pt-6 pb-5 md:px-10 md:pt-10 md:pb-6">
              <CardTitle className="type-subheading font-serif">Refining your journey</CardTitle>
              <CardDescription className="type-body text-[var(--color-text-muted)] font-light mt-2 max-w-[50ch]">
                Help us understand your preferred level of comfort and the occasion.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8 px-5 pb-6 md:space-y-10 md:px-10 md:pb-10">
              {/* Compact Recap Strip */}
              <div className="rounded-[var(--radius-card)] border border-[rgba(0,0,0,0.08)] bg-white/50 px-4 py-4 md:px-5 md:py-4">
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                  <span className="type-eyebrow text-[var(--color-text-muted)]">Your journey:</span>
                  <div className="flex flex-wrap items-center gap-3 type-ui-sm text-[var(--color-text-secondary)]">
                    <span>
                      {draft.timeframe === "pick-dates" && draft.start && draft.end
                        ? `${draft.start} to ${draft.end}`
                        : timeframeLabels[draft.timeframe] || "Dates TBD"}
                    </span>
                    <span className="text-[var(--color-border-strong)]">•</span>
                    <span>{nightsLabel(draft.nights)}</span>
                    <span className="text-[var(--color-border-strong)]">•</span>
                    <span>
                      {draft.styles.length > 0 
                        ? draft.styles.map((style) => styleLabels[style] || style).join(", ")
                        : "Style TBD"}
                    </span>
                    {draft.wow && (
                      <>
                        <span className="text-[var(--color-border-strong)]">•</span>
                        <span>{wowLabels[draft.wow] || draft.wow}</span>
                      </>
                    )}
                    {draft.pace && (
                      <>
                        <span className="text-[var(--color-border-strong)]">•</span>
                        <span>{paceLabels[draft.pace] || draft.pace}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Label>Preferred stay style</Label>
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
                      className={`flex min-h-[84px] cursor-pointer flex-col items-start gap-1 rounded-[var(--radius-input)] border px-4 py-4 transition-colors sm:min-h-[100px] ${
                        budget === option.value
                          ? "border-[var(--color-brand)] bg-[color-mix(in_srgb,var(--color-bg-alt)_62%,var(--color-surface))]"
                          : "border-[rgba(0,0,0,0.08)] bg-white/50 hover:bg-white/80"
                      }`}
                    >
                      <div className="flex w-full items-center justify-between gap-3">
                        <p className="type-ui-sm text-foreground">{option.label}</p>
                        <RadioGroupItem id={`budget-${option.value}`} value={option.value} />
                      </div>
                      <p className="text-[12px] leading-[1.4] text-[var(--color-text-muted)] font-normal">{option.description}</p>
                    </Label>
                  ))}
                </RadioGroup>
              </div>

              <div className="space-y-3">
                <Label htmlFor="occasion">What are you celebrating?</Label>
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
                <Label htmlFor="notes">Any personal notes or special requests?</Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                  placeholder="Dietary requirements, must-see places, or anything else we should know..."
                  className="min-h-[140px]"
                />
              </div>

              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between pt-6 border-t border-[rgba(0,0,0,0.06)]">
                <Button variant="outline" size="lg" className="w-full sm:w-auto" onClick={() => router.push("/plan/journey")}>
                  Back
                </Button>
                <Button
                  size="lg"
                  className="w-full sm:w-auto"
                  onClick={() => {
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
