'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface FAQProps {
  isHighlighted?: boolean
  isMinimized?: boolean
  items?: Array<{ question: string; answer: string }>
}

const defaultFaqItems = [
  {
    question: 'Bisogna sostituire i nostri sistemi?',
    answer:
      'No. L\'AI si integra via API ai tuoi sistemi attuali. ERP, CRM, gestionali restano esattamente come sono. L\'AI aggiunge uno strato intelligente sopra l\'esistente.',
  },
  {
    question: 'L\'assessment e\' davvero gratuito?',
    answer:
      'Si\'. Mappiamo i tuoi sistemi, analizziamo dove l\'AI ha impatto, ti presentiamo un piano con soluzioni, tempi e costi. Il report resta tuo anche se decidi di non procedere.',
  },
  {
    question: 'Quanto tempo serve?',
    answer:
      'L\'assessment dura 2 settimane. Il progetto completo 6 mesi. Le prime soluzioni sono attive dopo 2 mesi.',
  },
  {
    question: 'I nostri dati sono al sicuro?',
    answer:
      'Assolutamente. Lavoriamo su infrastruttura Microsoft Azure con standard di sicurezza enterprise. I tuoi dati non escono dalla tua infrastruttura.',
  },
  {
    question: 'Il mio team deve cambiare modo di lavorare?',
    answer:
      'Il cambiamento e\' graduale. Formazione utenti e affiancamento sono inclusi. L\'AI automatizza le attivita\' ripetitive — il tuo team si concentra su quelle a valore.',
  },
]

export function FAQ({ isMinimized, items }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const faqItems = items || defaultFaqItems

  if (isMinimized) {
    return (
      <section id="faq" className="py-12 bg-white">
        <div className="container-main text-center">
          <h2 className="text-2xl font-bold text-dark-900">Domande frequenti</h2>
        </div>
      </section>
    )
  }

  return (
    <section
      id="faq"
      className="py-20 lg:py-28 bg-white"
      aria-labelledby="faq-title"
    >
      <div className="container-main">
        <div className="text-center mb-16">
          <h2 id="faq-title" className="text-3xl md:text-4xl font-bold text-dark-900 mb-4">
            Domande frequenti
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index
            return (
              <div
                key={index}
                className={`rounded-xl overflow-hidden transition-colors duration-200 ${
                  isOpen ? 'border-l-4 border-l-secondary-500 border border-secondary-200' : 'border border-gray-200'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-gray-50 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-dark-900 pr-4">{item.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-secondary-500' : 'text-gray-500'
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-5">
                    <p className="text-gray-600 leading-relaxed">{item.answer}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
