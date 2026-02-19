'use client'

import Link from 'next/link'
import { ArrowRight, ChevronRight } from 'lucide-react'
import {
  ProblemBlock,
  SolutionBlock,
  KPIBlock,
  ComparisonBlock,
  RequirementsBlock,
  TechStackBlock,
  RelatedBlock,
} from '@/features/blocks/components'
import { WaveBottom } from '@/features/landing/components'
import { AREA_LABELS_DARK, UC_AREA_MAP } from '@/features/shared/constants/areaLabels'

interface UseCase {
  id: string
  name: string
  area: string
  effort: string
  hero: {
    image: string
    overlay: { color: string; opacity: number }
  }
  components: {
    header: {
      title: string
      tagline: string
      icon: string
    }
    problem: {
      statement: string
      painPoints: string[]
    }
    solution: {
      overview: string
      example: {
        question: string
        answer: string
        source: string
      }
      steps: Array<{ title: string; description: string }>
    }
    comparison: {
      before: string[]
      after: string[]
    }
    kpi: {
      metrics: Array<{ value: string; label: string; icon: string }>
    }
    requirements: {
      fromClient: string[]
      notNeeded: string[]
    }
    tech: {
      stack: string[]
      integrations: string[]
    }
    cta: {
      text: string
      urgency: 'low' | 'medium' | 'high'
    }
  }
  solvesProblems: string[]
  relatedUseCases: string[]
}

interface RelatedUseCase {
  id: string
  name: string
  tagline?: string
}

interface UseCasePageProps {
  useCase: UseCase
  relatedUseCases: RelatedUseCase[]
}

export function UseCasePage({ useCase, relatedUseCases }: UseCasePageProps) {
  const { components } = useCase
  const areaId = UC_AREA_MAP[useCase.id] || useCase.area
  const areaInfo = AREA_LABELS_DARK[areaId]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Dark style like landing with wave transition */}
      <div className="relative bg-dark-900 text-white pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="max-w-3xl">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-sm text-gray-500 mb-6">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              {areaInfo && (
                <>
                  <Link href={`/area/${areaId}`} className="hover:text-white transition-colors">{areaInfo.label}</Link>
                  <ChevronRight className="w-3.5 h-3.5" />
                </>
              )}
              <span className="text-gray-400">{components.header.title}</span>
            </nav>

            <div className="flex items-center gap-3 mb-4">
              {areaInfo && (
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${areaInfo.color}`}>
                  {areaInfo.label}
                </span>
              )}
              <span className="px-3 py-1 bg-dark-800 text-secondary-400 rounded-full text-xs font-medium">
                {useCase.effort}
              </span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              {components.header.title}
            </h1>
            <p className="text-xl text-secondary-400">
              {components.header.tagline}
            </p>
          </div>
        </div>
        <WaveBottom />
      </div>

      {/* Content Blocks - white bg sits above wave (z-20 > z-10) */}
      <div className="relative z-20 bg-white mt-[90px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 space-y-16">
        {/* Problem */}
        <section>
          <ProblemBlock
            statement={components.problem.statement}
            painPoints={components.problem.painPoints}
          />
        </section>

        {/* Solution */}
        <section>
          <SolutionBlock
            overview={components.solution.overview}
            example={components.solution.example}
            steps={components.solution.steps}
          />
        </section>

        {/* Comparison */}
        <section>
          <ComparisonBlock
            before={components.comparison.before}
            after={components.comparison.after}
          />
        </section>

        {/* KPIs */}
        <section>
          <KPIBlock metrics={components.kpi.metrics} />
        </section>

        {/* Requirements */}
        <section>
          <RequirementsBlock
            fromClient={components.requirements.fromClient}
            notNeeded={components.requirements.notNeeded}
          />
        </section>

        {/* Tech Stack */}
        <section>
          <TechStackBlock
            stack={components.tech.stack}
            integrations={components.tech.integrations}
          />
        </section>

        {/* Related Use Cases */}
        {relatedUseCases.length > 0 && (
          <section>
            <RelatedBlock useCases={relatedUseCases} />
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
            Prenota l&apos;assessment gratuito
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
      </div>
    </div>
  )
}

export default UseCasePage
