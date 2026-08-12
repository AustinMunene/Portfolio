import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SpotlightSurface from '../SpotlightSurface';
import { ArrowRight, Briefcase } from 'lucide-react';

export type CareerPreviewItem = {
  title: string;
  company: string;
  period: string;
};

type CareerPreviewProps = {
  items: CareerPreviewItem[];
};

const CareerPreview = ({ items }: CareerPreviewProps) => {
  return (
    <section
      id="career-preview"
      className="section-glow relative bg-surface-alt py-24 md:py-32 overflow-hidden"
    >
      {/* Hairlines, not a gradient. A fading accent line reads as decoration on
          a light surface; a flat token hairline reads as an edge. */}
      <div className="absolute inset-x-0 top-0 h-px bg-line" aria-hidden />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col gap-6 mb-12 md:mb-16"
        >
          <div>
            <span className="text-fg-muted text-sm font-medium tracking-wider uppercase mb-4 block">
              Experience
            </span>
            <h2 className="text-4xl md:text-5xl font-display mb-4" style={{
              background:
                'linear-gradient(135deg, var(--fg) 0%, var(--fg) 55%, var(--fg-muted) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Career Journey
            </h2>
            <p className="text-fg-muted max-w-xl">
              A timeline of professional growth and achievements in tech.
            </p>
          </div>
          {/* Button moved to bottom-right for desktop; stays stacked on mobile */}
        </motion.div>

        {/* Alternating timeline */}
        <div className="max-w-4xl mx-0 relative">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-line -translate-x-px" />

          <div className="space-y-8 md:space-y-12">
            {items.map((role, index) => (
              <motion.div
                key={role.company + role.period}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                viewport={{ once: true }}
                className={`relative flex items-start gap-8 md:gap-12 pl-8`}
              >
                <div className="w-full">
                  <SpotlightSurface className="glass rounded-xl p-5 md:p-6 hover:border-brand-line ml-6">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-lg glass-pill flex items-center justify-center mt-0.5">
                        <Briefcase className="w-4 h-4 text-fg-muted" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-base md:text-lg font-bold text-fg mb-1">
                          {role.title}
                        </h3>
                        <p className="text-fg-muted text-sm mb-1">{role.company}</p>
                        <p className="text-fg-subtle text-xs">{role.period}</p>
                      </div>
                    </div>
                  </SpotlightSurface>
                </div>

                {/* Timeline dot */}
                <div className="absolute left-6 top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-brand ring-4 ring-surface-alt" />
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-6 md:mt-0">
          <Link
            to="/career"
            aria-label="View full career journey"
            className="glass-pill mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full text-fg-muted hover:border-brand-line hover:text-fg text-sm font-medium md:absolute md:bottom-8 md:right-8"
          >
            View full journey
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CareerPreview;
