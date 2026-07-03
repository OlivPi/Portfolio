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
    remove: () => {
      if (document.body.contains(bg)) document.body.removeChild(bg)
    },
  }
}

// Exit: page disappears instantly behind an overlay that fades in.
// Timeline duration = 1s to match SwitchTransition timeout.
export const pageTransitionExit = (node: HTMLElement, color: string) => {
  const { bg, remove } = createBackground(color)

  gsap.set(node, { autoAlpha: 0 })

  return gsap
    .timeline({
      paused: true,
      onComplete: remove,
    })
    .to(bg, { opacity: 1, duration: 0.5, ease: 'power2.inOut' })
    .to({}, { duration: 0.5 }) // hold overlay until SwitchTransition swaps components
    .play()
}

// Enter: overlay starts fully opaque, fades out to reveal the new page.
export const pageTransitionEnter = (
  node: HTMLElement,
  color: string,
  toggleCompleted: (completed: boolean) => void
) => {
  const { bg, remove } = createBackground(color)

  gsap.set(node, { autoAlpha: 1 })
  gsap.set(bg, { opacity: 1 })

  return gsap
    .timeline({
      paused: true,
      onComplete: () => {
        toggleCompleted(true)
        remove()
      },
    })
    .to(bg, { opacity: 0, duration: 0.7, ease: 'power2.out' })
    .play()
}
