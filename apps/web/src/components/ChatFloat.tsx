'use client'

import { useState, useRef, KeyboardEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Send, X } from 'lucide-react'

const suggestions = [
  'Soluzioni per PMI',
  'Use case retail',
  'Come funziona?',
]

export function ChatFloat() {
  const [query, setQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = async () => {
    if (!query.trim() || isLoading) return

    setIsLoading(true)
    // TODO: Implement actual chat submission in Epic 3
    console.log('Query submitted:', query)

    // Simulate loading for now
    setTimeout(() => {
      setIsLoading(false)
      // Page remodulation will happen here in Epic 4
    }, 1000)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion)
    inputRef.current?.focus()
  }

  const clearQuery = () => {
    setQuery('')
    inputRef.current?.focus()
  }

  return (
    <div
      className="fixed bottom-[15%] left-1/2 -translate-x-1/2 z-50 w-[min(600px,90vw)]"
      role="search"
      aria-label="Chat con UPGRAI AI"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="chat-floating p-4"
      >
        {/* Input Row */}
        <div className="flex items-center gap-3">
          <Sparkles
            className="h-5 w-5 text-primary-500 flex-shrink-0"
            aria-hidden="true"
          />

          <div className="relative flex-1">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setTimeout(() => setIsFocused(false), 200)}
              placeholder="Cosa vuoi sapere su UPGRAI?"
              aria-label="Scrivi la tua domanda"
              className="w-full bg-gray-50 rounded-lg px-4 py-3 pr-10
                         text-gray-900 placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-primary-500/50
                         transition-shadow"
              disabled={isLoading}
            />

            {/* Clear button */}
            <AnimatePresence>
              {query && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  type="button"
                  onClick={clearQuery}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label="Cancella query"
                >
                  <X className="h-4 w-4" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* Submit button */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!query.trim() || isLoading}
            className="p-3 bg-primary-500 text-white rounded-lg
                       hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed
                       transition-colors"
            aria-label="Invia domanda"
          >
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="h-5 w-5 border-2 border-white border-t-transparent rounded-full"
              />
            ) : (
              <Send className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Suggestions */}
        <AnimatePresence>
          {isFocused && !query && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3 pt-3 border-t border-gray-100"
            >
              <p className="text-xs text-gray-400 mb-2">Prova a chiedere:</p>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="text-sm px-3 py-1.5 bg-gray-100 text-gray-600
                               rounded-full hover:bg-primary-100 hover:text-primary-700
                               transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading state message */}
        <AnimatePresence>
          {isLoading && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-sm text-gray-500 mt-3 text-center"
            >
              Rimodulando la pagina...
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
