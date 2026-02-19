'use client'

import { ArrowRight } from 'lucide-react'

const phases = [
  {
    number: '01',
    name: 'Assess',
    duration: '2 settimane',
    description:
      'Mappiamo i tuoi sistemi: cosa hai, dove l\'AI ha impatto, quali soluzioni attivare. Analizziamo la tua AI-readiness e costruiamo una roadmap personalizzata.',
    deliverable:
      'Report completo con mappa sistemi, soluzioni consigliate, timeline e preventivo. Resta tuo anche se non procedi.',
  },
  {
    number: '02',
    name: 'Build',
    duration: '2 mesi',
    description:
      'Installiamo l\'infrastruttura e attiviamo le prime soluzioni AI. Il tuo team inizia a usarle, misuriamo i primi risultati.',
    deliverable:
      'Prime soluzioni attive e funzionanti, KPI baseline, il tuo team che le usa.',
  },
  {
    number: '03',
    name: 'Scale',
    duration: '3,5 mesi',
    description:
      'Tutte le soluzioni attive. Integrazioni tra sistemi, formazione completa del team, handover. Alla fine sei autonomo.',
    deliverable:
      'Tutte le soluzioni in produzione, team formato, documentazione, autonomia operativa.',
  },
]

export function ProjectPhases() {
  return (
    <section
      className="py-20 lg:py-28 bg-dark-900 text-white"
      aria-labelledby="project-phases-title"
    >
      <div className="container-main">
        <div className="text-center mb-16">
          <h2
            id="project-phases-title"
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Tre fasi. Risultati visibili da subito.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {phases.map((phase, index) => (
            <div key={phase.number} className="relative">
              <div className="bg-white/5 rounded-2xl p-8 h-full border border-white/10 border-t-2 border-t-secondary-500">
                <div className="text-secondary-500 text-sm font-bold uppercase tracking-wider mb-2">
                  Fase {phase.number}
                </div>
                <h3 className="text-2xl font-bold mb-1">{phase.name}</h3>
                <p className="text-secondary-400 text-sm font-medium mb-4">{phase.duration}</p>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">{phase.description}</p>
                <div className="pt-4 border-t border-white/10">
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">
                    Cosa ricevi
                  </p>
                  <p className="text-gray-300 text-sm">{phase.deliverable}</p>
                </div>
              </div>
              {index < phases.length - 1 && (
                <div className="hidden md:flex absolute top-1/2 -right-5 -translate-y-1/2 z-10">
                  <ArrowRight className="w-6 h-6 text-secondary-400" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
