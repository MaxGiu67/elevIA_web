'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Linkedin } from 'lucide-react'
import { AssessmentForm } from '@/features/lead/components'

interface CTASectionProps {
  isHighlighted?: boolean
  isMinimized?: boolean
}

export function CTASection({ isMinimized }: CTASectionProps) {
  const [showForm, setShowForm] = useState(false)

  if (isMinimized) {
    return (
      <section id="contact" className="py-12 bg-primary-500 text-white">
        <div className="container-main text-center">
          <h2 className="text-2xl font-bold">Scopri cosa puo' fare l'AI per la tua azienda</h2>
        </div>
      </section>
    )
  }

  return (
    <section
      id="contact"
      className="py-20 lg:py-28 bg-primary-500 text-white"
      aria-labelledby="cta-title"
    >
      <div className="container-main">
        <div className="max-w-2xl mx-auto text-center">
          <h2 id="cta-title" className="text-3xl md:text-4xl font-bold mb-4">
            Scopri cosa puo' fare l'AI per la tua azienda
          </h2>
          <p className="text-white/90 mb-8 text-lg">
            Assessment gratuito: mappiamo i tuoi sistemi e ti mostriamo dove l'AI ha impatto
            reale. Nessun impegno.
          </p>

          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="inline-block bg-white text-primary-500 font-bold py-4 px-8 rounded-lg text-lg hover:bg-gray-100 transition-colors mb-4"
            >
              PRENOTA L'ASSESSMENT GRATUITO
            </button>
          )}

          <AnimatePresence>
            {showForm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                className="overflow-hidden"
              >
                <p className="text-white/80 text-sm mb-6">
                  Per preparare al meglio la call, ti chiediamo alcune informazioni rapide
                </p>
                <AssessmentForm className="text-left max-w-xl mx-auto" />
              </motion.div>
            )}
          </AnimatePresence>

          {!showForm && (
            <p className="text-white/70 text-sm mb-10">
              Scegli la data che preferisci.
            </p>
          )}

          {/* Contact Alternatives */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8 border-t border-white/20 mt-8">
            <Link
              href="mailto:elevia@nexadata.it"
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm"
            >
              <Mail className="w-4 h-4" />
              elevia@nexadata.it
            </Link>
            <Link
              href="https://linkedin.com/company/nexadata"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm"
            >
              <Linkedin className="w-4 h-4" />
              LinkedIn
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
