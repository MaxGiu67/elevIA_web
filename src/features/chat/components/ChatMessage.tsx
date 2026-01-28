'use client'

/**
 * Chat message bubble component.
 * Displays individual messages with sources.
 * FR8: Il Visitatore può vedere le fonti da cui proviene la risposta
 */

import { motion } from 'framer-motion'
import { User, Bot } from 'lucide-react'
import { ChatMessage } from '../stores/chatStore'
import { ChatSources } from './ChatSources'

interface ChatMessageBubbleProps {
  message: ChatMessage
  showSourcesNote?: boolean
}

export function ChatMessageBubble({ message, showSourcesNote = false }: ChatMessageBubbleProps) {
  const isUser = message.role === 'user'

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`}
    >
      {/* Avatar */}
      <div
        className={`
          w-8 h-8 rounded-full flex-shrink-0
          flex items-center justify-center
          ${isUser ? 'bg-primary-100' : 'bg-secondary-100'}
        `}
        aria-hidden="true"
      >
        {isUser ? (
          <User className="w-4 h-4 text-primary-600" />
        ) : (
          <Bot className="w-4 h-4 text-secondary-600" />
        )}
      </div>

      {/* Message Content */}
      <div
        className={`
          max-w-[80%] rounded-2xl px-4 py-2
          ${isUser
            ? 'bg-primary-500 text-white rounded-tr-sm'
            : 'bg-gray-100 text-gray-800 rounded-tl-sm'
          }
        `}
      >
        {/* Message text with markdown-like formatting */}
        <div className="text-sm whitespace-pre-wrap">
          {formatMessageContent(message.content)}
        </div>

        {/* Streaming indicator */}
        {message.isStreaming && (
          <span
            className="inline-block w-1.5 h-4 ml-1 bg-current animate-pulse rounded-sm"
            aria-label="Sto scrivendo..."
          />
        )}

        {/* Sources - only show for assistant messages that are not streaming */}
        {!isUser && !message.isStreaming && (
          <ChatSources
            sources={message.sources || []}
            showEmptyNote={showSourcesNote && message.content.length > 0}
          />
        )}
      </div>
    </motion.div>
  )
}

/**
 * Format message content with basic markdown-like styling.
 * Handles bold (**text**) and lists (- item).
 */
function formatMessageContent(content: string): React.ReactNode {
  if (!content) return null

  // Split by lines to handle lists
  const lines = content.split('\n')
  const elements: React.ReactNode[] = []

  lines.forEach((line, lineIndex) => {
    // Handle list items
    if (line.trim().startsWith('- ')) {
      const listContent = line.trim().slice(2)
      elements.push(
        <div key={lineIndex} className="flex items-start gap-1 ml-2">
          <span className="text-gray-400">•</span>
          <span>{formatInlineStyles(listContent)}</span>
        </div>
      )
    } else {
      // Regular line
      if (line.trim()) {
        elements.push(
          <span key={lineIndex}>
            {formatInlineStyles(line)}
            {lineIndex < lines.length - 1 && '\n'}
          </span>
        )
      } else if (lineIndex < lines.length - 1) {
        elements.push(<br key={lineIndex} />)
      }
    }
  })

  return elements
}

/**
 * Format inline styles (bold).
 */
function formatInlineStyles(text: string): React.ReactNode {
  // Handle **bold** text
  const parts = text.split(/\*\*(.*?)\*\*/g)

  if (parts.length === 1) {
    return text
  }

  return parts.map((part, index) => {
    // Odd indices are the bold parts (content between **)
    if (index % 2 === 1) {
      return <strong key={index} className="font-semibold">{part}</strong>
    }
    return part
  })
}
