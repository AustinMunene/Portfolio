import { useState, useEffect, Suspense, lazy } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowRight, Sparkles, TrendingUp, Zap, Shield, Mail, Phone, ChevronDown } from 'lucide-react';

// three/fiber/drei is ~600KB. Split it out so it never blocks first paint;
// the hero renders its gradient ground immediately and the scene fades in.
const HeroScene = lazy(() => import('../three/HeroScene'));

const name = 'Austin Munene';

export type HighlightProject = {
  title: string;
  description: string;
  stack: string[];
  link: string;
};

const currentFocus = {
  label: 'Current Focus',
  title: 'Automation & release confidence',
  detail: 'Scaling QA frameworks and AI-assisted testing at Nathan Digital.',
  accent: 'from-accent-500 to-accent-400',
};

const availability = {
  label: 'Status',
  title: 'Available for opportunities',
  detail: 'Open to product-minded QA and frontend roles.',
  accent: 'from-emerald-500 to-accent-400',
};

const stats = [
  { icon: TrendingUp, value: '6+', label: 'Years Experience' },
  { icon: Zap, value: '6', label: 'Projects Shipped' },
  { icon: Shield, value: '5', label: 'Companies' },
  { icon: Sparkles, value: '10+', label: 'Tech Skills' },
];

const credibilityChips = ['Frontend', 'QA Automation', 'Full-stack delivery'];

type HeroSplitProps = {
  featuredProject: HighlightProject;
};

