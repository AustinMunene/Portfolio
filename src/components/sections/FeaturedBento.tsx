import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';

export type BentoProject = {
  title: string;
  description: string;
  link: string;
  github?: string;
  roles?: string[];
  stack: string[];
  category?: 'Frontend' | 'QA' | 'Full-stack';
};

const FILTERS: Array<'All' | 'Frontend' | 'QA' | 'Full-stack'> = ['All', 'Frontend', 'QA', 'Full-stack'];

type FeaturedBentoProps = {
  projects: BentoProject[];
};

const FeaturedBento = ({ projects }: FeaturedBentoProps) => {
  const [filter, setFilter] = useState<'All' | 'Frontend' | 'QA' | 'Full-stack'>('All');

  const filtered = useMemo(() => {
    if (filter === 'All') return projects;
    return projects.filter((p) => p.category === filter);
  }, [projects, filter]);

  const primary = filtered[0];
  const secondary = filtered.slice(1, 5);

  return (
    <section id="projects" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-black" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-500/30 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-12 md:mb-16"
        >
          <span className="text-accent-400 text-sm font-medium tracking-wider uppercase mb-4 block">
            Portfolio
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #a5b4fc 60%, #6366f1 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Featured Projects
          </h2>
          <p className="text-base md:text-lg text-gray-400 max-w-2xl">
            Selected work focused on reliable delivery, clear UX, and quality practices that scale.
          </p>

          {/* Filter chips */}
          <div className="flex flex-wrap gap-2 mt-6">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === f
                    ? 'bg-accent-500/20 text-accent-300 border border-accent-500/40'
                    : 'bg-white/[0.04] text-gray-400 border border-white/[0.08] hover:border-white/20 hover:text-gray-300'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </motion.div>

        {filtered.length === 0 ? (
          <p className="text-gray-500">No projects in this category.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {/* Primary: large card */}
            {primary && (
              <motion.div
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.05 }}
                viewport={{ once: true }}
                className="md:col-span-2 md:row-span-1"
              >
                <div className="h-full group">
                  <div className="h-full rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 md:p-8 hover:border-accent-500/30 hover:bg-accent-500/[0.03] transition-all duration-300 hover:shadow-[0_8px_40px_-12px_rgba(99,102,241,0.15)]">
                    <div className="flex flex-col h-full">
                      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                        <div className="flex items-center gap-3">
                          <span className="h-2 w-2 rounded-full bg-accent-500" />
                          <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-accent-300 transition-colors">
                            {primary.title}
                          </h3>
                        </div>
                        <div className="flex gap-4">
                          {primary.github && (
                            <a
                              href={primary.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-gray-500 hover:text-accent-400 text-sm transition-colors"
                            >
                              <Github className="w-4 h-4" />
                              Code
                            </a>
                          )}
                          <a
                            href={primary.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-gray-400 hover:text-accent-400 text-sm group-hover:translate-x-0.5 transition-all"
                          >
                            Visit <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                      </div>
                      <p className="text-gray-400 text-sm md:text-base leading-relaxed flex-1 mb-4">
                        {primary.description}
                      </p>
                      {primary.roles && primary.roles.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {primary.roles.map((r, i) => (
                            <span
                              key={i}
                              className="px-2.5 py-1 rounded-full text-xs text-accent-300/80 border border-accent-500/15 bg-accent-500/5"
                            >
                              {r}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="flex flex-wrap gap-2">
                        {primary.stack.slice(0, 5).map((tech, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-white/[0.04] rounded-full text-xs text-gray-400"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Secondary: smaller cards */}
            {secondary.map((project, index) => (
              <motion.div
                key={project.title + index}
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.08 * (index + 1) }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="h-full rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5 md:p-6 hover:border-accent-500/30 hover:bg-accent-500/[0.03] transition-all duration-300 hover:shadow-[0_8px_40px_-12px_rgba(99,102,241,0.15)]">
                  <div className="flex flex-col h-full">
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent-500 flex-shrink-0" />
                        <h3 className="text-base md:text-lg font-bold text-white group-hover:text-accent-300 transition-colors truncate">
                          {project.title}
                        </h3>
                      </div>
                      <div className="flex gap-3 flex-shrink-0">
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-500 hover:text-accent-400 transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Github className="w-4 h-4" />
                          </a>
                        )}
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-accent-400 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 mb-3 flex-1">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.stack.slice(0, 3).map((tech, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 bg-white/[0.04] rounded text-[11px] text-gray-500"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedBento;
