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
  CTABlock,
} from '@/features/blocks/components'
import { WaveBottom } from '@/features/landing/components'
import { WorkflowBlock } from './WorkflowBlock'
import { useCases, type UseCaseId } from '@/content/use-cases'
import type { SolutionPlan } from '../stores/solutionPlanStore'

/** Area ID -> readable label + color */
const AREA_LABELS: Record<string, { label: string; color: string }> = {
  knowledge: { label: 'Knowledge', color: 'bg-blue-500/20 text-blue-300' },
  cx: { label: 'Customer Experience', color: 'bg-orange-500/20 text-orange-300' },
  'customer-experience': { label: 'Customer Experience', color: 'bg-orange-500/20 text-orange-300' },
  operations: { label: 'Operations', color: 'bg-green-500/20 text-green-300' },
  workflow: { label: 'Workflow', color: 'bg-purple-500/20 text-purple-300' },
  hr: { label: 'HR', color: 'bg-pink-500/20 text-pink-300' },
}

/** Area card colors (light bg for content section) */
const AREA_CARD_LABELS: Record<string, { label: string; color: string }> = {
  knowledge: { label: 'Knowledge', color: 'bg-blue-100 text-blue-800' },
  cx: { label: 'Customer Experience', color: 'bg-orange-100 text-orange-800' },
  'customer-experience': { label: 'Customer Experience', color: 'bg-orange-100 text-orange-800' },
  operations: { label: 'Operations', color: 'bg-green-100 text-green-800' },
  workflow: { label: 'Workflow', color: 'bg-purple-100 text-purple-800' },
  hr: { label: 'HR', color: 'bg-pink-100 text-pink-800' },
}

/** Map use case IDs to area */
const UC_AREA_MAP: Record<string, string> = {
  'rag-knowledge-base': 'knowledge',
  'estrazione-dati': 'knowledge',
  'sintesi-riunioni': 'knowledge',
  'due-diligence': 'knowledge',
  'chatbot-faq': 'customer-experience',
  'classificazione-ticket': 'customer-experience',
  'copilot-operatore': 'customer-experience',
  'analisi-sentiment': 'customer-experience',
  'report-automatici': 'operations',
  'ricerca-semantica': 'operations',
  'anomaly-detection': 'operations',
  'predictive-maintenance': 'operations',
  'workflow-approval': 'workflow',
  'content-generation': 'workflow',
  'lead-scoring': 'workflow',
  'compliance-checker': 'workflow',
  'screening-cv': 'hr',
  'onboarding-assistant': 'hr',
  'employee-self-service': 'hr',
  'performance-review': 'hr',
}

/** Map use case IDs to display names */
const UC_NAMES: Record<string, string> = {
  'rag-knowledge-base': 'RAG Knowledge Base',
  'estrazione-dati': 'Estrazione Dati',
  'sintesi-riunioni': 'Sintesi Riunioni',
  'due-diligence': 'Due Diligence',
  'chatbot-faq': 'Chatbot FAQ',
  'classificazione-ticket': 'Classificazione Ticket',
  'copilot-operatore': 'Copilot Operatore',
  'analisi-sentiment': 'Analisi Sentiment',
  'report-automatici': 'Report Automatici',
  'ricerca-semantica': 'Ricerca Semantica',
  'anomaly-detection': 'Anomaly Detection',
  'predictive-maintenance': 'Predictive Maintenance',
  'workflow-approval': 'Workflow Approval',
  'content-generation': 'Content Generation',
  'lead-scoring': 'Lead Scoring',
  'compliance-checker': 'Compliance Checker',
  'screening-cv': 'Screening CV',
  'onboarding-assistant': 'Onboarding Assistant',
  'employee-self-service': 'Employee Self-Service',
  'performance-review': 'Performance Review',
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function getUseCaseKpis(uc: any): Array<{ value: string; label: string; icon: string }> {
  if (uc.components?.kpi?.metrics) return uc.components.kpi.metrics
  const kpiBlock = uc.mattoncini?.find((m: any) => m.type === 'kpi')
  if (kpiBlock?.content?.metrics) return kpiBlock.content.metrics
  return []
}

function getUseCaseTech(uc: any): string[] {
  if (uc.components?.tech?.stack) return uc.components.tech.stack
  const techBlock = uc.mattoncini?.find((m: any) => m.type === 'tech-stack')
  if (techBlock?.content?.stack) return techBlock.content.stack
  return []
}

function getUseCaseIntegrations(uc: any): string[] {
  if (uc.components?.tech?.integrations) return uc.components.tech.integrations
  const techBlock = uc.mattoncini?.find((m: any) => m.type === 'tech-stack')
  if (techBlock?.content?.integrations) return techBlock.content.integrations
  return []
}

function getUseCaseComparison(uc: any): { before: string[]; after: string[] } | null {
  if (uc.components?.comparison) return uc.components.comparison
  const block = uc.mattoncini?.find((m: any) => m.type === 'comparison')
  if (block?.content) return block.content
  return null
}
/* eslint-enable @typescript-eslint/no-explicit-any */

interface PersonalizedEsploraProps {
  plan: SolutionPlan
}

export function PersonalizedEsplora({ plan }: PersonalizedEsploraProps) {
  // Collect unique areas from recommended use cases for hero badges
  const areas = Array.from(new Set(plan.useCases.map(uc => UC_AREA_MAP[uc.id]).filter(Boolean)))
  const areaBadges = areas.map(a => AREA_LABELS[a] || { label: a, color: 'bg-gray-500/20 text-gray-300' })

  // Merge tech stack: plan's custom + catalog's for each use case
  const catalogTech = new Set<string>()
  const catalogIntegrations = new Set<string>()
  for (const planUc of plan.useCases) {
    if (planUc.id in useCases) {
      const uc = useCases[planUc.id as UseCaseId]
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
          return getUseCaseKpis(useCases[planUc.id as UseCaseId])
        }
        return []
      }).slice(0, 4)

  // Merge comparison: plan's custom takes priority, fallback to first use case with comparison
  let mergedComparison = plan.comparison
  if (!mergedComparison || mergedComparison.before.length === 0) {
    for (const planUc of plan.useCases) {
      if (planUc.id in useCases) {
        const comp = getUseCaseComparison(useCases[planUc.id as UseCaseId])
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

      {/* Content Blocks — same spacing as UseCasePage */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-40 pb-16 space-y-16">
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
              const areaInfo = AREA_CARD_LABELS[areaId] || { label: '', color: 'bg-gray-100 text-gray-800' }
              const displayName = UC_NAMES[planUc.id] || planUc.id
              const catalogUc = planUc.id in useCases ? useCases[planUc.id as UseCaseId] : null
              const effort = catalogUc ? ((catalogUc as any).effort || '15 giorni') : '15 giorni'

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
                      className="btn-primary w-full text-center text-sm"
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

        {/* CTA */}
        <section>
          <CTABlock
            text="Richiedi Assessment Gratuito"
            urgency="medium"
            href="/#contact"
          />
        </section>
      </div>
    </div>
  )
}

export default PersonalizedEsplora
