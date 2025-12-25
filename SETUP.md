# SETUP RAPIDE - 5 MINUTES

Guide ultra-rapide pour lancer l'app en local.

## 1. Installation (2 min)

```bash
cd achzod-audit-platform
npm install
```

## 2. Base de Données (1 min)

**Option Rapide: Docker**

```bash
docker run -d \
  --name achzod-db \
  -e POSTGRES_PASSWORD=achzod2025 \
  -e POSTGRES_DB=achzod_audits \
  -p 5432:5432 \
  postgres:15
```

## 3. Variables d'Environnement (1 min)

Créer `.env.local`:

```env
DATABASE_URL="postgresql://postgres:achzod2025@localhost:5432/achzod_audits"
ANTHROPIC_API_KEY="sk-ant-api03-YOUR-KEY"
STRIPE_SECRET_KEY="sk_test_YOUR-KEY"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXTAUTH_SECRET="any-random-string-here-min-32-chars"
```

**Obtenir les clés**:
- Claude: [console.anthropic.com](https://console.anthropic.com) → API Keys → Create
- Stripe: [dashboard.stripe.com/test/apikeys](https://dashboard.stripe.com/test/apikeys)

## 4. Setup Database (30 sec)

```bash
npx prisma generate
npx prisma db push
```

## 5. Lancer! (10 sec)

```bash
npm run dev
```

Ouvrir: **http://localhost:3000**

---

## Test Rapide

1. Aller sur [http://localhost:3000/audit-hormonal](http://localhost:3000/audit-hormonal)
2. Cliquer "Lancer le Scan"
3. Remplir le questionnaire
4. Voir ton audit généré par Claude! 🎉

---

## Troubleshooting

**Port 5432 déjà utilisé?**
```bash
# Tuer postgres existant
docker stop $(docker ps -q --filter name=achzod-db)
# Ou changer le port: -p 5433:5432
```

**Prisma error?**
```bash
rm -rf node_modules .next
npm install
npx prisma generate
```

**Claude API error?**
- Vérifier clé API dans .env.local
- Vérifier crédits sur console.anthropic.com

**Stripe error?**
- Utiliser clés TEST (sk_test_, pk_test_)
- Webhook pas nécessaire en dev

---

C'est tout! Tu as une plateforme d'audits IA fonctionnelle en 5 minutes.

Pour aller plus loin: voir **README.md**
