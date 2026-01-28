'use client'

/**
 * Floating chat button component.
 * Opens the chat window when clicked.
 * FR5: Il Visitatore può aprire il chatbot dalla landing page
 */

import { motion } from 'framer-motion'
import { MessageCircle, X } from 'lucide-react'
import { useChatStore } from '../stores/chatStore'

export function ChatButton() {
  const { isOpen, toggleChat } = useChatStore()

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
      onClick={toggleChat}
      className={`
        fixed bottom-6 right-6 z-50
        w-14 h-14 rounded-full
        flex items-center justify-center
        shadow-lg hover:shadow-xl
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500
        ${isOpen
          ? 'bg-gray-800 hover:bg-gray-900'
          : 'bg-primary-500 hover:bg-primary-600'
        }
      `}
      aria-label={isOpen ? 'Chiudi chat' : 'Apri chat'}
      aria-expanded={isOpen}
      aria-controls="chat-window"
    >
      <motion.div
        initial={false}
        animate={{ rotate: isOpen ? 90 : 0 }}
        transition={{ duration: 0.2 }}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" aria-hidden="true" />
        ) : (
          <MessageCircle className="w-6 h-6 text-white" aria-hidden="true" />
        )}
      </motion.div>

      {/* Notification badge when closed and has unread */}
      {!isOpen && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1 w-4 h-4 bg-secondary-500 rounded-full"
          aria-hidden="true"
        />
      )}
    </motion.button>
  )
}
