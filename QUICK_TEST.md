# 🧪 TEST RAPIDE - 5 MINUTES

## Setup Express (1 min)

```bash
# 1. Database
docker run -d --name achzod-db -e POSTGRES_PASSWORD=achzod2025 -e POSTGRES_DB=achzod_audits -p 5432:5432 postgres:15

# 2. Créer .env.local
cat > .env.local << EOF
DATABASE_URL="postgresql://postgres:achzod2025@localhost:5432/achzod_audits"
ANTHROPIC_API_KEY="sk-ant-api03-YOUR-KEY-HERE"
STRIPE_SECRET_KEY="sk_test_YOUR-KEY-HERE"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
EOF

# 3. Install + Prisma
npm install
npx prisma generate
npx prisma db push

# 4. Launch
npm run dev
```

## Test Flow Gratuit (2 min)

1. **Aller sur** http://localhost:3000
2. **Cliquer** "SCAN ANABOLIQUE"
3. **Cliquer** "SCAN GRATUIT" (en bas)
4. **Remplir:**
   - Email: test@test.com
   - Prénom: Test
   - Questions: Remplir rapidement (toutes les questions)
5. **Cliquer** "Terminer"
6. **Attendre** 30-60 sec (génération Claude)
7. **Voir** audit 4 pages + CTA premium

## Test Flow Premium (3 min)

1. **Depuis landing** cliquer "SCAN PREMIUM - 29€"
2. **Remplir questionnaire** complet
3. **Voir page** checkout (29€)
4. **Cliquer** "Payer 29€ et Débloquer"
5. **Stripe:**
   - Card: 4242 4242 4242 4242
   - Date: 12/34
   - CVC: 123
6. **Pay**
7. **Webhook déclenche** génération (30-60 sec)
8. **Dashboard** montre audit PROCESSING → COMPLETED
9. **Voir** audit 10 pages complet

## Vérifier Dashboard

1. **Aller sur** http://localhost:3000/dashboard
2. **Voir** liste de tous tes audits
3. **Cliquer** sur une card
4. **Voir** détail avec score/profil/sections

## Stripe Test Cards

- **Success**: 4242 4242 4242 4242
- **Decline**: 4000 0000 0000 0002
- **3D Secure**: 4000 0025 0000 3155

## Prisma Studio (Optionnel)

Voir la DB en temps réel:

```bash
npx prisma studio
```

Ouvrir http://localhost:5555

## Troubleshooting

**Port 5432 déjà utilisé:**
```bash
docker stop $(docker ps -q --filter name=achzod-db)
docker rm achzod-db
```

**Claude API error:**
- Vérifier ANTHROPIC_API_KEY dans .env.local
- Vérifier crédits sur console.anthropic.com

**Stripe webhook local:**
```bash
stripe listen --forward-to localhost:3000/api/payment/stripe
# Copier le webhook secret dans .env.local
```

## Logs utiles

```bash
# Voir logs Next.js
npm run dev

# Voir logs Prisma
npx prisma studio

# Voir DB directement
docker exec -it achzod-db psql -U postgres -d achzod_audits
\dt  # Liste tables
SELECT * FROM audits;
```

## C'est tout! 🎉

Tu as maintenant une plateforme complète d'audits hormonaux fonctionnelle.
