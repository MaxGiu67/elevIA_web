'use client'

/**
 * GenericEsplora — Fallback use case cards when no solution plan is available.
 * Extracted from the original esplora/page.tsx logic.
 */

import Link from 'next/link'
import { useCases, type UseCaseId } from '@/content/use-cases'

/** Area ID -> readable label + color */
const AREA_LABELS: Record<string, { label: string; color: string }> = {
  knowledge: { label: 'Knowledge', color: 'bg-blue-100 text-blue-800' },
  cx: { label: 'Customer Experience', color: 'bg-orange-100 text-orange-800' },
  'customer-experience': { label: 'Customer Experience', color: 'bg-orange-100 text-orange-800' },
  operations: { label: 'Operations', color: 'bg-green-100 text-green-800' },
  workflow: { label: 'Workflow', color: 'bg-purple-100 text-purple-800' },
  hr: { label: 'HR', color: 'bg-pink-100 text-pink-800' },
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function getUseCaseName(uc: any): string {
  if (uc.components?.header?.title) return uc.components.header.title
  return uc.name
}

function getUseCaseTagline(uc: any): string {
  if (uc.components?.header?.tagline) return uc.components.header.tagline
  if (uc.hero?.subtitle) return uc.hero.subtitle
  return ''
}

function getUseCaseProblem(uc: any): string {
  if (uc.components?.problem?.statement) return uc.components.problem.statement
  const problemBlock = uc.mattoncini?.find((m: any) => m.type === 'problem')
  if (problemBlock?.content?.statement) return problemBlock.content.statement
  return ''
}

function getUseCaseKpis(uc: any): Array<{ value: string; label: string }> {
  if (uc.components?.kpi?.metrics) {
    return uc.components.kpi.metrics.map((m: any) => ({ value: m.value, label: m.label }))
  }
  const kpiBlock = uc.mattoncini?.find((m: any) => m.type === 'kpi')
  if (kpiBlock?.content?.metrics) {
    return kpiBlock.content.metrics.map((m: any) => ({ value: m.value, label: m.label }))
  }
  return []
}

function getUseCaseTech(uc: any): string[] {
  if (uc.components?.tech?.stack) return uc.components.tech.stack
  const techBlock = uc.mattoncini?.find((m: any) => m.type === 'tech-stack')
  if (techBlock?.content?.stack) return techBlock.content.stack
  return []
}

function getUseCaseEffort(uc: any): string {
  return uc.effort || '15 giorni'
}
/* eslint-enable @typescript-eslint/no-explicit-any */

interface UseCaseCardProps {
  id: string
  uc: (typeof useCases)[UseCaseId]
}

function UseCaseCard({ id, uc }: UseCaseCardProps) {
  const name = getUseCaseName(uc)
  const tagline = getUseCaseTagline(uc)
  const problem = getUseCaseProblem(uc)
  const kpis = getUseCaseKpis(uc)
  const tech = getUseCaseTech(uc)
  const effort = getUseCaseEffort(uc)
  const areaInfo = AREA_LABELS[uc.area] || { label: uc.area, color: 'bg-gray-100 text-gray-800' }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow">
      {/* Card Header */}
      <div className="bg-gradient-to-r from-primary-500/10 to-secondary-500/10 px-6 py-5">
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
                  <p className="text-lg font-bold text-primary-600">{kpi.value}</p>
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
          className="btn-primary w-full text-center text-sm"
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
          <Link href="/" className="btn-primary">
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
          <p className="text-sm font-medium text-primary-500 uppercase tracking-wider mb-2">
            Personalizzato per te
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Le soluzioni UPGRAI per te
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

      {/* CTA Section */}
      <section className="bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Pronto a partire?
          </h2>
          <p className="text-gray-600 mb-8">
            Richiedi un assessment gratuito e scopri come implementare queste soluzioni nella tua azienda in soli 15 giorni.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/#contact" className="btn-primary">
              Richiedi Assessment Gratuito
            </Link>
            <Link href="/" className="btn-secondary">
              Torna alla Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default GenericEsplora
