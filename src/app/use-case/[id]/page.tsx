import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { UseCasePage } from '@/features/use-case/components/UseCasePage'
import { useCases, useCaseList, type UseCaseId } from '@/content/use-cases'

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
      title: 'Use Case non trovato | UPGRAI',
    }
  }

  return {
    title: `${useCase.components.header.title} | UPGRAI`,
    description: useCase.components.header.tagline,
    openGraph: {
      title: useCase.components.header.title,
      description: useCase.components.header.tagline,
      type: 'article',
      url: `https://upgrai.com/use-case/${useCase.id}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: useCase.components.header.title,
      description: useCase.components.header.tagline,
    },
  }
}

export default function Page({ params }: PageProps) {
  const useCase = useCases[params.id as UseCaseId]

  if (!useCase) {
    notFound()
  }

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

  // Type assertion to handle JSON import types
  return <UseCasePage useCase={useCase as any} relatedUseCases={relatedUseCases} />
}
