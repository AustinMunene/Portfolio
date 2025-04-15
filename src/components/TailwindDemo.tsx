import React, { useState } from 'react';

const styles = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700',
  secondary: 'bg-gray-600 text-white hover:bg-gray-700',
  danger: 'bg-red-600 text-white hover:bg-red-700',
};

const TailwindDemo: React.FC = () => {
  const [selected, setSelected] = useState("primary");

  return (
    <div className="bg-gray-900 text-white p-6 rounded shadow-md">
      <h3 className="text-xl font-bold mb-4">Tailwind UI Builder</h3>
      <p className="mb-4 text-sm text-gray-300">Preview dynamic Tailwind buttons</p>

      <div className="mb-4">
        <label className="mr-4 font-semibold">Select Style:</label>
        <select
          className="bg-gray-700 text-white px-3 py-2 rounded"
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
        >
          {Object.keys(styles).map((key) => (
            <option key={key} value={key}>
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <button className={`px-4 py-2 rounded transition ${styles[selected]}`}>
        Tailwind Button
      </button>

      <div className="mt-4 text-sm text-gray-400">
        <code>{`class="${styles[selected]}"`}</code>
      </div>
    </div>
  );
};

export default TailwindDemo;
