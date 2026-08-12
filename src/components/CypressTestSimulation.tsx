import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, CheckCircle2, XCircle, Terminal, HelpCircle, Eye } from 'lucide-react';
import Bezel from './Bezel';

interface TestCase {
  id: number;
  title: string;
  status: 'idle' | 'running' | 'pass' | 'fail';
  duration: number;
  log?: string[];
}

const INITIAL_TEST_CASES: TestCase[] = [
  { 
    id: 1, 
    title: "GET /api/v1/auth/session - Should resolve session token", 
    status: 'idle', 
    duration: 140,
    log: [
      "cy.request('GET', '/api/v1/auth/session')",
      "↳ status code is 200 OK",
      "↳ headers contains content-type: application/json",
      "↳ body contains session_token"
    ]
  },
  { 
    id: 2, 
    title: "DOM /login - Should submit credentials & redirect on 200", 
    status: 'idle', 
    duration: 480,
    log: [
      "cy.visit('/login')",
      "cy.get('input[name=email]').type('qa-runner@example.com')",
      "cy.get('input[name=password]').type('••••••••••••')",
      "cy.get('button[type=submit]').click()",
      "↳ POST /api/v1/auth/login -> 200 OK",
      "↳ cy.url() should match /dashboard"
    ]
  },
  { 
    id: 3, 
    title: "E2E /dashboard - Should pull telemetry grids & assert chart values", 
    status: 'idle', 
    duration: 620,
    log: [
      "cy.visit('/dashboard')",
      "cy.get('.telemetry-grid').should('be.visible')",
      "↳ assert chart.dataset.length > 0",
      "↳ assert chart.yAxis.max <= 100",
      "❌ Error: Expected <100> to be less than or equal to <95>"
    ]
  },
];

/** Fresh copies every time, so state never aliases the module-level constant. */
const idleTests = (): TestCase[] => INITIAL_TEST_CASES.map((t) => ({ ...t, status: 'idle' }));

/** The suite is authored so this one fails - that failing log is the point of the demo. */
const FAILING_INDEX = 2;

