import { useRef } from 'react';
import { useScroll, useTransform, useReducedMotion, type MotionValue } from 'framer-motion';

/**
 * Moves a background layer slower than the page scrolls, so it sits visually
 * behind the content instead of travelling with it.
 *
 * `distance` is the total travel in pixels across the section's scroll range.
 * Positive values drift downward. Returns null for `y` under reduced-motion so
 * callers can skip the transform entirely.
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>(distance = 80) {
  const ref = useRef<T>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    // Track from the section entering the viewport to it leaving.
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-distance / 2, distance / 2]);

  return {
    ref,
    y: (reduceMotion ? null : y) as MotionValue<number> | null,
  };
}

export default useParallax;
