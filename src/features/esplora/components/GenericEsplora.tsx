'use client'

/**
 * GenericEsplora — Fallback use case cards when no solution plan is available.
 * Extracted from the original esplora/page.tsx logic.
 */

import Link from 'next/link'
import { useCases, type UseCaseId } from '@/content/use-cases'
import { AREA_LABELS_LIGHT } from '@/features/shared/constants/areaLabels'
import {
  getUseCaseName,
  getUseCaseTagline,
  getUseCaseProblem,
  getUseCaseKpis,
  getUseCaseTech,
  getUseCaseEffort,
  type UseCaseData,
} from '@/features/shared/utils/useCaseExtractors'

interface UseCaseCardProps {
  id: string
  uc: (typeof useCases)[UseCaseId]
}

function UseCaseCard({ id, uc }: UseCaseCardProps) {
  const ucData = uc as UseCaseData
  const name = getUseCaseName(ucData)
  const tagline = getUseCaseTagline(ucData)
  const problem = getUseCaseProblem(ucData)
  const kpis = getUseCaseKpis(ucData)
  const tech = getUseCaseTech(ucData)
  const effort = getUseCaseEffort(ucData)
  const areaInfo = AREA_LABELS_LIGHT[uc.area] || { label: uc.area, color: 'bg-gray-100 text-gray-800' }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow">
      {/* Card Header */}
      <div className="bg-gradient-to-r from-secondary-500/10 to-secondary-500/5 px-6 py-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className={`inline-block text-xs font-medium px-2.5 py-0.5 rounded-full mb-2 ${areaInfo.color}`}>
              {areaInfo.label}
            </span>
            <h3 className="text-xl font-bold text-gray-900">{name}</h3>
            {tagline && (
              <p className="text-sm text-gray-600 mt-1">{tagline}</p>
            )}
          </div>
          <span className="text-xs text-gray-500 bg-white/80 px-2.5 py-1 rounded-full whitespace-nowrap">
            {effort}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="px-6 py-5 space-y-4">
        {problem && (
          <div>
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Il problema</h4>
            <p className="text-sm text-gray-700">{problem}</p>
          </div>
        )}

        {kpis.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Risultati</h4>
            <div className="grid grid-cols-3 gap-3">
              {kpis.map((kpi, i) => (
                <div key={i} className="text-center bg-gray-50 rounded-lg py-2 px-1">
                  <p className="text-lg font-bold text-secondary-600">{kpi.value}</p>
                  <p className="text-xs text-gray-500">{kpi.label}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {tech.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Tecnologie</h4>
            <div className="flex flex-wrap gap-1.5">
              {tech.map((t, i) => (
                <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Card Footer */}
      <div className="px-6 pb-5">
        <Link
          href={`/use-case/${id}`}
          className="inline-flex items-center justify-center px-6 py-3 bg-secondary-500 text-white font-medium rounded-md hover:bg-secondary-600 transition-colors w-full text-center text-sm"
        >
          Scopri di più
        </Link>
      </div>
    </div>
  )
}

interface GenericEsploraProps {
  requestedIds: string[]
}

export function GenericEsplora({ requestedIds }: GenericEsploraProps) {
  const validUseCases = requestedIds
    .filter((id): id is UseCaseId => id in useCases)
    .map(id => ({ id, data: useCases[id] }))

  if (validUseCases.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Nessuna soluzione trovata</h1>
          <p className="text-gray-600 mb-6">
            I use case richiesti non sono stati trovati. Torna alla home e parla con il nostro assistente AI per ricevere raccomandazioni personalizzate.
          </p>
          <Link href="/" className="inline-flex items-center justify-center px-6 py-3 bg-secondary-500 text-white font-medium rounded-md hover:bg-secondary-600 transition-colors">
            Torna alla Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <p className="text-sm font-medium text-secondary-500 uppercase tracking-wider mb-2">
            Personalizzato per te
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Le soluzioni elevIA per te
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            In base alla nostra conversazione, ecco gli use case AI che possono
            risolvere i tuoi problemi aziendali.
          </p>
        </div>
      </section>

      {/* Use Case Cards */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-8 md:grid-cols-2">
          {validUseCases.map(({ id, data }) => (
            <UseCaseCard key={id} id={id} uc={data} />
          ))}
        </div>
      </section>

      {/* CTA Section - Orange band before footer */}
      <section className="bg-primary-500">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Pronto a partire?
          </h2>
          <p className="text-white/80 mb-8">
            Richiedi un assessment gratuito e scopri come implementare queste soluzioni nella tua azienda.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/#contact" className="inline-flex items-center justify-center px-6 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
              Richiedi Assessment Gratuito
            </Link>
            <Link href="/" className="inline-flex items-center justify-center px-6 py-3 border-2 border-white text-white font-medium rounded-lg hover:bg-white/10 transition-colors">
              Torna alla Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default GenericEsplora
