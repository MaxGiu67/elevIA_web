import { MetadataRoute } from 'next'
import { areaList } from '@/content/areas'
import { useCaseList } from '@/content/use-cases'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://elevia.nexadata.it'
const CONTENT_DATE = new Date('2026-03-03')

export default function sitemap(): MetadataRoute.Sitemap {
  const areas: MetadataRoute.Sitemap = areaList.map((area) => ({
    url: `${baseUrl}/area/${area.id}`,
    lastModified: CONTENT_DATE,
  }))

  const useCases: MetadataRoute.Sitemap = useCaseList.map((uc) => ({
    url: `${baseUrl}/use-case/${uc.id}`,
    lastModified: CONTENT_DATE,
  }))

  return [
    {
      url: baseUrl,
      lastModified: CONTENT_DATE,
    },
    {
      url: `${baseUrl}/progetto`,
      lastModified: CONTENT_DATE,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: CONTENT_DATE,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: CONTENT_DATE,
    },
    ...areas,
    ...useCases,
  ]
}
