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
    <section className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-black" />
      <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-accent-600/10 rounded-full blur-[128px]" />
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-accent-800/8 rounded-full blur-[128px]" />

      <div className="container mx-auto px-4 py-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto"
        >
          <div className="text-center mb-16">
            <span className="text-accent-400 text-sm font-medium tracking-wider uppercase mb-4 block">
              Playground
            </span>
            <h1 className="text-4xl md:text-5xl font-display mb-4 gradient-text">Interactive Demo</h1>
            <p className="text-gray-400 max-w-lg mx-auto">
              Explore these interactive components showcasing my technical skills and expertise.
            </p>
          </div>

          <div className="space-y-16">
            <section>
              <h2 className="text-xl font-semibold mb-6 text-white flex items-center gap-3">
                <span className="h-1 w-6 bg-accent-500 rounded-full" />
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
              <h2 className="text-xl font-semibold mb-6 text-white flex items-center gap-3">
                <span className="h-1 w-6 bg-accent-500 rounded-full" />
                Cypress Test Playground
              </h2>
              <CypressTestSimulation />
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-6 text-white flex items-center gap-3">
                <span className="h-1 w-6 bg-accent-500 rounded-full" />
                k6 Performance Test Simulator
              </h2>
              <PerformanceChart />
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-6 text-white flex items-center gap-3">
                <span className="h-1 w-6 bg-accent-500 rounded-full" />
                Tailwind UI Builder
              </h2>
              <TailwindDemo />
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-6 text-white flex items-center gap-3">
                <span className="h-1 w-6 bg-accent-500 rounded-full" />
                Interactive 3D Scene
              </h2>
              <Interactive3DScene />
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-6 text-white flex items-center gap-3">
                <span className="h-1 w-6 bg-accent-500 rounded-full" />
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
