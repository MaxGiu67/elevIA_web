'use client'

import { WaveTop, WaveBottom } from './Wave'

/**
 * Features section showing why to choose UPGRAI.
 * Displays key benefits and value propositions.
 */

const features = [
  {
    icon: (
      <svg className="w-8 h-8 text-secondary-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'Use Case Standardizzati',
    description: '20 soluzioni AI pronte all\'uso, testate e documentate. Riduci tempi e rischi di implementazione.',
  },
  {
    icon: (
      <svg className="w-8 h-8 text-primary-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Delivery in 15 Giorni',
    description: 'Ogni Use Case ha un effort standard di 15 giorni/persona. Pianificazione prevedibile.',
  },
  {
    icon: (
      <svg className="w-8 h-8 text-secondary-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Accuracy Garantita',
    description: 'Ogni soluzione garantisce accuracy ≥85% con latenza inferiore a 5 secondi.',
  },
  {
    icon: (
      <svg className="w-8 h-8 text-primary-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ),
    title: 'Framework Modulare',
    description: 'Architettura estensibile che si integra con i tuoi sistemi: CRM, ERP, calendari e database.',
  },
]

export function Features() {
  return (
    <section
      id="about"
      className="relative bg-dark-900 text-white pt-40 pb-48"
      aria-labelledby="features-title"
    >
      <WaveTop />
      <div className="container-main">
        <div className="text-center mb-12">
          <p className="text-gray-400 uppercase tracking-wider text-sm mb-2">PERCHÉ SCEGLIERE</p>
          <h2 id="features-title" className="text-3xl md:text-4xl font-bold text-white">UPGRAI</h2>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          role="list"
          aria-label="Vantaggi di UPGRAI"
        >
          {features.map((feature, index) => (
            <article
              key={index}
              className="flex gap-4 focus-within:ring-2 focus-within:ring-secondary-500 rounded-lg p-2"
              role="listitem"
              tabIndex={0}
            >
              {feature.icon}
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            </article>
          ))}
        </div>

        <p className="text-center text-gray-400 mt-12 max-w-2xl mx-auto">
          UPGRAI è il framework AI che trasforma i problemi aziendali più comuni in soluzioni concrete e misurabili.
        </p>
      </div>
      <WaveBottom />
    </section>
  )
}
