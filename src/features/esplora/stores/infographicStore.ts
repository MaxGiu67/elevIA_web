/**
 * Zustand store for problem infographic state.
 * Stores the AI-generated infographic data (statistic + image)
 * for rendering in the PersonalizedEsplora page.
 */

import { create } from 'zustand'

export interface ProblemInfographicData {
  stat: { text: string; source: string; url: string } | null
  imageUrl: string | null
  problemSummary: string
}

interface InfographicState {
  data: ProblemInfographicData | null
  setData: (data: ProblemInfographicData) => void
  clearData: () => void
}

export const useInfographicStore = create<InfographicState>((set) => ({
  data: null,

  setData: (data: ProblemInfographicData) => {
    set({ data })
  },

  clearData: () => {
    set({ data: null })
  },
}))
