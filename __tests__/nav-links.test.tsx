import { render, screen } from '@testing-library/react'
import Menu from '@/components/Menu/Menu'
import { usePathname } from 'next/navigation'
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}))

describe('Menu', () => {
  it('renders all navigation links', () => {
    ;(usePathname as jest.Mock).mockReturnValue('/reference')

    render(<Menu />)
    expect(
      screen.getByRole('link', { name: /Compétence/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: /Expériences/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: /Formations/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: /Centre d'intérêts/i })
    ).toBeInTheDocument()
  })

  it('applies active class to the current link', () => {
    ;(usePathname as jest.Mock).mockReturnValue('/reference')

    render(<Menu />)
    const activeLink = screen.getByRole('link', { name: /Expériences/i })

    expect(activeLink).toHaveClass('bg-sky-100 text-blue-600')
  })

  it('does not apply active class to non-active links', () => {
    ;(usePathname as jest.Mock).mockReturnValue('/reference')

    render(<Menu />)

    const nonActiveLink = screen.getByRole('link', { name: /Compétence/i })

    expect(nonActiveLink).not.toHaveClass('bg-sky-100 text-blue-600')
  })
})
