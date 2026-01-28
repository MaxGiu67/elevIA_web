'use client'

/**
 * Source Citation Display Component.
 * FR8: Il Visitatore può vedere le fonti da cui proviene la risposta
 */

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, ChevronDown, ChevronUp, FileText, Info } from 'lucide-react'
import { ChatSource } from '../stores/chatStore'

interface ChatSourcesProps {
  sources: ChatSource[]
  showEmptyNote?: boolean
}

/**
 * Displays sources/citations below chat responses.
 * Sources are expandable to show details.
 */
export function ChatSources({ sources, showEmptyNote = false }: ChatSourcesProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  // Show note if no sources and showEmptyNote is true
  if (!sources || sources.length === 0) {
    if (showEmptyNote) {
      return (
        <div className="mt-2 pt-2 border-t border-gray-200">
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <Info className="w-3 h-3" aria-hidden="true" />
            <span>Risposta generale (nessuna fonte specifica)</span>
          </div>
        </div>
      )
    }
    return null
  }

  const hasMultipleSources = sources.length > 2

  return (
    <div className="mt-2 pt-2 border-t border-gray-200">
      {/* Header with toggle for multiple sources */}
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 transition-colors w-full"
        aria-expanded={isExpanded}
        aria-controls="sources-list"
      >
        <FileText className="w-3 h-3" aria-hidden="true" />
        <span className="font-medium">
          Fonti ({sources.length})
        </span>
        {hasMultipleSources && (
          isExpanded ? (
            <ChevronUp className="w-3 h-3 ml-auto" />
          ) : (
            <ChevronDown className="w-3 h-3 ml-auto" />
          )
        )}
      </button>

      {/* Sources list */}
      <AnimatePresence initial={false}>
        {(!hasMultipleSources || isExpanded) && (
          <motion.ul
            id="sources-list"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-1 space-y-1 overflow-hidden"
            role="list"
            aria-label="Lista delle fonti"
          >
            {sources.map((source, index) => (
              <SourceItem key={index} source={source} index={index} />
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}

interface SourceItemProps {
  source: ChatSource
  index: number
}

function SourceItem({ source, index }: SourceItemProps) {
  const [showDetails, setShowDetails] = useState(false)

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'use_case':
        return 'bg-blue-100 text-blue-700'
      case 'area':
        return 'bg-green-100 text-green-700'
      case 'problem':
        return 'bg-amber-100 text-amber-700'
      default:
        return 'bg-gray-100 text-gray-600'
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type.toLowerCase()) {
      case 'use_case':
        return 'Use Case'
      case 'area':
        return 'Area'
      case 'problem':
        return 'Problema'
      default:
        return type
    }
  }

  return (
    <motion.li
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group"
    >
      <button
        type="button"
        onClick={() => setShowDetails(!showDetails)}
        className="flex items-center gap-2 text-xs text-gray-600 hover:text-gray-800 transition-colors w-full text-left"
        aria-expanded={showDetails}
      >
        <ExternalLink className="w-3 h-3 flex-shrink-0" aria-hidden="true" />
        <span className="font-medium truncate">{source.title}</span>
        <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${getTypeColor(source.type)}`}>
          {getTypeLabel(source.type)}
        </span>
      </button>

      {/* Expandable details */}
      <AnimatePresence>
        {showDetails && source.source && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="ml-5 mt-1 text-[10px] text-gray-400 overflow-hidden"
          >
            <span className="block truncate" title={source.source}>
              Riferimento: {source.source}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  )
}

/**
 * Compact sources badge for inline display.
 */
export function SourcesBadge({ count }: { count: number }) {
  if (count === 0) return null

  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gray-100 text-xs text-gray-600">
      <FileText className="w-3 h-3" />
      {count} font{count === 1 ? 'e' : 'i'}
    </span>
  )
}
