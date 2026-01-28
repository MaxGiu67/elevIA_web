/**
 * JSON-LD Structured Data for SEO.
 * Provides organization and website schema for search engines.
 */

interface JsonLdProps {
  type: 'Organization' | 'WebSite' | 'WebPage'
}

export function JsonLd({ type }: JsonLdProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://upgrai.com'

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'UPGRAI',
    description: 'AI-Powered Solutions for Your Business. 20 Use Case AI pronti all\'uso per PMI e enterprise.',
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    sameAs: [
      'https://www.linkedin.com/company/upgrai',
      'https://twitter.com/upgrai',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+39-02-12345678',
      contactType: 'customer service',
      availableLanguage: ['Italian', 'English'],
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IT',
    },
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'UPGRAI',
    url: baseUrl,
    description: 'AI-Powered Solutions for Your Business',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${baseUrl}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'UPGRAI - AI-Powered Solutions for Your Business',
    description: 'Scopri come l\'intelligenza artificiale può trasformare il tuo business con UPGRAI.',
    url: baseUrl,
    isPartOf: {
      '@type': 'WebSite',
      name: 'UPGRAI',
      url: baseUrl,
    },
    about: {
      '@type': 'Thing',
      name: 'Artificial Intelligence Solutions',
    },
    mainEntity: {
      '@type': 'Organization',
      name: 'UPGRAI',
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
