import React, { useEffect, useState } from 'react';
import {
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { CheckCircle2, XCircle } from 'lucide-react';

/* The threshold the imagined k6 script asserts on:
     thresholds: { http_req_duration: ['p(95)<500'] } */
const THRESHOLD_MS = 500;

interface Point {
  time: string;
  vus: number;
  p95: number;
}

interface Profile {
  key: string;
  name: string;
  question: string;
  points: Point[];
  insight: string;
}

/*
 * Four shapes of load test, because "performance testing" is not one activity -
 * each of these asks a different question and only one of them is about finding
 * the breaking point.
 */
const PROFILES: Profile[] = [
  {
    key: 'smoke',
    name: 'Smoke',
    question: 'Does it work at all?',
    points: [
      { time: '0s', vus: 0, p95: 0 },
      { time: '30s', vus: 2, p95: 118 },
      { time: '1m', vus: 2, p95: 124 },
      { time: '1m30', vus: 2, p95: 121 },
      { time: '2m', vus: 2, p95: 119 },
      { time: '2m30', vus: 0, p95: 0 },
    ],
    insight:
      'Two users, two minutes. This is not a performance test — it is a check that the script itself works and the system responds at all. Run it on every deploy. If a smoke test goes red, nothing below it is worth reading.',
  },
  {
    key: 'load',
    name: 'Load',
    question: 'Does it hold at the traffic we actually get?',
    points: [
      { time: '0s', vus: 0, p95: 0 },
      { time: '1m', vus: 40, p95: 165 },
      { time: '2m', vus: 100, p95: 288 },
      { time: '3m', vus: 100, p95: 331 },
      { time: '4m', vus: 100, p95: 342 },
      { time: '5m', vus: 40, p95: 210 },
      { time: '6m', vus: 0, p95: 0 },
    ],
    insight:
      'Ramp to the peak you genuinely expect, hold it, ramp down. Watch the held section rather than the peak — the response time creeping up while load stays flat is the interesting signal, because it usually means something is accumulating.',
  },
  {
    key: 'stress',
    name: 'Stress',
    question: 'Where does it break, and how?',
    points: [
      { time: '0s', vus: 0, p95: 0 },
      { time: '1m', vus: 100, p95: 295 },
      { time: '2m', vus: 200, p95: 418 },
      { time: '3m', vus: 300, p95: 611 },
      { time: '4m', vus: 400, p95: 1490 },
      { time: '5m', vus: 400, p95: 2380 },
      { time: '6m', vus: 0, p95: 0 },
    ],
    insight:
      'Push past the expected peak until something gives. The number you want is not the maximum — it is the point where the curve stops being flat, here somewhere past 200 users. Knowing that number is what lets you answer "can we run the campaign on Friday".',
  },
  {
    key: 'spike',
    name: 'Spike',
    question: 'What happens on a sudden surge, and does it recover?',
    points: [
      { time: '0s', vus: 10, p95: 132 },
      { time: '1m', vus: 10, p95: 129 },
      { time: '1m10', vus: 500, p95: 2140 },
      { time: '1m40', vus: 500, p95: 1870 },
      { time: '2m', vus: 10, p95: 640 },
      { time: '3m', vus: 10, p95: 184 },
      { time: '4m', vus: 10, p95: 133 },
    ],
    insight:
      'Recovery is the whole point of this one. Everything degrades under a spike; what separates systems is whether they come back on their own once it passes. Notice response times are still elevated a minute after the load has gone.',
  },
];

const readTokens = () => {
  const s = getComputedStyle(document.documentElement);
  const token = (name: string) => s.getPropertyValue(name).trim();
  return {
    grid: token('--border'),
    axis: token('--fg-subtle'),
    label: token('--fg-muted'),
    line: token('--accent'),
    tooltipBg: token('--surface-alt'),
    fg: token('--fg'),
  };
};

/**
 * Recharts paints colours into SVG presentation attributes, which do not resolve
 * `var()` - so unlike the rest of the site this chart cannot style itself with
 * token classes and has to read the tokens as concrete values.
 *
 * It watches <html data-theme> directly rather than calling useTheme(), because
 * that hook holds its own useState: a second caller would get a detached copy
 * that never hears about a toggle made from the navbar.
 */
const useChartTokens = () => {
  const [tokens, setTokens] = useState(readTokens);

  useEffect(() => {
    const observer = new MutationObserver(() => setTokens(readTokens()));
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });
    return () => observer.disconnect();
  }, []);

  return tokens;
};

