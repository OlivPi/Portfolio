'use client'

import { useState, useRef } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { gsap } from 'gsap'
import clsx from 'clsx'
import styles from './menu.module.scss'

const links = [
  { href: '/web-projects', name: 'Projets Web' },
  { href: '/event-com', name: "Évenementiel et communication" },
  { href: '/contact', name: 'Contact' },
]

export default function Menu() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const burgerTopRef = useRef<HTMLDivElement>(null)
  const burgerMiddleRef = useRef<HTMLDivElement>(null)
  const burgerBottomRef = useRef<HTMLDivElement>(null)

  const toggleMenu = () => {
    setIsOpen(!isOpen)

    if (isOpen) {
      gsap.to(menuRef.current, { x: '100%', duration: 0.5, ease: 'power2.out' })
      gsap.to(burgerTopRef.current, { rotate: 0, y: 0, duration: 0.3 })
      gsap.to(burgerMiddleRef.current, { opacity: 1, duration: 0.3 })
      gsap.to(burgerBottomRef.current, { rotate: 0, y: 0, duration: 0.3 })
    } else {
      gsap.to(menuRef.current, { x: '0', duration: 0.5, ease: 'power2.out' })
      gsap.to(burgerTopRef.current, { rotate: 45, y: 8, duration: 0.3 })
      gsap.to(burgerMiddleRef.current, { opacity: 0, duration: 0.3 })
      gsap.to(burgerBottomRef.current, { rotate: -45, y: -8, duration: 0.3 })
    }
  }

  return (
    <>
      <button
        className={styles.burgerButton}
        onClick={toggleMenu}
      >
        <div ref={burgerTopRef} className={styles.burgerLine}></div>
        <div ref={burgerMiddleRef} className={styles.burgerLine}></div>
        <div ref={burgerBottomRef} className={styles.burgerLine}></div>
      </button>
      <nav
        ref={menuRef}
        className={clsx(styles.fullscreenMenu,
          { 'translate-x-full': !isOpen, 'translate-x-0': isOpen }
        )}
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
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}