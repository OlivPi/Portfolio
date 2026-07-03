import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { Draggable } from 'gsap/Draggable'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(Draggable)

const useCarousel = (slideCount: number) => {
  const carouselRef = useRef<HTMLDivElement | null>(null)
  const tl = useRef<gsap.core.Timeline | null>(null)
  const currentIndex = useRef(0)
  const [visibleSlides, setVisibleSlides] = useState(3)
  const [activeIndex, setActiveIndex] = useState(0)

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

    const draggableInstance = Draggable.create(carouselRef.current, {
      type: 'x',
      bounds: carouselRef.current,
      inertia: true,
      onDrag: function () {
        const progress = this.x / this.maxX
        tl.current?.progress(progress)
      },
      snap: {
        x: (endValue) =>
          Math.round(endValue / carouselRef.current!.clientWidth) *
          carouselRef.current!.clientWidth,
      },
    })

    return () => {
      draggableInstance[0].kill()
      tl.current?.kill()
    }
  }, [slideCount, visibleSlides])

  const totalPages = Math.max(1, slideCount - visibleSlides + 1)

  const goToSlide = (index: number) => {
    currentIndex.current = index
    setActiveIndex(index)
    tl.current?.tweenTo(index, { duration: 0.5, ease: 'power2.out' })
  }

  const nextSlide = () => {
    const next =
      currentIndex.current < slideCount - visibleSlides
        ? currentIndex.current + 1
        : 0
    goToSlide(next)
  }

  const prevSlide = () => {
    const prev =
      currentIndex.current > 0
        ? currentIndex.current - 1
        : slideCount - visibleSlides
    goToSlide(prev)
  }

  return {
    carouselRef,
    nextSlide,
    prevSlide,
    goToSlide,
    visibleSlides,
    activeIndex,
    totalPages,
  }
}

export default useCarousel
