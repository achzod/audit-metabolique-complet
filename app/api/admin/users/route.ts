import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        _count: {
          select: { audits: true }
        }
      }
    })

    return NextResponse.json(users)
  } catch (error) {
    console.error('Admin users error:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}
