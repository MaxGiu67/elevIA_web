'use client'

import { ArrowRight } from 'lucide-react'

interface BeforeAfterProps {
  isHighlighted?: boolean
  isMinimized?: boolean
}

const columns = [
  {
    title: 'Prima',
    items: [
      'Dati chiusi nei sistemi, ricerca manuale',
      'Processi lenti e ripetitivi',
      'Decisioni a sensazione',
    ],
    style: 'bg-white/10 text-white',
  },
  {
    title: 'Con il progetto AI',
    items: [
      'Le prime soluzioni AI attive sui tuoi processi',
      'Automazione progressiva, risposte in linguaggio naturale',
      'Dati collegati, insight automatici',
    ],
    style: 'bg-white text-dark-900',
  },
  {
    title: 'Dopo 6 mesi',
    items: [
      'Sistemi intelligenti, team formato, KPI misurabili',
      'Efficienza operativa, tempo liberato per attivita\' a valore',
      'Decisioni basate su dati reali e previsioni affidabili',
    ],
    style: 'bg-white text-dark-900 ring-2 ring-secondary-400',
  },
]

export function BeforeAfter({ isMinimized }: BeforeAfterProps) {
  if (isMinimized) {
    return (
      <section id="before-after" className="py-12 bg-primary-500 text-white">
        <div className="container-main text-center">
          <h2 className="text-2xl font-bold">Cosa cambia nella tua azienda</h2>
        </div>
      </section>
    )
  }

  return (
    <section
      id="before-after"
      className="py-20 lg:py-28 bg-primary-500 text-white"
      aria-labelledby="before-after-title"
    >
      <div className="container-main">
        <div className="text-center mb-16">
          <h2 id="before-after-title" className="text-3xl md:text-4xl font-bold mb-4">
            Cosa cambia nella tua azienda
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {columns.map((col, colIndex) => (
            <div key={col.title} className="relative">
              <div className={`rounded-2xl p-8 h-full ${col.style}`}>
                <h3 className="text-xl font-bold mb-6">{col.title}</h3>
                <ul className="space-y-4">
                  {col.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="mt-1.5 w-2 h-2 rounded-full bg-primary-500 flex-shrink-0" />
                      <span className="text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {colIndex < columns.length - 1 && (
                <div className="hidden md:flex absolute top-1/2 -right-4 -translate-y-1/2 z-10">
                  <ArrowRight className="w-5 h-5 text-white" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
