#!/bin/bash
set -e

echo "📦 Installing dependencies..."
npm ci --omit=dev

echo "🗄️ Generating Prisma client..."
npx prisma generate

echo "🏗️ Building Next.js..."
npm run build

echo "✅ Build complete!"
