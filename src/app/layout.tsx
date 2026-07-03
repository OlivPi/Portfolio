import type { Metadata } from 'next'
import { Suspense } from 'react'
import { getPersonalInformations } from '@/lib/fetchData'
import '@/app/ui/global.scss'
import { ibm_plex, roboto_mono } from '@/app/ui/fonts'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import { TransitionProvider } from '@/Context/TransitionContext'
import TransitionComponent from '@/components/Transition/TransitionComponent'
import Loading from '@/app/loading'

export const metadata: Metadata = {
  title: {
    template: 'Olivier Pierre | %s',
    default: 'Olivier Pierre | Portfolio',
  },
  description:
    "Portfolio d'Olivier Pierre, chef de projet et développeur front-end spécialisé React et WordPress. Découvrez mes projets web, événementiels et culturels.",
  metadataBase: new URL('https://opierre.fr'),
  alternates: {
    canonical: '/',
  },
  icons: { icon: '/favicon.ico' },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://opierre.fr',
    siteName: 'Olivier Pierre',
    title: 'Olivier Pierre | Portfolio',
    description:
      'Chef de projet et développeur front-end spécialisé React et WordPress.',
    images: [
      {
        url: '/OlivWebN&B.png',
        width: 1200,
        height: 630,
        alt: 'Olivier Pierre — Chef de projet & développeur front-end',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Olivier Pierre | Portfolio',
    description:
      'Chef de projet et développeur front-end spécialisé React et WordPress.',
    images: ['/OlivWebN&B.png'],
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  let personalInformation: Awaited<ReturnType<typeof getPersonalInformations>> =
    []
  try {
    personalInformation = await getPersonalInformations()
  } catch {
    // DB unavailable during static prerendering (build time) — graceful fallback
  }
  return (
    <TransitionProvider>
      <html
        lang="fr"
        className={`${ibm_plex.variable} ${roboto_mono.variable}`}
      >
        <body>
          <Header personalInformation={personalInformation} />
          <TransitionComponent>
            <Suspense fallback={<Loading />}>
              <main>{children}</main>
            </Suspense>
          </TransitionComponent>
          <Footer />
        </body>
      </html>
    </TransitionProvider>
  )
}
