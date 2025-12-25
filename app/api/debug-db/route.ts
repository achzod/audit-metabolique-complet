import { NextResponse } from 'next/server'

export async function GET() {
  const dbUrl = process.env.DATABASE_URL || 'NOT SET'

  // Parse and sanitize URL to hide password
  let sanitized = dbUrl
  try {
    const url = new URL(dbUrl.replace('postgresql://', 'http://'))
    sanitized = `postgresql://${url.username}:***@${url.host}${url.pathname}`
  } catch (e) {
    // If parsing fails, just mask any password-like patterns
    sanitized = dbUrl.replace(/:[^:@]+@/, ':***@')
  }

  return NextResponse.json({
    databaseUrl: sanitized,
    nodeEnv: process.env.NODE_ENV,
    hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET
  })
}
