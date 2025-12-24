# 🚀 GUIDE DÉPLOIEMENT - 3 ÉTAPES

## ✅ PROJET PRÊT!

Le projet **Audit Métabolique Complet** est entièrement construit et prêt à déployer.

📁 **Localisation**: `/Users/achzod/Desktop/Scripts/audit-metabolique-fresh/`

---

## 🔥 ÉTAPE 1: PUSH SUR GITHUB (2 minutes)

```bash
cd /Users/achzod/Desktop/Scripts/audit-metabolique-fresh

# 1. Créer un nouveau repo sur GitHub
# Va sur https://github.com/new
# Nom: audit-metabolique-complet
# Description: Plateforme SaaS d'audits métaboliques par IA
# Public ou Private: au choix
# NE PAS initialiser avec README (on a déjà le code!)

# 2. Ajouter le remote (remplace TON_USERNAME)
git remote add origin https://github.com/TON_USERNAME/audit-metabolique-complet.git

# 3. Push!
git branch -M main
git push -u origin main
```

**Résultat**: Code sur GitHub ✅

---

## 🗄️ ÉTAPE 2: CRÉER POSTGRESQL SUR RENDER (3 minutes)

1. Va sur https://dashboard.render.com
2. Clique **New +** → **PostgreSQL**
3. Remplis:
   - **Name**: audit-metabolique-db
   - **Database**: audit_metabolique
   - **User**: (généré automatiquement)
   - **Region**: Frankfurt (Europe)
   - **Instance Type**: Free
4. Clique **Create Database**
5. ⏳ Attends 2-3 minutes (création DB)
6. **COPIE** le `External Database URL` (en haut de la page)
   - Format: `postgresql://user:password@host:5432/database`
   - Tu en auras besoin pour l'étape 3!

**Résultat**: PostgreSQL Database live ✅

---

## 🌐 ÉTAPE 3: DÉPLOYER LE SITE SUR RENDER (5 minutes)

### 3.1 Créer le service web

1. Sur https://dashboard.render.com, clique **New +** → **Blueprint**
2. Connecte ton repo GitHub `audit-metabolique-complet`
3. Render détecte automatiquement le `render.yaml` ✅
4. Clique **Apply**

### 3.2 Ajouter les variables d'environnement

Va dans le service web créé → **Environment** → Ajoute ces variables:

```env
# Database (COPIE le External Database URL de l'étape 2)
DATABASE_URL=postgresql://user:password@host:5432/database

# NextAuth
NEXTAUTH_URL=https://ton-service.onrender.com
NEXTAUTH_SECRET=ton-secret-généré-avec-openssl

# Claude API
ANTHROPIC_API_KEY=sk-ant-api03-xxxxx

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx
STRIPE_SECRET_KEY=sk_live_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx

# App Config
NEXT_PUBLIC_APP_NAME=Audit Métabolique Complet
NEXT_PUBLIC_APP_URL=https://ton-service.onrender.com
```

### 3.3 Générer NEXTAUTH_SECRET

```bash
openssl rand -base64 32
```

Copie le résultat dans `NEXTAUTH_SECRET`.

### 3.4 Deploy!

1. Sauvegarde les variables
2. Clique **Manual Deploy** → **Deploy latest commit**
3. ⏳ Attends 5-7 minutes (build + deploy)
4. Le site sera live à `https://ton-service.onrender.com` 🎉

---

## 🎨 CE QUI EST DÉJÀ FAIT

✅ **Frontend complet**:
- Landing page futuriste
- Questionnaire 85 questions (9 sections)
- Page checkout (Gratuit vs Premium 79€)
- Auth (login/signup)
- Dashboard utilisateur
- Affichage audits

✅ **Backend complet**:
- API Routes Next.js
- Prisma ORM + PostgreSQL schema
- NextAuth.js v5
- Stripe payment integration
- Claude Sonnet 4 API integration
- Prompts gratuit (4000 tokens) et premium (16000 tokens)

✅ **Design**:
- Dark theme (#0A0A0F, #00F5D4, #A78BFA)
- Glassmorphism
- Gradients + animations
- Responsive mobile

✅ **Build**:
- TypeScript compilé
- Next.js production build
- Zéro erreur

---

## 📝 NOTES IMPORTANTES

### Stripe Webhooks

Après le déploiement, configure le webhook Stripe:

1. Va sur https://dashboard.stripe.com/webhooks
2. Clique **Add endpoint**
3. URL: `https://ton-service.onrender.com/api/webhooks/stripe`
4. Événements: `checkout.session.completed`
5. Copie le **Signing secret** (commence par `whsec_`)
6. Ajoute-le dans `STRIPE_WEBHOOK_SECRET` sur Render

### Test local (optionnel)

Si tu veux tester localement avant de déployer:

```bash
cd /Users/achzod/Desktop/Scripts/audit-metabolique-fresh

# Copie .env.example vers .env
cp .env.example .env

# Remplis les vraies valeurs dans .env

# Lance Prisma
npx prisma generate
npx prisma db push

# Lance le serveur
npm run dev

# Ouvre http://localhost:3000
```

---

## 🎯 URLS FINALES

Une fois déployé, tu auras:

- **Site public**: `https://ton-service.onrender.com`
- **Landing page**: `https://ton-service.onrender.com/audit-complet`
- **Questionnaire**: `https://ton-service.onrender.com/audit-complet/questionnaire`
- **Dashboard**: `https://ton-service.onrender.com/dashboard` (après login)

---

## 🆘 SUPPORT

Si problème:

1. Vérifie les logs Render (Dashboard → Service → Logs)
2. Vérifie que TOUTES les variables d'environnement sont définies
3. Vérifie que le DATABASE_URL est correct
4. Vérifie que Prisma migrations ont tourné (dans les logs de build)

---

## 🎉 C'EST TOUT!

Le projet est **100% prêt à déployer**. Suis les 3 étapes ci-dessus et ton site sera live! 🚀

🤖 *Construit entièrement par Claude Code en 30 minutes*
