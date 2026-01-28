/**
 * Esplora Page — Server component wrapper.
 * FR30: Il Visitatore può esplorare una pagina personalizzata con gli use case raccomandati
 *
 * Reads `?uc=chatbot-faq,classificazione-ticket` from query params
 * and delegates rendering to the client-side EsploraContent component
 * which decides between personalized (solution plan) and generic (cards) views.
 */

import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { EsploraContent } from '@/features/esplora/components/EsploraContent'

export const metadata: Metadata = {
  title: 'Le soluzioni UPGRAI per te | UPGRAI',
  description: 'Scopri le soluzioni AI personalizzate per i tuoi problemi aziendali.',
  robots: 'noindex', // personalized page, no SEO
}

export default function EsploraPage({
  searchParams,
}: {
  searchParams: { uc?: string }
}) {
  const ucParam = searchParams.uc

  if (!ucParam) {
    redirect('/')
  }

  const requestedIds = ucParam
    .split(',')
    .map(id => id.trim())
    .filter(Boolean)

  return <EsploraContent requestedIds={requestedIds} />
}
