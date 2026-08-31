import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, CheckCircle2, XCircle, Terminal, HelpCircle, Eye, Lightbulb } from 'lucide-react';
import Bezel from './Bezel';

type Framework = 'cypress' | 'playwright';

/* A step is one line of the test. `cypress` and `playwright` are the same
   instruction written in each tool, so switching frameworks re-labels the suite
   rather than running a different scenario - the comparison is the point.

   `explain` is what makes this a teaching demo rather than an animation: every
   line can say what it does and, more usefully, what goes wrong with it. */
interface Step {
  cypress: string;
  playwright: string;
  kind: 'action' | 'assert' | 'result' | 'error';
  concept: string;
  explain: string;
}

interface TestCase {
  id: number;
  title: string;
  duration: number;
  steps: Step[];
}

/* Durations are deliberately identical across both frameworks. A simulated
   runner is not a benchmark, and inventing a speed difference would be a claim
   this demo has not earned. */
const TEST_CASES: TestCase[] = [
  {
    id: 1,
    title: 'GET /api/v1/auth/session - resolves a session token',
    duration: 140,
    steps: [
      {
        cypress: "cy.request('GET', '/api/v1/auth/session')",
        playwright: "const res = await request.get('/api/v1/auth/session')",
        kind: 'action',
        concept: 'API test',
        explain:
          'Calls the API directly, with no browser involved. This is the cheapest kind of test there is - nothing to render, nothing to wait for. If a rule can be checked here instead of by clicking through the UI, it belongs here.',
      },
      {
        cypress: ".its('status').should('eq', 200)",
        playwright: 'expect(res.status()).toBe(200)',
        kind: 'assert',
        concept: 'Assertion',
        explain:
          'The assertion is the only line that can actually fail. Everything above it is setup. A "test" with no assertion proves nothing except that the code did not crash.',
      },
      {
        cypress: ".its('body').should('have.property', 'session_token')",
        playwright: "expect(await res.json()).toHaveProperty('session_token')",
        kind: 'assert',
        concept: 'Contract',
        explain:
          'Checking the shape of the response, not just the status code. A 200 carrying the wrong body still breaks whoever consumes it. This is the difference between "the endpoint answered" and "the endpoint worked".',
      },
      {
        cypress: '↳ 200 OK · 140ms · body matched',
        playwright: '↳ 200 OK · 140ms · body matched',
        kind: 'result',
        concept: 'Result',
        explain: 'What the runner reported back. Green here means every assertion above it held.',
      },
    ],
  },
  {
    id: 2,
    title: 'POST /login - submits credentials and redirects',
    duration: 480,
    steps: [
      {
        cypress: "cy.visit('/login')",
        playwright: "await page.goto('/login')",
        kind: 'action',
        concept: 'Execution model',
        explain:
          'Loads the page. This is where the two tools genuinely differ: Cypress runs inside the browser alongside your app, while Playwright drives the browser from the outside. That is why Playwright handles multiple tabs, origins and downloads more naturally, and why Cypress gets such direct access to your application internals.',
      },
      {
        cypress: "cy.get('input[name=email]').type('qa-runner@example.com')",
        playwright: "await page.getByLabel('Email').fill('qa-runner@example.com')",
        kind: 'action',
        concept: 'Selector',
        explain:
          'Find the element, then act on it. Look at the difference: the Cypress line targets an HTML attribute, so renaming that field breaks the test. Playwright is finding it the way a person would - by its visible label. Which style you choose is the single biggest factor in how much test maintenance you are doing a year from now.',
      },
      {
        cypress: "cy.get('input[name=password]').type(Cypress.env('TEST_PASSWORD'))",
        playwright: "await page.getByLabel('Password').fill(process.env.TEST_PASSWORD)",
        kind: 'action',
        concept: 'Test data',
        explain:
          'Never hard-code a real credential in a test. This comes from an environment variable, and it should belong to a seeded account that only exists in the test environment. Anything else ends up committed to the repo forever.',
      },
      {
        cypress: "cy.get('button[type=submit]').click()",
        playwright: "await page.getByRole('button', { name: 'Sign in' }).click()",
        kind: 'action',
        concept: 'Selector',
        explain:
          'getByRole finds the element by what it is to assistive technology - a button named "Sign in". Tests written this way double as a rough accessibility check: if the locator cannot find your button, a screen reader probably cannot either.',
      },
      {
        cypress: '↳ POST /api/v1/auth/login → 200 OK',
        playwright: '↳ POST /api/v1/auth/login → 200 OK',
        kind: 'result',
        concept: 'Result',
        explain: 'The network call the click triggered. Worth watching, because the UI can look fine while this quietly returns a 500.',
      },
      {
        cypress: "cy.url().should('include', '/dashboard')",
        playwright: 'await expect(page).toHaveURL(/dashboard/)',
        kind: 'assert',
        concept: 'Assertion',
        explain:
          'Asserting the outcome, not the click. A test that presses a button and then simply ends has proved nothing. Every test needs at least one line that would turn red if the feature broke.',
      },
    ],
  },
  {
    id: 3,
    title: 'GET /dashboard - renders telemetry grid within range',
    duration: 620,
    steps: [
      {
        cypress: "cy.visit('/dashboard')",
        playwright: "await page.goto('/dashboard')",
        kind: 'action',
        concept: 'Setup',
        explain:
          'Note this test logs in via the API rather than repeating the login flow from test 2. Driving the UI to set up state you already tested is the most common reason suites get slow.',
      },
      {
        cypress: "cy.get('.telemetry-grid').should('be.visible')",
        playwright: "await expect(page.locator('.telemetry-grid')).toBeVisible()",
        kind: 'assert',
        concept: 'Auto-wait',
        explain:
          'Waiting for something to appear. Both tools retry this automatically until it passes or times out, which is why you should almost never write a fixed sleep. A hard-coded wait is either too short and flaky, or too long and slow - usually both, on different machines.',
      },
      {
        cypress: "cy.get('.chart-series').should('have.length.greaterThan', 0)",
        playwright: "await expect(page.locator('.chart-series')).not.toHaveCount(0)",
        kind: 'assert',
        concept: 'Assertion',
        explain:
          'Checking the chart has data at all before checking what the data says. Ordering assertions from broad to specific means a failure tells you roughly where the problem is.',
      },
      {
        cypress: "cy.get('[data-axis=y]').invoke('attr', 'data-max').should('be.lte', 95)",
        playwright: "await expect(page.getByTestId('y-axis')).toHaveAttribute('data-max', /^([0-9]|[1-8][0-9]|9[0-5])$/)",
        kind: 'assert',
        concept: 'Assertion',
        explain:
          'The assertion that is about to fail. Notice both versions read the value from a dedicated test attribute rather than scraping rendered text - text changes when a designer touches it, test attributes do not.',
      },
      {
        cypress: '❌ Expected 100 to be less than or equal to 95',
        playwright: '❌ Expected pattern to match "100"',
        kind: 'error',
        concept: 'Triage',
        explain:
          'Here is the question worth asking: is this a bug, or is the test wrong? The chart is reporting 100 where the test expects at most 95. Maybe the product deliberately changed the scale and nobody updated the test. Working that out - instead of editing the number until it goes green - is most of the job.',
      },
    ],
  },
];

