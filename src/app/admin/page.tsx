import type { Metadata } from 'next'
import { AdminPage } from './AdminPage'

export const metadata: Metadata = {
  title: 'Admin — elevIA',
  robots: { index: false, follow: false },
}

export default function Admin() {
  return <AdminPage />
}
