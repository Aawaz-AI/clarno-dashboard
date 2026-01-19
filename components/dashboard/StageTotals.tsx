 'use client';

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell, Legend } from 'recharts';
import { Card } from 'antd';
import type { StageDetail } from '@/types';
import { useThemeMode } from '@/app/provider';

type Props = {
  chartData: Array<{ name: string; totalTurns: number }>;
  stages: Array<{ stage: string } & StageDetail>;
};

export default function StageTotals({ chartData, stages }: Props) {
  const { theme } = useThemeMode();
  const axisColor = theme === 'dark' ? '#cbd5e1' : '#0f172a';
  const gridColor = theme === 'dark' ? 'rgba(255,255,255,0.08)' : '#e5e7eb';
  const COLORS = ['#2563eb', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#f43f5e'];

  return (
    <Card className="shadow-sm" title={<span className="text-lg font-semibold">Stage Totals</span>}>
      <div className="flex gap-6 items-start">
        <div style={{ flex: 1, height: 260 }} className="chart-surface p-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: axisColor }} angle={-20} textAnchor="end" interval={0} tickMargin={12} height={60} />
              <YAxis tick={{ fill: axisColor }} />
              <Tooltip />
              <Bar dataKey="totalTurns" fill="#1890ff" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={{ width: 360, height: 260 }} className="chart-surface p-4">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={stages.map(s => ({ name: s.stage.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()), value: s.total_turns ?? 0 }))}
                dataKey="value"
                nameKey="name"
                cx="48%"
                cy="50%"
                innerRadius={0}
                outerRadius={90}
                labelLine={false}
                label={(props: any) => {
                  const RADIAN = Math.PI / 180;
                  const { cx, cy, midAngle, innerRadius, outerRadius, percent, index } = props;
                  const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
                  const xPos = cx + radius * Math.cos(-midAngle * RADIAN);
                  const yPos = cy + radius * Math.sin(-midAngle * RADIAN);

                  const hex = COLORS[index % COLORS.length] || '#000000';
                  const r = parseInt(hex.slice(1, 3), 16);
                  const g = parseInt(hex.slice(3, 5), 16);
                  const b = parseInt(hex.slice(5, 7), 16);
                  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
                  const textColor = luminance > 0.55 ? '#111827' : '#ffffff';

                  return (
                    <text
                      x={xPos}
                      y={yPos}
                      fill={textColor}
                      fontSize={12}
                      textAnchor="middle"
                      dominantBaseline="central"
                      stroke={textColor === '#ffffff' ? 'rgba(0,0,0,0.35)' : 'rgba(255,255,255,0.35)'}
                      strokeWidth={0.6}
                      opacity={0.95}
                    >
                      {`${(percent * 100).toFixed(0)}%`}
                    </text>
                  );
                }}
              >
                {stages.map((_, i) => (
                  <Cell key={`slice-${i}`} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(v: any, name: any) => [`${v}`, `${name}`]} />
              <Legend layout="vertical" verticalAlign="middle" align="right" wrapperStyle={{ fontSize: 12, width: 140, color: axisColor }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
}
