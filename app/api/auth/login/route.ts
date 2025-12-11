import { NextResponse } from 'next/server';

const API_BASE_URL = process.env.API_URL;

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }

    if (!API_BASE_URL) {
      return NextResponse.json(
        { error: 'API configuration error' },
        { status: 500 }
      );
    }

    const apiUrl = new URL(API_BASE_URL);
    apiUrl.pathname = '/auth/admin_login';

    const response = await fetch(apiUrl.toString(), {
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
      return NextResponse.json(
        { error: data.message || 'Invalid username or password' },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
