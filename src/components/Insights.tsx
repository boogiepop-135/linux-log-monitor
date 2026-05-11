'use client';

interface Insight {
  title: string;
  description: string;
  severity: 'info' | 'warning' | 'critical';
}

interface InsightsProps {
  insights: Insight[];
}

export default function Insights({ insights }: InsightsProps) {
  const severityConfig = {
    info: { bg: 'bg-blue-900/30', border: 'border-blue-700', text: 'text-blue-400' },
    warning: { bg: 'bg-yellow-900/30', border: 'border-yellow-700', text: 'text-yellow-400' },
    critical: { bg: 'bg-red-900/30', border: 'border-red-700', text: 'text-red-400' },
  };

  return (
    <div className="bg-slate-900/50 border border-slate-700 rounded-md p-6">
      <h2 className="text-lg font-semibold text-slate-50 mb-4">Insights Automáticos</h2>
      
      <div className="space-y-3">
        {insights.map((insight, idx) => {
          const config = severityConfig[insight.severity];
          return (
            <div
              key={idx}
              className={`${config.bg} border ${config.border} rounded-md p-3`}
            >
              <div className={`font-semibold ${config.text} text-sm mb-1`}>{insight.title}</div>
              <div className="text-slate-300 text-xs">{insight.description}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
