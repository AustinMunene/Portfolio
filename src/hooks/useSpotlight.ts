import { useCallback, useRef } from 'react';

/**
 * Tracks the pointer across an element and writes its position to CSS custom
 * properties (`--mx` / `--my`, in percent) for the `.spotlight` sheen.
 *
 * Values are written straight to the element's style rather than through React
 * state: this fires on every pointer move, and re-rendering at that rate would
 * be wasteful. Writing `transform`-adjacent custom props on the element itself
 * (not a shared parent) also avoids invalidating siblings.
 */
export function useSpotlight<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);

  const onPointerMove = useCallback((event: React.PointerEvent<T>) => {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    node.style.setProperty('--mx', `${x}%`);
    node.style.setProperty('--my', `${y}%`);
  }, []);

  return { ref, onPointerMove };
}

export default useSpotlight;
