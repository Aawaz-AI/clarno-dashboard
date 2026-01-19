 'use client';

import { useMemo, useState } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Card } from 'antd';
import type { UserProfile } from '@/types';

type Props = {
  userOverallRows?: Array<Record<string, any>>;
  selectedUser?: string;
  userProfiles?: UserProfile[];
};

export default function PerUserOverview({ userOverallRows = [], selectedUser, userProfiles = [] }: Props) {
  const METRIC_OPTIONS = [
    { key: 'total_turns', label: 'Turns', color: '#2563eb' },
    { key: 'internal_cost', label: 'Internal Cost', color: '#06b6d4' },
    { key: 'user_cost', label: 'User Cost', color: '#10b981' },
    { key: 'total_input_tokens', label: 'Input Tokens', color: '#f59e0b' },
    { key: 'total_output_tokens', label: 'Output Tokens', color: '#ef4444' },
  ];

  const [selectedMetrics, setSelectedMetrics] = useState<string[]>(METRIC_OPTIONS.map(m => m.key));

  const toggleMetric = (key: string) => {
    setSelectedMetrics(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]);
  };

  const nameLookup = useMemo(() => {
    return userProfiles.reduce<Record<string, string>>((acc, profile) => {
      acc[String(profile.user_id)] = profile.name || String(profile.user_id);
      return acc;
    }, {});
  }, [userProfiles]);

  const filteredOverallRows = useMemo(() => {
    if (!userOverallRows || userOverallRows.length === 0) return [];
    if (!selectedUser || selectedUser === 'all') return userOverallRows;
    return userOverallRows.filter(u => String(u.userId) === String(selectedUser));
  }, [userOverallRows, selectedUser]);

  const displayRows = useMemo(() => {
    return filteredOverallRows.map(row => ({
      ...row,
      displayName: nameLookup[String(row.userId)] || String(row.userId),
    }));
  }, [filteredOverallRows, nameLookup]);

  return (
    <Card className="shadow-sm" title={<span className="text-lg font-semibold">Per-user Overview (Stacked)</span>}>
      <div className="mb-3 flex items-center gap-4">
        <span className="text-sm text-gray-700">Metrics:</span>
        {METRIC_OPTIONS.map(opt => (
          <label key={opt.key} className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={selectedMetrics.includes(opt.key)} onChange={() => toggleMetric(opt.key)} />
            <span style={{ width: 12, height: 12, background: opt.color, display: 'inline-block', borderRadius: 2 }} />
            <span>{opt.label}</span>
          </label>
        ))}
      </div>

      <div style={{ width: '100%', height: 300 }}>
        {(!displayRows || displayRows.length === 0) ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-6">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center">
                <svg className="w-10 h-10 text-blue-600 animate-pulse" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 1.343-3 3v4h6v-4c0-1.657-1.343-3-3-3z" />
                </svg>
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-1">Select a user to view details</h3>
            <p className="text-sm text-gray-500 mb-4">Click a User ID in the table below to inspect a user's per-stage metrics and costs.</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={displayRows} margin={{ top: 10, right: 20, left: 0, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="displayName"
                tick={{ fontSize: 12 }}
                angle={displayRows.length > 1 ? -20 : 0}
                textAnchor={displayRows.length > 1 ? 'end' : 'middle'}
                interval={0}
                height={60}
              />
              <YAxis />
              <Tooltip />
              {METRIC_OPTIONS.filter(m => selectedMetrics.includes(m.key)).map(m => (
                <Bar key={m.key} dataKey={m.key} stackId="a" fill={m.color} />
              ))}
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </Card>
  );
}
