export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || '';

export const API_ENDPOINTS = {
  OVERALL_ANALYTICS: '/analytics/overall_analytics',
  EXTERNAL_APIS_ANALYTICS: '/analytics/external_apis_analytics',
  ADMIN_LOGIN: '/auth/admin_login',
} as const;

export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};