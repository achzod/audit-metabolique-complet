import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const { secret } = await request.json()

    if (secret !== process.env.NEXTAUTH_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const results = []

    // Test connection first
    try {
      await prisma.$queryRaw`SELECT 1`
      results.push('Connection OK')
    } catch (e: any) {
      return NextResponse.json({
        success: false,
        error: 'Cannot connect to database: ' + e.message
      }, { status: 500 })
    }

    // Execute raw SQL migrations one by one
    try {
      await prisma.$executeRawUnsafe(`
        CREATE TABLE IF NOT EXISTS "magic_tokens" (
          "id" TEXT NOT NULL,
          "token" TEXT NOT NULL,
          "userId" TEXT NOT NULL,
          "expiresAt" TIMESTAMP(3) NOT NULL,
          "usedAt" TIMESTAMP(3),
          "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          CONSTRAINT "magic_tokens_pkey" PRIMARY KEY ("id"),
          CONSTRAINT "magic_tokens_token_key" UNIQUE ("token"),
          CONSTRAINT "magic_tokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE
        );
      `)
      results.push('Created magic_tokens table')
    } catch (e: any) {
      results.push('magic_tokens table: ' + e.message)
    }

    try {
      await prisma.$executeRawUnsafe(`
        CREATE INDEX IF NOT EXISTS "magic_tokens_token_idx" ON "magic_tokens"("token");
      `)
      results.push('Created index magic_tokens_token_idx')
    } catch (e: any) {
      results.push('Index token: ' + e.message)
    }

    try {
      await prisma.$executeRawUnsafe(`
        CREATE INDEX IF NOT EXISTS "magic_tokens_expiresAt_idx" ON "magic_tokens"("expiresAt");
      `)
      results.push('Created index magic_tokens_expiresAt_idx')
    } catch (e: any) {
      results.push('Index expiresAt: ' + e.message)
    }

    try {
      await prisma.$executeRawUnsafe(`
        ALTER TABLE "users" ALTER COLUMN "password" DROP NOT NULL;
      `)
      results.push('Altered users.password to nullable')
    } catch (e: any) {
      results.push('Users password: ' + e.message)
    }

    try {
      await prisma.$executeRawUnsafe(`
        ALTER TABLE "audits" ADD COLUMN IF NOT EXISTS "photoFace" TEXT;
      `)
      results.push('Added audits.photoFace column')
    } catch (e: any) {
      results.push('photoFace: ' + e.message)
    }

    try {
      await prisma.$executeRawUnsafe(`
        ALTER TABLE "audits" ADD COLUMN IF NOT EXISTS "photoBack" TEXT;
      `)
      results.push('Added audits.photoBack column')
    } catch (e: any) {
      results.push('photoBack: ' + e.message)
    }

    try {
      await prisma.$executeRawUnsafe(`
        ALTER TABLE "audits" ADD COLUMN IF NOT EXISTS "photoSide" TEXT;
      `)
      results.push('Added audits.photoSide column')
    } catch (e: any) {
      results.push('photoSide: ' + e.message)
    }

    return NextResponse.json({
      success: true,
      message: 'Database migration completed',
      details: results
    })
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 })
  }
}
