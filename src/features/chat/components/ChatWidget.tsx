'use client'

/**
 * Main Chat Widget component.
 * Combines ChatButton and ChatWindow with message handling.
 * FR5: Il Visitatore può aprire il chatbot dalla landing page
 * FR6: Il Visitatore può digitare domande in linguaggio naturale
 */

import { useCallback, useEffect } from 'react'
import { ChatButton } from './ChatButton'
import { ChatWindow } from './ChatWindow'
import { useChatStore } from '../stores/chatStore'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export function ChatWidget() {
  const {
    addMessage,
    updateLastMessage,
    setLastMessageSources,
    setLoading,
    setStreaming,
    setError,
    setAiStatus,
  } = useChatStore()

  // Check AI status on mount
  useEffect(() => {
    const checkHealth = async () => {
      try {
        const response = await fetch(`${API_URL}/api/health`)
        if (response.ok) {
          const data = await response.json()
          setAiStatus(data.status === 'ok' ? 'available' : 'unavailable')
        } else {
          setAiStatus('unavailable')
        }
      } catch {
        setAiStatus('unavailable')
      }
    }

    checkHealth()
    // Check every 30 seconds
    const interval = setInterval(checkHealth, 30000)
    return () => clearInterval(interval)
  }, [setAiStatus])

  const handleSendMessage = useCallback(async (message: string) => {
    // Add user message
    addMessage({ role: 'user', content: message })

    // Add empty assistant message for streaming
    addMessage({ role: 'assistant', content: '', isStreaming: true })

    setLoading(true)
    setStreaming(true)

    try {
      const response = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: message }),
      })

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error('Troppe richieste. Attendi un momento prima di riprovare.')
        }
        throw new Error('Errore nella risposta del server')
      }

      // Handle SSE streaming
      const reader = response.body?.getReader()
      if (!reader) {
        throw new Error('Streaming non supportato')
      }

      const decoder = new TextDecoder()
      let fullContent = ''
      let sources: Array<{ title: string; type: string; source: string }> = []

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value, { stream: true })
        const lines = chunk.split('\n')

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6))

              if (data.type === 'chat_chunk') {
                fullContent += data.content
                updateLastMessage(fullContent, true)
              } else if (data.type === 'sources') {
                sources = data.sources || []
              } else if (data.type === 'error') {
                throw new Error(data.message)
              }
            } catch (e) {
              // Ignore JSON parse errors for incomplete chunks
            }
          }
        }
      }

      // Finalize message
      updateLastMessage(fullContent, false)
      if (sources.length > 0) {
        setLastMessageSources(sources)
      }

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Errore sconosciuto'
      setError(errorMessage)

      // Update the assistant message with error
      updateLastMessage(
        'Mi dispiace, si è verificato un errore. Riprova o contattaci direttamente.',
        false
      )
    } finally {
      setLoading(false)
      setStreaming(false)
    }
  }, [addMessage, updateLastMessage, setLastMessageSources, setLoading, setStreaming, setError])

  return (
    <>
      <ChatButton />
      <ChatWindow onSendMessage={handleSendMessage} />
    </>
  )
}
