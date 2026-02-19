'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const configs = [
  {
    name: 'Start',
    features: [
      { label: 'Soluzioni AI', value: 'Fino a 10' },
      { label: 'Team dedicato', value: '2 specialisti' },
      { label: 'Durata', value: '6 mesi' },
      { label: 'Assessment', value: 'Gratuito' },
    ],
    ideal: 'Primo progetto AI, validare l\'approccio',
    highlighted: false,
  },
  {
    name: 'Full',
    features: [
      { label: 'Soluzioni AI', value: 'Fino a 15' },
      { label: 'Team dedicato', value: '3 specialisti' },
      { label: 'Durata', value: '6 mesi' },
      { label: 'Assessment', value: 'Gratuito' },
    ],
    ideal: 'Azienda con molti sistemi, ambito ampio',
    highlighted: true,
  },
]

export function Configurations() {
  return (
    <section
      className="py-20 lg:py-28 bg-secondary-500 text-white"
      aria-labelledby="configurations-title"
    >
      <div className="container-main">
        <div className="text-center mb-16">
          <h2
            id="configurations-title"
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Due configurazioni. Scegli quella giusta per te.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {configs.map((config) => (
            <div
              key={config.name}
              className={`bg-white rounded-2xl p-8 text-dark-900 ${
                config.highlighted ? 'ring-4 ring-secondary-400 shadow-2xl' : ''
              }`}
            >
              <h3 className="text-2xl font-bold mb-6">{config.name}</h3>

              <div className="space-y-4 mb-6">
                {config.features.map((feature) => (
                  <div key={feature.label} className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">{feature.label}</span>
                    <span className="font-semibold text-sm">{feature.value}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-gray-200 mb-6">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Ideale per</p>
                <p className="text-sm text-gray-700">{config.ideal}</p>
              </div>

              <Link
                href="#contact"
                className="flex items-center justify-center gap-2 w-full py-3 bg-secondary-500 text-white rounded-lg font-semibold hover:bg-secondary-600 transition-colors text-sm"
              >
                Scopri quale fa per te
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
