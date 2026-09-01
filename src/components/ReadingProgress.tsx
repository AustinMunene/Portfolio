import React, { useEffect, useRef, useState } from 'react';

/*
 * A hairline at the very top of the viewport showing how far through the article
 * you are. The longest post runs to 29 minutes and 39 sections, where the
 * browser scrollbar is the only sense of progress and it is measuring the whole
 * page rather than the article.
 *
 * Progress is measured against the article element, not the document, so the
 * footer and the nav do not count as reading.
 */
const ReadingProgress: React.FC<{ targetRef: React.RefObject<HTMLElement> }> = ({ targetRef }) => {
  const [progress, setProgress] = useState(0);
  const frame = useRef(0);

  useEffect(() => {
    const measure = () => {
      const el = targetRef.current;
      if (!el) return;

      const start = el.offsetTop;
      // The last screenful needs no scrolling to be read, so it is excluded from
      // the denominator - otherwise the bar never reaches the end of the article.
      const distance = el.offsetHeight - window.innerHeight;
      if (distance <= 0) {
        setProgress(0);
        return;
      }

      const scrolled = window.scrollY - start;
      setProgress(Math.min(1, Math.max(0, scrolled / distance)));
    };

    const onScroll = () => {
      cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame.current);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [targetRef]);

  return (
    <div
      className="fixed top-0 left-0 right-0 h-0.5 z-50 pointer-events-none"
      role="progressbar"
      aria-label="Reading progress"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress * 100)}
    >
      <div
        className="h-full bg-brand origin-left transition-transform duration-75 ease-out"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
};

export default ReadingProgress;
