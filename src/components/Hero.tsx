'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

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

export function Hero() {
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
            20 Use Case AI{' '}
            <span className="text-primary-500">pronti all'uso</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
          >
            UPGRAI è il framework AI che trasforma i problemi aziendali più comuni in soluzioni concrete.
            Soluzioni standardizzate, documentate e pronte per essere implementate in 15 giorni.
          </motion.p>

          {/* Key Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-6 mb-10"
          >
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-secondary-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-700">Accuracy ≥85%</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-secondary-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-700">Latenza &lt; 5 sec</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-secondary-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-700">Disponibilità 99%</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="#services" className="btn-primary">
              Scopri gli Use Case
            </Link>
            <Link href="#problems" className="btn-secondary">
              Hai questi problemi?
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
