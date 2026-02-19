'use client'

import { X, Check } from 'lucide-react'

interface WhyUsProps {
  isHighlighted?: boolean
  isMinimized?: boolean
  rows?: Array<{ generic: string; ours: string }>
}

const defaultRows = [
  {
    generic: '"Facciamo AI" senza dettagli',
    ours: '20 soluzioni pronte con scope e costi definiti',
  },
  {
    generic: 'Scope aperto, costi che lievitano',
    ours: 'Prezzo fisso, timeline certa di 6 mesi',
  },
  {
    generic: 'Sviluppo da zero, tempi incerti',
    ours: 'Soluzioni collaudate, integrate ai tuoi sistemi',
  },
  {
    generic: 'Nessun assessment',
    ours: 'Assessment gratuito — decidi dopo aver visto i dati',
  },
  {
    generic: 'Formazione esclusa',
    ours: 'Formazione utenti e handover inclusi',
  },
  {
    generic: 'Nessuna certificazione',
    ours: 'Certificati Microsoft Azure AI',
  },
]

export function WhyUs({ isMinimized, rows }: WhyUsProps) {
  const comparisonRows = rows || defaultRows

  if (isMinimized) {
    return (
      <section id="why-us" className="py-12 bg-white">
        <div className="container-main text-center">
          <h2 className="text-2xl font-bold text-dark-900">
            Perche' scegliere Nexa Data per l'AI
          </h2>
        </div>
      </section>
    )
  }

  return (
    <section
      id="why-us"
      className="py-20 lg:py-28 bg-white"
      aria-labelledby="why-us-title"
    >
      <div className="container-main">
        <div className="text-center mb-16">
          <h2
            id="why-us-title"
            className="text-3xl md:text-4xl font-bold text-dark-900 mb-4"
          >
            Perche' scegliere Nexa Data per l'AI
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Desktop Table */}
          <div className="hidden md:block overflow-hidden rounded-2xl border border-gray-200">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-500 uppercase tracking-wider w-1/2">
                    Approccio generico
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-secondary-500 uppercase tracking-wider w-1/2">
                    Nexa Data
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                    <td className="px-6 py-4">
                      <div className="flex items-start gap-3">
                        <X className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-600 text-sm">{row.generic}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-secondary-500 flex-shrink-0 mt-0.5" />
                        <span className="text-dark-900 text-sm font-medium">{row.ours}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {comparisonRows.map((row, index) => (
              <div key={index} className="bg-white rounded-xl border border-gray-200 p-4">
                <div className="flex items-start gap-3 mb-3">
                  <X className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-500 text-sm line-through">{row.generic}</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-secondary-500 flex-shrink-0 mt-0.5" />
                  <span className="text-dark-900 text-sm font-medium">{row.ours}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
