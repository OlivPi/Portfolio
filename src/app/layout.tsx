import type { Metadata } from 'next'
import '@/app/ui/global.css'
import {IBM_Plex_Sans, Roboto_Mono} from "next/font/google";

export const metadata: Metadata = {
  title: 'Olivier Pierre - Portfolio',
  description: 'Chef de projet et développeur front-end',
}

const ibm_plex = IBM_Plex_Sans({
  weight: ["200", "300", "400", "500", "600", "700"],
  display: "swap",
  preload: true,
  subsets: [ "latin"],
  variable: '--font-ibm',
})

const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
})
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={`${ibm_plex.variable} ${roboto_mono.variable}`}>
      <body>{children}</body>
    </html>
  )
}
