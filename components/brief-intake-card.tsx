"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CalendarDays, Check, ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar, type DateRange } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { usePlanning } from "@/components/planning-context";
import { cn } from "@/lib/utils";

type BriefIntakeCardProps = {
  id?: string;
  className?: string;
  title?: string;
  description?: string;
  mode?: "full" | "starter";
};

const dateLabelFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

function formatDateLabel(date: Date) {
  return dateLabelFormatter.format(date);
}

function toISODate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function differenceInDays(from: Date, to: Date) {
  const start = new Date(from.getFullYear(), from.getMonth(), from.getDate()).getTime();
  const end = new Date(to.getFullYear(), to.getMonth(), to.getDate()).getTime();
  return Math.max(1, Math.round((end - start) / (1000 * 60 * 60 * 24)));
}

const formContent = {
  timeframeOptions: [
    { value: "next-3-months", label: "Next 3 months" },
    { value: "3-6-months", label: "3–6 months" },
    { value: "6-12-months", label: "6–12 months" },
    { value: "pick-dates", label: "I know my dates" },
    { value: "not-sure", label: "Not sure yet" },
  ],
  starterTimeframeOptions: [
    { value: "next-3-months", label: "Next 3 months" },
    { value: "3-6-months", label: "3–6 months" },
    { value: "6-12-months", label: "6–12 months" },
    { value: "pick-dates", label: "I know my dates" },
    { value: "not-sure", label: "Not sure yet" },
  ],
  nights: [
    { value: "5-7", label: "5–7 nights" },
    { value: "8-10", label: "8–10 nights" },
    { value: "11-14", label: "11–14 nights" },
    { value: "not-sure", label: "Not sure yet" },
  ],
  styleOptions: [
    { value: "luxury", label: "Elevated & indulgent" },
    { value: "beach", label: "Beach & slow mornings" },
    { value: "adventure", label: "Nature & soft adventure" },
    { value: "culture", label: "Culture & boutique charm" },
  ],
  wowOptions: [
    { value: "private-dinner", label: "Private cliffside dinner" },
    { value: "safari", label: "Sunrise safari experience" },
    { value: "scenic-train", label: "Scenic train through tea country" },
    { value: "beach-villa", label: "Secluded beach villa stay" },
  ],
  paceOptions: [
    { value: "relaxed", label: "Light & easy" },
    { value: "balanced", label: "A bit of both" },
    { value: "packed", label: "Packed with highlights" },
  ],
  reassurance: "Takes about 60 seconds. You'll hear from us within 48 hours.",
};

