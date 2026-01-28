'use client'

/**
 * Chat Fallback Component.
 * Displays when AI service is unavailable.
 * FR21: Il chatbot mostra messaggio "Servizio temporaneamente non disponibile"
 */

import { motion } from 'framer-motion'
import { AlertCircle, Phone, Mail, MessageSquare } from 'lucide-react'

interface ChatFallbackProps {
  onContactClick?: () => void
  className?: string
}

export function ChatFallback({ onContactClick, className = '' }: ChatFallbackProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-6 text-center ${className}`}
    >
      {/* Warning icon */}
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-100 mb-4">
        <AlertCircle className="w-6 h-6 text-amber-600" />
      </div>

      {/* Main message */}
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        Servizio temporaneamente non disponibile
      </h3>

      <p className="text-gray-600 text-sm mb-6">
        Il nostro assistente AI non è al momento disponibile.
        Puoi comunque contattarci direttamente!
      </p>

      {/* Alternative contact options */}
      <div className="space-y-3">
        {/* Contact form CTA */}
        <button
          type="button"
          onClick={onContactClick}
          className="
            w-full flex items-center justify-center gap-2
            px-4 py-3 rounded-lg
            bg-primary-500 text-white
            hover:bg-primary-600 transition-colors
            focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
          "
        >
          <MessageSquare className="w-5 h-5" />
          Compila il form di contatto
        </button>

        {/* Direct contact options */}
        <div className="flex gap-2">
          <a
            href="mailto:info@upgrai.com"
            className="
              flex-1 flex items-center justify-center gap-2
              px-4 py-2 rounded-lg
              border border-gray-200 text-gray-700
              hover:bg-gray-50 transition-colors
              text-sm
            "
          >
            <Mail className="w-4 h-4" />
            Email
          </a>

          <a
            href="tel:+390123456789"
            className="
              flex-1 flex items-center justify-center gap-2
              px-4 py-2 rounded-lg
              border border-gray-200 text-gray-700
              hover:bg-gray-50 transition-colors
              text-sm
            "
          >
            <Phone className="w-4 h-4" />
            Chiama
          </a>
        </div>
      </div>

      {/* Status note */}
      <p className="mt-4 text-xs text-gray-400">
        Il servizio viene controllato automaticamente ogni 30 secondi
      </p>
    </motion.div>
  )
}

/**
 * Compact fallback banner for chat window header.
 */
export function ChatUnavailableBanner({ className = '' }: { className?: string }) {
  return (
    <div
      className={`
        bg-amber-50 border-t border-amber-100
        px-4 py-2 text-amber-700 text-sm
        flex items-center gap-2
        ${className}
      `}
      role="status"
    >
      <AlertCircle className="w-4 h-4 flex-shrink-0" />
      <span>Servizio AI non disponibile.</span>
      <a href="#contact" className="underline font-medium hover:text-amber-800">
        Contattaci direttamente
      </a>
    </div>
  )
}

export default ChatFallback
