'use client'

import Link from 'next/link'
import {
  ProblemBlock,
  SolutionBlock,
  KPIBlock,
  ComparisonBlock,
  RequirementsBlock,
  TechStackBlock,
  CTABlock,
  RelatedBlock,
} from '@/features/blocks/components'
import { WaveBottom } from '@/features/landing/components'

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

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Dark style like landing with wave transition */}
      <div className="relative bg-dark-900 text-white pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 bg-dark-800 text-primary-500 rounded-full text-sm mb-4">
              {useCase.effort}
            </span>
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

      {/* Content Blocks */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-40 pb-16 space-y-16">
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

        {/* CTA */}
        <section>
          <CTABlock
            text={components.cta.text}
            urgency={components.cta.urgency}
            href="#contact"
          />
        </section>

        {/* Related Use Cases */}
        {relatedUseCases.length > 0 && (
          <section>
            <RelatedBlock useCases={relatedUseCases} />
          </section>
        )}
      </div>
    </div>
  )
}

export default UseCasePage
