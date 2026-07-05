'use client'

import { useState, useRef } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useGSAP } from '@gsap/react'
import clsx from 'clsx'
import styles from './menu.module.scss'
import {
  openMenuAnimation,
  closeMenuAnimation,
} from '@/utils/animations/menuMobile'
import ThemeToggle from '@/components/ThemeToggle/ThemeToggle'

const links = [
  { href: '/', name: 'Home' },
  { href: '/web-projects', name: 'Projets Web' },
  { href: '/event-com', name: 'Évenementiel et communication' },
  { href: '/contact', name: 'Contact' },
]

export default function Menu() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const burgerTopRef = useRef<HTMLDivElement>(null)
  const burgerMiddleRef = useRef<HTMLDivElement>(null)
  const burgerBottomRef = useRef<HTMLDivElement>(null)
  const { contextSafe } = useGSAP({ scope: menuRef })

  const isMobile = () => window.matchMedia('(max-width: 425px)').matches

  const toggleMenu = contextSafe(() => {
    if (isMobile()) {
      if (isOpen) {
        closeMenuAnimation(
          menuRef.current!,
          burgerTopRef.current!,
          burgerMiddleRef.current!,
          burgerBottomRef.current!
        )
        document.body.style.overflow = ''
      } else {
        openMenuAnimation(
          menuRef.current!,
          burgerTopRef.current!,
          burgerMiddleRef.current!,
          burgerBottomRef.current!
        )
        document.body.style.overflow = 'hidden'
      }
      setIsOpen(!isOpen)
    } else {
      setIsOpen(false)
      document.body.style.overflow = ''
    }
  })

  return (
    <>
      <button
        className={styles.burgerButton}
        onClick={toggleMenu}
        aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
        aria-expanded={isOpen}
        aria-controls="main-navigation"
      >
        <div ref={burgerTopRef} className={styles.burgerLine}></div>
        <div ref={burgerMiddleRef} className={styles.burgerLine}></div>
        <div ref={burgerBottomRef} className={styles.burgerLine}></div>
      </button>
      <nav
        id="main-navigation"
        ref={menuRef}
        className={styles.fullscreenMenu}
        aria-label="Navigation principale"
      >
        <ul>
          {links.map((link) => (
            <li key={link.name} className={'md:ml-0 cursor-pointer'}>
              <Link
                href={link.href}
                className={clsx(
                  'text-2xl md:text-base font-bold md:font-medium hover:text-secondary',
                  {
                    'text-secondary': pathname === link.href,
                  }
                )}
                onClick={toggleMenu}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className="hidden md:flex md:ml-4 md:self-end">
          <ThemeToggle />
        </div>
      </nav>
    </>
  )
}
