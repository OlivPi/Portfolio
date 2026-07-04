'use client'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export default function ScrollReveal({
  children,
  className,
  delay = 0,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!ref.current) return
      gsap.fromTo(
        ref.current,
        { autoAlpha: 0, y: 40 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          delay,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 88%',
          },
        }
      )
    },
    { scope: ref }
  )

  return (
    <div ref={ref} className={className} style={{ opacity: 0 }}>
      {children}
    </div>
  )
}
