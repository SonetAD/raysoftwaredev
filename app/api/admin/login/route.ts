import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { config } from 'dotenv';
import path from 'path';

// Load .env.local explicitly
config({ path: path.resolve(process.cwd(), '.env.local') });

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password } = body;

    const adminPassword = process.env.ADMIN?.trim();

    console.log(
      'All env keys:',
      Object.keys(process.env).filter((k) => k.includes('ADMIN'))
    );

    if (!adminPassword) {
      console.error('ADMIN env variable is not set');
      return NextResponse.json(
        { error: 'Admin password not configured' },
        { status: 500 }
      );
    }

    if (password.trim() !== adminPassword) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

    // Create a simple session token
    const sessionToken = Buffer.from(`admin:${Date.now()}`).toString('base64');

    const response = NextResponse.json(
      { success: true, message: 'Login successful' },
      { status: 200 }
    );

    // Set cookie
    response.cookies.set('admin_session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}

export async function DELETE() {
  const response = NextResponse.json(
    { success: true, message: 'Logged out successfully' },
    { status: 200 }
  );

  response.cookies.set('admin_session', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 0,
    path: '/',
  });

  return response;
}
