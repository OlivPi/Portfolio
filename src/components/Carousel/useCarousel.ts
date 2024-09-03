import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';

gsap.registerPlugin(Draggable);

const useCarousel = (slideCount: number, visibleSlides: number) => {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const currentIndex = useRef(0);

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
  }, [slideCount, visibleSlides]);

  const nextSlide = () => {
    if (currentIndex.current < slideCount - 1) {
      currentIndex.current += 1;
    } else {
      currentIndex.current = 0;
    }
    if (tl.current) {
      tl.current.tweenTo(currentIndex.current);
    }
  };

  const prevSlide = () => {
    if (currentIndex.current > 0) {
      currentIndex.current -= 1;
    } else {
      currentIndex.current = slideCount - 1;
    }
    if (tl.current) {
      tl.current.tweenTo(currentIndex.current);
    }
  };

  return {
    carouselRef,
    nextSlide,
    prevSlide,
  };
};

export default useCarousel;