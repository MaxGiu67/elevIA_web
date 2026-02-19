'use client'

/**
 * ProblemInfographic — Shows a stat + AI-generated infographic
 * about the user's problem. Renders between Hero and ProblemBlock
 * in PersonalizedEsplora. Self-hides when data is null.
 *
 * Supports async loading: shows skeleton while imageUrl is null,
 * then fades in the image when it arrives via polling.
 */

import { useEffect, useRef, useState } from 'react'
import { Loader2 } from 'lucide-react'
import { useInfographicStore } from '../stores/infographicStore'
import { API_URL } from '@/config/api'

const POLL_INTERVAL_MS = 3000
const POLL_TIMEOUT_MS = 90000

export function ProblemInfographic() {
  const data = useInfographicStore((s) => s.data)
  const setImageUrl = useInfographicStore((s) => s.setImageUrl)
  const [imageLoaded, setImageLoaded] = useState(false)
  const pollingRef = useRef(false)

  // Poll for image when sessionId is present but imageUrl is not
  useEffect(() => {
    if (!data?.sessionId || data.imageUrl || pollingRef.current) return

    pollingRef.current = true
    const startTime = Date.now()
    let stopped = false

    const poll = async () => {
      while (!stopped && Date.now() - startTime < POLL_TIMEOUT_MS) {
        try {
          const res = await fetch(
            `${API_URL}/api/infographic-image?session_id=${encodeURIComponent(data.sessionId!)}`,
          )
          if (res.ok) {
            const json = await res.json()
            if (json.status === 'ready' && json.imageUrl) {
              setImageUrl(json.imageUrl)
              break
            }
          }
        } catch {
          // network error — keep polling
        }
        // Wait before next poll
        await new Promise((r) => setTimeout(r, POLL_INTERVAL_MS))
      }
      pollingRef.current = false
    }

    poll()

    return () => {
      stopped = true
      pollingRef.current = false
    }
  }, [data?.sessionId, data?.imageUrl, setImageUrl])

  if (!data || (!data.stat && !data.imageUrl && !data.sessionId)) return null

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
              <p className="text-gray-700 leading-relaxed mb-4 line-clamp-4">
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

        {/* AI-generated infographic or skeleton placeholder */}
        <div className={`${data.stat ? 'flex-1' : 'w-full'} min-w-0`}>
          {data.imageUrl ? (
            <img
              src={data.imageUrl}
              alt={`Infografica: ${data.problemSummary}`}
              className={`w-full rounded-xl shadow-sm border border-gray-200 transition-opacity duration-500 ${
                imageLoaded ? 'opacity-100 animate-fade-in' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
            />
          ) : data.sessionId ? (
            <div className="w-full aspect-[16/10] rounded-xl border border-gray-200 bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 flex flex-col items-center justify-center gap-3 animate-pulse">
              <Loader2 className="h-8 w-8 text-primary-500/60 animate-spin" />
              <p className="text-sm text-gray-400 font-medium">
                Generazione infografica AI in corso...
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
