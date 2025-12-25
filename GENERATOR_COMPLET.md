# ACHZOD AUDIT PLATFORM - GENERATOR COMPLET

Ce fichier contient TOUS les fichiers nécessaires pour créer la plateforme complète.

## STRUCTURE DU PROJET

```
achzod-audit-platform/
├── prisma/
│   └── schema.prisma
├── public/
│   └── fonts/
├── src/
│   ├── app/
│   │   ├── audit-hormonal/
│   │   │   ├── page.tsx
│   │   │   └── questionnaire/
│   │   │       └── page.tsx
│   │   ├── audit-metabolique/
│   │   │   ├── page.tsx
│   │   │   └── questionnaire/
│   │   │       └── page.tsx
│   │   ├── checkout/
│   │   │   └── page.tsx
│   │   ├── dashboard/
│   │   │   ├── page.tsx
│   │   │   └── [auditId]/
│   │   │       └── page.tsx
│   │   ├── api/
│   │   │   ├── audit/
│   │   │   │   ├── create/route.ts
│   │   │   │   └── analyze/route.ts
│   │   │   ├── payment/
│   │   │   │   └── stripe/route.ts
│   │   │   └── auth/
│   │   │       └── [...nextauth]/route.ts
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── RadarChart.tsx
│   │   ├── Scanlines.tsx
│   │   └── ui/
│   ├── lib/
│   │   ├── prisma.ts
│   │   ├── stripe.ts
│   │   ├── anthropic.ts
│   │   └── prompts/
│   │       ├── hormonal-gratuit.ts
│   │       ├── hormonal-premium.ts
│   │       ├── metabolique-gratuit.ts
│   │       └── metabolique-premium.ts
│   └── types/
│       └── index.ts
├── .env.local
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 1. CONFIGURATION DE BASE

### package.json
```json
{
  "name": "achzod-audit-platform",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "db:push": "prisma db push",
    "db:generate": "prisma generate"
  },
  "dependencies": {
    "@anthropic-ai/sdk": "^0.34.2",
    "@prisma/client": "^5.20.0",
    "@radix-ui/react-accordion": "^1.2.0",
    "@radix-ui/react-tabs": "^1.1.0",
    "bcrypt": "^5.1.1",
    "framer-motion": "^11.5.4",
    "lucide-react": "^0.445.0",
    "next": "^15.0.0",
    "next-auth": "^5.0.0-beta.22",
    "nodemailer": "^6.9.15",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "stripe": "^17.0.0",
    "zod": "^3.23.8"
  },
  "devDependencies": {
    "@types/bcrypt": "^5.0.2",
    "@types/node": "^22.0.0",
    "@types/nodemailer": "^6.4.16",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.47",
    "prisma": "^5.20.0",
    "tailwindcss": "^3.4.13",
    "typescript": "^5.6.0"
  }
}
```

### tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### next.config.js
```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb'
    }
  }
}

module.exports = nextConfig
```

### tailwind.config.ts
```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-black': '#101010',
        'bg-card': 'rgba(10, 10, 16, 0.6)',
        'accent-cyan': '#00F5D4',
        'accent-purple': '#A78BFA',
      },
      fontFamily: {
        audiowide: ['Audiowide', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      },
      animation: {
        'scanlines': 'scanlines 8s linear infinite',
        'neon-pulse': 'neon-pulse 2s ease-in-out infinite',
        'glitch': 'glitch 5s infinite',
      },
      keyframes: {
        scanlines: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '0 100%' },
        },
        'neon-pulse': {
          '0%, 100%': {
            boxShadow: '0 0 10px rgba(0,245,212,0.5), 0 0 20px rgba(0,245,212,0.3)',
          },
          '50%': {
            boxShadow: '0 0 20px rgba(0,245,212,0.8), 0 0 40px rgba(0,245,212,0.5)',
          },
        },
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
```

### .env.local (TEMPLATE)
```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/achzod_audits?schema=public"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-super-secret-key-min-32-chars"

# Anthropic Claude
ANTHROPIC_API_KEY="sk-ant-api03-..."

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
STRIPE_PRICE_ID_METABOLIQUE="price_xxx"
STRIPE_PRICE_ID_HORMONAL="price_xxx"

# Email (Gmail)
EMAIL_USER="your-email@gmail.com"
EMAIL_PASSWORD="your-app-password"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

---

## 2. PRISMA SCHEMA

### prisma/schema.prisma
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum AuditType {
  METABOLIQUE
  HORMONAL
}

enum AuditStatus {
  PENDING
  PROCESSING
  COMPLETED
  FAILED
}

enum PaymentStatus {
  PENDING
  COMPLETED
  FAILED
  REFUNDED
}

model User {
  id            String    @id @default(cuid())
  email         String    @unique
  password      String?
  name          String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  audits        Audit[]
  payments      Payment[]

  @@map("users")
}

model Audit {
  id            String       @id @default(cuid())
  userId        String
  type          AuditType    // METABOLIQUE ou HORMONAL
  version       String       // "GRATUIT" ou "PREMIUM"
  status        AuditStatus  @default(PENDING)
  responses     Json         // Réponses questionnaire
  analysis      Json?        // Résultat Claude
  htmlContent   String?      @db.Text
  completedAt   DateTime?
  createdAt     DateTime     @default(now())
  updatedAt     DateTime     @updatedAt

  user          User         @relation(fields: [userId], references: [id], onDelete: Cascade)
  payment       Payment?

  @@index([userId])
  @@index([type])
  @@index([status])
  @@map("audits")
}

model Payment {
  id                String        @id @default(cuid())
  userId            String
  auditId           String        @unique
  amount            Int           // En centimes
  provider          String        // "STRIPE"
  productType       AuditType     // Type de produit acheté
  status            PaymentStatus @default(PENDING)
  stripeSessionId   String?       @unique
  stripePaymentId   String?       @unique
  createdAt         DateTime      @default(now())
  updatedAt         DateTime      @updatedAt

  user              User          @relation(fields: [userId], references: [id], onDelete: Cascade)
  audit             Audit         @relation(fields: [auditId], references: [id], onDelete: Cascade)

  @@index([userId])
  @@index([status])
  @@map("payments")
}
```

---

## 3. LIB FILES (Utilities)

### src/lib/prisma.ts
```typescript
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

### src/lib/stripe.ts
```typescript
import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
  typescript: true,
})
```

### src/lib/anthropic.ts
```typescript
import Anthropic from '@anthropic-ai/sdk'

export const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
})
```

---

## 4. PROMPTS CLAUDE (Les 4 fichiers)

Je vais créer les 4 prompts séparément dans les prochains fichiers...

Continuer avec les PROMPTS, API ROUTES, PAGES, et COMPONENTS dans la prochaine réponse.

**STATUS: 30% complété - Fichiers de config et base créés**

Veux-tu que je continue avec:
1. Les 4 prompts Claude (hormonal + métabolique)
2. Les API routes (audit, payment, auth)
3. Les pages (landing, questionnaire, checkout, dashboard)
4. Les components (RadarChart, Scanlines, etc.)

Ou tu veux que je crée UN SEUL fichier ZIP avec tout dedans?
