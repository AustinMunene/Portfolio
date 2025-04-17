import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Github, Mail, Linkedin, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800/50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <NavLink to="/" className="text-xl font-bold gradient-text">
            AM
          </NavLink>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink
              to="/career"
              className={({ isActive }) =>
                `nav-link text-gray-400 hover:text-white transition-colors ${
                  isActive ? 'text-white' : ''
                }`
              }
            >
              Career
            </NavLink>
            <NavLink
              to="/blog"
              className={({ isActive }) =>
                `nav-link text-gray-400 hover:text-white transition-colors ${
                  isActive ? 'text-white' : ''
                }`
              }
            >
              Blog
            </NavLink>
            <NavLink
              to="/interactive"
              className={({ isActive }) =>
                `nav-link text-gray-400 hover:text-white transition-colors ${
                  isActive ? 'text-white' : ''
                }`
              }
            >
              Interactive
            </NavLink>

            <div className="flex gap-6">
              <a
                href="https://github.com/Austin254"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link text-gray-400 hover:text-white transition-colors"
                aria-label="GitHub Profile"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/austin-munene/"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link text-gray-400 hover:text-white transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:austinmunene56@icloud.com"
                className="nav-link text-gray-400 hover:text-white transition-colors"
                aria-label="Email Contact"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden ${
            isMenuOpen ? 'block' : 'hidden'
          } pt-4 pb-2 space-y-4`}
        >
          <NavLink
            to="/career"
            className={({ isActive }) =>
              `block py-2 text-gray-400 hover:text-white transition-colors ${
                isActive ? 'text-white' : ''
              }`
            }
            onClick={() => setIsMenuOpen(false)}
          >
            Career
          </NavLink>
          <NavLink
            to="/blog"
            className={({ isActive }) =>
              `block py-2 text-gray-400 hover:text-white transition-colors ${
                isActive ? 'text-white' : ''
              }`
            }
            onClick={() => setIsMenuOpen(false)}
          >
            Blog
          </NavLink>
          <NavLink
            to="/interactive"
            className={({ isActive }) =>
              `block py-2 text-gray-400 hover:text-white transition-colors ${
                isActive ? 'text-white' : ''
              }`
            }
            onClick={() => setIsMenuOpen(false)}
          >
            Interactive
          </NavLink>

          <div className="flex gap-6 py-2">
            <a
              href="https://github.com/Austin254"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="GitHub Profile"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/austin-munene/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="mailto:austinmunene56@icloud.com"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Email Contact"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;