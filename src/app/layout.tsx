import type { Metadata } from 'next'
import { Suspense } from "react";
import {getPersonalInformations} from "@/lib/fetchData";
import '@/app/ui/global.scss'
import {ibm_plex, roboto_mono} from "@/app/ui/fonts";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import {TransitionProvider} from "@/Context/TransitionContext";
import TransitionComponent from '@/components/Transition/TransitionComponent'
import Loading from "@/app/loading";

export const metadata: Metadata = {
  title: {
    template: 'Olivier Pierre | %s',
    default: 'Olivier Pierre | Portfolio'
  },
  description: 'Chef de projet et développeur front-end',
  metadataBase: new URL('https://opierre.fr'),
  alternates: {
    canonical: '/',
  },
  icons: { icon: '/favicon.ico' },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const personalInformation = await getPersonalInformations()
  return (
    <TransitionProvider>
      <html
        lang="fr"
        className={`${ibm_plex.variable} ${roboto_mono.variable}`}
      >
        <body>
          <Header personalInformation={personalInformation} />
          <TransitionComponent>
            <Suspense fallback={<Loading/>}>
              <main>{children}</main>
            </Suspense>
          </TransitionComponent>
          <Footer />
        </body>
      </html>
    </TransitionProvider>
  )
}
