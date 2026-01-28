import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { ChatFloat } from '@/components/ChatFloat'
import { Footer } from '@/components/Footer'
import Link from 'next/link'

// 5 Areas with their Use Cases
const areas = [
  {
    title: 'Knowledge',
    description: 'Gestione intelligente della conoscenza aziendale',
    icon: (
      <svg className="w-8 h-8 text-secondary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    useCases: ['RAG Knowledge Base', 'Estrazione Dati', 'Sintesi Riunioni', 'Due Diligence'],
  },
  {
    title: 'Customer Experience',
    description: 'Migliora l\'esperienza dei tuoi clienti',
    icon: (
      <svg className="w-8 h-8 text-secondary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
      </svg>
    ),
    useCases: ['Chatbot FAQ', 'Classificazione Ticket', 'Copilot Operatore', 'Analisi Sentiment'],
  },
  {
    title: 'Operations',
    description: 'Ottimizza le operazioni aziendali',
    icon: (
      <svg className="w-8 h-8 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    useCases: ['Report Automatici', 'Ricerca Semantica', 'Anomaly Detection', 'Predictive Maintenance'],
  },
  {
    title: 'Workflow',
    description: 'Automatizza i flussi di lavoro',
    icon: (
      <svg className="w-8 h-8 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    useCases: ['Workflow Approval', 'Content Generation', 'Lead Scoring', 'Compliance Checker'],
  },
  {
    title: 'HR',
    description: 'Supporto intelligente alle risorse umane',
    icon: (
      <svg className="w-8 h-8 text-secondary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    useCases: ['Screening CV', 'Onboarding Assistant', 'Employee Self-Service', 'Performance Review'],
  },
]

// 10 Problems UPGRAI solves
const problems = [
  {
    id: 'prb-01',
    title: 'Conoscenza dispersa',
    description: 'Informazioni sparse tra email, documenti e sistemi diversi. I dipendenti perdono tempo a cercare.',
    solution: 'RAG Knowledge Base, Sintesi Riunioni',
  },
  {
    id: 'prb-02',
    title: 'Estrazione dati manuale',
    description: 'Fatture, contratti e ordini richiedono data entry manuale con errori e colli di bottiglia.',
    solution: 'Estrazione Dati, Due Diligence',
  },
  {
    id: 'prb-03',
    title: 'Customer service sovraccarico',
    description: 'Operatori impegnati su domande ripetitive invece che su casi complessi.',
    solution: 'Chatbot FAQ, Classificazione Ticket',
  },
  {
    id: 'prb-04',
    title: 'Report manuali',
    description: 'Ore ogni settimana a compilare report da fonti diverse.',
    solution: 'Report Automatici, Sintesi Riunioni',
  },
  {
    id: 'prb-05',
    title: 'Anomalie scoperte tardi',
    description: 'Problemi rilevati solo quando causano fermi o danni.',
    solution: 'Anomaly Detection, Predictive Maintenance',
  },
  {
    id: 'prb-06',
    title: 'HR sovraccarico',
    description: 'Screening CV manuale, domande ricorrenti, onboarding frammentato.',
    solution: 'Screening CV, Onboarding Assistant',
  },
]

// Stats
const stats = [
  { value: '20', label: 'Use Case AI' },
  { value: '15gg', label: 'Tempo medio di delivery' },
  { value: '85%+', label: 'Accuracy garantita' },
  { value: '99%', label: 'Disponibilità' },
]

// Wave component - Dark section extends DOWN into white section below (150px height)
function WaveBottom() {
  return (
    <div className="absolute -bottom-[149px] left-0 w-full overflow-hidden leading-none z-10">
      <svg
        className="relative block w-full h-[150px]"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          d="M0,160L48,170.7C96,181,192,203,288,192C384,181,480,139,576,128C672,117,768,139,864,165.3C960,192,1056,224,1152,218.7C1248,213,1344,171,1392,149.3L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          fill="#0a0a0a"
        />
      </svg>
    </div>
  )
}

// Wave component - Dark section extends UP into white section above (150px height)
function WaveTop() {
  return (
    <div className="absolute -top-[149px] left-0 w-full overflow-hidden leading-none z-10">
      <svg
        className="relative block w-full h-[150px]"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          d="M0,160L48,149.3C96,139,192,117,288,128C384,139,480,181,576,192C672,203,768,181,864,154.7C960,128,1056,96,1152,101.3C1248,107,1344,149,1392,170.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          fill="#0a0a0a"
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

        {/* Dark Section - 5 Areas */}
        <section id="services" className="relative bg-dark-900 text-white pt-40 pb-48">
          <WaveTop />
          <div className="container-main">
            <div className="text-center mb-12">
              <p className="text-secondary-500 uppercase tracking-wider text-sm font-medium mb-2">
                5 AREE DI INTERVENTO
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                20 Use Case AI Pronti all'Uso
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {areas.map((area, index) => (
                <div key={index} className="text-center p-6 rounded-lg bg-dark-800/50 hover:bg-dark-800 transition-colors">
                  <div className="flex justify-center mb-4">
                    {area.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{area.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">{area.description}</p>
                  <ul className="text-xs text-gray-500 space-y-1">
                    {area.useCases.map((uc, idx) => (
                      <li key={idx}>{uc}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <WaveBottom />
        </section>

        {/* White Section - Stats */}
        <section className="pt-40 pb-16 bg-white">
          <div className="container-main">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-primary-500 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Problems Section */}
        <section id="problems" className="pt-20 pb-28 bg-gray-50">
          <div className="container-main">
            <div className="text-center mb-12">
              <p className="text-primary-500 uppercase tracking-wider text-sm font-medium mb-2">
                I PROBLEMI CHE RISOLVIAMO
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-dark-900">
                La tua azienda ha questi problemi?
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {problems.map((problem) => (
                <div
                  key={problem.id}
                  className="card hover:shadow-lg transition-shadow duration-300"
                >
                  <h3 className="text-xl font-semibold text-dark-900 mb-3">
                    {problem.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{problem.description}</p>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-500">Soluzione:</span>
                    <span className="text-secondary-500 font-medium">{problem.solution}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="#contact" className="btn-primary">
                Parliamo del tuo progetto
              </Link>
            </div>
          </div>
        </section>

        {/* Why UPGRAI Section */}
        <section id="about" className="relative bg-dark-900 text-white pt-40 pb-48">
          <WaveTop />
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
                  <h3 className="text-lg font-semibold text-white mb-2">Use Case Standardizzati</h3>
                  <p className="text-gray-400">20 soluzioni AI pronte all'uso, testate e documentate. Riduci tempi e rischi di implementazione.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <svg className="w-8 h-8 text-primary-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Delivery in 15 Giorni</h3>
                  <p className="text-gray-400">Ogni Use Case ha un effort standard di 15 giorni/persona. Pianificazione prevedibile.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <svg className="w-8 h-8 text-secondary-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Accuracy Garantita</h3>
                  <p className="text-gray-400">Ogni soluzione garantisce accuracy ≥85% con latenza inferiore a 5 secondi.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <svg className="w-8 h-8 text-primary-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Framework Modulare</h3>
                  <p className="text-gray-400">Architettura estensibile che si integra con i tuoi sistemi: CRM, ERP, calendari e database.</p>
                </div>
              </div>
            </div>

            <p className="text-center text-gray-400 mt-12 max-w-2xl mx-auto">
              UPGRAI è il framework AI che trasforma i problemi aziendali più comuni in soluzioni concrete e misurabili.
            </p>
          </div>

          <WaveBottom />
        </section>

        {/* Contact Section */}
        <section id="contact" className="pt-40 pb-20 bg-white">
          <div className="container-main">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-dark-900 mb-4">
                Pronto a integrare l'AI nella tua azienda?
              </h2>
              <p className="text-gray-600 mb-8">
                Contattaci per un assessment gratuito. Identificheremo insieme i problemi da risolvere e gli Use Case più adatti.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="mailto:info@upgrai.it" className="btn-primary">
                  Richiedi Assessment
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
