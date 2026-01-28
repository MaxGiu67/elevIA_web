import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'UPGRAI - AI-Powered Solutions for Your Business',
  description: 'Scopri come l\'intelligenza artificiale può trasformare il tuo business con UPGRAI. Soluzioni AI personalizzate per PMI e enterprise.',
  keywords: ['AI', 'intelligenza artificiale', 'business', 'PMI', 'enterprise', 'UPGRAI'],
  authors: [{ name: 'UPGRAI' }],
  openGraph: {
    title: 'UPGRAI - AI-Powered Solutions',
    description: 'Trasforma il tuo business con l\'intelligenza artificiale',
    url: 'https://upgrai.com',
    siteName: 'UPGRAI',
    locale: 'it_IT',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UPGRAI - AI-Powered Solutions',
    description: 'Trasforma il tuo business con l\'intelligenza artificiale',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
