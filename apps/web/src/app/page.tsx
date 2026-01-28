import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { ChatFloat } from '@/components/ChatFloat'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Main Content Area - scrollable */}
      <div className="pt-16"> {/* padding for fixed header */}
        <Hero />

        {/* Placeholder for other sections - to be implemented in Story 1.4 */}
        <section className="py-20 bg-gray-50">
          <div className="container-main text-center">
            <p className="text-gray-500">
              Features, Use Cases, Testimonials - Coming in Story 1.4
            </p>
          </div>
        </section>
      </div>

      {/* Chat Floating - fixed position */}
      <ChatFloat />

      <Footer />
    </main>
  )
}
