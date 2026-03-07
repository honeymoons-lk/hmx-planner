export type CallRequest = {
  firstName: string;
  email: string;
  country: string;
  phone: string;
  preferredMethod: "whatsapp" | "phone" | "email";
  preferredTiming: "asap" | "this-week" | "next-week" | "flexible";
  notes: string;
};

const DRAFT_KEY = "luna_call_request_draft";
const SUBMITTED_KEY = "luna_call_request_submitted";

export const defaultCallRequest: CallRequest = {
  firstName: "",
  email: "",
  country: "",
  phone: "",
  preferredMethod: "whatsapp",
  preferredTiming: "asap",
  notes: "",
};

export function readCallRequestDraft(): CallRequest {
  if (typeof window === "undefined") return defaultCallRequest;
  try {
    const raw = window.sessionStorage.getItem(DRAFT_KEY);
    if (!raw) return defaultCallRequest;
    return { ...defaultCallRequest, ...(JSON.parse(raw) as Partial<CallRequest>) };
  } catch {
    return defaultCallRequest;
  }
}

export function writeCallRequestDraft(next: Partial<CallRequest>) {
  if (typeof window === "undefined") return defaultCallRequest;
  const merged = { ...readCallRequestDraft(), ...next };
  window.sessionStorage.setItem(DRAFT_KEY, JSON.stringify(merged));
  return merged;
}

export function clearCallRequestDraft() {
  if (typeof window === "undefined") return;
  window.sessionStorage.removeItem(DRAFT_KEY);
}

export function writeSubmittedCallRequest(payload: CallRequest) {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(SUBMITTED_KEY, JSON.stringify(payload));
}

export function readSubmittedCallRequest(): CallRequest | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(SUBMITTED_KEY);
    if (!raw) return null;
    return { ...defaultCallRequest, ...(JSON.parse(raw) as Partial<CallRequest>) };
  } catch {
    return null;
  }
}
