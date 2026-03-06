"use client";

import { useEffect, useState, type KeyboardEventHandler } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SectionHeader } from "@/components/section-header";

type MomentPanel = { title: string; label: string; body: string; image: string };

type MomentsSectionProps = {
  id: string;
  eyebrow: string;
  heading: string;
  supporting: string;
  panels: readonly MomentPanel[];
};

export function MomentsSection({ id, eyebrow, heading, supporting, panels }: MomentsSectionProps) {
  const [activeMomentIndex, setActiveMomentIndex] = useState(0);
  const [isMomentPaused, setIsMomentPaused] = useState(false);
  const [momentUserInteracted, setMomentUserInteracted] = useState(false);
  const [isPageVisible, setIsPageVisible] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleMotionChange = () => setPrefersReducedMotion(mediaQuery.matches);
    handleMotionChange();
    mediaQuery.addEventListener("change", handleMotionChange);
    return () => mediaQuery.removeEventListener("change", handleMotionChange);
  }, []);

  useEffect(() => {
    const handleVisibility = () => {
      const visible = document.visibilityState === "visible";
      setIsPageVisible(visible);
      if (!visible) {
        setIsMomentPaused(true);
      } else if (!momentUserInteracted && !prefersReducedMotion) {
        setIsMomentPaused(false);
      }
    };
    handleVisibility();
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, [momentUserInteracted, prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion || isMomentPaused || !isPageVisible) return;
    const intervalId = window.setInterval(() => {
      setActiveMomentIndex((prev) => (prev + 1) % panels.length);
    }, 5000);
    return () => window.clearInterval(intervalId);
  }, [isMomentPaused, isPageVisible, prefersReducedMotion, panels.length]);

  const handleMomentNavigate = (nextIndex: number) => {
    const total = panels.length;
    const normalized = ((nextIndex % total) + total) % total;
    setActiveMomentIndex(normalized);
    setMomentUserInteracted(true);
    setIsMomentPaused(true);
  };

  const handleMomentKeyDown: KeyboardEventHandler<HTMLElement> = (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      handleMomentNavigate(activeMomentIndex - 1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      handleMomentNavigate(activeMomentIndex + 1);
    }
  };

  return (
    <section id={id} className="moments-section w-full py-[var(--section-space-mobile)] md:py-[var(--section-space-desktop)]">
      <div className="mx-auto w-full max-w-[1200px] px-4 md:px-6">
        <SectionHeader eyebrow={eyebrow} heading={heading} supporting={supporting} className="max-w-3xl" />
      </div>

      <div className="mt-12 md:mt-16">
        <div
          className="group relative h-[48vh] min-h-[360px] w-full overflow-hidden md:h-[55vh] lg:h-[60vh] lg:min-h-[520px] lg:max-h-[720px]"
          tabIndex={0}
          onKeyDown={handleMomentKeyDown}
          onMouseEnter={() => {
            if (window.matchMedia("(min-width: 1024px)").matches) setIsMomentPaused(true);
          }}
          onMouseLeave={() => {
            if (!momentUserInteracted && !prefersReducedMotion && isPageVisible) {
              setIsMomentPaused(false);
            }
          }}
        >
          {panels.map((panel, index) => {
            const isActive = index === activeMomentIndex;
            return (
              <div
                key={panel.title}
                aria-hidden={!isActive}
                className={`absolute inset-0 transition-opacity ${
                  prefersReducedMotion ? "duration-150" : "duration-[800ms]"
                } ease-out ${isActive ? "opacity-100" : "opacity-0"}`}
              >
                <div
                  className={`absolute inset-0 transition-transform ${
                    prefersReducedMotion ? "duration-150" : "duration-[800ms]"
                  } ease-out ${isActive ? "scale-[1.02]" : "scale-100"} md:group-hover:scale-105`}
                  style={{
                    backgroundImage: `url(${panel.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.45) 40%, rgba(0,0,0,0.18) 70%, rgba(0,0,0,0.05) 100%)",
                  }}
                />
                <div className="absolute bottom-7 left-5 z-10 max-w-[520px] md:bottom-14 md:left-14">
                  <h3 className="type-subheading font-serif font-medium text-white">
                    {panel.title}
                  </h3>
                  <p className="type-body mt-4 text-white/95">{panel.body}</p>
                </div>
              </div>
            );
          })}

          <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5 rounded-[var(--radius-input)] bg-black/25 p-1 backdrop-blur-md md:gap-2">
            {panels.map((panel, index) => (
              <button
                key={`${panel.title}-tab`}
                type="button"
                aria-label={`Show ${panel.label}`}
                className={`type-eyebrow rounded-[var(--radius-input)] px-2 py-1 font-medium transition-colors md:px-2.5 ${
                  index === activeMomentIndex ? "bg-white text-foreground" : "text-white/90 hover:bg-white/15"
                }`}
                onClick={() => handleMomentNavigate(index)}
              >
                {panel.label}
              </button>
            ))}
          </div>

          <button
            type="button"
            aria-label="Previous moment"
            className="absolute left-4 top-1/2 z-20 hidden -translate-y-1/2 p-2 text-white/70 transition-colors hover:text-white lg:block"
            onClick={() => handleMomentNavigate(activeMomentIndex - 1)}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Next moment"
            className="absolute right-4 top-1/2 z-20 hidden -translate-y-1/2 p-2 text-white/70 transition-colors hover:text-white lg:block"
            onClick={() => handleMomentNavigate(activeMomentIndex + 1)}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
