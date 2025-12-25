import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ auditId: string }> }
) {
  try {
    const { auditId } = await params
    const cookieStore = await cookies()
    const userId = cookieStore.get('user_id')?.value

    if (!userId) {
      return NextResponse.json(
        { error: 'Non authentifié' },
        { status: 401 }
      )
    }

    // Get audit with user verification
    const audit = await prisma.audit.findUnique({
      where: {
        id: auditId,
        userId: userId,
      },
    })

    if (!audit) {
      return NextResponse.json(
        { error: 'Audit non trouvé' },
        { status: 404 }
      )
    }

    // Return audit data
    return NextResponse.json({
      id: audit.id,
      type: audit.type,
      status: audit.status,
      scores: audit.scores,
      aiAnalysis: audit.aiAnalysis,
      htmlFree: audit.htmlFree,
      htmlPremium: audit.htmlPremium,
      createdAt: audit.createdAt,
      completedAt: audit.completedAt,
    })
  } catch (error) {
    console.error('Get audit error:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}
