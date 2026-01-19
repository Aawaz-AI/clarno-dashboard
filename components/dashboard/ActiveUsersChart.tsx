import { Card } from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area } from 'recharts';
import { ChartData } from '@/types';
import { useThemeMode } from '@/app/provider';

function formatDateISO(d: Date) {
  return d.toISOString().slice(0, 10);
}

interface ActiveUsersChartProps {
  data: ChartData[];
}

// Custom tooltip to show a single entry for active users (avoid duplicate Area+Line entries)
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload || payload.length === 0) return null;
  const item = payload.find((p: any) => p && p.dataKey === 'activeUsers') || payload[0];

  return (
    <div className="bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-2xl border border-gray-100" style={{ minWidth: 160 }}>
      <div className="text-xs font-medium text-gray-500 mb-1">{label}</div>
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-blue-500" />
        <div className="text-lg font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{item.value}</div>
        <div className="text-xs text-gray-600">users</div>
      </div>
    </div>
  );
}

export default function ActiveUsersChart({ data }: ActiveUsersChartProps) {
  const { theme } = useThemeMode();
  const axisColor = theme === 'dark' ? '#cbd5e1' : '#475569';
  const gridColor = theme === 'dark' ? 'rgba(255,255,255,0.08)' : '#e6edf3';

  // If there's no data, create a small fallback of the last 7 days with zeros
  const displayData: ChartData[] = (data && data.length > 0)
    ? data
    : Array.from({ length: 7 }).map((_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (6 - i));
        return { date: formatDateISO(d), activeUsers: 0 };
      });

  const maxValue = Math.max(...displayData.map(d => d.activeUsers), 0);
  const yMax = Math.max(10, Math.ceil(maxValue / 10) * 10);

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-0 bg-white/80 backdrop-blur-sm overflow-hidden">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-8 bg-linear-to-b from-blue-500 to-purple-600 rounded-full" />
        <h2 className="text-xl font-bold heading-fade">Active Users Trend</h2>
      </div>
      <ResponsiveContainer width="100%" height={340}>
        <LineChart data={displayData} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
          <defs>
            <linearGradient id="gradActive" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1890ff" stopOpacity={0.18} />
              <stop offset="100%" stopColor="#1890ff" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
          <XAxis dataKey="date" tick={{ fontSize: 12, fill: axisColor }} tickMargin={8} />
          <YAxis tick={{ fontSize: 12, fill: axisColor }} domain={[0, yMax]} />
          <Tooltip content={<CustomTooltip />} />

          <Area type="monotone" dataKey="activeUsers" stroke="#1890ff" fillOpacity={1} fill="url(#gradActive)" />
          <Line
            type="monotone"
            dataKey="activeUsers"
            stroke="#0366d6"
            strokeWidth={3}
            dot={{ r: 3, fill: '#0366d6', strokeWidth: 0 }}
            activeDot={{ r: 6, stroke: '#0366d6', strokeWidth: 2, fill: '#fff' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}
