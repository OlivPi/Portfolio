import { useState, useRef } from 'react';
import gsap from 'gsap'

const useCarousel = (slideCount: number, visibleSlides: number) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement | null>(null);

  const goToSlide = (index: number) => {
    if (carouselRef.current) {
      const slideWidth = carouselRef.current!.querySelector('div')?.clientWidth || 0;
      gsap.to(carouselRef.current, {
        x: -index * slideWidth,
        duration: 0.5,
        ease: 'power2.inOut',
      });
      setCurrentIndex(index);
    }
  };

  const nextSlide = () => {
    const nextIndex = currentIndex + visibleSlides >= slideCount ? 0 : currentIndex + 1;
    goToSlide(nextIndex);
  };

  const prevSlide = () => {
    const prevIndex = currentIndex === 0 ? slideCount - visibleSlides : currentIndex - 1;
    goToSlide(prevIndex);
  };

  return {
    carouselRef,
    currentIndex,
    goToSlide,
    nextSlide,
    prevSlide,
  };
};

export default useCarousel;