'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface AlertsChartProps {
  data: {
    time: string;
    in: number;
    out: number;
  }[];
}

export default function AlertsChart({ data }: AlertsChartProps) {
  return (
    <div className="bg-slate-900/50 border border-slate-700 rounded-md p-6 mb-6">
      <h2 className="text-lg font-semibold text-slate-50 mb-4">Tráfico de Red (Últimas 24h)</h2>
      
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="time" stroke="#78909c" />
          <YAxis stroke="#78909c" />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }}
            labelStyle={{ color: '#cbd5e1' }}
          />
          <Legend />
          <Bar dataKey="in" fill="#10b981" name="Entrada (MB/s)" />
          <Bar dataKey="out" fill="#06b6d4" name="Salida (MB/s)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
