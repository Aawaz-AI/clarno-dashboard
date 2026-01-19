"use client";

import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import type { StageDetail } from '@/types';
import { useThemeMode } from '@/app/provider';

interface Props {
  stages: Array<{ stage: string } & StageDetail>;
}

const COLORS = ['#2563eb', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

function formatStageName(s: string) {
  return s
    .replace(/_/g, ' ')
    .split(' ')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

export default function StageDetailsChart({ stages }: Props) {
  const { theme } = useThemeMode();
  const axisColor = theme === 'dark' ? '#cbd5e1' : '#0f172a';
  const gridColor = theme === 'dark' ? 'rgba(255,255,255,0.08)' : '#e5e7eb';

  const data = stages.map((s) => ({
    name: formatStageName(s.stage),
    total_turns: s.total_turns ?? 0,
    total_input_tokens: s.total_input_tokens ?? s.total_input_tokens ?? 0,
    total_output_tokens: s.total_output_tokens ?? 0,
    total_internal_cost: s.total_internal_cost ?? 0,
    total_charged_credits: s.total_charged_credits ?? 0,
  }));

  // metrics to show as separate lines
  const metrics = [
    { key: 'total_turns', label: 'Turns' },
    { key: 'total_input_tokens', label: 'Input Tokens' },
    { key: 'total_output_tokens', label: 'Output Tokens' },
    { key: 'total_internal_cost', label: 'Internal Cost' },
    { key: 'total_charged_credits', label: 'Charged Credits' },
  ];

  return (
    <div style={{ width: '100%', height: 320 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 20, left: 20, bottom: 40 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
          <XAxis dataKey="name" angle={-20} textAnchor="end" height={60} tick={{ fill: axisColor }} />
          <YAxis tick={{ fill: axisColor }} />
          <Tooltip />
          <Legend verticalAlign="top" height={36} wrapperStyle={{ color: axisColor }} />
          {metrics.map((m, i) => (
            <Line
              key={m.key}
              type="monotone"
              dataKey={m.key}
              name={m.label}
              stroke={COLORS[i % COLORS.length]}
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 6 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
