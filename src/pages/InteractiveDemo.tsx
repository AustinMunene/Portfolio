import React from 'react';
import { motion } from 'framer-motion';
import InteractiveCodeEditor from '../components/InteractiveCodeEditor';
import Interactive3DScene from '../components/Interactive3DScene';
import InteractiveDataViz from '../components/InteractiveDataViz';
import CypressTestSimulation from '/Users/austin/Personal Project/Portfolio/src/components/CypressTestSimulation.tsx';
import PerformanceChart from '/Users/austin/Personal Project/Portfolio/src/components/PerfomanceChart.tsx';
import TailwindDemo from '/Users/austin/Personal Project/Portfolio/src/components/TailwindDemo.tsx';

const InteractiveDemo: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto"
      >
        <h1 className="text-4xl font-bold mb-4">Interactive Demo</h1>
        <p className="text-gray-400 mb-12">
          Explore these interactive components showcasing my technical skills and expertise.
        </p>

        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-semibold mb-6">Interactive Code Editor</h2>
            <InteractiveCodeEditor
              initialCode={`// Try editing this code and run it\nfunction calculateFibonacci(n) {\n  if (n <= 1) return n;\n  return calculateFibonacci(n - 1) + calculateFibonacci(n - 2);\n}\n\n// Calculate the 10th Fibonacci number\ncalculateFibonacci(10);`}
              language="javascript"
              title="Fibonacci Calculator"
              description="Edit this code to calculate different Fibonacci numbers or try your own code."
            />
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6">Cypress Test Playground</h2>
            <CypressTestSimulation />
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6">k6 Performance Test Simulator</h2>
            <PerformanceChart />
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6">Tailwind UI Builder</h2>
            <TailwindDemo />
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6">Interactive 3D Scene</h2>
            <Interactive3DScene />
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6">Interactive Data Visualization</h2>
            <InteractiveDataViz />
          </section>
        </div>
      </motion.div>
    </div>
  );
};

export default InteractiveDemo;
