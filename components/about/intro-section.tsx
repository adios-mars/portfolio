"use client";

import { useLenis } from "lenis/react";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";

import { IntroProfile } from "@/components/about/intro-profile";
import type { IntroMode } from "@/components/about/intro-profile";
import { Section } from "@/components/ui/section";
import {
  finishHydration,
  getAndClearReturnTarget,
  hasSeenGreeting,
  isHydrating,
  markGreetingSeen,
} from "@/lib/intro-session";
import { cn } from "@/lib/utils";

interface IntroSectionProps {
  children: ReactNode;
}

const IntroSection = ({ children }: IntroSectionProps) => {
  const lenis = useLenis();

  // Synchronously initialize to "skip" during client-side navigation
  const [introMode, setIntroMode] = useState<IntroMode>(() => {
    if (
      typeof window !== "undefined" &&
      !isHydrating() &&
      (hasSeenGreeting() || Boolean(window.location.hash))
    ) {
      return "skip";
    }
    return "play";
  });

  useEffect(() => {
    finishHydration();
    if (hasSeenGreeting() || window.location.hash) {
      setIntroMode("skip");
      markGreetingSeen();
    }

    // Scroll restoration when returning from a case study or anchor link
    const { scrollY, section } = getAndClearReturnTarget();
    const hash = typeof window === "undefined" ? "" : window.location.hash;
    const targetSection = section ?? (hash ? hash.replace("#", "") : null);

    if (scrollY !== null || targetSection !== null) {
      const timer = setTimeout(() => {
        if (scrollY !== null && scrollY > 0) {
          if (lenis) {
            lenis.scrollTo(scrollY, { immediate: true });
          } else {
            window.scrollTo({ behavior: "instant", top: scrollY });
          }
        } else if (targetSection) {
          const el = document.querySelector<HTMLElement>(`#${targetSection}`);
          if (el) {
            if (lenis) {
              lenis.scrollTo(el, { immediate: true });
            } else {
              el.scrollIntoView({ behavior: "instant", block: "start" });
            }
          }
        }
      }, 80);
      return () => clearTimeout(timer);
    }
  }, [lenis]);

  useEffect(() => {
    // When user scrolls, mark greeting as seen
    const handleScroll = () => {
      if (window.scrollY > 80) {
        markGreetingSeen();
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Section
      id="about"
      className={cn(
        "min-h-[calc(100dvh-6.5rem)] flex flex-col justify-center pt-4 sm:pt-6 pb-12",
        introMode === "skip" ? "space-y-4" : "animate-none space-y-4"
      )}
    >
      <IntroProfile mode={introMode} />
      {children}
    </Section>
  );
};

export { IntroSection };
