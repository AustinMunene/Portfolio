import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

// Sample data for different chart types
const lineData = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 500 },
  { name: 'Jun', value: 700 },
];

const barData = [
  { name: 'React', value: 85 },
  { name: 'TypeScript', value: 78 },
  { name: 'Node.js', value: 65 },
  { name: 'Python', value: 72 },
  { name: 'SQL', value: 80 },
];

const pieData = [
  { name: 'Frontend', value: 45 },
  { name: 'Backend', value: 30 },
  { name: 'Database', value: 15 },
  { name: 'DevOps', value: 10 },
];

// Was a five-hue rainbow, which fought the black-and-white system and implied
// categories that do not exist. One accent plus a neutral ramp instead: the
// series stay distinguishable, and the accent marks the largest slice.
const COLORS = ['var(--accent)', 'var(--fg-muted)', 'var(--fg-subtle)', 'var(--border)'];

type ChartType = 'line' | 'bar' | 'pie';

const InteractiveDataViz: React.FC = () => {
  const [chartType, setChartType] = useState<ChartType>('line');
  const [isExpanded, setIsExpanded] = useState(false);

  const renderChart = () => {
    switch (chartType) {
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={isExpanded ? 400 : 300}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="name" stroke="var(--fg-subtle)" />
              <YAxis stroke="var(--fg-subtle)" />
              <Tooltip
                contentStyle={{ backgroundColor: 'var(--surface-alt)', border: '1px solid var(--border)', borderRadius: 8 }}
                labelStyle={{ color: 'var(--fg)' }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="value"
                stroke="var(--accent)"
                activeDot={{ r: 8 }}
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        );
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={isExpanded ? 400 : 300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="name" stroke="var(--fg-subtle)" />
              <YAxis stroke="var(--fg-subtle)" />
              <Tooltip
                contentStyle={{ backgroundColor: 'var(--surface-alt)', border: '1px solid var(--border)', borderRadius: 8 }}
                labelStyle={{ color: 'var(--fg)' }}
              />
              <Legend />
              <Bar dataKey="value" fill="var(--accent)" />
            </BarChart>
          </ResponsiveContainer>
        );
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={isExpanded ? 400 : 300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={isExpanded ? 150 : 100}
                fill="var(--accent)"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {pieData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: 'var(--surface-alt)', border: '1px solid var(--border)', borderRadius: 8 }}
                labelStyle={{ color: 'var(--fg)' }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-surface-raised rounded-2xl overflow-hidden border border-line"
    >
      <div className="p-4 border-b border-line">
        <h3 className="text-lg font-semibold">Interactive Data Visualization</h3>
        <p className="text-sm text-fg-muted mt-1">
          Explore different types of data visualizations built with Recharts.
        </p>
      </div>
      
      <div className="p-4">
        <div className="flex justify-center space-x-2 mb-4">
          <button
            onClick={() => setChartType('line')}
            className={`px-3 py-1 rounded-md text-sm transition-colors ${
              chartType === 'line'
                ? 'bg-brand text-brand-fg'
                : 'bg-surface-raised text-fg-muted hover:text-fg border border-line'
            }`}
          >
            Line Chart
          </button>
          <button
            onClick={() => setChartType('bar')}
            className={`px-3 py-1 rounded-md text-sm transition-colors ${
              chartType === 'bar'
                ? 'bg-brand text-brand-fg'
                : 'bg-surface-raised text-fg-muted hover:text-fg border border-line'
            }`}
          >
            Bar Chart
          </button>
          <button
            onClick={() => setChartType('pie')}
            className={`px-3 py-1 rounded-md text-sm transition-colors ${
              chartType === 'pie'
                ? 'bg-brand text-brand-fg'
                : 'bg-surface-raised text-fg-muted hover:text-fg border border-line'
            }`}
          >
            Pie Chart
          </button>
        </div>
        
        <div className="bg-surface-alt p-4 rounded-xl">
          {renderChart()}
        </div>
        
        <div className="flex justify-end mt-4">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-3 py-1 bg-surface-raised border border-line text-fg-muted hover:text-fg rounded-md text-sm transition-colors"
          >
            {isExpanded ? 'Collapse' : 'Expand'}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default InteractiveDataViz; 