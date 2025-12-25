import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const [totalUsers, totalAudits, premiumAudits] = await Promise.all([
      prisma.user.count(),
      prisma.audit.count(),
      prisma.audit.count({
        where: {
          type: {
            in: ['PREMIUM', 'ELITE']
          }
        }
      })
    ])

    return NextResponse.json({
      totalUsers,
      totalAudits,
      premiumAudits
    })
  } catch (error) {
    console.error('Admin stats error:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}
