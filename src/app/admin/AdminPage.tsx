'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Lock,
  LogOut,
  Users,
  Download,
  RefreshCw,
  MessageSquare,
} from 'lucide-react'
import { API_URL } from '@/config/api'
import { ChatLogPanel } from './ChatLogPanel'

// ---- Types ----

interface Assessment {
  id: string
  name: string
  email: string
  company: string
  role: string
  company_size: string
  interests: string[]
  systems: string | null
  source_page: string
  created_at: string
}

interface ListResponse {
  items: Assessment[]
  total: number
  skip: number
  limit: number
}

const PAGE_SIZE = 20

type AdminTab = 'assessments' | 'chatlog'

// ---- Component ----

export function AdminPage() {
  const [password, setPassword] = useState('')
  const [authed, setAuthed] = useState(false)
  const [authError, setAuthError] = useState('')
  const [activeTab, setActiveTab] = useState<AdminTab>('assessments')

  const [data, setData] = useState<ListResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(0)
  const [expanded, setExpanded] = useState<string | null>(null)

  const authHeader = useCallback(
    () => 'Basic ' + btoa('admin:' + password),
    [password]
  )

  // --- Login ---
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setAuthError('')
    try {
      const res = await fetch(
        `${API_URL}/api/lead/admin/count`,
        { headers: { Authorization: 'Basic ' + btoa('admin:' + password) } }
      )
      if (res.status === 401) {
        setAuthError('Password errata')
        return
      }
      if (!res.ok) throw new Error('Errore server')
      setAuthed(true)
    } catch {
      setAuthError('Errore di connessione')
    }
  }

  // --- Fetch leads ---
  const fetchLeads = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const params = new URLSearchParams({
        skip: String(page * PAGE_SIZE),
        limit: String(PAGE_SIZE),
      })
      if (search.trim()) params.set('search', search.trim())

      const res = await fetch(`${API_URL}/api/lead/admin?${params}`, {
        headers: { Authorization: authHeader() },
      })
      if (!res.ok) throw new Error('Errore nel caricamento')
      const json: ListResponse = await res.json()
      setData(json)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Errore')
    } finally {
      setLoading(false)
    }
  }, [page, search, authHeader])

  useEffect(() => {
    if (authed && activeTab === 'assessments') fetchLeads()
  }, [authed, page, fetchLeads, activeTab])

  // --- Search submit ---
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setPage(0)
    fetchLeads()
  }

  // --- JSON export (all records) ---
  const [exporting, setExporting] = useState(false)
  const handleExport = async () => {
    setExporting(true)
    try {
      const res = await fetch(`${API_URL}/api/lead/admin/export`, {
        headers: { Authorization: authHeader() },
      })
      if (!res.ok) throw new Error('Errore export')
      const items = await res.json()
      const jsonStr = JSON.stringify(items, null, 2)
      const blob = new Blob([jsonStr], { type: 'application/json;charset=utf-8;' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `assessment-leads-${new Date().toISOString().slice(0, 10)}.json`
      a.click()
      URL.revokeObjectURL(url)
    } catch {
      // silent
    } finally {
      setExporting(false)
    }
  }

  const totalPages = data ? Math.ceil(data.total / PAGE_SIZE) : 0

  // --- Login screen ---
  if (!authed) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-dark-900">
        <form
          onSubmit={handleLogin}
          className="bg-white/5 border border-white/10 rounded-xl p-8 w-full max-w-sm"
        >
          <div className="flex items-center gap-3 mb-6">
            <Lock className="w-6 h-6 text-primary-500" />
            <h1 className="text-xl font-bold text-white">Admin — elevIA</h1>
          </div>
          <label className="block text-sm text-white/70 mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-white/20 bg-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary-500 mb-4"
            placeholder="Inserisci password"
            autoFocus
          />
          {authError && (
            <p className="text-red-400 text-sm mb-4">{authError}</p>
          )}
          <button
            type="submit"
            className="w-full bg-primary-500 text-white font-semibold py-2.5 rounded-lg hover:bg-primary-600 transition-colors"
          >
            Accedi
          </button>
        </form>
      </div>
    )
  }

  // --- Dashboard ---
  return (
    <div className="min-h-screen bg-dark-900 text-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header with tab switcher */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            {/* Tab switcher */}
            <div className="flex bg-white/5 border border-white/10 rounded-lg p-1">
              <button
                onClick={() => setActiveTab('assessments')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'assessments'
                    ? 'bg-primary-500 text-white'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <Users className="w-4 h-4" />
                Assessment Lead
              </button>
              <button
                onClick={() => setActiveTab('chatlog')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'chatlog'
                    ? 'bg-primary-500 text-white'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                Chat Log
              </button>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {activeTab === 'assessments' && (
              <button
                onClick={handleExport}
                disabled={!data?.items.length || exporting}
                className="flex items-center gap-2 text-sm text-white/60 hover:text-white border border-white/20 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors disabled:opacity-30"
              >
                {exporting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                {exporting ? 'Esportazione...' : 'Esporta JSON'}
              </button>
            )}
            <button
              onClick={() => { setAuthed(false); setPassword(''); setData(null) }}
              className="flex items-center gap-2 text-sm text-white/60 hover:text-white border border-white/20 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Esci
            </button>
          </div>
        </div>

        {/* Tab content */}
        {activeTab === 'chatlog' ? (
          <ChatLogPanel authHeader={authHeader()} />
        ) : (
          <>
            {/* Assessment Lead header */}
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-xl font-bold">Assessment Lead</h2>
              {data && (
                <span className="bg-primary-500/20 text-primary-400 text-sm font-medium px-3 py-1 rounded-full">
                  {data.total} totali
                </span>
              )}
            </div>

            {/* Search bar */}
            <form onSubmit={handleSearch} className="mb-6">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Cerca per nome, email o azienda..."
                  className="w-full pl-10 pr-20 py-2.5 rounded-lg border border-white/20 bg-white/5 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-sm bg-primary-500 text-white px-3 py-1 rounded hover:bg-primary-600 transition-colors"
                >
                  Cerca
                </button>
              </div>
            </form>

            {/* Error / Loading */}
            {error && (
              <div className="bg-red-500/20 border border-red-400/30 rounded-lg p-4 mb-6 flex items-center gap-3">
                <p className="text-red-300">{error}</p>
                <button onClick={fetchLeads} className="text-red-200 underline text-sm">Riprova</button>
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
                        <th className="px-4 py-3 font-medium">Data</th>
                        <th className="px-4 py-3 font-medium">Nome</th>
                        <th className="px-4 py-3 font-medium">Email</th>
                        <th className="px-4 py-3 font-medium">Azienda</th>
                        <th className="px-4 py-3 font-medium">Ruolo</th>
                        <th className="px-4 py-3 font-medium">Dim.</th>
                        <th className="px-4 py-3 font-medium">Interessi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.items.length === 0 && (
                        <tr>
                          <td colSpan={7} className="px-4 py-8 text-center text-white/40">
                            Nessun lead trovato
                          </td>
                        </tr>
                      )}
                      {data.items.map((a) => (
                        <tr
                          key={a.id}
                          onClick={() => setExpanded(expanded === a.id ? null : a.id)}
                          className="border-t border-white/5 hover:bg-white/5 cursor-pointer transition-colors"
                        >
                          <td className="px-4 py-3 text-white/50 whitespace-nowrap">
                            {new Date(a.created_at).toLocaleDateString('it-IT', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric',
                            })}
                            <br />
                            <span className="text-xs text-white/30">
                              {new Date(a.created_at).toLocaleTimeString('it-IT', {
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </span>
                          </td>
                          <td className="px-4 py-3 font-medium">{a.name}</td>
                          <td className="px-4 py-3">
                            <a
                              href={`mailto:${a.email}`}
                              onClick={(e) => e.stopPropagation()}
                              className="text-secondary-400 hover:underline"
                            >
                              {a.email}
                            </a>
                          </td>
                          <td className="px-4 py-3">{a.company}</td>
                          <td className="px-4 py-3 text-white/60">{a.role}</td>
                          <td className="px-4 py-3 text-white/60">{a.company_size}</td>
                          <td className="px-4 py-3">
                            <div className="flex flex-wrap gap-1">
                              {a.interests.map((int, i) => (
                                <span
                                  key={i}
                                  className="inline-block bg-primary-500/20 text-primary-300 text-xs px-2 py-0.5 rounded"
                                >
                                  {int}
                                </span>
                              ))}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Expanded detail */}
                {expanded && (() => {
                  const a = data.items.find((i) => i.id === expanded)
                  if (!a) return null
                  return (
                    <div className="mt-4 bg-white/5 border border-white/10 rounded-xl p-6">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-white/40 block mb-1">Sistemi</span>
                          <span>{a.systems || '—'}</span>
                        </div>
                        <div>
                          <span className="text-white/40 block mb-1">Pagina</span>
                          <span className="text-white/60">{a.source_page}</span>
                        </div>
                        <div>
                          <span className="text-white/40 block mb-1">ID</span>
                          <span className="text-white/40 text-xs font-mono">{a.id}</span>
                        </div>
                      </div>
                    </div>
                  )
                })()}

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
        )}
      </div>
    </div>
  )
}
