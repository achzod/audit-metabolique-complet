import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get('token')

    if (!token) {
      return NextResponse.redirect(new URL('/auth/error?error=invalid_link', request.url))
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
      return NextResponse.redirect(new URL('/auth/error?error=expired_link', request.url))
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

    // Redirect to dashboard
    return NextResponse.redirect(new URL('/dashboard', request.url))
  } catch (error) {
    console.error('Verify token error:', error)
    return NextResponse.redirect(new URL('/auth/error?error=server_error', request.url))
  }
}
