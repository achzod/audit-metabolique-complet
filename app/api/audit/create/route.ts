import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const { userId, type, responses, version = 'GRATUIT' } = await request.json()

    // Create audit
    const audit = await prisma.audit.create({
      data: {
        userId,
        type,
        version,
        responses,
        status: 'PENDING',
      },
    })

    return NextResponse.json({ auditId: audit.id }, { status: 201 })
  } catch (error) {
    console.error('Audit creation error:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la création de l\'audit' },
      { status: 500 }
    )
  }
}
