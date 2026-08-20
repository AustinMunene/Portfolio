import { useState, useEffect, useRef, useCallback } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Github, Mail, Linkedin, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../hooks/useTheme';
import { useDuration } from '../hooks/useMobileReducedDuration';

/**
 * Theme toggle. The two icons cross-fade and counter-rotate through the same
 * slot rather than swapping, so the control reads as one object changing state.
 * Shows the theme you would switch *to*, which is the convention users expect.
 */
const ThemeToggle = ({ theme, onToggle }: { theme: 'light' | 'dark'; onToggle: () => void }) => (
  <button
    onClick={onToggle}
    className="relative flex items-center justify-center w-8 h-8 rounded-full border border-line bg-surface-raised text-fg-muted hover:text-fg transition-colors duration-200 active:scale-90 overflow-hidden"
    aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
  >
    <AnimatePresence initial={false} mode="popLayout">
      <motion.span
        key={theme}
        initial={{ opacity: 0, rotate: -70, scale: 0.6 }}
        animate={{ opacity: 1, rotate: 0, scale: 1 }}
        exit={{ opacity: 0, rotate: 70, scale: 0.6 }}
        transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
        className="absolute inset-0 flex items-center justify-center"
      >
        {theme === 'dark' ? (
          <Sun className="w-4 h-4 stroke-[1.8px]" />
        ) : (
          <Moon className="w-4 h-4 stroke-[1.8px]" />
        )}
      </motion.span>
    </AnimatePresence>
  </button>
);

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { theme, toggle } = useTheme();
  const indicatorRef = useRef<HTMLDivElement>(null);
  const navLinksRef = useRef<HTMLDivElement>(null);
  const dur = useDuration(1);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Slide the underline to the active link.  Uses getBoundingClientRect for
  // a precise position rather than layoutId / FLIP, which causes layout
  // recalculation flicker on mobile.
  const updateIndicator = useCallback(() => {
    const container = navLinksRef.current;
    const indicator = indicatorRef.current;
    if (!container || !indicator) return;
    const activeLink = container.querySelector('[aria-current="page"]') as HTMLElement | null;
    if (!activeLink) {
      indicator.style.opacity = '0';
      return;
    }
    const containerRect = container.getBoundingClientRect();
    const linkRect = activeLink.getBoundingClientRect();
    indicator.style.opacity = '1';
    indicator.style.width = `${linkRect.width}px`;
    indicator.style.transform = `translateX(${linkRect.left - containerRect.left}px)`;
  }, []);

  useEffect(() => {
    updateIndicator();
  }, [location.pathname, updateIndicator]);

  const navItems = [
    { to: '/career', label: 'Career' },
    { to: '/blog', label: 'Blog' },
    { to: '/interactive', label: 'Interactive' },
  ];

  const socialLinks = [
    { href: 'https://github.com/AustinMunene', icon: Github, label: 'GitHub Profile' },
    { href: 'https://www.linkedin.com/in/austin-munene/', icon: Linkedin, label: 'LinkedIn Profile' },
    { href: 'mailto:saviusmunene@gmail.com', icon: Mail, label: 'Email Contact' },
  ];

  return (
    <nav className="nav-island">
      <div className="px-5 py-3 md:py-3.5 flex justify-between items-center relative">
        
        {/* Brand Trigger Logo */}
        <NavLink to="/" className="text-lg font-bold tracking-tight select-none active:scale-95 transition-transform duration-200">
          <span className="text-fg font-display text-xl">
            AM
          </span>
        </NavLink>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-7" ref={navLinksRef}>
          {/* Sliding underline — positioned absolutely and moved via transform
              rather than layoutId / FLIP.  CSS transition handles the slide;
              no framer-motion layout measurements means no mobile flicker. */}
          <div
            ref={indicatorRef}
            className="absolute -bottom-1.5 left-0 h-[2.5px] bg-brand rounded-full transition-[width,transform] ease-[var(--ease-out)]"
            style={{ transitionDuration: `${dur * 200}ms`, opacity: 0 }}
          />
          {navItems.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `relative py-1 text-sm tracking-wide font-medium transition-colors duration-200 select-none ${
                  isActive
                    ? 'text-brand'
                    : 'text-fg-muted hover:text-fg'
                }`
              }
            >
              {label}
            </NavLink>
          ))}

          {/* Vertical Divider */}
          <div className="h-4 w-px bg-line" aria-hidden />

          {/* Social Profiles */}
          <div className="flex gap-4">
            {socialLinks.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                className="text-fg-muted hover:text-fg transition-transform duration-200 active:scale-90 hover:scale-105"
                aria-label={label}
              >
                <Icon className="w-4.5 h-4.5 stroke-[1.8px]" />
              </a>
            ))}
          </div>

          <ThemeToggle theme={theme} onToggle={toggle} />
        </div>

        {/* Animated Hamburger Trigger Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 rounded-full border border-line bg-surface-raised transition-transform duration-150 active:scale-90"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          <div className="relative w-4 h-3.5 flex flex-col justify-between">
            <span
              className={`w-4 h-0.5 bg-fg-muted rounded transition-transform duration-300 origin-top-left ${
                isMenuOpen ? 'rotate-45 translate-x-1 -translate-y-0.5' : ''
              }`}
            />
            <span
              className={`w-3.5 h-0.5 bg-fg-muted rounded transition-opacity duration-200 ${
                isMenuOpen ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`w-4 h-0.5 bg-fg-muted rounded transition-transform duration-300 origin-bottom-left ${
                isMenuOpen ? '-rotate-45 translate-x-0.5 translate-y-0.5' : ''
              }`}
            />
          </div>
        </button>

        {/* Dropdown Menu Overlay inside the Navigation Island */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -8 }}
              transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
              className="absolute top-[calc(100%+12px)] left-0 right-0 p-5 rounded-[20px] bg-surface backdrop-blur-2xl border border-line shadow-2xl flex flex-col space-y-4"
            >
              <div className="flex flex-col space-y-2">
                {navItems.map(({ to, label }) => (
                  <NavLink
                    key={to}
                    to={to}
                    className={({ isActive }) =>
                      `block py-2.5 px-4 rounded-xl text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? 'text-brand bg-brand-soft border border-brand-line'
                          : 'text-fg-muted hover:text-fg hover:bg-surface-raised border border-transparent'
                      }`
                    }
                  >
                    {label}
                  </NavLink>
                ))}
              </div>

              {/* Horizontal Divider */}
              <div className="h-px bg-line w-full" aria-hidden />

              {/* Mobile socials, plus the theme toggle - it lives in the desktop
                  bar too, and mobile visitors need it just as much. */}
              <div className="flex items-center justify-around py-1">
                {socialLinks.map(({ href, icon: Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith('mailto') ? undefined : '_blank'}
                    rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                    className="flex items-center justify-center w-10 h-10 rounded-full border border-line bg-surface-raised text-fg-muted hover:text-fg active:scale-95 transition-transform"
                    aria-label={label}
                  >
                    <Icon className="w-5 h-5 stroke-[1.8px]" />
                  </a>
                ))}
                <ThemeToggle theme={theme} onToggle={toggle} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
