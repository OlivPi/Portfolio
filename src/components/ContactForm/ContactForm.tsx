'use client'
import { useState, useEffect, useRef } from 'react'
import { sendEmail } from "@/utils/send-email";
import {gsap} from 'gsap';
import styles from './contact.module.scss';

export type ContactFormData = {
  name: string
  email: string
  subject: string
  message: string
}

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const [status, setStatus] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const progressBarRef = useRef<HTMLDivElement | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      await sendEmail(formData);
      setStatus('success');
    } catch (error: any) {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loading && progressBarRef.current) {
      gsap.fromTo(
        progressBarRef.current,
        { width: '0%' },
        { width: '100%', duration: 2, ease: 'power2.inOut' }
      );
    } else if (progressBarRef.current) {
      gsap.set(progressBarRef.current, { width: '0%' });
    }
  }, [loading]);

  return (
    <form onSubmit={handleSubmit} className={styles.contactFormContainer}>
      <div>
        <label htmlFor="name">Nom</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="subject">Sujet</label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          required
        ></textarea>
      </div>
      {loading && (
        <div className={styles.loadingSend}>
          <div
            ref={progressBarRef}
          ></div>
        </div>
      )}
      <button
        type="submit"
        disabled={loading}
      >
        {loading ? 'Envoi en cours...' : 'Envoyer'}
      </button>
      {status === 'success' && (
        <p className="mt-4 text-center text-sm text-green-500">
          Message envoyé avec succès !
        </p>
      )}
      {status === 'error' && (
        <p className="mt-4 text-center text-sm text-red-500">
          Une erreur est survenue lors de l&#39;envoi du message.
        </p>
      )}
    </form>
  )
}
