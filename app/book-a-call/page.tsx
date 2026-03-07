"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { PlanningHeader, PlanningMicroFooter } from "@/components/plan/planning-chrome";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
import { proxiedImageUrl } from "@/lib/media";
import {
  clearCallRequestDraft,
  readCallRequestDraft,
  writeCallRequestDraft,
  writeSubmittedCallRequest,
  type CallRequest,
} from "@/lib/call-request";

const callImage =
  "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=2000&q=80";

const countryOptions = [
  { value: "au", label: "Australia" },
  { value: "nz", label: "New Zealand" },
  { value: "uk", label: "United Kingdom" },
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
  { value: "sg", label: "Singapore" },
  { value: "other", label: "Other" },
];

const methodOptions: Array<{ value: CallRequest["preferredMethod"]; label: string }> = [
  { value: "whatsapp", label: "WhatsApp" },
  { value: "phone", label: "Phone" },
  { value: "email", label: "Email first" },
];

const timingOptions: Array<{ value: CallRequest["preferredTiming"]; label: string }> = [
  { value: "asap", label: "As soon as possible" },
  { value: "this-week", label: "This week" },
  { value: "next-week", label: "Next week" },
  { value: "flexible", label: "I'm flexible" },
];

export default function BookACallPage() {
  const router = useRouter();
  const seed = useMemo(() => readCallRequestDraft(), []);

  const [firstName, setFirstName] = useState(seed.firstName);
  const [email, setEmail] = useState(seed.email);
  const [country, setCountry] = useState(seed.country);
  const [phone, setPhone] = useState(seed.phone);
  const [preferredMethod, setPreferredMethod] = useState<CallRequest["preferredMethod"]>(seed.preferredMethod);
  const [preferredTiming, setPreferredTiming] = useState<CallRequest["preferredTiming"]>(seed.preferredTiming);
  const [notes, setNotes] = useState(seed.notes);
  const [submitting, setSubmitting] = useState(false);
  const [showValidation, setShowValidation] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const emailValid = /.+@.+\..+/.test(email.trim());
  const canSubmit = Boolean(firstName.trim() && emailValid && country && phone.trim());

  function saveDraft(next: Partial<CallRequest>) {
    writeCallRequestDraft(next);
  }

  async function submitRequest() {
    setShowValidation(true);
    setSubmitError("");
    if (!canSubmit) return;

    const payload = writeCallRequestDraft({
      firstName,
      email,
      country,
      phone,
      preferredMethod,
      preferredTiming,
      notes,
    });

    setSubmitting(true);
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "call_request",
          entrySource: "book_a_call",
          ...payload,
        }),
      });

      if (!response.ok) throw new Error("Submit failed");

      writeSubmittedCallRequest(payload);
      clearCallRequestDraft();
      router.push("/book-a-call/thank-you");
    } catch {
      setSubmitError("We couldn’t send your request right now. Please try again in a moment.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <PlanningHeader />
      <main className="min-h-[calc(100vh-64px)] bg-background px-4 py-10 md:px-6 md:py-14">
        <div className="mx-auto w-full max-w-6xl space-y-7">
          <Card className="overflow-hidden border-[color-mix(in_srgb,var(--color-border)_88%,transparent)] bg-[color-mix(in_srgb,var(--color-surface)_94%,var(--color-bg))] shadow-[var(--shadow-soft)]">
            <img
              src={proxiedImageUrl(callImage)}
              alt="Quiet terrace view in Sri Lanka"
              className="h-52 w-full object-cover object-center md:h-64"
              loading="lazy"
            />
            <CardHeader className="space-y-3">
              <p className="type-eyebrow text-[var(--color-text-muted)]">Book a call</p>
              <CardTitle className="type-section font-serif">Talk through your plans with us</CardTitle>
              <CardDescription className="type-body max-w-[62ch] text-[var(--color-text-secondary)]">
                Prefer to start with a conversation? Share a few details and we’ll arrange a suitable
                time for a short personal call.
              </CardDescription>
              <p className="type-ui-sm text-[var(--color-text-muted)]">
                A personal conversation, not a generic sales call.
              </p>
            </CardHeader>
          </Card>

          <section className="grid gap-6 lg:grid-cols-[minmax(0,44%)_minmax(0,56%)]">
            <Card className="relative overflow-hidden border-[color-mix(in_srgb,var(--color-border)_84%,transparent)] bg-[color-mix(in_srgb,var(--color-surface)_90%,var(--color-bg))] shadow-[var(--shadow-soft)]">
              <div className="pointer-events-none absolute -left-24 top-16 h-56 w-56 rounded-full border border-[color-mix(in_srgb,var(--color-brand)_16%,transparent)]" />
              <CardHeader>
                <CardTitle className="type-subheading font-serif">What to expect</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <ul className="space-y-3 text-[var(--color-text-secondary)]">
                  <li className="type-body">Around 15–20 minutes.</li>
                  <li className="type-body">A personal conversation about your plans, timing, and priorities.</li>
                  <li className="type-body">No need to have every detail decided yet.</li>
                  <li className="type-body">We’ll guide the right next step after the call.</li>
                </ul>

                <p className="type-ui-sm text-[var(--color-text-muted)]">
                  Prefer to share your preferences first?{" "}
                  <Link href="/plan/journey" className="text-[var(--color-brand)] underline underline-offset-4">
                    Start planning instead
                  </Link>
                </p>
              </CardContent>
            </Card>

            <Card className="border-[color-mix(in_srgb,var(--color-border)_88%,transparent)] bg-[color-mix(in_srgb,var(--color-surface)_95%,var(--color-bg))] shadow-[var(--shadow-soft)]">
              <CardHeader>
                <CardTitle className="type-subheading font-serif">A few quick details</CardTitle>
                <CardDescription className="type-meta text-[var(--color-text-muted)]">
                  We’ll use this to arrange a suitable call time for you.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="call-first-name">First name</Label>
                  <Input
                    id="call-first-name"
                    value={firstName}
                    onChange={(event) => {
                      setFirstName(event.target.value);
                      saveDraft({ firstName: event.target.value });
                    }}
                    placeholder="Your first name"
                    aria-invalid={showValidation && firstName.trim().length === 0}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="call-email">Email</Label>
                  <Input
                    id="call-email"
                    type="email"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      saveDraft({ email: event.target.value });
                    }}
                    placeholder="name@email.com"
                    aria-invalid={showValidation && !emailValid}
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="call-country">Country</Label>
                    <Select
                      value={country}
                      onValueChange={(value) => {
                        setCountry(value);
                        saveDraft({ country: value });
                      }}
                    >
                      <SelectTrigger id="call-country" aria-invalid={showValidation && !country}>
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        {countryOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="call-phone">Phone / WhatsApp number</Label>
                    <Input
                      id="call-phone"
                      value={phone}
                      onChange={(event) => {
                        setPhone(event.target.value);
                        saveDraft({ phone: event.target.value });
                      }}
                      placeholder="Include country code"
                      aria-invalid={showValidation && phone.trim().length === 0}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Preferred contact method</Label>
                  <RadioGroup
                    value={preferredMethod}
                    onValueChange={(value: CallRequest["preferredMethod"]) => {
                      setPreferredMethod(value);
                      saveDraft({ preferredMethod: value });
                    }}
                    className="grid gap-3 sm:grid-cols-3"
                  >
                    {methodOptions.map((option) => (
                      <Label
                        key={option.value}
                        htmlFor={`method-${option.value}`}
                        className={`flex cursor-pointer items-center justify-between gap-2 rounded-[var(--radius-input)] border px-3 py-2.5 transition-colors ${
                          preferredMethod === option.value
                            ? "border-[var(--color-brand)] bg-[color-mix(in_srgb,var(--color-bg-alt)_62%,var(--color-surface))]"
                            : "border-input bg-background"
                        }`}
                      >
                        <span className="type-ui-sm text-foreground">{option.label}</span>
                        <RadioGroupItem id={`method-${option.value}`} value={option.value} />
                      </Label>
                    ))}
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="call-timing">Preferred timing</Label>
                  <Select
                    value={preferredTiming}
                    onValueChange={(value: CallRequest["preferredTiming"]) => {
                      setPreferredTiming(value);
                      saveDraft({ preferredTiming: value });
                    }}
                  >
                    <SelectTrigger id="call-timing">
                      <SelectValue placeholder="Select timing" />
                    </SelectTrigger>
                    <SelectContent>
                      {timingOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="call-notes">Notes (optional)</Label>
                  <Textarea
                    id="call-notes"
                    value={notes}
                    onChange={(event) => {
                      setNotes(event.target.value);
                      saveDraft({ notes: event.target.value });
                    }}
                    placeholder="Anything helpful to know about your trip or what you’d like to discuss?"
                  />
                </div>

                {showValidation && !canSubmit ? (
                  <p className="type-ui-sm text-[var(--color-text-muted)]">
                    Please add your first name, email, country, and phone / WhatsApp number.
                  </p>
                ) : null}

                {submitError ? <p className="type-ui-sm text-[var(--color-text-muted)]">{submitError}</p> : null}

                <div className="space-y-2 pt-1">
                  <Button onClick={submitRequest} disabled={!canSubmit || submitting} className="w-full">
                    {submitting ? "Sending your request..." : "Request a call"}
                  </Button>
                  <p className="type-ui-sm text-center text-[var(--color-text-secondary)]">
                    We’ll reach out personally to arrange a suitable time.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
      <PlanningMicroFooter />
    </>
  );
}
