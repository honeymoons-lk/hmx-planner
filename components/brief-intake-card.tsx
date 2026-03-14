"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CalendarDays, Check, ChevronDown } from "lucide-react";

import { Badge } from "@/components/ui/badge";
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
import { readPlanningDraft, writePlanningDraft } from "@/lib/planning-draft";
import { cn } from "@/lib/utils";

type BriefIntakeCardProps = {
  id?: string;
  className?: string;
  title?: string;
  description?: string;
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
  reassurance: "Takes about 60 seconds. We’ll reply personally within 24–48 hours.",
};

export function BriefIntakeCard({
  id,
  className,
  title = "Begin your private planning brief",
  description = "Share the shape of the escape you are imagining. We’ll come back with a thoughtful route, stay style, and next steps.",
}: BriefIntakeCardProps) {
  const router = useRouter();
  const seed = useMemo(() => readPlanningDraft(), []);
  const [timeframe, setTimeframe] = useState(seed.timeframe);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(
    seed.start || seed.end
      ? {
          from: seed.start ? new Date(`${seed.start}T00:00:00`) : undefined,
          to: seed.end ? new Date(`${seed.end}T00:00:00`) : undefined,
        }
      : undefined,
  );
  const [nights, setNights] = useState(seed.nights);
  const [styles, setStyles] = useState<string[]>(seed.styles);
  const [styleSearch, setStyleSearch] = useState("");
  const [stylePopoverOpen, setStylePopoverOpen] = useState(false);
  const [pace, setPace] = useState(seed.pace);
  const [wow, setWow] = useState(seed.wow);

  const calculatedNights = useMemo(() => {
    if (timeframe !== "pick-dates") return null;
    if (!dateRange?.from || !dateRange?.to) return null;
    return differenceInDays(dateRange.from, dateRange.to);
  }, [dateRange, timeframe]);

  const selectedNightsValue = timeframe === "pick-dates" ? (calculatedNights ? String(calculatedNights) : "") : nights;

  const canSubmitBrief = useMemo(() => {
    const hasPrimaryFields = Boolean(timeframe && styles.length > 0 && wow && pace);
    if (!hasPrimaryFields) return false;
    if (timeframe === "pick-dates") {
      return Boolean(dateRange?.from && dateRange?.to && calculatedNights);
    }
    return Boolean(nights);
  }, [calculatedNights, dateRange?.from, dateRange?.to, nights, pace, styles.length, timeframe, wow]);

  const filteredStyleOptions = useMemo(() => {
    const query = styleSearch.trim().toLowerCase();
    if (!query) return formContent.styleOptions;
    return formContent.styleOptions.filter((styleOption) => styleOption.label.toLowerCase().includes(query));
  }, [styleSearch]);

  const toggleStyle = (value: string) => {
    setStyles((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]));
  };

  const handleSubmitBrief = () => {
    writePlanningDraft({
      timeframe,
      start: timeframe === "pick-dates" && dateRange?.from ? toISODate(dateRange.from) : "",
      end: timeframe === "pick-dates" && dateRange?.to ? toISODate(dateRange.to) : "",
      nights: selectedNightsValue,
      styles,
      wow,
      pace,
    });

    router.push("/plan/details");
  };

  return (
    <Card id={id} className={cn("bg-[rgba(252,248,244,0.94)] backdrop-blur-2xl rounded-[8px] border border-[rgba(255,255,255,0.6)] shadow-[0_40px_80px_rgba(14,11,10,0.15)]", className)}>
      <CardHeader className="space-y-5 border-b border-[rgba(0,0,0,0.06)] px-8 pt-9 pb-7">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="type-eyebrow text-[var(--color-brand)]">
            Personal Planning Brief
          </span>
          <span className="text-[12px] text-[var(--color-text-muted)] italic">Takes ~60 seconds</span>
        </div>
        <CardTitle className="type-subheading font-serif tracking-tight text-[var(--color-text)]">
          {title}
        </CardTitle>
        <CardDescription className="type-body text-[var(--color-text-secondary)] font-light">
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-7 px-8 py-8">
        <div className="space-y-3">
          <Label htmlFor="timeframe" className="type-eyebrow text-[var(--color-text-secondary)]">When would you like to travel?</Label>
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger id="timeframe" className="w-full h-12 bg-white/50 border-[rgba(0,0,0,0.08)] rounded-[4px] focus:ring-[var(--color-brand)]">
              <SelectValue placeholder="Choose a timeframe" />
            </SelectTrigger>
            <SelectContent>
              {formContent.timeframeOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {timeframe === "pick-dates" ? (
          <div className="space-y-3">
            <Label className="type-eyebrow text-[var(--color-text-secondary)]">Travel dates</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-12 bg-white/50 border-[rgba(0,0,0,0.08)] rounded-[4px] justify-start text-left font-normal hover:bg-white/80"
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
              <p className="text-[13px] text-[var(--color-text-muted)] italic">
                Trip length: {calculatedNights} night{calculatedNights > 1 ? "s" : ""} (auto-calculated)
              </p>
            ) : (
              <p className="text-[13px] text-[var(--color-text-muted)] italic">Select return date</p>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            <Label htmlFor="nights" className="type-eyebrow text-[var(--color-text-secondary)]">Nights</Label>
            <Select value={nights} onValueChange={setNights}>
              <SelectTrigger id="nights" className="w-full h-12 bg-white/50 border-[rgba(0,0,0,0.08)] rounded-[4px] focus:ring-[var(--color-brand)]">
                <SelectValue placeholder="Choose stay length" />
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

        <div className="space-y-3">
          <Label className="type-eyebrow text-[var(--color-text-secondary)]">What kind of experience are you picturing?</Label>
          <Popover open={stylePopoverOpen} onOpenChange={setStylePopoverOpen}>
            <PopoverTrigger asChild>
              <Button type="button" variant="outline" className="w-full min-h-12 h-auto bg-white/50 border-[rgba(0,0,0,0.08)] rounded-[4px] justify-between py-3 hover:bg-white/80">
                <span className="mr-3 flex flex-wrap gap-2 text-left">
                  {styles.length > 0 ? (
                    styles.map((value) => {
                      const label = formContent.styleOptions.find((item) => item.value === value)?.label ?? value;
                      return (
                        <span
                          key={value}
                          className="text-[12px] font-medium rounded-md border border-[rgba(0,0,0,0.06)] bg-white px-2.5 py-1 text-[var(--color-text)] shadow-sm"
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
        </div>

        <div className="space-y-3">
          <Label htmlFor="wow" className="type-eyebrow text-[var(--color-text-secondary)]">What would make this unforgettable?</Label>
          <Select value={wow} onValueChange={setWow}>
            <SelectTrigger id="wow" className="w-full h-12 bg-white/50 border-[rgba(0,0,0,0.08)] rounded-[4px] focus:ring-[var(--color-brand)]">
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

        <div className="space-y-4">
          <Label className="type-eyebrow text-[var(--color-text-secondary)]">How would you like the days to flow?</Label>
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
                className="h-auto w-full rounded-[4px] border border-[rgba(0,0,0,0.08)] bg-white/50 px-3 py-3 text-[13px] font-medium text-[var(--color-text-secondary)] hover:bg-white data-[state=on]:border-[var(--color-brand)] data-[state=on]:bg-white data-[state=on]:text-[var(--color-brand)] data-[state=on]:shadow-sm transition-all"
                aria-label={opt.label}
              >
                {opt.label}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>

        <div className="space-y-4 border-t border-[rgba(0,0,0,0.06)] pt-8 mt-2">
          <Button
            type="button"
            size="lg"
            className="w-full h-14 rounded-[4px] bg-[var(--color-brand)] hover:bg-[var(--color-brand-hover)] text-white font-medium tracking-wide text-[15px] shadow-md transition-all disabled:cursor-not-allowed disabled:opacity-60"
            disabled={!canSubmitBrief}
            onClick={handleSubmitBrief}
          >
            Begin Designing Your Journey
          </Button>

          <div className="flex flex-col items-center gap-2 pt-2">
            <p className="text-[13px] text-[var(--color-text-muted)]">
              Prefer a quick chat first?{" "}
              <Link href="/book-a-call" className="font-medium text-[var(--color-brand)] hover:text-[var(--color-brand-hover)] underline underline-offset-4 transition-colors">
                Book a call
              </Link>
            </p>
            <p className="text-[12px] text-[var(--color-text-muted)]/80 text-center max-w-[30ch]">
              No generic packages. No obligation. Just a thoughtful first response.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
