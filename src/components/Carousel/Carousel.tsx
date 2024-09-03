"use client";
import React, { useState, useEffect } from 'react';
import useCarousel from './useCarousel';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';
import styles from './carousel.module.scss';

interface CarouselProps {
  children: React.ReactNode[];
}

const Carousel = ({ children }: CarouselProps) => {
  const [visibleSlides, setVisibleSlides] = useState(3);
  const slideCount = React.Children.count(children);
  const { carouselRef, nextSlide, prevSlide } = useCarousel(slideCount, visibleSlides);

  useEffect(() => {
    const updateVisibleSlides = () => {
      if (carouselRef.current) {
        const containerWidth = carouselRef.current.clientWidth;
        const slideWidth = containerWidth / visibleSlides;
        const slidesVisible = Math.floor(containerWidth / slideWidth);
        setVisibleSlides(slidesVisible > 0 ? slidesVisible : 1);
      }
    };

    updateVisibleSlides();
    window.addEventListener('resize', updateVisibleSlides);

    return () => window.removeEventListener('resize', updateVisibleSlides);
  }, [carouselRef, visibleSlides]);

  return (
    <div className={styles.carouselContainer}>
      <div ref={carouselRef} className={styles.carouselWrapper}>
        {React.Children.map(children, (child, index) => (
          <div key={index} className={styles.carouselSlide} style={{ flexBasis: `${100 / visibleSlides}%` }}>
            {child}
          </div>
        ))}
      </div>
      <div className={styles.navigationButtons}>
        <SlArrowLeft className={styles.arrowButton} onClick={prevSlide} />
        <SlArrowRight className={styles.arrowButton} onClick={nextSlide} />
      </div>
    </div>
  );
};

export default Carousel;