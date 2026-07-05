import type { Metadata } from 'next'
import ContactForm from '@/components/ContactForm/ContactForm'
import { FaLinkedin } from 'react-icons/fa'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Contact',
}

export default function ContactPage() {
  return (
    <section className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Contactez-moi</h1>
      <ContactForm />
      <div className="max-w-lg md:mx-auto mt-8 pt-6 border-t border-gray-200 text-center">
        <p className="text-sm font-light mb-3">Ou retrouvez-moi sur :</p>
        <Link
          href="https://www.linkedin.com/in/olivierpierre"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm underline hover:text-secondary transition-colors"
          aria-label="Profil LinkedIn d'Olivier Pierre"
        >
          <FaLinkedin size={16} aria-hidden="true" />
          LinkedIn
        </Link>
      </div>
    </section>
  )
}
