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
import FloatingMenu from '@/components/FloatingMenu/FloatingMenu'

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
        <head>
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark')document.documentElement.classList.add('dark')}catch(e){}})()`,
            }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify([
                {
                  '@context': 'https://schema.org',
                  '@type': 'WebSite',
                  name: 'Olivier Pierre | Portfolio',
                  url: 'https://opierre.fr',
                },
                {
                  '@context': 'https://schema.org',
                  '@type': 'Person',
                  name: 'Olivier Pierre',
                  url: 'https://opierre.fr',
                  jobTitle:
                    personalInformation[0]?.title ??
                    'Chef de projet & Développeur front-end',
                  image: 'https://opierre.fr/OlivWebN%26B.png',
                  sameAs: [
                    'https://www.linkedin.com/in/olivierpierre',
                    'https://github.com/OlivPi',
                  ],
                  knowsAbout: ['React', 'WordPress', 'Next.js', 'Développement front-end', 'Gestion de projet'],
                },
              ]),
            }}
          />
        </head>
        <body>
          <a href="#main-content" className="skip-link">
            Aller au contenu principal
          </a>
          <Header personalInformation={personalInformation} />
          <TransitionComponent>
            <Suspense fallback={<Loading />}>
              <main id="main-content">{children}</main>
            </Suspense>
          </TransitionComponent>
          <Footer />
          <FloatingMenu />
          <div
            id="page-overlay"
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: '#5CD19A',
              zIndex: 9999,
              opacity: 0,
              pointerEvents: 'none',
            }}
          />
        </body>
      </html>
    </TransitionProvider>
  )
}
