#!/bin/bash
set -e

echo "📦 Installing dependencies..."
npm ci --omit=dev

echo "🗄️ Generating Prisma client..."
npx prisma generate

echo "🗄️ Pushing database schema..."
npx prisma db push --accept-data-loss

echo "🏗️ Building Next.js..."
npm run build

echo "✅ Build complete!"
