'use client'

/**
 * Lead Form Component.
 * Accessible form for lead capture with validation.
 * FR15: Il Visitatore può inserire nome, email
 * FR16: Il Visitatore può inserire azienda (opzionale) e messaggio
 * NFR-A3: Form con labels/ARIA attributes
 * NFR-A4: Keyboard navigation
 * NFR-R3: Form submission works independently of AI status
 */

import { useState, useCallback, useId } from 'react'
import { motion } from 'framer-motion'
import { Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://elevia-api-production.up.railway.app'

interface LeadFormData {
  name: string
  email: string
  company: string
  message: string
}

interface LeadFormProps {
  onSuccess?: (data: LeadFormData & { id: string }) => void
  onError?: (error: string) => void
  className?: string
}

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

export function LeadForm({ onSuccess, onError, className = '' }: LeadFormProps) {
  const formId = useId()
  const [formData, setFormData] = useState<LeadFormData>({
    name: '',
    email: '',
    company: '',
    message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  // Validate form fields
  const validate = useCallback((): boolean => {
    const newErrors: FormErrors = {}

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Il nome è obbligatorio'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Il nome deve avere almeno 2 caratteri'
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email è obbligatoria'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Inserisci un\'email valida'
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Il messaggio è obbligatorio'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Il messaggio deve avere almeno 10 caratteri'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [formData])

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) {
      return
    }

    setStatus('submitting')
    setErrorMessage('')

    try {
      const response = await fetch(`${API_URL}/api/lead`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.detail || 'Errore durante l\'invio')
      }

      const result = await response.json()

      setStatus('success')

      // Reset form
      setFormData({
        name: '',
        email: '',
        company: '',
        message: '',
      })

      onSuccess?.({ ...formData, id: result.id })

    } catch (error) {
      const message = error instanceof Error ? error.message : 'Errore sconosciuto'
      setStatus('error')
      setErrorMessage(message)
      onError?.(message)
    }
  }

  // Handle field change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  // Handle retry after error
  const handleRetry = () => {
    setStatus('idle')
    setErrorMessage('')
  }

  // Success state
  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`bg-green-50 rounded-lg p-6 text-center ${className}`}
        role="alert"
        aria-live="polite"
      >
        <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-green-800 mb-2">
          Grazie per averci contattato!
        </h3>
        <p className="text-green-600">
          Ti risponderemo presto. Nel frattempo, esplora i nostri Use Case AI.
        </p>
      </motion.div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`space-y-4 ${className}`}
      noValidate
      aria-describedby={`${formId}-description`}
    >
      <div id={`${formId}-description`} className="sr-only">
        Compila il form per essere contattato dal nostro team.
      </div>

      {/* Error banner */}
      {status === 'error' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3"
          role="alert"
          aria-live="assertive"
        >
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-red-700 font-medium">
              Si è verificato un errore
            </p>
            <p className="text-red-600 text-sm">{errorMessage}</p>
            <button
              type="button"
              onClick={handleRetry}
              className="text-red-700 underline text-sm mt-1 hover:text-red-800"
            >
              Riprova
            </button>
          </div>
        </motion.div>
      )}

      {/* Name field */}
      <div>
        <label
          htmlFor={`${formId}-name`}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Nome <span className="text-red-500" aria-hidden="true">*</span>
          <span className="sr-only">(obbligatorio)</span>
        </label>
        <input
          type="text"
          id={`${formId}-name`}
          name="name"
          value={formData.name}
          onChange={handleChange}
          disabled={status === 'submitting'}
          required
          aria-required="true"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? `${formId}-name-error` : undefined}
          className={`
            w-full px-4 py-2 rounded-lg border
            focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
            disabled:bg-gray-100 disabled:cursor-not-allowed
            ${errors.name ? 'border-red-500' : 'border-gray-300'}
          `}
          placeholder="Mario Rossi"
        />
        {errors.name && (
          <p
            id={`${formId}-name-error`}
            className="mt-1 text-sm text-red-600"
            role="alert"
          >
            {errors.name}
          </p>
        )}
      </div>

      {/* Email field */}
      <div>
        <label
          htmlFor={`${formId}-email`}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Email <span className="text-red-500" aria-hidden="true">*</span>
          <span className="sr-only">(obbligatorio)</span>
        </label>
        <input
          type="email"
          id={`${formId}-email`}
          name="email"
          value={formData.email}
          onChange={handleChange}
          disabled={status === 'submitting'}
          required
          aria-required="true"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? `${formId}-email-error` : undefined}
          className={`
            w-full px-4 py-2 rounded-lg border
            focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
            disabled:bg-gray-100 disabled:cursor-not-allowed
            ${errors.email ? 'border-red-500' : 'border-gray-300'}
          `}
          placeholder="mario@azienda.it"
        />
        {errors.email && (
          <p
            id={`${formId}-email-error`}
            className="mt-1 text-sm text-red-600"
            role="alert"
          >
            {errors.email}
          </p>
        )}
      </div>

      {/* Company field (optional) */}
      <div>
        <label
          htmlFor={`${formId}-company`}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Azienda <span className="text-gray-400">(opzionale)</span>
        </label>
        <input
          type="text"
          id={`${formId}-company`}
          name="company"
          value={formData.company}
          onChange={handleChange}
          disabled={status === 'submitting'}
          className="
            w-full px-4 py-2 rounded-lg border border-gray-300
            focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
            disabled:bg-gray-100 disabled:cursor-not-allowed
          "
          placeholder="Nome azienda"
        />
      </div>

      {/* Message field */}
      <div>
        <label
          htmlFor={`${formId}-message`}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Messaggio <span className="text-red-500" aria-hidden="true">*</span>
          <span className="sr-only">(obbligatorio)</span>
        </label>
        <textarea
          id={`${formId}-message`}
          name="message"
          value={formData.message}
          onChange={handleChange}
          disabled={status === 'submitting'}
          required
          aria-required="true"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? `${formId}-message-error` : undefined}
          rows={4}
          className={`
            w-full px-4 py-2 rounded-lg border resize-none
            focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
            disabled:bg-gray-100 disabled:cursor-not-allowed
            ${errors.message ? 'border-red-500' : 'border-gray-300'}
          `}
          placeholder="Come possiamo aiutarti?"
        />
        {errors.message && (
          <p
            id={`${formId}-message-error`}
            className="mt-1 text-sm text-red-600"
            role="alert"
          >
            {errors.message}
          </p>
        )}
      </div>

      {/* Submit button */}
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="
          w-full flex items-center justify-center gap-2
          px-6 py-3 rounded-lg
          bg-primary-500 text-white font-semibold
          hover:bg-primary-600
          disabled:bg-primary-300 disabled:cursor-not-allowed
          transition-colors
          focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
        "
      >
        {status === 'submitting' ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Invio in corso...
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            Invia messaggio
          </>
        )}
      </button>

      <p className="text-xs text-gray-500 text-center">
        I campi contrassegnati con * sono obbligatori
      </p>
    </form>
  )
}

export default LeadForm
