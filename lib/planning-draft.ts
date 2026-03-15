export type PlanningDraft = {
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

const STORAGE_KEY = "luna_latest_request";
const SUBMITTED_STORAGE_KEY = "luna_last_submitted_request";

export const defaultPlanningDraft: PlanningDraft = {
  timeframe: "",
  start: "",
  end: "",
  nights: "",
  styles: [],
  wow: "",
  pace: "",
  budget: "",
  occasion: "",
  notes: "",
  firstName: "",
  email: "",
  country: "",
  phone: "",
  whatsappOptIn: false,
};

export function readPlanningDraft(): PlanningDraft {
  if (typeof window === "undefined") return defaultPlanningDraft;
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultPlanningDraft;
    const parsed = JSON.parse(raw) as Partial<PlanningDraft>;
    return {
      ...defaultPlanningDraft,
      ...parsed,
      styles: Array.isArray(parsed.styles) ? parsed.styles : [],
    };
  } catch {
    return defaultPlanningDraft;
  }
}

export function writePlanningDraft(next: Partial<PlanningDraft>) {
  if (typeof window === "undefined") return defaultPlanningDraft;
  const merged = { ...readPlanningDraft(), ...next };
  window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
  return merged;
}

export function clearPlanningDraft() {
  if (typeof window === "undefined") return;
  window.sessionStorage.removeItem(STORAGE_KEY);
  // Also dispatch event so context can pick it up if called directly
  window.dispatchEvent(new Event("luna_draft_cleared"));
}

export function writeSubmittedPlanningRequest(payload: PlanningDraft) {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(SUBMITTED_STORAGE_KEY, JSON.stringify(payload));
}

export function readSubmittedPlanningRequest(): PlanningDraft | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(SUBMITTED_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<PlanningDraft>;
    return {
      ...defaultPlanningDraft,
      ...parsed,
      styles: Array.isArray(parsed.styles) ? parsed.styles : [],
    };
  } catch {
    return null;
  }
}
