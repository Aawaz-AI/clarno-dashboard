export interface AnalyticsParams {
  start_date: string;
  end_date: string;
}

import type { UserStageAnalytics, UserStageAnalyticsResponse } from '@/types';
import { API_BASE_URL, API_ENDPOINTS, DEFAULT_HEADERS } from '@/constants/api';
import type { ExternalApisResponse } from '@/types';

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
  const url = new URL('/api/analytics/overall_analytics', window.location.origin);
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

export async function fetchUserAnalytics(params: UserAnalyticsParams): Promise<UserStageAnalyticsResponse> {
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

export async function fetchExternalApisAnalytics(params: AnalyticsParams): Promise<ExternalApisResponse> {
  // Use Next.js proxy route instead of direct backend call (server-side call bypasses CORS)
  const url = new URL('/api/analytics/external_apis_analytics', window.location.origin);
  url.searchParams.append('start_date', params.start_date);
  url.searchParams.append('end_date', params.end_date);

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`External APIs analytics error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export interface AdminLoginResponse {
  success: boolean;
  message: string;
  data?: {
    token: string;
    user?: {
      id?: string;
      username?: string;
      email?: string;
    };
  };
  error?: string;
}

export async function adminLogin(username: string, password: string): Promise<AdminLoginResponse> {
  const url = new URL('/api/auth/login', window.location.origin);

  const response = await fetch(url.toString(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || data.message || 'Login failed');
  }

  return data;
}