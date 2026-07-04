import gsap from 'gsap'

const getOverlay = () =>
  document.getElementById('page-overlay') as HTMLElement | null

export const pageTransitionExit = (node: HTMLElement) => {
  const overlay = getOverlay()
  if (!overlay) return

  gsap.set(node, { autoAlpha: 0 })
  gsap.set(overlay, { pointerEvents: 'auto' })
  gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.6, ease: 'sine.inOut' })
}

export const pageTransitionEnter = (
  node: HTMLElement,
  toggleCompleted: (completed: boolean) => void
) => {
  const overlay = getOverlay()

  gsap.set(node, { autoAlpha: 1 })

  if (!overlay) {
    toggleCompleted(true)
    return
  }

  gsap.set(overlay, { opacity: 1 })
  gsap.to(overlay, {
    opacity: 0,
    duration: 0.9,
    ease: 'sine.out',
    onComplete: () => {
      gsap.set(overlay, { pointerEvents: 'none' })
      toggleCompleted(true)
    },
  })
}