const CypressTestSimulation: React.FC = () => {
  const [running, setRunning] = useState(false);
  const [tests, setTests] = useState<TestCase[]>(idleTests);
  const [activeLogIndex, setActiveLogIndex] = useState<number | null>(null);

  // Bumped on reset/unmount so an in-flight run knows to abandon its remaining
  // steps instead of writing status into a suite the user already cleared.
  const runToken = useRef(0);

  useEffect(() => () => { runToken.current += 1; }, []);

  const setStatus = (index: number, status: TestCase['status']) => {
    setTests((prev) => prev.map((t, i) => (i === index ? { ...t, status } : t)));
  };

  const runTests = async () => {
    const token = runToken.current;

    setRunning(true);
    setActiveLogIndex(null);
    setTests(idleTests());

    for (let i = 0; i < INITIAL_TEST_CASES.length; i++) {
      setStatus(i, 'running');

      // Simulate step delays
      await new Promise((resolve) => setTimeout(resolve, INITIAL_TEST_CASES[i].duration + 600));

      // A reset (or unmount) during the await invalidates this run.
      if (runToken.current !== token) return;

      setStatus(i, i === FAILING_INDEX ? 'fail' : 'pass');
    }

    setRunning(false);
    setActiveLogIndex(FAILING_INDEX); // Auto-focus failing log for QA diagnostic feel
  };

  const resetSimulation = () => {
    runToken.current += 1;
    setTests(idleTests());
    setActiveLogIndex(null);
    setRunning(false);
  };

  return (
    <Bezel>
      <>
        {/* Mock E2E Runner Window Chrome */}
        <div className="bg-surface-alt px-5 py-3.5 border-b border-line flex items-center justify-between select-none">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span className="h-4 w-px bg-surface-raised mx-2" />
            <span className="flex items-center gap-1.5 text-xs font-mono text-fg-subtle">
              <Terminal className="w-3.5 h-3.5" />
              CYPRESS_RUNNER_V10.8
            </span>
          </div>
          
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-md bg-surface-raised border border-line">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-mono text-fg-muted">HOST: localhost:3000/tests</span>
          </div>
        </div>

        {/* Console Content Dashboard */}
        <div className="p-6 md:p-8">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 pb-6 border-b border-line">
            <div>
              <h3 className="text-2xl font-display text-fg">QA Automation Sandbox</h3>
              <p className="text-sm text-fg-muted mt-1">
                Interact with this real-time simulated E2E test suite to run asserting assertions.
              </p>
            </div>

            {/* Action Buttons with Haptic Click Scale */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              <button
                onClick={runTests}
                disabled={running}
                className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider select-none transition-all duration-200 outline-none ${
                  running
                    ? 'bg-brand-soft border border-brand-line text-fg'
                    : 'bg-emerald-600 hover:bg-emerald-500 border border-emerald-500/20 text-fg shadow-[0_4px_16px_rgba(16,185,129,0.15)] active:scale-95'
                }`}
              >
                <Play className={`w-3.5 h-3.5 ${running ? 'animate-spin' : ''}`} />
                {running ? 'Asserting...' : 'Run Automation'}
              </button>

              <button
                onClick={resetSimulation}
                className="flex items-center justify-center w-10 h-10 rounded-full border border-line bg-surface-raised text-fg-muted hover:text-fg hover:border-line transition-all duration-200 active:scale-90 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:text-fg-muted disabled:hover:border-line"
                title={running ? 'Suite is running' : 'Reset Suite'}
                disabled={running}
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Grid Layout: Left Test Results, Right Terminal Diagnostics */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Test Results list (7 Cols) */}
            <div className="lg:col-span-7 space-y-3">
              {tests.map((test, index) => {
                const isRunning = test.status === 'running';
                const isPass = test.status === 'pass';
                const isFail = test.status === 'fail';
                
                return (
                  <div
                    key={test.id}
                    onClick={() => test.status !== 'idle' && setActiveLogIndex(index)}
                    className={`p-4 rounded-xl border transition-all duration-300 select-none cursor-pointer flex items-center justify-between gap-4 ${
                      isRunning
                        ? 'bg-brand-soft border-brand-line'
                        : isPass
                        ? 'bg-emerald-500/5 border-emerald-500/10 hover:border-emerald-500/30'
                        : isFail
                        ? 'bg-red-500/5 border-red-500/15 hover:border-red-500/35'
                        : 'bg-surface-raised border-line hover:border-line'
                    }`}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      {/* State Indicators */}
                      <span className="flex-shrink-0">
                        {isRunning && (
                          <span className="relative flex h-4 w-4">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-4 w-4 bg-accent-500" />
                          </span>
                        )}
                        {isPass && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                        {isFail && <XCircle className="w-5 h-5 text-red-400" />}
                        {test.status === 'idle' && <HelpCircle className="w-5 h-5 text-fg-subtle" />}
                      </span>

                      <div className="min-w-0">
                        <span className={`text-xs font-semibold uppercase tracking-wider ${
                          isPass ? 'text-emerald-400' : isFail ? 'text-red-400' : isRunning ? 'text-fg' : 'text-fg-subtle'
                        }`}>
                          TEST_SUITE_#{test.id} · {test.status}
                        </span>
                        <h4 className="text-sm font-medium text-fg mt-0.5 truncate">{test.title}</h4>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className="text-[11px] font-mono text-fg-subtle">
                        {test.status !== 'idle' ? `${test.duration}ms` : '--'}
                      </span>
                      {test.status !== 'idle' && (
                        <Eye className={`w-4 h-4 transition-colors duration-200 ${
                          activeLogIndex === index ? 'text-fg-muted' : 'text-fg-subtle group-hover:text-fg-muted'
                        }`} />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Terminal Diagnostic Panel (5 Cols) */}
            <div className="lg:col-span-5 h-full">
              <div className="rounded-2xl bg-surface border border-line p-5 h-64 flex flex-col justify-between font-mono text-xs overflow-hidden shadow-2xl">
                <div className="flex items-center justify-between pb-3 border-b border-line text-fg-subtle select-none">
                  <span>DIAGNOSTIC_SHELL_LOG</span>
                  <span className="text-[10px] bg-surface-raised px-2 py-0.5 rounded">UTF-8</span>
                </div>
                
                <div className="flex-1 overflow-y-auto py-3 space-y-2 scrollbar-thin">
                  <AnimatePresence mode="wait">
                    {activeLogIndex !== null ? (
                      <motion.div
                        key={activeLogIndex}
                        initial={{ opacity: 0, x: 5 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-1.5"
                      >
                        <span className="text-fg-muted block text-[11px] mb-2 font-semibold">
                          // Terminal output for test #{tests[activeLogIndex].id}
                        </span>
                        {tests[activeLogIndex].log?.map((logLine, idx) => (
                          <div 
                            key={idx} 
                            className={`leading-relaxed whitespace-pre-wrap ${
                              logLine.startsWith('❌') 
                                ? 'text-red-400 bg-red-950/20 px-2 py-1 rounded border border-red-500/10 mt-1' 
                                : logLine.startsWith('↳') 
                                ? 'text-fg-muted pl-3' 
                                : 'text-emerald-300'
                            }`}
                          >
                            {logLine}
                          </div>
                        ))}
                      </motion.div>
                    ) : (
                      <div className="h-full flex flex-col items-center justify-center text-center text-fg-subtle py-10 select-none">
                        <Terminal className="w-8 h-8 text-fg/[0.03] mb-3" />
                        <p className="text-[11px]">Select a passed or failed test</p>
                        <p className="text-[10px] mt-0.5">to extract logs & E2E assertions.</p>
                      </div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="pt-2.5 border-t border-line text-[10px] text-fg-subtle flex justify-between select-none">
                  <span>ASSERTIONS: {tests.filter(t => t.status === 'pass').length} passed / {tests.filter(t => t.status === 'fail').length} failed</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </>
    </Bezel>
  );
};

export default CypressTestSimulation;
