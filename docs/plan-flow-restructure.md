# Luna Voyages: `/plan` Flow Restructure Plan

## 1. Audit of Existing Pages

Currently, the planner flow consists of 4 pages, plus the homepage hero.

*   **Homepage Hero (`BriefIntakeCard` in "starter" mode):** Collects Timeframe, Nights, and Style.
*   **`/plan/journey` (Step 1):** Uses `BriefIntakeCard` in "full" mode. Layout is a 2-column grid (Image left, Card right).
*   **`/plan/details` (Step 2):** Single wide `Card` shell. Features a hero image *inside* the card header. Contains a snapshot summary of Step 1, followed by vertical form fields (budget, occasion, pace, wow, notes).
*   **`/plan/contact` (Step 3):** Single wide `Card` shell. Inside the card, it splits into a 2-column grid (Form fields left, "Review your request" summary right).
*   **`/plan/thank-you` (Step 4):** Multiple cards. Top banner card with an image, followed by a 2-column grid of cards (Summary left, "What happens next" right).

## 2. Shared Components vs. Page-Specific Layouts

**Shared Components (To be retained & standardised):**
*   **Chrome:** `PlanningHeader` and `PlanningMicroFooter`.
*   **Progress:** `ProgressIndicator` (Steps 1-3).
*   **Main Wrapper:** `<main className="min-h-[calc(100vh-64px)] bg-[var(--color-bg)] px-4 py-16 md:px-6 md:py-24">`
*   **Inner Container:** `<div className="mx-auto w-full max-w-5xl space-y-12">`
*   **Typography System:** `type-subheading`, `type-body`, `type-eyebrow`, `type-meta`, `type-ui-sm`.

**Page-Specific Layouts (To remain intentionally different):**
*   **Journey:** Aspirational split-screen (Image + Form).
*   **Details:** Deep-dive vertical flow (potentially keeping the integrated header image to feel editorial).
*   **Contact:** Confidence-building split (Form + Final Review Aside).
*   **Thank You:** Reassurance layout (Banner + Next Steps).

## 3. Standardisation Targets (Design System)

To make the flow feel like one cohesive design system without collapsing them into a single layout, we will standardise the following across all 4 pages:

*   **Card Shell:** 
    *   Currently, `/journey` uses a glassmorphism card (`bg-[rgba(247,241,234,0.95)] backdrop-blur-md`), while `/details` and `/contact` use a solid card (`bg-[color-mix(in_srgb,var(--color-surface)_92%,var(--color-bg))]`).
    *   *Action:* Unify the card background, border (`border-[rgba(0,0,0,0.06)]` or similar), and shadow (`shadow-sm`) across all steps.
*   **Border Radius:** 
    *   *Action:* Enforce `rounded-[8px]` for all main cards, images, and form elements.
*   **Field Spacing:** 
    *   *Action:* Standardise form group spacing (e.g., `space-y-3` for Label + Input) and section spacing (e.g., `space-y-10` between major form sections).
*   **Headings:** 
    *   *Action:* Use `type-subheading font-serif` for primary card titles and `type-body text-[var(--color-text-muted)]` for descriptions consistently.
*   **CTA Row:** 
    *   *Action:* Create a standardised bottom action bar layout: `flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between pt-6 border-t border-[rgba(0,0,0,0.06)]`.
*   **Input Heights & UI:** 
    *   *Action:* Ensure all `SelectTrigger`, `Input`, and `Button` elements share the same height and border treatments.
*   **Container Widths:** 
    *   *Action:* Maintain `max-w-5xl` for the outer shell, but ensure internal reading widths for forms don't exceed comfortable line lengths (e.g., `max-w-2xl` for vertical form blocks).

## 4. Implementation Steps

1.  **Update Homepage Pre-qualifier:** Ensure the homepage hero only asks the 3 target questions (When, Nights, Experience type).
2.  **Refactor `/plan/journey`:** 
    *   Decouple it from the homepage `BriefIntakeCard` if necessary, or update `BriefIntakeCard` to match the new unified "Card Shell" design.
    *   Ensure it captures the remaining "Journey" questions (Wow moment, Pace) if they are moved here, or keep them in Details based on the new flow mapping. *(Note: The prompt says Journey = aspiration + direction, Details = refinement).*
3.  **Refactor `/plan/details`:** 
    *   Apply the unified Card Shell.
    *   Standardise the CTA row.
    *   Clean up the "Snapshot" UI to match the standard.
4.  **Refactor `/plan/contact`:** 
    *   Apply the unified Card Shell.
    *   Standardise the CTA row.
    *   Ensure the "Review your request" aside uses the standard card/background treatment.
5.  **Refactor `/plan/thank-you`:** 
    *   Apply the unified Card Shell to all cards.
    *   Ensure typography matches the rest of the flow.

*Note: No drastic UI changes have been made yet. This document serves as the structural guide for the upcoming refactor.*