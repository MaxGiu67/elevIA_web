import type { Metadata } from 'next'
import { ProgettoPage } from '@/features/progetto/components/ProgettoPage'

export const metadata: Metadata = {
  title: 'Progetto AI per la tua azienda',
  description:
    'Trasformiamo i tuoi sistemi in sistemi intelligenti. Assessment gratuito, scope definito, 6 mesi. 20 soluzioni AI pronte. Scopri il progetto AI Nexa Data.',
  alternates: {
    canonical: '/progetto',
  },
  openGraph: {
    title: 'Progetto AI per la tua azienda | elevIA',
    description:
      'Trasformiamo i tuoi sistemi in sistemi intelligenti. Assessment gratuito, scope definito, 6 mesi.',
    type: 'website',
  },
}

export default function ProgettoRoute() {
  return <ProgettoPage />
}
