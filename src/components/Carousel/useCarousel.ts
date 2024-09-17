import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';

gsap.registerPlugin(Draggable);

const useCarousel = (slideCount: number) => {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const currentIndex = useRef(0);
  const [visibleSlides, setVisibleSlides] = useState(3);

  useEffect(() => {
    const updateVisibleSlides = () => {
      const screenWidth = window.innerWidth;

      if (screenWidth <= 640) {
        setVisibleSlides(1);
      } else if (screenWidth <= 1024) {
        setVisibleSlides(2);
      } else {
        setVisibleSlides(3);
      }
    };

    updateVisibleSlides();
    window.addEventListener('resize', updateVisibleSlides);

    // Cleanup listener on component unmount
    return () => window.removeEventListener('resize', updateVisibleSlides);
  }, []);

  useEffect(() => {
    if (carouselRef.current) {
      const slides = gsap.utils.toArray(carouselRef.current.children) as HTMLElement[];
      tl.current = gsap.timeline({ paused: true })
        .to(slides, {
          xPercent: -100 * (slideCount - visibleSlides),
          ease: 'none',
          duration: slideCount - visibleSlides,
        });

      Draggable.create(carouselRef.current, {
        type: 'x',
        bounds: carouselRef.current,
        inertia: true,
        onDrag: function () {
          const progress = this.x / this.maxX;
          tl.current?.progress(progress);
        },
        snap: {
          x: (endValue) => Math.round(endValue / carouselRef.current!.clientWidth) * carouselRef.current!.clientWidth,
        },
      });
    }
  }, [slideCount, visibleSlides]); // Re-run effect when visibleSlides changes

  const nextSlide = () => {
    if (currentIndex.current < slideCount - visibleSlides) {
      currentIndex.current += 1;
    } else {
      currentIndex.current = 0;
    }
    if (tl.current) {
      tl.current.tweenTo(currentIndex.current, { duration: 0.5 });
    }
  };

  const prevSlide = () => {
    if (currentIndex.current > 0) {
      currentIndex.current -= 1;
    } else {
      currentIndex.current = slideCount - visibleSlides;
    }
    if (tl.current) {
      tl.current.tweenTo(currentIndex.current, { duration: 0.5 });
    }
  };

  return {
    carouselRef,
    nextSlide,
    prevSlide,
    visibleSlides,
  };
};

export default useCarousel;