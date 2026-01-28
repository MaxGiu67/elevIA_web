/**
 * Animation configurations for page remodulation.
 * FR13: Il Frontend può animare le transizioni tra layout
 * NFR-P3: Animazione completa in < 500ms
 */

export {
  MAX_ANIMATION_DURATION,
  baseTransition,
  layoutTransition,
  fadeTransition,
  staggerConfig,
  blockVariants,
  pulseVariants,
  slideVariants,
  scaleVariants,
  containerVariants,
  childVariants,
  highlightRingVariants,
  getTransition,
  getAnimationDuration,
} from './blockTransitions'
