import type { Metadata } from 'next'
import '@/app/ui/global.css'

export const metadata: Metadata = {
  title: 'Olivier Pierre - Portfolio',
  description: 'Chef de projet et développeur front-end',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
