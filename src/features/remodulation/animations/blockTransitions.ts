/**
 * Block transition animations for page remodulation.
 * FR13: Il Frontend può animare le transizioni tra layout
 * NFR-P3: Animazione completa in < 500ms
 */

import { Variants, Transition } from 'framer-motion'

// Maximum animation duration (NFR-P3)
export const MAX_ANIMATION_DURATION = 0.5 // 500ms

/**
 * Base transition configuration.
 * Uses spring physics for smooth, natural animations.
 */
export const baseTransition: Transition = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
  duration: MAX_ANIMATION_DURATION,
}

/**
 * Layout transition for block reordering.
 * Uses easeOut for a smooth, decelerating effect.
 */
export const layoutTransition: Transition = {
  type: 'spring',
  stiffness: 350,
  damping: 35,
  mass: 0.8,
}

/**
 * Fade transition for entering/exiting blocks.
 */
export const fadeTransition: Transition = {
  duration: 0.3,
  ease: [0.4, 0, 0.2, 1], // Material Design easing
}

/**
 * Stagger configuration for child elements.
 */
export const staggerConfig = {
  staggerChildren: 0.05,
  delayChildren: 0.1,
}

/**
 * Block visibility variants.
 * Used for animating blocks between different visibility states.
 */
export const blockVariants: Variants = {
  // Initial state (not yet animated in)
  initial: {
    opacity: 0,
    y: 30,
    scale: 0.95,
  },

  // Normal visible state
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: baseTransition,
  },

  // Highlighted/emphasized state
  highlighted: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      ...baseTransition,
      stiffness: 400,
    },
  },

  // Minimized/de-emphasized state
  minimized: {
    opacity: 0.6,
    y: 0,
    scale: 0.98,
    transition: fadeTransition,
  },

  // Hidden state (animating out)
  hidden: {
    opacity: 0,
    y: -20,
    scale: 0.95,
    transition: fadeTransition,
  },

  // Exit animation
  exit: {
    opacity: 0,
    y: -30,
    scale: 0.9,
    transition: {
      duration: 0.2,
      ease: 'easeIn',
    },
  },
}

/**
 * Pulse animation for attention-grabbing elements.
 */
export const pulseVariants: Variants = {
  initial: {
    scale: 1,
  },
  pulse: {
    scale: [1, 1.02, 1],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      repeatType: 'loop',
      ease: 'easeInOut',
    },
  },
}

/**
 * Slide-in variants for entering content.
 */
export const slideVariants: Variants = {
  initial: {
    x: -50,
    opacity: 0,
  },
  enter: {
    x: 0,
    opacity: 1,
    transition: baseTransition,
  },
  exit: {
    x: 50,
    opacity: 0,
    transition: fadeTransition,
  },
}

/**
 * Scale variants for modal/popup elements.
 */
export const scaleVariants: Variants = {
  initial: {
    scale: 0.8,
    opacity: 0,
  },
  enter: {
    scale: 1,
    opacity: 1,
    transition: baseTransition,
  },
  exit: {
    scale: 0.8,
    opacity: 0,
    transition: fadeTransition,
  },
}

/**
 * Container variants with stagger effect.
 */
export const containerVariants: Variants = {
  initial: {
    opacity: 0,
  },
  enter: {
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      ...staggerConfig,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      when: 'afterChildren',
      staggerChildren: 0.03,
      staggerDirection: -1,
    },
  },
}

/**
 * Child item variants for staggered animations.
 */
export const childVariants: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: baseTransition,
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: fadeTransition,
  },
}

/**
 * Highlight ring animation.
 */
export const highlightRingVariants: Variants = {
  initial: {
    boxShadow: '0 0 0 0 rgba(59, 130, 246, 0)',
  },
  highlighted: {
    boxShadow: [
      '0 0 0 0 rgba(59, 130, 246, 0)',
      '0 0 0 4px rgba(59, 130, 246, 0.3)',
      '0 0 0 8px rgba(59, 130, 246, 0)',
    ],
    transition: {
      duration: 1.5,
      repeat: 2,
      repeatType: 'loop',
    },
  },
  visible: {
    boxShadow: '0 0 0 0 rgba(59, 130, 246, 0)',
    transition: fadeTransition,
  },
}

/**
 * Get transition based on user's reduced motion preference.
 */
export function getTransition(reduceMotion: boolean): Transition {
  if (reduceMotion) {
    return {
      duration: 0,
    }
  }
  return baseTransition
}

/**
 * Get animation duration based on user preference.
 */
export function getAnimationDuration(
  preferredDuration: number,
  reduceMotion: boolean
): number {
  if (reduceMotion) {
    return 0
  }
  return Math.min(preferredDuration, MAX_ANIMATION_DURATION * 1000)
}
