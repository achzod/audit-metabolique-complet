import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { generateAuditWithClaude } from '@/lib/claude'

export async function POST(request: Request) {
  try {
    const { auditId } = await request.json()

    // Get audit
    const audit = await prisma.audit.findUnique({
      where: { id: auditId },
    })

    if (!audit) {
      return NextResponse.json(
        { error: 'Audit introuvable' },
        { status: 404 }
      )
    }

    // Update status to PROCESSING
    await prisma.audit.update({
      where: { id: auditId },
      data: { status: 'PROCESSING' },
    })

    // Generate audit with Claude (async in background)
    const htmlContent = await generateAuditWithClaude(
      audit.responses,
      audit.type as 'GRATUIT' | 'PREMIUM'
    )

    // Update audit with generated content
    await prisma.audit.update({
      where: { id: auditId },
      data: {
        htmlContent,
        status: 'COMPLETED',
        completedAt: new Date(),
      },
    })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('Audit analysis error:', error)

    // Update audit status to ERROR
    const { auditId } = await request.json()
    await prisma.audit.update({
      where: { id: auditId },
      data: { status: 'FAILED' },
    })

    return NextResponse.json(
      { error: 'Erreur lors de l\'analyse de l\'audit' },
      { status: 500 }
    )
  }
}
