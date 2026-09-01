import React from 'react';
import { motion } from 'framer-motion';
import Interactive3DScene from '../components/Interactive3DScene';
import TestRunnerSimulation from '../components/TestRunnerSimulation';
import ManualVsAutomated from '../components/ManualVsAutomated';
import FlakyRunner from '../components/FlakyRunner';
import LoadTestSimulator from '../components/LoadTestSimulator';

const SECTIONS = [
  {
    title: 'Manual vs automated, side by side',
    element: <ManualVsAutomated />,
  },
  {
    title: 'Cypress vs Playwright, line by line',
    element: <TestRunnerSimulation />,
  },
  {
    title: 'Why nobody trusts the suite',
    element: <FlakyRunner />,
  },
  {
    title: 'Load profiles, and what each one asks',
    element: <LoadTestSimulator />,
  },
  {
    title: 'Module Graph',
    element: <Interactive3DScene />,
  },
];

const InteractiveDemo: React.FC = () => {
  return (
    <section className="section-glow relative min-h-screen bg-surface overflow-hidden">
      <div className="container mx-auto px-4 py-24 relative z-10">
        <motion.div
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-16">
            <span className="text-fg-muted text-sm font-medium tracking-wider uppercase mb-4 block">
              Playground
            </span>
            <h1 className="text-4xl md:text-5xl font-display mb-4 gradient-text">Interactive Demo</h1>
            <p className="text-fg-muted max-w-lg mx-auto">
              Testing, taken apart so you can see how it works. Run things, break things,
              and click anything that looks like it has an explanation behind it.
            </p>
          </div>

          <div className="space-y-16">
            {SECTIONS.map(({ title, element }) => (
              <section key={title}>
                <h2 className="text-xl font-semibold mb-6 text-fg flex items-center gap-3">
                  <span className="h-1 w-6 bg-brand rounded-full" />
                  {title}
                </h2>
                {element}
              </section>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InteractiveDemo;
