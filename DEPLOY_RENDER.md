# 🚀 DÉPLOIEMENT RENDER - 3 ÉTAPES

## Étape 1: Push sur GitHub (2 min)

### Option A: Créer repo sur GitHub.com
1. Va sur https://github.com/new
2. Nom: `achzod-audit-platform`
3. **Private** recommandé
4. **Ne pas** initialiser avec README
5. Créer le repo

### Option B: Avec GitHub CLI (si installé)
```bash
# Installer gh CLI
brew install gh

# Login
gh auth login

# Créer repo
gh repo create achzod-audit-platform --private --source=. --push
```

### Ensuite (Option A seulement):
```bash
# Copier l'URL du repo (https://github.com/TON-USERNAME/achzod-audit-platform.git)
git remote add origin https://github.com/TON-USERNAME/achzod-audit-platform.git
git branch -M main
git push -u origin main
```

## Étape 2: Créer Services sur Render (5 min)

### 2.1 Créer Database PostgreSQL

1. Va sur https://dashboard.render.com
2. **New** → **PostgreSQL**
3. **Name**: `achzod-audit-db`
4. **Database**: `achzod_audits`
5. **User**: `achzod_user`
6. **Region**: Frankfurt (ou le plus proche)
7. **Plan**: Free
8. **Create Database**

📋 **Copier l'Internal Database URL** (commence par `postgresql://...`)

### 2.2 Créer Web Service

1. **New** → **Web Service**
2. **Connect** ton repo GitHub `achzod-audit-platform`
3. **Name**: `achzod-audit-platform`
4. **Region**: Frankfurt
5. **Branch**: main
6. **Root Directory**: (laisser vide)
7. **Runtime**: Node
8. **Build Command**:
   ```
   npm install && npx prisma generate && npm run build
   ```
9. **Start Command**:
   ```
   npm start
   ```
10. **Plan**: Free
11. **Advanced** → Environment Variables:

```bash
DATABASE_URL=<coller l'Internal Database URL>
ANTHROPIC_API_KEY=sk-ant-api03-YOUR-KEY
STRIPE_SECRET_KEY=sk_test_YOUR-KEY
STRIPE_PUBLISHABLE_KEY=pk_test_YOUR-KEY
NEXT_PUBLIC_APP_URL=https://achzod-audit-platform.onrender.com
NEXTAUTH_SECRET=<générer avec: openssl rand -base64 32>
```

12. **Create Web Service**

## Étape 3: Push Schema Prisma (1 min)

Une fois le service déployé:

```bash
# Installer Render CLI (optionnel)
npm install -g render-cli

# Ou directement avec DATABASE_URL
DATABASE_URL="postgresql://..." npx prisma db push
```

**Ou via Render Shell:**
1. Va sur ton service Render
2. **Shell** (en haut à droite)
3. Run:
   ```bash
   npx prisma db push
   ```

## ✅ C'est en ligne!

Ton app est disponible sur:
**https://achzod-audit-platform.onrender.com**

### Test Rapide:

1. Ouvre l'URL
2. Clique "SCAN ANABOLIQUE"
3. Remplis le questionnaire
4. Vois ton audit généré! 🎉

## 🔧 Configuration Stripe Webhook

Pour que les paiements premium fonctionnent:

1. Va sur https://dashboard.stripe.com/webhooks
2. **Add endpoint**
3. **Endpoint URL**: `https://achzod-audit-platform.onrender.com/api/payment/stripe`
4. **Events**: Sélectionner `checkout.session.completed`
5. **Add endpoint**
6. Copier le **Signing secret** (commence par `whsec_`)
7. Retour sur Render → Environment Variables:
   ```
   STRIPE_WEBHOOK_SECRET=whsec_YOUR_SECRET
   ```
8. **Save Changes** (redéploie automatiquement)

## 📊 Monitoring

### Logs en temps réel:
```bash
# Via Render dashboard
Service → Logs (onglet)

# Ou avec CLI
render logs -s achzod-audit-platform --tail
```

### Prisma Studio (optionnel):
```bash
# En local, connecté à la DB Render
DATABASE_URL="postgresql://..." npx prisma studio
```

## 🐛 Troubleshooting

### Build fail "prisma generate"
→ Vérifier que `postinstall` est dans package.json scripts:
```json
"postinstall": "prisma generate"
```

### 503 Service Unavailable
→ Attendre 1-2 min, Render démarre les services free
→ Après 15 min d'inactivité, se rendort (free tier)

### Database connection error
→ Vérifier DATABASE_URL est bien l'**Internal URL**
→ Format: `postgresql://user:pass@host:5432/db`

### Stripe webhook fail
→ Vérifier `STRIPE_WEBHOOK_SECRET` est configuré
→ Tester webhook avec Stripe CLI:
```bash
stripe listen --forward-to https://achzod-audit-platform.onrender.com/api/payment/stripe
```

## 🔄 Updates

Pour déployer des changements:

```bash
# Commit + push
git add .
git commit -m "Update: description"
git push

# Render redéploie automatiquement! 🚀
```

## 💰 Free Tier Limits

**PostgreSQL:**
- 1 GB storage
- Expire après 90 jours (tu peux extend gratuitement)

**Web Service:**
- 750h/mois
- Se rendort après 15 min inactivité
- Wakeup time: ~30 secondes

Pour production, upgrade à **$7/mois** (PostgreSQL) + **$7/mois** (Web).

## 🎉 Terminé!

Ton Audit Hormonal est maintenant **LIVE** et accessible par n'importe qui!

Partage le lien: **https://achzod-audit-platform.onrender.com** 🚀
