import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const useInternal = searchParams.get('internal') === 'true'

  // Original external URL
  const externalUrl = process.env.DATABASE_URL || ''

  // Try internal hostname pattern (remove .frankfurt-postgres.render.com suffix)
  const internalUrl = externalUrl.replace('.frankfurt-postgres.render.com', '')

  const testUrl = useInternal ? internalUrl : externalUrl

  const prismaTest = new PrismaClient({
    datasources: {
      db: { url: testUrl }
    }
  })

  try {
    // Test connection
    await prismaTest.$queryRaw`SELECT 1 as test`
    await prismaTest.$disconnect()

    return NextResponse.json({
      success: true,
      message: `Connection successful with ${useInternal ? 'INTERNAL' : 'EXTERNAL'} URL`,
      urlPattern: testUrl.replace(/:[^:@]+@/, ':***@')
    })
  } catch (error: any) {
    await prismaTest.$disconnect()

    return NextResponse.json({
      success: false,
      error: error.message,
      urlPattern: testUrl.replace(/:[^:@]+@/, ':***@'),
      type: useInternal ? 'INTERNAL' : 'EXTERNAL'
    }, { status: 500 })
  }
}
