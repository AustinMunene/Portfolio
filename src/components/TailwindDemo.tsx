import React, { useState } from 'react';

/* Literal Tailwind classes on purpose: this demo's whole subject is the class
   string it prints below the button, so these must not become theme tokens. */
const styles = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700',
  secondary: 'bg-gray-600 text-white hover:bg-gray-700',
  danger: 'bg-red-600 text-white hover:bg-red-700',
};

type StyleKey = keyof typeof styles;

const TailwindDemo: React.FC = () => {
  const [selected, setSelected] = useState<StyleKey>('primary');

  return (
    <div className="bg-surface-raised rounded-2xl overflow-hidden border border-line">
      <div className="p-4 border-b border-line">
        <h3 className="text-lg font-semibold text-fg">Tailwind UI Builder</h3>
        <p className="text-sm text-fg-muted mt-1">Preview dynamic Tailwind buttons</p>
      </div>

      <div className="p-4">
        <div className="flex items-center gap-3 mb-4">
          <label htmlFor="tw-style" className="text-sm font-semibold text-fg-muted">
            Select Style:
          </label>
          <select
            id="tw-style"
            className="bg-surface-alt text-fg border border-line px-3 py-2 rounded-lg text-sm"
            value={selected}
            onChange={(e) => setSelected(e.target.value as StyleKey)}
          >
            {(Object.keys(styles) as StyleKey[]).map((key) => (
              <option key={key} value={key}>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <button className={`px-4 py-2 rounded-lg transition-colors ${styles[selected]}`}>
          Tailwind Button
        </button>

        <div className="mt-4 text-sm font-mono text-fg-subtle">
          <code>{`class="${styles[selected]}"`}</code>
        </div>
      </div>
    </div>
  );
};

export default TailwindDemo;
