import { NextRequest, NextResponse } from 'next/server';

// High-performance in-memory sliding-window token bucket for DDoS & abuse mitigation
const rateLimitMap = new Map<string, { tokens: number; lastRefill: number }>();
const MAX_TOKENS = 60; // 60 requests per minute burst capacity per IP
const REFILL_RATE_MS = 1000; // 1 token every second
const CLEANUP_INTERVAL_MS = 60000; // Clean stale entries every minute

let lastCleanup = Date.now();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();

  // Periodic cleanup of stale IP entries to prevent memory leak under prolonged high traffic
  if (now - lastCleanup > CLEANUP_INTERVAL_MS) {
    for (const [key, value] of rateLimitMap.entries()) {
      if (now - value.lastRefill > 120000) {
        rateLimitMap.delete(key);
      }
    }
    lastCleanup = now;
  }

  const bucket = rateLimitMap.get(ip) || { tokens: MAX_TOKENS, lastRefill: now };
  const elapsedTime = now - bucket.lastRefill;
  const newTokens = Math.floor(elapsedTime / REFILL_RATE_MS);

  if (newTokens > 0) {
    bucket.tokens = Math.min(MAX_TOKENS, bucket.tokens + newTokens);
    bucket.lastRefill = now;
  }

  if (bucket.tokens > 0) {
    bucket.tokens -= 1;
    rateLimitMap.set(ip, bucket);
    return true;
  }

  rateLimitMap.set(ip, bucket);
  return false;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown-client';

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        {
          error: 'Rate limit exceeded. Please wait a moment before sending another inquiry.',
          code: 'RATE_LIMITED',
        },
        {
          status: 429,
          headers: {
            'Retry-After': '10',
            'X-RateLimit-Limit': String(MAX_TOKENS),
            'X-RateLimit-Remaining': '0',
          },
        }
      );
    }

    let body: any;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: 'Invalid JSON payload format.', code: 'INVALID_REQUEST' },
        { status: 400 }
      );
    }

    const { name, email, message, domain, budget, phone } = body || {};

    // Validate email format if provided
    if (email && typeof email === 'string') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return NextResponse.json(
          { error: 'Please enter a valid work email address.', code: 'INVALID_EMAIL' },
          { status: 422 }
        );
      }
    }

    // Sanitize string lengths to prevent payload inflation attacks
    const sanitizedName = String(name || '').slice(0, 100).trim();
    const sanitizedEmail = String(email || '').slice(0, 120).trim();
    const sanitizedPhone = String(phone || '').slice(0, 40).trim();
    const sanitizedDomain = String(domain || '').slice(0, 80).trim();
    const sanitizedBudget = String(budget || '').slice(0, 80).trim();
    const sanitizedMessage = String(message || '').slice(0, 4000).trim();

    return NextResponse.json(
      {
        success: true,
        message: 'Inquiry successfully processed by Opus Geeks architecture desk.',
        receivedAt: new Date().toISOString(),
        lead: {
          name: sanitizedName,
          email: sanitizedEmail,
          phone: sanitizedPhone,
          domain: sanitizedDomain,
          budget: sanitizedBudget,
          hasMessage: Boolean(sanitizedMessage),
        },
      },
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'X-Content-Type-Options': 'nosniff',
        },
      }
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: 'An unexpected processing error occurred.', details: err?.message || 'Internal' },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    },
  });
}
