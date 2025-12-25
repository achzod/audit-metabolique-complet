import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get('token')
    const email = searchParams.get('email')

    if (!token || !email) {
      return NextResponse.redirect(new URL('/auth/error?error=invalid_link', request.url))
    }

    // Find and validate token
    const verificationToken = await prisma.verificationToken.findFirst({
      where: {
        token,
        identifier: email,
        expires: {
          gt: new Date(),
        },
      },
    })

    if (!verificationToken) {
      return NextResponse.redirect(new URL('/auth/error?error=expired_link', request.url))
    }

    // Delete used token
    await prisma.verificationToken.delete({
      where: {
        identifier_token: {
          identifier: email,
          token,
        },
      },
    })

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return NextResponse.redirect(new URL('/auth/error?error=user_not_found', request.url))
    }

    // Create session cookie (simple approach)
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
