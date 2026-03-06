import type { Metadata, Viewport } from 'next'
import dynamic from 'next/dynamic'
import { Inter } from 'next/font/google'
import './globals.css'
import { GlobalJsonLd } from '@/components/JsonLd'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

const ChatFloat = dynamic(
  () => import('@/components/ChatFloat').then((m) => m.ChatFloat),
  { ssr: false }
)

const inter = Inter({ subsets: ['latin'] })

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://elevia.nexadata.it'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'elevIA - Soluzioni AI per la Tua Azienda',
    template: '%s | elevIA',
  },
  description: 'Scopri come l\'intelligenza artificiale può trasformare il tuo business con elevIA. 20 Use Case AI pronti all\'uso per PMI e enterprise.',
  keywords: ['AI', 'intelligenza artificiale', 'business', 'PMI', 'enterprise', 'elevIA', 'chatbot', 'RAG', 'automazione'],
  authors: [{ name: 'elevIA', url: baseUrl }],
  creator: 'elevIA',
  publisher: 'elevIA',
  alternates: {
    canonical: '/',
    languages: {
      'it': '/',
      'x-default': '/',
    },
  },
  openGraph: {
    title: 'elevIA - Soluzioni AI per PMI e Enterprise',
    description: 'Trasforma il tuo business con l\'intelligenza artificiale. 20 Use Case AI pronti all\'uso.',
    url: baseUrl,
    siteName: 'elevIA',
    locale: 'it_IT',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'elevIA - Soluzioni AI per Aziende',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'elevIA - Soluzioni AI per PMI e Enterprise',
    description: 'Trasforma il tuo business con l\'intelligenza artificiale',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add these when available
    // google: 'google-site-verification-code',
    // yandex: 'yandex-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it">
      <head>
        <GlobalJsonLd />
      </head>
      <body className={inter.className}>
        <Header />
        <main className="pt-16">
          {children}
        </main>
        <ChatFloat />
        <Footer />
      </body>
    </html>
  )
}
