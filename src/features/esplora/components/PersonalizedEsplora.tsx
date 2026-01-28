'use client'

/**
 * PersonalizedEsplora — Renders a personalized solution page
 * from the AI-generated solution plan.
 */

import Link from 'next/link'
import { ProblemBlock } from '@/features/blocks/components/ProblemBlock'
import { ComparisonBlock } from '@/features/blocks/components/ComparisonBlock'
import { KPIBlock } from '@/features/blocks/components/KPIBlock'
import { TechStackBlock } from '@/features/blocks/components/TechStackBlock'
import { WorkflowBlock } from './WorkflowBlock'
import type { SolutionPlan } from '../stores/solutionPlanStore'

/** Area ID -> readable label + color */
const AREA_LABELS: Record<string, { label: string; color: string }> = {
  knowledge: { label: 'Knowledge', color: 'bg-blue-100 text-blue-800' },
  cx: { label: 'Customer Experience', color: 'bg-orange-100 text-orange-800' },
  'customer-experience': { label: 'Customer Experience', color: 'bg-orange-100 text-orange-800' },
  operations: { label: 'Operations', color: 'bg-green-100 text-green-800' },
  workflow: { label: 'Workflow', color: 'bg-purple-100 text-purple-800' },
  hr: { label: 'HR', color: 'bg-pink-100 text-pink-800' },
}

/** Map use case IDs to area for badge display */
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

interface PersonalizedEsploraProps {
  plan: SolutionPlan
}

export function PersonalizedEsplora({ plan }: PersonalizedEsploraProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <p className="text-sm font-medium text-primary-500 uppercase tracking-wider mb-2">
            La tua soluzione personalizzata
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            {plan.title}
          </h1>
          {plan.subtitle && (
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {plan.subtitle}
            </p>
          )}
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Problem Block */}
        <ProblemBlock
          statement={plan.problem.statement}
          painPoints={plan.problem.painPoints}
        />

        {/* Workflow Block */}
        {plan.workflow.steps.length > 0 && (
          <WorkflowBlock
            overview={plan.workflow.overview}
            steps={plan.workflow.steps}
          />
        )}

        {/* Use Case Cards */}
        <section>
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Le soluzioni consigliate</h3>
          <div className="grid gap-6 md:grid-cols-2">
            {plan.useCases.map((uc) => {
              const areaId = UC_AREA_MAP[uc.id] || ''
              const areaInfo = AREA_LABELS[areaId] || { label: '', color: 'bg-gray-100 text-gray-800' }
              const displayName = UC_NAMES[uc.id] || uc.id

              return (
                <div
                  key={uc.id}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="bg-gradient-to-r from-primary-500/10 to-secondary-500/10 px-6 py-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        {areaInfo.label && (
                          <span className={`inline-block text-xs font-medium px-2.5 py-0.5 rounded-full mb-2 ${areaInfo.color}`}>
                            {areaInfo.label}
                          </span>
                        )}
                        <h4 className="text-xl font-bold text-gray-900">{displayName}</h4>
                      </div>
                    </div>
                  </div>
                  <div className="px-6 py-5">
                    <p className="text-sm text-gray-700">{uc.customDescription}</p>
                  </div>
                  <div className="px-6 pb-5">
                    <Link
                      href={`/use-case/${uc.id}`}
                      className="btn-primary w-full text-center text-sm"
                    >
                      Scopri di più
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Comparison Block */}
        {plan.comparison && plan.comparison.before.length > 0 && plan.comparison.after.length > 0 && (
          <section>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Prima vs Dopo</h3>
            <ComparisonBlock
              before={plan.comparison.before}
              after={plan.comparison.after}
            />
          </section>
        )}

        {/* KPI Block */}
        {plan.kpis && plan.kpis.length > 0 && (
          <section>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Risultati attesi</h3>
            <KPIBlock metrics={plan.kpis} />
          </section>
        )}

        {/* Tech Stack Block */}
        {((plan.techStack && plan.techStack.length > 0) || (plan.integrations && plan.integrations.length > 0)) && (
          <TechStackBlock
            stack={plan.techStack || []}
            integrations={plan.integrations || []}
          />
        )}
      </div>

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

export default PersonalizedEsplora
