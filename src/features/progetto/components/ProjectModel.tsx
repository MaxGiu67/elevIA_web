'use client'

import { Search, Lock, Calendar, Shield } from 'lucide-react'

const keyPoints = [
  {
    icon: Search,
    title: 'Assessment gratuito',
    description: 'Mappiamo i tuoi sistemi e ti mostriamo dove l\'AI ha impatto reale.',
  },
  {
    icon: Lock,
    title: 'Prezzo fisso',
    description: 'Nessun costo nascosto, nessun progetto che si allunga.',
  },
  {
    icon: Calendar,
    title: '6 mesi certi',
    description: 'Timeline definita con milestone chiare e risultati misurabili.',
  },
  {
    icon: Shield,
    title: 'I tuoi sistemi restano',
    description: 'L\'AI si integra ai tuoi ERP, CRM e gestionali senza sostituirli.',
  },
]

export function ProjectModel() {
  return (
    <section className="py-20 lg:py-28 bg-white" aria-labelledby="project-model-title">
      <div className="container-main">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2
            id="project-model-title"
            className="text-3xl md:text-4xl font-bold text-dark-900 mb-6"
          >
            Un progetto AI dove sai cosa compri, quanto paghi e quando lo ricevi.
          </h2>
          <p className="text-gray-600 text-lg">
            Nessun costo nascosto, nessun progetto che si allunga. Partiamo con un assessment
            gratuito per capire cosa serve davvero. Poi ti presentiamo un piano chiaro: soluzioni,
            tempi, costi. Decidi tu se procedere.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {keyPoints.map((point, index) => {
            const Icon = point.icon
            return (
              <div key={index} className="text-center">
                <div className="w-16 h-16 rounded-full bg-secondary-50 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8 text-secondary-500" />
                </div>
                <h3 className="text-lg font-semibold text-dark-900 mb-2">{point.title}</h3>
                <p className="text-gray-600 text-sm">{point.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
