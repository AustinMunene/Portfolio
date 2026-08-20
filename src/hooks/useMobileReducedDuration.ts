import { useState, useEffect } from 'react';

const MOBILE_BREAKPOINT = 768;
const MOBILE_MULTIPLIER = 0.6;

/**
 * Returns a duration multiplier that shortens framer-motion animations on
 * mobile.  Shorter durations reduce the window for dropped frames during rapid
 * scroll and cut the visible "half-transparent" phase that reads as flicker
 * when multiple whileInView elements fire at once on a phone GPU.
 *
 * Desktop keeps full durations; mobile gets 60 % of them.
 */
export function useMobileReducedDuration() {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined'
      ? window.innerWidth <= MOBILE_BREAKPOINT
      : false,
  );

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return isMobile ? MOBILE_MULTIPLIER : 1;
}

/**
 * Shorthand that applies the multiplier to a duration value and rounds to two
 * decimals so framer-motion doesn't receive bloated floating-point numbers.
 */
export function useDuration(base: number) {
  const mult = useMobileReducedDuration();
  return Math.round(base * mult * 100) / 100;
}
