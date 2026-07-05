import { Suspense } from 'react'
import { getPersonalInformations } from '@/lib/fetchData'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import { TransitionProvider } from '@/Context/TransitionContext'
import TransitionComponent from '@/components/Transition/TransitionComponent'
import Loading from '@/app/loading'
import FloatingMenu from '@/components/FloatingMenu/FloatingMenu'

export default async function PortfolioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  let personalInformation: Awaited<ReturnType<typeof getPersonalInformations>> =
    []
  try {
    personalInformation = await getPersonalInformations()
  } catch {}

  return (
    <TransitionProvider>
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
    </TransitionProvider>
  )
}
