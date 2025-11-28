export interface AnalyticsParams {
  start_date: string;
  end_date: string;
}

import type { UserStageAnalytics } from '@/types';

export interface AnalyticsResponse {
  success: boolean;
  message: string;
  data: {
    active_users: {
      date_range: {
        start_date: string;
        end_date: string;
        total_days: number;
      };
      analytics: {
        total_active_users_in_period: number;
        total_users_in_system: number;
        average_daily_active_users: number;
        non_active_users: number;
        peak_day: {
          date: string;
          count: number;
        };
        lowest_day: {
          date: string;
          count: number;
        };
      };
      daily_data: Array<{
        date: string;
        active_users_count: number;
      }>;
    };
    // The backend may include stage-level analytics in the same response under `stage_analytics`.
    // Make this optional to match different API routes/versions.
    stage_analytics?: UserStageAnalytics;
  };
}

export async function fetchOverallAnalytics(params: AnalyticsParams): Promise<AnalyticsResponse> {
  // Use Next.js API route instead of direct backend call
  const url = new URL('/api/analytics', window.location.origin);
  url.searchParams.append('start_date', params.start_date);
  url.searchParams.append('end_date', params.end_date);

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export interface UserAnalyticsParams {
  start_date: string;
  end_date: string;
}

export interface UserAnalyticsResponse {
  success: boolean;
  message: string;
  data: {
    stage_analytics: {
      date_range: {
        start_date: string;
        end_date: string;
        total_days: number;
      };
      overall_analytics: {
        total_users_analyzed: number;
        total_turns: number;
        average_turns_per_user: number;
        most_active_stage: { stage: string; turns: number };
        least_active_stage: { stage: string; turns: number };
      };
      stage_analytics: Record<string, {
        total_turns: number;
        users_count: number;
        avg_turns_per_user: number;
        user_participation_rate: number;
        stage_turn_percentage: number;
      }>;
      user_data: Record<string, Record<string, number>>;
    };
  };
}

export async function fetchUserAnalytics(params: UserAnalyticsParams): Promise<UserAnalyticsResponse> {
  const url = new URL('/api/analytics/user_analytics', window.location.origin);
  url.searchParams.append('start_date', params.start_date);
  url.searchParams.append('end_date', params.end_date);

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}