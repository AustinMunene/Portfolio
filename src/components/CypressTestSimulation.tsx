import React, { useState } from 'react';

const testCases = [
  { id: 1, title: "Should load homepage", status: "pass" },
  { id: 2, title: "Should fill and submit login form", status: "pass" },
  { id: 3, title: "Should redirect to dashboard", status: "fail" },
];

const CypressTestSimulation: React.FC = () => {
  const [running, setRunning] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  const runTests = () => {
    setRunning(true);
    setTimeout(() => {
      setResults(testCases);
      setRunning(false);
    }, 1500);
  };

  return (
    <div className="bg-gray-900 text-white p-6 rounded shadow-md">
      <h3 className="text-xl font-bold mb-4">Cypress Test Playground</h3>
      <p className="mb-4 text-sm text-gray-300">Simulated Cypress test runner</p>
      <button
        onClick={runTests}
        className="bg-green-600 hover:bg-green-700 transition px-4 py-2 rounded mb-4"
      >
        {running ? "Running..." : "Run Tests"}
      </button>

      <ul className="space-y-2">
        {results.map((test) => (
          <li
            key={test.id}
            className={`p-3 rounded border-l-4 ${
              test.status === "pass"
                ? "bg-green-700 border-green-400"
                : "bg-red-700 border-red-400"
            }`}
          >
            <span className="font-semibold">{test.title}</span> —{" "}
            <span className="uppercase">{test.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CypressTestSimulation;
