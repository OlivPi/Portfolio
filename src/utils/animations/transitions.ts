import gsap from 'gsap'

const createBackground = (color: string) => {
  const bg = document.createElement('div')
  bg.style.position = 'fixed'
  bg.style.top = '0'
  bg.style.left = '0'
  bg.style.width = '100%'
  bg.style.height = '100%'
  bg.style.backgroundColor = color
  bg.style.zIndex = '9999'
  bg.style.opacity = '0'
  document.body.appendChild(bg)

  return {
    bg,
    remove: () => document.body.removeChild(bg),
  }
}

export const pageTransitionEnter = (
  node: HTMLElement,
  color: string,
  toggleCompleted: (completed: boolean) => void
) => {
  const { bg, remove } = createBackground(color)

  gsap.set(node, { autoAlpha: 0, scale: 0.96, xPercent: -3 })

  return gsap
    .timeline({
      paused: true,
      onComplete: () => {
        toggleCompleted(true)
        remove()
      },
    })
    .to(bg, { opacity: 1, duration: 0.3, ease: 'power2.in' })
    .to(
      node,
      {
        autoAlpha: 1,
        scale: 1,
        xPercent: 0,
        duration: 0.6,
        ease: 'power3.out',
      },
      '-=0.1'
    )
    .to(bg, { opacity: 0, duration: 0.4, ease: 'power2.out' }, '-=0.3')
    .play()
}

export const pageTransitionExit = (node: HTMLElement, color: string) => {
  const { bg, remove } = createBackground(color)

  gsap.set(node, { autoAlpha: 1 })

  return gsap
    .timeline({
      paused: true,
      onComplete: () => {
        remove()
      },
    })
    .to(bg, { opacity: 1, duration: 0.25, ease: 'power2.in' })
    .to(
      node,
      {
        scale: 0.97,
        xPercent: 2,
        autoAlpha: 0,
        duration: 0.4,
        ease: 'power2.in',
      },
      '-=0.15'
    )
    .play()
}
