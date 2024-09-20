import type { Metadata } from "next";
import ContactForm from '@/components/ContactForm/ContactForm'

export const metadata: Metadata = {
  title: 'Contact'
}


export default function ContactPage() {
  return (
    <section className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Contactez-moi</h1>
      <ContactForm />
    </section>
  )
}
