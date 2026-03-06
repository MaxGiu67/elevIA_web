import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { AreaPage } from '@/features/area/components/AreaPage'
import { areas, areaList, type AreaId } from '@/content/areas'
import { useCases, type UseCaseId } from '@/content/use-cases'
import { BreadcrumbJsonLd, WebPageJsonLd, CollectionPageJsonLd } from '@/components/JsonLd'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://elevia.nexadata.it'

interface PageProps {
  params: { id: string }
}

// Generate static params for all areas
export function generateStaticParams() {
  return areaList.map((area) => ({
    id: area.id,
  }))
}

// Generate metadata for SEO
export function generateMetadata({ params }: PageProps): Metadata {
  const area = areas[params.id as AreaId]

  if (!area) {
    return {
      title: 'Area non trovata | elevIA',
    }
  }

  const description = `${area.tagline}. ${area.description}`

  return {
    title: { absolute: `${area.name} - Soluzioni AI | elevIA` },
    description,
    keywords: ['AI', 'intelligenza artificiale', area.name, 'elevIA', 'PMI', 'enterprise'],
    alternates: {
      canonical: `/area/${area.id}`,
    },
    openGraph: {
      title: `${area.name} - Soluzioni AI | elevIA`,
      description,
      type: 'website',
      url: `${baseUrl}/area/${area.id}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${area.name} - Soluzioni AI | elevIA`,
      description,
    },
  }
}

export default function Page({ params }: PageProps) {
  const area = areas[params.id as AreaId]

  if (!area) {
    notFound()
  }

  // Get use cases for this area
  const areaUseCases = (area.useCases || [])
    .map((ucId: string) => {
      const uc = useCases[ucId as UseCaseId]
      if (!uc) return null
      return {
        id: uc.id,
        name: uc.name,
        tagline: uc.components.header.tagline,
        effort: uc.effort,
      }
    })
    .filter(Boolean) as Array<{ id: string; name: string; tagline: string; effort: string }>

  const pageUrl = `${baseUrl}/area/${area.id}`

  return (
    <>
      <WebPageJsonLd
        name={`${area.name} - Soluzioni AI | elevIA`}
        description={`${area.tagline}. ${area.description}`}
        url={pageUrl}
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: baseUrl },
          { name: area.name, url: pageUrl },
        ]}
      />
      <CollectionPageJsonLd
        name={`${area.name} AI`}
        description={`${area.tagline}. ${area.description}`}
        url={pageUrl}
        items={areaUseCases.map((uc) => ({
          name: uc.name,
          url: `${baseUrl}/use-case/${uc.id}`,
        }))}
      />
      <AreaPage area={area as any} useCases={areaUseCases} />
    </>
  )
}
