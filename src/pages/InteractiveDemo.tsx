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
      <div
        className="absolute inset-0 bg-contain md:bg-cover bg-center bg-no-repeat opacity-70 saturate-150 contrast-125"
        style={{ backgroundImage: "url('/dev.png')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black/80" />
      <div className="container mx-auto px-4 py-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto"
        >
          <h1 className="text-3xl font-bold mb-4 gradient-text">Interactive Demo</h1>
          <p className="text-gray-300 mb-12">
            Explore these interactive components showcasing my technical skills and expertise.
          </p>

          <div className="space-y-12">
            <section>
              <h2 className="text-xl font-semibold mb-6">Interactive Code Editor</h2>
            <InteractiveCodeEditor
              initialCode={`// Try editing this code and run it\nfunction calculateFibonacci(n) {\n  if (n <= 1) return n;\n  return calculateFibonacci(n - 1) + calculateFibonacci(n - 2);\n}\n\n// Calculate the 10th Fibonacci number\ncalculateFibonacci(10);`}
              language="javascript"
              title="Fibonacci Calculator"
              description="Edit this code to calculate different Fibonacci numbers or try your own code."
            />
            </section>

          <section>
            <h2 className="text-xl font-semibold mb-6">Cypress Test Playground</h2>
            <CypressTestSimulation />
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-6">k6 Performance Test Simulator</h2>
            <PerformanceChart />
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-6">Tailwind UI Builder</h2>
            <TailwindDemo />
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-6">Interactive 3D Scene</h2>
            <Interactive3DScene />
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-6">Interactive Data Visualization</h2>
            <InteractiveDataViz />
          </section>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InteractiveDemo;
