import gsap from 'gsap';

// Fonction pour créer un fond coloré
const createBackground = (color: string) => {
  const bg = document.createElement('div');
  bg.style.position = 'fixed';
  bg.style.top = '0';
  bg.style.left = '0';
  bg.style.width = '100%';
  bg.style.height = '100%';
  bg.style.backgroundColor = color;
  bg.style.zIndex = '9999';
  bg.style.opacity = '0';
  document.body.appendChild(bg);

  return {
    bg,
    remove: () => document.body.removeChild(bg),
  };
};

// Animation d'entrée
export const pageTransitionEnter = (node: HTMLElement, color: string, toggleCompleted: (completed: boolean) => void) => {
  const { bg, remove } = createBackground(color);

  gsap.set(node, { duration: 0.5, autoAlpha: 0, scale: 0.5, xPercent: -100 });

  return gsap.timeline({
    paused: true,
    onComplete: () => {
      toggleCompleted(true);
      remove();
    },
  })
    .to(bg, { opacity: 1, duration: 0.5, ease: 'steps(12)' })
    .to(node, { autoAlpha: 1, scale: 1, xPercent: 0, duration: 0.8, ease: 'steps(12)' }, "-=0.4")
    .to(bg, { opacity: 0, duration: 1, ease: 'steps(12)' }, "-=0.2")
    .play();
};

// Animation de sortie
export const pageTransitionExit = (node: HTMLElement, color: string) => {
  const { bg, remove } = createBackground(color);

  gsap.set(node, { duration: 0.5, autoAlpha: 0 });

  return gsap.timeline({
    paused: true,
    onComplete: () => {
      remove();
    },
  })
    .to(bg, { opacity: 1, duration: 0.2, ease: 'steps(12)' })
    .to(node, { scale: 0.5, xPercent: 100, autoAlpha: 0, duration: 0.8, ease: 'steps(12)' }, "-=0.4")
    .to(bg, { opacity: 1, duration: 1, ease: 'steps(12)' }, "-=0.2")
    .play();
};