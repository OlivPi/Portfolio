'use client'
import { useEffect, useState } from 'react'
import { FaSun, FaMoon } from 'react-icons/fa'

export default function ThemeToggle() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('theme')
    setDark(stored === 'dark')
  }, [])

  const toggle = () => {
    const next = !dark
    setDark(next)
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
