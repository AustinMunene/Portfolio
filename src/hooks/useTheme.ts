import { useCallback, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'theme';

/** Whatever the inline boot script in index.html already resolved and applied. */
const currentTheme = (): Theme =>
  document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';

/**
 * Theme state, kept in sync with the <html data-theme> attribute the boot script
 * sets before first paint.
 *
 * An explicit choice wins and persists. With no stored choice we follow the OS
 * and keep following it, so a visitor who changes their system setting mid-visit
 * sees the page follow - that listener is deliberately removed once they pick.
 */
export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(currentTheme);

  // Apply to the document whenever it changes. `color-scheme` is declared in CSS
  // per theme, so setting the attribute is enough to move UA widgets too.
  useEffect(() => {
    document.documentElement.dataset.theme = theme;

    // Keep the mobile browser chrome in step, or it stays dark under a light
    // page. Read back from --surface rather than repeating the hex here, so
    // this cannot drift from the theme it is meant to match - the attribute
    // above is already set, so the custom property resolves to the new theme.
    const surface = getComputedStyle(document.documentElement)
      .getPropertyValue('--surface')
      .trim();
    if (surface) {
      document.getElementById('theme-color')?.setAttribute('content', surface);
    }
  }, [theme]);

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY)) return;
    const media = window.matchMedia('(prefers-color-scheme: light)');
    const onChange = (e: MediaQueryListEvent) => setTheme(e.matches ? 'light' : 'dark');
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem(STORAGE_KEY, next);
      return next;
    });
  }, []);

  return { theme, toggle };
};
