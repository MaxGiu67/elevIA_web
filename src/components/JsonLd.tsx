/**
 * JSON-LD Structured Data for SEO.
 * Provides organization, website, breadcrumb, and service schemas for search engines.
 */

interface JsonLdProps {
  type: 'Organization' | 'WebSite' | 'WebPage'
}

export function JsonLd({ type }: JsonLdProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://elevia.nexadata.it'

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'elevIA',
    description: 'AI-Powered Solutions for Your Business. 20 Use Case AI pronti all\'uso per PMI e enterprise.',
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IT',
    },
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'elevIA',
    url: baseUrl,
    description: 'AI-Powered Solutions for Your Business',
  }

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'elevIA - AI-Powered Solutions for Your Business',
    description: 'Scopri come l\'intelligenza artificiale può trasformare il tuo business con elevIA.',
    url: baseUrl,
    isPartOf: {
      '@type': 'WebSite',
      name: 'elevIA',
      url: baseUrl,
    },
    about: {
      '@type': 'Thing',
      name: 'Artificial Intelligence Solutions',
    },
    mainEntity: {
      '@type': 'Organization',
      name: 'elevIA',
    },
  }

  const schemas = {
    Organization: organizationSchema,
    WebSite: websiteSchema,
    WebPage: webPageSchema,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas[type]) }}
    />
  )
}

/**
 * Combined JSON-LD for the landing page.
 * Includes Organization and WebPage schemas.
 */
export function LandingPageJsonLd() {
  return (
    <>
      <JsonLd type="Organization" />
      <JsonLd type="WebPage" />
    </>
  )
}

/**
 * Breadcrumb JSON-LD for hierarchical navigation.
 */
interface BreadcrumbItem {
  name: string
  url: string
}

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

/**
 * Service JSON-LD for use case pages.
 */
interface ServiceJsonLdProps {
  name: string
  description: string
  url: string
}

export function ServiceJsonLd({ name, description, url }: ServiceJsonLdProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://elevia.nexadata.it'

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url,
    provider: {
      '@type': 'Organization',
      name: 'elevIA',
      url: baseUrl,
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
