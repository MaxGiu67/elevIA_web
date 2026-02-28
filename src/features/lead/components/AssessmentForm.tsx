'use client'

import { useState, useCallback, useId } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Loader2, AlertCircle } from 'lucide-react'
import { API_URL } from '@/config/api'

// ---- Types ----

interface AssessmentFormData {
  name: string
  email: string
  company: string
  role: string
  company_size: string
  interests: string[]
  interest_other: string
  systems: string
}

interface FormErrors {
  name?: string
  email?: string
  company?: string
  role?: string
  company_size?: string
  interests?: string
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

const CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL ||
  'https://calendly.com/pietro-landri/elevia-nexadata-intro-ai'

const ROLE_OPTIONS = ['CEO', 'CTO', 'COO', 'HR', 'Altro']
const SIZE_OPTIONS = ['10-49', '50-200', '200-1000', '1000+']
const INTEREST_OPTIONS = [
  'Trovare informazioni piu velocemente',
  'Automatizzare report',
  'Ridurre attivita manuali su documenti',
  'Ottimizzare customer service',
  'Screening CV / HR',
]

// ---- Styles (dark bg context) ----

const inputBase =
  'w-full px-4 py-2.5 rounded-lg border bg-white/10 text-white placeholder-white/40 ' +
  'focus:outline-none focus:ring-2 focus:ring-white/60 focus:border-transparent ' +
  'disabled:opacity-50 disabled:cursor-not-allowed'

const inputError = 'border-red-400'
const inputNormal = 'border-white/20'

const labelBase = 'block text-sm font-medium text-white/90 mb-1'

// ---- Component ----

export function AssessmentForm({ className = '' }: { className?: string }) {
  const formId = useId()
  const [formData, setFormData] = useState<AssessmentFormData>({
    name: '',
    email: '',
    company: '',
    role: '',
    company_size: '',
    interests: [],
    interest_other: '',
    systems: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  // --- Validation ---
  const validate = useCallback((): boolean => {
    const e: FormErrors = {}
    if (!formData.name.trim() || formData.name.trim().length < 2)
      e.name = 'Il nome e\' obbligatorio (min 2 caratteri)'
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      e.email = 'Inserisci un\'email valida'
    if (!formData.company.trim()) e.company = 'Inserisci il nome dell\'azienda'
    if (!formData.role) e.role = 'Seleziona il ruolo'
    if (!formData.company_size) e.company_size = 'Seleziona la dimensione'
    const allInterests = [
      ...formData.interests,
      ...(formData.interest_other.trim() ? [formData.interest_other.trim()] : []),
    ]
    if (allInterests.length === 0) e.interests = 'Seleziona almeno un\'area di interesse'
    setErrors(e)
    return Object.keys(e).length === 0
  }, [formData])

  // --- Handlers ---
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleInterestToggle = (interest: string) => {
    setFormData((prev) => {
      const has = prev.interests.includes(interest)
      return {
        ...prev,
        interests: has
          ? prev.interests.filter((i) => i !== interest)
          : [...prev.interests, interest],
      }
    })
    if (errors.interests) setErrors((prev) => ({ ...prev, interests: undefined }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setStatus('submitting')
    setErrorMessage('')

    const interests = [
      ...formData.interests,
      ...(formData.interest_other.trim() ? [formData.interest_other.trim()] : []),
    ]

    try {
      const res = await fetch(`${API_URL}/api/lead/assessment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          company: formData.company.trim(),
          role: formData.role,
          company_size: formData.company_size,
          interests,
          systems: formData.systems.trim() || null,
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.detail || 'Errore durante l\'invio')
      }

      const result = await res.json()
      setStatus('success')

      // Redirect to Calendly with prefilled name/email
      const url = new URL(result.calendly_url || CALENDLY_URL)
      url.searchParams.set('name', formData.name.trim())
      url.searchParams.set('email', formData.email.trim())
      window.location.href = url.toString()
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Errore sconosciuto'
      setStatus('error')
      setErrorMessage(msg)
    }
  }

  // --- Render ---
  return (
    <form
      onSubmit={handleSubmit}
      className={`space-y-5 ${className}`}
      noValidate
      aria-describedby={`${formId}-desc`}
    >
      <div id={`${formId}-desc`} className="sr-only">
        Compila il form per prenotare l'assessment gratuito.
      </div>

      {/* Error banner */}
      <AnimatePresence>
        {status === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-red-500/20 border border-red-400/40 rounded-lg p-4 flex items-start gap-3"
            role="alert"
          >
            <AlertCircle className="w-5 h-5 text-red-300 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-red-200 font-medium">Si e' verificato un errore</p>
              <p className="text-red-300 text-sm">{errorMessage}</p>
              <button
                type="button"
                onClick={() => { setStatus('idle'); setErrorMessage('') }}
                className="text-red-200 underline text-sm mt-1 hover:text-white"
              >
                Riprova
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Row 1: Nome + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor={`${formId}-name`} className={labelBase}>
            Nome <span className="text-red-300">*</span>
          </label>
          <input
            type="text"
            id={`${formId}-name`}
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={status === 'submitting'}
            className={`${inputBase} ${errors.name ? inputError : inputNormal}`}
            placeholder="Mario Rossi"
          />
          {errors.name && <p className="mt-1 text-xs text-red-300">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor={`${formId}-email`} className={labelBase}>
            Email <span className="text-red-300">*</span>
          </label>
          <input
            type="email"
            id={`${formId}-email`}
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={status === 'submitting'}
            className={`${inputBase} ${errors.email ? inputError : inputNormal}`}
            placeholder="mario@azienda.it"
          />
          {errors.email && <p className="mt-1 text-xs text-red-300">{errors.email}</p>}
        </div>
      </div>

      {/* Row 2: Azienda + Ruolo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor={`${formId}-company`} className={labelBase}>
            Azienda <span className="text-red-300">*</span>
          </label>
          <input
            type="text"
            id={`${formId}-company`}
            name="company"
            value={formData.company}
            onChange={handleChange}
            disabled={status === 'submitting'}
            className={`${inputBase} ${errors.company ? inputError : inputNormal}`}
            placeholder="Nome azienda"
          />
          {errors.company && <p className="mt-1 text-xs text-red-300">{errors.company}</p>}
        </div>
        <div>
          <label htmlFor={`${formId}-role`} className={labelBase}>
            Ruolo <span className="text-red-300">*</span>
          </label>
          <select
            id={`${formId}-role`}
            name="role"
            value={formData.role}
            onChange={handleChange}
            disabled={status === 'submitting'}
            className={`${inputBase} ${errors.role ? inputError : inputNormal}`}
          >
            <option value="" className="text-gray-900">Seleziona...</option>
            {ROLE_OPTIONS.map((r) => (
              <option key={r} value={r} className="text-gray-900">{r}</option>
            ))}
          </select>
          {errors.role && <p className="mt-1 text-xs text-red-300">{errors.role}</p>}
        </div>
      </div>

      {/* Row 3: Dimensione azienda */}
      <div>
        <label htmlFor={`${formId}-size`} className={labelBase}>
          Dimensione azienda <span className="text-red-300">*</span>
        </label>
        <select
          id={`${formId}-size`}
          name="company_size"
          value={formData.company_size}
          onChange={handleChange}
          disabled={status === 'submitting'}
          className={`${inputBase} ${errors.company_size ? inputError : inputNormal} sm:w-1/2`}
        >
          <option value="" className="text-gray-900">Seleziona...</option>
          {SIZE_OPTIONS.map((s) => (
            <option key={s} value={s} className="text-gray-900">{s} dipendenti</option>
          ))}
        </select>
        {errors.company_size && (
          <p className="mt-1 text-xs text-red-300">{errors.company_size}</p>
        )}
      </div>

      {/* Row 4: Aree di interesse (checkboxes) */}
      <fieldset>
        <legend className={labelBase}>
          Area di interesse <span className="text-red-300">*</span>
        </legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
          {INTEREST_OPTIONS.map((opt) => (
            <label
              key={opt}
              className="flex items-start gap-2 cursor-pointer text-sm text-white/80 hover:text-white"
            >
              <input
                type="checkbox"
                checked={formData.interests.includes(opt)}
                onChange={() => handleInterestToggle(opt)}
                disabled={status === 'submitting'}
                className="mt-0.5 accent-primary-500"
              />
              <span>{opt}</span>
            </label>
          ))}
          {/* Altro — free text */}
          <label className="flex items-start gap-2 cursor-pointer text-sm text-white/80 hover:text-white sm:col-span-2">
            <input
              type="checkbox"
              checked={formData.interest_other.length > 0}
              onChange={() => {
                if (formData.interest_other) {
                  setFormData((p) => ({ ...p, interest_other: '' }))
                }
              }}
              disabled={status === 'submitting'}
              className="mt-0.5 accent-primary-500"
            />
            <span className="flex-1">
              Altro:
              <input
                type="text"
                name="interest_other"
                value={formData.interest_other}
                onChange={handleChange}
                disabled={status === 'submitting'}
                placeholder="Specifica..."
                className="ml-2 bg-transparent border-b border-white/30 text-white placeholder-white/40 focus:outline-none focus:border-white/60 w-48"
              />
            </span>
          </label>
        </div>
        {errors.interests && (
          <p className="mt-1 text-xs text-red-300">{errors.interests}</p>
        )}
      </fieldset>

      {/* Row 5: Sistemi (optional) */}
      <div>
        <label htmlFor={`${formId}-systems`} className={labelBase}>
          Sistemi principali <span className="text-white/50">(opzionale)</span>
        </label>
        <input
          type="text"
          id={`${formId}-systems`}
          name="systems"
          value={formData.systems}
          onChange={handleChange}
          disabled={status === 'submitting'}
          className={`${inputBase} ${inputNormal}`}
          placeholder="Es. SAP, Salesforce, HubSpot..."
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="
          w-full flex items-center justify-center gap-2
          px-6 py-3.5 rounded-lg
          bg-white text-primary-600 font-bold text-lg
          hover:bg-gray-100
          disabled:bg-white/60 disabled:cursor-not-allowed
          transition-colors
          focus:outline-none focus:ring-2 focus:ring-white/60 focus:ring-offset-2 focus:ring-offset-primary-500
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
            Prenota e scegli la data
          </>
        )}
      </button>
    </form>
  )
}

export default AssessmentForm
