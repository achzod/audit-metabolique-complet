# Déploiement Réussi - Audit Métabolique Complet

## ✅ Statut: LIVE ET FONCTIONNEL

**URL Production:** https://audit-metabolique-complet.onrender.com

## 🎯 Problème Résolu

**Issue:** "Server has closed the connection" lors des tentatives de connexion à la base de données PostgreSQL

**Cause:** Utilisation de l'**external URL** au lieu de l'**internal URL** pour la connexion DB depuis le service Render

**Solution:** Mise à jour de `DATABASE_URL` pour utiliser le hostname interne:
- ❌ Avant: `dpg-d55poje3jp1c73a0t4f0-a.frankfurt-postgres.render.com`
- ✅ Après: `dpg-d55poje3jp1c73a0t4f0-a`

## 📊 Base de Données

**Status:** ✅ Connectée et migrée avec succès

**Database:** neurocharge-db (PostgreSQL 16, Free plan, Frankfurt)
- ID: `dpg-d55poje3jp1c73a0t4f0-a`
- Database name: `neurocharge`
- User: `neurocharge_user`
- Expire le: 23 janvier 2026

**Schema appliqué:**
- ✅ Table `users` avec password nullable (pour magic link auth)
- ✅ Table `audits` avec champs photos (photoFace, photoBack, photoSide)
- ✅ Table `magic_tokens` avec indexes (pour authentification passwordless)
- ✅ Table `payments` (Stripe/PayPal)

## 🛠️ Changements Techniques

### 1. Prisma Schema (`prisma/schema.prisma`)
```prisma
model User {
  password String? // Nullable pour magic link
  magicTokens MagicToken[]
}

model Audit {
  photoFace String? @db.Text
  photoBack String? @db.Text
  photoSide String? @db.Text
}

model MagicToken {
  id String @id @default(cuid())
  token String @unique
  userId String
  user User @relation(...)
  expiresAt DateTime
  usedAt DateTime?

  @@index([token])
  @@index([expiresAt])
}
```

### 2. Configuration Prisma Client (`lib/prisma.ts`)
- Ajout de configuration explicite du datasource
- Logs d'erreurs en production

### 3. API Endpoints Créés

**Migration:**
- `/api/migrate` - Execute `prisma db push` (✅ fonctionne)
- `/api/migrate-sql` - Execute raw SQL migrations avec gestion d'erreurs détaillée

**Debug:**
- `/api/test-db` - Test simple de connexion DB
- `/api/debug-db` - Affiche la config DATABASE_URL (masquée)
- `/api/test-internal-db` - Compare external vs internal connection (a permis de trouver la solution!)

### 4. Package.json
Déplacement de `dependencies` (au lieu de `devDependencies`) pour Render:
- `typescript`
- `prisma`
- `tailwindcss`, `autoprefixer`, `postcss`
- `@types/node`, `@types/react`, `@types/react-dom`, `@types/nodemailer`

## 🔐 Variables d'Environnement Configurées

```
✅ DATABASE_URL (internal URL)
✅ NEXTAUTH_URL
✅ NEXTAUTH_SECRET
✅ ANTHROPIC_API_KEY
✅ STRIPE_SECRET_KEY
✅ NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
✅ STRIPE_WEBHOOK_SECRET
✅ NEXT_PUBLIC_PAYPAL_CLIENT_ID
✅ PAYPAL_CLIENT_SECRET
✅ MAIL_USER
✅ MAIL_PASS
✅ NEXT_PUBLIC_APP_URL
✅ NEXT_PUBLIC_APP_NAME
```

## 📝 Tests à Effectuer

### Flow GRATUIT
1. ⬜ Aller sur https://audit-metabolique-complet.onrender.com
2. ⬜ Remplir le questionnaire complet
3. ⬜ Choisir "GRATUIT" (79€ barré → 0€)
4. ⬜ Vérifier réception email avec magic link
5. ⬜ Cliquer sur magic link → authentification
6. ⬜ Accéder au dashboard
7. ⬜ Voir l'audit généré (version gratuite)

### Flow PREMIUM (79€)
1. ⬜ Remplir questionnaire
2. ⬜ Choisir "PREMIUM" (79€)
3. ⬜ Page checkout → paiement Stripe
4. ⬜ Compléter paiement test (carte test Stripe)
5. ⬜ Vérifier réception email avec magic link
6. ⬜ Accéder au dashboard
7. ⬜ Voir l'audit complet premium

### Tests Techniques
1. ⬜ Upload de photos (face, dos, côté)
2. ⬜ Génération d'audit par Claude (Anthropic API)
3. ⬜ Magic link expiration (liens expirent après X temps)
4. ⬜ Stripe webhooks (confirmations de paiement)
5. ⬜ Emails transactionnels (Nodemailer)

## 🚀 Service Render

**Service ID:** `srv-d55td4buibrs7399ar6g`
**Name:** audit-metabolique-complet
**Region:** Frankfurt
**Plan:** Starter
**Build Command:** `npm install && npm run build`
**Start Command:** `npm run start`
**Node Version:** 20

**Dashboard:** https://dashboard.render.com/web/srv-d55td4buibrs7399ar6g

## 📦 Repository GitHub

**URL:** https://github.com/achzod/audit-metabolique-complet
**Branch:** main
**Auto-deploy:** ✅ Activé (push → auto-redeploy)

## 🔧 Commandes Utiles

### Déclencher un deploy manuel
```bash
curl -X POST "https://api.render.com/v1/services/srv-d55td4buibrs7399ar6g/deploys" \
  -H "Authorization: Bearer rnd_bdlZ5q0e7gvGQz8415WrqqdgaZ6O" \
  -H "Content-Type: application/json" \
  -d '{"clearCache":"do_not_clear"}'
```

### Tester la connexion DB
```bash
curl https://audit-metabolique-complet.onrender.com/api/test-db
```

### Relancer les migrations
```bash
curl -X POST "https://audit-metabolique-complet.onrender.com/api/migrate" \
  -H "Content-Type: application/json" \
  -d '{"secret":"achzod-audit-metabolique-secret-2024-prod"}'
```

## ⏭️ Prochaines Étapes

1. **Tests fonctionnels** - Tester les deux flows (gratuit + premium)
2. **Monitoring** - Vérifier les logs Render en production
3. **Performance** - Tester la génération d'audits avec Claude
4. **Emails** - Valider l'envoi des magic links
5. **Paiements** - Tester Stripe en mode test puis activer production

## 📚 Documentation Utile

- Render Docs (PostgreSQL): https://render.com/docs/postgresql-creating-connecting
- Next.js Deployment: https://nextjs.org/docs/deployment
- Prisma Migrations: https://www.prisma.io/docs/concepts/components/prisma-migrate
- Stripe Testing: https://stripe.com/docs/testing

## 🎉 Résumé

- ✅ Application déployée et LIVE
- ✅ Base de données connectée (internal URL)
- ✅ Migrations appliquées avec succès
- ✅ Toutes les variables d'environnement configurées
- ✅ Build et start fonctionnels
- ⏳ Tests fonctionnels à faire

**Le système est prêt pour les tests utilisateur!**
