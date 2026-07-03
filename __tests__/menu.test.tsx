import { render, screen, fireEvent } from '@testing-library/react';
import Menu from '@/components/Menu/Menu';
import { usePathname } from 'next/navigation';
import '@testing-library/jest-dom';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}))

jest.mock('@/utils/animations/menuMobile', () => ({
  openMenuAnimation: jest.fn(),
  closeMenuAnimation: jest.fn(),
}))

import { openMenuAnimation, closeMenuAnimation } from '@/utils/animations/menuMobile'

describe('Menu', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(usePathname as jest.Mock).mockReturnValue('/event-com')
    // jsdom n'implémente pas matchMedia : simule un viewport mobile
    window.matchMedia = jest.fn().mockReturnValue({ matches: true })
    document.body.style.overflow = ''
  })

  it('renders all navigation links', () => {
    render(<Menu />)

    expect(screen.getByRole('link', { name: /Projets Web/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Évenementiel et communication/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Contact/i })).toBeInTheDocument()
  })

  it('applies active class to the current link', () => {
    render(<Menu />)

    const activeLink = screen.getByRole('link', { name: /Évenementiel et communication/i })
    expect(activeLink).toHaveClass('text-secondary')
  })

  it('does not apply active class to non-active links', () => {
    render(<Menu />)

    const nonActiveLink = screen.getByRole('link', { name: /Projets Web/i })
    expect(nonActiveLink).not.toHaveClass('text-secondary')
  })

  it('renders burger button in mobile mode', () => {
    render(<Menu />)

    const burgerButton = screen.getByRole('button')
    expect(burgerButton).toBeInTheDocument()
  })

  it('toggles the mobile menu when burger button is clicked', () => {
    render(<Menu />)

    const burgerButton = screen.getByRole('button')

    fireEvent.click(burgerButton)
    expect(openMenuAnimation).toHaveBeenCalledTimes(1)
    expect(document.body.style.overflow).toBe('hidden')

    fireEvent.click(burgerButton)
    expect(closeMenuAnimation).toHaveBeenCalledTimes(1)
    expect(document.body.style.overflow).toBe('')
  })
})