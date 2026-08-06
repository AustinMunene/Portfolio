import type { ReactNode } from 'react';
import useSpotlight from '../hooks/useSpotlight';

type SpotlightSurfaceProps = {
  className?: string;
  children: ReactNode;
};

/**
 * Card surface with a pointer-tracked sheen and ambient depth.
 *
 * Exists as a component rather than a hook call at each site because most of
 * these cards are rendered inside a `.map()`, and hooks cannot run in a loop.
 * Callers keep their own classes; this only adds the two effect classes.
 */
const SpotlightSurface = ({ className = '', children }: SpotlightSurfaceProps) => {
  const { ref, onPointerMove } = useSpotlight<HTMLDivElement>();

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      className={`spotlight surface-depth ${className}`}
    >
      {children}
    </div>
  );
};

export default SpotlightSurface;
