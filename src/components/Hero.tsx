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
  headline: 'UPGRAI non è solo AI.',
  subheadline: 'È un ecosistema di innovazione fondato sulla filosofia People First: mettiamo le persone al centro, valorizzando il talento e rispondendo alle esigenze di chi lavora con noi.',
  ctaText: 'SCOPRI DI PIÙ',
  ctaHref: '#services',
}

// Wave SVG component for transitions
function WaveDivider({ flip = false }: { flip?: boolean }) {
  return (
    <div className={`absolute left-0 w-full overflow-hidden leading-none ${flip ? 'bottom-0' : 'top-0'}`}>
      <svg
        className={`relative block w-full h-[80px] ${flip ? '' : 'rotate-180'}`}
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

export function Hero({
  headline = defaultProps.headline,
  subheadline = defaultProps.subheadline,
  ctaText = defaultProps.ctaText,
  ctaHref = '#services',
}: HeroProps) {
  return (
    <section className="relative bg-white">
      {/* Main Hero Content */}
      <div className="container-main py-20 lg:py-28">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-dark-900 leading-tight mb-6"
          >
            <span className="text-dark-900">UPGRAI</span>{' '}
            <span className="text-gray-600 font-normal">non è solo AI.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg md:text-xl text-gray-600 mb-6 max-w-3xl mx-auto"
          >
            {subheadline}
          </motion.p>

          {/* Feature points */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4 mb-8 max-w-2xl mx-auto"
          >
            <div className="flex items-start gap-3 text-left">
              <svg className="w-6 h-6 text-secondary-500 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <p className="text-gray-700">
                <span className="font-semibold">Per le aziende</span>, questo significa soluzioni AI che supportano la crescita, l'efficienza operativa e il vantaggio competitivo.
              </p>
            </div>
            <div className="flex items-start gap-3 text-left">
              <svg className="w-6 h-6 text-primary-500 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <p className="text-gray-700">
                <span className="font-semibold">Per i team</span>, significa partnership strategiche in cui le loro sfide diventano le nostre, affrontandole con soluzioni innovative e su misura.
              </p>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-gray-600 mb-8"
          >
            Qui, tecnologie all'avanguardia e talenti emergenti si incontrano per creare soluzioni AI rivoluzionarie.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link href={ctaHref} className="link-orange text-lg">
              {ctaText}
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Wave transition to dark section */}
      <div className="relative h-20">
        <WaveDivider flip />
      </div>
    </section>
  )
}
