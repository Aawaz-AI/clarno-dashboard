export interface User {
  id: number;
  name: string;
  email: string;
  status: 'active' | 'inactive';
  lastActive: string;
  registeredDate: string;
  region: string;
}

export interface UserProfile {
  user_id: string;
  name: string;
  email: string;
  last_login: string | null;
  region: string;
  creation_time: string;
}

export interface ChartData {
  date: string;
  activeUsers: number;
}

export interface UserStats {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  nonActiveUsers: number;
  averageDailyActive: number;
  activeRate: string;
}

export interface FilterState {
  selectedUser: string;
  dateRange: [string, string] | null;
}

// Analytics API Types

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// External APIs analytics types
export interface ExternalApiDailyDatum {
  reddit_total: number;
  tavily_total: number;
  gemini_total: number;
  daily_total: number;
  message?: string;
}

export interface ExternalApisData {
  start_date: string;
  end_date: string;
  date_range_days: number;
  daily_data: Record<string, ExternalApiDailyDatum>;
  total_reddit_calls: number;
  total_tavily_calls: number;
  total_gemini_calls: number;
  total_all_calls: number;
  peak_day: string | null;
  peak_day_calls: number;
  tavily_api_usage?: {
    status: string;
    data?: {
      total_credits: number;
      used_credits: number;
    };
    timestamp?: string;
  };
}

export interface ExternalApisResponse {
  success: boolean;
  message: string;
  data: ExternalApisData;
}

export interface DateRange {
  start_date: string;
  end_date: string;
  total_days: number;
}

export interface PeakLowestDay {
  date: string;
  count: number;
}

export interface Analytics {
  total_unique_active_days: number;
  average_daily_active_users: number;
  peak_day: PeakLowestDay;
  lowest_day: PeakLowestDay;
}

export interface DailyData {
  date: string;
  active_users_count: number;
}

export interface ActiveUsersData {
  date_range: DateRange;
  analytics: Analytics;
  daily_data: DailyData[];
}

export interface OverallAnalyticsData {
  active_users: ActiveUsersData;
  stage_analytics?: UserStageAnalytics;
}

export interface AnalyticsParams {
  start_date: string;
  end_date: string;
}

export interface ChartData {
  date: string;
  activeUsers: number;
}

export interface Stats {
  totalUsers: number;
  activeUsers: number;
  nonActiveUsers: number;
  // peakDay: {
  //   date: string;
  //   count: number;
  // };
  averageDailyActive: number;
}

// User stage analytics types
export interface StageDetail {
  total_turns: number;
  users_count: number;
  avg_turns_per_user: number;
  user_participation_rate: number;
  stage_turn_percentage: number;
  total_input_tokens?: number;
  total_output_tokens?: number;
  total_internal_cost?: number;
  total_charged_credits?: number;
}

export interface UserOverallMetrics {
  total_turns: number;
  internal_cost: number;
  user_cost: number;
  charged_credits?: number;
  total_input_tokens: number;
  total_output_tokens: number;
  total_tokens: number;
}

export interface UserStageMetrics {
  turns: number;
  internal_cost: number;
  user_cost: number;
  charged_credits?: number;
  input_tokens: number;
  output_tokens: number;
  total_tokens: number;
}

export interface UserData {
  overall: UserOverallMetrics;
  stages: Record<string, UserStageMetrics>;
}

export interface UserStageAnalytics {
  date_range: DateRange;
  overall_analytics: {
    total_users_analyzed: number;
    total_turns: number;
    average_turns_per_user: number;
    total_input_tokens: number;
    total_output_tokens: number;
    total_tokens: number;
    average_tokens_per_user: number;
    total_internal_cost: number;
    total_user_cost: number;
    total_charged_credits?: number;
    average_internal_cost_per_user: number;
    average_user_cost_per_user: number;
    average_charged_credits_per_user?: number;
    most_active_stage: { stage: string; turns: number };
    least_active_stage: { stage: string; turns: number };
  };
  stage_analytics: Record<string, StageDetail>;
  user_data: Record<string, UserData>;
}

export interface UserStageAnalyticsResponse {
  success: boolean;
  message: string;
  data: {
    stage_analytics: UserStageAnalytics;
    user_profiles: UserProfile[];
  };
}