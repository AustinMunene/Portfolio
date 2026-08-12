import React from 'react';
import { motion } from 'framer-motion';
import InteractiveCodeEditor from '../components/InteractiveCodeEditor';
import Interactive3DScene from '../components/Interactive3DScene';
import InteractiveDataViz from '../components/InteractiveDataViz';
import CypressTestSimulation from '../components/CypressTestSimulation';
import PerformanceChart from '../components/PerfomanceChart';
import TailwindDemo from '../components/TailwindDemo';

const InteractiveDemo: React.FC = () => {
  return (
    <section className="section-glow relative min-h-screen bg-surface overflow-hidden">
      <div className="container mx-auto px-4 py-24 relative z-10">
        <motion.div
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto"
        >
          <div className="text-center mb-16">
            <span className="text-fg-muted text-sm font-medium tracking-wider uppercase mb-4 block">
              Playground
            </span>
            <h1 className="text-4xl md:text-5xl font-display mb-4 gradient-text">Interactive Demo</h1>
            <p className="text-fg-muted max-w-lg mx-auto">
              Explore these interactive components showcasing my technical skills and expertise.
            </p>
          </div>

          <div className="space-y-16">
            <section>
              <h2 className="text-xl font-semibold mb-6 text-fg flex items-center gap-3">
                <span className="h-1 w-6 bg-brand rounded-full" />
                Interactive Code Editor
              </h2>
              <InteractiveCodeEditor
                initialCode={`// Try editing this code and run it\nfunction calculateFibonacci(n) {\n  if (n <= 1) return n;\n  return calculateFibonacci(n - 1) + calculateFibonacci(n - 2);\n}\n\n// Calculate the 10th Fibonacci number\ncalculateFibonacci(10);`}
                language="javascript"
                title="Fibonacci Calculator"
                description="Edit this code to calculate different Fibonacci numbers or try your own code."
              />
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-6 text-fg flex items-center gap-3">
                <span className="h-1 w-6 bg-brand rounded-full" />
                Cypress Test Playground
              </h2>
              <CypressTestSimulation />
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-6 text-fg flex items-center gap-3">
                <span className="h-1 w-6 bg-brand rounded-full" />
                k6 Performance Test Simulator
              </h2>
              <PerformanceChart />
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-6 text-fg flex items-center gap-3">
                <span className="h-1 w-6 bg-brand rounded-full" />
                Tailwind UI Builder
              </h2>
              <TailwindDemo />
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-6 text-fg flex items-center gap-3">
                <span className="h-1 w-6 bg-brand rounded-full" />
                Interactive 3D Scene
              </h2>
              <Interactive3DScene />
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-6 text-fg flex items-center gap-3">
                <span className="h-1 w-6 bg-brand rounded-full" />
                Interactive Data Visualization
              </h2>
              <InteractiveDataViz />
            </section>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InteractiveDemo;
