'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { problemList } from '@/content/problems'
import { useCases, type UseCaseId } from '@/content/use-cases'

/**
 * Problems section showing business challenges UPGRAI solves.
 * Reads from JSON content files and links to relevant solutions.
 */

export function Problems() {
  return (
    <section
      id="problems"
      className="pt-20 pb-28 bg-gray-50"
      aria-labelledby="problems-title"
    >
      <div className="container-main">
        <div className="text-center mb-12">
          <p className="text-primary-500 uppercase tracking-wider text-sm font-medium mb-2">
            I PROBLEMI CHE RISOLVIAMO
          </p>
          <h2 id="problems-title" className="text-3xl md:text-4xl font-bold text-dark-900">
            La tua azienda ha questi problemi?
          </h2>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          role="list"
          aria-label="Problemi aziendali risolti da UPGRAI"
        >
          {problemList.map((problem) => {
            // Get solution use cases
            const solutions = (problem.solvedBy || []).map((ucId: string) => {
              const uc = useCases[ucId as UseCaseId]
              return uc ? { id: uc.id, name: uc.name } : null
            }).filter(Boolean) as Array<{ id: string; name: string }>

            return (
              <article
                key={problem.id}
                className="card hover:shadow-lg transition-shadow duration-300 group"
                role="listitem"
              >
                <h3 className="text-xl font-semibold text-dark-900 mb-3">
                  {problem.title}
                </h3>
                <p className="text-gray-600 mb-4">{problem.description}</p>

                {solutions.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2 text-sm">
                    <span className="text-gray-500">Soluzioni:</span>
                    {solutions.map((sol, idx) => (
                      <span key={sol.id}>
                        <Link
                          href={`/use-case/${sol.id}`}
                          className="text-secondary-500 font-medium hover:text-secondary-600 transition-colors"
                        >
                          {sol.name}
                        </Link>
                        {idx < solutions.length - 1 && <span className="text-gray-400">, </span>}
                      </span>
                    ))}
                  </div>
                )}
              </article>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <Link
            href="#contact"
            className="btn-primary inline-flex items-center gap-2"
            aria-label="Contattaci per parlare del tuo progetto"
          >
            Parliamo del tuo progetto
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
