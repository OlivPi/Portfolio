"use client";
import React, { useEffect, useState } from 'react';
import useCarousel from './useCarousel';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import styles from './carousel.module.css';

interface CarouselProps {
  children: React.ReactNode[];
}

const Carousel = ({ children }: CarouselProps) => {
  const [visibleSlides, setVisibleSlides] = useState(1);
  const { carouselRef, nextSlide, prevSlide } = useCarousel(React.Children.count(children), visibleSlides);

  useEffect(() => {
    const updateVisibleSlides = () => {
      if (carouselRef.current) {
        const containerWidth = carouselRef.current!.clientWidth;
        const firstSlide = carouselRef.current!.querySelector('div');

        if (firstSlide) {
          const slideWidth = firstSlide.clientWidth;
          const slidesVisible = Math.floor(containerWidth / slideWidth);
          setVisibleSlides(slidesVisible > 0 ? slidesVisible : 1);
        }
      }
    };

    updateVisibleSlides();
    window.addEventListener('resize', updateVisibleSlides);

    return () => window.removeEventListener('resize', updateVisibleSlides);
  }, [carouselRef]);

  return (
    <div className={styles.carouselContainer}>
      <div ref={carouselRef} className={styles.carouselWrapper}>
        {React.Children.map(children, (child, index) => (
          <div key={index} className={styles.carouselSlide} style={{ flexBasis: `${60 / visibleSlides}%`, maxWidth: `${60 / visibleSlides}%` }}>
            {child}
          </div>
        ))}
      </div>
      <div className={styles.navigationButtons}>
        <IoIosArrowBack className={styles.arrowButton} onClick={prevSlide} />
        <IoIosArrowForward className={styles.arrowButton} onClick={nextSlide} />
      </div>
    </div>
  );
};

export default Carousel;