'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

interface HeroProps {
  isHighlighted?: boolean
  isMinimized?: boolean
}

/** Wave that extends the dark Hero downward into the white section below. */
function HeroWaveBottom() {
  return (
    <div
      className="absolute bottom-0 left-0 w-full overflow-hidden leading-none translate-y-[79px] z-10"
      aria-hidden="true"
    >
      <svg
        className="relative block w-full h-[80px]"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
          fill="#0a0a0a"
        />
      </svg>
    </div>
  )
}

export function Hero({ isMinimized }: HeroProps) {
  if (isMinimized) {
    return (
      <section id="hero" className="py-12 bg-dark-900">
        <div className="container-main text-center">
          <h1 className="text-2xl font-bold text-primary-500">
            I tuoi sistemi sanno gia' tutto. L'AI li aiuta a parlare.
          </h1>
        </div>
      </section>
    )
  }

  return (
    <section id="hero" className="relative bg-dark-900 py-20 lg:py-32 pb-28 lg:pb-40">
      <div className="container-main">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-secondary-500 uppercase tracking-wider text-sm font-medium mb-4"
          >
            Soluzioni AI Nexa Data
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-primary-500"
          >
            I tuoi sistemi sanno gia' tutto.{' '}
            <span className="text-white">L'AI li aiuta a parlare.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-300 mb-10 max-w-3xl mx-auto"
          >
            Trasformiamo i tuoi ERP, CRM e gestionali in sistemi intelligenti.
            Nessuna sostituzione: l'AI arricchisce cio' che hai gia'.
            Scope definito, prezzo fisso, 6 mesi.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link
              href="#contact"
              className="inline-block bg-primary-500 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-primary-600 transition-colors"
            >
              Prenota l'assessment gratuito
            </Link>
          </motion.div>
        </div>
      </div>
      <HeroWaveBottom />
    </section>
  )
}
