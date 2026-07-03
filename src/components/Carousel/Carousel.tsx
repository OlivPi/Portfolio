'use client'
import React from 'react'
import useCarousel from './useCarousel'
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl'
import clsx from 'clsx'
import styles from './carousel.module.scss'

interface CarouselProps {
  children: React.ReactNode[]
}

const Carousel = ({ children }: CarouselProps) => {
  const slideCount = React.Children.count(children)
  const {
    carouselRef,
    visibleSlides,
    nextSlide,
    prevSlide,
    goToSlide,
    activeIndex,
    totalPages,
  } = useCarousel(slideCount)

  return (
    <div className={styles.carouselOuter}>
      <div className={styles.carouselContainer}>
        <button
          className={styles.arrowPrev}
          onClick={prevSlide}
          aria-label="Slide précédente"
        >
          <SlArrowLeft aria-hidden="true" />
        </button>

        <div ref={carouselRef} className={styles.carouselWrapper}>
          {React.Children.map(children, (child, index) => (
            <div
              key={index}
              className={styles.carouselSlide}
              style={{ flexBasis: `${100 / visibleSlides}%` }}
            >
              {child}
            </div>
          ))}
        </div>

        <button
          className={styles.arrowNext}
          onClick={nextSlide}
          aria-label="Slide suivante"
        >
          <SlArrowRight aria-hidden="true" />
        </button>
      </div>

      {totalPages > 1 && (
        <div
          className={styles.dots}
          role="tablist"
          aria-label="Navigation slides"
        >
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === activeIndex}
              aria-label={`Slide ${i + 1}`}
              className={clsx(styles.dot, {
                [styles.dotActive]: i === activeIndex,
              })}
              onClick={() => goToSlide(i)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Carousel
