'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  Search,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  Download,
} from 'lucide-react'
import { API_URL } from '@/config/api'

// ---- Types ----

interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  intent: string | null
  recommended_use_cases: string[] | null
  created_at: string
}

interface SolutionPlan {
  title: string
  problem: string | { statement: string; painPoints?: string[] }
  workflow: string[] | { overview: string; steps?: { useCaseId: string; title: string; description: string }[] }
  useCases: { id: string; name?: string; customDescription?: string }[]
}

interface ChatSession {
  id: string
  session_id: string
  ip_address: string
  user_agent: string
  os: string
  browser: string
  country: string | null
  city: string | null
  started_at: string
  last_active_at: string
  message_count: number
  intents: string[]
  recommended_use_cases: string[]
  solution_plan: SolutionPlan | null
}

interface ChatSessionDetail extends ChatSession {
  messages: ChatMessage[]
}

interface ListResponse {
  items: ChatSession[]
  total: number
  skip: number
  limit: number
}

interface Stats {
  total_sessions: number
  total_messages: number
  sessions_by_day: { date: string; count: number }[]
  top_intents: { intent: string; count: number }[]
  top_use_cases: { use_case: string; count: number }[]
  top_countries: { country: string; count: number }[]
}

const PAGE_SIZE = 20
const DAYS_OPTIONS = [
  { label: 'Tutti', value: '' },
  { label: '7 giorni', value: '7' },
  { label: '30 giorni', value: '30' },
  { label: '90 giorni', value: '90' },
]

// ---- Component ----

