export const formatBytes = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};

export const formatUptime = (hours: number): string => {
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  const remainingHours = hours % 24;
  return `${days}d ${remainingHours}h`;
};

export const formatTimestamp = (isoString: string): string => {
  const date = new Date(isoString);
  return date.toLocaleString('es-ES', {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};

export const getLevelColor = (level: string): string => {
  const colors: Record<string, string> = {
    info: 'text-blue-400',
    warning: 'text-yellow-400',
    error: 'text-red-400',
    critical: 'text-red-600',
  };
  return colors[level] || 'text-slate-400';
};

export const getLevelBg = (level: string): string => {
  const colors: Record<string, string> = {
    info: 'bg-blue-900/30 border-blue-700',
    warning: 'bg-yellow-900/30 border-yellow-700',
    error: 'bg-red-900/30 border-red-700',
    critical: 'bg-red-950/30 border-red-800',
  };
  return colors[level] || 'bg-slate-900/30 border-slate-700';
};

export const getStatusColor = (status: string): string => {
  const colors: Record<string, string> = {
    online: 'bg-emerald-900/30 border-emerald-700',
    warning: 'bg-yellow-900/30 border-yellow-700',
    offline: 'bg-red-900/30 border-red-700',
  };
  return colors[status] || 'bg-slate-900/30 border-slate-700';
};

export const getStatusTextColor = (status: string): string => {
  const colors: Record<string, string> = {
    online: 'text-emerald-400',
    warning: 'text-yellow-400',
    offline: 'text-red-400',
  };
  return colors[status] || 'text-slate-400';
};
