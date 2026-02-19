'use client'

/**
 * ProblemInfographic — Shows a stat + AI-generated infographic
 * about the user's problem. Renders between Hero and ProblemBlock
 * in PersonalizedEsplora. Self-hides when data is null.
 */

import { useInfographicStore } from '../stores/infographicStore'

export function ProblemInfographic() {
  const data = useInfographicStore((s) => s.data)

  if (!data || (!data.stat && !data.imageUrl)) return null

  return (
    <section className="bg-gray-50 rounded-2xl p-6 md:p-10">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">
        La sfida: {data.problemSummary}
      </h3>

      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Statistic card */}
        {data.stat && (
          <div className="flex-1 min-w-0">
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <p className="text-gray-700 leading-relaxed mb-4">
                {data.stat.text}
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>Fonte:</span>
                {data.stat.url ? (
                  <a
                    href={data.stat.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-secondary-500 hover:text-secondary-700 underline underline-offset-2 truncate"
                  >
                    {data.stat.source}
                  </a>
                ) : (
                  <span className="truncate">{data.stat.source}</span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* AI-generated infographic */}
        {data.imageUrl && (
          <div className={`${data.stat ? 'flex-1' : 'w-full'} min-w-0`}>
            <img
              src={data.imageUrl}
              alt={`Infografica: ${data.problemSummary}`}
              className="w-full rounded-xl shadow-sm border border-gray-200"
            />
          </div>
        )}
      </div>
    </section>
  )
}
