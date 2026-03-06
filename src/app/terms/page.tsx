import type { Metadata } from 'next'
import { WebPageJsonLd, BreadcrumbJsonLd } from '@/components/JsonLd'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://elevia.nexadata.it'

export const metadata: Metadata = {
  title: { absolute: 'Termini di Servizio | elevIA' },
  description: 'Termini e condizioni di utilizzo del sito web e dei servizi elevIA.',
  robots: { index: false, follow: true },
  alternates: { canonical: '/terms' },
}

export default function TermsPage() {
  return (
    <>
      <WebPageJsonLd
        name="Termini di Servizio"
        description="Termini e condizioni di utilizzo dei servizi elevIA."
        url={`${baseUrl}/terms`}
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: baseUrl },
          { name: 'Termini di Servizio', url: `${baseUrl}/terms` },
        ]}
      />
      <div className="container-main py-16 max-w-3xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Termini di Servizio</h1>
        <p className="text-sm text-gray-500 mb-8">Ultimo aggiornamento: 6 marzo 2026</p>

        <div className="prose prose-gray max-w-none space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Definizioni</h2>
            <p className="text-gray-700">
              &quot;elevIA&quot; si riferisce alla piattaforma AI e al sito web gestiti da Nexa Data.
              &quot;Utente&quot; indica qualsiasi persona che accede al sito web o utilizza i servizi di elevIA.
              &quot;Servizi&quot; indica le soluzioni AI, la chat integrata e ogni altro servizio offerto tramite il sito.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Accettazione dei Termini</h2>
            <p className="text-gray-700">
              L&apos;utilizzo del sito web e dei servizi di elevIA implica l&apos;accettazione integrale
              dei presenti termini di servizio. Se non si accettano questi termini, si prega di non
              utilizzare il sito o i servizi.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Descrizione del Servizio</h2>
            <p className="text-gray-700">
              elevIA offre un framework di intelligenza artificiale con 20 soluzioni standardizzate
              per PMI e enterprise italiane, organizzate in 5 aree: Knowledge, Customer Experience,
              Operations, Workflow e HR. Il sito include una chat AI per l&apos;esplorazione delle soluzioni
              e un modulo di contatto per richiedere assessment gratuiti.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Utilizzo della Chat AI</h2>
            <p className="text-gray-700">
              La chat AI integrata nel sito fornisce informazioni generali sulle soluzioni elevIA.
              Le risposte generate dall&apos;AI hanno scopo informativo e non costituiscono consulenza
              professionale. elevIA non garantisce l&apos;accuratezza completa delle risposte generate
              automaticamente.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Proprietà Intellettuale</h2>
            <p className="text-gray-700">
              Tutti i contenuti del sito web (testi, grafica, loghi, software) sono di proprietà di
              Nexa Data o dei rispettivi titolari e sono protetti dalle leggi sulla proprietà intellettuale.
              È vietata la riproduzione non autorizzata.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Limitazione di Responsabilità</h2>
            <p className="text-gray-700">
              elevIA si impegna a fornire un servizio affidabile ma non garantisce la disponibilità
              ininterrotta del sito o dei servizi. In nessun caso elevIA o Nexa Data saranno responsabili
              per danni indiretti derivanti dall&apos;utilizzo del sito.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Legge Applicabile</h2>
            <p className="text-gray-700">
              I presenti termini sono regolati dalla legge italiana. Per qualsiasi controversia sarà
              competente il Foro del luogo di sede legale di Nexa Data.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Contatti</h2>
            <p className="text-gray-700">
              Per qualsiasi domanda relativa ai presenti termini, contattare{' '}
              <a href="mailto:elevia@nexadata.it" className="text-secondary-500 hover:underline">
                elevia@nexadata.it
              </a>.
            </p>
          </section>
        </div>
      </div>
    </>
  )
}
