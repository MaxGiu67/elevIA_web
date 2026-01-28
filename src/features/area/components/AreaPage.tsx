'use client'

import { ArrowLeft, ArrowRight, BookOpen, Users, Cog, GitBranch, UserCheck } from 'lucide-react'
import Link from 'next/link'

interface UseCase {
  id: string
  name: string
  tagline: string
  effort: string
}

interface Area {
  id: string
  name: string
  tagline: string
  description: string
  icon: string
  color: string
  stats: {
    timeToInfo: string
    accuracy: string
    coverage: string
  }
}

interface AreaPageProps {
  area: Area
  useCases: UseCase[]
}

const iconMap: Record<string, React.ReactNode> = {
  'book-open': <BookOpen className="w-8 h-8 text-secondary-500" />,
  'users': <Users className="w-8 h-8 text-secondary-500" />,
  'cog': <Cog className="w-8 h-8 text-primary-500" />,
  'git-branch': <GitBranch className="w-8 h-8 text-primary-500" />,
  'user-check': <UserCheck className="w-8 h-8 text-secondary-500" />,
}

export function AreaPage({ area, useCases }: AreaPageProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Dark style like landing */}
      <div className="relative bg-dark-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Torna alla home
          </Link>

          <div className="flex items-start gap-6">
            <div className="p-4 bg-dark-800 rounded-2xl">
              {iconMap[area.icon] || iconMap['book-open']}
            </div>
            <div className="max-w-3xl">
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                {area.name}
              </h1>
              <p className="text-xl text-secondary-400 mb-6">
                {area.tagline}
              </p>
              <p className="text-gray-400">
                {area.description}
              </p>
            </div>
          </div>

          {/* Stats - Orange numbers like landing */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-dark-800 rounded-xl p-6">
              <div className="text-2xl font-bold text-primary-500">{area.stats.timeToInfo}</div>
              <div className="text-gray-500 text-sm mt-1">Tempo di risposta</div>
            </div>
            <div className="bg-dark-800 rounded-xl p-6">
              <div className="text-2xl font-bold text-primary-500">{area.stats.accuracy}</div>
              <div className="text-gray-500 text-sm mt-1">Accuracy</div>
            </div>
            <div className="bg-dark-800 rounded-xl p-6">
              <div className="text-2xl font-bold text-primary-500">{area.stats.coverage}</div>
              <div className="text-gray-500 text-sm mt-1">Copertura</div>
            </div>
          </div>
        </div>
      </div>

      {/* Use Cases Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-dark-900 mb-8">
          Use Case in questa area
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCases.map((uc) => (
            <Link
              key={uc.id}
              href={`/use-case/${uc.id}`}
              className="group card hover:shadow-lg transition-all"
            >
              <h3 className="text-lg font-semibold text-dark-900 group-hover:text-secondary-500 mb-2 transition-colors">
                {uc.name}
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                {uc.tagline}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {uc.effort}
                </span>
                <span className="flex items-center gap-1 text-sm text-secondary-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  Scopri
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-dark-900 mb-4">
            Vuoi saperne di più?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Scopri come possiamo aiutarti a trasformare la tua azienda con soluzioni AI su misura.
          </p>
          <Link
            href="/#contact"
            className="btn-primary inline-flex items-center gap-2"
          >
            Contattaci
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AreaPage
