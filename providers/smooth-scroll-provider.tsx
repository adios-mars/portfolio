"use client";

import "lenis/dist/lenis.css";
import type { LenisOptions } from "lenis";
import { ReactLenis, useLenis } from "lenis/react";
import type { FrameData } from "motion/react";
import { cancelFrame, frame } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const LENIS_OPTIONS: LenisOptions = {
  anchors: true,
  autoRaf: false,
  lerp: 0.085,
  respectReducedMotion: true,
  smoothWheel: true,
  stopInertiaOnNavigate: true,
  touchMultiplier: 1.5,
  wheelMultiplier: 1,
};

/**
 * Keeps Lenis synchronized with Motion's render loop and recalculates scroll
 * bounds after Next.js App Router navigations.
 */
const LenisController = () => {
  const lenis = useLenis();
  const pathname = usePathname();

  useEffect(() => {
    if (!lenis) {
      return;
    }

    const update = (data: FrameData) => {
      lenis.raf(data.timestamp);
    };

    frame.update(update, true);
    return () => cancelFrame(update);
  }, [lenis]);

  useEffect(() => {
    if (!lenis) {
      return;
    }
    lenis.resize();
  }, [lenis, pathname]);

  return null;
};

/**
 * Provides global Lenis smooth wheel scrolling synced with Motion while
 * respecting `prefers-reduced-motion`.
 */
export const SmoothScrollProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <ReactLenis root options={LENIS_OPTIONS}>
    <LenisController />
    {children}
  </ReactLenis>
);
