'use client'
import { useSyncExternalStore } from 'react'
import { FaSun, FaMoon } from 'react-icons/fa'

// La classe `dark` sur <html> est posée avant l'hydratation par le script
// inline de layout.tsx : on la prend comme source de vérité.
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class'],
  })
  return () => observer.disconnect()
}

const getSnapshot = () => document.documentElement.classList.contains('dark')
const getServerSnapshot = () => false

export default function ThemeToggle() {
  const dark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const toggle = () => {
    const next = !dark
    if (next) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  return (
    <button
      onClick={toggle}
      aria-label={dark ? 'Passer en mode clair' : 'Passer en mode sombre'}
      className="w-8 h-8 flex items-center justify-center hover:text-secondary transition-colors duration-200"
    >
      {dark ? <FaSun size={18} aria-hidden="true" /> : <FaMoon size={18} aria-hidden="true" />}
    </button>
  )
}
