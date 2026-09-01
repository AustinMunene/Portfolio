import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';
import Bezel from './Bezel';

/*
 * The point of this one is that it gives a different answer every time, from the
 * same code, against the same build. Nothing else on the page shows that, and it
 * is the single most common reason teams stop trusting a suite they paid for.
 *
 * Each test carries a real failure mode rather than a random number: the causes
 * below are the ones that actually produce intermittent reds in CI.
 */
interface FlakyTest {
  id: number;
  name: string;
  /** Probability this test passes on any given run. */
  passRate: number;
  cause: string;
  explanation: string;
  fix: string;
}

const TESTS: FlakyTest[] = [
  {
    id: 1,
    name: 'auth › logs in with valid credentials',
    passRate: 1,
    cause: 'Stable',
    explanation:
      'This one is genuinely deterministic. It sets up its own user, asserts on a role-based locator, and cleans up after itself. Most of a suite should look like this.',
    fix: 'Nothing to fix.',
  },
  {
    id: 2,
    name: 'dashboard › shows the latest order',
    passRate: 0.55,
    cause: 'Shared test data',
    explanation:
      'Reads "the latest order" from a shared staging database. When anyone else runs the suite at the same time, their order is the latest one, and this assertion is looking at a stranger\'s data.',
    fix: 'Seed an order this test owns, and assert on that id rather than on whatever happens to be newest.',
  },
  {
    id: 3,
    name: 'search › filters results by category',
    passRate: 0.7,
    cause: 'Fixed sleep',
    explanation:
      'Waits a hard-coded 500ms for results to render. On a fast machine that is plenty. On a loaded CI runner it is not, and the assertion fires against an empty list.',
    fix: 'Wait for the condition, not the clock — assert the list is visible and let the runner retry until it is.',
  },
  {
    id: 4,
    name: 'checkout › applies a discount code',
    passRate: 0.8,
    cause: 'Test order dependency',
    explanation:
      'Relies on a cart the previous test left behind. It passes when the suite runs in file order and fails the moment anything runs in parallel or the earlier test is skipped.',
    fix: 'Build the cart in this test, in a fixture. A test that needs another test to have run first is not a test yet.',
  },
  {
    id: 5,
    name: 'reports › renders the monthly chart',
    passRate: 0.9,
    cause: 'Animation timing',
    explanation:
      'Screenshots the chart while it is still animating in. Nine times out of ten the capture lands after the transition; the tenth is a diff nobody can reproduce locally.',
    fix: 'Disable animations in the test environment, or wait for the transition to settle before capturing.',
  },
];

type Result = 'idle' | 'running' | 'pass' | 'fail';

const idle = (): Result[] => TESTS.map(() => 'idle');

