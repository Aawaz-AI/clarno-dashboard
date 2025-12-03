// Allow overriding the API base URL via env (useful for local testing)
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://backend.clarno.ai';

export const API_ENDPOINTS = {
  OVERALL_ANALYTICS: '/analytics/overall_analytics',
  EXTERNAL_APIS_ANALYTICS: '/analytics/external_apis_analytics',
} as const;

export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};