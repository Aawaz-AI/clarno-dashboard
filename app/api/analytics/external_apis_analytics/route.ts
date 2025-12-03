import { API_BASE_URL } from '@/constants/api';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const start_date = searchParams.get('start_date');
    const end_date = searchParams.get('end_date');

    if (!start_date || !end_date) {
      return Response.json(
        { error: 'Missing required query parameters: start_date, end_date' },
        { status: 400 }
      );
    }

    if (!API_BASE_URL) {
      console.error('❌ Missing API_BASE_URL environment variable (set NEXT_PUBLIC_API_URL or API_URL)');
      return Response.json({ error: 'Server misconfiguration: API base URL not set' }, { status: 500 });
    }

    // Ensure we don't accidentally include duplicate slashes
    const base = API_BASE_URL.endsWith('/') ? API_BASE_URL.slice(0, -1) : API_BASE_URL;
    const backendUrl = new URL(`${base}/analytics/external_apis_analytics`);
    backendUrl.searchParams.append('start_date', start_date);
    backendUrl.searchParams.append('end_date', end_date);

    console.log('🔗 Proxying external APIs analytics request to:', backendUrl.toString());

    const response = await fetch(backendUrl.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error(`❌ Backend error: ${response.status} ${response.statusText}`);
      return Response.json(
        { error: `Backend error: ${response.status} ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log('✅ External APIs analytics data received');

    return Response.json(data);
  } catch (error) {
    console.error('❌ Proxy error:', error);
    return Response.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
