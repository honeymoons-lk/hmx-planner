"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  PlanningDraft,
  defaultPlanningDraft,
  readPlanningDraft,
  writePlanningDraft,
  clearPlanningDraft as clearDraftStorage,
} from "@/lib/planning-draft";

type PlanningContextType = {
  draft: PlanningDraft;
  updateDraft: (updates: Partial<PlanningDraft>) => void;
  clearDraft: () => void;
  isLoaded: boolean;
};

const PlanningContext = createContext<PlanningContextType | undefined>(undefined);

export function PlanningProvider({ children }: { children: React.ReactNode }) {
  const [draft, setDraft] = useState<PlanningDraft>(defaultPlanningDraft);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load from sessionStorage on mount
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDraft(readPlanningDraft());
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLoaded(true);

    // Listen for storage events from other tabs
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "luna_latest_request") {
        setDraft(readPlanningDraft());
      }
    };

    // Listen for custom clear events
    const handleClear = () => {
      setDraft(defaultPlanningDraft);
    };

    window.addEventListener("storage", handleStorage);
    window.addEventListener("luna_draft_cleared", handleClear);
    
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("luna_draft_cleared", handleClear);
    };
  }, []);

  const updateDraft = (updates: Partial<PlanningDraft>) => {
    setDraft((prev) => {
      const next = { ...prev, ...updates };
      writePlanningDraft(next);
      return next;
    });
  };

  const clearDraft = () => {
    setDraft(defaultPlanningDraft);
    clearDraftStorage();
    // Dispatch a custom event so other components/tabs know the draft was cleared
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("luna_draft_cleared"));
    }
  };

  return (
    <PlanningContext.Provider value={{ draft, updateDraft, clearDraft, isLoaded }}>
      {children}
    </PlanningContext.Provider>
  );
}

export function usePlanning() {
  const context = useContext(PlanningContext);
  if (context === undefined) {
    throw new Error("usePlanning must be used within a PlanningProvider");
  }
  return context;
}
