import type { Metadata } from 'next'
import {getPersonalInformations} from "@/lib/fetchData";
import '@/app/ui/global.scss'
import {ibm_plex, roboto_mono} from "@/app/ui/fonts";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import {TransitionProvider} from "@/Context/TransitionContext";
import TransitionComponent from '@/components/Transition/TransitionComponent'

export const metadata: Metadata = {
  title: 'Olivier Pierre - Portfolio',
  description: 'Chef de projet et développeur front-end',
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
      <html lang="fr" className={`${ibm_plex.variable} ${roboto_mono.variable}`}>
        <body>
        <Header personalInformation={personalInformation}/>
        <TransitionComponent>
          <main>{children}</main>
        </TransitionComponent>
        <Footer/>
        </body>
      </html>
    </TransitionProvider>
  )
}
