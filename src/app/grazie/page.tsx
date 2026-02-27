import type { Metadata } from 'next'
import { GraziePage } from './GraziePage'

export const metadata: Metadata = {
  title: 'Appuntamento confermato',
  description: 'Grazie per aver prenotato il tuo assessment AI gratuito con elevIA.',
  robots: { index: false, follow: false },
}

export default function Grazie() {
  return <GraziePage />
}
