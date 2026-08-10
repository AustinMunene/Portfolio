import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Copy, Check, Terminal, FileCode, Sparkles } from 'lucide-react';
import Bezel from './Bezel';

interface InteractiveCodeEditorProps {
  initialCode: string;
  language: string;
  title?: string;
  description?: string;
}

const InteractiveCodeEditor: React.FC<InteractiveCodeEditorProps> = ({
  initialCode,
  language,
  title = 'Interactive Playground',
  description = 'Run sandboxed assertions or mock compilation workflows instantly.'
}) => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<string>('');
  const [isCopied, setIsCopied] = useState(false);
  const [executing, setExecuting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isJavaScript = language === 'javascript' || language === 'js';
  const fileName = `main.${isJavaScript ? 'js' : language}`;

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => {
        setIsCopied(false);
      }, 1800);
      return () => clearTimeout(timer);
    }
  }, [isCopied]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
  };

  const handleRunCode = async () => {
    setError(null);
    setExecuting(true);
    setOutput('');
    
    // Simulate high-fidelity compiler thread processing delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    try {
      if (isJavaScript) {
        const safeEval = new Function('return ' + code);
        const result = safeEval();
        setOutput(result !== undefined ? String(result) : 'Process exited with code 0 (Success)');
      } else {
        setOutput('Browser environment only supports client-side JavaScript execution.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown compilation exception');
    } finally {
      setExecuting(false);
    }
  };

  return (
    <Bezel>
      <>
        {/* Mock IDE Header / Chrome */}
        <div className="bg-[#030305] px-5 py-3.5 border-b border-white/[0.05] flex items-center justify-between select-none">
          <div className="flex items-center gap-3">
            {/* macOS window actions */}
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>
            
            <span className="h-4 w-px bg-white/10 mx-1" />
            
            {/* Tab header: filename tracks the language rather than hardcoding .js */}
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/[0.03] border border-white/[0.05] text-xs text-accent-300 font-mono">
              <FileCode className="w-3.5 h-3.5 text-accent-400" />
              {fileName}
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Copy Button with Haptic Scale */}
            <button
              onClick={handleCopyCode}
              className="p-2 text-gray-400 hover:text-white transition-all duration-150 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/5 active:scale-90"
              title="Copy Code"
            >
              {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
            
            {/* Run Button with Glowing Accents */}
            <button
              onClick={handleRunCode}
              disabled={executing}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold font-space-grotesk tracking-wide transition-all duration-200 select-none ${
                executing
                  ? 'bg-accent-500/10 border border-accent-500/20 text-accent-300'
                  : 'bg-accent-500 hover:bg-accent-400 border border-accent-400/20 text-white shadow-[0_4px_16px_rgba(99,102,241,0.25)] active:scale-95'
              }`}
            >
              <Play className={`w-3.5 h-3.5 ${executing ? 'animate-pulse' : ''}`} />
              {executing ? 'Compiling...' : 'Run Code'}
            </button>
          </div>
        </div>
        
        {/* Caption band: carries the title/description the caller passes in. */}
        {(title || description) && (
          <div className="px-6 py-4 border-b border-white/[0.05] bg-white/[0.01]">
            {title && (
              <h3 className="text-sm font-semibold text-white font-space-grotesk tracking-tight">
                {title}
              </h3>
            )}
            {description && (
              <p className="text-xs text-gray-400 mt-1 leading-relaxed max-w-xl">{description}</p>
            )}
          </div>
        )}

        {/* IDE Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12">
          
          {/* Main Code Area (7 Columns) */}
          <div className="lg:col-span-7 p-6 border-b lg:border-b-0 lg:border-r border-white/[0.05] flex gap-4 bg-black/40">
            {/* Line numbers for nerd developer vibe */}
            <div className="hidden sm:flex flex-col text-right font-mono text-xs text-gray-600 select-none pt-2.5 space-y-1 w-6">
              {Array.from({ length: Math.max(code.split('\n').length, 8) }).map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>
            
            <div className="flex-1 relative">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-56 bg-transparent text-[#e4e4e7] p-1 font-mono text-xs md:text-sm leading-relaxed focus:outline-none resize-none scrollbar-thin"
                spellCheck="false"
              />
            </div>
          </div>

          {/* Compilation Terminal Output Panel (5 Columns) */}
          <div className="lg:col-span-5 p-6 bg-[#030305]/60 flex flex-col justify-between min-h-[16rem]">
            <div className="flex-1 flex flex-col">
              <div className="flex items-center gap-2 text-gray-500 font-mono text-xs uppercase tracking-wider pb-3 border-b border-white/[0.05] select-none">
                <Terminal className="w-3.5 h-3.5" />
                <span>Compiler Terminal Output</span>
              </div>
              
              <div className="flex-1 py-4 font-mono text-xs overflow-y-auto max-h-44 scrollbar-thin">
                <AnimatePresence mode="wait">
                  {executing ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2 text-accent-300"
                    >
                      <Sparkles className="w-3.5 h-3.5 animate-spin" />
                      <span>[SPAWNING_SANDBOX_THREAD]...</span>
                    </motion.div>
                  ) : error ? (
                    <motion.div
                      initial={{ opacity: 0, y: 3 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-400 bg-red-950/20 p-3 rounded-lg border border-red-500/10 leading-relaxed"
                    >
                      ❌ SyntaxError: {error}
                    </motion.div>
                  ) : output ? (
                    <motion.div
                      initial={{ opacity: 0, y: 3 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-1 text-emerald-400"
                    >
                      <div className="text-gray-500">// Execution complete</div>
                      <div className="leading-relaxed whitespace-pre-wrap">{output}</div>
                    </motion.div>
                  ) : (
                    <div className="text-gray-600 italic select-none py-6 text-center">
                      Click "Run Code" above to execute compiling process...
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="pt-3 border-t border-white/[0.05] text-[10px] text-gray-500 font-mono flex justify-between select-none">
              <span>LANG: ECMAScript V6</span>
              <span>STATUS: READY</span>
            </div>
          </div>

        </div>
      </>
    </Bezel>
  );
};

export default InteractiveCodeEditor;
