/**
 * Hook for managing SSE chat streaming connections.
 * FR6: Il Visitatore può digitare domande in linguaggio naturale
 * FR7: Il Visitatore può ricevere risposte testuali basate sulla knowledge base RAG
 */

import { useCallback, useRef, useState } from 'react'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

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
  onSources: (sources: ChatSource[]) => void
  onPagePlan?: (plan: PagePlan) => void
  onError: (error: string) => void
  onComplete: () => void
}

interface UseChatStreamReturn {
  sendMessage: (message: string, callbacks: StreamCallbacks) => Promise<void>
  abort: () => void
  isStreaming: boolean
}

/**
 * Hook for managing SSE chat streaming.
 * Handles connection lifecycle, parsing, and cleanup.
 */
export function useChatStream(): UseChatStreamReturn {
  const [isStreaming, setIsStreaming] = useState(false)
  const abortControllerRef = useRef<AbortController | null>(null)

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
      const response = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: message }),
        signal: abortController.signal,
      })

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error('Troppe richieste. Attendi un momento prima di riprovare.')
        }
        throw new Error(`Errore del server: ${response.status}`)
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
                  callbacks.onSources(data.sources || [])
                  break

                case 'page_plan':
                  callbacks.onPagePlan?.(data.plan)
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
            callbacks.onSources(data.sources || [])
          } else if (data.type === 'page_plan') {
            callbacks.onPagePlan?.(data.plan)
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
