import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const audits = await prisma.audit.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            email: true,
            name: true
          }
        }
      }
    })

    return NextResponse.json(audits)
  } catch (error) {
    console.error('Admin audits error:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}
