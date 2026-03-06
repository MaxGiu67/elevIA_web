import type { Metadata } from 'next'
import { WebPageJsonLd, BreadcrumbJsonLd } from '@/components/JsonLd'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://elevia.nexadata.it'

export const metadata: Metadata = {
  title: { absolute: 'Privacy Policy | elevIA' },
  description: 'Informativa sulla privacy di elevIA. Come trattiamo i tuoi dati personali in conformità al GDPR.',
  robots: { index: false, follow: true },
  alternates: { canonical: '/privacy' },
}

export default function PrivacyPage() {
  return (
    <>
      <WebPageJsonLd
        name="Privacy Policy"
        description="Informativa sulla privacy di elevIA."
        url={`${baseUrl}/privacy`}
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: baseUrl },
          { name: 'Privacy Policy', url: `${baseUrl}/privacy` },
        ]}
      />
      <div className="container-main py-16 max-w-3xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        <p className="text-sm text-gray-500 mb-8">Ultimo aggiornamento: 6 marzo 2026</p>

        <div className="prose prose-gray max-w-none space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Titolare del Trattamento</h2>
            <p className="text-gray-700">
              Il titolare del trattamento dei dati personali è Nexa Data, con sede in Italia.
              Per qualsiasi richiesta relativa alla privacy, è possibile contattarci all&apos;indirizzo{' '}
              <a href="mailto:elevia@nexadata.it" className="text-secondary-500 hover:underline">
                elevia@nexadata.it
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Dati Raccolti</h2>
            <p className="text-gray-700">
              Raccogliamo i seguenti dati attraverso il nostro sito web:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-1 mt-2">
              <li>Dati forniti volontariamente tramite il modulo di contatto (nome, email, azienda, ruolo)</li>
              <li>Dati di navigazione raccolti automaticamente (indirizzo IP, browser, pagine visitate)</li>
              <li>Messaggi inviati tramite la chat AI integrata</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Finalità del Trattamento</h2>
            <p className="text-gray-700">
              I dati personali sono trattati per le seguenti finalità:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-1 mt-2">
              <li>Rispondere alle richieste di informazioni e assessment</li>
              <li>Fornire il servizio di chat AI</li>
              <li>Migliorare l&apos;esperienza di navigazione del sito</li>
              <li>Adempiere ad obblighi di legge</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Base Giuridica</h2>
            <p className="text-gray-700">
              Il trattamento dei dati si basa sul consenso dell&apos;interessato (Art. 6, par. 1, lett. a GDPR)
              e sul legittimo interesse del titolare (Art. 6, par. 1, lett. f GDPR).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Diritti dell&apos;Interessato</h2>
            <p className="text-gray-700">
              In conformità al GDPR, l&apos;interessato ha diritto di:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-1 mt-2">
              <li>Accedere ai propri dati personali</li>
              <li>Richiedere la rettifica o la cancellazione dei dati</li>
              <li>Opporsi al trattamento</li>
              <li>Richiedere la portabilità dei dati</li>
              <li>Revocare il consenso in qualsiasi momento</li>
            </ul>
            <p className="text-gray-700 mt-2">
              Per esercitare questi diritti, contattare{' '}
              <a href="mailto:elevia@nexadata.it" className="text-secondary-500 hover:underline">
                elevia@nexadata.it
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Conservazione dei Dati</h2>
            <p className="text-gray-700">
              I dati personali sono conservati per il tempo strettamente necessario al raggiungimento delle
              finalità per cui sono stati raccolti, e comunque non oltre quanto previsto dalla normativa vigente.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Cookie</h2>
            <p className="text-gray-700">
              Questo sito utilizza esclusivamente cookie tecnici necessari al funzionamento del servizio.
              Non vengono utilizzati cookie di profilazione o di terze parti per finalità di marketing.
            </p>
          </section>
        </div>
      </div>
    </>
  )
}
