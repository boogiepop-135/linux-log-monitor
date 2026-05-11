'use client';

import { getLevelColor, getLevelBg, formatTimestamp } from '@/lib/utils';

interface Log {
  id: number;
  timestamp: string;
  level: string;
  host: string;
  service: string;
  message: string;
  source: string;
}

interface LogsTableProps {
  logs: Log[];
}

export default function LogsTable({ logs }: LogsTableProps) {
  return (
    <div className="bg-slate-900/50 border border-slate-700 rounded-md p-6">
      <h2 className="text-lg font-semibold text-slate-50 mb-4">Eventos Recientes</h2>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm font-mono">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="px-4 py-3 text-left text-slate-400 font-semibold">Timestamp</th>
              <th className="px-4 py-3 text-left text-slate-400 font-semibold">Level</th>
              <th className="px-4 py-3 text-left text-slate-400 font-semibold">Host</th>
              <th className="px-4 py-3 text-left text-slate-400 font-semibold">Service</th>
              <th className="px-4 py-3 text-left text-slate-400 font-semibold">Mensaje</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id} className={`border-b border-slate-800 hover:bg-slate-800/50 ${getLevelBg(log.level)}`}>
                <td className="px-4 py-3 text-slate-400">{formatTimestamp(log.timestamp)}</td>
                <td className="px-4 py-3">
                  <span className={`inline-block px-2 py-1 rounded text-xs font-bold ${getLevelColor(log.level)} ${getLevelBg(log.level)}`}>
                    {log.level.toUpperCase()}
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-300">{log.host}</td>
                <td className="px-4 py-3 text-slate-400">{log.service}</td>
                <td className="px-4 py-3 text-slate-300 max-w-xs truncate">{log.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
