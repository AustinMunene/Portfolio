import type { ReactNode } from 'react';

type BezelProps = {
  children: ReactNode;
  /** Extra classes on the outer tray. */
  className?: string;
  /** Extra classes on the inner plate. */
  innerClassName?: string;
};

/**
 * Double-bezel shell: an outer tray wrapping a nested inner plate, which is what
 * gives cards and consoles the machined-hardware read.
 *
 * The visual definition lives in `.double-bezel-outer` / `.double-bezel-inner`
 * (index.css). Keeping it there rather than inlining Tailwind means the radii,
 * shadows and hover accent only exist in one place.
 */
const Bezel = ({ children, className = '', innerClassName = '' }: BezelProps) => (
  <div className={`double-bezel-outer ${className}`}>
    <div className={`double-bezel-inner overflow-hidden ${innerClassName}`}>{children}</div>
  </div>
);

export default Bezel;
