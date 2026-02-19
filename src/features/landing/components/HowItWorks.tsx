'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface HowItWorksProps {
  isHighlighted?: boolean
  isMinimized?: boolean
}

const phases = [
  {
    number: '01',
    name: 'Assess',
    duration: '2 settimane',
    description:
      'Gratuito. Mappiamo i tuoi sistemi, analizziamo dove l\'AI ha impatto, ti presentiamo un piano con soluzioni, tempi e costi. Il report resta tuo anche se decidi di non procedere.',
  },
  {
    number: '02',
    name: 'Build',
    duration: '2 mesi',
    description:
      'Installiamo le prime soluzioni AI. Validazione sul campo, KPI misurabili, il tuo team impara a usarle.',
  },
  {
    number: '03',
    name: 'Scale',
    duration: '3,5 mesi',
    description:
      'Tutte le soluzioni attive, integrazioni completate, formazione utenti, handover. La tua azienda e\' autonoma.',
  },
]

export function HowItWorks({ isMinimized }: HowItWorksProps) {
  if (isMinimized) {
    return (
      <section id="how-it-works" className="py-12 bg-dark-900 text-white">
        <div className="container-main text-center">
          <h2 className="text-2xl font-bold">Tre fasi. Risultati concreti.</h2>
        </div>
      </section>
    )
  }

  return (
    <section
      id="how-it-works"
      className="py-20 lg:py-28 bg-dark-900 text-white"
      aria-labelledby="how-it-works-title"
    >
      <div className="container-main">
        <div className="text-center mb-16">
          <h2 id="how-it-works-title" className="text-3xl md:text-4xl font-bold mb-4">
            Tre fasi. Risultati concreti.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {phases.map((phase, index) => (
            <div key={phase.number} className="relative">
              <div className="bg-white/5 rounded-2xl p-8 h-full border border-white/10 border-t-2 border-t-secondary-500">
                <div className="text-primary-500 text-sm font-bold uppercase tracking-wider mb-2">
                  Fase {phase.number}
                </div>
                <h3 className="text-2xl font-bold mb-1">{phase.name}</h3>
                <p className="text-primary-400 text-sm font-medium mb-4">{phase.duration}</p>
                <p className="text-gray-400 text-sm leading-relaxed">{phase.description}</p>
              </div>
              {index < phases.length - 1 && (
                <div className="hidden md:flex absolute top-1/2 -right-5 -translate-y-1/2 z-10">
                  <ArrowRight className="w-6 h-6 text-secondary-400" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/progetto"
            className="inline-flex items-center gap-2 text-secondary-400 hover:text-white font-medium transition-colors"
          >
            Scopri il progetto completo
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