const HeroSplit = ({ featuredProject }: HeroSplitProps) => {
  const highlights = [
    {
      label: 'Featured Project',
      title: featuredProject.title,
      subtitle: featuredProject.stack.slice(0, 3).join(' · '),
      detail: featuredProject.description,
      accent: 'from-accent-500 to-accent-400',
    },
    { ...currentFocus },
    { ...availability },
  ];

  const [activeHighlight, setActiveHighlight] = useState(0);
  const [getInTouchOpen, setGetInTouchOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveHighlight((prev) => (prev + 1) % highlights.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [highlights.length]);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Live WebGL centrepiece, layered under the copy. */}
      <div className="absolute inset-0 bg-black" aria-hidden />
      <motion.div
        className="absolute inset-0"
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
      >
        <Suspense fallback={null}>
          <HeroScene reducedMotion={Boolean(reduceMotion)} />
        </Suspense>
      </motion.div>
      {/* Scrim: only as dark as the copy needs. Heavy on the left where the
          headline sits, clearing through the middle so the geometry reads. */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/25 to-transparent"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70"
        aria-hidden
      />
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-accent-600/20 rounded-full blur-[128px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-accent-800/15 rounded-full blur-[128px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-accent-500/10 rounded-full blur-[100px]" />
      </div>
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle, #6366f1 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="container mx-auto px-4 relative z-10 py-24 md:py-0">
        {/* Split hero: left + right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Name, positioning, CTA */}
          <motion.div
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent-500/20 bg-accent-500/5 text-accent-300 text-sm mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-500" />
              </span>
              Available for opportunities
            </motion.div>

            <motion.h1
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight cursor-default"
            >
              {/* Split per word, not per character, so "Munene" can never break
                  across lines the way it did at wide viewports. */}
              {name.split(' ').map((word, wordIndex) => (
                <span
                  key={word}
                  className="inline-block whitespace-nowrap"
                  style={{ marginRight: wordIndex === 0 ? '0.25em' : undefined }}
                >
                  {word.split('').map((char, index) => (
                    <motion.span
                      key={`${char}-${index}`}
                      className="inline-block"
                      whileHover={{
                        y: -8,
                        color: '#818cf8',
                        transition: { duration: 0.2, ease: 'easeOut' },
                      }}
                      style={{
                        background:
                          'linear-gradient(135deg, #ffffff 0%, #a5b4fc 60%, #6366f1 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>
              ))}
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-400 mb-8 max-w-lg leading-relaxed"
            >
              Frontend + QA Engineer delivering reliable, production-ready user
              experiences
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-start gap-4"
            >
              <a
                href="#projects"
                className="px-8 py-3 bg-gradient-to-r from-accent-600 to-accent-500 text-white rounded-full font-medium hover:shadow-lg hover:shadow-accent-500/25 transition-all flex items-center gap-2 group"
              >
                View Projects
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setGetInTouchOpen((o) => !o)}
                  onBlur={() => setTimeout(() => setGetInTouchOpen(false), 150)}
                  className="px-8 py-3 border border-white/10 text-gray-300 rounded-full font-medium hover:border-accent-500/50 hover:text-white hover:bg-accent-500/5 transition-all flex items-center gap-2"
                >
                  Get in Touch
                  <ChevronDown className={`w-4 h-4 transition-transform ${getInTouchOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {getInTouchOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-0 top-full mt-2 min-w-[220px] rounded-xl border border-white/[0.08] bg-black/95 backdrop-blur-md shadow-xl py-2 z-50"
                    >
                      <a
                        href="mailto:saviusmunene@gmail.com"
                        className="flex items-center gap-3 px-4 py-3 text-left text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
                      >
                        <Mail className="w-4 h-4 text-accent-400 shrink-0" />
                        <span className="text-sm">Email</span>
                        <span className="text-xs text-gray-500 truncate ml-auto">saviusmunene@gmail.com</span>
                      </a>
                      <a
                        href="tel:+254743988415"
                        className="flex items-center gap-3 px-4 py-3 text-left text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
                      >
                        <Phone className="w-4 h-4 text-accent-400 shrink-0" />
                        <span className="text-sm">Call</span>
                        <span className="text-xs text-gray-500 ml-auto">+254 743 988 415</span>
                      </a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Keyword tags */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-8 flex flex-wrap gap-x-4 gap-y-2 text-xs md:text-sm text-gray-500/80"
            >
              <span>Production QA</span>
              <span className="text-accent-500/40">|</span>
              <span>React + TypeScript</span>
              <span className="text-accent-500/40">|</span>
              <span>Automation Mindset</span>
              <span className="text-accent-500/40">|</span>
              <span>System Reliability</span>
            </motion.div>
          </motion.div>

          {/* Right: Rotating highlight panel */}
          <motion.div
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm p-6 md:p-8 overflow-hidden">
              {/* Decorative corner glow */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent-500/20 rounded-full blur-[60px]" />

              {/* Indicator dots */}
              <div className="flex items-center gap-2 mb-6">
                {highlights.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveHighlight(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${i === activeHighlight
                        ? 'w-8 bg-accent-500'
                        : 'w-1.5 bg-white/20 hover:bg-white/40'
                      }`}
                  />
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeHighlight}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-xs font-medium text-accent-400 uppercase tracking-wider">
                    {highlights[activeHighlight].label}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mt-2 mb-1">
                    {highlights[activeHighlight].title}
                  </h3>
                  <p className="text-accent-300/80 text-sm mb-3">
                    {highlights[activeHighlight].subtitle}
                  </p>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {highlights[activeHighlight].detail}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Bottom decorative bar */}
              <div className="mt-6 h-1 rounded-full bg-white/[0.04] overflow-hidden">
                <motion.div
                  key={activeHighlight}
                  className={`h-full rounded-full bg-gradient-to-r ${highlights[activeHighlight].accent}`}
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 4, ease: 'linear' }}
                />
              </div>

              {/* Credibility indicators + CTA (always visible) */}
              <div className="mt-6 pt-6 border-t border-white/[0.06]">
                <div className="flex flex-wrap gap-2 mb-4">
                  {credibilityChips.map((chip) => (
                    <span
                      key={chip}
                      className="px-2.5 py-1 rounded-md text-[11px] font-medium text-gray-400 bg-white/[0.04] border border-white/[0.06]"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.06] border border-white/[0.08] text-sm text-white hover:bg-white/[0.1] hover:border-accent-500/30 transition-all"
                >
                  View Projects
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Floating stat mini-cards stacked to the side (desktop only) */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="hidden xl:flex absolute -right-4 top-8 flex-col gap-3"
            >
              <div className="bg-white/[0.05] backdrop-blur border border-white/[0.08] rounded-xl px-4 py-3 text-center">
                <div className="text-xl font-bold text-white">6+</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-wider">Years</div>
              </div>
              <div className="bg-white/[0.05] backdrop-blur border border-white/[0.08] rounded-xl px-4 py-3 text-center">
                <div className="text-xl font-bold text-accent-400">QA</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-wider">Lead</div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Stat badges row */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-16 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -4, borderColor: 'rgba(99,102,241,0.3)' }}
              className="flex items-center gap-4 p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] transition-colors"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent-500/10 flex items-center justify-center">
                <stat.icon className="w-5 h-5 text-accent-400" />
              </div>
              <div>
                <div className="text-xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-gray-500">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSplit;
