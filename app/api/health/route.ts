import { NextResponse } from 'next/server';

// Standard high-performance health & telemetry ping
export async function GET() {
  return NextResponse.json(
    {
      status: 'operational',
      service: 'opusgeeks-web',
      region: process.env.VERCEL_REGION || 'edge',
      timestamp: Date.now(),
      engine: 'Next.js 16 Edge Runtime',
    },
    {
      status: 200,
      headers: {
        'Cache-Control': 'public, max-age=5, s-maxage=30, stale-while-revalidate=120',
        'Content-Type': 'application/json; charset=utf-8',
        'X-Content-Type-Options': 'nosniff',
      },
    }
  );
}

export async function HEAD() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Cache-Control': 'public, max-age=5, s-maxage=30, stale-while-revalidate=120',
    },
  });
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
      'Access-Control-Max-Age': '86400',
    },
  });
}
