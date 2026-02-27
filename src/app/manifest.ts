import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'elevIA - AI Solutions',
    short_name: 'elevIA',
    description: '20 Use Case AI pronti all\'uso per PMI e enterprise.',
    start_url: '/',
    display: 'standalone',
    theme_color: '#F5921B',
    background_color: '#0A0A0A',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
