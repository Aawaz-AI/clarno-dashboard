'use client';

import dayjs from 'dayjs';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  Legend,
} from 'recharts';

type Props = {
  data: any[];
  dateRange?: [string, string] | null;
};

export default function ExternalCharts({ data, dateRange }: Props) {
  const rangeLabel = dateRange && dateRange[0] && dateRange[1]
    ? `${dayjs(dateRange[0]).format('MMM D, YYYY')} — ${dayjs(dateRange[1]).format('MMM D, YYYY')}`
    : data && data.length > 0
      ? `${dayjs(data[0].date).format('MMM D')} — ${dayjs(data[data.length - 1].date).format('MMM D')}`
      : 'Recent';

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="text-lg font-semibold text-gray-900">External APIs Activity</h4>
          <p className="text-sm text-gray-500">Daily calls breakdown — Reddit · Tavily · Gemini</p>
        </div>
        <div className="text-sm text-gray-500">{rangeLabel}</div>
      </div>

      <div className="flex gap-4 items-stretch">
        <div className="flex-1">
          <div className="p-4 bg-white rounded-lg shadow-sm" style={{ height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="daily_total" stroke="#1890ff" strokeWidth={2} dot={{ r: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div style={{ width: 420 }}>
          <div className="p-4 bg-white rounded-lg shadow-sm" style={{ height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="reddit_total" stackId="a" fill="#2563eb" />
                <Bar dataKey="tavily_total" stackId="a" fill="#06b6d4" />
                <Bar dataKey="gemini_total" stackId="a" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
