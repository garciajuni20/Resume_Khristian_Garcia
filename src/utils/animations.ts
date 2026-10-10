import type { Variants } from 'framer-motion';

/** Shared brand easing curve — use everywhere instead of repeating the array inline. */
export const EASE = [0.25, 0.46, 0.45, 0.94] as const;

/** Fluid mass-and-spring curve used by the Notion-style blocks. */
export const FLUID = [0.32, 0.72, 0, 1] as const;

export const staggerContainer: Variants = {
  initial: {},
  animate: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

export const cardReveal: Variants = {
  initial: { opacity: 0, y: 20, scale: 0.97 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: EASE } },
};
