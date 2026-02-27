import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { UseCasePage } from '@/features/use-case/components/UseCasePage'
import { useCases, useCaseList, type UseCaseId } from '@/content/use-cases'
import { areas, type AreaId } from '@/content/areas'
import { BreadcrumbJsonLd, ServiceJsonLd } from '@/components/JsonLd'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://elevia.nexadata.it'

interface PageProps {
  params: { id: string }
}

// Generate static params for all use cases
export function generateStaticParams() {
  return useCaseList.map((uc) => ({
    id: uc.id,
  }))
}

// Generate metadata for SEO
export function generateMetadata({ params }: PageProps): Metadata {
  const useCase = useCases[params.id as UseCaseId]

  if (!useCase) {
    return {
      title: 'Use Case non trovato | elevIA',
    }
  }

  const description = `${useCase.components.header.tagline}. Delivery in ${useCase.effort}.`

  return {
    title: `${useCase.components.header.title} | elevIA`,
    description,
    keywords: ['AI', useCase.name, useCase.area, 'elevIA', 'automazione', 'PMI'],
    alternates: {
      canonical: `/use-case/${useCase.id}`,
    },
    openGraph: {
      title: useCase.components.header.title,
      description,
      type: 'article',
      url: `${baseUrl}/use-case/${useCase.id}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: useCase.components.header.title,
      description,
    },
  }
}

export default function Page({ params }: PageProps) {
  const useCase = useCases[params.id as UseCaseId]

  if (!useCase) {
    notFound()
  }

  const area = areas[useCase.area as AreaId]

  // Get related use cases data
  const relatedUseCases = (useCase.relatedUseCases || [])
    .map((relatedId: string) => {
      const related = useCases[relatedId as UseCaseId]
      if (!related) return null
      return {
        id: related.id,
        name: related.name,
        tagline: related.components.header.tagline,
      }
    })
    .filter(Boolean) as Array<{ id: string; name: string; tagline?: string }>

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: baseUrl },
          ...(area
            ? [{ name: area.name, url: `${baseUrl}/area/${area.id}` }]
            : []),
          { name: useCase.name, url: `${baseUrl}/use-case/${useCase.id}` },
        ]}
      />
      <ServiceJsonLd
        name={useCase.name}
        description={useCase.components.header.tagline}
        url={`${baseUrl}/use-case/${useCase.id}`}
      />
      <UseCasePage useCase={useCase as any} relatedUseCases={relatedUseCases} />
    </>
  )
}
