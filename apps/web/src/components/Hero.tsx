'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

interface HeroProps {
  headline?: string
  subheadline?: string
  ctaText?: string
  ctaHref?: string
}

const defaultProps: HeroProps = {
  headline: 'Trasforma il tuo business con l\'Intelligenza Artificiale',
  subheadline: 'La tua azienda è pronta per l\'AI? Scopri come UPGRAI può aiutarti a integrare soluzioni AI nelle tue operazioni quotidiane.',
  ctaText: 'Scopri le soluzioni',
  ctaHref: '#features',
}

export function Hero({
  headline = defaultProps.headline,
  subheadline = defaultProps.subheadline,
  ctaText = defaultProps.ctaText,
  ctaHref = '#features',
}: HeroProps) {
  return (
    <section className="relative min-h-[60vh] flex items-center bg-gradient-to-br from-white via-primary-50/30 to-secondary-50/20">
      <div className="container-main py-20 lg:py-32">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-primary-600 font-medium mb-4"
          >
            AI-Powered Solutions
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6"
          >
            {headline}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl"
          >
            {subheadline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link href={ctaHref} className="btn-primary">
              {ctaText}
            </Link>
            <Link href="#use-cases" className="btn-secondary">
              Vedi Use Cases
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Decorative gradient */}
      <div
        className="absolute inset-0 -z-10 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute top-1/2 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-primary-100/40 to-transparent rounded-full blur-3xl" />
      </div>
    </section>
  )
}
