"use client";

import { ArrowUpRightIcon, GlobeIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import type { GlimpseData } from "@/components/ui/glimpse/types";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ROUTES } from "@/constants/routes";
import { trackExternalLinkClick, trackProjectDetailClick } from "@/lib/events";
import { saveReturnTarget } from "@/lib/intro-session";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/projects";

import { ProjectFlipMockup } from "./flip-mockup";

interface ProjectsFlipScrollProps {
  projects: readonly Project[];
  previews?: Record<string, GlimpseData>;
  className?: string;
}

export const PROJECT_TECH_STACKS: Record<string, readonly string[]> = {
  "addis-market-tracker": ["Python", "FastAPI", "SQLite", "Telegram MiniApp"],
  "campus-attendance-bot": ["Python", "Aiogram 3", "SQLite WAL", "ReportLab"],
  katch: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  "multi-user-chat-system": [
    "C99",
    "POSIX Threads",
    "Berkeley Sockets",
    "TCP/IP",
  ],
  "taxi-ale": ["Flutter", "Dart", "OpenStreetMap", "OSRM Routing"],
  "veda-voice-assistant": [
    "Python",
    "Deepgram STT",
    "Gemini API",
    "PulseAudio",
  ],
};

export const ProjectsFlipScroll: React.FC<ProjectsFlipScrollProps> = ({
  projects,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const animFrameRef = useRef<number | null>(null);
  const progressTargetRef = useRef(0);
  const progressSmoothRef = useRef(0);

  const count = projects.length;

  // Check reduced motion preference
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    mediaQuery.addEventListener("change", handler);
    return () => {
      mediaQuery.removeEventListener("change", handler);
    };
  }, []);

  // Scroll listener loop with smooth physics
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const updateScrollMetrics = () => {
      const container = containerRef.current;
      if (!container) {
        return;
      }

      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      // Top offset matching site header height
      const topOffset = 80;
      const totalScrollable = rect.height - windowHeight;

      if (totalScrollable <= 0) {
        return;
      }

      const scrolled = topOffset - rect.top;
      const rawProgress = Math.max(0, Math.min(1, scrolled / totalScrollable));
      progressTargetRef.current = rawProgress * (count - 1);
    };

    const loop = () => {
      // Gentle, organic lerp easing for silky-smooth motion
      const diff = progressTargetRef.current - progressSmoothRef.current;
      if (Math.abs(diff) > 0.0002) {
        progressSmoothRef.current += diff * 0.09;
      } else {
        progressSmoothRef.current = progressTargetRef.current;
      }

      setScrollProgress(progressSmoothRef.current);
      animFrameRef.current = requestAnimationFrame(loop);
    };

    updateScrollMetrics();
    animFrameRef.current = requestAnimationFrame(loop);

    window.addEventListener("scroll", updateScrollMetrics, { passive: true });
    window.addEventListener("resize", updateScrollMetrics, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateScrollMetrics);
      window.removeEventListener("resize", updateScrollMetrics);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [count]);

  // Compute active single card face and 3D flip angle
  const pClamped = Math.max(0, Math.min(count - 1, scrollProgress));
  const segment = Math.min(count - 2, Math.floor(pClamped));
  const fraction = count <= 1 ? 0 : pClamped - segment;

  // Single card determination:
  // First half of transition [0, 0.5) displays project at segment
  // Second half [0.5, 1.0] displays project at segment + 1
  const isFirstHalf = fraction < 0.5;
  const currentCardIndex = isFirstHalf ? segment : segment + 1;
  const currentProject = projects[currentCardIndex] ?? projects[0];

  // Flip angle calculation:
  // Rest zones: [0, 0.22] resting flat, [0.78, 1.0] resting flat
  // Flip zone: [0.22, 0.78] smooth 3D rotation
  let rotateX = 0;
  let scale = 1;
  let shadow = 0;

  if (!prefersReducedMotion && count > 1) {
    if (fraction > 0.22 && fraction < 0.5) {
      // Outgoing card rotates 0° -> -90° (tilting backward away from camera)
      const u = (fraction - 0.22) / 0.28;
      const smooth = u * u * (3 - 2 * u);
      rotateX = -smooth * 90;
      scale = 1 - smooth * 0.08;
      shadow = smooth * 0.55;
    } else if (fraction >= 0.5 && fraction < 0.78) {
      // Incoming card rotates +90° -> 0° (unfolding down into flat view)
      const u = (0.78 - fraction) / 0.28;
      const smooth = u * u * (3 - 2 * u);
      rotateX = smooth * 90;
      scale = 1 - smooth * 0.08;
      shadow = smooth * 0.55;
    }
  }

  const techStack = PROJECT_TECH_STACKS[currentProject.slug] ?? [];

  const handleDetailClick = () => {
    saveReturnTarget("projects");
    trackProjectDetailClick(currentProject.slug, currentProject.title, "home");
  };

  const handleExternalClick = (label: string, url: string) => () => {
    trackExternalLinkClick({
      context: "project_flip_item",
      link_type: label.toLowerCase(),
      slug: currentProject.slug,
      title: currentProject.title,
      url,
    });
  };

  return (
    <div
      className={cn("relative w-full", className)}
      ref={containerRef}
      style={{
        // Generous scroll height so each card has calm dwell time
        height: `${Math.max(300, count * 120)}vh`,
      }}
    >
      {/* Sticky viewport pinned frame - centered with safe clearance from site header */}
      <div className="sticky top-20 flex h-[calc(100dvh-5rem)] w-full items-center justify-center py-1 sm:py-2">
        {/* Center 3D Flip Card Deck */}
        <div
          className="relative z-10 flex w-full max-w-4xl lg:max-w-5xl xl:max-w-6xl items-center justify-center px-3 sm:px-4"
          style={{
            perspective: "1200px",
          }}
        >
          <div
            className="group/card relative flex w-full flex-col justify-between overflow-hidden rounded-2xl sm:rounded-3xl border border-border/80 bg-card p-4 sm:p-5 md:p-6 shadow-2xl transition-[border-color] duration-200 hover:border-foreground/30 will-change-transform max-h-[calc(100dvh-5.5rem)]"
            key={currentProject.slug}
            style={{
              backfaceVisibility: "hidden",
              transform: `rotateX(${rotateX}deg) scale(${scale})`,
              transformOrigin: "center center",
            }}
          >
            {/* Dynamic 3D lighting shadow overlay */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-2xl sm:rounded-3xl bg-black transition-opacity duration-100"
              style={{ opacity: shadow }}
            />

            {/* Card Top Header: Numbers, Category, and Action Links */}
            <div className="relative z-10 flex items-center justify-between gap-2 border-b border-border/60 pb-2.5 sm:pb-3">
              {/* Left: Project Number & Category Badge */}
              <div className="flex shrink-0 items-center gap-2 sm:gap-2.5">
                <span className="font-mono text-sm sm:text-base font-bold tracking-widest text-muted-foreground tabular-nums">
                  {String(currentCardIndex + 1).padStart(2, "0")} /{" "}
                  {String(count).padStart(2, "0")}
                </span>
                <span className="font-mono inline-flex items-center rounded-full border border-border/80 bg-muted/50 px-2 sm:px-2.5 py-0.5 text-[11px] sm:text-xs font-semibold tracking-widest uppercase text-muted-foreground">
                  {currentProject.category}
                </span>
              </div>

              {/* Right: External Action Icons */}
              <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
                {currentProject.links.website && (
                  <Tooltip>
                    <TooltipTrigger
                      render={
                        <Button
                          aria-label="Visit Website"
                          className="size-8 rounded-full text-muted-foreground hover:text-foreground"
                          nativeButton={false}
                          render={
                            <a
                              aria-label="Visit Website"
                              href={currentProject.links.website}
                              onClick={handleExternalClick(
                                "website",
                                currentProject.links.website
                              )}
                              rel="noreferrer"
                              target="_blank"
                            >
                              <GlobeIcon className="size-4" />
                            </a>
                          }
                          size="icon"
                          variant="ghost"
                        />
                      }
                    >
                      <GlobeIcon className="size-4" />
                    </TooltipTrigger>
                    <TooltipContent>Website</TooltipContent>
                  </Tooltip>
                )}

                {currentProject.links.github && (
                  <Tooltip>
                    <TooltipTrigger
                      render={
                        <Button
                          aria-label="View GitHub Repository"
                          className="size-8 rounded-full text-muted-foreground hover:text-foreground"
                          nativeButton={false}
                          render={
                            <a
                              aria-label="View GitHub Repository"
                              href={currentProject.links.github}
                              onClick={handleExternalClick(
                                "github",
                                currentProject.links.github
                              )}
                              rel="noreferrer"
                              target="_blank"
                            >
                              <Icons.github className="size-4" />
                            </a>
                          }
                          size="icon"
                          variant="ghost"
                        />
                      }
                    >
                      <Icons.github className="size-4" />
                    </TooltipTrigger>
                    <TooltipContent>Source Code</TooltipContent>
                  </Tooltip>
                )}
              </div>
            </div>

            {/* Card Middle: Rich Bespoke Visual Mockup */}
            <div className="relative z-10 my-2 sm:my-2.5">
              <ProjectFlipMockup
                image={currentProject.image}
                slug={currentProject.slug}
                title={currentProject.title}
              />
            </div>

            {/* Card Bottom: Title, Description, and Tech Stack */}
            <div className="relative z-10 space-y-2 sm:space-y-2.5 border-t border-border/60 pt-2.5 sm:pt-3">
              <div className="flex items-center justify-between">
                <h3 className="font-sans text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                  <Link
                    className="hover:underline underline-offset-4"
                    href={`${ROUTES.PROJECTS}/${currentProject.slug}`}
                    onClick={handleDetailClick}
                  >
                    {currentProject.title}
                  </Link>
                </h3>
              </div>

              <p className="line-clamp-2 text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed">
                {currentProject.description}
              </p>

              {/* Tech stack & Case study link - always safely inside the card */}
              <div className="flex flex-wrap items-center justify-between gap-2.5 pt-1 border-t border-border/40 mt-1">
                {techStack.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                    {techStack.map((tech) => (
                      <span
                        className="font-mono rounded-full border border-border/80 bg-muted/40 px-2.5 py-0.5 text-xs text-muted-foreground"
                        key={tech}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                <Link
                  className="inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-muted/40 px-3 sm:px-3.5 py-1.5 font-mono text-xs sm:text-sm font-semibold tracking-wider uppercase text-muted-foreground transition-colors hover:border-foreground/30 hover:bg-muted hover:text-foreground shrink-0 ml-auto"
                  href={`${ROUTES.PROJECTS}/${currentProject.slug}`}
                  onClick={handleDetailClick}
                >
                  <span>Case study</span>
                  <ArrowUpRightIcon className="size-3.5 transition-transform duration-200 group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
