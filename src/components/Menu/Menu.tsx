'use client'

import { useState, useRef } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useGSAP } from '@gsap/react';
import clsx from 'clsx'
import styles from './menu.module.scss'
import { openMenuAnimation, closeMenuAnimation } from '@/utils/animations/menuMobile';

const links = [
  { href: '/', name: 'Home' },
  { href: '/web-projects', name: 'Projets Web' },
  { href: '/event-com', name: "Évenementiel et communication" },
  { href: '/contact', name: 'Contact' },
]

export default function Menu() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const burgerTopRef = useRef<HTMLDivElement>(null);
  const burgerMiddleRef = useRef<HTMLDivElement>(null);
  const burgerBottomRef = useRef<HTMLDivElement>(null);
  const { contextSafe } = useGSAP({scope: menuRef})

  const isMobile = () => window.matchMedia('(max-width: 425px)').matches;

  const toggleMenu = contextSafe(() => {
    if (isMobile()) {
      if (isOpen) {
        openMenuAnimation(menuRef.current!, burgerTopRef.current!, burgerMiddleRef.current!, burgerBottomRef.current!);
        document.body.style.overflow = 'hidden';
      } else {
        closeMenuAnimation(menuRef.current!, burgerTopRef.current!, burgerMiddleRef.current!, burgerBottomRef.current!);
        document.body.style.overflow = '';
      }
      setIsOpen(!isOpen);
    } else {
      setIsOpen(false);
      document.body.style.overflow = '';
    }
  });

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
        className={styles.fullscreenMenu}
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
      </nav>
    </>
  )
}