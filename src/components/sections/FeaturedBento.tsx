import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, Cpu, Terminal, Layers } from 'lucide-react';
import SpotlightSurface from '../SpotlightSurface';

export type BentoProject = {
  title: string;
  description: string;
  link: string;
  github?: string;
  roles?: string[];
  stack: string[];
  category?: 'Frontend' | 'QA' | 'Full-stack';
};

const FILTERS: Array<'All' | 'Frontend' | 'QA' | 'Full-stack'> = ['All', 'Frontend', 'Full-stack'];

type FeaturedBentoProps = {
  projects: BentoProject[];
};

const FeaturedBento = ({ projects }: FeaturedBentoProps) => {
  const [filter, setFilter] = useState<'All' | 'Frontend' | 'QA' | 'Full-stack'>('All');

  const filtered = useMemo(() => {
    if (filter === 'All') return projects;
    return projects.filter((p) => p.category === filter);
  }, [projects, filter]);

  // Map icons to project categories to reinforce the "prodev + mature QA" branding
  const getCategoryIcon = (category?: string) => {
    switch (category) {
      case 'Full-stack':
        return <Cpu className="w-4 h-4 text-fg-muted stroke-[1.2px]" />;
      case 'QA':
        return <Layers className="w-4 h-4 text-indigo-400 stroke-[1.2px]" />;
      default:
        return <Terminal className="w-4 h-4 text-emerald-400 stroke-[1.2px]" />;
    }
  };

  return (
    <section id="projects" className="relative py-28 md:py-36 overflow-hidden">
      {/* Absolute background layers for "Coder Schematic Vibe" */}
      <div className="absolute inset-0 bg-surface" aria-hidden />
      
      {/* Custom Schematic Lines and Blueprint Dots */}
      <div className="absolute inset-0 opacity-[0.035] pointer-events-none select-none" aria-hidden="true">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#d4d4d8" strokeWidth="1" />
            </pattern>
            <pattern id="dotGrid" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="1" fill="#e4e4e7" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dotGrid)" />
          {/* Subtle diagonal circuit/wiring schematic line vectors */}
          <path d="M-100 200 L 300 600 M1200 100 L 1500 400 M600 800 L 900 1100" stroke="#d4d4d8" strokeWidth="1.5" strokeDasharray="5 5" />
          <path d="M200 100 L 250 150 L 500 150" stroke="#e4e4e7" strokeWidth="1" fill="none" />
          <path d="M1000 700 L 1050 750 L 1300 750" stroke="#e4e4e7" strokeWidth="1" fill="none" />
        </svg>
      </div>

      {/* Radiant Glow Orb backdrop to blend gradient shades */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-accent-600/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-indigo-600/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Clean border separators */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-500/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-500/10 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          viewport={{ once: true }}
          className="mb-14 md:mb-20 max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent-500/15 bg-accent-500/5 text-fg text-xs uppercase tracking-[0.15em] font-semibold mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-brand" />
            Engineering Casebook
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display tracking-tight mb-5 text-fg">
            Selected Creations
          </h2>
          
          <p className="text-base md:text-lg text-fg-muted font-normal leading-relaxed max-w-2xl">
            A production-ready catalog showcasing modern, robust frontends, bulletproof automation systems, and high-fidelity consumer platforms.
          </p>

          {/* Filter Chips - Upgraded with High-End Active Motion */}
          <div className="flex flex-wrap gap-2.5 mt-8">
            {FILTERS.map((f) => {
              const isActive = filter === f;
              return (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`relative px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider select-none transition-all duration-200 outline-none ${
                    isActive
                      ? 'text-brand border border-brand/30 bg-brand-soft'
                      : 'text-fg-muted border border-line bg-surface-raised hover:border-line hover:text-fg-muted hover:bg-surface-raised'
                  }`}
                  style={{
                    boxShadow: isActive ? '0 0 20px rgba(212, 212, 216, 0.1)' : undefined
                  }}
                >
                  {/* Micro Pulse Active Indicator inside chip */}
                  {isActive && (
                    <motion.span
                      layoutId="chip-indicator"
                      className="absolute inset-0 rounded-full border border-brand/25 pointer-events-none"
                      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    {f === 'All' ? null : getCategoryIcon(f)}
                    {f}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Asymmetric Bento Masonry Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {filtered.length === 0 ? (
              <p className="text-fg-subtle col-span-full font-mono text-sm py-12 text-center border border-dashed border-line rounded-2xl">
                [SYSTEM_WARN]: No creations found in this category.
              </p>
            ) : (
              filtered.map((project, index) => {
                // Introduce structural rhythm:
                // Primary/large card (index 0) gets a double-width col span.
                // Every 4th card (e.g. index 3) gets col-span-2 on large screens to create asymmetrical masonry tension.
                const isFeatured = index === 0;
                const isWide = isFeatured || (index === 3 && filtered.length > 3);
                
                return (
                  <motion.div
                    key={project.title + index}
                    initial={{ y: 32, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: Math.min(index * 0.05, 0.25), ease: [0.23, 1, 0.32, 1] }}
                    viewport={{ once: true, margin: "-50px" }}
                    className={`group ${isWide ? 'md:col-span-2' : 'col-span-1'}`}
                  >
                    {/* Double-Bezel (Doppelrand) Enclosure Pattern */}
                    <div className="rounded-[28px] p-1.5 bg-surface-raised border border-line shadow-[0_24px_80px_rgba(0,0,0,0.8)] hover:border-accent-500/25 transition-colors duration-500 h-full">
                      
                      {/* Inner Glass Plate Enclosure */}
                      <SpotlightSurface className="rounded-[calc(28px-6px)] bg-surface-raised border border-line p-6 md:p-8 hover:border-line transition-colors duration-500 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] h-full flex flex-col">
                        
                        <div className="flex flex-col h-full">
                          {/* Card Header */}
                          <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                            <div className="flex items-center gap-3">
                              <span className="flex items-center justify-center w-8 h-8 rounded-full border border-line bg-surface-raised group-hover:bg-accent-500/10 group-hover:border-accent-500/15 transition-all duration-300">
                                {getCategoryIcon(project.category)}
                              </span>
                              
                              <h3 className="text-xl md:text-2xl font-display text-fg group-hover:text-fg transition-colors duration-300">
                                {project.title}
                              </h3>
                            </div>
                            
                            {/* Actions with Haptic Trigger Icons */}
                            <div className="flex gap-4">
                              {project.github && (
                                <a
                                  href={project.github}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 text-fg-subtle hover:text-fg-muted text-sm font-semibold tracking-wide transition-colors duration-200 select-none"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <Github className="w-4 h-4 stroke-[1.5px]" />
                                  <span className="hidden sm:inline">Code</span>
                                </a>
                              )}
                              
                              {/* Custom Button-in-Button Trailing Icon Concept */}
                              <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-line bg-surface-raised hover:border-accent-500/20 hover:bg-accent-500/5 text-fg-muted hover:text-fg text-sm font-semibold tracking-wide select-none transition-all duration-200"
                              >
                                <span>Visit</span>
                                <span className="flex items-center justify-center w-4 h-4 rounded-full bg-white/5 group-hover:bg-accent-500/10 group-hover:text-fg transition-all duration-300">
                                  <ExternalLink className="w-2.5 h-2.5 stroke-[1.8px] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                                </span>
                              </a>
                            </div>
                          </div>
                          
                          {/* Card Content Description */}
                          <p className="text-fg-muted text-sm md:text-base leading-relaxed flex-1 mb-6 font-normal">
                            {project.description}
                          </p>
                          
                          {/* Project Roles / Tags */}
                          {project.roles && project.roles.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mb-5">
                              {project.roles.map((r, i) => (
                                <span
                                  key={i}
                                  className="px-2.5 py-1 rounded-md text-[10px] uppercase tracking-wider font-bold text-fg/85 border border-accent-500/10 bg-accent-500/5 shadow-sm"
                                >
                                  {r}
                                </span>
                              ))}
                            </div>
                          )}
                          
                          {/* Tech Stack Pills with Custom Micro-Sheen */}
                          <div className="flex flex-wrap gap-2 pt-4 border-t border-line">
                            {project.stack.slice(0, isFeatured ? 6 : 4).map((tech, i) => (
                              <span
                                key={i}
                                className="px-3 py-1 bg-surface-raised border border-line rounded-md text-[11px] font-mono text-fg-muted select-none transition-colors duration-200 hover:text-fg hover:border-line"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                      </SpotlightSurface>
                    </div>
                  </motion.div>
                );
              })
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default FeaturedBento;
