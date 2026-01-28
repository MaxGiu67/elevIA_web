'use client'

/**
 * Form Success Component.
 * Displays confirmation after successful lead submission.
 * FR17: "Grazie! Ti contatteremo presto."
 */

import { motion } from 'framer-motion'
import { CheckCircle, ArrowRight } from 'lucide-react'

interface FormSuccessProps {
  onReset?: () => void
  className?: string
}

export function FormSuccess({ onReset, className = '' }: FormSuccessProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`
        bg-gradient-to-br from-green-50 to-emerald-50
        border border-green-200
        rounded-xl p-8 text-center
        ${className}
      `}
      role="status"
      aria-live="polite"
    >
      {/* Success icon with animation */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
        className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4"
      >
        <CheckCircle className="w-10 h-10 text-green-600" />
      </motion.div>

      {/* Success message */}
      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-2xl font-bold text-green-800 mb-2"
      >
        Grazie per averci contattato!
      </motion.h3>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-green-600 mb-6"
      >
        Ti risponderemo presto. Nel frattempo, esplora i nostri Use Case AI.
      </motion.p>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex flex-col sm:flex-row gap-3 justify-center"
      >
        <a
          href="#use-cases"
          className="
            inline-flex items-center justify-center gap-2
            px-6 py-2.5 rounded-lg
            bg-green-600 text-white font-medium
            hover:bg-green-700 transition-colors
            focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
          "
        >
          Scopri gli Use Case
          <ArrowRight className="w-4 h-4" />
        </a>

        {onReset && (
          <button
            type="button"
            onClick={onReset}
            className="
              inline-flex items-center justify-center
              px-6 py-2.5 rounded-lg
              bg-white text-green-700 font-medium
              border border-green-300
              hover:bg-green-50 transition-colors
              focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
            "
          >
            Invia un altro messaggio
          </button>
        )}
      </motion.div>
    </motion.div>
  )
}

export default FormSuccess
