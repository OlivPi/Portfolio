import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

const useCarousel = (slideCount: number) => {
  const carouselRef = useRef<HTMLDivElement | null>(null)
  const tl = useRef<gsap.core.Timeline | null>(null)
  const currentIndex = useRef(0)
  const [visibleSlides, setVisibleSlides] = useState(3)
  const [activeIndex, setActiveIndex] = useState(0)

  const pageCount = Math.max(slideCount - visibleSlides + 1, 1)

  useEffect(() => {
    const updateVisibleSlides = () => {
      const screenWidth = window.innerWidth
      if (screenWidth <= 640) {
        setVisibleSlides(1)
      } else if (screenWidth <= 1024) {
        setVisibleSlides(2)
      } else {
        setVisibleSlides(3)
      }
    }

    updateVisibleSlides()

    let debounceTimer: ReturnType<typeof setTimeout>
    const handleResize = () => {
      clearTimeout(debounceTimer)
      debounceTimer = setTimeout(updateVisibleSlides, 150)
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(debounceTimer)
    }
  }, [])

  useGSAP(() => {
    if (!carouselRef.current) return

    const slides = gsap.utils.toArray(
      carouselRef.current.children
    ) as HTMLElement[]

    tl.current = gsap.timeline({ paused: true }).to(slides, {
      xPercent: -100 * (slideCount - visibleSlides),
      ease: 'none',
      duration: slideCount - visibleSlides,
    })

    return () => {
      tl.current?.kill()
    }
  }, [slideCount, visibleSlides])

  const nextSlide = () => {
    if (currentIndex.current < slideCount - visibleSlides) {
      currentIndex.current += 1
    } else {
      currentIndex.current = 0
    }
    setActiveIndex(currentIndex.current)
    tl.current?.tweenTo(currentIndex.current, { duration: 0.5 })
  }

  const prevSlide = () => {
    if (currentIndex.current > 0) {
      currentIndex.current -= 1
    } else {
      currentIndex.current = slideCount - visibleSlides
    }
    setActiveIndex(currentIndex.current)
    tl.current?.tweenTo(currentIndex.current, { duration: 0.5 })
  }

  // Refs stables pour que le handler tactile appelle toujours la version à jour
  const nextSlideRef = useRef(nextSlide)
  const prevSlideRef = useRef(prevSlide)
  nextSlideRef.current = nextSlide
  prevSlideRef.current = prevSlide

  useEffect(() => {
    const el = carouselRef.current
    if (!el) return

    let startX = 0

    const onTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX
    }

    const onTouchEnd = (e: TouchEvent) => {
      const delta = startX - e.changedTouches[0].clientX
      if (Math.abs(delta) > 50) {
        if (delta > 0) nextSlideRef.current()
        else prevSlideRef.current()
      }
    }

    el.addEventListener('touchstart', onTouchStart, { passive: true })
    el.addEventListener('touchend', onTouchEnd, { passive: true })

    return () => {
      el.removeEventListener('touchstart', onTouchStart)
      el.removeEventListener('touchend', onTouchEnd)
    }
  }, [])

  return {
    carouselRef,
    nextSlide,
    prevSlide,
    visibleSlides,
    activeIndex,
    pageCount,
  }
}

export default useCarousel
