'use client'

/**
 * Page Plan Renderer Component.
 * Renders page blocks according to the current page plan.
 * FR12: Il Frontend può riorganizzare i blocchi in base al Page Plan
 */

import { useEffect, useMemo } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import {
  usePagePlanStore,
  BlockType,
  BlockVisibility,
  useReducedMotion,
} from '../stores/pagePlanStore'

// Import landing page components
import { Hero } from '@/components/Hero'
import {
  Problems,
  UseCases,
  Features,
  Stats,
  CTASection,
} from '@/features/landing/components'

interface BlockConfig {
  component: React.ComponentType<BlockProps>
  id: string
}

interface BlockProps {
  isHighlighted?: boolean
  isMinimized?: boolean
  highlightAreas?: string[]
  highlightUseCases?: string[]
}

// Map block types to components
const BLOCK_COMPONENTS: Record<BlockType, BlockConfig> = {
  hero: { component: Hero as React.ComponentType<BlockProps>, id: 'hero' },
  problems: { component: Problems as React.ComponentType<BlockProps>, id: 'problems' },
  use_cases: { component: UseCases as React.ComponentType<BlockProps>, id: 'use-cases' },
  features: { component: Features as React.ComponentType<BlockProps>, id: 'features' },
  stats: { component: Stats as React.ComponentType<BlockProps>, id: 'stats' },
  cta: { component: CTASection as React.ComponentType<BlockProps>, id: 'contact' },
  area_highlight: { component: AreaHighlight as React.ComponentType<BlockProps>, id: 'area-highlight' },
  use_case_detail: { component: UseCaseDetail as React.ComponentType<BlockProps>, id: 'use-case-detail' },
}

// Animation variants
const blockVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
  highlighted: {
    opacity: 1,
    y: 0,
    scale: 1,
    boxShadow: '0 0 0 4px rgba(59, 130, 246, 0.3)',
  },
  minimized: {
    opacity: 0.7,
    y: 0,
    scale: 0.98,
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.95,
  },
}

interface PagePlanRendererProps {
  className?: string
}

export function PagePlanRenderer({ className = '' }: PagePlanRendererProps) {
  const {
    currentPlan,
    isTransitioning,
    getBlockOrder,
    getBlockVisibility,
    setReduceMotion,
  } = usePagePlanStore()

  const reducedMotion = useReducedMotion()

  // Set reduced motion preference
  useEffect(() => {
    setReduceMotion(reducedMotion)
  }, [reducedMotion, setReduceMotion])

  // Get ordered blocks
  const orderedBlocks = useMemo(() => {
    return getBlockOrder()
  }, [getBlockOrder, currentPlan])

  // Scroll to target block after remodulation
  useEffect(() => {
    if (currentPlan?.scroll_to && !isTransitioning) {
      const config = BLOCK_COMPONENTS[currentPlan.scroll_to as BlockType]
      if (config) {
        const element = document.getElementById(config.id)
        if (element) {
          element.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' })
        }
      }
    }
  }, [currentPlan?.scroll_to, isTransitioning, reducedMotion])

  const animationDuration = reducedMotion ? 0 : (currentPlan?.animation_duration || 500) / 1000

  return (
    <LayoutGroup>
      <div className={`page-plan-renderer ${className}`}>
        <AnimatePresence mode="popLayout">
          {orderedBlocks.map((blockType, index) => {
            const config = BLOCK_COMPONENTS[blockType]
            if (!config) return null

            const Component = config.component
            const visibility = getBlockVisibility(blockType)

            // Don't render hidden blocks
            if (visibility === 'hidden') return null

            return (
              <motion.section
                key={blockType}
                layoutId={blockType}
                id={config.id}
                initial="hidden"
                animate={visibility}
                exit="exit"
                variants={blockVariants}
                transition={{
                  duration: animationDuration,
                  delay: index * 0.05,
                  layout: {
                    duration: animationDuration,
                    ease: [0.4, 0, 0.2, 1],
                  },
                }}
                className={`
                  relative
                  ${visibility === 'minimized' ? 'opacity-70' : ''}
                  ${visibility === 'highlighted' ? 'ring-4 ring-primary-200 ring-offset-4' : ''}
                `}
              >
                <Component
                  isHighlighted={visibility === 'highlighted'}
                  isMinimized={visibility === 'minimized'}
                  highlightAreas={currentPlan?.highlight_areas}
                  highlightUseCases={currentPlan?.highlight_use_cases}
                />
              </motion.section>
            )
          })}
        </AnimatePresence>
      </div>
    </LayoutGroup>
  )
}

/**
 * Area Highlight component placeholder.
 * Used when a specific elevIA area is highlighted.
 */
function AreaHighlight({ highlightAreas }: BlockProps) {
  if (!highlightAreas || highlightAreas.length === 0) return null

  const areaNames: Record<string, string> = {
    cx: 'Customer Experience',
    knowledge: 'Knowledge Management',
    operations: 'Operations',
    workflow: 'Workflow Automation',
    hr: 'Human Resources',
  }

  return (
    <div className="bg-gradient-to-r from-primary-50 to-secondary-50 py-12">
      <div className="container mx-auto px-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Focus: {highlightAreas.map(a => areaNames[a] || a).join(', ')}
        </h2>
        <p className="text-gray-600">
          Scopri i nostri Use Case specifici per questa area.
        </p>
      </div>
    </div>
  )
}

/**
 * Use Case Detail component placeholder.
 * Used when a specific use case is expanded.
 */
function UseCaseDetail({ highlightUseCases }: BlockProps) {
  if (!highlightUseCases || highlightUseCases.length === 0) return null

  return (
    <div className="bg-white py-12">
      <div className="container mx-auto px-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Use Case in Evidenza
        </h2>
        <ul className="space-y-2">
          {highlightUseCases.map((uc) => (
            <li key={uc} className="text-gray-600">
              • {uc.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default PagePlanRenderer
