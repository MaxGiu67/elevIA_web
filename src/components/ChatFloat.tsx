'use client'

import { useState, useRef, useCallback, useEffect, KeyboardEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Send, X, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useChatStream } from '@/features/chat/hooks/useChatStream'
import { useSolutionPlanStore, type SolutionPlan } from '@/features/esplora/stores/solutionPlanStore'
import { usePagePlanStore, type PagePlan } from '@/features/remodulation/stores/pagePlanStore'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://elevia-api-production.up.railway.app'

const suggestions = [
  'Ho un problema in azienda',
  'Come funziona elevIA?',
  'elevIA come soluzione per le PMI',
]

/** Map of known page names → internal routes */
const PAGE_LINKS: Record<string, string> = {
  // Areas
  'Knowledge': '/area/knowledge',
  'Customer Experience': '/area/customer-experience',
  'Operations': '/area/operations',
  'Workflow': '/area/workflow',
  'HR': '/area/hr',
  // Use Cases
  'RAG Knowledge Base': '/use-case/rag-knowledge-base',
  'Estrazione Dati': '/use-case/estrazione-dati',
  'Ricerca Semantica': '/use-case/ricerca-semantica',
  'Chatbot FAQ': '/use-case/chatbot-faq',
  'Sintesi Riunioni': '/use-case/sintesi-riunioni',
  'Due Diligence': '/use-case/due-diligence',
  'Classificazione Ticket': '/use-case/classificazione-ticket',
  'Copilot Operatore': '/use-case/copilot-operatore',
  'Analisi Sentiment': '/use-case/analisi-sentiment',
  'Predictive Maintenance': '/use-case/predictive-maintenance',
  'Report Automatici': '/use-case/report-automatici',
  'Anomaly Detection': '/use-case/anomaly-detection',
  'Lead Scoring': '/use-case/lead-scoring',
  'Workflow Approval': '/use-case/workflow-approval',
  'Compliance Checker': '/use-case/compliance-checker',
  'Content Generation': '/use-case/content-generation',
  'Screening CV': '/use-case/screening-cv',
  'Onboarding Assistant': '/use-case/onboarding-assistant',
  'Performance Review': '/use-case/performance-review',
  'Employee Self-Service': '/use-case/employee-self-service',
}

/** Regex to match and strip [USE_CASE:id] markers from displayed text */
const USE_CASE_MARKER_RE = /\[USE_CASE:[a-z0-9-]+\]/g

/** Regex to match [NEXT_INPUT:...] markers */
const NEXT_INPUT_MARKER_RE = /\[NEXT_INPUT:[^\]]{0,50}\]/g
/** Regex to match partial/incomplete [NEXT_INPUT:... during streaming */
const NEXT_INPUT_PARTIAL_RE = /\[NEXT_INPUT:[^\]]*$/g

/** Strip all source/font references, USE_CASE markers, SOLUTION_PLAN blocks, and NEXT_INPUT markers from text */
function stripSourceRefs(text: string): string {
  return text
    // "(Fonte 1)", "(Fonte 2 e Fonte 5)", "(Fonte 1, Fonte 3 e Fonte 5)" etc.
    .replace(/\s*\(Fonte\s*\d+(?:\s*(?:,|e)\s*Fonte\s*\d+)*\)/gi, '')
    // Standalone "Fonte 1" not in parentheses
    .replace(/\bFonte\s*\d+(?:\s*(?:,|e)\s*Fonte\s*\d+)*/gi, '')
    // [USE_CASE:id] markers
    .replace(USE_CASE_MARKER_RE, '')
    // Complete [SOLUTION_PLAN]...[/SOLUTION_PLAN] blocks
    .replace(/\[SOLUTION_PLAN\][\s\S]*?\[\/SOLUTION_PLAN\]/g, '')
    // Partial/incomplete [SOLUTION_PLAN] blocks (during streaming)
    .replace(/\[SOLUTION_PLAN\][\s\S]*$/g, '')
    // Complete [NEXT_INPUT:...] markers
    .replace(NEXT_INPUT_MARKER_RE, '')
    // Partial/incomplete [NEXT_INPUT:... during streaming
    .replace(NEXT_INPUT_PARTIAL_RE, '')
    // Clean up empty lines left by marker removal
    .replace(/\n\s*\n\s*\n/g, '\n\n')
    .trim()
}

