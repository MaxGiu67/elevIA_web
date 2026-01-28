import { Hero } from '@/components/Hero'
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
 * - Header (in root layout)
 * - Hero section
 * - UseCases (5 Areas with 20 Use Cases)
 * - Stats (key metrics)
 * - Problems (business challenges we solve)
 * - Features (why choose UPGRAI)
 * - CTASection (contact/lead generation)
 * - Footer (in root layout)
 * - ChatFloat (in root layout)
 *
 * Each content block is a separate component that can be
 * reordered during Page Remodulation based on user intent.
 */
export default function Home() {
  return (
    <>
      <Hero />

      {/* Content Blocks - can be reordered by Page Remodulation */}
      <UseCases />
      <Stats />
      <Problems />
      <Features />
      <CTASection />
    </>
  )
}
