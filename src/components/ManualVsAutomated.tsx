import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, User, Bot, CheckCircle2, XCircle, AlertTriangle, Eye, Clock } from 'lucide-react';
import Bezel from './Bezel';

type Lane = 'manual' | 'auto';
type StepState = 'idle' | 'running' | 'pass' | 'caught' | 'fail' | 'missed' | 'skipped';

interface Step {
  id: number;
  spec: string;
  label: string;
  /** What a person actually takes, in seconds. */
  manualSeconds: number;
  /** What the runner actually takes, in milliseconds. */
  autoMs: number;
  manualResult: Exclude<StepState, 'idle' | 'running'>;
  autoResult: Exclude<StepState, 'idle' | 'running'>;
  manualNote?: string;
  autoNote?: string;
}

/* Two specs rather than one flat list, because it matters that a failed
   assertion aborts the rest of *its* test but not the whole run. Without that,
   the demo could only show one of the two lessons. */
const STEPS: Step[] = [
  {
    id: 1,
    spec: 'cart.spec.ts',
    label: 'Open product page',
    manualSeconds: 18,
    autoMs: 320,
    manualResult: 'pass',
    autoResult: 'pass',
  },
  {
    id: 2,
    spec: 'cart.spec.ts',
    label: 'Add item to cart',
    manualSeconds: 12,
    autoMs: 180,
    manualResult: 'pass',
    autoResult: 'pass',
  },
  {
    id: 3,
    spec: 'cart.spec.ts',
    label: 'Open the cart',
    manualSeconds: 9,
    autoMs: 150,
    manualResult: 'pass',
    autoResult: 'pass',
  },
  {
    id: 4,
    spec: 'cart.spec.ts',
    label: 'Apply promo code SAVE10',
    manualSeconds: 26,
    autoMs: 240,
    manualResult: 'pass',
    autoResult: 'fail',
    manualNote:
      'A person does not know or care what the field is called. They see a box labelled "Promo code" and they type in it.',
    autoNote:
      'Selector .promo-input no longer exists — the field was renamed to .discount-input last sprint. Nothing is broken for users. This is the test failing, not the product.',
  },
  {
    id: 5,
    spec: 'cart.spec.ts',
    label: 'Verify discounted total',
    manualSeconds: 15,
    autoMs: 190,
    manualResult: 'pass',
    autoResult: 'skipped',
    autoNote:
      'Never ran. One renamed class took the rest of this spec down with it, so the discount maths — the thing the spec actually existed to check — went unverified today.',
  },
  {
    id: 6,
    spec: 'checkout.spec.ts',
    label: 'Proceed to checkout',
    manualSeconds: 14,
    autoMs: 260,
    manualResult: 'pass',
    autoResult: 'pass',
  },
  {
    id: 7,
    spec: 'checkout.spec.ts',
    label: 'Fill delivery details',
    manualSeconds: 48,
    autoMs: 380,
    manualResult: 'caught',
    autoResult: 'missed',
    manualNote:
      'The postcode field overlaps the county dropdown at this width. Nobody wrote an assertion for that, because nobody thought to. The tester simply saw it.',
    autoNote:
      'Passed. The assertion checked that the value went into the field, and it did. Layout was never asserted on, so there was nothing here to fail.',
  },
  {
    id: 8,
    spec: 'checkout.spec.ts',
    label: 'Submit payment',
    manualSeconds: 22,
    autoMs: 340,
    manualResult: 'pass',
    autoResult: 'pass',
  },
  {
    id: 9,
    spec: 'checkout.spec.ts',
    label: 'Verify confirmation and order number',
    manualSeconds: 31,
    autoMs: 210,
    manualResult: 'pass',
    autoResult: 'pass',
  },
];

/* The manual lane is played back faster than real life or the demo would take
   three minutes. The displayed clock still counts real human seconds - the
   compression is in the playback, not in the numbers. */
const MANUAL_PLAYBACK_MS_PER_SECOND = 60;

const MANUAL_TOTAL = STEPS.reduce((n, s) => n + s.manualSeconds, 0);
const AUTO_TOTAL = STEPS.reduce((n, s) => (s.autoResult === 'skipped' ? n : n + s.autoMs), 0);

const formatManual = (seconds: number) => {
  const m = Math.floor(seconds / 60);
  const s = Math.round(seconds % 60);
  return m > 0 ? `${m}m ${String(s).padStart(2, '0')}s` : `${s}s`;
};

const idle = (): StepState[] => STEPS.map(() => 'idle');