/**
 * Render **bold** markdown as <strong> elements.
 */
function renderBold(text: string): React.ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>
    }
    return part
  })
}

/**
 * Parse response text: strip sources, convert page names to links, render bold.
 */
function renderResponse(text: string): React.ReactNode[] {
  const cleaned = stripSourceRefs(text)

  // Build regex for known page names (longest first)
  const names = Object.keys(PAGE_LINKS).sort((a, b) => b.length - a.length)
  if (names.length === 0) return renderBold(cleaned)

  const escaped = names.map(n => n.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
  const pattern = new RegExp(`(${escaped.join('|')})`, 'gi')

  const parts = cleaned.split(pattern)
  const result: React.ReactNode[] = []

  parts.forEach((part, i) => {
    const match = names.find(n => n.toLowerCase() === part.toLowerCase())
    if (match) {
      result.push(
        <Link
          key={`link-${i}`}
          href={PAGE_LINKS[match]}
          className="text-primary-500 hover:text-primary-700 underline underline-offset-2 font-medium transition-colors"
        >
          {part}
        </Link>
      )
    } else {
      // Render bold within non-link text segments
      renderBold(part).forEach((node, j) => {
        result.push(
          typeof node === 'string' ? node : <span key={`bold-${i}-${j}`}>{node}</span>
        )
      })
    }
  })

  return result
}

const DEFAULT_PLACEHOLDER = 'Descrivi il tuo problema aziendale...'

export function ChatFloat() {
  const [query, setQuery] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [response, setResponse] = useState('')
  const [showResponse, setShowResponse] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [recommendedUseCases, setRecommendedUseCases] = useState<string[]>([])
  const [placeholder, setPlaceholder] = useState(DEFAULT_PLACEHOLDER)
  const inputRef = useRef<HTMLInputElement>(null)
  const responseRef = useRef('')
  const { sendMessage, abort, isStreaming } = useChatStream()
  const pathname = usePathname()
  const router = useRouter()
  const setPlan = useSolutionPlanStore((s) => s.setPlan)
  const clearPlan = useSolutionPlanStore((s) => s.clearPlan)
  const setPagePlan = usePagePlanStore((s) => s.setPlan)

  // Keyboard-aware positioning for mobile (visualViewport API)
  useEffect(() => {
    const vv = window.visualViewport
    if (!vv) return

    const onResize = () => {
      const offsetBottom = window.innerHeight - vv.height - vv.offsetTop
      document.documentElement.style.setProperty(
        '--keyboard-offset',
        `${Math.max(0, offsetBottom)}px`
      )
    }

    vv.addEventListener('resize', onResize)
    vv.addEventListener('scroll', onResize)
    return () => {
      vv.removeEventListener('resize', onResize)
      vv.removeEventListener('scroll', onResize)
      document.documentElement.style.setProperty('--keyboard-offset', '0px')
    }
  }, [])

  // Warm-up ping: wake the backend on mount so it's ready when the user types
  useEffect(() => {
    fetch(`${API_URL}/api/health`, { method: 'GET' }).catch(() => {})
  }, [])

  // Close response panel when the user navigates to a different page
  useEffect(() => {
    if (showResponse) {
      if (isStreaming) abort()
      setShowResponse(false)
      setResponse('')
      setError(null)
      setRecommendedUseCases([])
    }
    setPlaceholder(DEFAULT_PLACEHOLDER)
    // Clear solution plan when navigating away from /esplora
    if (pathname !== '/esplora') {
      clearPlan()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  const handleSubmit = useCallback(async () => {
    const trimmed = query.trim()
    if (!trimmed || isStreaming) return

    setResponse('')
    setError(null)
    setShowResponse(true)
    setRecommendedUseCases([])
    responseRef.current = ''

    // Clear input immediately after sending
    setQuery('')

    await sendMessage(trimmed, {
      onChunk: (chunk) => {
        responseRef.current += chunk
        setResponse(responseRef.current)
      },
      onRecommendedUseCases: (useCaseIds) => {
        setRecommendedUseCases(useCaseIds)
      },
      onSolutionPlan: (plan) => {
        setPlan(plan as SolutionPlan)
      },
      onPagePlan: (plan) => {
        setPagePlan(plan as PagePlan)
      },
      onNextInput: (suggestion) => {
        if (suggestion) setPlaceholder(suggestion)
      },
      onError: (errorMsg) => {
        setError(errorMsg)
      },
      onComplete: () => {
        // streaming done
      },
    })
  }, [query, isStreaming, sendMessage, setPlan, setPagePlan])

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

  const closeResponse = () => {
    if (isStreaming) abort()
    setShowResponse(false)
    setResponse('')
    setError(null)
    setRecommendedUseCases([])
    setPlaceholder(DEFAULT_PLACEHOLDER)
  }

  const handleEsplora = () => {
    if (recommendedUseCases.length > 0) {
      const ucParam = recommendedUseCases.join(',')
      closeResponse()
      router.push(`/esplora?uc=${ucParam}`)
    }
  }

  return (
    <div
      className="chat-wrapper fixed z-50
        bottom-4 left-4 right-4
        md:bottom-[15%] md:left-1/2 md:right-auto md:-translate-x-1/2 md:w-[min(600px,90vw)]"
      role="search"
      aria-label="Chat con elevIA AI"
    >
      {/* Response Panel */}
      <AnimatePresence>
        {showResponse && (response || isStreaming || error) && (
          <motion.div
            initial={{ opacity: 0, y: 10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: 10, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-2 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 overflow-hidden"
          >
            {/* Response Header */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary-500" />
                <span className="text-sm font-medium text-gray-700">elevIA AI</span>
                {isStreaming && (
                  <motion.span
                    animate={{ opacity: [1, 0.4, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="text-xs text-primary-500"
                  >
                    sta scrivendo...
                  </motion.span>
                )}
              </div>
              <button
                type="button"
                onClick={closeResponse}
                className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Chiudi risposta"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Response Body */}
            <div className="px-4 py-3 max-h-[40vh] md:max-h-[300px] overflow-y-auto">
              {error ? (
                <p className="text-sm text-red-600">{error}</p>
              ) : (
                <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {isStreaming ? stripSourceRefs(response) : renderResponse(response)}
                  {isStreaming && (
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                      className="inline-block w-1.5 h-4 bg-primary-500 ml-0.5 align-text-bottom"
                    />
                  )}
                </div>
              )}
            </div>

            {/* Esplora Button */}
            {!isStreaming && recommendedUseCases.length > 0 && (
              <div className="px-4 pb-3 pt-1 border-t border-gray-100">
                <button
                  type="button"
                  onClick={handleEsplora}
                  className="btn-primary w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-medium"
                >
                  Esplora le soluzioni per te
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input Bar */}
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
              placeholder={placeholder}
              aria-label="Scrivi la tua domanda"
              className="w-full bg-gray-50 rounded-lg px-4 py-3 pr-10
                         text-gray-900 placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-primary-500/50
                         transition-shadow"
              disabled={isStreaming}
            />

            {/* Clear button */}
            <AnimatePresence>
              {query && !isStreaming && (
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
            onClick={isStreaming ? abort : handleSubmit}
            disabled={!isStreaming && !query.trim()}
            className={`p-3 rounded-lg transition-colors ${
              isStreaming
                ? 'bg-red-500 text-white hover:bg-red-600'
                : 'bg-primary-500 text-white hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed'
            }`}
            aria-label={isStreaming ? 'Ferma risposta' : 'Invia domanda'}
          >
            {isStreaming ? (
              <X className="h-5 w-5" />
            ) : (
              <Send className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Suggestions */}
        <AnimatePresence>
          {isFocused && !query && !showResponse && (
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
      </motion.div>
    </div>
  )
}
