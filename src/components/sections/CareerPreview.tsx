import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SpotlightSurface from '../SpotlightSurface';
import useParallax from '../../hooks/useParallax';
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
  const { ref: sectionRef, y } = useParallax<HTMLElement>(90);

  return (
    <section
      id="career-preview"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background: image + overlay so content stays readable (same pattern as Hero) */}
      <div className="absolute inset-0 bg-black" aria-hidden />
      <motion.img
        src="/cypress.jpeg"
        alt=""
        role="presentation"
        decoding="async"
        style={y ? { y } : undefined}
        className="absolute -inset-y-16 inset-x-0 w-full h-[calc(100%+8rem)] object-cover object-center"
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/75 to-black/90"
        aria-hidden
      />
      <div className="absolute inset-0">
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-accent-600/15 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] bg-accent-800/10 rounded-full blur-[100px]" />
      </div>
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle, #6366f1 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-500/30 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col gap-6 mb-12 md:mb-16"
        >
          <div>
            <span className="text-accent-400 text-sm font-medium tracking-wider uppercase mb-4 block">
              Experience
            </span>
            <h2 className="text-4xl md:text-5xl font-display mb-4" style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #a5b4fc 60%, #6366f1 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Career Journey
            </h2>
            <p className="text-gray-400 max-w-xl">
              A timeline of professional growth and achievements in tech.
            </p>
          </div>
          {/* Button moved to bottom-right for desktop; stays stacked on mobile */}
        </motion.div>

        {/* Alternating timeline */}
        <div className="max-w-4xl mx-0 relative">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-accent-500/30 via-accent-500/10 to-transparent -translate-x-px" />

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
                  <SpotlightSurface className="bg-white/[0.03] rounded-xl border border-white/[0.06] p-5 md:p-6 hover:border-accent-500/30 transition-colors duration-300 ml-6">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-accent-500/10 flex items-center justify-center mt-0.5">
                        <Briefcase className="w-4 h-4 text-accent-400" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-base md:text-lg font-bold text-white mb-1">
                          {role.title}
                        </h3>
                        <p className="text-accent-300/90 text-sm mb-1">{role.company}</p>
                        <p className="text-gray-500 text-xs">{role.period}</p>
                      </div>
                    </div>
                  </SpotlightSurface>
                </div>

                {/* Timeline dot */}
                <div className="absolute left-6 top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-accent-500/80 border-2 border-black" />
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-6 md:mt-0">
          <Link
            to="/career"
            aria-label="View full career journey"
            className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/[0.06] text-gray-300 hover:border-accent-500/40 hover:text-accent-300 transition-all text-sm font-medium md:absolute md:bottom-8 md:right-8"
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
