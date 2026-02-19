'use client'

/**
 * PersonalizedEsplora — Renders a personalized solution page
 * matching the UseCasePage layout (dark hero + wave + content blocks)
 * but with merged data from the AI solution plan and use case catalog.
 */

import Link from 'next/link'
import {
  ProblemBlock,
  KPIBlock,
  ComparisonBlock,
  TechStackBlock,
} from '@/features/blocks/components'
import { WaveBottom } from '@/features/landing/components'
import { WorkflowBlock } from './WorkflowBlock'
import { useCases, type UseCaseId } from '@/content/use-cases'
import type { SolutionPlan } from '../stores/solutionPlanStore'
import {
  AREA_LABELS_DARK,
  AREA_LABELS_LIGHT,
  UC_AREA_MAP,
  UC_NAMES,
} from '@/features/shared/constants/areaLabels'
import {
  getUseCaseKpis,
  getUseCaseTech,
  getUseCaseIntegrations,
  getUseCaseComparison,
  getUseCaseEffort,
  type UseCaseData,
} from '@/features/shared/utils/useCaseExtractors'

interface PersonalizedEsploraProps {
  plan: SolutionPlan
}

export function PersonalizedEsplora({ plan }: PersonalizedEsploraProps) {
  // Collect unique areas from recommended use cases for hero badges
  const areas = Array.from(new Set(plan.useCases.map(uc => UC_AREA_MAP[uc.id]).filter(Boolean)))
  const areaBadges = areas.map(a => AREA_LABELS_DARK[a] || { label: a, color: 'bg-gray-500/20 text-gray-300' })

  // Merge tech stack: plan's custom + catalog's for each use case
  const catalogTech = new Set<string>()
  const catalogIntegrations = new Set<string>()
  for (const planUc of plan.useCases) {
    if (planUc.id in useCases) {
      const uc = useCases[planUc.id as UseCaseId] as UseCaseData
      getUseCaseTech(uc).forEach(t => catalogTech.add(t))
      getUseCaseIntegrations(uc).forEach(t => catalogIntegrations.add(t))
    }
  }
  // Plan overrides take priority, then catalog fills in
  const mergedTech = plan.techStack && plan.techStack.length > 0
    ? plan.techStack
    : Array.from(catalogTech)
  const mergedIntegrations = plan.integrations && plan.integrations.length > 0
    ? plan.integrations
    : Array.from(catalogIntegrations)

  // Merge KPIs: plan's custom take priority, fallback to catalog
  const mergedKpis = plan.kpis && plan.kpis.length > 0
    ? plan.kpis
    : plan.useCases.flatMap(planUc => {
        if (planUc.id in useCases) {
          return getUseCaseKpis(useCases[planUc.id as UseCaseId] as UseCaseData)
        }
        return []
      }).slice(0, 4)

  // Merge comparison: plan's custom takes priority, fallback to first use case with comparison
  let mergedComparison = plan.comparison
  if (!mergedComparison || mergedComparison.before.length === 0) {
    for (const planUc of plan.useCases) {
      if (planUc.id in useCases) {
        const comp = getUseCaseComparison(useCases[planUc.id as UseCaseId] as UseCaseData)
        if (comp && comp.before.length > 0) {
          mergedComparison = comp
          break
        }
      }
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section — Dark style matching UseCasePage */}
      <div className="relative bg-dark-900 text-white pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
          <div className="max-w-3xl">
            {/* Area badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              {areaBadges.map((badge, i) => (
                <span key={i} className={`inline-block px-3 py-1 rounded-full text-sm ${badge.color}`}>
                  {badge.label}
                </span>
              ))}
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              {plan.title}
            </h1>
            {plan.subtitle && (
              <p className="text-xl text-secondary-400">
                {plan.subtitle}
              </p>
            )}
          </div>
        </div>
        <WaveBottom />
      </div>

      {/* Content Blocks — white bg sits above wave (z-20 > z-10) */}
      <div className="relative z-20 bg-white mt-[90px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 space-y-16">
        {/* Problem */}
        <section>
          <ProblemBlock
            statement={plan.problem.statement}
            painPoints={plan.problem.painPoints}
          />
        </section>

        {/* Workflow (replaces SolutionBlock) */}
        {plan.workflow.steps.length > 0 && (
          <section>
            <WorkflowBlock
              overview={plan.workflow.overview}
              steps={plan.workflow.steps}
            />
          </section>
        )}

        {/* Use Case Detail Cards */}
        <section>
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Le soluzioni integrate</h3>
          <div className="grid gap-6 md:grid-cols-2">
            {plan.useCases.map((planUc) => {
              const areaId = UC_AREA_MAP[planUc.id] || ''
              const areaInfo = AREA_LABELS_LIGHT[areaId] || { label: '', color: 'bg-gray-100 text-gray-800' }
              const displayName = UC_NAMES[planUc.id] || planUc.id
              const catalogUc = planUc.id in useCases ? useCases[planUc.id as UseCaseId] : null
              const effort = catalogUc ? getUseCaseEffort(catalogUc as UseCaseData) : '15 giorni'

              return (
                <div
                  key={planUc.id}
                  className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="px-6 py-5 border-b border-gray-100">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        {areaInfo.label && (
                          <span className={`inline-block text-xs font-medium px-2.5 py-0.5 rounded-full mb-2 ${areaInfo.color}`}>
                            {areaInfo.label}
                          </span>
                        )}
                        <h4 className="text-xl font-bold text-gray-900">{displayName}</h4>
                      </div>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full whitespace-nowrap">
                        {effort}
                      </span>
                    </div>
                  </div>
                  <div className="px-6 py-5">
                    <p className="text-gray-700">{planUc.customDescription}</p>
                  </div>
                  <div className="px-6 pb-5">
                    <Link
                      href={`/use-case/${planUc.id}`}
                      className="inline-flex items-center justify-center px-6 py-3 bg-secondary-500 text-white font-medium rounded-md hover:bg-secondary-600 transition-colors w-full text-center text-sm"
                    >
                      Approfondisci
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Comparison */}
        {mergedComparison && mergedComparison.before.length > 0 && mergedComparison.after.length > 0 && (
          <section>
            <ComparisonBlock
              before={mergedComparison.before}
              after={mergedComparison.after}
            />
          </section>
        )}

        {/* KPIs */}
        {mergedKpis.length > 0 && (
          <section>
            <KPIBlock metrics={mergedKpis} />
          </section>
        )}

        {/* Tech Stack */}
        {(mergedTech.length > 0 || mergedIntegrations.length > 0) && (
          <section>
            <TechStackBlock
              stack={mergedTech}
              integrations={mergedIntegrations}
            />
          </section>
        )}

      </div>

      {/* CTA - Orange band before footer */}
      <div className="bg-primary-500 py-16">
        <div className="max-w-3xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Vuoi saperne di più?
          </h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Scopri come possiamo aiutarti a trasformare la tua azienda con soluzioni AI su misura.
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 bg-white text-primary-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Richiedi Assessment Gratuito
          </Link>
        </div>
      </div>
      </div>
    </div>
  )
}

export default PersonalizedEsplora
