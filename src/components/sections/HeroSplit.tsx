import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowRight, Mail, Phone, ChevronDown } from 'lucide-react';

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
  const [carouselPaused, setCarouselPaused] = useState(false);
  const reduceMotion = useReducedMotion();

  // Auto-rotation is motion, so prefers-reduced-motion has to stop it too -
  // previously only the 3D scene honoured the setting while this kept cycling.
  // It also pauses on hover/focus so the panel cannot swap out mid-read.
  useEffect(() => {
    if (reduceMotion || carouselPaused) return;
    const interval = setInterval(() => {
      setActiveHighlight((prev) => (prev + 1) % highlights.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [highlights.length, reduceMotion, carouselPaused]);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Static ground. The animated WebGL scene that used to live here is gone:
          it collided with the copy and the highlight panel, cost a ~70KB lazy
          chunk that left the hero blank for seconds while it loaded, and it was
          the most expensive thing on the page. Two soft radials over the surface
          give the depth without any of that. (HeroScene.tsx is in git history if
          it is ever wanted back.) */}
      <div
        className="absolute inset-0"
        aria-hidden
        style={{
          background:
            'radial-gradient(62% 70% at 72% 40%, var(--hero-poster-glow), transparent 72%),' +
            'radial-gradient(48% 58% at 12% 14%, var(--hero-poster-glow), transparent 74%),' +
            'var(--hero-poster)',
        }}
      />

      {/* Vertical padding is needed at every breakpoint now that the right column
          carries a portrait as well as the panel - without it the stack grows
          taller than the viewport and slides up under the floating nav island. */}
      <div className="container mx-auto px-4 relative z-10 py-28 md:py-32">
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
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent-500/20 bg-accent-500/5 text-fg text-sm mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-500" />
              </span>
              {/* Was "Available for opportunities" - job-seeking language that also
                  duplicated the portrait caption. The homepage speaks in project
                  terms; role availability belongs on /about. */}
              QA automation &amp; software delivery
            </motion.div>

            <motion.h1
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-6xl md:text-8xl lg:text-9xl font-display mb-6 tracking-tight cursor-default"
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
                        transition: { duration: 0.2, ease: 'easeOut' },
                      }}
                      // Gradient-clipped text has to follow the theme, or the
                      // name is white-on-white in light mode. Runs from the
                      // foreground colour into the muted one.
                      style={{
                        background:
                          'linear-gradient(135deg, var(--fg) 0%, var(--fg) 55%, var(--fg-muted) 100%)',
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
              className="text-lg md:text-xl text-fg-muted mb-8 max-w-lg leading-relaxed"
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
                className="px-8 py-3 bg-white text-black rounded-full font-medium hover:opacity-90 transition-opacity flex items-center gap-2 group"
              >
                View Projects
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setGetInTouchOpen((o) => !o)}
                  onBlur={() => setTimeout(() => setGetInTouchOpen(false), 150)}
                  className="px-8 py-3 border border-line text-fg-muted rounded-full font-medium hover:border-accent-500/50 hover:text-fg hover:bg-accent-500/5 transition-all flex items-center gap-2"
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
                      className="absolute left-0 top-full mt-2 min-w-[220px] rounded-xl border border-line bg-surface/95 backdrop-blur-md shadow-xl py-2 z-50"
                    >
                      <a
                        href="mailto:saviusmunene@gmail.com"
                        className="flex items-center gap-3 px-4 py-3 text-left text-fg-muted hover:bg-white/5 hover:text-fg transition-colors"
                      >
                        <Mail className="w-4 h-4 text-fg-muted shrink-0" />
                        <span className="text-sm">Email</span>
                        <span className="text-xs text-fg-subtle truncate ml-auto">saviusmunene@gmail.com</span>
                      </a>
                      <a
                        href="tel:+254743988415"
                        className="flex items-center gap-3 px-4 py-3 text-left text-fg-muted hover:bg-white/5 hover:text-fg transition-colors"
                      >
                        <Phone className="w-4 h-4 text-fg-muted shrink-0" />
                        <span className="text-sm">Call</span>
                        <span className="text-xs text-fg-subtle ml-auto">+254 743 988 415</span>
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
              className="mt-8 flex flex-wrap gap-x-4 gap-y-2 text-xs md:text-sm text-fg-subtle"
            >
              <span>Production QA</span>
              <span className="text-fg-subtle">|</span>
              <span>React + TypeScript</span>
              <span className="text-fg-subtle">|</span>
              <span>Automation Mindset</span>
              <span className="text-fg-subtle">|</span>
              <span>System Reliability</span>
            </motion.div>
          </motion.div>

          {/* Right: portrait, then the rotating highlight panel beneath it. */}
          <motion.div
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Portrait.
                Shot looking up against a blown-out sky, which is why it is framed
                in a circle rather than cut out: the white hoodie and the white sky
                share an edge with almost no contrast, so keying it would tear.
                Reading the bright disc as a deliberate high-key crop is both
                truer to the photo and stronger against the black surround. */}
            <motion.figure
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
              className="relative mx-auto mb-8 w-[240px] h-[240px] md:w-[300px] md:h-[300px]"
            >
              {/* Concentric ring, echoing the bezel language used elsewhere. */}
              <div className="absolute -inset-3 rounded-full border border-line" />
              <div className="absolute inset-0 rounded-full overflow-hidden bg-surface-raised shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)]">
                <img
                  // c_thumb + g_face with a pulled-back zoom: c_fill kept the full
                  // frame width and pushed the face into a corner, since the
                  // subject sits low-right in the original.
                  src="https://res.cloudinary.com/dogeweg3r/image/upload/f_auto,q_auto,w_700,c_thumb,g_face,z_0.62,ar_1:1/v1786363578/IMG_5882_yodfqu.jpg"
                  alt="Austin Munene"
                  width={300}
                  height={300}
                  loading="eager"
                  decoding="async"
                  className="w-full h-full object-cover grayscale contrast-[1.08]"
                />
              </div>

              {/* Floating card, overlapping the portrait as in the reference.
                  Deliberately not a metric - there is no true number to put here,
                  so it carries facts instead. */}
              <figcaption className="absolute -bottom-3 -left-4 md:-left-8 rounded-xl border border-line bg-surface/85 backdrop-blur-md px-4 py-2.5 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.9)]">
                <span className="flex items-center gap-2 text-[11px] font-medium tracking-wide text-fg">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70 animate-ping" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  </span>
                  Available for projects
                </span>
                <span className="mt-0.5 block text-[10px] text-fg-muted">
                  Nairobi &middot; GMT+3
                </span>
              </figcaption>
            </motion.figure>

            <div
              className="relative rounded-2xl border border-line bg-surface-raised backdrop-blur-sm p-6 md:p-8 overflow-hidden"
              onMouseEnter={() => setCarouselPaused(true)}
              onMouseLeave={() => setCarouselPaused(false)}
              onFocusCapture={() => setCarouselPaused(true)}
              onBlurCapture={() => setCarouselPaused(false)}
            >
              {/* Decorative corner glow */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent-500/20 rounded-full blur-[60px]" />

              {/* Indicator dots */}
              <div className="flex items-center gap-2 mb-6">
                {highlights.map((highlight, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveHighlight(i)}
                    aria-label={`Show ${highlight.label}`}
                    aria-current={i === activeHighlight}
                    className={`h-1.5 rounded-full transition-all duration-300 ${i === activeHighlight
                        ? 'w-8 bg-accent-500'
                        : 'w-1.5 bg-white/20 hover:bg-white/40'
                      }`}
                  />
                ))}
              </div>

              {/* Deliberately NOT wrapped in AnimatePresence. Under
                  framer-motion 12 the `mode="wait"` + keyed-child pattern here
                  deadlocked and left this panel stuck at opacity 0, so the whole
                  rotating highlight was invisible on the live site. A keyed
                  remount with an enter-only transition cannot deadlock: if the
                  animation never runs the content is still painted. */}
              <motion.div
                key={activeHighlight}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              >
                <span className="text-xs font-medium text-fg-muted uppercase tracking-wider">
                  {highlights[activeHighlight].label}
                </span>
                <h3 className="text-2xl md:text-3xl font-display text-fg mt-2 mb-1">
                  {highlights[activeHighlight].title}
                </h3>
                <p className="text-fg-muted text-sm mb-3">
                  {highlights[activeHighlight].subtitle}
                </p>
                <p className="text-fg-muted text-sm leading-relaxed">
                  {highlights[activeHighlight].detail}
                </p>
              </motion.div>

              {/* Progress bar: doubles as the countdown to the next rotation, so
                  it must not keep filling once rotation is paused or disabled. */}
              <div className="mt-6 h-1 rounded-full bg-surface-raised overflow-hidden">
                {reduceMotion || carouselPaused ? (
                  <div
                    className={`h-full w-full rounded-full bg-gradient-to-r ${highlights[activeHighlight].accent} opacity-40`}
                  />
                ) : (
                  <motion.div
                    key={activeHighlight}
                    className={`h-full rounded-full bg-gradient-to-r ${highlights[activeHighlight].accent}`}
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 4.5, ease: 'linear' }}
                  />
                )}
              </div>

              {/* Credibility indicators + CTA (always visible) */}
              <div className="mt-6 pt-6 border-t border-line">
                <div className="flex flex-wrap gap-2 mb-4">
                  {credibilityChips.map((chip) => (
                    <span
                      key={chip}
                      className="px-2.5 py-1 rounded-md text-[11px] font-medium text-fg-muted bg-surface-raised border border-line"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-raised border border-line text-sm text-fg hover:bg-white/[0.1] hover:border-accent-500/30 transition-all"
                >
                  View Projects
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* The "6+ Years / QA Lead" floating mini-cards lived here. Removed:
                they collided with the portrait, and CV-style tenure counts are
                exactly the framing this redesign is moving away from. The
                portrait's own caption now carries the one true, useful fact. */}
          </motion.div>
        </div>

        {/* The four stat cards - Years Experience / Projects Shipped / Companies
            / Tech Skills - lived here. Removed: those are CV fields, and two of
            them worked against him ("5 Companies" reads as job-hopping, "6
            Projects Shipped" undersells). A business site states an offer and
            shows proof; it does not tally tenure. Replaced by nothing for now -
            the services section will occupy this space. */}
      </div>
    </section>
  );
};

export default HeroSplit;
