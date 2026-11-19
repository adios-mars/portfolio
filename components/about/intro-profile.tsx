"use client";

import {
  AnimatePresence,
  LayoutGroup,
  MotionConfig,
  motion,
  useReducedMotion,
} from "motion/react";
import { useEffect, useState } from "react";

import { FlipRoles } from "@/components/about/flip-roles";
import { Title } from "@/components/ui/title";
import { UserAvatar } from "@/components/user-avatar";
import { USER } from "@/constants/user";
import { useLockBodyScroll } from "@/hooks/use-lock-body-scroll";
import {
  finishHydration,
  hasSeenGreeting,
  isHydrating,
  markGreetingSeen,
} from "@/lib/intro-session";

const GREETINGS = [
  "Hello",
  "ሰላም",
  "Bonjour",
  "Ciao",
  "Guten Tag",
  "स्वागत है",
] as const;
const GREETING_DURATION_MS = 170;
const IDENTITY_HOLD_MS = 550;
const PROFILE_LAYOUT_DURATION_SECONDS = 0.65;
const CURTAIN_DELAY_SECONDS = 0.05;
const CURTAIN_DURATION_SECONDS = 0.55;
const DETAIL_DELAY_SECONDS = 0.35;
const DETAIL_DURATION_SECONDS = 0.22;
const ROLE_STAGGER_SECONDS = 0.06;
const PROFILE_AVATAR_LAYOUT_ID = "home-profile-avatar";
const PROFILE_NAME_LAYOUT_ID = "home-profile-name";

const profileLayoutTransition = {
  duration: PROFILE_LAYOUT_DURATION_SECONDS,
  ease: [0.77, 0, 0.175, 1],
  type: "tween",
} as const;

const curtainTransition = {
  delay: CURTAIN_DELAY_SECONDS,
  duration: CURTAIN_DURATION_SECONDS,
  ease: [0.76, 0, 0.24, 1],
  type: "tween",
} as const;

const detailTransition = {
  delay: DETAIL_DELAY_SECONDS,
  duration: DETAIL_DURATION_SECONDS,
  ease: [0.23, 1, 0.32, 1],
  type: "tween",
} as const;

const roleTransition = {
  ...detailTransition,
  delay: DETAIL_DELAY_SECONDS + ROLE_STAGGER_SECONDS,
} as const;

type IntroPhase = "greetings" | "identity" | "profile";

interface ProfileHeaderProps {
  shouldAnimateDetails: boolean;
}

type IntroMode = "pending" | "play" | "skip";

interface IntroProfileProps {
  mode: IntroMode;
}

const ProfileHeader = ({ shouldAnimateDetails }: ProfileHeaderProps) => (
  <div className="relative z-2 flex items-center gap-5 sm:gap-6">
    <div>
      <UserAvatar
        layoutId={shouldAnimateDetails ? PROFILE_AVATAR_LAYOUT_ID : undefined}
        layoutTransition={
          shouldAnimateDetails ? profileLayoutTransition : undefined
        }
        size={80}
      />
    </div>
    <div>
      <Title className="font-sans text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight whitespace-nowrap">
        <motion.span
          layoutId={shouldAnimateDetails ? PROFILE_NAME_LAYOUT_ID : undefined}
          className="inline-block"
          transition={
            shouldAnimateDetails
              ? { layout: profileLayoutTransition }
              : undefined
          }
        >
          {USER.firstName}
        </motion.span>{" "}
        <motion.span
          className="inline-block"
          initial={
            shouldAnimateDetails
              ? { opacity: 0, transform: "translate3d(0, 2px, 0)" }
              : false
          }
          animate={{ opacity: 1, transform: "translate3d(0, 0, 0)" }}
          transition={detailTransition}
        >
          {USER.lastName}
        </motion.span>
      </Title>
      <motion.div
        initial={
          shouldAnimateDetails
            ? { opacity: 0, transform: "translate3d(0, 4px, 0)" }
            : false
        }
        animate={{ opacity: 1, transform: "translate3d(0, 0, 0)" }}
        transition={roleTransition}
      >
        <FlipRoles>{USER.roles}</FlipRoles>
      </motion.div>
    </div>
  </div>
);

