import type { Metadata } from 'next'
import ContactForm from '@/components/ContactForm/ContactForm'
import { FaLinkedin } from 'react-icons/fa'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Contactez Olivier Pierre pour discuter de vos projets web ou événementiels. Formulaire de contact, email direct et LinkedIn disponibles.',
  alternates: { canonical: '/contact' },
}

export default function ContactPage() {
  return (
    <section className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Contactez-moi</h1>
      <ContactForm />
      <div className="max-w-lg md:mx-auto mt-8 pt-6 border-t border-tertiary">
        <p className="text-sm font-light mb-4 text-center">
          Ou retrouvez-moi directement sur :
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <Link
            href="mailto:olivier@opierre.fr"
            className="flex items-center gap-2 px-4 py-2 border border-foreground rounded hover:bg-secondary hover:border-secondary transition-colors duration-200 text-sm"
          >
            olivier@opierre.fr
          </Link>
          <Link
            href="https://www.linkedin.com/in/olivierpierre"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 border border-foreground rounded hover:bg-secondary hover:border-secondary transition-colors duration-200 text-sm"
            aria-label="Profil LinkedIn d'Olivier Pierre"
          >
            <FaLinkedin size={18} aria-hidden="true" />
            LinkedIn
          </Link>
        </div>
      </div>
    </section>
  )
}
