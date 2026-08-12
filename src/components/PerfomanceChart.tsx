import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const data = [
  { time: '00:00', users: 0 },
  { time: '00:30', users: 20 },
  { time: '01:00', users: 50 },
  { time: '01:30', users: 100 },
  { time: '02:00', users: 70 },
  { time: '02:30', users: 30 },
  { time: '03:00', users: 10 },
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

const PerformanceChart: React.FC = () => {
  const tokens = useChartTokens();

  return (
    <div className="bg-surface-raised rounded-2xl overflow-hidden border border-line">
      <div className="p-4 border-b border-line">
        <h3 className="text-lg font-semibold text-fg">k6 Performance Test Simulator</h3>
        <p className="text-sm text-fg-muted mt-1">Simulated load over time</p>
      </div>

      <div className="p-4">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data} margin={{ top: 8, right: 16, bottom: 0, left: -16 }}>
            <CartesianGrid stroke={tokens.grid} vertical={false} />
            <XAxis
              dataKey="time"
              stroke={tokens.grid}
              tick={{ fill: tokens.label, fontSize: 12 }}
              tickLine={{ stroke: tokens.grid }}
            />
            <YAxis
              stroke={tokens.grid}
              tick={{ fill: tokens.label, fontSize: 12 }}
              tickLine={{ stroke: tokens.grid }}
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
            />
            <Line
              type="monotone"
              dataKey="users"
              stroke={tokens.line}
              strokeWidth={3}
              dot={{ r: 4, fill: tokens.line, stroke: tokens.line }}
              activeDot={{ r: 6, fill: tokens.line, stroke: tokens.tooltipBg, strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PerformanceChart;
