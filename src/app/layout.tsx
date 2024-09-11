import type { Metadata } from 'next'
import '@/app/ui/global.scss'
import {ibm_plex, roboto_mono} from "@/app/ui/fonts";
import Header from "@/components/Header/Header";
import {getPersonalInformations} from "@/lib/fetchData";
import Footer from "@/components/Footer/Footer";

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
    <html lang="fr" className={`${ibm_plex.variable} ${roboto_mono.variable}`}>
      <body>
        <Header personalInformation={personalInformation}/>
        <main>{children}</main>
      <Footer/>
      </body>
    </html>
  )
}
