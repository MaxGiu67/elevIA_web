'use client'

import { Search, Target, Rocket } from 'lucide-react'

interface ProposalProps {
  isHighlighted?: boolean
  isMinimized?: boolean
}

const steps = [
  {
    icon: Search,
    title: 'Analizziamo i tuoi sistemi',
    description: 'Mappiamo ERP, CRM, gestionali e processi per capire dove l\'AI ha impatto reale.',
  },
  {
    icon: Target,
    title: 'Identifichiamo le soluzioni AI',
    description: 'Selezioniamo gli Use Case piu\' adatti alla tua operativita\' e ai tuoi obiettivi.',
  },
  {
    icon: Rocket,
    title: 'Consegniamo in 6 mesi',
    description: 'Soluzioni attive, team formato, KPI misurabili. Scope definito, prezzo fisso.',
  },
]

export function Proposal({ isMinimized }: ProposalProps) {
  if (isMinimized) {
    return (
      <section id="proposal" className="py-12 bg-primary-500 text-white">
        <div className="container-main text-center">
          <h2 className="text-2xl font-bold">AI applicata ai tuoi processi. Non ai tuoi sogni.</h2>
        </div>
      </section>
    )
  }

  return (
    <section
      id="proposal"
      className="py-20 lg:py-28 bg-primary-500 text-white"
      aria-labelledby="proposal-title"
    >
      <div className="container-main">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 id="proposal-title" className="text-3xl md:text-4xl font-bold mb-6">
            AI applicata ai tuoi processi. Non ai tuoi sogni.
          </h2>
          <p className="text-lg text-white/90">
            Non vendiamo tecnologia generica. Partiamo dai tuoi sistemi — quelli che usi ogni giorno
            — e aggiungiamo uno strato intelligente che li fa rendere di piu'. L'assessment e'
            gratuito: mappiamo i tuoi sistemi, analizziamo dove l'AI ha impatto reale, ti
            presentiamo un piano concreto con tempi e costi definiti.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={index} className="text-center">
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-white/80 text-sm">{step.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
