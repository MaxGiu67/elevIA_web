'use client'

import Link from 'next/link'

/**
 * CTA (Call to Action) section for lead generation.
 * Provides contact options for potential customers.
 */

export function CTASection() {
  return (
    <section
      id="contact"
      className="pt-40 pb-20 bg-white"
      aria-labelledby="cta-title"
    >
      <div className="container-main">
        <div className="max-w-2xl mx-auto text-center">
          <h2 id="cta-title" className="text-3xl md:text-4xl font-bold text-dark-900 mb-4">
            Pronto a integrare l'AI nella tua azienda?
          </h2>
          <p className="text-gray-600 mb-8">
            Contattaci per un assessment gratuito. Identificheremo insieme i problemi da risolvere e gli Use Case più adatti.
          </p>
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            role="group"
            aria-label="Opzioni di contatto"
          >
            <Link
              href="mailto:info@nexadata.it"
              className="btn-primary"
              aria-label="Richiedi un assessment gratuito via email"
            >
              Richiedi Assessment
            </Link>
            <Link
              href="tel:+390212345678"
              className="btn-secondary"
              aria-label="Chiamaci per informazioni"
            >
              Chiamaci
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