const idleStatuses = (): Status[] => TEST_CASES.map(() => 'idle');

type Status = 'idle' | 'running' | 'pass' | 'fail';

/** The suite is authored so this one fails - that failing log is the point. */
const FAILING_INDEX = 2;

const FRAMEWORK_LABEL: Record<Framework, string> = {
  cypress: 'CYPRESS_RUNNER_V13',
  playwright: 'PLAYWRIGHT_TEST_V1.4',
};

const TestRunnerSimulation: React.FC = () => {
  const [framework, setFramework] = useState<Framework>('cypress');
  const [running, setRunning] = useState(false);
  const [statuses, setStatuses] = useState<Status[]>(idleStatuses);
  const [activeTest, setActiveTest] = useState<number | null>(null);
  const [activeStep, setActiveStep] = useState<number | null>(null);

  // Bumped on reset/unmount so an in-flight run knows to abandon its remaining
  // steps instead of writing status into a suite the user already cleared.
  const runToken = useRef(0);

  useEffect(() => () => { runToken.current += 1; }, []);

  const setStatus = (index: number, status: Status) => {
    setStatuses((prev) => prev.map((s, i) => (i === index ? status : s)));
  };

  const runTests = async () => {
    const token = runToken.current;

    setRunning(true);
    setActiveTest(null);
    setActiveStep(null);
    setStatuses(idleStatuses());

    for (let i = 0; i < TEST_CASES.length; i++) {
      setStatus(i, 'running');
      await new Promise((resolve) => setTimeout(resolve, TEST_CASES[i].duration + 600));
      if (runToken.current !== token) return;
      setStatus(i, i === FAILING_INDEX ? 'fail' : 'pass');
    }

    setRunning(false);
    setActiveTest(FAILING_INDEX);
    setActiveStep(null);
  };

  const resetSimulation = () => {
    runToken.current += 1;
    setStatuses(idleStatuses());
    setActiveTest(null);
    setActiveStep(null);
    setRunning(false);
  };

  /* Switching framework mid-run would leave the suite half-labelled in one tool
     and half in the other, so it resets. The scenario is identical either way -
     only the syntax changes - so nothing is lost. */
  const switchFramework = (next: Framework) => {
    if (next === framework) return;
    setFramework(next);
    resetSimulation();
  };

  const passed = statuses.filter((s) => s === 'pass').length;
  const failed = statuses.filter((s) => s === 'fail').length;
  const selected = activeTest !== null ? TEST_CASES[activeTest] : null;
  const selectedStep = selected && activeStep !== null ? selected.steps[activeStep] : null;

  return (
    <Bezel>
      <>
        {/* Mock runner window chrome */}
        <div className="bg-surface-alt px-5 py-3.5 border-b border-line flex items-center justify-between select-none">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span className="h-4 w-px bg-surface-raised mx-2" />
            <span className="flex items-center gap-1.5 text-xs font-mono text-fg-subtle">
              <Terminal className="w-3.5 h-3.5" />
              {FRAMEWORK_LABEL[framework]}
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-md bg-surface-raised border border-line">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-mono text-fg-muted">HOST: localhost:3000</span>
          </div>
        </div>

        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 pb-6 border-b border-line">
            <div>
              <h3 className="text-2xl font-display text-fg">Test Runner Sandbox</h3>
              <p className="text-sm text-fg-muted mt-1">
                Run the suite, then click any line to see what it does and how it breaks.
                Same three tests in both frameworks.
              </p>
            </div>

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
                {running ? 'Running...' : 'Run Suite'}
              </button>

              <button
                onClick={resetSimulation}
                className="flex items-center justify-center w-10 h-10 rounded-full border border-line bg-surface-raised text-fg-muted hover:text-fg transition-all duration-200 active:scale-90 disabled:opacity-40 disabled:cursor-not-allowed"
                title={running ? 'Suite is running' : 'Reset suite'}
                disabled={running}
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Framework switch. Segmented rather than a dropdown so both options
              are visible at rest - the comparison is the feature. */}
          <div
            role="group"
            aria-label="Test framework"
            className="inline-flex items-center gap-1 p-1 mb-6 rounded-full border border-line bg-surface-raised"
          >
            {(['cypress', 'playwright'] as Framework[]).map((fw) => (
              <button
                key={fw}
                onClick={() => switchFramework(fw)}
                aria-pressed={framework === fw}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold capitalize transition-colors duration-200 ${
                  framework === fw
                    ? 'bg-brand-soft border border-brand-line text-fg'
                    : 'border border-transparent text-fg-subtle hover:text-fg-muted'
                }`}
              >
                {fw}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Test list */}
            <div className="lg:col-span-5 space-y-3">
              {TEST_CASES.map((test, index) => {
                const status = statuses[index];
                const isRunning = status === 'running';
                const isPass = status === 'pass';
                const isFail = status === 'fail';

                return (
                  <div
                    key={test.id}
                    onClick={() => {
                      if (status === 'idle') return;
                      setActiveTest(index);
                      setActiveStep(null);
                    }}
                    className={`p-4 rounded-xl border transition-all duration-300 select-none flex items-center justify-between gap-4 ${
                      status === 'idle' ? 'cursor-default' : 'cursor-pointer'
                    } ${
                      isRunning
                        ? 'bg-brand-soft border-brand-line'
                        : isPass
                        ? 'bg-emerald-500/5 border-emerald-500/10 hover:border-emerald-500/30'
                        : isFail
                        ? 'bg-red-500/5 border-red-500/15 hover:border-red-500/35'
                        : 'bg-surface-raised border-line'
                    } ${activeTest === index ? 'ring-1 ring-brand-line' : ''}`}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <span className="flex-shrink-0">
                        {isRunning && (
                          <span className="relative flex h-4 w-4">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-4 w-4 bg-accent-500" />
                          </span>
                        )}
                        {isPass && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                        {isFail && <XCircle className="w-5 h-5 text-red-400" />}
                        {status === 'idle' && <HelpCircle className="w-5 h-5 text-fg-subtle" />}
                      </span>

                      <div className="min-w-0">
                        <span
                          className={`text-xs font-semibold uppercase tracking-wider ${
                            isPass ? 'text-emerald-400' : isFail ? 'text-red-400' : isRunning ? 'text-fg' : 'text-fg-subtle'
                          }`}
                        >
                          TEST #{test.id} · {status}
                        </span>
                        <h4 className="text-sm font-medium text-fg mt-0.5 truncate">{test.title}</h4>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className="text-[11px] font-mono text-fg-subtle">
                        {status !== 'idle' ? `${test.duration}ms` : '--'}
                      </span>
                      {status !== 'idle' && (
                        <Eye
                          className={`w-4 h-4 transition-colors duration-200 ${
                            activeTest === index ? 'text-fg-muted' : 'text-fg-subtle'
                          }`}
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Source panel plus the explanation for whichever line is selected */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl bg-surface border border-line overflow-hidden">
                <div className="flex items-center justify-between px-5 py-3 border-b border-line text-fg-subtle select-none font-mono text-xs">
                  <span>{selected ? `spec: test_${selected.id}.spec.ts` : 'SPEC_VIEWER'}</span>
                  <span className="text-[10px] bg-surface-raised px-2 py-0.5 rounded capitalize">{framework}</span>
                </div>

                {/* No AnimatePresence here, deliberately. It was wrapped in one
                    with `mode="wait"`, which holds the incoming child until the
                    outgoing one finishes exiting - and that handover stalled, so
                    the header would update to test_2 while the body still showed
                    test_3's source. Since this panel only ever needs an entry
                    animation, a keyed motion.div is enough: changing the key
                    remounts it and initial -> animate replays. */}
                <div className="p-5 font-mono text-xs min-h-[13rem]">
                  {selected && (
                      <motion.div
                        key={`${selected.id}-${framework}`}
                        initial={{ opacity: 0, x: 5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-1"
                      >
                        {selected.steps.map((step, idx) => {
                          const isActive = activeStep === idx;
                          return (
                            <button
                              key={idx}
                              onClick={() => setActiveStep(isActive ? null : idx)}
                              className={`w-full text-left leading-relaxed whitespace-pre-wrap rounded px-2 py-1 transition-colors duration-150 ${
                                step.kind === 'error'
                                  ? 'text-red-400 bg-red-950/20 border border-red-500/10'
                                  : step.kind === 'result'
                                  ? 'text-fg-muted pl-4'
                                  : step.kind === 'assert'
                                  ? 'text-emerald-300'
                                  : 'text-fg'
                              } ${isActive ? 'bg-brand-soft ring-1 ring-brand-line' : 'hover:bg-surface-raised'}`}
                            >
                              {step[framework]}
                            </button>
                          );
                        })}
                      </motion.div>
                  )}

                  {!selected && (
                    <div className="h-full flex flex-col items-center justify-center text-center text-fg-subtle py-14 select-none">
                      <Terminal className="w-8 h-8 text-fg/[0.06] mb-3" />
                      <p className="text-[11px]">Run the suite, then pick a test</p>
                      <p className="text-[10px] mt-0.5">to read its source line by line.</p>
                    </div>
                  )}
                </div>

                {/* The teaching half. Only appears once a line is picked, so the
                    panel stays quiet until somebody actually asks a question. */}
                <AnimatePresence>
                  {selectedStep && (
                    <motion.div
                      key={`${activeTest}-${activeStep}-${framework}`}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="border-t border-line bg-surface-raised overflow-hidden"
                    >
                      <div className="p-5">
                        <div className="flex items-center gap-2 mb-2">
                          <Lightbulb className="w-3.5 h-3.5 text-fg-muted" />
                          <span className="text-[10px] font-semibold uppercase tracking-wider text-fg-muted">
                            {selectedStep.concept}
                          </span>
                        </div>
                        <p className="text-sm text-fg-muted leading-relaxed">{selectedStep.explain}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="px-5 py-2.5 border-t border-line text-[10px] text-fg-subtle flex justify-between select-none font-mono">
                  <span>{passed} passed / {failed} failed</span>
                  {selected && !selectedStep && <span>click a line to explain it</span>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </Bezel>
  );
};

export default TestRunnerSimulation;
