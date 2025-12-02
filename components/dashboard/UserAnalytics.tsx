'use client';

import StageTable from './StageTable';
import StageComparison from './StageComparison';
import StageTotals from './StageTotals';
import PerUserOverview from './PerUserOverview';
import PerUserDetails from './PerUserDetails';
import type { StageDetail } from '@/types';

interface UserAnalyticsProps {
  stages: Array<{ stage: string } & StageDetail>;
  userRows: Array<Record<string, any>>;
  userOverallRows?: Array<Record<string, any>>;
  chartData: Array<{ name: string; totalTurns: number }>;
  selectedUser?: string;
  onSelectUser?: (id: string) => void;
}

export default function UserAnalytics({ stages, userRows, userOverallRows = [], chartData, selectedUser, onSelectUser }: UserAnalyticsProps) {
  return (
    <div className="flex flex-col gap-6">
      <StageTable stages={stages} />
      <StageComparison stages={stages} />
      <StageTotals chartData={chartData} stages={stages} />
      <PerUserOverview userOverallRows={userOverallRows} selectedUser={selectedUser} />
      <PerUserDetails userRows={userRows} userOverallRows={userOverallRows} selectedUser={selectedUser} onSelectUser={onSelectUser} />
    </div>
  );
}
