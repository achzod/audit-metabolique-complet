-- CreateTable
CREATE TABLE IF NOT EXISTS "magic_tokens" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "token" TEXT NOT NULL UNIQUE,
    "userId" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "usedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX IF NOT EXISTS "magic_tokens_token_idx" ON "magic_tokens"("token");
CREATE INDEX IF NOT EXISTS "magic_tokens_expiresAt_idx" ON "magic_tokens"("expiresAt");

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "password" DROP NOT NULL;

-- AlterTable  
ALTER TABLE "audits" ADD COLUMN IF NOT EXISTS "photoFace" TEXT;
ALTER TABLE "audits" ADD COLUMN IF NOT EXISTS "photoBack" TEXT;
ALTER TABLE "audits" ADD COLUMN IF NOT EXISTS "photoSide" TEXT;
