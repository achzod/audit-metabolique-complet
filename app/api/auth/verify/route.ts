import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'

// Get the base URL for redirects - NEVER use request.url on Render (it's localhost:10000 internally)
function getBaseUrl(): string {
  return process.env.NEXTAUTH_URL || process.env.NEXT_PUBLIC_APP_URL || 'https://audit-metabolique-v2.onrender.com'
}

export async function GET(request: Request) {
  const baseUrl = getBaseUrl()

  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get('token')

    if (!token) {
      return NextResponse.redirect(`${baseUrl}/auth/error?error=invalid_link`)
    }

    // Find and validate magic token
    const magicToken = await prisma.magicToken.findFirst({
      where: {
        token,
        expiresAt: {
          gt: new Date(),
        },
        usedAt: null, // Not already used
      },
      include: {
        user: true,
      },
    })

    if (!magicToken) {
      return NextResponse.redirect(`${baseUrl}/auth/error?error=expired_link`)
    }

    // Mark token as used
    await prisma.magicToken.update({
      where: { id: magicToken.id },
      data: { usedAt: new Date() },
    })

    const user = magicToken.user

    // Create session cookie
    const cookieStore = await cookies()
    cookieStore.set('user_id', user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
    })

    cookieStore.set('user_email', user.email, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
    })

    // Redirect to dashboard using explicit base URL
    console.log(`[Verify] Redirecting user ${user.email} to ${baseUrl}/dashboard`)
    return NextResponse.redirect(`${baseUrl}/dashboard`)
  } catch (error) {
    console.error('Verify token error:', error)
    return NextResponse.redirect(`${baseUrl}/auth/error?error=server_error`)
  }
}
