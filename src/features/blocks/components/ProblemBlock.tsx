'use client'

import { AlertCircle } from 'lucide-react'

interface ProblemBlockProps {
  statement: string
  painPoints: string[]
  className?: string
}

export function ProblemBlock({ statement, painPoints, className = '' }: ProblemBlockProps) {
  return (
    <div className={`bg-white rounded-2xl p-8 border border-gray-200 shadow-sm ${className}`}>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
          <AlertCircle className="w-5 h-5 text-red-500" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900">Il problema</h3>
      </div>

      <p className="text-gray-700 text-lg mb-6">{statement}</p>

      <ul className="space-y-3">
        {painPoints.map((point, index) => (
          <li key={index} className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-red-100 text-red-500 flex items-center justify-center text-sm flex-shrink-0 mt-0.5">
              ✕
            </span>
            <span className="text-gray-600">{point}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ProblemBlock
