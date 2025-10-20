'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface AnimationWrapperProps {
  children: ReactNode;
  className?: string;
  animation?: 'fadeIn' | 'fadeUp' | 'slideIn' | 'slideUp' | 'scaleUp';
  delay?: number;
  duration?: number;
  once?: boolean;
}

const animations = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  },
  fadeUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  },
  slideIn: {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
  },
  slideUp: {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
  },
  scaleUp: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
  },
};

export default function AnimationWrapper({
  children,
  className = '',
  animation = 'fadeUp',
  delay = 0,
  duration = 0.5,
  once = true,
}: AnimationWrapperProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={animations[animation].initial}
      animate={isInView ? animations[animation].animate : animations[animation].initial}
      transition={{
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
        type: "tween",
      }}
    >
      {children}
    </motion.div>
  );
}