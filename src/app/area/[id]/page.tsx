import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { AreaPage } from '@/features/area/components/AreaPage'
import { areas, areaList, type AreaId } from '@/content/areas'
import { useCases, type UseCaseId } from '@/content/use-cases'

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

  return {
    title: `${area.name} - ${area.tagline} | elevIA`,
    description: area.description,
    openGraph: {
      title: `${area.name} | elevIA`,
      description: area.description,
      type: 'website',
      url: `https://elevia.nexadata.it/area/${area.id}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${area.name} | elevIA`,
      description: area.description,
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

  return <AreaPage area={area as any} useCases={areaUseCases} />
}
