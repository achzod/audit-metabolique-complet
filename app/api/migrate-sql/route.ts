import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const { secret } = await request.json()

    if (secret !== process.env.NEXTAUTH_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Execute raw SQL migrations
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

    await prisma.$executeRawUnsafe(`
      CREATE INDEX IF NOT EXISTS "magic_tokens_token_idx" ON "magic_tokens"("token");
    `)

    await prisma.$executeRawUnsafe(`
      CREATE INDEX IF NOT EXISTS "magic_tokens_expiresAt_idx" ON "magic_tokens"("expiresAt");
    `)

    await prisma.$executeRawUnsafe(`
      ALTER TABLE "users" ALTER COLUMN "password" DROP NOT NULL;
    `)

    await prisma.$executeRawUnsafe(`
      ALTER TABLE "audits" ADD COLUMN IF NOT EXISTS "photoFace" TEXT;
    `)

    await prisma.$executeRawUnsafe(`
      ALTER TABLE "audits" ADD COLUMN IF NOT EXISTS "photoBack" TEXT;
    `)

    await prisma.$executeRawUnsafe(`
      ALTER TABLE "audits" ADD COLUMN IF NOT EXISTS "photoSide" TEXT;
    `)

    return NextResponse.json({
      success: true,
      message: 'Database migrated successfully'
    })
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 })
  }
}
