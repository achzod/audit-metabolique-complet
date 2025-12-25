# ACHZOD AUDIT PLATFORM

Plateforme complète d'audits hormonaux et métaboliques avec IA Claude.

## 🚀 DÉPLOIEMENT INSTANTANÉ

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/achzod/achzod-audit-platform)

**Clique le bouton ↑ et Render fait TOUT automatiquement!**

Tu devras juste entrer 3 clés API (c'est rapide):
- Claude API Key: https://console.anthropic.com/settings/keys
- Stripe Secret: https://dashboard.stripe.com/test/apikeys
- Stripe Public: https://dashboard.stripe.com/test/apikeys

Ton app sera live en 3 minutes sur `https://achzod-audit-platform.onrender.com` 🎉

## Stack Technique

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Database**: PostgreSQL + Prisma ORM
- **Payment**: Stripe
- **AI**: Anthropic Claude Sonnet 4.5
- **Auth**: NextAuth.js v5 (à implémenter)

## Structure du Projet

```
achzod-audit-platform/
├── prisma/
│   └── schema.prisma              # Database schema
├── src/
│   ├── app/
│   │   ├── audit-hormonal/        # Landing + questionnaire hormonal
│   │   ├── checkout/              # Page de paiement
│   │   ├── dashboard/             # Dashboard client
│   │   ├── api/
│   │   │   ├── audit/             # API creation + analyse
│   │   │   └── payment/           # Stripe checkout + webhook
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── lib/
│   │   ├── prisma.ts              # Prisma client
│   │   ├── stripe.ts              # Stripe client
│   │   ├── anthropic.ts           # Claude client
│   │   └── prompts/               # Prompts Claude
│   └── components/                # À créer
└── .env.local                     # Variables d'environnement
```

## Installation

### 1. Cloner et Installer

```bash
cd achzod-audit-platform
npm install
```

### 2. Configuration Base de Données

Créer une base PostgreSQL (local ou cloud):

**Option A: Local avec Docker**
```bash
docker run -d \
  --name achzod-postgres \
  -e POSTGRES_PASSWORD=achzod2025 \
  -e POSTGRES_DB=achzod_audits \
  -p 5432:5432 \
  postgres:15
```

**Option B: Cloud (Render, Supabase, etc.)**
- Créer une database PostgreSQL
- Copier l'URL de connexion

### 3. Variables d'Environnement

Créer `.env.local` avec:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/achzod_audits?schema=public"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"

# Anthropic Claude
ANTHROPIC_API_KEY="sk-ant-api03-..."

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Email (Gmail pour notifications)
EMAIL_USER="your-email@gmail.com"
EMAIL_PASSWORD="your-app-password"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 4. Setup Database

```bash
# Generate Prisma Client
npx prisma generate

# Push schema to database
npx prisma db push

# (Optional) Open Prisma Studio
npx prisma studio
```

### 5. Lancer en Dev

```bash
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000)

## Configuration Stripe

### 1. Créer Compte Stripe

1. Aller sur [stripe.com](https://stripe.com)
2. Créer un compte
3. Mode Test activé par défaut

### 2. Récupérer les Clés

Dans Dashboard Stripe → Developers → API keys:
- `STRIPE_SECRET_KEY`: sk_test_...
- `STRIPE_PUBLISHABLE_KEY`: pk_test_...

### 3. Configurer Webhook (pour production)

Dashboard Stripe → Developers → Webhooks:

- URL: `https://your-domain.com/api/payment/stripe`
- Events: `checkout.session.completed`
- Copier Signing Secret dans `STRIPE_WEBHOOK_SECRET`

### 4. Prix Produits

Tu peux:
- Utiliser Price IDs (créer dans Stripe Dashboard)
- OU utiliser price_data (déjà configuré dans le code)

## Configuration Claude API

### 1. Obtenir Clé API

1. Aller sur [console.anthropic.com](https://console.anthropic.com)
2. Créer un compte
3. Generate API Key
4. Copier dans `ANTHROPIC_API_KEY`

### 2. Crédits

- 5$ gratuits au signup
- Sonnet 4.5: ~$3 per million tokens input, ~$15 per million output
- Gratuit: ~600 tokens → $0.005 par audit
- Premium: ~2500 tokens → $0.04 par audit

Très abordable pour démarrer!

## Structure des Audits

### Types

- `HORMONAL`: Scan Anabolique (29€ premium)
- `METABOLIQUE`: Audit Métabolique (79€ premium)

### Versions

- `GRATUIT`: 4 pages, génération immédiate
- `PREMIUM`: 10 pages (hormonal) ou 15 pages (métabolique)

### Flow

1. **Client remplit questionnaire** → Créé audit PENDING
2. **Si gratuit**: Génération immédiate avec Claude
3. **Si premium**: Redirect vers Stripe checkout
4. **Après paiement**: Webhook Stripe → Génération Claude
5. **Client accède à son dashboard** → Voit son audit

## Fonctionnalités Implémentées

✅ Landing page hormonal avec design dark/neon
✅ Questionnaire 62 questions interactif
✅ API création d'audit
✅ Génération avec Claude (gratuit + premium)
✅ Checkout Stripe
✅ Webhook Stripe
✅ Dashboard client
✅ Affichage audit HTML

## Fonctionnalités À Implémenter

🚧 **Auth NextAuth** (actuellement simplified)
🚧 **Email notifications** (nodemailer)
🚧 **Download PDF**
🚧 **Audit Métabolique** (landing + questionnaire)
🚧 **Prompts métabolique** (gratuit + premium)
🚧 **Components réutilisables** (RadarChart, Scanlines, etc.)
🚧 **Tests**

## Développement

### Commandes Utiles

```bash
# Dev server
npm run dev

# Build production
npm run build

# Start production
npm start

# Prisma
npx prisma studio          # UI database
npx prisma db push         # Update schema
npx prisma generate        # Regenerate client

# Lint
npm run lint
```

### Structure Base de Données

**Users**
- id, email, password, name

**Audits**
- id, userId, type (HORMONAL|METABOLIQUE), version, status
- responses (JSON), analysis (JSON), htmlContent

**Payments**
- id, userId, auditId, amount, provider, productType, status
- stripeSessionId, stripePaymentId

## Déploiement

### Option 1: Vercel (Recommandé)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables in Vercel Dashboard
```

Database: Utiliser Neon, Supabase, ou Render PostgreSQL

### Option 2: Render

1. Créer Web Service (Next.js)
2. Créer PostgreSQL database
3. Lier les deux
4. Configurer env vars
5. Deploy

### Webhooks Stripe

⚠️ En production, configurer webhook URL:
`https://your-domain.com/api/payment/stripe`

Tester avec Stripe CLI:
```bash
stripe listen --forward-to localhost:3000/api/payment/stripe
```

## Sécurité

🔐 **Important**:
- Ne JAMAIS commit `.env.local`
- Utiliser variables d'environnement pour secrets
- Valider tous les inputs utilisateur
- Vérifier signatures Stripe webhooks
- Rate limiting sur APIs (à implémenter)

## Support & Customisation

### Modifier le Design

- Colors: `tailwind.config.ts`
- Fonts: Charger dans `layout.tsx`
- Animations: Framer Motion dans components

### Ajouter un Nouveau Type d'Audit

1. Ajouter dans enum Prisma `AuditType`
2. Créer prompts dans `lib/prompts/`
3. Créer landing page + questionnaire
4. Ajouter logique dans `api/audit/analyze`
5. Update checkout prices

### Personnaliser Prompts Claude

Modifier dans `src/lib/prompts/`:
- Structure des sections
- Ton et style
- Longueur cible
- Format output (JSON)

## Roadmap

**v1.1**
- [ ] Auth complète NextAuth
- [ ] Emails automatiques
- [ ] PDF download
- [ ] Audit métabolique

**v1.2**
- [ ] Système de referral
- [ ] Dashboard admin
- [ ] Analytics avancés
- [ ] A/B testing templates

**v2.0**
- [ ] Mobile app (React Native)
- [ ] Suivi progression
- [ ] Coach IA personnalisé
- [ ] Communauté

## License

Propriétaire - Achzod Coaching © 2025

---

**Créé avec ❤️ par Claude Code**

Pour support: contact@achzod.com
