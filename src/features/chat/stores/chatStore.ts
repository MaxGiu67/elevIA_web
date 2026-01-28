/**
 * Chat Store using Zustand.
 * Manages chat state including messages, loading state, and AI status.
 */

import { create } from 'zustand'

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  sources?: ChatSource[]
  isStreaming?: boolean
}

export interface ChatSource {
  title: string
  type: string
  source: string
}

export interface ChatState {
  // State
  isOpen: boolean
  messages: ChatMessage[]
  isLoading: boolean
  isStreaming: boolean
  error: string | null
  aiStatus: 'available' | 'unavailable' | 'unknown'

  // Actions
  toggleChat: () => void
  openChat: () => void
  closeChat: () => void
  addMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void
  updateLastMessage: (content: string, isStreaming?: boolean) => void
  setLastMessageSources: (sources: ChatSource[]) => void
  setLoading: (loading: boolean) => void
  setStreaming: (streaming: boolean) => void
  setError: (error: string | null) => void
  setAiStatus: (status: 'available' | 'unavailable' | 'unknown') => void
  clearMessages: () => void
  clearError: () => void
}

const generateId = () => `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

export const useChatStore = create<ChatState>((set, get) => ({
  // Initial state
  isOpen: false,
  messages: [],
  isLoading: false,
  isStreaming: false,
  error: null,
  aiStatus: 'unknown',

  // Actions
  toggleChat: () => set((state) => ({ isOpen: !state.isOpen })),

  openChat: () => set({ isOpen: true }),

  closeChat: () => set({ isOpen: false }),

  addMessage: (message) =>
    set((state) => ({
      messages: [
        ...state.messages,
        {
          ...message,
          id: generateId(),
          timestamp: new Date(),
        },
      ],
    })),

  updateLastMessage: (content, isStreaming = false) =>
    set((state) => {
      const messages = [...state.messages]
      const lastIndex = messages.length - 1
      if (lastIndex >= 0 && messages[lastIndex].role === 'assistant') {
        messages[lastIndex] = {
          ...messages[lastIndex],
          content,
          isStreaming,
        }
      }
      return { messages }
    }),

  setLastMessageSources: (sources) =>
    set((state) => {
      const messages = [...state.messages]
      const lastIndex = messages.length - 1
      if (lastIndex >= 0 && messages[lastIndex].role === 'assistant') {
        messages[lastIndex] = {
          ...messages[lastIndex],
          sources,
        }
      }
      return { messages }
    }),

  setLoading: (loading) => set({ isLoading: loading }),

  setStreaming: (streaming) => set({ isStreaming: streaming }),

  setError: (error) => set({ error }),

  setAiStatus: (status) => set({ aiStatus: status }),

  clearMessages: () => set({ messages: [] }),

  clearError: () => set({ error: null }),
}))
