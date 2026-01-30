/**
 * Zustand store for page remodulation state.
 * FR12: Il Frontend può riorganizzare i blocchi in base al Page Plan
 */

import { create } from 'zustand'

export type BlockType =
  | 'hero'
  | 'problems'
  | 'use_cases'
  | 'features'
  | 'stats'
  | 'cta'
  | 'area_highlight'
  | 'use_case_detail'

export type BlockVisibility = 'visible' | 'highlighted' | 'minimized' | 'hidden'

export interface PageBlock {
  type: BlockType
  priority: number
  visibility: BlockVisibility
  content_ref?: string
  props?: Record<string, unknown>
  animation?: string
}

export interface PagePlan {
  variant_id: string
  blocks: PageBlock[]
  highlight_areas: string[]
  highlight_use_cases: string[]
  scroll_to?: string
  animation_duration: number
  metadata?: Record<string, unknown>
}

interface PagePlanState {
  // Current page plan
  currentPlan: PagePlan | null

  // Previous plan (for animations)
  previousPlan: PagePlan | null

  // Whether a transition is in progress
  isTransitioning: boolean

  // Animation preference
  reduceMotion: boolean

  // Actions
  setPlan: (plan: PagePlan) => void
  resetToDefault: () => void
  setTransitioning: (value: boolean) => void
  setReduceMotion: (value: boolean) => void

  // Selectors
  getBlockOrder: () => BlockType[]
  getBlockVisibility: (type: BlockType) => BlockVisibility
  isBlockHighlighted: (type: BlockType) => boolean
  shouldShowBlock: (type: BlockType) => boolean
}

// Default page plan
const DEFAULT_PLAN: PagePlan = {
  variant_id: 'default',
  blocks: [
    { type: 'hero', priority: 1, visibility: 'visible' },
    { type: 'use_cases', priority: 2, visibility: 'visible' },
    { type: 'stats', priority: 3, visibility: 'visible' },
    { type: 'problems', priority: 4, visibility: 'visible' },
    { type: 'features', priority: 5, visibility: 'visible' },
    { type: 'cta', priority: 6, visibility: 'visible' },
  ],
  highlight_areas: [],
  highlight_use_cases: [],
  animation_duration: 500,
}

export const usePagePlanStore = create<PagePlanState>((set, get) => ({
  currentPlan: DEFAULT_PLAN,
  previousPlan: null,
  isTransitioning: false,
  reduceMotion: false,

  setPlan: (plan: PagePlan) => {
    const current = get().currentPlan
    const duration = get().reduceMotion ? 0 : plan.animation_duration

    set({
      previousPlan: current,
      currentPlan: plan,
      isTransitioning: true,
    })

    // End transition after animation completes
    if (duration > 0) {
      setTimeout(() => {
        set({ isTransitioning: false })
      }, duration)
    } else {
      set({ isTransitioning: false })
    }
  },

  resetToDefault: () => {
    const current = get().currentPlan
    set({
      previousPlan: current,
      currentPlan: DEFAULT_PLAN,
      isTransitioning: true,
    })

    setTimeout(() => {
      set({ isTransitioning: false })
    }, DEFAULT_PLAN.animation_duration)
  },

  setTransitioning: (value: boolean) => {
    set({ isTransitioning: value })
  },

  setReduceMotion: (value: boolean) => {
    set({ reduceMotion: value })
  },

  // Get blocks sorted by priority
  getBlockOrder: () => {
    const plan = get().currentPlan
    if (!plan) return []

    return plan.blocks
      .filter((b) => b.visibility !== 'hidden')
      .sort((a, b) => a.priority - b.priority)
      .map((b) => b.type)
  },

  // Get visibility for a specific block
  getBlockVisibility: (type: BlockType) => {
    const plan = get().currentPlan
    if (!plan) return 'visible'

    const block = plan.blocks.find((b) => b.type === type)
    return block?.visibility || 'visible'
  },

  // Check if block is highlighted
  isBlockHighlighted: (type: BlockType) => {
    const plan = get().currentPlan
    if (!plan) return false

    const block = plan.blocks.find((b) => b.type === type)
    return block?.visibility === 'highlighted'
  },

  // Check if block should be shown
  shouldShowBlock: (type: BlockType) => {
    const plan = get().currentPlan
    if (!plan) return true

    const block = plan.blocks.find((b) => b.type === type)
    return block?.visibility !== 'hidden'
  },
}))

/**
 * Hook to check and respect user's reduced motion preference.
 */
export function useReducedMotion(): boolean {
  if (typeof window === 'undefined') return false

  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  return mediaQuery.matches
}
