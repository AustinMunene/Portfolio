import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Copy, Check } from 'lucide-react';

interface InteractiveCodeEditorProps {
  initialCode: string;
  language: string;
  title?: string;
  description?: string;
}

const InteractiveCodeEditor: React.FC<InteractiveCodeEditorProps> = ({
  initialCode,
  language,
  title = 'Interactive Code Editor',
  description = 'Edit and run this code snippet to see the results.'
}) => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<string>('');
  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Reset copied state after 2 seconds
  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => {
        setIsCopied(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isCopied]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
  };

  const handleRunCode = () => {
    setError(null);
    try {
      // This is a simplified version - in a real app, you'd use a more secure approach
      // or a backend service to execute code
      if (language === 'javascript' || language === 'js') {
        // Create a safe environment to run the code
        const safeEval = new Function('return ' + code);
        const result = safeEval();
        setOutput(result !== undefined ? String(result) : 'Code executed successfully');
      } else {
        setOutput('This language is not supported for execution in the browser.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setOutput('');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800"
    >
      <div className="p-4 border-b border-gray-800 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          {description && <p className="text-sm text-gray-400 mt-1">{description}</p>}
        </div>
        <div className="flex space-x-2">
          <button
            onClick={handleCopyCode}
            className="p-2 text-gray-400 hover:text-white transition-colors rounded-md hover:bg-gray-800"
            aria-label="Copy code"
          >
            {isCopied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
          </button>
          <button
            onClick={handleRunCode}
            className="p-2 text-blue-400 hover:text-blue-300 transition-colors rounded-md hover:bg-gray-800"
            aria-label="Run code"
          >
            <Play className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <div className="p-4">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full h-48 bg-gray-950 text-gray-200 p-4 rounded-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          spellCheck="false"
        />
      </div>
      
      {(output || error) && (
        <div className="p-4 border-t border-gray-800">
          <h4 className="text-sm font-semibold mb-2">Output:</h4>
          {error ? (
            <div className="bg-red-900/30 text-red-400 p-3 rounded-md font-mono text-sm">
              {error}
            </div>
          ) : (
            <div className="bg-gray-950 text-gray-200 p-3 rounded-md font-mono text-sm">
              {output}
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default InteractiveCodeEditor; 