const STATE_STYLES: Record<StepState, string> = {
  idle: 'border-line bg-surface-raised',
  running: 'border-brand-line bg-brand-soft',
  pass: 'border-emerald-500/15 bg-emerald-500/5',
  caught: 'border-amber-500/25 bg-amber-500/5',
  fail: 'border-red-500/20 bg-red-500/5',
  missed: 'border-emerald-500/15 bg-emerald-500/5',
  skipped: 'border-line bg-surface-raised opacity-40',
};

const StateIcon: React.FC<{ state: StepState }> = ({ state }) => {
  if (state === 'running') {
    return (
      <span className="relative flex h-4 w-4 flex-shrink-0">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-4 w-4 bg-accent-500" />
      </span>
    );
  }
  if (state === 'pass') return <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />;
  if (state === 'missed') return <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />;
  if (state === 'caught') return <Eye className="w-4 h-4 text-amber-400 flex-shrink-0" />;
  if (state === 'fail') return <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />;
  if (state === 'skipped') return <span className="w-4 h-4 flex-shrink-0 text-center text-fg-subtle text-xs">–</span>;
  return <span className="w-4 h-4 rounded-full border border-line flex-shrink-0" />;
};

const ManualVsAutomated: React.FC = () => {
  const [running, setRunning] = useState(false);
  const [finished, setFinished] = useState(false);
  const [manual, setManual] = useState<StepState[]>(idle);
  const [auto, setAuto] = useState<StepState[]>(idle);
  const [manualClock, setManualClock] = useState(0);
  const [autoClock, setAutoClock] = useState(0);

  const runToken = useRef(0);
  useEffect(() => () => { runToken.current += 1; }, []);

  const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

  const runBoth = async () => {
    runToken.current += 1;
    const token = runToken.current;

    setRunning(true);
    setFinished(false);
    setManual(idle());
    setAuto(idle());
    setManualClock(0);
    setAutoClock(0);

    const alive = () => runToken.current === token;

    const manualLane = async () => {
      let clock = 0;
      for (let i = 0; i < STEPS.length; i++) {
        if (!alive()) return;
        setManual((p) => p.map((s, n) => (n === i ? 'running' : s)));
        await wait(STEPS[i].manualSeconds * MANUAL_PLAYBACK_MS_PER_SECOND);
        if (!alive()) return;
        clock += STEPS[i].manualSeconds;
        setManualClock(clock);
        setManual((p) => p.map((s, n) => (n === i ? STEPS[i].manualResult : s)));
      }
    };

    const autoLane = async () => {
      let clock = 0;
      let abortedSpec: string | null = null;

      for (let i = 0; i < STEPS.length; i++) {
        if (!alive()) return;

        // A failure aborts the remaining steps of its own spec, not the run.
        if (abortedSpec && STEPS[i].spec === abortedSpec) {
          setAuto((p) => p.map((s, n) => (n === i ? 'skipped' : s)));
          continue;
        }

        setAuto((p) => p.map((s, n) => (n === i ? 'running' : s)));
        await wait(STEPS[i].autoMs);
        if (!alive()) return;
        clock += STEPS[i].autoMs;
        setAutoClock(clock);
        setAuto((p) => p.map((s, n) => (n === i ? STEPS[i].autoResult : s)));
        if (STEPS[i].autoResult === 'fail') abortedSpec = STEPS[i].spec;
      }
    };

    await Promise.all([manualLane(), autoLane()]);
    if (!alive()) return;
    setRunning(false);
    setFinished(true);
  };

  const reset = () => {
    runToken.current += 1;
    setRunning(false);
    setFinished(false);
    setManual(idle());
    setAuto(idle());
    setManualClock(0);
    setAutoClock(0);
  };

  const renderLane = (lane: Lane, states: StepState[]) => {
    const isManual = lane === 'manual';
    return (
      <div className="rounded-2xl border border-line bg-surface overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3 border-b border-line">
          <div className="flex items-center gap-2">
            {isManual ? <User className="w-4 h-4 text-fg-muted" /> : <Bot className="w-4 h-4 text-fg-muted" />}
            <span className="text-xs font-semibold uppercase tracking-wider text-fg">
              {isManual ? 'Manual' : 'Automated'}
            </span>
          </div>
          <div className="flex items-center gap-1.5 font-mono text-[11px] text-fg-muted">
            <Clock className="w-3 h-3" />
            {isManual ? formatManual(manualClock) : `${(autoClock / 1000).toFixed(2)}s`}
          </div>
        </div>

        <div className="p-3 space-y-1.5">
          {STEPS.map((step, i) => {
            const state = states[i];
            const note = isManual ? step.manualNote : step.autoNote;
            const showNote = note && state !== 'idle' && state !== 'running';
            const newSpec = i === 0 || STEPS[i - 1].spec !== step.spec;

            return (
              <React.Fragment key={step.id}>
                {newSpec && (
                  <div className="px-2 pt-2 pb-1 font-mono text-[10px] text-fg-subtle">{step.spec}</div>
                )}
                <div className={`rounded-lg border px-3 py-2 transition-all duration-300 ${STATE_STYLES[state]}`}>
                  <div className="flex items-center gap-2.5">
                    <StateIcon state={state} />
                    <span className={`text-xs ${state === 'idle' ? 'text-fg-subtle' : 'text-fg'}`}>{step.label}</span>
                    <span className="ml-auto font-mono text-[10px] text-fg-subtle flex-shrink-0">
                      {state === 'idle' || state === 'skipped'
                        ? '--'
                        : isManual
                        ? formatManual(step.manualSeconds)
                        : `${step.autoMs}ms`}
                    </span>
                  </div>

                  <AnimatePresence>
                    {showNote && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className={`overflow-hidden text-[11px] leading-relaxed mt-2 pl-6 ${
                          state === 'caught'
                            ? 'text-amber-300/90'
                            : state === 'fail'
                            ? 'text-red-300/90'
                            : 'text-fg-muted'
                        }`}
                      >
                        {note}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <Bezel>
      <div className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 pb-6 border-b border-line">
          <div>
            <h3 className="text-2xl font-display text-fg">Same suite, two ways</h3>
            <p className="text-sm text-fg-muted mt-1 max-w-xl">
              One checkout regression pass, run by a person and by a machine at the same time.
              Watch which one finishes first, then read what each of them missed.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={runBoth}
              disabled={running}
              className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider select-none transition-all duration-200 ${
                running
                  ? 'bg-brand-soft border border-brand-line text-fg'
                  : 'bg-emerald-600 hover:bg-emerald-500 border border-emerald-500/20 text-fg shadow-[0_4px_16px_rgba(16,185,129,0.15)] active:scale-95'
              }`}
            >
              <Play className={`w-3.5 h-3.5 ${running ? 'animate-spin' : ''}`} />
              {running ? 'Running...' : 'Run both'}
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {renderLane('manual', manual)}
          {renderLane('auto', auto)}
        </div>

        <p className="text-[11px] text-fg-subtle mt-3 text-center">
          The manual lane is played back {Math.round(1000 / MANUAL_PLAYBACK_MS_PER_SECOND)}x faster than real time.
          The clocks show real human seconds.
        </p>

        <AnimatePresence>
          {finished && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-8 pt-8 border-t border-line"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 mb-8">
                {[
                  ['Wall clock', formatManual(MANUAL_TOTAL), `${(AUTO_TOTAL / 1000).toFixed(2)}s`],
                  ['Realistic runs per day', '2 or 3', 'every commit'],
                  ['Real bugs found', '1', '0'],
                  ['False alarms', '0', '1'],
                  ['Cost to set up', 'none', 'days to write, then upkeep forever'],
                ].map(([label, m, a]) => (
                  <React.Fragment key={label}>
                    <div className="flex items-baseline justify-between gap-4 border-b border-line/60 pb-2">
                      <span className="text-[11px] uppercase tracking-wider text-fg-subtle">{label}</span>
                      <span className="text-sm text-fg font-mono text-right">{m}</span>
                    </div>
                    <div className="flex items-baseline justify-between gap-4 border-b border-line/60 pb-2">
                      <span className="text-[11px] uppercase tracking-wider text-fg-subtle md:hidden">{label}</span>
                      <span className="hidden md:inline text-[11px] uppercase tracking-wider text-fg-subtle opacity-0 select-none">
                        {label}
                      </span>
                      <span className="text-sm text-fg font-mono text-right">{a}</span>
                    </div>
                  </React.Fragment>
                ))}
              </div>

              <div className="flex items-start gap-3 rounded-xl border border-line bg-surface-raised p-5">
                <AlertTriangle className="w-4 h-4 text-fg-muted flex-shrink-0 mt-0.5" />
                <div className="space-y-3 text-sm text-fg-muted leading-relaxed">
                  <p className="text-fg font-medium">Neither column won.</p>
                  <p>
                    Automation bought repetition. It finished in two seconds, and it will run again on every
                    commit, at three in the morning, without getting bored or skipping a step because it
                    already checked that bit yesterday.
                  </p>
                  <p>
                    It also cried wolf about a renamed CSS class, and walked straight past a layout bug —
                    because nobody had thought to assert on layout, and a machine only ever checks what it
                    was told to check.
                  </p>
                  <p>
                    The person found the real problem. That person will also never run this forty times a day.
                  </p>
                  <p className="text-fg">
                    Automation does not replace testing. It replaces <em>repeating</em> testing. Deciding what
                    is worth repeating is still the job.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Bezel>
  );
};

export default ManualVsAutomated;