const FlakyRunner: React.FC = () => {
  const [results, setResults] = useState<Result[]>(idle);
  const [running, setRunning] = useState(false);
  const [runs, setRuns] = useState<number[]>([]); // failures per run
  const [selected, setSelected] = useState<number | null>(null);

  const runToken = useRef(0);
  useEffect(() => () => { runToken.current += 1; }, []);

  const runSuite = async () => {
    runToken.current += 1;
    const token = runToken.current;

    setRunning(true);
    setSelected(null);
    setResults(idle());

    let failures = 0;

    for (let i = 0; i < TESTS.length; i++) {
      if (runToken.current !== token) return;
      setResults((p) => p.map((r, n) => (n === i ? 'running' : r)));
      await new Promise((r) => setTimeout(r, 260));
      if (runToken.current !== token) return;

      const passed = Math.random() < TESTS[i].passRate;
      if (!passed) failures += 1;
      setResults((p) => p.map((r, n) => (n === i ? (passed ? 'pass' : 'fail') : r)));
    }

    setRuns((prev) => [...prev, failures].slice(-12));
    setRunning(false);
  };

  const reset = () => {
    runToken.current += 1;
    setResults(idle());
    setRuns([]);
    setSelected(null);
    setRunning(false);
  };

  const green = runs.filter((f) => f === 0).length;
  const detail = selected !== null ? TESTS[selected] : null;

  return (
    <Bezel>
      <div className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 pb-6 border-b border-line">
          <div>
            <h3 className="text-2xl font-display text-fg">The same suite, again</h3>
            <p className="text-sm text-fg-muted mt-1 max-w-xl">
              Nothing changes between runs. Not the code, not the build, not the data you can see.
              Press it a few times.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={runSuite}
              disabled={running}
              className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider select-none transition-all duration-200 ${
                running
                  ? 'bg-brand-soft border border-brand-line text-fg'
                  : 'bg-emerald-600 hover:bg-emerald-500 border border-emerald-500/20 text-fg shadow-[0_4px_16px_rgba(16,185,129,0.15)] active:scale-95'
              }`}
            >
              <Play className={`w-3.5 h-3.5 ${running ? 'animate-spin' : ''}`} />
              {running ? 'Running...' : runs.length ? 'Run again' : 'Run suite'}
            </button>

            <button
              onClick={reset}
              disabled={running}
              className="flex items-center justify-center w-10 h-10 rounded-full border border-line bg-surface-raised text-fg-muted hover:text-fg transition-all duration-200 active:scale-90 disabled:opacity-40 disabled:cursor-not-allowed"
              title="Reset"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 space-y-2">
            {TESTS.map((test, i) => {
              const r = results[i];
              return (
                <button
                  key={test.id}
                  onClick={() => setSelected(selected === i ? null : i)}
                  className={`w-full text-left rounded-xl border px-4 py-3 flex items-center gap-3 transition-all duration-300 ${
                    r === 'running'
                      ? 'bg-brand-soft border-brand-line'
                      : r === 'pass'
                      ? 'bg-emerald-500/5 border-emerald-500/10'
                      : r === 'fail'
                      ? 'bg-red-500/5 border-red-500/15'
                      : 'bg-surface-raised border-line'
                  } ${selected === i ? 'ring-1 ring-brand-line' : ''}`}
                >
                  <span className="flex-shrink-0">
                    {r === 'running' && (
                      <span className="relative flex h-4 w-4">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-accent-500" />
                      </span>
                    )}
                    {r === 'pass' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                    {r === 'fail' && <XCircle className="w-4 h-4 text-red-400" />}
                    {r === 'idle' && <span className="block w-4 h-4 rounded-full border border-line" />}
                  </span>

                  <span className={`font-mono text-xs truncate ${r === 'idle' ? 'text-fg-subtle' : 'text-fg'}`}>
                    {test.name}
                  </span>

                  <span
                    className={`ml-auto flex-shrink-0 text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                      test.passRate === 1
                        ? 'border-line text-fg-subtle'
                        : 'border-amber-500/30 text-amber-300/90'
                    }`}
                  >
                    {test.cause}
                  </span>
                </button>
              );
            })}

            <p className="text-[11px] text-fg-subtle pt-2">Click any test to see why it is unreliable.</p>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-2xl border border-line bg-surface p-5">
              <div className="text-[11px] uppercase tracking-wider text-fg-subtle mb-3">Run history</div>

              {runs.length === 0 ? (
                <p className="text-xs text-fg-subtle py-4">No runs yet.</p>
              ) : (
                <>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {runs.map((failures, i) => (
                      <span
                        key={i}
                        title={failures === 0 ? 'all passed' : `${failures} failed`}
                        className={`w-7 h-7 rounded-md flex items-center justify-center text-[10px] font-mono border ${
                          failures === 0
                            ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300'
                            : 'bg-red-500/10 border-red-500/20 text-red-300'
                        }`}
                      >
                        {failures === 0 ? '✓' : failures}
                      </span>
                    ))}
                  </div>

                  <div className="text-sm text-fg-muted">
                    <span className="text-fg font-mono">{green}</span> of{' '}
                    <span className="text-fg font-mono">{runs.length}</span> runs came back fully green.
                  </div>
                </>
              )}
            </div>

            <AnimatePresence mode="wait">
              {detail && (
                <motion.div
                  key={detail.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-2xl border border-line bg-surface-raised p-5"
                >
                  <div className="text-[10px] uppercase tracking-wider text-fg-muted mb-2">{detail.cause}</div>
                  <p className="text-sm text-fg-muted leading-relaxed mb-3">{detail.explanation}</p>
                  <p className="text-sm text-fg leading-relaxed">
                    <span className="text-fg-subtle">Fix: </span>
                    {detail.fix}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {runs.length >= 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 pt-6 border-t border-line flex items-start gap-3"
          >
            <AlertTriangle className="w-4 h-4 text-fg-muted flex-shrink-0 mt-0.5" />
            <div className="space-y-3 text-sm text-fg-muted leading-relaxed">
              <p>
                None of those failures were bugs. The application never changed. Every red you just saw came
                from the test, not the product.
              </p>
              <p>
                This is how a suite dies. Not in one dramatic moment — it just goes red often enough, for
                reasons nobody has time to chase, that people start re-running it until it goes green. Once
                that becomes the habit, a real failure looks exactly like the noise.
              </p>
              <p className="text-fg">
                Which is why the question to ask about an existing suite is not how much coverage it has.
                It is whether anybody still believes it.
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </Bezel>
  );
};

export default FlakyRunner;
