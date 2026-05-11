'use client';

import { ArrowUp, ArrowDown, TrendingUp, AlertCircle } from 'lucide-react';

interface MetricsCardsProps {
  metrics: {
    cpu: { usage: number; cores: number; processes?: number; loadAverage?: number[] };
    memory: { usage: number; total: number; available?: number; cached?: number; swap?: number };
    disk: Array<{ mount: string; device: string; usage: number; total: number; used: number; available: number }>;
    network: { bytesIn: number; bytesOut: number };
  };
}

export default function MetricsCards({ metrics }: MetricsCardsProps) {
  // Calcular promedio de uso de disco
  const avgDiskUsage = metrics.disk.length > 0 
    ? metrics.disk.reduce((sum, d) => sum + d.usage, 0) / metrics.disk.length 
    : 0;
  const totalDiskSpace = metrics.disk.length > 0
    ? metrics.disk.reduce((sum, d) => sum + d.total, 0)
    : 0;

  const cards = [
    {
      title: 'CPU',
      value: `${metrics.cpu.usage.toFixed(1)}%`,
      subtext: `${metrics.cpu.cores} cores`,
      icon: TrendingUp,
      color: metrics.cpu.usage > 80 ? 'red' : metrics.cpu.usage > 60 ? 'yellow' : 'emerald',
    },
    {
      title: 'Memoria',
      value: `${metrics.memory.usage.toFixed(1)}%`,
      subtext: `${metrics.memory.total}GB total`,
      icon: AlertCircle,
      color: metrics.memory.usage > 80 ? 'red' : metrics.memory.usage > 60 ? 'yellow' : 'emerald',
    },
    {
      title: 'Disco',
      value: `${avgDiskUsage.toFixed(1)}%`,
      subtext: `${totalDiskSpace}GB total`,
      icon: TrendingUp,
      color: avgDiskUsage > 85 ? 'red' : avgDiskUsage > 70 ? 'yellow' : 'emerald',
    },
    {
      title: 'Red',
      value: (metrics.network.bytesIn / 1024 / 1024 / 1024).toFixed(2) + ' GB',
      subtext: 'Entrada hoy',
      icon: ArrowUp,
      color: 'blue',
    },
  ];

  const colorMap: Record<string, { bg: string; border: string; text: string }> = {
    red: { bg: 'bg-red-900/30', border: 'border-red-700', text: 'text-red-400' },
    yellow: { bg: 'bg-yellow-900/30', border: 'border-yellow-700', text: 'text-yellow-400' },
    emerald: { bg: 'bg-emerald-900/30', border: 'border-emerald-700', text: 'text-emerald-400' },
    blue: { bg: 'bg-blue-900/30', border: 'border-blue-700', text: 'text-blue-400' },
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map((card) => {
        const Icon = card.icon;
        const colors = colorMap[card.color];
        
        return (
          <div
            key={card.title}
            className={`${colors.bg} border ${colors.border} rounded-md p-4`}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-slate-300">{card.title}</h3>
              <Icon size={18} className={colors.text} />
            </div>
            <div className="flex items-baseline gap-2">
              <span className={`text-2xl font-bold ${colors.text}`}>{card.value}</span>
            </div>
            <p className="text-xs text-slate-500 mt-2">{card.subtext}</p>
          </div>
        );
      })}
    </div>
  );
}
