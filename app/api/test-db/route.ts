import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Simple query to test connection
    const result = await prisma.$queryRaw`SELECT 1 as test`

    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
      result
    })
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
      code: error.code
    }, { status: 500 })
  }
}
