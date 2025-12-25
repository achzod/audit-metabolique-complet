# 🚀 DÉPLOIEMENT EN 1 CLIC

## Étape 1: Clique le bouton

Va sur le README et clique:
**[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/achzod/achzod-audit-platform)**

Ou directement: https://render.com/deploy?repo=https://github.com/achzod/achzod-audit-platform

## Étape 2: Entre tes 3 clés API

Render te demande:

### 1. ANTHROPIC_API_KEY
→ Va sur https://console.anthropic.com/settings/keys
→ Clique "Create Key"
→ Copie la clé (commence par `sk-ant-api03-`)
→ Colle dans Render

### 2. STRIPE_SECRET_KEY
→ Va sur https://dashboard.stripe.com/test/apikeys
→ Copie "Secret key" (commence par `sk_test_`)
→ Colle dans Render

### 3. STRIPE_PUBLISHABLE_KEY
→ Même page Stripe
→ Copie "Publishable key" (commence par `pk_test_`)
→ Colle dans Render

## Étape 3: Clique "Deploy"

Render fait AUTOMATIQUEMENT:
- ✅ Crée la database PostgreSQL
- ✅ Crée le web service Next.js
- ✅ Configure toutes les env vars
- ✅ Build l'app (npm install + prisma + next build)
- ✅ Démarre l'app

**Temps: 3-5 minutes**

## Étape 4: C'EST LIVE! 🎉

Ton app est disponible sur:
**https://achzod-audit-platform.onrender.com**

### Test:
1. Ouvre l'URL
2. Clique "SCAN ANABOLIQUE"
3. Remplis le questionnaire
4. Vois ton audit généré par Claude!

## (Optionnel) Stripe Webhook

Pour les paiements premium:

1. Va sur https://dashboard.stripe.com/webhooks
2. **Add endpoint**
3. URL: `https://achzod-audit-platform.onrender.com/api/payment/stripe`
4. Event: `checkout.session.completed`
5. Copie le signing secret
6. Render → Service → Environment → Ajoute:
   ```
   STRIPE_WEBHOOK_SECRET=whsec_xxx
   ```

---

## C'EST TOUT!

Tu as une plateforme complète d'audits hormonaux déployée en production! 🚀
