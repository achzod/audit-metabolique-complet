import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import crypto from 'crypto'

export async function POST(request: Request) {
  try {
    const { email, plan, responses } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email requis' },
        { status: 400 }
      )
    }

    // Generate magic link token
    const token = crypto.randomBytes(32).toString('hex')
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours

    // Find or create user (without plan field - it's stored in Audit)
    let user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          name: email.split('@')[0],
        },
      })
    }

    // Create magic token
    await prisma.magicToken.create({
      data: {
        token,
        userId: user.id,
        expiresAt,
      },
    })

    // If responses provided, create an audit with the responses
    if (responses) {
      await prisma.audit.create({
        data: {
          userId: user.id,
          type: plan || 'GRATUIT',
          status: 'PENDING',
          responses: responses,
        },
      })
    }

    // Generate magic link URL
    const magicLink = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/verify?token=${token}`

    // Log the magic link (in production, send via email)
    console.log('Magic Link for', email, ':', magicLink)

    // TODO: Send email with SendGrid/Resend/etc
    // await sendEmail({
    //   to: email,
    //   subject: 'Ton Audit Métabolique est prêt',
    //   html: `<a href="${magicLink}">Clique ici pour accéder à ton audit</a>`
    // })

    return NextResponse.json({
      success: true,
      message: 'Magic link envoyé',
      // Remove in production - only for debugging:
      debugLink: process.env.NODE_ENV === 'development' ? magicLink : undefined
    })
  } catch (error) {
    console.error('Magic link error:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la création du magic link' },
      { status: 500 }
    )
  }
}
