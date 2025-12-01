import { useState, useEffect } from 'react';
import { fetchOverallAnalytics, fetchExternalApisAnalytics } from '@/lib/api';
import type { AnalyticsResponse } from '@/lib/api';
import type { ChartData, Stats, ExternalApisResponse } from '@/types';
import dayjs from 'dayjs';

export function useAnalytics(dateRange: [string, string] | null) {
  const [data, setData] = useState<AnalyticsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [externalData, setExternalData] = useState<ExternalApisResponse | null>(null);
  const [externalLoading, setExternalLoading] = useState(false);
  const [externalError, setExternalError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Default date range if none selected (last 30 days)
        const endDate = dateRange?.[1] || dayjs().format('YYYY-MM-DD');
        const startDate = dateRange?.[0] || dayjs().subtract(30, 'days').format('YYYY-MM-DD');

        const response = await fetchOverallAnalytics({
          start_date: startDate,
          end_date: endDate,
        });

        setData(response);

        // Also fetch external-apis analytics (best-effort)
        setExternalLoading(true);
        setExternalError(null);
        try {
          const ext = await fetchExternalApisAnalytics({ start_date: startDate, end_date: endDate });
          console.debug('external apis analytics', ext);
          setExternalData(ext);
        } catch (err) {
          const msg = err instanceof Error ? err.message : 'Failed to fetch external apis analytics';
          console.warn('Failed to fetch external apis analytics', err);
          setExternalData(null);
          setExternalError(msg);
        } finally {
          setExternalLoading(false);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch analytics');
        console.error('Analytics fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dateRange]);

  // Transform API data to chart format
  const chartData: ChartData[] = data?.data?.active_users?.daily_data?.map(item => ({
    date: item.date,
    activeUsers: item.active_users_count,
  })) ?? [];

  // Transform API data to stats format
  const stats: Stats = {
    totalUsers: data?.data?.active_users?.analytics?.total_users_in_system ?? 0,
    activeUsers: Math.round(data?.data?.active_users?.analytics?.total_active_users_in_period ?? 0),
    nonActiveUsers: data?.data?.active_users?.analytics?.non_active_users ?? 0,
    averageDailyActive: data?.data?.active_users?.analytics?.average_daily_active_users ?? 0,
  };


  // Transform user data for the table with flattened stage metrics
  const userRows = data?.data?.stage_analytics?.user_data 
    ? Object.entries(data.data.stage_analytics.user_data).map(([userId, userData]: [string, any]) => {
        const row: Record<string, any> = { userId };
        
        // Add overall metrics
        row.overall_total_turns = userData.overall?.total_turns ?? 0;
        row.overall_internal_cost = userData.overall?.internal_cost ?? 0;
        row.overall_user_cost = userData.overall?.user_cost ?? 0;
        row.overall_total_input_tokens = userData.overall?.total_input_tokens ?? 0;
        row.overall_total_output_tokens = userData.overall?.total_output_tokens ?? 0;
        row.overall_total_tokens = userData.overall?.total_tokens ?? 0;

        // Add stage-specific metrics
        const stages = userData.stages || {};
        Object.entries(stages).forEach(([stageName, stageData]: [string, any]) => {
          row[`${stageName}_turns`] = stageData.turns ?? 0;
          row[`${stageName}_internal_cost`] = stageData.internal_cost ?? 0;
          row[`${stageName}_user_cost`] = stageData.user_cost ?? 0;
          row[`${stageName}_input_tokens`] = stageData.input_tokens ?? 0;
          row[`${stageName}_output_tokens`] = stageData.output_tokens ?? 0;
          row[`${stageName}_total_tokens`] = stageData.total_tokens ?? 0;
        });

        return row;
      })
    : [];

  // Transform user data for stacked chart
  const userOverallRows = data?.data?.stage_analytics?.user_data
    ? Object.entries(data.data.stage_analytics.user_data).map(([userId, userData]: [string, any]) => ({
        userId,
        total_turns: userData.overall?.total_turns ?? 0,
        internal_cost: userData.overall?.internal_cost ?? 0,
        user_cost: userData.overall?.user_cost ?? 0,
        total_input_tokens: userData.overall?.total_input_tokens ?? 0,
        total_output_tokens: userData.overall?.total_output_tokens ?? 0,
      }))
    : [];


  // Also expose external API data and helper transforms
  // Transform external daily_data (object keyed by date) into array for charts
  const externalDailyArray = externalData?.data?.daily_data
    ? Object.entries(externalData.data.daily_data)
        .map(([date, d]) => ({ date, reddit_total: d.reddit_total ?? 0, tavily_total: d.tavily_total ?? 0, gemini_total: d.gemini_total ?? 0, daily_total: d.daily_total ?? 0 }))
        .sort((a, b) => a.date.localeCompare(b.date))
    : [];

  const externalTotals = externalData?.data
    ? {
        total_reddit_calls: externalData.data.total_reddit_calls ?? 0,
        total_tavily_calls: externalData.data.total_tavily_calls ?? 0,
        total_gemini_calls: externalData.data.total_gemini_calls ?? 0,
        total_all_calls: externalData.data.total_all_calls ?? 0,
        tavily_usage: externalData.data.tavily_api_usage?.data ?? null,
      }
    : null;

  return { data, chartData, stats, userRows, userOverallRows, loading, error, externalData, externalDailyArray, externalTotals, externalLoading, externalError };
}