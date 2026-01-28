'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface CTABlockProps {
  text: string
  urgency?: 'low' | 'medium' | 'high'
  href?: string
  className?: string
}

export function CTABlock({ text, urgency = 'medium', href = '#contact', className = '' }: CTABlockProps) {
  const urgencyStyles = {
    low: 'bg-gray-100 hover:bg-gray-200 text-gray-900',
    medium: 'bg-primary-500 hover:bg-primary-600 text-white',
    high: 'bg-secondary-500 hover:bg-secondary-600 text-white',
  }

  return (
    <div className={`text-center py-12 ${className}`}>
      <Link
        href={href}
        className={`
          inline-flex items-center gap-3 px-8 py-4 rounded-xl
          font-semibold text-lg transition-all
          ${urgencyStyles[urgency]}
          hover:scale-105 hover:shadow-lg
        `}
      >
        {text}
        <ArrowRight className="w-5 h-5" />
      </Link>

      <p className="mt-4 text-gray-500 text-sm">
        Assessment gratuito • Pronto in 15 giorni
      </p>
    </div>
  )
}

export default CTABlock
