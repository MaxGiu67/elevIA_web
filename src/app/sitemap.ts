import { MetadataRoute } from 'next'
import { areaList } from '@/content/areas'
import { useCaseList } from '@/content/use-cases'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://elevia.nexadata.it'

export default function sitemap(): MetadataRoute.Sitemap {
  const areas: MetadataRoute.Sitemap = areaList.map((area) => ({
    url: `${baseUrl}/area/${area.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  const useCases: MetadataRoute.Sitemap = useCaseList.map((uc) => ({
    url: `${baseUrl}/use-case/${uc.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/progetto`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    ...areas,
    ...useCases,
  ]
}
