# 🔥 SCAN MÉTABOLIQUE COMPLET - SYSTÈME PRODUCTION-READY

Plateforme complète d'analyse métabolique avec 100 questions, 40 axes de scoring, et génération de rapports AI-powered (gratuit + premium).

## 📊 ARCHITECTURE COMPLÈTE

### Questionnaire 100 Questions
- **10 sections**: Profil, Photos+Morpho, Flexibilité Métabolique, Énergie/Cortisol, Neurotransmetteurs, Hormones, Digestion, Inflammation, Sommeil, Training
- **UI moderne**: Next.js 15 + Framer Motion, progress bar animée, validation en temps réel
- **Upload photos**: 3 photos (face, dos, profil) pour analyse AI morphotype

### Système de Scoring 40 Axes
**Fichier**: `/lib/scoring/metabolic-scores.ts` (1047 lignes)

**40 axes répartis en 10 catégories:**
- Métabolisme & Énergie (5 axes)
- Hormones (8 axes)
- Neurotransmetteurs (6 axes)
- Digestion & Microbiome (5 axes)
- Inflammation & Immunité (4 axes)
- Cardiovasculaire (4 axes)
- Détoxification (3 axes)
- Biomécanique & Articulations (4 axes)
- Sommeil & Récupération (4 axes)
- Performance (3 axes)

Chaque axe avec **logique de scoring détaillée** basée sur les réponses spécifiques.

### Intégration Claude AI (Anthropic)
- **Analyse photos morphotype**: bodyfat estimé, posture, déséquilibres musculaires
- **Génération contenu narratif**: Toute la prose des rapports générée par Claude
- **Personnalisation**: Chaque rapport unique basé sur les données du client

### Rapports Générés

#### Rapport GRATUIT (6-8 pages)
1. Cover avec gauge animé + score
2. Introduction personnalisée
3. Score global + top 3 forces / top 5 blocages
4. 5 blocages analysés en détail avec quick wins
5. Stack suppléments baseline
6. CTA upgrade premium

#### Rapport PREMIUM (25-30 pages)
1. Tout du gratuit +
2. Analyse morphotype ultra-détaillée
3. Profil métabolique approfondi
4. **40 axes analysés individuellement** (cœur du premium)
5. Heatmap complète 40 axes
6. Protocole suppléments phase par phase (dosages précis, timing, cycles, interactions)
7. Protocole nutrition personnalisé (macros, timing repas, aliments prioritaires)
8. Protocole training personnalisé (split, volume, exercices pour points forts/faibles)
9. Analyses sanguines recommandées + interprétation
10. Roadmap 90 jours détaillée (semaine par semaine)
11. Troubleshooting / Plan B

### Composants Visualisation
- **CircularGauge**: Gauge circulaire animé SVG (score 0-100)
- **RadarChart**: Radar chart 10 catégories
- **Heatmap**: Grille 40 axes avec hover tooltips et color coding

### Stack Technique
- **Frontend**: Next.js 15.5.9, React 19, TypeScript, TailwindCSS, Framer Motion
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL
- **AI**: Anthropic Claude API (claude-3-5-sonnet-20241022)
- **Paiement**: Stripe + PayPal
- **Auth**: NextAuth.js

---

## 🚀 INSTALLATION RAPIDE

### Prérequis
- Node.js 18+
- PostgreSQL
- npm ou yarn

### Setup en 3 commandes

```bash
# 1. Clone + Install
git clone <repo>
cd audit-metabolique-fresh
npm install

# 2. Setup rapide automatique
npm run setup

# 3. Configurer .env et lancer
npm run dev
```

---

## ⚙️ CONFIGURATION

### Variables d'Environnement (.env)

Créez un fichier `.env.local` à la racine:

```bash
# Database (OBLIGATOIRE)
DATABASE_URL="postgresql://user:password@localhost:5432/audit_metabolique"

# Claude AI (OBLIGATOIRE pour génération rapports)
ANTHROPIC_API_KEY="sk-ant-api03-xxxxx"

# NextAuth (OBLIGATOIRE)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"

# Stripe (OPTIONNEL - pour paiements premium)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_xxxxx"
STRIPE_SECRET_KEY="sk_test_xxxxx"
STRIPE_WEBHOOK_SECRET="whsec_xxxxx"

# PayPal (OPTIONNEL)
NEXT_PUBLIC_PAYPAL_CLIENT_ID="xxxxx"
PAYPAL_CLIENT_SECRET="xxxxx"

# Email (OPTIONNEL - pour envoi rapports)
MAIL_USER="coaching@achzodcoaching.com"
MAIL_PASS="your-gmail-app-password"
```

