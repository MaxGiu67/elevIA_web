'use client'

import Image from 'next/image'

interface ProblemsProps {
  isHighlighted?: boolean
  isMinimized?: boolean
}

export function Problems({ isMinimized }: ProblemsProps) {
  if (isMinimized) {
    return (
      <section id="problems" className="py-12 bg-white">
        <div className="container-main text-center">
          <h2 className="text-2xl font-bold text-dark-900">
            Hai 10 anni di dati. E ancora cerchi le risposte a mano.
          </h2>
        </div>
      </section>
    )
  }

  return (
    <section
      id="problems"
      className="py-20 lg:py-28 bg-white"
      aria-labelledby="problems-title"
    >
      <div className="container-main">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Text Column */}
            <div>
              <h2
                id="problems-title"
                className="text-3xl md:text-4xl font-bold text-dark-900 mb-8 leading-tight"
              >
                Hai 10 anni di dati. E ancora cerchi le risposte a mano.
              </h2>

              <p className="text-gray-600 mb-6 leading-relaxed">
                Il tuo gestionale ha migliaia di ticket, il CRM decine di migliaia di interazioni,
                il server centinaia di documenti. Tutti i dati che ti servono sono li' — ma trovarli,
                collegarli e usarli richiede ore di lavoro manuale ogni giorno.
              </p>

              <p className="text-gray-600 mb-8 leading-relaxed">
                Il mercato AI italiano cresce del +50% l'anno. Il 71% delle grandi imprese ha
                avviato almeno un progetto AI, ma solo l'8% delle PMI. Non e' questione di volonta':
                e' questione di trovare chi lo sa fare in modo concreto, con i tuoi sistemi, nei tuoi
                tempi.
              </p>

              <p className="text-xs text-gray-400">
                Fonte: Osservatorio Artificial Intelligence, Politecnico di Milano, febbraio 2026 — dati 2025
              </p>
            </div>

            {/* Illustration Column */}
            <div className="flex justify-center">
              <Image
                src="/images/dati-dispersi.png"
                alt="Da dati dispersi e manuali a dati organizzati e connessi con AI"
                width={600}
                height={400}
                className="w-full rounded-xl"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
