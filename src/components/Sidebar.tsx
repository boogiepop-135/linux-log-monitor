'use client';

import { useState } from 'react';
import { Activity, Cpu, HardDrive, Network, Settings } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const tabs = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'metrics', label: 'Métricas', icon: Cpu },
    { id: 'logs', label: 'Logs', icon: HardDrive },
    { id: 'network', label: 'Red', icon: Network },
  ];

  return (
    <aside className="border-r border-slate-700 bg-slate-950 w-48 p-4">
      <nav className="space-y-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-slate-800 text-slate-50 border border-slate-600'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-slate-300'
              }`}
            >
              <Icon size={18} />
              {tab.label}
            </button>
          );
        })}
      </nav>

      <div className="mt-8 border-t border-slate-700 pt-4">
        <div className="px-3 py-2 text-xs text-slate-500 font-semibold uppercase">
          Configuración
        </div>
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm text-slate-400 hover:bg-slate-900 hover:text-slate-300 transition-colors">
          <Settings size={18} />
          Ajustes
        </button>
      </div>
    </aside>
  );
}