### Obtenir les clés API

**Anthropic Claude (OBLIGATOIRE):**
1. Créez un compte sur https://console.anthropic.com
2. Allez dans "API Keys"
3. Créez une nouvelle clé
4. Copiez dans `ANTHROPIC_API_KEY`

**Stripe (pour paiements):**
1. Créez un compte sur https://stripe.com
2. Mode Test: Dashboard > Developers > API Keys
3. Copiez Publishable key et Secret key

**PostgreSQL:**
```bash
# macOS
brew install postgresql
brew services start postgresql
createdb audit_metabolique

# Ubuntu
sudo apt install postgresql
sudo -u postgres createdb audit_metabolique
```

---

## 📦 COMMANDES DISPONIBLES

```bash
# Développement
npm run dev              # Lancer serveur dev (localhost:3000)

# Build & Production
npm run build            # Build production
npm start                # Lancer serveur production

# Database (Prisma)
npm run db:migrate       # Exécuter migrations
npm run db:studio        # Interface graphique Prisma Studio
npm run db:seed          # Seed base de données (si configuré)

# Validation & Setup
npm run validate         # Valider système complet
npm run setup            # Setup rapide automatique

# Linting
npm run lint             # Linter Next.js
```

---

## 🧪 VALIDATION SYSTÈME

Exécutez le script de validation complet:

```bash
npm run validate
```

Ce script vérifie:
- ✅ Connexion base de données
- ✅ Système de scoring 40 axes
- ✅ API Claude Anthropic
- ✅ Structure générateurs rapports
- ✅ Composants visualisation

**Sortie attendue si tout OK:**
```
🔥 VALIDATION SYSTÈME SCAN MÉTABOLIQUE COMPLET

1️⃣  Validation Base de Données...
   ✅ Connexion PostgreSQL OK

2️⃣  Validation Système de Scoring 40 Axes...
   ✅ Score global: 62/100
   ✅ Nombre d'axes calculés: 40/40
   ✅ Nombre de catégories: 10/10
   ✅ Tous les axes dans le range valide 0-100

3️⃣  Validation API Claude (Anthropic)...
   ✅ API Claude fonctionnelle

4️⃣  Validation Structure Rapports...
   ✅ Générateur rapport GRATUIT importable
   ✅ Générateur rapport PREMIUM importable

5️⃣  Validation Composants Visualisation...
   ✅ CircularGauge.tsx
   ✅ RadarChart.tsx
   ✅ Heatmap.tsx

============================================================
📊 RÉSUMÉ VALIDATION

✅ SYSTÈME 100% FONCTIONNEL !

🚀 Prêt pour production. Tous les composants validés.
```

---

## 🔥 UTILISATION

### 1. Lancer le questionnaire

```bash
npm run dev
# Ouvrir http://localhost:3000/questionnaire
```

### 2. Flow complet

1. **Questionnaire**: User remplit 100 questions + upload 3 photos
2. **Soumission**: POST `/api/questionnaire/submit`
3. **Processing**:
   - Calculate 40 axes scores
   - Analyze with Claude AI (photos + profil)
   - Generate FREE report (6-8 pages)
4. **Résultat**: Rapport gratuit généré, CTA upgrade premium
5. **Premium**: User paie 79€ → Génération rapport premium (25-30 pages)

### 3. Endpoints API

```
POST /api/questionnaire/submit
- Body: FormData (responses JSON + photos)
- Returns: { success: true, auditId: "..." }

POST /api/payment/stripe
- Body: { auditId, amount, currency }
- Returns: Stripe checkout session

GET /api/audit/[auditId]
- Returns: Audit data + reports HTML
```

---

## 📂 STRUCTURE FICHIERS

