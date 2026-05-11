'use client';

import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ActivityChartProps {
  data: {
    time: string;
    cpu: number;
    memory: number;
  }[];
}

export default function ActivityChart({ data }: ActivityChartProps) {
  return (
    <div className="bg-slate-900/50 border border-slate-700 rounded-md p-6 mb-6">
      <h2 className="text-lg font-semibold text-slate-50 mb-4">Actividad del Sistema (Últimas 24h)</h2>
      
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorMemory" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="time" stroke="#78909c" />
          <YAxis stroke="#78909c" />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }}
            labelStyle={{ color: '#cbd5e1' }}
          />
          <Legend />
          <Area type="monotone" dataKey="cpu" stroke="#f97316" fillOpacity={1} fill="url(#colorCpu)" name="CPU %" />
          <Area type="monotone" dataKey="memory" stroke="#3b82f6" fillOpacity={1} fill="url(#colorMemory)" name="Memoria %" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
