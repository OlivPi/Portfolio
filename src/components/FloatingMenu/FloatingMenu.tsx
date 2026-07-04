'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { FaBars, FaTimes } from 'react-icons/fa'

const links = [
  { href: '/', name: 'Home' },
  { href: '/web-projects', name: 'Projets Web' },
  { href: '/event-com', name: 'Événementiel' },
  { href: '/contact', name: 'Contact' },
]

export default function FloatingMenu() {
  const [visible, setVisible] = useState(false)
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 150)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Apparition / disparition du bouton au scroll
  useGSAP(
    () => {
      if (!containerRef.current) return
      gsap.to(containerRef.current, {
        autoAlpha: visible ? 1 : 0,
        y: visible ? 0 : 16,
        duration: 0.35,
        ease: 'power2.out',
      })
    },
    { scope: containerRef, dependencies: [visible] }
  )

  // Animation d'ouverture / fermeture du menu
  useGSAP(
    () => {
      if (!navRef.current) return
      const items = gsap.utils.toArray<HTMLElement>(
        navRef.current.querySelectorAll('a')
      )

      if (open) {
        gsap.set(navRef.current, { pointerEvents: 'auto' })
        gsap.fromTo(
          items,
          { autoAlpha: 0, y: 12 },
          {
            autoAlpha: 1,
            y: 0,
            stagger: 0.07,
            duration: 0.3,
            ease: 'power3.out',
          }
        )
      } else {
        gsap.to(items, {
          autoAlpha: 0,
          y: 8,
          duration: 0.2,
          stagger: { each: 0.05, from: 'end' },
          ease: 'power2.in',
          onComplete: () => {
            if (navRef.current)
              gsap.set(navRef.current, { pointerEvents: 'none' })
          },
        })
      }
    },
    { scope: containerRef, dependencies: [open] }
  )

  return (
    <div
      ref={containerRef}
      style={{ opacity: 0 }}
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2"
    >
      <nav
        ref={navRef}
        style={{ pointerEvents: 'none' }}
        className="flex flex-col items-end gap-1 mb-1"
      >
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setOpen(false)}
            className="bg-black text-white text-sm px-4 py-2 hover:bg-secondary hover:text-black transition-colors duration-200 whitespace-nowrap"
            style={{ opacity: 0 }}
          >
            {link.name}
          </Link>
        ))}
      </nav>

      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu de navigation'}
        aria-expanded={open}
        className="w-12 h-12 bg-black text-white flex items-center justify-center hover:bg-secondary hover:text-black transition-colors duration-200"
      >
        {open ? (
          <FaTimes size={18} aria-hidden="true" />
        ) : (
          <FaBars size={18} aria-hidden="true" />
        )}
      </button>
    </div>
  )
}
