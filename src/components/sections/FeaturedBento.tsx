import { useState, useMemo, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, Cpu, Terminal, Layers } from 'lucide-react';
import SpotlightSurface from '../SpotlightSurface';
import { useDuration } from '../../hooks/useMobileReducedDuration';

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
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const chipRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const dur = useDuration(0.4);

  const filtered = useMemo(() => {
    if (filter === 'All') return projects;
    return projects.filter((p) => p.category === filter);
  }, [projects, filter]);

  const setChipRef = useCallback((key: string) => (el: HTMLButtonElement | null) => {
    if (el) chipRefs.current.set(key, el);
    else chipRefs.current.delete(key);
  }, []);

  const moveIndicator = useCallback((key: string) => {
    const el = chipRefs.current.get(key);
    const indicator = indicatorRef.current;
    if (!el || !indicator) return;
    const parent = el.parentElement;
    if (!parent) return;
    const parentRect = parent.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    indicator.style.width = `${elRect.width}px`;
    indicator.style.transform = `translateX(${elRect.left - parentRect.left}px)`;
  }, []);

  useEffect(() => {
    moveIndicator(filter);
  }, [filter, moveIndicator]);

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
    <section
      id="projects"
      className="section-glow relative bg-surface py-28 md:py-36 overflow-hidden"
    >
      {/* The blueprint SVG - dot grid plus hardcoded #d4d4d8 schematic lines -
          used to sit here. It was a light-grey drawing on a light surface, so in
          light mode it read as smudges, and it duplicated the app-level
          `.coder-grid`. The section-glow ground is what the glass frosts now. */}
      <div className="absolute inset-x-0 top-0 h-px bg-line" aria-hidden />
      <div className="absolute inset-x-0 bottom-0 h-px bg-line" aria-hidden />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          viewport={{ once: true }}
          className="mb-14 md:mb-20 max-w-3xl"
        >
          <div className="glass-pill inline-flex items-center gap-2 px-3 py-1 rounded-full text-fg text-xs uppercase tracking-[0.15em] font-semibold mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-brand" />
            Engineering Casebook
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display tracking-tight mb-5 text-fg">
            Selected Creations
          </h2>
          
          <p className="text-base md:text-lg text-fg-muted font-normal leading-relaxed max-w-2xl">
            A production-ready catalog showcasing modern, robust frontends, bulletproof automation systems, and high-fidelity consumer platforms.
          </p>

          {/* Filter Chips — CSS-transition indicator instead of layoutId.
              layoutId triggers FLIP measurements that cause layout
              recalculation flicker on mobile; a positioned div with
              transform + transition achieves the same visual without
              touching the layout engine. */}
          <div className="flex flex-wrap gap-2.5 mt-8 relative">
            <span
              ref={indicatorRef}
              className="absolute top-0 left-0 h-full rounded-full border border-brand-line pointer-events-none transition-[width,transform] ease-[var(--ease-out)]"
              style={{ transitionDuration: `${dur * 250}ms` }}
            />
            {FILTERS.map((f) => {
              const isActive = filter === f;
              return (
                <button
                  key={f}
                  ref={setChipRef(f)}
                  onClick={() => setFilter(f)}
                  className={`glass-pill relative px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider select-none outline-none ${
                    isActive ? 'is-active' : 'text-fg-muted hover:text-fg'
                  }`}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {f === 'All' ? null : getCategoryIcon(f)}
                    {f}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Asymmetric Bento Masonry Grid.
            AnimatePresence wraps individual cards instead of the whole grid.
            The old mode="wait" pattern removed the entire grid (exit 0.4s),
            waited, then re-mounted it (enter 0.4s) — a full 0.8s where the
            project list was blank, which flashed on phones.  Individual-card
            AnimatePresence lets exiting cards fade out while entering cards
            fade in simultaneously, cutting the perceived transition in half
            and eliminating the blank flash. */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.length === 0 ? (
              <motion.p
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-fg-subtle col-span-full font-mono text-sm py-12 text-center border border-dashed border-line rounded-2xl"
              >
                [SYSTEM_WARN]: No creations found in this category.
              </motion.p>
            ) : (
              filtered.map((project, index) => {
                const isFeatured = index === 0;
                const isWide = isFeatured || (index === 3 && filtered.length > 3);

                return (
                  <motion.div
                    key={project.title}
                    layout
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{
                      duration: dur * 0.5,
                      delay: Math.min(index * 0.04, 0.2),
                      ease: [0.23, 1, 0.32, 1],
                      layout: { duration: dur * 0.35 },
                    }}
                    viewport={{ once: true, margin: "-50px" }}
                    className={`group ${isWide ? 'md:col-span-2' : 'col-span-1'}`}
                  >
                    {/* Double-bezel enclosure: a frosted tray holding a frosted
                        plate. The shadows are tokens now - the old hardcoded
                        rgba(0,0,0,0.8) drop was tuned for a black page and left
                        a bruise under every card in light mode. */}
                    <div className="glass-tray rounded-[28px] p-1.5 hover:border-brand-line h-full">
                      {/* Inner Glass Plate Enclosure */}
                      <SpotlightSurface className="glass glass-strong rounded-[calc(28px-6px)] p-6 md:p-8 h-full flex flex-col">
                        
                        <div className="flex flex-col h-full">
                          {/* Card Header */}
                          <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                            <div className="flex items-center gap-3">
                              <span className="glass-pill flex items-center justify-center w-8 h-8 rounded-full group-hover:border-brand-line">
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
                                className="glass-pill inline-flex items-center gap-1.5 px-3 py-1 rounded-full hover:border-brand-line text-fg-muted hover:text-fg text-sm font-semibold tracking-wide select-none"
                              >
                                <span>Visit</span>
                                <span className="flex items-center justify-center w-4 h-4 rounded-full bg-brand-soft group-hover:text-fg transition-all duration-300">
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
                                  className="glass-pill px-2.5 py-1 rounded-md text-[10px] uppercase tracking-wider font-bold text-fg-muted"
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
                                className="glass-pill px-3 py-1 rounded-md text-[11px] font-mono text-fg-muted select-none hover:text-fg hover:border-brand-line"
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
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBento;
