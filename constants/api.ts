export const API_BASE_URL = 'https://dev-backend.clarno.ai';

export const API_ENDPOINTS = {
  OVERALL_ANALYTICS: '/analytics/overall_analytics',
} as const;

export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};