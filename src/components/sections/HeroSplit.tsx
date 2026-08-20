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
  // Hover and focus are held separately. With one shared flag a mouseleave
  // cleared a pause that a keyboard focus was still holding, and vice versa.
  const [hoverPaused, setHoverPaused] = useState(false);
  const [focusPaused, setFocusPaused] = useState(false);
  const reduceMotion = useReducedMotion();

  const carouselPaused = hoverPaused || focusPaused;

  // The panel advances on every device. Reduced motion is honoured by dropping
  // the *animation*, not the rotation: the crossfade below goes to duration 0
  // and the progress bar stops filling, so the content still changes while
  // nothing actually moves. Stopping rotation outright meant any phone with
  // Reduce Motion switched on sat on slide one for the whole visit, with
  // nothing to suggest the dashes could be tapped.
  // Still pauses on hover/focus so the panel cannot swap out mid-read.
  useEffect(() => {
    if (carouselPaused) return;
    const interval = setInterval(() => {
      setActiveHighlight((prev) => (prev + 1) % highlights.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [highlights.length, carouselPaused]);

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
              className="glass-pill inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-fg text-sm mb-8"
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
              {/* btn-primary, not `bg-white text-black` - the latter was a white
                  pill sitting on a near-white surface in light mode. */}
              <a
                href="#projects"
                className="btn-primary px-8 py-3 rounded-full font-medium hover:opacity-90 transition-opacity flex items-center gap-2 group"
              >
                View Projects
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setGetInTouchOpen((o) => !o)}
                  onBlur={() => setTimeout(() => setGetInTouchOpen(false), 150)}
                  className="glass-pill px-8 py-3 text-fg-muted rounded-full font-medium hover:border-brand-line hover:text-fg flex items-center gap-2"
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
                      className="glass glass-overlay absolute left-0 top-full mt-2 min-w-[220px] rounded-xl py-2 z-50"
                    >
                      <a
                        href="mailto:saviusmunene@gmail.com"
                        className="flex items-center gap-3 px-4 py-3 text-left text-fg-muted hover:bg-brand-soft hover:text-fg transition-colors"
                      >
                        <Mail className="w-4 h-4 text-fg-muted shrink-0" />
                        <span className="text-sm">Email</span>
                        <span className="text-xs text-fg-subtle truncate ml-auto">saviusmunene@gmail.com</span>
                      </a>
                      <a
                        href="tel:+254743988415"
                        className="flex items-center gap-3 px-4 py-3 text-left text-fg-muted hover:bg-brand-soft hover:text-fg transition-colors"
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
              <div className="absolute inset-0 rounded-full overflow-hidden bg-surface-raised shadow-[var(--bezel-shadow)]">
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
              <figcaption className="glass glass-strong absolute -bottom-3 -left-4 md:-left-8 rounded-xl px-4 py-2.5">
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
              className="glass relative rounded-2xl p-6 md:p-8 overflow-hidden"
              // Pointer events, and only for an actual mouse. A tap on a touch
              // screen synthesizes mouseover/mouseenter, but leaves no pointer
              // hovering afterwards, so the matching leave never arrives - that
              // latched this to paused for the rest of the visit, which is why
              // the panel sat frozen on phones.
              onPointerEnter={(e) => {
                if (e.pointerType === 'mouse') setHoverPaused(true);
              }}
              onPointerLeave={(e) => {
                if (e.pointerType === 'mouse') setHoverPaused(false);
              }}
              // Same trap by way of focus: tapping an indicator dot focuses it
              // and touch delivers no blur. :focus-visible matches keyboard
              // focus only, which is the case this pause actually exists for.
              onFocusCapture={(e) => {
                if ((e.target as HTMLElement).matches?.(':focus-visible')) {
                  setFocusPaused(true);
                }
              }}
              onBlurCapture={() => setFocusPaused(false)}
            >
              {/* Decorative corner glow, sitting under the glass so the blur has
                  something to pick up. */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-brand-soft rounded-full blur-[60px]" />

              {/* Indicator dashes.

                  The dash is an inner span rather than the button itself. The
                  global mobile rule in index.css gives every button a 44px
                  minimum box for touch, which was inflating a 6px dash into a
                  44px circle on phones - the button *was* the dash, so sizing
                  the target resized the design. Splitting them lets the button
                  grow into a proper tap target while the dash stays a dash in
                  both layouts. */}
              <div className="flex items-center gap-2 mb-6">
                {highlights.map((highlight, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveHighlight(i)}
                    aria-label={`Show ${highlight.label}`}
                    aria-current={i === activeHighlight}
                    className="group flex items-center justify-center"
                  >
                    <span
                      className={`h-1.5 rounded-full transition-all duration-300 ${i === activeHighlight
                          ? 'w-8 bg-brand'
                          : 'w-1.5 bg-line group-hover:bg-fg-subtle'
                        }`}
                    />
                  </button>
                ))}
              </div>

              {/* Every highlight stays mounted, stacked into a single grid cell,
                  with only the active one opaque. The cell therefore sizes to
                  the TALLEST highlight and holds that height for the whole
                  rotation. Previously only the active one was mounted, so the
                  panel resized on every swap - and since the hero grid is
                  items-center, that re-centred both columns and shunted the
                  page below, which read as the hero flickering between sizes.
                  This has to come from layout rather than a min-height guess:
                  the featured project's description arrives as a prop, so no
                  fixed number stays correct.

                  Still deliberately NOT AnimatePresence. Under framer-motion 12
                  the `mode="wait"` + keyed-child pattern deadlocked here and
                  left the panel stuck at opacity 0, so the highlight was
                  invisible on the live site. Animating permanently-mounted
                  children cannot deadlock: if the animation never runs, the
                  active copy is still painted. */}
              <div className="grid">
                {highlights.map((highlight, i) => {
                  const isActive = i === activeHighlight;
                  return (
                    <motion.div
                      key={highlight.label}
                      // Same cell for all three: transforms below shift them
                      // visually without ever affecting the measured height.
                      className="col-start-1 row-start-1"
                      // Inactive copies are real text sitting at opacity 0, so
                      // they have to be hidden from assistive tech explicitly.
                      aria-hidden={!isActive}
                      // No enter animation on first paint - otherwise all three
                      // fade in at once before the effect settles.
                      initial={false}
                      animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 12 }}
                      transition={
                        reduceMotion
                          ? { duration: 0 }
                          : { duration: 0.3, ease: [0.23, 1, 0.32, 1] }
                      }
                      style={{ pointerEvents: isActive ? 'auto' : 'none' }}
                    >
                      <span className="text-xs font-medium text-fg-muted uppercase tracking-wider">
                        {highlight.label}
                      </span>
                      <h3 className="text-2xl md:text-3xl font-display text-fg mt-2 mb-1">
                        {highlight.title}
                      </h3>
                      {/* Only the featured project carries a subtitle; the other
                          two were rendering an empty <p> whose mb-3 still took
                          space, adding a third inconsistent height. */}
                      {highlight.subtitle && (
                        <p className="text-fg-muted text-sm mb-3">
                          {highlight.subtitle}
                        </p>
                      )}
                      <p className="text-fg-muted text-sm leading-relaxed">
                        {highlight.detail}
                      </p>
                    </motion.div>
                  );
                })}
              </div>

              {/* Progress bar: doubles as the countdown to the next rotation, so
                  it must not keep filling once rotation is paused or disabled.

                  Driven by a CSS @keyframes rather than framer-motion so the
                  browser can restart it off the main thread.  The old pattern
                  used key={activeHighlight} to force a full unmount/remount
                  on every rotation - that DOM churn caused a brief layout
                  repaint that read as flicker on phones.  A keyed CSS
                  animation achieves the same restart without touching the DOM
                  tree. */}
              <div className="mt-6 h-1 rounded-full bg-surface-raised overflow-hidden">
                {reduceMotion || carouselPaused ? (
                  <div
                    className={`h-full w-full rounded-full bg-gradient-to-r ${highlights[activeHighlight].accent} opacity-40`}
                  />
                ) : (
                  <div
                    key={activeHighlight}
                    className={`h-full rounded-full bg-gradient-to-r ${highlights[activeHighlight].accent}`}
                    style={{ animation: 'progressFill 4.5s linear forwards' }}
                  />
                )}
              </div>

              {/* Credibility indicators + CTA (always visible) */}
              <div className="mt-6 pt-6 border-t border-line">
                <div className="flex flex-wrap gap-2 mb-4">
                  {credibilityChips.map((chip) => (
                    <span
                      key={chip}
                      className="glass-pill px-2.5 py-1 rounded-md text-[11px] font-medium text-fg-muted"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
                <a
                  href="#projects"
                  className="glass-pill inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm text-fg hover:border-brand-line"
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
