"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { RevealItem } from "@/components/scroll-reveal";
import { SectionHeading } from "@/components/section-heading";
import type { GlimpseData } from "@/components/ui/glimpse/types";
import { cn } from "@/lib/utils";
import type { Experience } from "@/types/experiences";

import { ExperienceItem } from "./item";

interface ExperiencesViewProps {
  showHeader?: boolean;
  headerClassName?: string;
  viewClassName?: string;
  experiences: readonly Experience[];
  previews?: Record<string, GlimpseData>;
}

interface NodeCoord {
  x: number;
  y: number;
}

/**
 * Renders work history with a free kinetic jumping bullet point that leaps
 * cleanly from one bullet point to the next as the user scrolls or touches/points
 * to any milestone, hitting every bullet point dead in the center.
 */
const ExperiencesView = ({
  showHeader = true,
  headerClassName,
  viewClassName,
  experiences,
  previews,
}: ExperiencesViewProps) => {
  const [activeIdx, setActiveIdx] = useState(0);

  const timelineRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLElement | null)[]>([]);
  const bulletRef = useRef<HTMLDivElement>(null);

  const currentProgressRef = useRef(0);
  const targetProgressRef = useRef(0);
  const activeIdxRef = useRef(0);
  const userInteractedRef = useRef(false);
  const interactionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  // Smooth jump leap to any milestone touched, clicked, or pointed to
  const handleSelectMilestone = useCallback((index: number) => {
    userInteractedRef.current = true;
    targetProgressRef.current = index;
    setActiveIdx(index);

    if (interactionTimeoutRef.current) {
      clearTimeout(interactionTimeoutRef.current);
    }
    interactionTimeoutRef.current = setTimeout(() => {
      userInteractedRef.current = false;
    }, 1800);
  }, []);

  // Main scroll tracker & kinetic free-jumping bullet point animation loop
  useEffect(() => {
    let animationFrameId: number;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Track scroll target progress mapped to each node milestone
    const handleScroll = () => {
      if (userInteractedRef.current) {
        return;
      }

      const container = timelineRef.current;
      const count = experiences.length;
      if (!container || count < 2) {
        return;
      }

      const nodeRects: DOMRect[] = [];
      for (let i = 0; i < count; i += 1) {
        const el = nodeRefs.current[i];
        if (!el) {
          return;
        }
        nodeRects.push(el.getBoundingClientRect());
      }

      const windowHeight = window.innerHeight;
      // Focus reading line: comfortably positioned in upper-middle viewport
      const focusLine = windowHeight * 0.48;

      if (nodeRects[0].top >= focusLine) {
        // At or above Card 0: lock dead center on Node 0
        targetProgressRef.current = 0;
        return;
      }

      if ((nodeRects.at(-1)?.top ?? 0) <= focusLine) {
        // At or past last card: lock dead center on last Node
        targetProgressRef.current = count - 1;
        return;
      }

      // Find the milestone closest to the reading focus line
      // This guarantees the bullet point jumps discrete milestones and NEVER gets stuck in the middle!
      let closestIdx = 0;
      let minDistance = Number.POSITIVE_INFINITY;

      for (let i = 0; i < count; i += 1) {
        const dist = Math.abs(nodeRects[i].top - focusLine);
        if (dist < minDistance) {
          minDistance = dist;
          closestIdx = i;
        }
      }

      targetProgressRef.current = closestIdx;
    };

    const loop = () => {
      const diff = targetProgressRef.current - currentProgressRef.current;
      const ease = prefersReducedMotion ? 1 : 0.12;
      currentProgressRef.current += diff * ease;

      const progress = currentProgressRef.current;
      const count = experiences.length;
      const segCount = count - 1;

      // Extract current segment index and normalized leap fraction
      const k = Math.min(Math.floor(progress), Math.max(0, segCount - 1));
      const u = Math.max(0, Math.min(1, progress - k));

      const container = timelineRef.current;
      const node0 = nodeRefs.current[k];
      const node1 = nodeRefs.current[k + 1];

      if (container && node0 && node1 && bulletRef.current) {
        const containerRect = container.getBoundingClientRect();
        const r0 = node0.getBoundingClientRect();
        const r1 = node1.getBoundingClientRect();

        // Exact sub-pixel centers of current and target nodes relative to container
        const c0: NodeCoord = {
          x: r0.left - containerRect.left + r0.width / 2,
          y: r0.top - containerRect.top + r0.height / 2,
        };
        const c1: NodeCoord = {
          x: r1.left - containerRect.left + r1.width / 2,
          y: r1.top - containerRect.top + r1.height / 2,
        };

        const isMobile = window.innerWidth < 640;
        // Parabolic jump arc into empty margin
        const arcWidth = isMobile ? 18 : 26;

        // Smooth cosine ease for the parabolic jump
        const leapU = (1 - Math.cos(Math.PI * u)) / 2;

        // Position along parabolic leap trajectory
        const arc = Math.sin(Math.PI * leapU);
        const y = c0.y + (c1.y - c0.y) * leapU;
        const x = c0.x - arcWidth * arc;

        // Dynamic flight tilt: strictly 0deg when resting at endpoints (u=0, u=1)
        const dy = c1.y - c0.y;
        const dx = -arcWidth * Math.PI * Math.cos(Math.PI * leapU);
        const rawAngle = (Math.atan2(dy, dx) * 180) / Math.PI - 90;
        const tilt = rawAngle * arc;

        // Squash & stretch: expands dynamically in mid-air, snaps to 1 on endpoints
        const stretch = prefersReducedMotion ? 1 : 1 + 0.25 * arc;
        const squash = prefersReducedMotion ? 1 : 1 - 0.12 * arc;

        bulletRef.current.style.transform = `translate3d(calc(-50% + ${x.toFixed(2)}px), calc(-50% + ${y.toFixed(2)}px), 0) rotate(${tilt.toFixed(1)}deg) scale(${squash.toFixed(2)}, ${stretch.toFixed(2)})`;
        bulletRef.current.style.opacity = "1";
      }

      // Active milestone index (illuminates card when landed in threshold)
      const activeIndex = Math.min(Math.round(progress), segCount);
      if (activeIndex !== activeIdxRef.current) {
        activeIdxRef.current = activeIndex;
        setActiveIdx(activeIndex);
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    handleScroll();
    animationFrameId = requestAnimationFrame(loop);

    const onResize = () => {
      handleScroll();
    };

    const resumeNaturalScroll = () => {
      userInteractedRef.current = false;
      handleScroll();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("wheel", resumeNaturalScroll, { passive: true });
    window.addEventListener("touchmove", resumeNaturalScroll, {
      passive: true,
    });

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("wheel", resumeNaturalScroll);
      window.removeEventListener("touchmove", resumeNaturalScroll);
    };
  }, [experiences.length]);

  return (
    <>
      {showHeader ? (
        <SectionHeading
          className={headerClassName}
          copyLinkTitle="Experience"
          description="Systems engineering, university automation tooling, and open-source delivery."
          eyebrow="02 — Chronology"
          title="Experience"
        />
      ) : null}

      <div
        ref={timelineRef}
        className={cn(
          "relative flex flex-col gap-8 sm:gap-10 pl-11 sm:pl-16 py-3 w-full",
          viewClassName
        )}
      >
        {/* The Free Jumping Bullet Point (Dead center on every milestone, zero lines) */}
        <div
          ref={bulletRef}
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 z-20 flex size-5 sm:size-6 items-center justify-center opacity-0 will-change-transform"
        >
          {/* Crisp Core Orb: Pure solid black in light mode with crisp border, neon white glow in dark mode - NO fuzzy black shadow on white screen */}
          <div className="relative size-3.5 sm:size-4 rounded-full bg-foreground ring-2 ring-background dark:shadow-[0_0_12px_rgba(255,255,255,0.7)]" />
        </div>

        {/* Chronological Experience Cards */}
        {experiences.map((experience, index) => {
          const isActive = activeIdx === index;
          const isPassed = index < activeIdx;

          return (
            <RevealItem
              delay={Math.min(index * 0.08, 0.24)}
              key={experience.slug}
              yOffset={0}
            >
              <ExperienceItem
                {...experience}
                isActive={isActive}
                isPassed={isPassed}
                nodeRef={(el) => {
                  nodeRefs.current[index] = el;
                }}
                onSelectMilestone={() => handleSelectMilestone(index)}
                preview={previews?.[experience.experienceOrg.link]}
                showHeader={showHeader}
              />
            </RevealItem>
          );
        })}
      </div>
    </>
  );
};

export { ExperiencesView };
