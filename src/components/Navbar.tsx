import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Github, Mail, Linkedin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { to: '/career', label: 'Career' },
    { to: '/blog', label: 'Blog' },
    { to: '/interactive', label: 'Interactive' },
  ];

  const socialLinks = [
    { href: 'https://github.com/AustinMunene', icon: Github, label: 'GitHub Profile' },
    { href: 'https://www.linkedin.com/in/austin-munene/', icon: Linkedin, label: 'LinkedIn Profile' },
    { href: 'mailto:austinmunene56@icloud.com', icon: Mail, label: 'Email Contact' },
  ];

  return (
    <nav className="nav-island">
      <div className="px-5 py-3 md:py-3.5 flex justify-between items-center relative">
        
        {/* Brand Trigger Logo */}
        <NavLink to="/" className="text-lg font-bold tracking-tight select-none active:scale-95 transition-transform duration-200">
          <span className="bg-gradient-to-r from-accent-400 to-accent-300 bg-clip-text text-transparent font-space-grotesk font-semibold">
            AM
          </span>
        </NavLink>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-7">
          {navItems.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `relative py-1 text-sm tracking-wide font-medium font-space-grotesk transition-colors duration-200 select-none ${
                  isActive
                    ? 'text-accent-300'
                    : 'text-gray-400 hover:text-white'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute -bottom-1.5 left-0 right-0 h-[2.5px] bg-gradient-to-r from-accent-500 to-indigo-400 rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}

          {/* Vertical Divider */}
          <div className="h-4 w-px bg-white/10" aria-hidden />

          {/* Social Profiles */}
          <div className="flex gap-4">
            {socialLinks.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                className="text-gray-400 hover:text-accent-300 transition-transform duration-200 active:scale-90 hover:scale-105"
                aria-label={label}
              >
                <Icon className="w-4.5 h-4.5 stroke-[1.8px]" />
              </a>
            ))}
          </div>
        </div>

        {/* Animated Hamburger Trigger Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 rounded-full border border-white/10 bg-white/[0.03] transition-transform duration-150 active:scale-90"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          <div className="relative w-4 h-3.5 flex flex-col justify-between">
            <span
              className={`w-4 h-0.5 bg-gray-300 rounded transition-transform duration-300 origin-top-left ${
                isMenuOpen ? 'rotate-45 translate-x-1 -translate-y-0.5' : ''
              }`}
            />
            <span
              className={`w-3.5 h-0.5 bg-gray-300 rounded transition-opacity duration-200 ${
                isMenuOpen ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`w-4 h-0.5 bg-gray-300 rounded transition-transform duration-300 origin-bottom-left ${
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
              transition={{ duration: 250, ease: 'easeOut' }}
              className="absolute top-[calc(100%+12px)] left-0 right-0 p-5 rounded-[20px] bg-black/80 backdrop-blur-2xl border border-white/10 shadow-2xl flex flex-col space-y-4"
            >
              <div className="flex flex-col space-y-2">
                {navItems.map(({ to, label }) => (
                  <NavLink
                    key={to}
                    to={to}
                    className={({ isActive }) =>
                      `block py-2.5 px-4 rounded-xl text-sm font-medium font-space-grotesk transition-all duration-200 ${
                        isActive
                          ? 'text-accent-300 bg-accent-500/10 border border-accent-500/15'
                          : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
                      }`
                    }
                  >
                    {label}
                  </NavLink>
                ))}
              </div>

              {/* Horizontal Divider */}
              <div className="h-px bg-white/10 w-full" aria-hidden />

              {/* Mobile Socials */}
              <div className="flex justify-around py-1">
                {socialLinks.map(({ href, icon: Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith('mailto') ? undefined : '_blank'}
                    rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                    className="flex items-center justify-center w-10 h-10 rounded-full border border-white/5 bg-white/[0.02] text-gray-400 hover:text-accent-300 active:scale-95 transition-transform"
                    aria-label={label}
                  >
                    <Icon className="w-5 h-5 stroke-[1.8px]" />
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
