import Link from 'next/link'

// Wave SVG component for transitions
function WaveTop() {
  return (
    <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
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

export function Footer() {
  return (
    <footer className="relative bg-dark-900 text-gray-300 pt-24 pb-12">
      <WaveTop />

      <div className="container-main">
        {/* CTA Section */}
        <div className="text-center mb-16">
          <p className="text-primary-500 uppercase tracking-wider text-sm mb-2">elevIA</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Trasforma i tuoi problemi in soluzioni AI
          </h2>
          <p className="text-gray-400 mb-6 max-w-xl mx-auto">
            Assessment gratuito per identificare gli Use Case più adatti alla tua azienda.
          </p>
          <Link href="#contact" className="link-orange text-lg inline-flex items-center gap-2">
            RICHIEDI ASSESSMENT
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pt-12 border-t border-gray-800">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <span className="text-2xl font-bold">
                <span className="text-white">UP</span>
                <span className="text-primary-500">GRAI</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm max-w-md">
              Framework AI con 20 Use Case standardizzati per risolvere i problemi aziendali più comuni.
              Soluzioni pronte all'uso in 5 aree: Knowledge, Customer Experience, Operations, Workflow e HR.
            </p>
          </div>

          {/* Use Cases */}
          <div>
            <h3 className="font-semibold text-white uppercase text-sm mb-3">Use Case</h3>
            <ul className="text-gray-400 text-sm space-y-2">
              <li><Link href="#services" className="hover:text-primary-500 transition-colors">RAG Knowledge Base</Link></li>
              <li><Link href="#services" className="hover:text-primary-500 transition-colors">Chatbot FAQ</Link></li>
              <li><Link href="#services" className="hover:text-primary-500 transition-colors">Report Automatici</Link></li>
              <li><Link href="#services" className="hover:text-primary-500 transition-colors">Lead Scoring</Link></li>
              <li><Link href="#services" className="hover:text-primary-500 transition-colors">Screening CV</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white uppercase text-sm mb-3">Contatti</h3>
            <ul className="text-gray-400 text-sm space-y-2">
              <li>
                <Link href="mailto:info@nexadata.it" className="hover:text-primary-500 transition-colors">
                  info@nexadata.it
                </Link>
              </li>
              <li>
                <Link href="tel:+390212345678" className="hover:text-primary-500 transition-colors">
                  +39 02 1234567
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} elevIA. Tutti i diritti riservati.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="/privacy" className="text-gray-500 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-500 hover:text-white transition-colors">
              Termini di Servizio
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
