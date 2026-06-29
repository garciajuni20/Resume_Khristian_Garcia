import type { Variants } from 'framer-motion';

export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.25 } },
};

export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.45 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

export const staggerContainer: Variants = {
  initial: {},
  animate: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

export const staggerFast: Variants = {
  initial: {},
  animate: { transition: { staggerChildren: 0.05 } },
};

export const scaleIn: Variants = {
  initial: { scale: 0.88, opacity: 0 },
  animate: { scale: 1, opacity: 1, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit: { scale: 0.92, opacity: 0, transition: { duration: 0.2 } },
};

export const slideInLeft: Variants = {
  initial: { x: -40, opacity: 0 },
  animate: { x: 0, opacity: 1, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit: { x: -20, opacity: 0 },
};

export const slideInRight: Variants = {
  initial: { x: 40, opacity: 0 },
  animate: { x: 0, opacity: 1, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit: { x: 20, opacity: 0 },
};

export const slideIn = (direction: 'left' | 'right' | 'up' | 'down' = 'left'): Variants => {
  const map = { left: { x: -60, y: 0 }, right: { x: 60, y: 0 }, up: { x: 0, y: -60 }, down: { x: 0, y: 60 } };
  return {
    initial: { ...map[direction], opacity: 0 },
    animate: { x: 0, y: 0, opacity: 1, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
    exit: { ...map[direction], opacity: 0 },
  };
};

export const cardReveal: Variants = {
  initial: { opacity: 0, y: 20, scale: 0.97 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export const floatingAnimation = {
  initial: { y: 0 },
  animate: {
    y: [0, -8, 0],
    transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
  },
};

export const glowPulse = {
  animate: {
    opacity: [0.3, 0.6, 0.3],
    scale: [1, 1.08, 1],
    transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
  },
};

export const pageTransition: Variants = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.22 } },
};
