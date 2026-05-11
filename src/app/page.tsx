'use client';

import { useState, useMemo } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import MetricsCards from '@/components/MetricsCards';
import ActivityChart from '@/components/ActivityChart';
import AlertsChart from '@/components/AlertsChart';
import LogsTable from '@/components/LogsTable';
import FilterBar from '@/components/FilterBar';
import Insights from '@/components/Insights';
import metricsData from '@/data/metrics.json';
import logsData from '@/data/logs.json';
import hostsData from '@/data/hosts.json';
import servicesData from '@/data/services.json';

export default function Home() {
  const [isDark, setIsDark] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedHost, setSelectedHost] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');

  // Combine CPU and Memory data for activity chart
  const activityData = metricsData.cpu.history.map((item, idx) => ({
    time: item.time,
    cpu: item.value,
    memory: metricsData.memory.history[idx]?.value || 0,
  }));

  // Filter logs based on selections
  const filteredLogs = useMemo(() => {
    return logsData.logs.filter((log) => {
      if (selectedHost && log.host !== selectedHost) return false;
      if (selectedService && log.service !== selectedService) return false;
      if (selectedLevel && log.level !== selectedLevel) return false;
      return true;
    });
  }, [selectedHost, selectedService, selectedLevel]);

  // Generate insights based on metrics
  const insights = [
    {
      title: 'CPU en rango normal',
      description: `Uso actual: ${metricsData.cpu.usage.toFixed(1)}%. Carga promedio: ${metricsData.cpu.loadAverage[0]?.toFixed(1) || 0}`,
      severity: 'info' as const,
    },
    {
      title: 'Memoria moderada',
      description: `Uso: ${metricsData.memory.usage.toFixed(1)}% de ${metricsData.memory.total}GB. ${metricsData.memory.available}GB disponible.`,
      severity: 'info' as const,
    },
    {
      title: '⚠️ Disco alto en /var',
      description: 'El monitor muestra 92% de uso en /var/log. Considera limpiar logs antiguos.',
      severity: 'warning' as const,
    },
    {
      title: '🔴 Errores detectados',
      description: 'Se han registrado 2 errores críticos en las últimas 24 horas. Revisar prod-api-01.',
      severity: 'critical' as const,
    },
  ];

  return (
    <div className={`min-h-screen ${isDark ? 'bg-slate-950' : 'bg-slate-50'}`}>
      <Header isDark={isDark} setIsDark={setIsDark} />
      
      <div className="flex h-[calc(100vh-80px)]">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <main className="flex-1 overflow-auto bg-slate-950">
          <div className="p-6">
            {activeTab === 'overview' && (
              <>
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-slate-50 mb-4">Dashboard</h2>
                  <MetricsCards metrics={metricsData} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  <ActivityChart data={activityData} />
                  <AlertsChart data={metricsData.network.history} />
                </div>

                <FilterBar
                  onHostChange={setSelectedHost}
                  onServiceChange={setSelectedService}
                  onLevelChange={setSelectedLevel}
                />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <LogsTable logs={filteredLogs} />
                  </div>
                  <div>
                    <Insights insights={insights} />
                  </div>
                </div>
              </>
            )}

            {activeTab === 'metrics' && (
              <div>
                <h2 className="text-xl font-semibold text-slate-50 mb-6">Métricas Detalladas</h2>
                <MetricsCards metrics={metricsData} />
                <ActivityChart data={activityData} />
                <AlertsChart data={metricsData.network.history} />
              </div>
            )}

            {activeTab === 'logs' && (
              <div>
                <h2 className="text-xl font-semibold text-slate-50 mb-6">Análisis de Logs</h2>
                <FilterBar
                  onHostChange={setSelectedHost}
                  onServiceChange={setSelectedService}
                  onLevelChange={setSelectedLevel}
                />
                <LogsTable logs={filteredLogs} />
              </div>
            )}

            {activeTab === 'network' && (
              <div>
                <h2 className="text-xl font-semibold text-slate-50 mb-6">Tráfico de Red</h2>
                <AlertsChart data={metricsData.network.history} />
                <div className="bg-slate-900/50 border border-slate-700 rounded-md p-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-4 bg-slate-950 border border-slate-700 rounded">
                      <p className="text-slate-400 text-sm mb-2">Bytes In</p>
                      <p className="text-slate-50 font-mono text-lg">{(metricsData.network.bytesIn / 1024 / 1024 / 1024).toFixed(2)} GB</p>
                    </div>
                    <div className="p-4 bg-slate-950 border border-slate-700 rounded">
                      <p className="text-slate-400 text-sm mb-2">Bytes Out</p>
                      <p className="text-slate-50 font-mono text-lg">{(metricsData.network.bytesOut / 1024 / 1024 / 1024).toFixed(2)} GB</p>
                    </div>
                    <div className="p-4 bg-slate-950 border border-slate-700 rounded">
                      <p className="text-slate-400 text-sm mb-2">Packets In</p>
                      <p className="text-slate-50 font-mono text-lg">{(metricsData.network.packetsIn / 1000000).toFixed(2)}M</p>
                    </div>
                    <div className="p-4 bg-slate-950 border border-slate-700 rounded">
                      <p className="text-slate-400 text-sm mb-2">Packets Out</p>
                      <p className="text-slate-50 font-mono text-lg">{(metricsData.network.packetsOut / 1000000).toFixed(2)}M</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
