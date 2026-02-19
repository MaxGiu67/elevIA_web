'use client'

import { CheckCircle, XCircle } from 'lucide-react'

interface RequirementsBlockProps {
  fromClient: string[]
  notNeeded?: string[]
  className?: string
}

export function RequirementsBlock({ fromClient, notNeeded = [], className = '' }: RequirementsBlockProps) {
  return (
    <div className={`bg-gray-50 rounded-2xl p-8 ${className}`}>
      <h3 className="text-xl font-semibold text-gray-900 mb-6">Cosa serve</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* What we need */}
        <div>
          <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">Da te</h4>
          <ul className="space-y-3">
            {fromClient.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-secondary-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* What we don't need */}
        {notNeeded.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">Non serve</h4>
            <ul className="space-y-3">
              {notNeeded.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-500">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default RequirementsBlock
