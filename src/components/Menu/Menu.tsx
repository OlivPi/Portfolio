'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import clsx from 'clsx'

const links = [
  { href: '/web-projects', name: 'Projets Web' },
  { href: '/event-com', name: "Évenementiel et communication" },
  { href: '/contact', name: 'Contact' },

]

export default function Menu() {
  const pathname = usePathname()

  return (
    <nav className={'flex-col'}>
      {links.map((link) => {
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex justify-end p-1 text-base font-medium hover:text-secondary',
              {
                'text-secondary': pathname === link.href,
              }
            )}
          >
            <p className="hidden md:block">{link.name}</p>
          </Link>
        )
      })}
    </nav>
  )
}
