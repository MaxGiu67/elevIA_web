'use client'

import { Lightbulb, ArrowRight } from 'lucide-react'

interface Step {
  title: string
  description: string
}

interface SolutionBlockProps {
  overview: string
  steps?: Step[]
  example?: {
    question?: string
    answer?: string
    source?: string
  }
  className?: string
}

export function SolutionBlock({ overview, steps, example, className = '' }: SolutionBlockProps) {
  return (
    <div className={`bg-white rounded-2xl p-8 border border-gray-200 shadow-sm ${className}`}>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-secondary-100 flex items-center justify-center">
          <Lightbulb className="w-5 h-5 text-secondary-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900">La soluzione</h3>
      </div>

      <p className="text-gray-700 text-lg mb-6">{overview}</p>

      {steps && steps.length > 0 && (
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          {steps.map((step, index) => (
            <div key={index} className="flex-1 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-secondary-500 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                {index + 1}
              </div>
              <div>
                <p className="font-medium text-gray-900">{step.title}</p>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <ArrowRight className="w-5 h-5 text-gray-300 hidden md:block" />
              )}
            </div>
          ))}
        </div>
      )}

      {example && (
        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
          <p className="text-sm text-gray-500 uppercase tracking-wide mb-3">Esempio</p>
          {example.question && (
            <p className="text-gray-700 italic mb-2">"{example.question}"</p>
          )}
          {example.answer && (
            <p className="text-gray-900 font-medium mb-2">"{example.answer}"</p>
          )}
          {example.source && (
            <p className="text-sm text-secondary-600">[Fonte: {example.source}]</p>
          )}
        </div>
      )}
    </div>
  )
}

export default SolutionBlock
