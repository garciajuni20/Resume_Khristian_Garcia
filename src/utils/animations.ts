export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const scaleIn = {
  initial: { scale: 0.9, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.9, opacity: 0 }
};

export const slideIn = (direction: 'left' | 'right' | 'up' | 'down' = 'left') => {
  const directions = {
    left: { x: -100, y: 0 },
    right: { x: 100, y: 0 },
    up: { x: 0, y: -100 },
    down: { x: 0, y: 100 }
  };
  
  return {
    initial: { ...directions[direction], opacity: 0 },
    animate: { x: 0, y: 0, opacity: 1 },
    exit: { ...directions[direction], opacity: 0 }
  };
};

export const rotateIn = {
  initial: { rotate: -5, opacity: 0 },
  animate: { rotate: 0, opacity: 1 },
  exit: { rotate: 5, opacity: 0 }
};

export const pulseAnimation = {
  initial: { scale: 1 },
  animate: { 
    scale: [1, 1.02, 1],
    transition: { 
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export const floatingAnimation = {
  initial: { y: 0 },
  animate: { 
    y: [0, -10, 0],
    transition: { 
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};