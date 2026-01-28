'use client'

/**
 * Form Error Component.
 * Displays error feedback with retry option.
 */

import { motion } from 'framer-motion'
import { AlertCircle, RefreshCw, Mail } from 'lucide-react'

interface FormErrorProps {
  message?: string
  onRetry?: () => void
  className?: string
}

export function FormError({
  message = 'Si è verificato un errore durante l\'invio.',
  onRetry,
  className = '',
}: FormErrorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`
        bg-gradient-to-br from-red-50 to-rose-50
        border border-red-200
        rounded-xl p-8 text-center
        ${className}
      `}
      role="alert"
      aria-live="assertive"
    >
      {/* Error icon with animation */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
        className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4"
      >
        <AlertCircle className="w-10 h-10 text-red-600" />
      </motion.div>

      {/* Error message */}
      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-2xl font-bold text-red-800 mb-2"
      >
        Oops! Qualcosa è andato storto
      </motion.h3>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-red-600 mb-6"
      >
        {message}
      </motion.p>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex flex-col sm:flex-row gap-3 justify-center"
      >
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="
              inline-flex items-center justify-center gap-2
              px-6 py-2.5 rounded-lg
              bg-red-600 text-white font-medium
              hover:bg-red-700 transition-colors
              focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
            "
          >
            <RefreshCw className="w-4 h-4" />
            Riprova
          </button>
        )}

        <a
          href="mailto:info@upgrai.com"
          className="
            inline-flex items-center justify-center gap-2
            px-6 py-2.5 rounded-lg
            bg-white text-red-700 font-medium
            border border-red-300
            hover:bg-red-50 transition-colors
            focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
          "
        >
          <Mail className="w-4 h-4" />
          Contattaci via email
        </a>
      </motion.div>

      {/* Help text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 text-sm text-red-500"
      >
        Se il problema persiste, scrivici a{' '}
        <a href="mailto:info@upgrai.com" className="underline hover:text-red-700">
          info@upgrai.com
        </a>
      </motion.p>
    </motion.div>
  )
}

export default FormError
