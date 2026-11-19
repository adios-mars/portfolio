"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

const REVEAL_EASE = [0.22, 1, 0.36, 1] as const;

interface RevealItemProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  yOffset?: number;
}

/**
 * Reveals content smoothly on viewport entry using Motion while bypassing
 * transforms when the user prefers reduced motion.
 */
export const RevealItem = ({
  children,
  className,
  delay = 0,
  yOffset = 20,
}: RevealItemProps) => {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: yOffset }}
      transition={{ delay, duration: 0.55, ease: REVEAL_EASE }}
      viewport={{ amount: 0.08, once: true }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      {children}
    </motion.div>
  );
};
