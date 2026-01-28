/**
 * Block components (Mattoncini) for Page Remodulation.
 *
 * These blocks are the building blocks for dynamic page layouts.
 * They can be composed and reordered based on user intent.
 */

export { ProblemBlock } from './ProblemBlock'
export { SolutionBlock } from './SolutionBlock'
export { KPIBlock } from './KPIBlock'
export { ComparisonBlock } from './ComparisonBlock'
export { RequirementsBlock } from './RequirementsBlock'
export { TechStackBlock } from './TechStackBlock'
export { CTABlock } from './CTABlock'
export { RelatedBlock } from './RelatedBlock'

// Block type definitions
export type BlockType =
  | 'problem'
  | 'solution'
  | 'kpi'
  | 'how-it-works'
  | 'benefits'
  | 'testimonial'
  | 'comparison'
  | 'faq'
  | 'related'
  | 'cta'
  | 'tech-stack'
  | 'timeline'
  | 'requirements'
