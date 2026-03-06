/**
 * JSON-LD Structured Data for SEO.
 * Provides organization, website, breadcrumb, service, collection, and page schemas.
 */

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://elevia.nexadata.it'

/**
 * Global JSON-LD: Organization + WebSite (rendered once in layout.tsx).
 */
export function GlobalJsonLd() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${baseUrl}/#organization`,
    name: 'elevIA',
    description: 'Framework AI con 20 soluzioni pronte per PMI e enterprise italiane.',
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IT',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'elevia@nexadata.it',
      contactType: 'sales',
      availableLanguage: ['Italian', 'English'],
    },
    parentOrganization: {
      '@type': 'Organization',
      name: 'Nexa Data',
      url: 'https://www.nexadata.it',
    },
    sameAs: ['https://linkedin.com/company/nexadata'],
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${baseUrl}/#website`,
    name: 'elevIA',
    url: baseUrl,
    description: 'Soluzioni di intelligenza artificiale per aziende italiane',
    inLanguage: 'it-IT',
    publisher: {
      '@id': `${baseUrl}/#organization`,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  )
}

/**
 * Per-page WebPage JSON-LD (rendered in each page component).
 */
interface WebPageJsonLdProps {
  name: string
  description: string
  url: string
}

export function WebPageJsonLd({ name, description, url }: WebPageJsonLdProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name,
    description,
    url,
    isPartOf: {
      '@id': `${baseUrl}/#website`,
    },
    about: {
      '@type': 'Thing',
      name: 'Artificial Intelligence Solutions',
    },
    mainEntity: {
      '@id': `${baseUrl}/#organization`,
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
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
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url,
    serviceType: 'AI Software Solution',
    areaServed: {
      '@type': 'Country',
      name: 'Italy',
    },
    category: 'Artificial Intelligence',
    provider: {
      '@id': `${baseUrl}/#organization`,
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

/**
 * CollectionPage JSON-LD for area pages (ItemList of use cases).
 */
interface CollectionPageItem {
  name: string
  url: string
}

interface CollectionPageJsonLdProps {
  name: string
  description: string
  url: string
  items: CollectionPageItem[]
}

export function CollectionPageJsonLd({ name, description, url, items }: CollectionPageJsonLdProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    description,
    url,
    isPartOf: {
      '@id': `${baseUrl}/#website`,
    },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        url: item.url,
      })),
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
