'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface RelatedUseCase {
  id: string
  name: string
  tagline?: string
}

interface RelatedBlockProps {
  useCases: RelatedUseCase[]
  className?: string
}

export function RelatedBlock({ useCases, className = '' }: RelatedBlockProps) {
  return (
    <div className={`bg-gray-50 rounded-2xl p-8 ${className}`}>
      <h3 className="text-xl font-semibold text-gray-900 mb-6">Use Case correlati</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {useCases.map((uc) => (
          <Link
            key={uc.id}
            href={`/use-case/${uc.id}`}
            className="group bg-white rounded-xl p-6 border border-gray-100 hover:border-secondary-300 hover:shadow-md transition-all"
          >
            <h4 className="font-semibold text-gray-900 group-hover:text-secondary-600 mb-2">
              {uc.name}
            </h4>
            {uc.tagline && (
              <p className="text-sm text-gray-500">{uc.tagline}</p>
            )}
            <div className="mt-4 flex items-center gap-1 text-sm text-secondary-600 opacity-0 group-hover:opacity-100 transition-opacity">
              Scopri di più
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default RelatedBlock
