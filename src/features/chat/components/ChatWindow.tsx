'use client'

/**
 * Chat window component.
 * Displays conversation and input field.
 * NFR-A4: Keyboard navigation
 * NFR-A5: Screen reader support
 */

import { useState, useRef, useEffect, KeyboardEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Loader2 } from 'lucide-react'
import { useChatStore, ChatMessage } from '../stores/chatStore'
import { ChatMessageBubble } from './ChatMessage'

interface ChatWindowProps {
  onSendMessage: (message: string) => Promise<void>
}

export function ChatWindow({ onSendMessage }: ChatWindowProps) {
  const {
    isOpen,
    messages,
    isLoading,
    isStreaming,
    error,
    aiStatus,
    clearError,
  } = useChatStore()

  const [input, setInput] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!input.trim() || isLoading || isStreaming) return

    const message = input.trim()
    setInput('')
    clearError()

    await onSendMessage(message)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="chat-window"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className={`
            fixed bottom-24 right-6 z-40
            w-[380px] max-w-[calc(100vw-3rem)]
            h-[500px] max-h-[calc(100vh-8rem)]
            bg-white rounded-2xl shadow-2xl
            flex flex-col overflow-hidden
            border border-gray-100
          `}
          role="dialog"
          aria-label="Chat con UPGRAI AI"
          aria-modal="true"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-500 to-primary-600 px-4 py-3 flex-shrink-0">
            <h2 className="text-white font-semibold">UPGRAI AI Assistant</h2>
            <p className="text-primary-100 text-sm">
              {aiStatus === 'available'
                ? 'Online - Pronto ad aiutarti'
                : aiStatus === 'unavailable'
                ? 'Servizio temporaneamente non disponibile'
                : 'Verifica connessione...'
              }
            </p>
          </div>

          {/* Messages Area */}
          <div
            className="flex-1 overflow-y-auto p-4 space-y-4"
            role="log"
            aria-live="polite"
            aria-label="Messaggi della conversazione"
          >
            {messages.length === 0 && (
              <div className="text-center text-gray-500 mt-8">
                <p className="text-lg mb-2">Ciao! 👋</p>
                <p className="text-sm">
                  Sono l'assistente AI di UPGRAI. Chiedimi dei nostri Use Case AI!
                </p>
              </div>
            )}

            {messages.map((message) => (
              <ChatMessageBubble key={message.id} message={message} />
            ))}

            {/* Typing indicator */}
            {isStreaming && (
              <div className="flex items-center gap-2 text-gray-400">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm">Sto scrivendo...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Error Banner */}
          {error && (
            <div
              className="bg-red-50 border-t border-red-100 px-4 py-2 text-red-600 text-sm"
              role="alert"
            >
              {error}
            </div>
          )}

          {/* AI Unavailable Banner */}
          {aiStatus === 'unavailable' && (
            <div className="bg-yellow-50 border-t border-yellow-100 px-4 py-2 text-yellow-700 text-sm">
              Servizio AI temporaneamente non disponibile.{' '}
              <a href="#contact" className="underline font-medium">
                Contattaci direttamente
              </a>
            </div>
          )}

          {/* Input Area */}
          <form
            onSubmit={handleSubmit}
            className="border-t border-gray-100 p-4 flex-shrink-0"
          >
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Scrivi un messaggio..."
                disabled={isLoading || isStreaming || aiStatus === 'unavailable'}
                className={`
                  flex-1 px-4 py-2 rounded-full
                  border border-gray-200 bg-gray-50
                  focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
                  disabled:bg-gray-100 disabled:cursor-not-allowed
                  text-sm
                `}
                aria-label="Scrivi il tuo messaggio"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading || isStreaming || aiStatus === 'unavailable'}
                className={`
                  w-10 h-10 rounded-full
                  flex items-center justify-center
                  bg-primary-500 text-white
                  hover:bg-primary-600
                  disabled:bg-gray-300 disabled:cursor-not-allowed
                  transition-colors
                `}
                aria-label="Invia messaggio"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </button>
            </div>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
