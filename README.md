# 🐧 Linux Log Monitor

Un dashboard profesional de monitoreo y análisis de logs para sistemas Linux. Diseñado para parecer una herramienta real de administración de sistemas, no un template genérico.

## ✨ Características

- **📊 Métricas de Sistema**: CPU, memoria, disco y red en tiempo real
- **📝 Análisis de Logs**: Tabla monoespaciada con niveles semánticos (info, warning, error, critical)
- **🔍 Filtros Avanzados**: Por host, servicio y nivel de severidad
- **📈 Gráficas**: Actividad del sistema y tráfico de red (últimas 24h)
- **💡 Insights Automáticos**: Alertas y recomendaciones basadas en métricas
- **🌓 Dark/Light Mode**: Interfaz adaptable (tema oscuro profesional por defecto)
- **⚡ Datos Locales**: JSON embebido sin necesidad de backend

## 🎨 Diseño

### Enfoque Visual
- **Terminal profesional**: Fondo sólido `#0f172a` sin degradados cliché
- **Tipografía**: `Inter` para UI, `JetBrains Mono` para datos y logs
- **Colores funcionales**: Verde (ok), amarillo (warning), rojo (error), rojo oscuro (critical)
- **Densidad**: Interfaz compacta y enfocada, sin espacios vacíos
- **Bordes claros**: `1px solid` con esquinas sutiles, no suave

### Estructura
```
┌─────────────────────────────────────┐
│  Header (nav, toggles, alertas)     │
├──────────────┬──────────────────────┤
│   Sidebar    │   Main Content       │
│   (tabs)     │  • Métricas          │
│              │  • Gráficas          │
│              │  • Filtros           │
│              │  • Tabla de logs     │
│              │  • Insights          │
└──────────────┴──────────────────────┘
```

## 🚀 Stack Tecnológico

- **Next.js 15+**: Framework React con Server Components
- **TypeScript**: Tipado completo
- **Tailwind CSS**: Estilos utilitarios (sin custom builds)
- **Recharts**: Gráficas declarativas
- **Lucide Icons**: Iconos SVG minimalistas
- **JSON local**: Datos sin backend

## 📦 Instalación

```bash
# Clonar o navegar al directorio
cd linux-log-monitor

# Instalar dependencias
npm install

# Variables de entorno (opcional)
cp .env.example .env.local
```

### Dependencias Instaladas
```bash
npm install recharts lucide-react
```

## 🏃 Desarrollo

```bash
# Iniciar servidor de desarrollo
npm run dev

# Abrir en navegador
# http://localhost:3000
```

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── layout.tsx           # Layout raíz con tipografía
│   ├── page.tsx             # Dashboard principal
│   └── globals.css          # Estilos globales
├── components/
│   ├── Header.tsx           # Encabezado con notificaciones
│   ├── Sidebar.tsx          # Navegación principal
│   ├── MetricsCards.tsx     # Cards de CPU, RAM, Disco, Red
│   ├── ActivityChart.tsx    # Gráfica de actividad (24h)
│   ├── AlertsChart.tsx      # Gráfica de tráfico de red
│   ├── LogsTable.tsx        # Tabla de eventos monoespaciada
│   ├── FilterBar.tsx        # Filtros por host/servicio/nivel
│   └── Insights.tsx         # Alertas automáticas
├── data/
│   ├── metrics.json         # CPU, memoria, disco, red
│   ├── logs.json            # Eventos con niveles
│   ├── hosts.json           # Información de hosts
│   └── services.json        # Estado de servicios
└── lib/
    └── utils.ts             # Utilidades: formateo, colores
```

## 📊 Datos

Todos los datos están en archivos JSON en `src/data/`:

### metrics.json
```json
{
  "cpu": { "usage": 45.2, "cores": 8, "history": [...] },
  "memory": { "usage": 62.5, "total": 16, "history": [...] },
  "disk": [...],
  "network": { "bytesIn": ..., "bytesOut": ..., "history": [...] }
}
```

### logs.json
```json
{
  "logs": [
    {
      "id": 1,
      "timestamp": "2026-05-11T14:35:22Z",
      "level": "info|warning|error|critical",
      "host": "prod-web-01",
      "service": "nginx",
      "message": "...",
      "source": "kernel|application|database|..."
    }
  ]
}
```

Puedes:
- Modificar los valores para testing
- Agregar más eventos a `logs.json`
- Simular diferentes escenarios de carga

## 🛠️ Personalización

### Cambiar tema
Edita `src/app/globals.css`:
```css
:root {
  --background: #0f172a;  /* Cambiar aquí */
  --foreground: #f1f5f9;
}
```

### Agregar nuevas métricas
1. Agregar a `src/data/metrics.json`
2. Crear componente en `src/components/`
3. Importar en `src/app/page.tsx`

### Actualizar logs en tiempo real
Reemplaza el JSON con un fetch real:
```typescript
const logsData = await fetch('/api/logs').then(r => r.json());
```

## 📤 Deploy en Vercel

### Opción 1: Via CLI

```bash
# Instalar Vercel CLI (si no lo tienes)
npm i -g vercel

# Deploy
vercel

# Seguir las instrucciones interactivas
```

### Opción 2: Via GitHub

1. Subir a GitHub:
```bash
git init
git add .
git commit -m "Initial commit: Linux Log Monitor"
git branch -M main
git remote add origin https://github.com/tu-usuario/linux-log-monitor.git
git push -u origin main
```

2. En [Vercel Dashboard](https://vercel.com):
   - Click "New Project"
   - Seleccionar repositorio de GitHub
   - Vercel detectará Next.js automáticamente
   - Click "Deploy"

### Configuración en Vercel

**Environment Variables** (si aplica):
```
# No se requieren para este proyecto
```

**Build Settings**:
- Framework: `Next.js`
- Build Command: `npm run build`
- Output Directory: `.next`

**Domains**:
- Vercel asigna automáticamente: `linux-log-monitor.vercel.app`
- Agrega dominio personalizado en "Settings > Domains"

### URL Pública
Después del deploy:
```
https://linux-log-monitor.vercel.app
```

## 🔄 Updates & Mantenimiento

### Actualizar datos
```bash
# Editar archivos JSON
nano src/data/metrics.json
nano src/data/logs.json

# Commit y push
git add src/data/
git commit -m "Update metrics and logs"
git push
```

Vercel se redeploy automáticamente.

### Agregar funcionalidades
1. Crear rama: `git checkout -b feature/nueva-funcion`
2. Desarrollar localmente: `npm run dev`
3. Commit: `git commit -m "Add: nueva funcionalidad"`
4. Push: `git push origin feature/nueva-funcion`
5. PR en GitHub

## 🐛 Troubleshooting

**Error: "Cannot find module 'recharts'"**
```bash
npm install recharts lucide-react
```

**Puerto 3000 en uso**
```bash
npm run dev -- -p 3001
```

**Build falla en Vercel**
- Verificar `tsconfig.json`
- Revisar console logs en Vercel Deploy
- Verificar variables de entorno

## 📄 Licencia

MIT - Libre para uso personal y comercial.

## 👨‍💻 Autor

Portfolio Project - Linux Log Monitor Dashboard

---

**¿Preguntas o sugerencias?** Abre un issue en el repositorio.

