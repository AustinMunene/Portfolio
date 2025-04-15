import React from 'react';
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

const PerformanceChart: React.FC = () => {
  return (
    <div className="bg-gray-900 text-white p-6 rounded shadow-md">
      <h3 className="text-xl font-bold mb-4">k6 Performance Test Simulator</h3>
      <p className="mb-4 text-sm text-gray-300">Simulated load over time</p>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid stroke="#555" />
          <XAxis dataKey="time" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip />
          <Line type="monotone" dataKey="users" stroke="#00ffae" strokeWidth={3} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PerformanceChart;
