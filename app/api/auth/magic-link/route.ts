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

    // Find or create user
    let user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          name: email.split('@')[0],
          plan: plan || 'GRATUIT',
        },
      })
    }

    // Store token in verification table
    await prisma.verificationToken.create({
      data: {
        identifier: email,
        token,
        expires: expiresAt,
      },
    })

    // Save questionnaire responses if provided
    if (responses) {
      await prisma.questionnaireResponse.upsert({
        where: { userId: user.id },
        create: {
          userId: user.id,
          responses: responses,
        },
        update: {
          responses: responses,
        },
      })
    }

    // Generate magic link URL
    const magicLink = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/verify?token=${token}&email=${encodeURIComponent(email)}`

    // Send email (for now, just log it - replace with actual email service)
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
      // Remove in production:
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