const LoadTestSimulator: React.FC = () => {
  const tokens = useChartTokens();
  const [active, setActive] = useState(PROFILES[1]);

  const worst = Math.max(...active.points.map((p) => p.p95));
  const breached = worst > THRESHOLD_MS;

  return (
    <div className="bg-surface-raised rounded-2xl overflow-hidden border border-line">
      <div className="p-5 border-b border-line">
        <h3 className="text-lg font-semibold text-fg">Load profiles</h3>
        <p className="text-sm text-fg-muted mt-1 max-w-2xl">
          Four kinds of load test against the same endpoint. Virtual users on the left, 95th percentile
          response time on the right, and the threshold the script asserts on drawn across it.
        </p>
      </div>

      <div className="px-5 pt-5 flex flex-wrap gap-2">
        {PROFILES.map((p) => (
          <button
            key={p.key}
            onClick={() => setActive(p)}
            aria-pressed={active.key === p.key}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors duration-200 border ${
              active.key === p.key
                ? 'bg-brand-soft border-brand-line text-fg'
                : 'border-line text-fg-subtle hover:text-fg-muted'
            }`}
          >
            {p.name}
          </button>
        ))}
      </div>

      <p className="px-5 pt-4 text-sm text-fg">{active.question}</p>

      <div className="p-5 pt-3">
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={active.points} margin={{ top: 8, right: 8, bottom: 0, left: -16 }}>
            <CartesianGrid stroke={tokens.grid} vertical={false} />
            <XAxis
              dataKey="time"
              stroke={tokens.grid}
              tick={{ fill: tokens.label, fontSize: 12 }}
              tickLine={{ stroke: tokens.grid }}
            />
            <YAxis
              yAxisId="vus"
              stroke={tokens.grid}
              tick={{ fill: tokens.label, fontSize: 12 }}
              tickLine={{ stroke: tokens.grid }}
            />
            <YAxis
              yAxisId="ms"
              orientation="right"
              stroke={tokens.grid}
              tick={{ fill: tokens.label, fontSize: 12 }}
              tickLine={{ stroke: tokens.grid }}
              width={52}
            />
            <Tooltip
              cursor={{ stroke: tokens.axis, strokeDasharray: '4 4' }}
              contentStyle={{
                background: tokens.tooltipBg,
                border: `1px solid ${tokens.grid}`,
                borderRadius: 12,
                color: tokens.fg,
              }}
              labelStyle={{ color: tokens.label }}
              itemStyle={{ color: tokens.fg }}
              formatter={(value: number, name: string) =>
                name === 'p95 response' ? [`${value} ms`, name] : [value, name]
              }
            />
            <Legend wrapperStyle={{ fontSize: 12, color: tokens.label }} />

            {/* The assertion made visible. A threshold you cannot see on the
                chart is a number nobody argues with. */}
            <ReferenceLine
              yAxisId="ms"
              y={THRESHOLD_MS}
              stroke={tokens.axis}
              strokeDasharray="5 5"
              label={{ value: `p(95) < ${THRESHOLD_MS}ms`, fill: tokens.label, fontSize: 11, position: 'insideTopRight' }}
            />

            <Area
              yAxisId="vus"
              type="monotone"
              dataKey="vus"
              name="virtual users"
              stroke={tokens.axis}
              fill={tokens.axis}
              fillOpacity={0.12}
              strokeWidth={1.5}
            />
            <Line
              yAxisId="ms"
              type="monotone"
              dataKey="p95"
              name="p95 response"
              stroke={tokens.line}
              strokeWidth={3}
              dot={{ r: 3, fill: tokens.line, stroke: tokens.line }}
              activeDot={{ r: 6, fill: tokens.line, stroke: tokens.tooltipBg, strokeWidth: 2 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="px-5 pb-5 space-y-4">
        <div
          className={`flex items-start gap-3 rounded-xl border p-4 ${
            breached ? 'border-red-500/20 bg-red-500/5' : 'border-emerald-500/15 bg-emerald-500/5'
          }`}
        >
          {breached ? (
            <XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
          ) : (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
          )}
          <p className="text-sm text-fg-muted">
            <span className="text-fg font-medium">
              threshold {breached ? 'breached' : 'met'}
            </span>{' '}
            — worst p95 was <span className="font-mono text-fg">{worst}ms</span> against a limit of{' '}
            <span className="font-mono text-fg">{THRESHOLD_MS}ms</span>.
            {breached && ' In CI this is what fails the build, rather than someone eyeballing a graph.'}
          </p>
        </div>

        <p className="text-sm text-fg-muted leading-relaxed">{active.insight}</p>

        <div className="rounded-xl border border-line bg-surface p-4">
          <div className="text-[10px] uppercase tracking-wider text-fg-subtle mb-2">
            Why p95 and not the average
          </div>
          <p className="text-sm text-fg-muted leading-relaxed">
            An average hides the people having the worst time. If ninety requests return in 100ms and ten
            take four seconds, the mean is a comfortable 490ms and nobody notices the ten. p95 says
            &ldquo;95 out of 100 were at least this fast&rdquo;, which is a claim about real users rather than
            about arithmetic. Look at p99 when the tail matters more than the middle — checkout, payments,
            anything a person is waiting on.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadTestSimulator;
