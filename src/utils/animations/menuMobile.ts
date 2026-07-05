import { gsap } from 'gsap'

export const openMenuAnimation = (
  menuRef: HTMLDivElement,
  burgerTopRef: HTMLDivElement,
  burgerMiddleRef: HTMLDivElement,
  burgerBottomRef: HTMLDivElement
) => {
  const midRect = burgerMiddleRef.getBoundingClientRect()
  const yTop = midRect.top - burgerTopRef.getBoundingClientRect().top
  const yBottom = midRect.top - burgerBottomRef.getBoundingClientRect().top

  gsap.to(menuRef, { x: '0', duration: 0.5, ease: 'power2.out', zIndex: 10 })
  gsap.to(burgerTopRef, { rotate: 45, y: yTop, duration: 0.3 })
  gsap.to(burgerMiddleRef, { opacity: 0, duration: 0.3 })
  gsap.to(burgerBottomRef, { rotate: -45, y: yBottom, duration: 0.3 })
}

export const closeMenuAnimation = (
  menuRef: HTMLDivElement,
  burgerTopRef: HTMLDivElement,
  burgerMiddleRef: HTMLDivElement,
  burgerBottomRef: HTMLDivElement
) => {
  gsap.to(menuRef, { x: '100%', duration: 0.5, ease: 'power2.out' })
  gsap.to(burgerTopRef, { rotate: 0, y: 0, duration: 0.3 })
  gsap.to(burgerMiddleRef, { opacity: 1, duration: 0.3 })
  gsap.to(burgerBottomRef, { rotate: 0, y: 0, duration: 0.3 })
}
