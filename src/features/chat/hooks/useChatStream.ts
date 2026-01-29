/**
 * Hook for managing SSE chat streaming connections with session support.
 * FR6: Il Visitatore può digitare domande in linguaggio naturale
 * FR7: Il Visitatore può ricevere risposte testuali basate sulla knowledge base RAG
 * FR27: Il sistema può condurre conversazioni multi-turn
 */

import { useCallback, useRef, useState } from 'react'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://upgrai-api-production.up.railway.app'

const MAX_RETRIES = 2
const RETRY_BASE_DELAY_MS = 1500

/** Check if an error is a network-level failure (cold-start, DNS, connection refused). */
function isNetworkError(error: unknown): boolean {
  if (error instanceof TypeError) return true // "Failed to fetch"
  if (error instanceof Error && /failed to fetch|network|ECONNREFUSED/i.test(error.message)) return true
  return false
}

/** Server errors worth retrying (cold-start crashes, gateway errors). */
function isRetryableStatus(status: number): boolean {
  return status === 500 || status === 502 || status === 503 || status === 504
}

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function generateSessionId(): string {
  return `s_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`
}

export interface ChatSource {
  title: string
  type: string
  source: string
}

export interface PagePlanBlock {
  type: string
  priority: number
}

export interface PagePlan {
  variant_id: string
  blocks: PagePlanBlock[]
}

interface StreamCallbacks {
  onChunk: (content: string) => void
  onSources?: (sources: ChatSource[]) => void
  onPagePlan?: (plan: PagePlan) => void
  onRecommendedUseCases?: (useCaseIds: string[]) => void
  onSolutionPlan?: (plan: unknown) => void
  onNextInput?: (suggestion: string) => void
  onError: (error: string) => void
  onComplete: () => void
}

interface UseChatStreamReturn {
  sendMessage: (message: string, callbacks: StreamCallbacks) => Promise<void>
  abort: () => void
  isStreaming: boolean
  sessionId: string
}

/**
 * Hook for managing SSE chat streaming with session persistence.
 * Handles connection lifecycle, parsing, and cleanup.
 */
export function useChatStream(): UseChatStreamReturn {
  const [isStreaming, setIsStreaming] = useState(false)
  const abortControllerRef = useRef<AbortController | null>(null)
  const sessionIdRef = useRef<string>(generateSessionId())

  const abort = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
      abortControllerRef.current = null
    }
    setIsStreaming(false)
  }, [])

  const sendMessage = useCallback(async (message: string, callbacks: StreamCallbacks) => {
    // Abort any existing stream
    abort()

    // Create new abort controller
    const abortController = new AbortController()
    abortControllerRef.current = abortController

    setIsStreaming(true)

    try {
      // Retry loop for cold-start / network / server errors
      let response: Response | undefined
      for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
        try {
          response = await fetch(`${API_URL}/api/chat`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              query: message,
              session_id: sessionIdRef.current,
            }),
            signal: abortController.signal,
          })

          // Retry on server errors (500, 502, 503, 504)
          if (isRetryableStatus(response.status) && attempt < MAX_RETRIES) {
            await wait(RETRY_BASE_DELAY_MS * (attempt + 1))
            continue
          }

          break // success or non-retryable error — exit retry loop
        } catch (fetchError) {
          if (abortController.signal.aborted) throw fetchError
          if (!isNetworkError(fetchError) || attempt === MAX_RETRIES) throw fetchError
          // Wait with exponential backoff before retrying
          await wait(RETRY_BASE_DELAY_MS * (attempt + 1))
        }
      }

      if (!response) {
        throw new Error('Connessione al server non riuscita. Riprova tra qualche secondo.')
      }

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error('Troppe richieste. Attendi un momento prima di riprovare.')
        }
        if (response.status === 500) {
          throw new Error('Il server ha avuto un problema. Riprova tra qualche secondo.')
        }
        throw new Error('Si è verificato un errore. Riprova.')
      }

      const reader = response.body?.getReader()
      if (!reader) {
        throw new Error('Streaming non supportato')
      }

      const decoder = new TextDecoder()
      let buffer = ''

      while (true) {
        const { done, value } = await reader.read()

        if (done) {
          break
        }

        // Check if aborted
        if (abortController.signal.aborted) {
          reader.cancel()
          break
        }

        // Decode chunk and add to buffer
        buffer += decoder.decode(value, { stream: true })

        // Process complete lines
        const lines = buffer.split('\n')
        buffer = lines.pop() || '' // Keep incomplete line in buffer

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6))

              switch (data.type) {
                case 'chat_chunk':
                  callbacks.onChunk(data.content || '')
                  break

                case 'sources':
                  callbacks.onSources?.(data.sources || [])
                  break

                case 'page_plan':
                  callbacks.onPagePlan?.(data.plan)
                  break

                case 'recommended_use_cases':
                  callbacks.onRecommendedUseCases?.(data.use_cases || [])
                  break

                case 'solution_plan':
                  callbacks.onSolutionPlan?.(data.plan)
                  break

                case 'next_input':
                  callbacks.onNextInput?.(data.suggestion || '')
                  break

                case 'error':
                  callbacks.onError(data.message || 'Errore sconosciuto')
                  break
              }
            } catch {
              // Ignore JSON parse errors for incomplete chunks
            }
          }
        }
      }

      // Process any remaining data in buffer
      if (buffer.startsWith('data: ')) {
        try {
          const data = JSON.parse(buffer.slice(6))
          if (data.type === 'chat_chunk') {
            callbacks.onChunk(data.content || '')
          } else if (data.type === 'sources') {
            callbacks.onSources?.(data.sources || [])
          } else if (data.type === 'page_plan') {
            callbacks.onPagePlan?.(data.plan)
          } else if (data.type === 'recommended_use_cases') {
            callbacks.onRecommendedUseCases?.(data.use_cases || [])
          } else if (data.type === 'solution_plan') {
            callbacks.onSolutionPlan?.(data.plan)
          } else if (data.type === 'next_input') {
            callbacks.onNextInput?.(data.suggestion || '')
          }
        } catch {
          // Ignore incomplete final chunk
        }
      }

      callbacks.onComplete()

    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          // Request was aborted, don't report as error
          return
        }
        callbacks.onError(error.message)
      } else {
        callbacks.onError('Errore sconosciuto')
      }
    } finally {
      setIsStreaming(false)
      abortControllerRef.current = null
    }
  }, [abort])

  return {
    sendMessage,
    abort,
    isStreaming,
    sessionId: sessionIdRef.current,
  }
}

/**
 * Utility to parse SSE events from a text stream.
 * Can be used for custom implementations.
 */
export function parseSSEEvent(line: string): { type: string; data: unknown } | null {
  if (!line.startsWith('data: ')) {
    return null
  }

  try {
    const data = JSON.parse(line.slice(6))
    return {
      type: data.type || 'unknown',
      data,
    }
  } catch {
    return null
  }
}