```
audit-metabolique-fresh/
├── app/
│   ├── questionnaire/
│   │   └── page.tsx                    # Page questionnaire 10 sections
│   └── api/
│       ├── questionnaire/
│       │   └── submit/
│       │       └── route.ts            # Endpoint soumission
│       └── payment/
│           └── stripe/
│               └── route.ts            # Paiement Stripe
│
├── components/
│   ├── questionnaire/
│   │   ├── Section1Profil.tsx          # 8 questions
│   │   ├── Section2Photos.tsx          # 3 photos + 4Q
│   │   ├── Section3FlexibiliteMetabolique.tsx  # 15Q
│   │   ├── Section4EnergieCortisol.tsx # 12Q
│   │   ├── Section5Neurotransmetteurs.tsx # 12Q
│   │   ├── Section6Hormones.tsx        # 15Q
│   │   ├── Section7Digestion.tsx       # 12Q
│   │   ├── Section8Inflammation.tsx    # 10Q
│   │   ├── Section9Sommeil.tsx         # 8Q
│   │   └── Section10Training.tsx       # 4Q
│   │
│   └── visualization/
│       ├── CircularGauge.tsx           # Gauge animé
│       ├── RadarChart.tsx              # Radar 10 catégories
│       └── Heatmap.tsx                 # Grid 40 axes
│
├── lib/
│   ├── scoring/
│   │   └── metabolic-scores.ts         # 1047 lignes - 40 axes
│   ├── ai/
│   │   └── claude-analysis.ts          # Intégration Claude AI
│   └── reports/
│       ├── generate-free.ts            # Rapport gratuit 6-8 pages
│       └── generate-premium.ts         # Rapport premium 25-30 pages
│
├── prisma/
│   └── schema.prisma                   # Schema DB complet
│
├── scripts/
│   ├── validate-system.ts              # Validation complète
│   └── setup-quick.sh                  # Setup automatique
│
├── types/
│   └── questionnaire.ts                # Types TypeScript complets
│
├── .env.example                        # Template variables d'env
└── package.json                        # Dependencies + scripts
```

---

## 🎯 CHECKLIST DÉPLOIEMENT PRODUCTION

### Avant Déploiement

- [ ] `ANTHROPIC_API_KEY` configurée
- [ ] `DATABASE_URL` configurée (PostgreSQL production)
- [ ] Migrations Prisma exécutées (`npm run db:migrate`)
- [ ] `NEXTAUTH_SECRET` généré (forte entropie)
- [ ] `STRIPE_SECRET_KEY` configurée (mode live si paiements)
- [ ] Build passe sans erreur (`npm run build`)
- [ ] Validation système OK (`npm run validate`)
- [ ] Tests end-to-end sur questionnaire complet
- [ ] Vérification rapports générés (gratuit + premium)

### Déploiement Vercel

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Login
vercel login

# 3. Deploy
vercel --prod

# 4. Configurer variables d'environnement dans Vercel Dashboard
```

### Déploiement Render

1. Créer nouveau Web Service
2. Connecter repo GitHub
3. Build Command: `npm run build`
4. Start Command: `npm start`
5. Ajouter variables d'environnement
6. Créer PostgreSQL database dans Render
7. Deploy

---

## 🐛 TROUBLESHOOTING

### Erreur: "Prisma Client not generated"
```bash
npx prisma generate
```

### Erreur: "API key invalid"
- Vérifiez `ANTHROPIC_API_KEY` dans `.env.local`
- Testez la clé: `npm run validate`

### Erreur: "Database connection failed"
- Vérifiez PostgreSQL est lancé
- Vérifiez `DATABASE_URL` est correct
- Test: `npx prisma studio`

### Build échoue
```bash
# Clean install
rm -rf node_modules .next
npm install
npm run build
```

---

## 📈 MÉTRIQUES SYSTÈME

- **100 questions** au total
- **40 axes** de scoring métabolique
- **10 catégories** principales
- **6-8 pages** rapport gratuit
- **25-30 pages** rapport premium
- **~850 lignes** générateur premium
- **~1047 lignes** système scoring
- **3 composants** visualisation

---

## 🤝 SUPPORT

Pour questions ou problèmes:

1. Vérifiez cette documentation
2. Exécutez `npm run validate`
3. Consultez logs Next.js et Prisma
4. Contact: support@achzodcoaching.com

---

## 📝 LICENCE

Propriétaire - AchZod Coaching
Tous droits réservés.

---

**Built with 🔥 by Claude Code**
