'use client'
import React from 'react'
import useCarousel from './useCarousel'
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl'
import styles from './carousel.module.scss'

interface CarouselProps {
  children: React.ReactNode[]
}

const Carousel = ({ children }: CarouselProps) => {
  const slideCount = React.Children.count(children)
  const { carouselRef, visibleSlides, nextSlide, prevSlide } =
    useCarousel(slideCount)

  return (
    <div className={styles.carouselContainer}>
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
      <div className={styles.navigationButtons}>
        <button
          className={styles.arrowButton}
          onClick={prevSlide}
          aria-label="Slide précédente"
        >
          <SlArrowLeft aria-hidden="true" />
        </button>
        <button
          className={styles.arrowButton}
          onClick={nextSlide}
          aria-label="Slide suivante"
        >
          <SlArrowRight aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}

export default Carousel
