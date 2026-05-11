'use client';

import { useState } from 'react';
import { Sun, Moon, Bell } from 'lucide-react';

interface HeaderProps {
  isDark: boolean;
  setIsDark: (value: boolean) => void;
}

export default function Header({ isDark, setIsDark }: HeaderProps) {
  const [alerts, setAlerts] = useState(3);

  return (
    <header className="border-b border-slate-700 bg-slate-950 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-50">Linux Log Monitor</h1>
          <p className="text-sm text-slate-500">Sistema de Monitoreo y Análisis de Logs</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <button className="relative rounded-md p-2 text-slate-400 hover:bg-slate-900 hover:text-slate-300">
              <Bell size={20} />
              {alerts > 0 && (
                <span className="absolute right-0 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
                  {alerts}
                </span>
              )}
            </button>
          </div>

          <button
            onClick={() => setIsDark(!isDark)}
            className="rounded-md p-2 text-slate-400 hover:bg-slate-900 hover:text-slate-300"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
}
