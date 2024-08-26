import Link from 'next/link'

export default function NotFoundPage() {
  return (
    <section className="container mx-auto text-center p-6">
      <h1 className="text-3xl font-bold mb-4">Page non trouvée</h1>
      <p className="text-lg mb-8">
        Désolé, la page que vous cherchez n&apos;existe pas.
      </p>
      <Link href="/">
        <a className="text-blue-500 hover:underline">
          Retourner aux projets web
        </a>
      </Link>
    </section>
  )
}