const IntroProfile = ({ mode }: IntroProfileProps) => {
  const shouldReduceMotion = useReducedMotion();
  const [phase, setPhase] = useState<IntroPhase>("greetings");
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [isIntroComplete, setIsIntroComplete] = useState(false);
  const isClient = typeof window !== "undefined";
  const alreadySeen =
    isClient &&
    !isHydrating() &&
    (hasSeenGreeting() || Boolean(window.location.hash));
  const shouldPlayIntro =
    mode === "play" && !shouldReduceMotion && !alreadySeen;
  const visiblePhase = shouldPlayIntro ? phase : "profile";
  const shouldLockScroll = shouldPlayIntro && !isIntroComplete;

  useLockBodyScroll(shouldLockScroll);

  useEffect(() => {
    finishHydration();
    if (!shouldPlayIntro) {
      markGreetingSeen();
      return;
    }

    const timers = GREETINGS.slice(1).map((_, index) =>
      window.setTimeout(
        () => setGreetingIndex(index + 1),
        (index + 1) * GREETING_DURATION_MS
      )
    );
    const identityStart = GREETINGS.length * GREETING_DURATION_MS;

    timers.push(
      window.setTimeout(() => setPhase("identity"), identityStart),
      window.setTimeout(
        () => setPhase("profile"),
        identityStart + IDENTITY_HOLD_MS
      ),
      // Fail-safe unlock: ensures scroll and UI are never blocked
      window.setTimeout(
        () => {
          setIsIntroComplete(true);
          setPhase("profile");
          markGreetingSeen();
        },
        identityStart + IDENTITY_HOLD_MS + 700
      )
    );

    return () => {
      for (const timer of timers) {
        window.clearTimeout(timer);
      }
    };
  }, [shouldPlayIntro]);

  return (
    <MotionConfig reducedMotion="user">
      <LayoutGroup id="home-profile-intro">
        <div>
          {shouldPlayIntro && !isIntroComplete ? (
            <AnimatePresence
              initial={false}
              onExitComplete={() => {
                setIsIntroComplete(true);
                markGreetingSeen();
              }}
            >
              {visiblePhase === "profile" ? null : (
                <motion.div
                  key="intro-backdrop"
                  data-intro-backdrop=""
                  aria-hidden="true"
                  className="bg-background pointer-events-none fixed inset-0 z-[80] will-change-transform"
                  initial={{ y: 0 }}
                  animate={{ y: 0 }}
                  exit={{ y: "-100%" }}
                  transition={curtainTransition}
                />
              )}
            </AnimatePresence>
          ) : null}

          {shouldPlayIntro && visiblePhase === "greetings" ? (
            <div
              aria-hidden="true"
              className="text-foreground pointer-events-none fixed inset-0 z-[90] flex items-center justify-center gap-2.5 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight"
            >
              <span className="size-2.5 rounded-full bg-zinc-900 dark:bg-white" />
              <span>{GREETINGS[greetingIndex]}</span>
            </div>
          ) : null}

          {shouldPlayIntro && visiblePhase === "identity" ? (
            <div
              aria-hidden="true"
              className="text-foreground pointer-events-none fixed inset-0 z-[90] flex items-center justify-center gap-3 text-3xl sm:text-4xl md:text-5xl tracking-tight"
            >
              <span className="font-light text-muted-foreground">I’m</span>
              <UserAvatar
                layoutId={PROFILE_AVATAR_LAYOUT_ID}
                layoutTransition={profileLayoutTransition}
                size={44}
              />
              <motion.span
                layoutId={PROFILE_NAME_LAYOUT_ID}
                className="inline-block font-bold"
                transition={{ layout: profileLayoutTransition }}
              >
                {USER.firstName}
              </motion.span>
            </div>
          ) : null}

          {visiblePhase === "profile" ? (
            <ProfileHeader shouldAnimateDetails={shouldPlayIntro} />
          ) : null}
        </div>
      </LayoutGroup>
    </MotionConfig>
  );
};

export { IntroProfile };
export type { IntroMode };
