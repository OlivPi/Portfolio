import { render, screen, fireEvent } from '@testing-library/react';
import Menu from '@/components/Menu/Menu';
import { usePathname } from 'next/navigation';
import '@testing-library/jest-dom';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}))

describe('Menu', () => {
  beforeEach(() => {
    ;(usePathname as jest.Mock).mockReturnValue('/event-com')
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
    global.innerWidth = 500
    global.dispatchEvent(new Event('resize'))

    render(<Menu />)

    const burgerButton = screen.getByRole('button')
    expect(burgerButton).toBeInTheDocument()
  })

  it('toggles the mobile menu when burger button is clicked', () => {
    global.innerWidth = 500
    global.dispatchEvent(new Event('resize'))

    render(<Menu />)

    const fullscreenMenu = screen.getByRole('navigation')
    expect(fullscreenMenu).toHaveClass('translate-x-full')

    const burgerButton = screen.getByRole('button')
    fireEvent.click(burgerButton)

    expect(fullscreenMenu).toHaveClass('translate-x-0')

    fireEvent.click(burgerButton)
    expect(fullscreenMenu).toHaveClass('translate-x-full')
  })
})