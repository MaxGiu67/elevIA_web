'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { areaList } from '@/content/areas'
import { useCases, type UseCaseId } from '@/content/use-cases'

interface UseCasesProps {
  isHighlighted?: boolean
  isMinimized?: boolean
  highlightAreas?: string[]
  highlightUseCases?: string[]
}

const areaColorMap: Record<string, string> = {
  knowledge: 'bg-blue-100 text-blue-700',
  'customer-experience': 'bg-green-100 text-green-700',
  operations: 'bg-purple-100 text-purple-700',
  workflow: 'bg-amber-100 text-amber-700',
  hr: 'bg-rose-100 text-rose-700',
}

export function UseCases({ isMinimized, highlightAreas, highlightUseCases }: UseCasesProps) {
  if (isMinimized) {
    return (
      <section id="services" className="py-12 bg-gray-50">
        <div className="container-main text-center">
          <h2 className="text-2xl font-bold text-dark-900">
            Soluzioni AI pronte per la tua azienda
          </h2>
        </div>
      </section>
    )
  }

  // Filter areas if highlight specified
  const displayAreas = highlightAreas && highlightAreas.length > 0
    ? areaList.filter(a => highlightAreas.includes(a.id))
    : areaList

  return (
    <section
      id="services"
      className="py-20 lg:py-28 bg-gray-50"
      aria-labelledby="use-cases-title"
    >
      <div className="container-main">
        <div className="text-center mb-4">
          <h2
            id="use-cases-title"
            className="text-3xl md:text-4xl font-bold text-dark-900 mb-4"
          >
            Soluzioni AI <span className="text-secondary-500">pronte</span> per la tua azienda
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Ogni soluzione parte da un problema reale della tua operativita' e si integra
            ai sistemi che hai gia'.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {displayAreas.map((area) => {
            const areaUseCases = (area.useCases || []).map((ucId: string) => {
              const uc = useCases[ucId as UseCaseId]
              return uc ? uc : null
            }).filter(Boolean)

            return areaUseCases.map((uc) => {
              if (!uc) return null
              const isHighlightedUC = highlightUseCases?.includes(uc.id)
              return (
                <Link
                  key={uc.id}
                  href={`/use-case/${uc.id}`}
                  className={`block bg-white rounded-xl p-6 border hover:shadow-lg transition-all duration-200 ${
                    isHighlightedUC
                      ? 'border-primary-300 ring-2 ring-primary-100'
                      : 'border-gray-200 hover:border-primary-200'
                  }`}
                >
                  <div className="mb-3">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${areaColorMap[area.id] || 'bg-gray-100 text-gray-700'}`}>
                      {area.name}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-dark-900 mb-2">{uc.name}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {uc.components?.problem?.statement || uc.components?.header?.tagline}
                  </p>
                  {uc.components?.kpi?.metrics && uc.components.kpi.metrics.length > 0 && (
                    <p className="text-primary-500 text-sm font-medium">
                      {uc.components.kpi.metrics[0].value} {uc.components.kpi.metrics[0].label}
                    </p>
                  )}
                </Link>
              )
            })
          })}
        </div>

        <div className="text-center mt-12">
          <Link
            href="#contact"
            className="btn-primary inline-flex items-center gap-2"
          >
            Scopri quale fa per te
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
