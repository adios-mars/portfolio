"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { Icons } from "@/components/icons";
import { RevealItem } from "@/components/scroll-reveal";
import { SectionHeading } from "@/components/section-heading";
import { Section } from "@/components/ui/section";
import { CORE_TECHNOLOGIES } from "@/constants/skills";
import { cn } from "@/lib/utils";

// 360-degree rotation speed (ms per full revolution)
const FULL_ROTATION_MS = 28_000;
const TILT_X_DEG = -7.5;

/**
 * 3D Cylinder Carousel matching user reference diagram.
 * Panels revolve in continuous 360-degree 3D perspective around Y-axis with double-sided glassmorphic cards.
 */
const SkillsSection = ({ className }: { className?: string }) => {
  const [activeTech, setActiveTech] = useState<string | null>(null);
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const [isDark, setIsDark] = useState(false);
  const [radius, setRadius] = useState(225);
  const [isMobile, setIsMobile] = useState(false);

  const sceneRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const frontRefs = useRef<(HTMLDivElement | null)[]>([]);
  const backRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Animation & interaction physics refs
  const angleRef = useRef(0);
  const velocityRef = useRef(0);
  const isDraggingRef = useRef(false);
  const dragDistanceRef = useRef(0);
  const lastPointerXRef = useRef(0);

  // Sync dark theme
  useEffect(() => {
    const updateTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    updateTheme();

    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributeFilter: ["class"],
      attributes: true,
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  // Compute responsive cylinder radius with generous gaps matching Solomon portfolio scale
  const updateDimensions = useCallback(() => {
    if (!sceneRef.current) {
      return;
    }
    const width = sceneRef.current.clientWidth;
    const mobile = width < 640;
    setIsMobile(mobile);

    // Mobile: R=190px (spacious 22px+ gap between cards, zero clipping)
    // Desktop: R=390px (spacious 60px+ gap for 236px cards, grand Solomon scale)
    const nextRadius = mobile
      ? Math.max(165, Math.min(195, (width - 30) / 2))
      : Math.max(300, Math.min(410, (width - 60) / 2));

    setRadius(nextRadius);
  }, []);

  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, [updateDimensions]);

  // Main 60/120fps animation loop for continuous 3D cylinder rotation
  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const loop = (currentTime: number) => {
      const deltaMs = currentTime - lastTime;
      lastTime = currentTime;

      if (!isDraggingRef.current && Math.abs(velocityRef.current) > 0.005) {
        // Drag inertia coasting
        angleRef.current += velocityRef.current;
        // Smooth exponential friction
        velocityRef.current *= 0.93;
      } else if (!isDraggingRef.current && !prefersReducedMotion) {
        // Continuous non-stop 360-degree rotation (never pauses on click or hover)
        const degPerMs = 360 / FULL_ROTATION_MS;
        angleRef.current = (angleRef.current + degPerMs * deltaMs) % 360;
      }

      const currentAngle = angleRef.current;

      if (carouselRef.current) {
        carouselRef.current.style.transform = `rotateX(${TILT_X_DEG}deg) rotateY(${currentAngle.toFixed(2)}deg)`;
      }

      // Explicit visibility toggle: eliminates dual-face bleed-through & backwards text in rear
      const count = CORE_TECHNOLOGIES.length;
      for (let i = 0; i < count; i += 1) {
        const cardAngle = (currentAngle + i * 45) % 360;
        const norm = cardAngle < 0 ? cardAngle + 360 : cardAngle;
        const isRear = norm > 90 && norm < 270;
        const frontEl = frontRefs.current[i];
        const backEl = backRefs.current[i];
        if (frontEl && backEl) {
          if (isRear) {
            frontEl.style.visibility = "hidden";
            backEl.style.visibility = "visible";
          } else {
            frontEl.style.visibility = "visible";
            backEl.style.visibility = "hidden";
          }
        }
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Pointer drag interactions
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    dragDistanceRef.current = 0;
    lastPointerXRef.current = e.clientX;
    velocityRef.current = 0;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) {
      return;
    }
    const dx = e.clientX - lastPointerXRef.current;
    lastPointerXRef.current = e.clientX;
    dragDistanceRef.current += Math.abs(dx);

    // Drag sensitivity scaled by cylinder radius
    const deltaAngle = (dx / radius) * 57.3 * 0.75;
    angleRef.current = (angleRef.current + deltaAngle) % 360;
    velocityRef.current = deltaAngle;

    if (carouselRef.current) {
      carouselRef.current.style.transform = `rotateX(${TILT_X_DEG}deg) rotateY(${angleRef.current.toFixed(2)}deg)`;
    }
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  // Badge click handler: toggles active state without stopping rotation
  const handleBadgeClick = (name: string) => {
    if (dragDistanceRef.current > 6) {
      return;
    }
    setActiveTech((prev) => (prev === name ? null : name));
  };

  // Keyboard navigation on badges
  const handleBadgeKeyDown = (e: React.KeyboardEvent, name: string) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      angleRef.current = (angleRef.current - 45) % 360;
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      angleRef.current = (angleRef.current + 45) % 360;
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleBadgeClick(name);
    }
  };

  const cardWidth = isMobile ? 126 : 236;
  const cardHeight = isMobile ? 46 : 70;

  return (
    <Section
      className={cn(
        "isolate animate-none flex flex-col gap-6 py-10 sm:py-12",
        className
      )}
      id="skills"
    >
      <SectionHeading
        copyLinkTitle="Skills"
        description="Foundational languages, frameworks, and environments I use to build systems, mobile apps, and web platforms."
        eyebrow="01 — Technologies"
        title="Core Technologies"
      />

      <RevealItem delay={0.06}>
        {/* 3D Scene Viewport: perspective container with generous headroom and wider gaps */}
        <div
          ref={sceneRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onMouseLeave={() => {
            setHoveredTech(null);
          }}
          style={{
            perspective: isMobile ? "850px" : "1400px",
            perspectiveOrigin: "50% 50%",
          }}
          className="isolate relative h-[400px] sm:h-[520px] md:h-[580px] w-full select-none overflow-hidden touch-pan-y outline-none cursor-grab active:cursor-grabbing flex items-center justify-center"
        >
          {/* Subtle 3D circular ground track */}
          <div
            aria-hidden="true"
            style={{
              height: `${radius * 2}px`,
              transform: `rotateX(${90 + TILT_X_DEG}deg)`,
              width: `${radius * 2}px`,
            }}
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-border/40 dark:border-border/25 transition-all duration-300"
          />

          {/* 3D Carousel Cylinder Stage */}
          <div
            ref={carouselRef}
            style={{
              height: `${cardHeight}px`,
              transform: `rotateX(${TILT_X_DEG}deg) rotateY(0deg)`,
              transformStyle: "preserve-3d",
              width: `${cardWidth}px`,
            }}
            className="relative will-change-transform"
          >
            {CORE_TECHNOLOGIES.map((tech, index) => {
              const Icon = Icons[tech.icon];
              const isColored =
                activeTech === tech.name || hoveredTech === tech.name;
              const resolvedColor =
                isDark && tech.darkBrandColor
                  ? tech.darkBrandColor
                  : tech.brandColor;
              const angleDeg = index * 45;

              return (
                <button
                  key={tech.name}
                  type="button"
                  aria-pressed={activeTech === tech.name}
                  aria-label={tech.name}
                  onClick={() => handleBadgeClick(tech.name)}
                  onKeyDown={(e) => handleBadgeKeyDown(e, tech.name)}
                  onMouseEnter={() => {
                    setHoveredTech(tech.name);
                  }}
                  onMouseLeave={() => {
                    setHoveredTech(null);
                  }}
                  style={{
                    height: `${cardHeight}px`,
                    transform: `rotateY(${angleDeg}deg) translateZ(${radius}px)`,
                    transformStyle: "preserve-3d",
                    width: `${cardWidth}px`,
                  }}
                  className="absolute left-0 top-0 cursor-pointer select-none touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-2xl"
                >
                  {/* FRONT FACE (Outward facing, Solomon-scale bold badge) */}
                  <div
                    ref={(el) => {
                      frontRefs.current[index] = el;
                    }}
                    style={{
                      backfaceVisibility: "hidden",
                      ...(isColored
                        ? {
                            backgroundColor: tech.activeBg,
                            borderColor: tech.activeBorder,
                            boxShadow: tech.activeShadow,
                          }
                        : {}),
                    }}
                    className={cn(
                      "absolute inset-0 flex items-center justify-center gap-2.5 sm:gap-4 px-3.5 sm:px-7 rounded-2xl border border-border/85 bg-card/95 dark:bg-card/90 text-foreground shadow-md sm:shadow-lg transition-all duration-200",
                      tech.badgeHover,
                      isColored && "ring-2 ring-primary/25"
                    )}
                  >
                    <span
                      aria-hidden="true"
                      style={
                        isColored && resolvedColor
                          ? { color: resolvedColor }
                          : undefined
                      }
                      className={cn(
                        "inline-flex size-5 sm:size-8 shrink-0 items-center justify-center transition-all duration-500",
                        isColored
                          ? "rotate-[360deg] scale-110"
                          : "text-foreground/85",
                        tech.iconColor
                      )}
                    >
                      <Icon
                        data-colored={isColored ? "true" : undefined}
                        className="size-4 sm:size-6 md:size-6.5"
                      />
                    </span>
                    <span
                      className={cn(
                        "text-xs sm:text-lg md:text-xl font-bold tracking-tight whitespace-nowrap transition-colors",
                        isColored && "font-extrabold text-foreground"
                      )}
                    >
                      {tech.name}
                    </span>
                  </div>

                  {/* BACK FACE (Inward facing, visible through center when in background) */}
                  <div
                    ref={(el) => {
                      backRefs.current[index] = el;
                    }}
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                      visibility: "hidden",
                      ...(isColored
                        ? {
                            backgroundColor: tech.activeBg,
                            borderColor: tech.activeBorder,
                          }
                        : {}),
                    }}
                    className={cn(
                      "absolute inset-0 flex items-center justify-center gap-2 sm:gap-3.5 px-3 sm:px-6 rounded-2xl border border-border/40 bg-card/65 dark:bg-card/50 text-foreground/75 shadow-xs transition-all duration-200",
                      isColored && "ring-1 ring-primary/20 text-foreground"
                    )}
                  >
                    <span
                      aria-hidden="true"
                      style={
                        isColored && resolvedColor
                          ? { color: resolvedColor }
                          : undefined
                      }
                      className={cn(
                        "inline-flex size-4.5 sm:size-7 shrink-0 items-center justify-center text-foreground/70",
                        tech.iconColor
                      )}
                    >
                      <Icon className="size-3.5 sm:size-5.5" />
                    </span>
                    <span className="text-xs sm:text-base font-semibold tracking-tight whitespace-nowrap">
                      {tech.name}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </RevealItem>
    </Section>
  );
};

export { SkillsSection };
