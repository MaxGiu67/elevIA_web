import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { ChatFloat } from '@/components/ChatFloat'
import { Footer } from '@/components/Footer'
import Link from 'next/link'

// Services data for the dark section
const services = [
  {
    title: 'AI Consulting',
    description: 'Strategia e consulenza per l\'integrazione AI nella tua azienda.',
    icon: (
      <svg className="w-8 h-8 text-secondary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    title: 'Custom AI Solutions',
    description: 'Soluzioni AI personalizzate per le esigenze specifiche del tuo business.',
    icon: (
      <svg className="w-8 h-8 text-secondary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    title: 'AI Training',
    description: 'Formazione professionale per team enterprise sull\'utilizzo dell\'AI.',
    icon: (
      <svg className="w-8 h-8 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    title: 'GEO Optimization',
    description: 'Ottimizza i contenuti per essere citati dai motori AI generativi.',
    icon: (
      <svg className="w-8 h-8 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
  },
]

// Use cases for the white section
const useCases = [
  {
    title: 'Per le Aziende',
    subtitle: 'Il tuo Partner AI Strategico.',
    description: 'Hai una sfida di business? Noi la trasformiamo in un\'opportunità con soluzioni AI innovative.',
    accent: 'secondary',
    features: [
      'Automazione processi intelligente',
      'Analisi predittiva avanzata',
      'Integrazione AI nei workflow',
    ],
  },
  {
    title: 'Per i Team',
    subtitle: 'Il tuo futuro nel Tech inizia qui.',
    description: 'Vuoi far crescere le competenze AI del tuo team? Con UPGRAI puoi crescere in un ambiente stimolante e innovativo.',
    accent: 'primary',
    features: [
      'Formazione gratuita e pratica',
      'Mentoring con esperti AI',
      'Progetti reali con aziende',
    ],
  },
]

// Wave component for section transitions
function WaveBottom() {
  return (
    <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
      <svg
        className="relative block w-full h-[80px]"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
          fill="#ffffff"
        />
      </svg>
    </div>
  )
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Main Content Area */}
      <div className="pt-16">
        <Hero />

        {/* Dark Section - Services */}
        <section id="services" className="relative bg-dark-900 text-white py-20">
          <div className="container-main">
            <div className="text-center mb-12">
              <Link href="#services" className="text-secondary-500 uppercase tracking-wider text-sm font-medium">
                SERVIZI
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-4">
                    {service.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{service.title}</h3>
                  <p className="text-gray-400 text-sm">{service.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Wave transition to white section */}
          <WaveBottom />
        </section>

        {/* White Section - Use Cases */}
        <section id="use-cases" className="py-20 bg-white">
          <div className="container-main">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {useCases.map((useCase, index) => (
                <div
                  key={index}
                  className="card hover:shadow-lg transition-shadow duration-300"
                >
                  <h3 className="text-2xl font-bold mb-2">
                    <span className="text-dark-900">Per </span>
                    <span className={useCase.accent === 'secondary' ? 'text-secondary-500' : 'text-primary-500'}>
                      {useCase.title.replace('Per ', '')}
                    </span>
                  </h3>
                  <p className="font-semibold text-dark-900 mb-4">{useCase.subtitle}</p>
                  <p className="text-gray-600 mb-6">{useCase.description}</p>

                  <ul className="space-y-3">
                    {useCase.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <svg
                          className={`w-5 h-5 ${useCase.accent === 'secondary' ? 'text-secondary-500' : 'text-primary-500'}`}
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6">
                    <Link
                      href="#contact"
                      className={useCase.accent === 'secondary' ? 'link-blue' : 'link-orange'}
                    >
                      SCOPRI DI PIÙ
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section id="about" className="relative bg-dark-900 text-white py-20">
          <div className="container-main">
            <div className="text-center mb-12">
              <p className="text-gray-400 uppercase tracking-wider text-sm mb-2">PERCHÉ SCEGLIERE</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white">UPGRAI</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="flex gap-4">
                <svg className="w-8 h-8 text-secondary-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Innovazione Costante</h3>
                  <p className="text-gray-400">Tecnologie all'avanguardia, soluzioni rivoluzionarie.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <svg className="w-8 h-8 text-primary-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Crescita Reale</h3>
                  <p className="text-gray-400">Valorizziamo il talento con percorsi su misura.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <svg className="w-8 h-8 text-secondary-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Work-Life Balance</h3>
                  <p className="text-gray-400">Flessibilità, smart working e ambiente collaborativo.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <svg className="w-8 h-8 text-primary-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Progetti di Impatto</h3>
                  <p className="text-gray-400">Lavoriamo con partner su scala nazionale ed europea.</p>
                </div>
              </div>
            </div>

            <p className="text-center text-gray-400 mt-12 max-w-2xl mx-auto">
              Siamo una realtà giovane, dinamica e in crescita, dove il valore delle persone è al centro.
            </p>
          </div>

          <WaveBottom />
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-white">
          <div className="container-main">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-dark-900 mb-4">
                Pronto a trasformare il tuo business con l'AI?
              </h2>
              <p className="text-gray-600 mb-8">
                Contattaci per scoprire come UPGRAI può aiutarti a raggiungere i tuoi obiettivi.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="mailto:info@upgrai.it" className="btn-primary">
                  Scrivici
                </Link>
                <Link href="tel:+390212345678" className="btn-secondary">
                  Chiamaci
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Chat Floating */}
      <ChatFloat />

      <Footer />
    </main>
  )
}
