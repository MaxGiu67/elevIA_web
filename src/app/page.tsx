import { PagePlanRenderer } from '@/features/remodulation/components/PagePlanRenderer'

/**
 * elevIA Landing Page
 *
 * Structure:
 * - Header (in root layout)
 * - PagePlanRenderer (dynamically renders and reorders all content blocks)
 * - Footer (in root layout)
 * - ChatFloat (in root layout)
 *
 * Content blocks (Hero, UseCases, Stats, Problems, Features, CTA) are rendered
 * by PagePlanRenderer and can be reordered during Page Remodulation based on user intent.
 */
export default function Home() {
  return <PagePlanRenderer />
}
