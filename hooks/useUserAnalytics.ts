import { useState, useEffect } from 'react';
import { fetchUserAnalytics } from '@/lib/api';
import type { UserStageAnalyticsResponse, UserStageAnalytics } from '@/types';

export function useUserAnalytics(dateRange: [string, string] | null, selectedUser?: string) {
  const [data, setData] = useState<UserStageAnalyticsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const endDate = dateRange?.[1] || new Date().toISOString().slice(0, 10);
        const startDate = dateRange?.[0] || new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString().slice(0, 10);

        const response = await fetchUserAnalytics({ start_date: startDate, end_date: endDate });
        setData(response);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch user analytics');
        console.error('User Analytics fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dateRange]);

  // Derived structures
  const stageAnalytics: UserStageAnalytics | null = data?.data?.stage_analytics ?? null;

  const stagesObj = stageAnalytics?.stage_analytics ?? {};
  const rawStagesArray = Object.entries(stagesObj).map(([key, val]) => ({
    stage: key,
    ...(val as any),
  }));

  // userData as rows for table: id + flattened overall + per-stage metrics
  const userDataObj = stageAnalytics?.user_data ?? {};
  const allUserDataRows = Object.entries(userDataObj).map(([userId, counts]: [string, any]) => {
    const row: Record<string, any> = { userId };

    // flatten overall
    row.overall_total_turns = counts?.overall?.total_turns ?? 0;
    row.overall_internal_cost = counts?.overall?.internal_cost ?? 0;
    row.overall_user_cost = counts?.overall?.user_cost ?? 0;
    row.overall_total_input_tokens = counts?.overall?.total_input_tokens ?? 0;
    row.overall_total_output_tokens = counts?.overall?.total_output_tokens ?? 0;
    row.overall_total_tokens = counts?.overall?.total_tokens ?? 0;

    // flatten stages
    const stages = counts?.stages || {};
    Object.entries(stages).forEach(([stageName, stageData]: [string, any]) => {
      row[`${stageName}_turns`] = stageData?.turns ?? 0;
      row[`${stageName}_internal_cost`] = stageData?.internal_cost ?? 0;
      row[`${stageName}_user_cost`] = stageData?.user_cost ?? 0;
      row[`${stageName}_input_tokens`] = stageData?.input_tokens ?? 0;
      row[`${stageName}_output_tokens`] = stageData?.output_tokens ?? 0;
      row[`${stageName}_total_tokens`] = stageData?.total_tokens ?? 0;
    });

    return row;
  });

  // Also create a simplified per-user overall row for stacked charts
  const allUserOverallRows = Object.entries(userDataObj).map(([userId, counts]) => ({
    userId,
    total_turns: (counts as any)?.overall?.total_turns ?? 0,
    internal_cost: (counts as any)?.overall?.internal_cost ?? 0,
    user_cost: (counts as any)?.overall?.user_cost ?? 0,
    total_input_tokens: (counts as any)?.overall?.total_input_tokens ?? 0,
    total_output_tokens: (counts as any)?.overall?.total_output_tokens ?? 0,
  }));

  // helper to format stage name
  function formatStageName(s: string) {
    return s
      .replace(/_/g, ' ')
      .split(' ')
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
  }

  // If a specific user is selected, show only that user's counts in charts and stage totals,
  // but keep `userDataRows` and `userOverallRows` as the full set so the Per-user Counts table remains unchanged.
  let stagesArray = rawStagesArray;
  let userDataRows = allUserDataRows; // always provide full user rows for the Per-user table
  let chartData = rawStagesArray.map(s => ({ name: formatStageName(s.stage), totalTurns: s.total_turns }));
  let userOverallRows = allUserOverallRows; // for stacked chart

  if (selectedUser && selectedUser !== 'all') {
    // find the row for the selected user
    const row = allUserDataRows.find(r => String(r.userId) === String(selectedUser));
    // build stagesArray where total_turns come from user's flattened stage counts (or 0)
    stagesArray = rawStagesArray.map(s => {
      const key = `${s.stage}_turns`;
      const turns = row && (row as any)[key] !== undefined ? (row as any)[key] : 0;
      return {
        stage: s.stage,
        total_turns: turns,
        users_count: turns > 0 ? 1 : 0,
        avg_turns_per_user: turns,
        user_participation_rate: turns > 0 ? 100 : 0,
        stage_turn_percentage: 0,
      };
    });

    // keep userDataRows and userOverallRows unchanged so the Per-user Counts table still shows all users
    chartData = stagesArray.map(s => ({ name: formatStageName(s.stage), totalTurns: s.total_turns ?? 0 }));
  }

  return { data, stageAnalytics, stagesArray, userDataRows, userOverallRows, chartData, loading, error };
}
