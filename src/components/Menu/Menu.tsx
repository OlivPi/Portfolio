'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import clsx from 'clsx'

const links = [
  { href: '/web-projects', name: 'Projets Web' },
  { href: '/reference', name: 'Expériences' },
  { href: '/event-com', name: "Évenementiel et communication" },
  { href: '/contact', name: 'Contact' },

]

export default function Menu() {
  const pathname = usePathname()

  return (
    <div className={'flex grow'}>
      {links.map((link) => {
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex grow items-center justify-center rounded-md p-3 text-sm font-medium hover:bg-sky-100 hover:text-black',
              {
                'bg-sky-100 text-blue-600': pathname === link.href,
              }
            )}
          >
            <p className="hidden md:block">{link.name}</p>
          </Link>
        )
      })}
    </div>
  )
}
