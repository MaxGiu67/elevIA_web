import { PagePlanRenderer } from '@/features/remodulation/components/PagePlanRenderer'
import { WebPageJsonLd } from '@/components/JsonLd'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://elevia.nexadata.it'

/**
 * elevIA Landing Page
 *
 * Structure:
 * - Header (in root layout)
 * - PagePlanRenderer (dynamically renders and reorders all content blocks)
 * - Footer (in root layout)
 * - ChatFloat (in root layout)
 *
 * Content blocks (Hero, Problems, Proposal, UseCases, HowItWorks, WhyUs,
 * BeforeAfter, FAQ, CTA) are rendered by PagePlanRenderer and can be
 * reordered during Page Remodulation based on user intent.
 */
export default function Home() {
  return (
    <>
      <WebPageJsonLd
        name="elevIA - Soluzioni AI per la Tua Azienda"
        description="Framework AI con 20 soluzioni pronte per PMI e enterprise italiane. Knowledge, Customer Experience, Operations, Workflow e HR."
        url={baseUrl}
      />
      <PagePlanRenderer />
    </>
  )
}
