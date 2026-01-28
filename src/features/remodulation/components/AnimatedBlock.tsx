'use client'

/**
 * Animated Block wrapper component.
 * Provides consistent animations for page remodulation blocks.
 * FR13: Il Frontend può animare le transizioni tra layout
 * NFR-P3: Animazione completa in < 500ms
 */

import { ReactNode, useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import {
  blockVariants,
  highlightRingVariants,
  pulseVariants,
  layoutTransition,
  getTransition,
} from '../animations/blockTransitions'
import { BlockVisibility } from '../stores/pagePlanStore'

interface AnimatedBlockProps {
  children: ReactNode
  visibility?: BlockVisibility
  layoutId?: string
  className?: string
  animation?: 'none' | 'pulse' | 'highlight'
  delay?: number
  onAnimationComplete?: () => void
}

/**
 * Wrapper component that provides layout animations for page blocks.
 * Respects user's reduced motion preference.
 */
export function AnimatedBlock({
  children,
  visibility = 'visible',
  layoutId,
  className = '',
  animation = 'none',
  delay = 0,
  onAnimationComplete,
}: AnimatedBlockProps) {
  const prefersReducedMotion = useReducedMotion()
  const [hasAnimated, setHasAnimated] = useState(false)

  // Track when initial animation completes
  useEffect(() => {
    if (!hasAnimated) {
      const timer = setTimeout(() => {
        setHasAnimated(true)
      }, delay * 1000 + 500)
      return () => clearTimeout(timer)
    }
  }, [delay, hasAnimated])

  // Get appropriate transition based on motion preference
  const transition = getTransition(prefersReducedMotion ?? false)

  // Determine animation variant
  const animateVariant = visibility

  // Additional animation classes
  const animationClasses = {
    pulse: animation === 'pulse' ? 'animate-pulse' : '',
    highlight: visibility === 'highlighted' ? 'ring-4 ring-primary-200 ring-offset-2' : '',
  }

  return (
    <motion.div
      layoutId={layoutId}
      initial={prefersReducedMotion ? false : 'initial'}
      animate={animateVariant}
      exit="exit"
      variants={blockVariants}
      transition={{
        ...transition,
        delay,
        layout: layoutTransition,
      }}
      onAnimationComplete={onAnimationComplete}
      className={`
        animated-block
        ${animationClasses.pulse}
        ${animationClasses.highlight}
        ${className}
      `}
    >
      {/* Highlight ring overlay for highlighted blocks */}
      {visibility === 'highlighted' && !prefersReducedMotion && (
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-lg"
          variants={highlightRingVariants}
          initial="initial"
          animate="highlighted"
        />
      )}

      {/* Pulse animation overlay */}
      {animation === 'pulse' && !prefersReducedMotion && (
        <motion.div
          className="absolute inset-0 bg-primary-500/5 rounded-lg pointer-events-none"
          variants={pulseVariants}
          initial="initial"
          animate="pulse"
        />
      )}

      {children}
    </motion.div>
  )
}

/**
 * Container for animated block groups with stagger effect.
 */
interface AnimatedBlockGroupProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
}

export function AnimatedBlockGroup({
  children,
  className = '',
  staggerDelay = 0.1,
}: AnimatedBlockGroupProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      initial="initial"
      animate="enter"
      exit="exit"
      variants={{
        initial: { opacity: 0 },
        enter: {
          opacity: 1,
          transition: {
            when: 'beforeChildren',
            staggerChildren: prefersReducedMotion ? 0 : staggerDelay,
          },
        },
        exit: {
          opacity: 0,
          transition: {
            when: 'afterChildren',
            staggerChildren: 0.05,
            staggerDirection: -1,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/**
 * Hook to check if animations should be disabled.
 */
export function useAnimationsEnabled(): boolean {
  const prefersReducedMotion = useReducedMotion()
  return !prefersReducedMotion
}

export default AnimatedBlock