export function BriefIntakeCard({
  id,
  className,
  title,
  description,
  mode = "full",
}: BriefIntakeCardProps) {
  const router = useRouter();
  const isStarter = mode === "starter";
  const { draft, updateDraft } = usePlanning();

  const timeframe = draft.timeframe;
  const setTimeframe = (val: string) => updateDraft({ timeframe: val });

  const dateRange = useMemo<DateRange | undefined>(() => {
    if (!draft.start && !draft.end) return undefined;
    return {
      from: draft.start ? new Date(`${draft.start}T00:00:00`) : undefined,
      to: draft.end ? new Date(`${draft.end}T00:00:00`) : undefined,
    };
  }, [draft.start, draft.end]);

  const setDateRange = (range: DateRange | undefined) => {
    updateDraft({
      start: range?.from ? toISODate(range.from) : "",
      end: range?.to ? toISODate(range.to) : "",
    });
  };

  const nights = draft.nights;
  const setNights = (val: string) => updateDraft({ nights: val });

  const styles = draft.styles;
  const setStyles = (val: string[] | ((prev: string[]) => string[])) => {
    if (typeof val === "function") {
      updateDraft({ styles: val(styles) });
    } else {
      updateDraft({ styles: val });
    }
  };

  const [styleSearch, setStyleSearch] = useState("");
  const [stylePopoverOpen, setStylePopoverOpen] = useState(false);
  
  const pace = draft.pace;
  const setPace = (val: string) => updateDraft({ pace: val });

  const wow = draft.wow;
  const setWow = (val: string) => updateDraft({ wow: val });

  const calculatedNights = useMemo(() => {
    if (timeframe !== "pick-dates") return null;
    if (!dateRange?.from || !dateRange?.to) return null;
    return differenceInDays(dateRange.from, dateRange.to);
  }, [dateRange, timeframe]);

  const selectedNightsValue = timeframe === "pick-dates" ? (calculatedNights ? String(calculatedNights) : "") : nights;
  const selectedStyle = styles[0] ?? "";
  const resolvedTitle =
    title ?? (isStarter ? "Start your honeymoon plan" : "Tell us about your journey");
  const resolvedDescription =
    description ??
    (isStarter
      ? "A few quick choices to shape your route and stay style."
      : "A few choices to help us shape your route and stay style.");

  const canSubmitBrief = useMemo(() => {
    if (isStarter) {
      const hasTimeframeAndStyles = Boolean(timeframe && styles.length > 0);
      if (!hasTimeframeAndStyles) return false;
      if (timeframe === "pick-dates") {
        return Boolean(dateRange?.from && dateRange?.to && calculatedNights);
      }
      return Boolean(nights);
    }

    const hasPrimaryFields = Boolean(timeframe && styles.length > 0 && wow && pace);
    if (!hasPrimaryFields) return false;
    if (timeframe === "pick-dates") {
      return Boolean(dateRange?.from && dateRange?.to && calculatedNights);
    }
    return Boolean(nights);
  }, [calculatedNights, dateRange?.from, dateRange?.to, isStarter, nights, pace, styles.length, timeframe, wow]);

  const filteredStyleOptions = useMemo(() => {
    const query = styleSearch.trim().toLowerCase();
    if (!query) return formContent.styleOptions;
    return formContent.styleOptions.filter((styleOption) => styleOption.label.toLowerCase().includes(query));
  }, [styleSearch]);

  const toggleStyle = (value: string) => {
    setStyles((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]));
  };

  const handleSubmitBrief = () => {
    const updates: Partial<typeof draft> = {
      timeframe,
      nights: selectedNightsValue,
      styles,
      start: timeframe === "pick-dates" && dateRange?.from ? toISODate(dateRange.from) : "",
      end: timeframe === "pick-dates" && dateRange?.to ? toISODate(dateRange.to) : "",
    };

    if (!isStarter) {
      updates.wow = wow;
      updates.pace = pace;
    }

    updateDraft(updates);

    if (isStarter) {
      router.push("/plan/journey");
    } else {
      router.push("/plan/details");
    }
  };

  return (
    <Card id={id} className={cn(isStarter ? "bg-[rgba(247,241,234,0.95)] backdrop-blur-md rounded-[8px] border border-[rgba(255,255,255,0.4)] shadow-[0_16px_40px_rgba(14,11,10,0.06)]" : "plan-step-card", className)}>
      <CardHeader className={cn("px-5 md:px-8", isStarter ? "space-y-1.5 pt-7 pb-0" : "space-y-3 pt-6 pb-2 md:pt-8")}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="type-eyebrow text-[var(--color-brand)]">
            {isStarter ? "Planning Starter" : "Personal Planning Brief"}
          </span>
          <span className="type-meta text-[var(--color-text-muted)] italic">
            {isStarter ? "Takes ~60 seconds" : "Takes ~60 seconds"}
          </span>
        </div>
        <CardTitle className={cn("font-serif tracking-tight text-[var(--color-text)]", isStarter ? "text-[24px] leading-[1.1]" : "type-subheading")}>
          {resolvedTitle}
        </CardTitle>
        <CardDescription className={cn("font-light", isStarter ? "text-[13.5px] leading-relaxed text-[var(--color-text-muted)]" : "type-body text-[var(--color-text-muted)] mt-2")}>
          {resolvedDescription}
        </CardDescription>
      </CardHeader>

      <CardContent className={cn("px-5 md:px-8", isStarter ? "space-y-4 pt-4 pb-7" : "space-y-5 pt-4 pb-6 md:pb-8")}>
        <div className={cn(isStarter ? "space-y-2" : "space-y-3")}>
          <Label htmlFor="timeframe">When are you planning to travel?</Label>
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger id="timeframe" className="w-full">
              <SelectValue placeholder="Choose a timeframe" />
            </SelectTrigger>
            <SelectContent>
              {(isStarter ? formContent.starterTimeframeOptions : formContent.timeframeOptions).map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {timeframe === "pick-dates" ? (
          <div className="space-y-3">
            <Label>Travel dates</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarDays className="mr-3 h-4 w-4 text-[var(--color-text-muted)]" />
                  {dateRange?.from && dateRange?.to
                    ? `${formatDateLabel(dateRange.from)} – ${formatDateLabel(dateRange.to)}`
                    : dateRange?.from
                      ? "Select return date"
                      : "Select your dates"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full min-w-[280px] p-3" align="start">
                <Calendar mode="range" selected={dateRange} onSelect={setDateRange} />
              </PopoverContent>
            </Popover>

            {calculatedNights ? (
              <p className="type-meta text-[var(--color-text-muted)] italic">
                Trip length: {calculatedNights} night{calculatedNights > 1 ? "s" : ""} (auto-calculated)
              </p>
            ) : (
              <p className="type-meta text-[var(--color-text-muted)] italic">Select return date</p>
            )}
          </div>
        ) : (
          <div className={cn(isStarter ? "space-y-2" : "space-y-3")}>
            <Label htmlFor="nights">{isStarter ? "Stay length" : "Nights"}</Label>
            <Select value={nights} onValueChange={setNights}>
              <SelectTrigger id="nights" className="w-full">
                <SelectValue placeholder={isStarter ? "Choose a stay length" : "Choose stay length"} />
              </SelectTrigger>
              <SelectContent>
                {formContent.nights.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <div className={cn(isStarter ? "space-y-2" : "space-y-3")}>
          <Label>{isStarter ? "Experience type" : "What kind of experience are you looking for?"}</Label>
          {isStarter ? (
            <Select
              value={selectedStyle}
              onValueChange={(value) => setStyles(value ? [value] : [])}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose the overall feel" />
              </SelectTrigger>
              <SelectContent>
                {formContent.styleOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <Popover open={stylePopoverOpen} onOpenChange={setStylePopoverOpen}>
              <PopoverTrigger asChild>
                <Button type="button" variant="outline" className="w-full min-h-14 h-auto justify-between py-3">
                  <span className="mr-3 flex flex-wrap gap-2 text-left">
                    {styles.length > 0 ? (
                      styles.map((value) => {
                        const label = formContent.styleOptions.find((item) => item.value === value)?.label ?? value;
                        return (
                          <span
                            key={value}
                            className="inline-flex items-center justify-center rounded-[4px] border border-[color-mix(in_srgb,var(--color-border-strong)_40%,transparent)] bg-[var(--color-surface-strong)] px-2.5 py-1 text-[13px] leading-[1.35] font-medium text-[var(--color-text-secondary)]"
                          >
                            {label}
                          </span>
                        );
                      })
                    ) : (
                      <span className="text-[var(--color-text-muted)] font-normal">Choose one or more</span>
                    )}
                  </span>
                  <ChevronDown className="h-4 w-4 shrink-0 text-[var(--color-text-muted)]" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[320px] p-0" align="start">
                <Command>
                  <CommandInput placeholder="Search styles..." value={styleSearch} onChange={(event) => setStyleSearch(event.target.value)} />
                  <CommandList>
                    {filteredStyleOptions.length === 0 ? (
                      <CommandEmpty>No styles found.</CommandEmpty>
                    ) : (
                      <CommandGroup>
                        {filteredStyleOptions.map((opt) => {
                          const isSelected = styles.includes(opt.value);
                          return (
                            <CommandItem key={opt.value} onClick={() => toggleStyle(opt.value)}>
                              <span
                                className={`inline-flex h-4 w-4 items-center justify-center rounded-sm border border-border ${
                                  isSelected ? "bg-primary text-primary-foreground" : "bg-background"
                                }`}
                              >
                                {isSelected ? <Check className="h-3 w-3" /> : null}
                              </span>
                              {opt.label}
                            </CommandItem>
                          );
                        })}
                      </CommandGroup>
                    )}
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          )}
        </div>

        {!isStarter ? (
          <div className="space-y-3">
            <Label htmlFor="wow">Is there a specific highlight you&apos;d love?</Label>
            <Select value={wow} onValueChange={setWow}>
              <SelectTrigger id="wow" className="w-full">
                <SelectValue placeholder="Choose a highlight" />
              </SelectTrigger>
              <SelectContent>
                {formContent.wowOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ) : null}

        {!isStarter ? (
          <div className="space-y-4">
            <Label>How should the days flow?</Label>
            <ToggleGroup
              type="single"
              value={pace}
              onValueChange={(v) => setPace(v || "")}
              className="grid w-full grid-cols-1 gap-2 sm:grid-cols-3"
            >
              {formContent.paceOptions.map((opt) => (
                <ToggleGroupItem
                  key={opt.value}
                  value={opt.value}
                  className="h-auto w-full rounded-[var(--radius-input)] border border-[rgba(0,0,0,0.08)] bg-white/50 px-3 py-3 text-[13px] leading-[1.4] font-medium text-[var(--color-text-secondary)] hover:bg-white data-[state=on]:border-[var(--color-brand)] data-[state=on]:bg-white data-[state=on]:text-[var(--color-brand)] data-[state=on]:shadow-sm transition-all"
                  aria-label={opt.label}
                >
                  {opt.label}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
        ) : null}

        <div className={cn(isStarter ? "pt-1" : "mt-2 space-y-4 pt-6 border-t border-[rgba(0,0,0,0.06)]")}>
          <Button
            type="button"
            size="lg"
            className="w-full"
            disabled={!canSubmitBrief}
            onClick={handleSubmitBrief}
          >
            {isStarter ? "Start planning" : "Continue"}
          </Button>
          {isStarter && (
            <div className="mt-3.5 flex flex-col items-center gap-2">
              <p className="text-[13px] text-[var(--color-text-muted)] text-center">
                Every request is read by us personally. You&apos;ll hear from us
                within 48 hours.
              </p>
              <p className="text-[13px] text-[var(--color-text-muted)]">
                Prefer to talk first?{" "}
                <Link href="/book-a-call" className="font-medium text-[var(--color-brand)] underline underline-offset-4 transition-colors hover:text-[var(--color-brand-hover)]">
                  Book a call
                </Link>
              </p>
            </div>
          )}
          {!isStarter ? (
            <div className="flex flex-col items-center pt-2">
              <p className="type-meta text-[var(--color-text-muted)]/80 text-center">
                Takes about a minute to complete.
              </p>
            </div>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}
