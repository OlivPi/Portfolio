import { gsap } from 'gsap';

export const openMenuAnimation = (
  menuRef: HTMLDivElement,
  burgerTopRef: HTMLDivElement,
  burgerMiddleRef: HTMLDivElement,
  burgerBottomRef: HTMLDivElement
) => {
  gsap.to(menuRef, { x: '0', duration: 0.5, ease: 'power2.out', zIndex: 10});
  gsap.to(burgerTopRef, { rotate: 45, y: 8, duration: 0.3 });
  gsap.to(burgerMiddleRef, { opacity: 0, duration: 0.3 });
  gsap.to(burgerBottomRef, { rotate: -45, y: -8, duration: 0.3 });
};

export const closeMenuAnimation = (
  menuRef: HTMLDivElement,
  burgerTopRef: HTMLDivElement,
  burgerMiddleRef: HTMLDivElement,
  burgerBottomRef: HTMLDivElement
) => {
  gsap.to(menuRef, { x: '100%', duration: 0.5, ease: 'power2.out'});
  gsap.to(burgerTopRef, { rotate: 0, y: 0, duration: 0.3 });
  gsap.to(burgerMiddleRef, { opacity: 1, duration: 0.3 });
  gsap.to(burgerBottomRef, { rotate: 0, y: 0, duration: 0.3 });
};