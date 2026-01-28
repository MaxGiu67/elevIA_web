'use client'

import { ArrowRight } from 'lucide-react'

interface ComparisonBlockProps {
  before: string[]
  after: string[]
  className?: string
}

export function ComparisonBlock({ before, after, className = '' }: ComparisonBlockProps) {
  return (
    <div className={`overflow-hidden rounded-2xl border border-gray-200 shadow-sm ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 relative">
        {/* Before column */}
        <div className="bg-gray-50 p-8">
          <h4 className="text-lg font-semibold text-gray-500 mb-6 uppercase tracking-wide">Prima</h4>
          <ul className="space-y-4">
            {before.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-sm flex-shrink-0 mt-0.5">
                  ✕
                </span>
                <span className="text-gray-600">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Arrow divider - visible on desktop */}
        <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="w-12 h-12 rounded-full bg-secondary-500 flex items-center justify-center shadow-lg">
            <ArrowRight className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* After column */}
        <div className="bg-white p-8">
          <h4 className="text-lg font-semibold text-secondary-600 mb-6 uppercase tracking-wide">Dopo</h4>
          <ul className="space-y-4">
            {after.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-secondary-500 text-white flex items-center justify-center text-sm flex-shrink-0 mt-0.5">
                  ✓
                </span>
                <span className="text-gray-900 font-medium">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ComparisonBlock
