'use client';

import { Card, Alert } from 'antd';
import ExternalStats from './ExternalStats';
import TavilyCredits from './TavilyCredits';
import ExternalCharts from './ExternalCharts';

type Props = {
  totals: any;
  dailyArray: any[];
  loading?: boolean;
  error?: string | null;
  dateRange?: [string, string] | null;
};

export default function ExternalApisCard({ totals, dailyArray, loading, error, dateRange }: Props) {
  if (error) {
    return <Alert className="mb-4" type="warning" message={error} showIcon />;
  }

  if (loading) {
    return <div className="mb-4"><p className="text-sm text-gray-500">Loading external API data...</p></div>;
  }

  if (!totals) return null;

  return (
    <Card className="shadow-sm" title={<span className="text-lg font-semibold">External APIs</span>}>
      <div className="px-2 py-1 flex flex-col gap-6">
        <TavilyCredits usage={totals.tavily_usage} />
        <ExternalStats totals={totals} />
        <ExternalCharts data={dailyArray} dateRange={dateRange} />
      </div>
    </Card>
  );
}
