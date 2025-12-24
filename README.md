# 🔥 Audit Métabolique Complet - Plateforme SaaS

Plateforme d'audit métabolique personnalisé propulsée par IA (Claude Sonnet 4).

## 🎯 Fonctionnalités

- ✅ **Questionnaire 85 questions** (9 sections médicales)
- ✅ **Audit Gratuit** (4 sections) et **Premium** (15 sections, 79€)
- ✅ **Génération par IA** (Claude Sonnet 4)
- ✅ **Paiements** Stripe + PayPal
- ✅ **Dashboard utilisateur** avec historique des audits
- ✅ **Design futuriste** dark mode (glassmorphism, gradients, animations)

## 🛠️ Stack Technique

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL + Prisma ORM
- **Auth**: NextAuth.js v5 (credentials)
- **AI**: Anthropic Claude API (Sonnet 4)
- **Payments**: Stripe + PayPal
- **Hosting**: Render

## 📦 Installation Locale

\`\`\`bash
# Clone le repo
git clone https://github.com/achzod/audit-metabolique.git
cd audit-metabolique

# Installe les dépendances
npm install

# Configure .env (copie .env.example)
cp .env.example .env
# Remplis les variables d'environnement

# Setup Prisma
npx prisma generate
npx prisma db push

# Lance le serveur de dev
npm run dev
\`\`\`

## 🚀 Déploiement sur Render

1. **Push sur GitHub**
\`\`\`bash
git add .
git commit -m "Initial commit"
git push
\`\`\`

2. **Créer un PostgreSQL sur Render**
   - Va sur https://dashboard.render.com
   - New + → PostgreSQL
   - Copie le \`DATABASE_URL\`

3. **Déployer le service web**
   - New + → Blueprint
   - Connecte le repo GitHub
   - Render détecte automatiquement \`render.yaml\`
   - Ajoute les variables d'environnement (voir .env.example)
   - Deploy!

4. **Variables d'environnement requises**:
   - \`DATABASE_URL\` (PostgreSQL externe URL)
   - \`NEXTAUTH_URL\` (URL du site Render)
   - \`NEXTAUTH_SECRET\` (génère avec \`openssl rand -base64 32\`)
   - \`ANTHROPIC_API_KEY\` (API key Claude)
   - \`NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY\`
   - \`STRIPE_SECRET_KEY\`
   - \`STRIPE_WEBHOOK_SECRET\`
   - \`NEXT_PUBLIC_APP_URL\` (URL du site)

## 📊 Architecture

\`\`\`
┌─────────────────────────────────┐
│   Landing Page (/audit-complet) │
└─────────────────────────────────┘
                ↓
┌─────────────────────────────────┐
│   Questionnaire (85 questions)  │
└─────────────────────────────────┘
                ↓
┌─────────────────────────────────┐
│   Checkout (Gratuit vs Premium) │
└─────────────────────────────────┘
                ↓
┌─────────────────────────────────┐
│   Signup/Login (NextAuth)       │
└─────────────────────────────────┘
                ↓
┌─────────────────────────────────┐
│   Claude API → Generate Audit   │
└─────────────────────────────────┘
                ↓
┌─────────────────────────────────┐
│   Dashboard (Voir audits)       │
└─────────────────────────────────┘
\`\`\`

## 🎨 Design System

- **Couleurs**:
  - Dark: \`#0A0A0F\`
  - Cyan: \`#00F5D4\`
  - Purple: \`#A78BFA\`
  - Red: \`#FF6B6B\`
  - Green: \`#4FFFB0\`

- **Typography**:
  - Body: Inter
  - Headings: Space Grotesk

- **Effets**:
  - Glassmorphism (backdrop-filter: blur)
  - Gradient borders (linear-gradient)
  - Smooth animations (Framer Motion)

## 📝 License

Propriétaire - AchZod Coaching © 2025

## 📧 Support

contact: coaching@achzodcoaching.com
