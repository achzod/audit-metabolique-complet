import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, currentSection, totalSections, responses } = body

    if (!email) {
      return NextResponse.json(
        { error: 'Email requis' },
        { status: 400 }
      )
    }

    const emailLower = email.toLowerCase().trim()
    const percentComplete = Math.round((currentSection / totalSections) * 100)

    // Upsert - create or update progress
    const progress = await prisma.questionnaireProgress.upsert({
      where: { email: emailLower },
      create: {
        email: emailLower,
        currentSection: currentSection || 1,
        totalSections: totalSections || 13,
        percentComplete,
        responses: responses || {},
        status: 'IN_PROGRESS',
      },
      update: {
        currentSection: currentSection || 1,
        percentComplete,
        responses: responses || {},
        status: percentComplete >= 100 ? 'COMPLETED' : 'IN_PROGRESS',
        lastActivityAt: new Date(),
        completedAt: percentComplete >= 100 ? new Date() : undefined,
      },
    })

    console.log(`[SaveProgress] ${emailLower} - Section ${currentSection}/${totalSections} (${percentComplete}%)`)

    return NextResponse.json({
      success: true,
      progress: {
        id: progress.id,
        percentComplete: progress.percentComplete,
        status: progress.status,
      },
    })
  } catch (error) {
    console.error('[SaveProgress] Error:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la sauvegarde' },
      { status: 500 }
    )
  }
}

// Get progress for an email
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')

    if (!email) {
      return NextResponse.json(
        { error: 'Email requis' },
        { status: 400 }
      )
    }

    const progress = await prisma.questionnaireProgress.findUnique({
      where: { email: email.toLowerCase().trim() },
    })

    if (!progress) {
      return NextResponse.json({ exists: false })
    }

    return NextResponse.json({
      exists: true,
      progress: {
        currentSection: progress.currentSection,
        totalSections: progress.totalSections,
        percentComplete: progress.percentComplete,
        responses: progress.responses,
        status: progress.status,
      },
    })
  } catch (error) {
    console.error('[GetProgress] Error:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la recuperation' },
      { status: 500 }
    )
  }
}
