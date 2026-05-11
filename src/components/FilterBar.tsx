'use client';

import { useState } from 'react';
import { Search, Filter } from 'lucide-react';

interface FilterBarProps {
  onHostChange: (host: string) => void;
  onServiceChange: (service: string) => void;
  onLevelChange: (level: string) => void;
}

const hosts = ['prod-web-01', 'prod-web-02', 'prod-db-01', 'prod-cache-01', 'prod-api-01', 'prod-monitor'];
const services = ['nginx', 'postgresql', 'redis', 'docker', 'rabbitmq', 'systemd'];
const levels = ['info', 'warning', 'error', 'critical'];

export default function FilterBar({ onHostChange, onServiceChange, onLevelChange }: FilterBarProps) {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="bg-slate-900/50 border border-slate-700 rounded-md p-4 mb-6">
      <div className="space-y-4">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Buscar en logs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-700 rounded-md text-slate-300 placeholder-slate-600 focus:outline-none focus:border-slate-600"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <select
            onChange={(e) => onHostChange(e.target.value)}
            className="px-3 py-2 bg-slate-950 border border-slate-700 rounded-md text-slate-300 focus:outline-none focus:border-slate-600 text-sm"
          >
            <option value="">Todos los hosts</option>
            {hosts.map((host) => (
              <option key={host} value={host}>
                {host}
              </option>
            ))}
          </select>

          <select
            onChange={(e) => onServiceChange(e.target.value)}
            className="px-3 py-2 bg-slate-950 border border-slate-700 rounded-md text-slate-300 focus:outline-none focus:border-slate-600 text-sm"
          >
            <option value="">Todos los servicios</option>
            {services.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>

          <select
            onChange={(e) => onLevelChange(e.target.value)}
            className="px-3 py-2 bg-slate-950 border border-slate-700 rounded-md text-slate-300 focus:outline-none focus:border-slate-600 text-sm"
          >
            <option value="">Todos los niveles</option>
            {levels.map((level) => (
              <option key={level} value={level}>
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
