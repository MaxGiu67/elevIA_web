import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { LandingPageJsonLd } from '@/components/JsonLd'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ChatFloat } from '@/components/ChatFloat'

const inter = Inter({ subsets: ['latin'] })

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://upgrai.com'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'UPGRAI - AI-Powered Solutions for Your Business',
    template: '%s | UPGRAI',
  },
  description: 'Scopri come l\'intelligenza artificiale può trasformare il tuo business con UPGRAI. 20 Use Case AI pronti all\'uso per PMI e enterprise.',
  keywords: ['AI', 'intelligenza artificiale', 'business', 'PMI', 'enterprise', 'UPGRAI', 'chatbot', 'RAG', 'automazione'],
  authors: [{ name: 'UPGRAI', url: baseUrl }],
  creator: 'UPGRAI',
  publisher: 'UPGRAI',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'UPGRAI - AI-Powered Solutions',
    description: 'Trasforma il tuo business con l\'intelligenza artificiale. 20 Use Case AI pronti all\'uso.',
    url: baseUrl,
    siteName: 'UPGRAI',
    locale: 'it_IT',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'UPGRAI - AI Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UPGRAI - AI-Powered Solutions',
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
        <LandingPageJsonLd />
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
