/**
 * Utilities for tracking whether the user has experienced the initial greeting
 * animation in the current tab session, and for preserving/restoring scroll
 * positions during case study round-trips.
 */

export const INTRO_SEEN_STORAGE_KEY = "portfolio_has_seen_greeting";
export const RETURN_SCROLL_Y_KEY = "portfolio_return_scroll_y";
export const RETURN_SECTION_KEY = "portfolio_return_section";

// In-memory flag that stays true for the lifetime of this tab's JavaScript runtime
let hasSeenGreetingInMemory = false;
let isInitialHydration = true;

export const isHydrating = (): boolean => isInitialHydration;

export const finishHydration = (): void => {
  isInitialHydration = false;
};

export const markGreetingSeen = (): void => {
  hasSeenGreetingInMemory = true;
  if (typeof window !== "undefined") {
    try {
      (window as unknown as { __greetingSeen?: boolean }).__greetingSeen = true;
      sessionStorage.setItem(INTRO_SEEN_STORAGE_KEY, "true");
    } catch {
      // sessionStorage may fail in private mode / strict sandbox
    }
  }
};

export const hasSeenGreeting = (): boolean => {
  if (hasSeenGreetingInMemory) {
    return true;
  }
  if (typeof window !== "undefined") {
    try {
      if (sessionStorage.getItem(INTRO_SEEN_STORAGE_KEY) === "true") {
        hasSeenGreetingInMemory = true;
        return true;
      }
    } catch {
      return false;
    }
  }
  return false;
};

export const saveReturnTarget = (
  section: "projects" | "experience" = "projects"
): void => {
  markGreetingSeen();
  if (typeof window !== "undefined") {
    try {
      sessionStorage.setItem(RETURN_SCROLL_Y_KEY, String(window.scrollY));
      sessionStorage.setItem(RETURN_SECTION_KEY, section);
    } catch {
      // ignore
    }
  }
};

export const getAndClearReturnTarget = (): {
  scrollY: number | null;
  section: "projects" | "experience" | null;
} => {
  if (typeof window === "undefined") {
    return { scrollY: null, section: null };
  }
  try {
    const rawY = sessionStorage.getItem(RETURN_SCROLL_Y_KEY);
    const section = sessionStorage.getItem(RETURN_SECTION_KEY) as
      | "projects"
      | "experience"
      | null;
    sessionStorage.removeItem(RETURN_SCROLL_Y_KEY);
    sessionStorage.removeItem(RETURN_SECTION_KEY);

    const scrollY = rawY === null ? null : Number.parseFloat(rawY);
    return {
      scrollY: scrollY === null || Number.isNaN(scrollY) ? null : scrollY,
      section,
    };
  } catch {
    return { scrollY: null, section: null };
  }
};