export function ChatLogPanel({ authHeader }: { authHeader: string }) {
  const [data, setData] = useState<ListResponse | null>(null)
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [days, setDays] = useState('')
  const [page, setPage] = useState(0)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [expandedDetail, setExpandedDetail] = useState<ChatSessionDetail | null>(null)
  const [loadingDetail, setLoadingDetail] = useState(false)

  // --- Fetch sessions ---
  const fetchSessions = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const params = new URLSearchParams({
        skip: String(page * PAGE_SIZE),
        limit: String(PAGE_SIZE),
      })
      if (search.trim()) params.set('search', search.trim())
      if (days) params.set('days', days)

      const res = await fetch(`${API_URL}/api/chat-log/admin?${params}`, {
        headers: { Authorization: authHeader },
      })
      if (!res.ok) throw new Error('Errore nel caricamento')
      const json: ListResponse = await res.json()
      setData(json)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Errore')
    } finally {
      setLoading(false)
    }
  }, [page, search, days, authHeader])

  // --- Fetch stats ---
  const fetchStats = useCallback(async () => {
    try {
      const params = new URLSearchParams()
      if (days) params.set('days', days)
      const res = await fetch(
        `${API_URL}/api/chat-log/admin/stats${params.toString() ? '?' + params : ''}`,
        { headers: { Authorization: authHeader } }
      )
      if (res.ok) {
        setStats(await res.json())
      }
    } catch {
      // stats are optional, don't block UI
    }
  }, [days, authHeader])

  useEffect(() => {
    fetchSessions()
    fetchStats()
  }, [fetchSessions, fetchStats])

  // --- Expand row ---
  const toggleExpand = async (id: string) => {
    if (expandedId === id) {
      setExpandedId(null)
      setExpandedDetail(null)
      return
    }
    setExpandedId(id)
    setExpandedDetail(null)
    setLoadingDetail(true)
    try {
      const res = await fetch(`${API_URL}/api/chat-log/admin/${id}`, {
        headers: { Authorization: authHeader },
      })
      if (res.ok) {
        setExpandedDetail(await res.json())
      }
    } catch {
      // silent
    } finally {
      setLoadingDetail(false)
    }
  }

  // --- Search submit ---
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setPage(0)
    fetchSessions()
  }

  // --- JSON export (full conversations) ---
  const [exporting, setExporting] = useState(false)
  const handleExport = async () => {
    setExporting(true)
    try {
      const params = new URLSearchParams()
      if (days) params.set('days', days)
      const res = await fetch(
        `${API_URL}/api/chat-log/admin/export${params.toString() ? '?' + params : ''}`,
        { headers: { Authorization: authHeader } }
      )
      if (!res.ok) throw new Error('Errore export')
      const sessions = await res.json()
      const jsonStr = JSON.stringify(sessions, null, 2)
      const blob = new Blob([jsonStr], { type: 'application/json;charset=utf-8;' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `chat-log-${new Date().toISOString().slice(0, 10)}.json`
      a.click()
      URL.revokeObjectURL(url)
    } catch {
      // silent
    } finally {
      setExporting(false)
    }
  }

  const totalPages = data ? Math.ceil(data.total / PAGE_SIZE) : 0

  return (
    <>
      {/* Stats cards */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <StatCard label="Sessioni" value={stats.total_sessions} />
          <StatCard label="Messaggi" value={stats.total_messages} />
          <StatCard
            label="Top Intent"
            value={stats.top_intents[0]?.intent || '—'}
            sub={stats.top_intents[0] ? `${stats.top_intents[0].count}x` : undefined}
          />
          <StatCard
            label="Top Paese"
            value={stats.top_countries[0]?.country || '—'}
            sub={
              stats.top_countries[0] && stats.total_sessions
                ? `${Math.round((stats.top_countries[0].count / stats.total_sessions) * 100)}%`
                : undefined
            }
          />
        </div>
      )}

      {/* Header with export */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Chat Log</h2>
        <button
          onClick={handleExport}
          disabled={!data?.items.length || exporting}
          className="flex items-center gap-2 text-sm text-white/60 hover:text-white border border-white/20 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors disabled:opacity-30"
        >
          {exporting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
          {exporting ? 'Esportazione...' : 'Esporta JSON'}
        </button>
      </div>

      {/* Search + filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <form onSubmit={handleSearch} className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cerca nel contenuto messaggi..."
            className="w-full pl-10 pr-20 py-2.5 rounded-lg border border-white/20 bg-white/5 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-sm bg-primary-500 text-white px-3 py-1 rounded hover:bg-primary-600 transition-colors"
          >
            Cerca
          </button>
        </form>
        <select
          value={days}
          onChange={(e) => {
            setDays(e.target.value)
            setPage(0)
          }}
          className="px-4 py-2.5 rounded-lg border border-white/20 bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          {DAYS_OPTIONS.map((o) => (
            <option key={o.value} value={o.value} className="bg-gray-900">
              {o.label}
            </option>
          ))}
        </select>
      </div>

      {/* Error / Loading */}
      {error && (
        <div className="bg-red-500/20 border border-red-400/30 rounded-lg p-4 mb-6 flex items-center gap-3">
          <p className="text-red-300">{error}</p>
          <button onClick={fetchSessions} className="text-red-200 underline text-sm">
            Riprova
          </button>
        </div>
      )}

      {loading && (
        <div className="flex items-center gap-2 text-white/50 mb-6">
          <RefreshCw className="w-4 h-4 animate-spin" />
          Caricamento...
        </div>
      )}

      {/* Table */}
      {data && !loading && (
        <>
          <div className="overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-white/5 text-white/60 text-left">
                  <th className="px-4 py-3 font-medium w-8"></th>
                  <th className="px-4 py-3 font-medium">Data</th>
                  <th className="px-4 py-3 font-medium text-center">Msg</th>
                  <th className="px-4 py-3 font-medium">IP</th>
                  <th className="px-4 py-3 font-medium">OS / Browser</th>
                  <th className="px-4 py-3 font-medium">Luogo</th>
                  <th className="px-4 py-3 font-medium">Intent</th>
                  <th className="px-4 py-3 font-medium">Use Cases</th>
                </tr>
              </thead>
              <tbody>
                {data.items.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-4 py-8 text-center text-white/40">
                      Nessuna sessione trovata
                    </td>
                  </tr>
                )}
                {data.items.map((s) => (
                  <TableRow
                    key={s.id}
                    session={s}
                    isExpanded={expandedId === s.id}
                    onToggle={() => toggleExpand(s.id)}
                    detail={expandedId === s.id ? expandedDetail : null}
                    loadingDetail={expandedId === s.id && loadingDetail}
                  />
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6">
              <p className="text-sm text-white/40">
                Pagina {page + 1} di {totalPages}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(0, p - 1))}
                  disabled={page === 0}
                  className="flex items-center gap-1 text-sm border border-white/20 px-3 py-1.5 rounded-lg hover:bg-white/5 disabled:opacity-30 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Prec
                </button>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                  disabled={page >= totalPages - 1}
                  className="flex items-center gap-1 text-sm border border-white/20 px-3 py-1.5 rounded-lg hover:bg-white/5 disabled:opacity-30 transition-colors"
                >
                  Succ
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </>
  )
}

// ---- Sub-components ----

function StatCard({
  label,
  value,
  sub,
}: {
  label: string
  value: string | number
  sub?: string
}) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
      <p className="text-xs text-white/50 mb-1">{label}</p>
      <p className="text-xl font-bold truncate">{value}</p>
      {sub && <p className="text-xs text-primary-400 mt-1">{sub}</p>}
    </div>
  )
}

function TableRow({
  session: s,
  isExpanded,
  onToggle,
  detail,
  loadingDetail,
}: {
  session: ChatSession
  isExpanded: boolean
  onToggle: () => void
  detail: ChatSessionDetail | null
  loadingDetail: boolean
}) {
  return (
    <>
      <tr
        onClick={onToggle}
        className="border-t border-white/5 hover:bg-white/5 cursor-pointer transition-colors"
      >
        <td className="px-4 py-3 text-white/40">
          {isExpanded ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </td>
        <td className="px-4 py-3 text-white/50 whitespace-nowrap">
          {new Date(s.started_at).toLocaleDateString('it-IT', {
            day: '2-digit',
            month: '2-digit',
          })}
          <br />
          <span className="text-xs text-white/30">
            {new Date(s.started_at).toLocaleTimeString('it-IT', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
        </td>
        <td className="px-4 py-3 text-center">
          <span className="inline-flex items-center gap-1 text-white/70">
            <MessageSquare className="w-3.5 h-3.5" />
            {s.message_count}
          </span>
          {s.solution_plan && (
            <span className="block mt-1 text-[10px] bg-green-500/20 text-green-300 px-1.5 py-0.5 rounded">
              Pagina generata
            </span>
          )}
        </td>
        <td className="px-4 py-3 text-white/50 font-mono text-xs">{s.ip_address}</td>
        <td className="px-4 py-3 text-white/60 text-xs">
          {s.os}
          <br />
          <span className="text-white/40">{s.browser}</span>
        </td>
        <td className="px-4 py-3 text-white/60">
          {s.city && s.country
            ? `${s.city}, ${s.country}`
            : s.country || '—'}
        </td>
        <td className="px-4 py-3">
          <div className="flex flex-wrap gap-1">
            {s.intents.map((intent, i) => (
              <span
                key={i}
                className="inline-block bg-secondary-500/20 text-secondary-300 text-xs px-2 py-0.5 rounded"
              >
                {intent}
              </span>
            ))}
          </div>
        </td>
        <td className="px-4 py-3">
          <div className="flex flex-wrap gap-1">
            {s.recommended_use_cases.slice(0, 3).map((uc, i) => (
              <span
                key={i}
                className="inline-block bg-primary-500/20 text-primary-300 text-xs px-2 py-0.5 rounded"
              >
                {uc}
              </span>
            ))}
            {s.recommended_use_cases.length > 3 && (
              <span className="text-xs text-white/40">
                +{s.recommended_use_cases.length - 3}
              </span>
            )}
          </div>
        </td>
      </tr>

      {/* Expanded conversation */}
      {isExpanded && (
        <tr>
          <td colSpan={8} className="px-0 py-0">
            <div className="bg-white/[0.02] border-t border-white/5 px-6 py-4">
              {loadingDetail && (
                <div className="flex items-center gap-2 text-white/40 py-4">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Caricamento conversazione...
                </div>
              )}
              {detail && (
                <>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {detail.messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.role === 'user' ? 'justify-start' : 'justify-end'}`}
                      >
                        <div
                          className={`max-w-[75%] rounded-lg px-4 py-2.5 text-sm ${
                            msg.role === 'user'
                              ? 'bg-secondary-500/15 border border-secondary-500/20'
                              : 'bg-white/5 border border-white/10'
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <span
                              className={`text-xs font-semibold ${
                                msg.role === 'user' ? 'text-secondary-400' : 'text-white/50'
                              }`}
                            >
                              {msg.role === 'user' ? 'Utente' : 'Assistente'}
                            </span>
                            <span className="text-xs text-white/30">
                              {new Date(msg.created_at).toLocaleTimeString('it-IT', {
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </span>
                          </div>
                          <p className="text-white/80 whitespace-pre-wrap break-words">
                            {msg.content}
                          </p>
                          {msg.intent && (
                            <span className="inline-block mt-1.5 bg-secondary-500/20 text-secondary-300 text-xs px-2 py-0.5 rounded">
                              intent: {msg.intent}
                            </span>
                          )}
                          {msg.recommended_use_cases && msg.recommended_use_cases.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-1.5">
                              {msg.recommended_use_cases.map((uc, i) => (
                                <span
                                  key={i}
                                  className="inline-block bg-primary-500/20 text-primary-300 text-xs px-2 py-0.5 rounded"
                                >
                                  {uc}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  {detail.solution_plan && (
                    <div className="mt-4 rounded-lg border border-green-500/20 bg-green-500/5 p-4">
                      <p className="text-xs font-semibold text-green-400 mb-2">Pagina Esplora generata</p>
                      <p className="text-sm font-medium text-white/90 mb-1">{detail.solution_plan.title}</p>
                      <p className="text-xs text-white/50 mb-2">
                        {typeof detail.solution_plan.problem === 'string'
                          ? detail.solution_plan.problem
                          : detail.solution_plan.problem?.statement}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {detail.solution_plan.useCases.map((uc, i) => (
                          <span
                            key={i}
                            className="inline-block bg-primary-500/20 text-primary-300 text-xs px-2 py-0.5 rounded"
                          >
                            {uc.customDescription || uc.name || uc.id}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </td>
        </tr>
      )}
    </>
  )
}
