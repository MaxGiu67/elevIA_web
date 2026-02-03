'use client'

import Link from 'next/link'
import { ArrowRight, BookOpen, Users, Cog, GitBranch, UserCheck, MessageCircle, BarChart2 } from 'lucide-react'
import { WaveTop, WaveBottom } from './Wave'
import { areaList } from '@/content/areas'
import { useCases, type UseCaseId } from '@/content/use-cases'

/**
 * 5 Areas with their Use Cases.
 * Reads from JSON content files and links to detail pages.
 */

const iconMap: Record<string, React.ReactNode> = {
  'book-open': <BookOpen className="w-8 h-8 text-secondary-500" />,
  'users': <Users className="w-8 h-8 text-secondary-500" />,
  'cog': <Cog className="w-8 h-8 text-primary-500" />,
  'git-branch': <GitBranch className="w-8 h-8 text-primary-500" />,
  'user-check': <UserCheck className="w-8 h-8 text-secondary-500" />,
  'message-circle': <MessageCircle className="w-8 h-8 text-secondary-500" />,
  'bar-chart-2': <BarChart2 className="w-8 h-8 text-primary-500" />,
}

export function UseCases() {
  return (
    <section
      id="services"
      className="relative bg-dark-900 text-white pt-40 pb-48"
      aria-labelledby="use-cases-title"
    >
      <WaveTop />
      <div className="container-main">
        <div className="text-center mb-12">
          <p className="text-secondary-500 uppercase tracking-wider text-sm font-medium mb-2">
            5 AREE DI INTERVENTO
          </p>
          <h2 id="use-cases-title" className="text-3xl md:text-4xl font-bold text-white">
            20 Use Case AI Pronti all'Uso
          </h2>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6"
          role="list"
          aria-label="Aree di intervento AI"
        >
          {areaList.map((area) => {
            // Get use case names for this area
            const areaUseCases = (area.useCases || []).map((ucId: string) => {
              const uc = useCases[ucId as UseCaseId]
              return uc ? { id: uc.id, name: uc.name } : null
            }).filter(Boolean) as Array<{ id: string; name: string }>

            return (
              <article
                key={area.id}
                className="text-center p-6 rounded-lg bg-dark-800/50 hover:bg-dark-800 transition-colors group"
                role="listitem"
              >
                <Link href={`/area/${area.id}`} className="block">
                  <div className="flex justify-center mb-4">
                    {iconMap[area.icon] || <BookOpen className="w-8 h-8 text-secondary-500" />}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-secondary-400 transition-colors">
                    {area.name}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">{area.tagline}</p>
                </Link>
                <ul className="text-xs text-gray-500 space-y-1" aria-label={`Use case per ${area.name}`}>
                  {areaUseCases.map((uc) => (
                    <li key={uc.id}>
                      <Link
                        href={`/use-case/${uc.id}`}
                        className="hover:text-secondary-400 transition-colors"
                      >
                        {uc.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/area/${area.id}`}
                  className="inline-flex items-center gap-1 mt-4 text-sm text-secondary-500 hover:text-secondary-400 transition-colors"
                >
                  Scopri l'area
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </article>
            )
          })}
        </div>
      </div>
      <WaveBottom />
    </section>
  )
}
