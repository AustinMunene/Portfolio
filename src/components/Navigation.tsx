import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, HomeIcon } from 'lucide-react';
import { motion } from 'framer-motion';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { 
      path: '/', 
      label: <HomeIcon className="w-5 h-5" />,
      isHome: true 
    },
    { path: '/career', label: 'Career' },
    { path: '/blog', label: 'Blog' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-gray-900/80 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link
            to="/"
            className="text-2xl md:text-3xl font-bold gradient-text hover:scale-105 transition-transform"
          >
            Austin
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center justify-center transition-all ${
                  link.isHome 
                    ? 'w-10 h-10 rounded-full bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50 hover:border-[#00D1FF]/50' 
                    : ''
                } ${
                  location.pathname === link.path
                    ? 'text-[#00D1FF]'
                    : 'text-gray-400 hover:text-[#00D1FF]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Navigation Button */}
          <button
            className="md:hidden text-gray-400 hover:text-[#00D1FF] transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <motion.div
          initial={false}
          animate={{ height: isOpen ? 'auto' : 0 }}
          className="md:hidden overflow-hidden"
        >
          <div className="py-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center transition-all ${
                  link.isHome 
                    ? 'w-10 h-10 rounded-full bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50 hover:border-[#00D1FF]/50' 
                    : 'block'
                } ${
                  location.pathname === link.path
                    ? 'text-[#00D1FF]'
                    : 'text-gray-400 hover:text-[#00D1FF]'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navigation; 