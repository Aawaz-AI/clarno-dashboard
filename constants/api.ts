// Allow overriding the API base URL via env.
// Client code should use `NEXT_PUBLIC_API_URL`, server code can provide `API_URL`.
// Prefer the public var for client bundles, fall back to server-only `API_URL` when available.
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || '';

console.log('🔧 API_BASE_URL is set to:', API_BASE_URL) ;

export const API_ENDPOINTS = {
  OVERALL_ANALYTICS: '/analytics/overall_analytics',
  EXTERNAL_APIS_ANALYTICS: '/analytics/external_apis_analytics',
} as const;

export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};