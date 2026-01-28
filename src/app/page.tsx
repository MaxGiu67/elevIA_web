import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { ChatFloat } from '@/components/ChatFloat'
import { Footer } from '@/components/Footer'
import {
  UseCases,
  Stats,
  Problems,
  Features,
  CTASection,
} from '@/features/landing/components'

/**
 * UPGRAI Landing Page
 *
 * Structure:
 * - Header (fixed)
 * - Hero section
 * - UseCases (5 Areas with 20 Use Cases)
 * - Stats (key metrics)
 * - Problems (business challenges we solve)
 * - Features (why choose UPGRAI)
 * - CTASection (contact/lead generation)
 * - Footer
 * - ChatFloat (AI chatbot)
 *
 * Each content block is a separate component that can be
 * reordered during Page Remodulation based on user intent.
 */
export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Main Content Area */}
      <div className="pt-16">
        <Hero />

        {/* Content Blocks - can be reordered by Page Remodulation */}
        <UseCases />
        <Stats />
        <Problems />
        <Features />
        <CTASection />
      </div>

      {/* Chat Floating - AI Overview System */}
      <ChatFloat />

      <Footer />
    </main>
  )
}
