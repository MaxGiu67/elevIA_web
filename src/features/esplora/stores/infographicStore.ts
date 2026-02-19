/**
 * Zustand store for problem infographic state.
 * Stores the AI-generated infographic data (statistic + image)
 * for rendering in the PersonalizedEsplora page.
 */

import { create } from 'zustand'

export interface ProblemInfographicData {
  stat: { text: string; source: string; url: string } | null
  imageUrl: string | null
  sessionId: string | null
  problemSummary: string
}

interface InfographicState {
  data: ProblemInfographicData | null
  setData: (data: ProblemInfographicData) => void
  setImageUrl: (url: string) => void
  clearData: () => void
}

export const useInfographicStore = create<InfographicState>((set) => ({
  data: null,

  setData: (data: ProblemInfographicData) => {
    set({ data })
  },

  setImageUrl: (url: string) => {
    set((state) => {
      if (!state.data) return state
      return { data: { ...state.data, imageUrl: url } }
    })
  },

  clearData: () => {
    set({ data: null })
  },
}))
