import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail } from 'lucide-react';

const navItems = [
  { to: '/career', label: 'Career' },
  { to: '/blog', label: 'Blog' },
  { to: '/interactive', label: 'Interactive' },
];

const socials = [
  { href: 'https://github.com/AustinMunene', icon: Github, label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/austin-munene/', icon: Linkedin, label: 'LinkedIn' },
  { href: 'mailto:saviusmunene@gmail.com', icon: Mail, label: 'Email' },
];

/**
 * Site footer.
 *
 * The routes here duplicate the navbar's on purpose: someone who has read to the
 * bottom of a page should not have to scroll back up to go anywhere else. Only
 * the year is dynamic - a hardcoded one silently goes stale every January.
 */
const Footer = () => (
  <footer className="relative container mx-auto px-6 pt-12 pb-10 mt-28 z-10">
    <div className="absolute top-0 left-0 right-0 h-px bg-line" />

    <div className="flex flex-col md:flex-row md:items-start justify-between gap-10 mb-10">
      <div className="max-w-xs">
        <Link
          to="/"
          className="font-display text-xl text-fg hover:opacity-80 transition-opacity"
        >
          Austin Munene
        </Link>
        <p className="text-sm text-fg-muted mt-3 leading-relaxed">
          Frontend + QA Engineer delivering reliable, production-ready user experiences.
        </p>
      </div>

      <nav aria-label="Footer" className="flex flex-col gap-3">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-fg-subtle">
          Pages
        </h2>
        {navItems.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            className="text-sm text-fg-muted hover:text-fg transition-colors w-fit"
          >
            {label}
          </Link>
        ))}
      </nav>

      <div className="flex flex-col gap-3">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-fg-subtle">
          Elsewhere
        </h2>
        <div className="flex items-center gap-2">
          {socials.map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto:') ? undefined : '_blank'}
              rel="noopener noreferrer"
              aria-label={label}
              className="glass-pill w-10 h-10 rounded-full flex items-center justify-center text-fg-muted hover:text-fg hover:border-brand-line"
            >
              <Icon className="w-4 h-4" />
            </a>
          ))}
        </div>
        <a
          href="mailto:saviusmunene@gmail.com"
          className="text-sm text-fg-muted hover:text-fg transition-colors w-fit"
        >
          saviusmunene@gmail.com
        </a>
      </div>
    </div>

    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-line">
      <p className="text-fg-subtle text-sm">
        © {new Date().getFullYear()} Austin Munene
      </p>
      <a
        href="#top"
        className="text-fg-muted hover:text-fg transition-colors duration-200 text-sm select-none active:scale-95"
      >
        Back to Top
      </a>
    </div>
  </footer>
);

export default Footer;
