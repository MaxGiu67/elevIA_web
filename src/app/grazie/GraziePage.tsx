'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { CalendarCheck, ArrowRight, CheckCircle } from 'lucide-react'

const steps = [
  'Riceverai un\'email di conferma con il link alla call',
  'Il giorno prima riceverai un reminder',
  'Nella call analizzeremo insieme dove l\'AI puo\' avere impatto nei tuoi sistemi',
]

export function GraziePage() {
  return (
    <section className="min-h-[80vh] flex items-center bg-dark-900 text-white">
      <div className="container-main py-20">
        <div className="max-w-2xl mx-auto text-center">
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
            className="mb-8"
          >
            <CalendarCheck className="w-20 h-20 text-primary-500 mx-auto" />
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Appuntamento confermato!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-white/80 mb-10"
          >
            Grazie per aver prenotato il tuo assessment AI gratuito.
          </motion.p>

          {/* Next steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/5 border border-white/10 rounded-xl p-8 mb-10 text-left"
          >
            <h2 className="text-lg font-semibold mb-4 text-white/90">Prossimi passi</h2>
            <ul className="space-y-4">
              {steps.map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" />
                  <span className="text-white/70">{step}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 bg-primary-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-primary-600 transition-colors"
            >
              Esplora le soluzioni AI
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/progetto"
              className="inline-flex items-center justify-center gap-2 border border-white/20 text-white/80 font-medium py-3 px-6 rounded-lg hover:bg-white/5 transition-colors"
            >
              Come funziona il progetto
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
