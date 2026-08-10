import { motion } from 'framer-motion';
import Section from '../Section';

type Service = {
  title: string;
  summary: string;
  tools: string[];
};

/**
 * Deliberately three, and deliberately not "everything QA".
 *
 * A catch-all makes the buyer work out what you would actually do; two concrete
 * capabilities land harder than one vague one. Automation and manual are split
 * because clients hire them separately. The last line of "Design & Build" is the
 * real differentiator - most developers do not test their own work, and most
 * testers do not build.
 */
const SERVICES: Service[] = [
  {
    title: 'QA Automation',
    summary:
      'Playwright and Cypress suites that hold up in CI - stable selectors, honest waits, and failures that tell you what broke instead of just going red.',
    tools: ['Playwright', 'Cypress', 'CI pipelines'],
  },
  {
    title: 'Release QA',
    summary:
      'Exploratory and regression testing before you ship. Test plans, edge cases, and the judgement to know which bugs block a release and which can wait.',
    tools: ['Test plans', 'Regression', 'Exploratory'],
  },
  {
    title: 'Design & Build',
    summary:
      'Frontends and full systems, from architecture through delivery - built by someone who has to test it afterwards.',
    tools: ['React', 'Vue', 'TypeScript', 'Tailwind'],
  },
];

const Services = () => (
  <Section id="services" variant="alt" className="py-24 md:py-32 overflow-hidden">
    {/* Hairlines mark the section edges without needing a heavy background. */}
    <div className="absolute top-0 left-0 right-0 h-px bg-line" aria-hidden />
    <div className="absolute bottom-0 left-0 right-0 h-px bg-line" aria-hidden />

    <div className="container mx-auto px-4">
      {/* Editorial two-column: label left, content right - the layout the
          reference uses for its Experience and Tools blocks. */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          viewport={{ once: true }}
          className="lg:col-span-4"
        >
          <span className="text-xs font-medium uppercase tracking-[0.18em] text-brand">
            Services
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-display tracking-tight">
            What I do
          </h2>
          <p className="mt-5 text-fg-muted leading-relaxed max-w-sm">
            Testing that earns trust in a release, and delivery from someone who
            has to live with the bugs.
          </p>
        </motion.div>

        <div className="lg:col-span-8">
          {SERVICES.map((service, i) => (
            <motion.article
              key={service.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: Math.min(i * 0.08, 0.24),
                ease: [0.23, 1, 0.32, 1],
              }}
              viewport={{ once: true }}
              className="group grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-8 py-8 first:pt-0 border-b border-line last:border-b-0"
            >
              <div className="sm:col-span-2">
                <span className="font-mono text-xs text-fg-subtle tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>

              <div className="sm:col-span-10">
                {/* The title nudges right on hover - a small acknowledgement that
                    the whole row is one object, without turning it into a link
                    that goes nowhere. */}
                <h3 className="text-2xl md:text-3xl font-display tracking-tight transition-transform duration-300 ease-out group-hover:translate-x-1">
                  {service.title}
                </h3>
                <p className="mt-3 text-fg-muted leading-relaxed max-w-xl">
                  {service.summary}
                </p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {service.tools.map((tool) => (
                    <li
                      key={tool}
                      className="px-2.5 py-1 rounded-md border border-line bg-surface-raised font-mono text-[10px] uppercase tracking-wider text-fg-subtle"
                    >
                      {tool}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  </Section>
);

export default Services;
