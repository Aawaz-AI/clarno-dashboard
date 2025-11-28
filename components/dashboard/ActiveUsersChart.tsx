import { Card } from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area } from 'recharts';
import { ChartData } from '@/types';

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
    <div className="bg-white p-3 rounded shadow-md" style={{ minWidth: 140 }}>
      <div className="text-xs text-gray-500">{label}</div>
      <div className="mt-1 text-sm font-semibold text-blue-600">{item.value} Active Users</div>
    </div>
  );
}

export default function ActiveUsersChart({ data }: ActiveUsersChartProps) {
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
    <Card className="shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Active Users Trend</h2>
      <ResponsiveContainer width="100%" height={340}>
        <LineChart data={displayData} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
          <defs>
            <linearGradient id="gradActive" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1890ff" stopOpacity={0.18} />
              <stop offset="100%" stopColor="#1890ff" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="#e6edf3" />
          <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#475569' }} tickMargin={8} />
          <YAxis tick={{ fontSize: 12, fill: '#475569' }} domain={[0, yMax]} />
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
