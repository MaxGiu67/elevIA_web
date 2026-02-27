'use client'

import Link from 'next/link'
import { ProjectModel } from './ProjectModel'
import { ProjectPhases } from './ProjectPhases'
import { Configurations } from './Configurations'
import { Testimonials } from './Testimonials'
import { UseCases } from '@/features/landing/components/UseCases'
import { WhyUs } from '@/features/landing/components/WhyUs'
import { FAQ } from '@/features/landing/components/FAQ'
import { Mail, Linkedin } from 'lucide-react'

const progettoFaqItems = [
  {
    question: 'Devo sostituire il mio ERP / CRM / gestionale?',
    answer:
      'No. L\'AI si integra via API ai tuoi sistemi. Non tocchiamo niente di quello che funziona gia\'. Aggiungiamo uno strato intelligente sopra l\'esistente.',
  },
  {
    question: 'L\'assessment e\' davvero gratuito?',
    answer:
      'Si\'. 2 settimane di lavoro nostro: mappa sistemi, analisi AI-readiness, roadmap, preventivo. Il report resta tuo in ogni caso. Nessun impegno.',
  },
  {
    question: 'Quanto costa un progetto AI?',
    answer:
      'Prezzo fisso, definito nell\'assessment. Nessun costo nascosto. Nessuna sorpresa. I dettagli li vediamo insieme dopo l\'assessment perche\' dipendono dalla tua situazione.',
  },
  {
    question: 'E se non funziona?',
    answer:
      'Le soluzioni sono collaudate e i risultati misurabili. Nell\'assessment ti mostriamo i KPI attesi. Dopo 2 mesi le prime soluzioni sono gia\' attive e verificabili.',
  },
  {
    question: 'I miei dati sono al sicuro?',
    answer:
      'Lavoriamo su infrastruttura Microsoft Azure con standard di sicurezza enterprise. I tuoi dati restano nella tua infrastruttura. Compliance GDPR nativa.',
  },
  {
    question: 'Il mio team deve studiare?',
    answer:
      'La formazione e\' inclusa e graduale. L\'AI automatizza le attivita\' ripetitive — il tuo team si concentra su quelle a valore. Non servono competenze tecniche.',
  },
  {
    question: 'Dopo i 6 mesi cosa succede?',
    answer:
      'Sei autonomo. Il tuo team sa usare le soluzioni, ha la documentazione, puo\' operare in autonomia. Se vuoi espandere con nuovi Use Case, possiamo farlo.',
  },
]

const progettoWhyUsRows = [
  {
    generic: 'Scope aperto, costi che lievitano',
    ours: 'Scope definito, prezzo fisso',
  },
  {
    generic: 'Sviluppo da zero, tempi incerti',
    ours: 'Soluzioni pronte e collaudate',
  },
  {
    generic: 'Timeline che slitta',
    ours: '6 mesi certi con milestone',
  },
  {
    generic: 'Rischio alto per te',
    ours: 'Assessment gratuito — decidi dopo aver visto i dati',
  },
  {
    generic: 'Ti consegnano e spariscono',
    ours: 'Formazione team e handover inclusi',
  },
  {
    generic: 'Nessuna garanzia sui risultati',
    ours: 'KPI misurabili da subito',
  },
]

export function ProgettoPage() {
  return (
    <div>
      {/* Sez.1 — Hero */}
      <section className="py-20 lg:py-32 bg-secondary-500 text-white">
        <div className="container-main">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-white/80 uppercase tracking-wider text-sm font-medium mb-4">
              Progetto AI Nexa Data
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              I tuoi sistemi, piu' intelligenti. In 6 mesi.
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-10 max-w-3xl mx-auto">
              Non sostituiamo niente. Prendiamo i tuoi ERP, CRM, gestionali e aggiungiamo uno
              strato AI che li fa rendere di piu'. Assessment gratuito, scope definito, prezzo
              fisso.
            </p>
            <Link
              href="#progetto-contact"
              className="inline-block bg-white text-secondary-600 font-bold py-4 px-8 rounded-lg text-lg hover:bg-gray-100 transition-colors"
            >
              Prenota l'assessment gratuito
            </Link>
          </div>
        </div>
      </section>

      {/* Sez.2 — Il modello */}
      <ProjectModel />

      {/* Sez.3 — Come funziona il progetto */}
      <ProjectPhases />

      {/* Sez.4 — Soluzioni AI disponibili */}
      <UseCases />

      {/* Sez.5 — 2 configurazioni */}
      <Configurations />

      {/* Sez.6 — Perche' noi e non custom */}
      <WhyUs rows={progettoWhyUsRows} />

      {/* Sez.7 — FAQ progetto */}
      <FAQ items={progettoFaqItems} />

      {/* Sez.8 — Testimonianze */}
      <Testimonials />

      {/* Sez.9 — CTA finale */}
      <section id="progetto-contact" className="py-20 lg:py-28 bg-primary-500 text-white">
        <div className="container-main">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Scopri cosa puo' fare l'AI per la tua azienda. Gratis.
            </h2>
            <p className="text-white/90 mb-8 text-lg">
              Assessment gratuito di 2 settimane: mappiamo i tuoi sistemi, identifichiamo le
              soluzioni, ti presentiamo un piano concreto. Nessun impegno.
            </p>

            <Link
              href="mailto:elevia@nexadata.it?subject=Assessment%20AI%20Gratuito"
              className="inline-block bg-white text-primary-600 font-bold py-4 px-8 rounded-lg text-lg hover:bg-gray-100 transition-colors mb-4"
            >
              PRENOTA L'ASSESSMENT GRATUITO
            </Link>

            <p className="text-white/70 text-sm mb-10">
              Scrivici per prenotare.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8 border-t border-white/20">
              <Link
                href="mailto:elevia@nexadata.it"
                className="flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm"
              >
                <Mail className="w-4 h-4" />
                elevia@nexadata.it
              </Link>
              <Link
                href="https://linkedin.com/company/nexadata"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
