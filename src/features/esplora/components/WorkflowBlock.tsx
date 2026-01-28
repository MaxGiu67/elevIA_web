'use client'

/**
 * WorkflowBlock — Visualizes a pipeline of connected use case steps.
 * Shows numbered steps with arrows and badges linking to use cases.
 */

import { ArrowRight, ArrowDown } from 'lucide-react'
import type { WorkflowStep } from '../stores/solutionPlanStore'

interface WorkflowBlockProps {
  overview: string
  steps: WorkflowStep[]
  className?: string
}

export function WorkflowBlock({ overview, steps, className = '' }: WorkflowBlockProps) {
  if (steps.length === 0) return null

  return (
    <div className={`bg-white rounded-2xl p-8 border border-gray-200 shadow-sm ${className}`}>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">Come funziona</h3>
      <p className="text-gray-600 mb-8">{overview}</p>

      {/* Desktop: horizontal flow */}
      <div className="hidden md:flex items-start justify-center gap-0">
        {steps.map((step, index) => (
          <div key={index} className="flex items-start">
            {/* Step */}
            <div className="flex flex-col items-center text-center max-w-[220px]">
              {/* Numbered circle */}
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white text-xl font-bold shadow-md mb-4">
                {index + 1}
              </div>

              <h4 className="font-semibold text-gray-900 mb-2">{step.title}</h4>
              <p className="text-sm text-gray-600 mb-3">{step.description}</p>

              {/* Use case badge */}
              <span className="inline-block text-xs bg-primary-100 text-primary-700 px-2.5 py-1 rounded-full font-medium">
                {step.useCaseId}
              </span>
            </div>

            {/* Arrow between steps */}
            {index < steps.length - 1 && (
              <div className="flex items-center px-4 pt-5">
                <ArrowRight className="w-6 h-6 text-gray-300" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Mobile: vertical flow */}
      <div className="md:hidden flex flex-col items-center gap-0">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center">
            {/* Step */}
            <div className="flex flex-col items-center text-center max-w-sm">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white text-lg font-bold shadow-md mb-3">
                {index + 1}
              </div>

              <h4 className="font-semibold text-gray-900 mb-1">{step.title}</h4>
              <p className="text-sm text-gray-600 mb-2">{step.description}</p>

              <span className="inline-block text-xs bg-primary-100 text-primary-700 px-2.5 py-1 rounded-full font-medium">
                {step.useCaseId}
              </span>
            </div>

            {/* Arrow between steps */}
            {index < steps.length - 1 && (
              <div className="py-3">
                <ArrowDown className="w-5 h-5 text-gray-300" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default WorkflowBlock
