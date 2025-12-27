# NEUROCORE 360° - Documentation Projet

## Description du Projet

**NEUROCORE 360°** est une plateforme d'audit metabolique complete qui analyse 13 domaines de sante via un questionnaire de 126 questions. Les utilisateurs recoivent un rapport personnalise de 20+ pages avec des recommandations basees sur leurs reponses.

### Fonctionnalites principales :
- Questionnaire complet (13 sections, 126 questions)
- Authentification par Magic Link (email)
- Sauvegarde progressive des reponses
- Tracking des questionnaires abandonnes pour relance email
- Plans : Gratuit (Decouverte) et Payants (Premium, Elite)
- Dashboard utilisateur avec acces aux audits
- Panel Admin pour gerer les utilisateurs et audits

---

## Stack Technique

- **Frontend** : Next.js 15 (App Router), React 18, TypeScript
- **Styling** : Tailwind CSS, Framer Motion (animations)
- **Backend** : Next.js API Routes
- **Database** : PostgreSQL (Render)
- **ORM** : Prisma
- **Auth** : Magic Link custom (pas NextAuth pour l'instant)
- **Email** : SendPulse API (SMTP)
- **Hosting** : Render.com

---

## Variables d'Environnement (Render)

### Database
```
DATABASE_URL=postgresql://audit_metabolique_complet_user:xxxxx@dpg-xxxxx.oregon-postgres.render.com/audit_metabolique_complet
```

### App URLs
```
NEXTAUTH_URL=https://audit-metabolique-v2.onrender.com
NEXT_PUBLIC_APP_URL=https://audit-metabolique-v2.onrender.com
```

### SendPulse API (Email)
```
SENDPULSE_API_USER_ID=8777f687b840f1e047ea4b1439b36f61
SENDPULSE_API_SECRET=3375edeee0e4a95a1985c9702a3e5b2b
```

### Auth Secret
```
NEXTAUTH_SECRET=<generer avec: openssl rand -base64 32>
```

### Admin (optionnel)
```
ADMIN_PASSWORD=<mot de passe admin>
```

---

## Architecture des Fichiers

```
/app
  /admin                    # Panel admin
  /api
    /auth
      /check-email          # Verifie si email existe
      /magic-link           # Genere et envoie magic link
      /verify               # Verifie token et cree session
      /[...nextauth]        # NextAuth (pas utilise actuellement)
    /questionnaire
      /save-progress        # Sauvegarde progressive
  /audit-complet
    /page.tsx               # Landing page NEUROCORE 360
    /questionnaire          # Questionnaire 126 questions
    /checkout               # Selection du plan
  /auth
    /login                  # Page connexion
    /check-email            # Page "verifie ta boite mail"
    /verify-request         # Page verification email
  /dashboard                # Dashboard utilisateur
    /[auditId]              # Vue detail audit

/components
  /BackToHomeButton.tsx     # Bouton retour accueil (sur toutes pages)
  /Header.tsx               # Header avec logo NEUROCORE 360
  /questionnaire/           # Composants sections questionnaire

/lib
  /prisma.ts                # Client Prisma
  /email.ts                 # Fonctions envoi email SendPulse

/prisma
  /schema.prisma            # Schema base de donnees
```

---

## Schema Base de Donnees (Prisma)

### User
- id, email, name, createdAt, updatedAt
- Relations: audits, magicTokens

### Audit
- id, userId, type (GRATUIT/PREMIUM/ELITE), status
- responses (JSON), scores (JSON)
- createdAt, completedAt

### MagicToken
- id, token, userId, expiresAt, usedAt
- Expire apres 24h, usage unique

### QuestionnaireProgress (nouveau)
- id, email (unique)
- currentSection, totalSections, percentComplete
- responses (JSON)
- status: STARTED, IN_PROGRESS, COMPLETED, ABANDONED
- startedAt, lastActivityAt, abandonedAt, completedAt
- remindersSent, lastReminderAt

---

## Flux Utilisateur

### 1. Questionnaire
1. User va sur `/audit-complet/questionnaire`
2. Entre son email (capture avant questionnaire)
3. Repond aux 126 questions (13 sections)
4. Sauvegarde progressive vers API + localStorage
5. Fin → `/audit-complet/checkout` pour choisir plan

### 2. Checkout & Magic Link
1. User choisit plan (Gratuit ou Payant)
2. API `/api/auth/magic-link` cree:
   - User dans DB (si nouveau)
   - MagicToken (expire 24h)
   - Audit avec responses
3. Email envoye via SendPulse avec lien magic

### 3. Connexion
1. User clique lien dans email
2. `/api/auth/verify` verifie token
3. Cree cookies session (user_id, user_email)
4. Redirige vers `/dashboard`

### 4. Dashboard
1. Affiche liste des audits
2. Acces aux rapports selon plan choisi

---

## Problemes Resolus

### 1. Email HTML vide
**Probleme** : SendPulse affichait email vide
**Solution** : Encoder HTML en Base64
```typescript
const htmlBase64 = Buffer.from(htmlContent, 'utf-8').toString('base64')
```

### 2. Magic Link URL = undefined
**Probleme** : `NEXTAUTH_URL` non defini sur Render
**Solution** : Configurer env vars + fallback dans code

### 3. Redirection vers localhost:10000
**Probleme** : `/api/auth/verify` utilisait `request.url` qui sur Render est `localhost:10000`
**Solution** : Utiliser `NEXTAUTH_URL` explicitement pour les redirections
```typescript
const baseUrl = process.env.NEXTAUTH_URL || 'https://audit-metabolique-v2.onrender.com'
return NextResponse.redirect(`${baseUrl}/dashboard`)
```

### 4. Perte donnees a chaque deploy
**Probleme** : `prisma db push --force-reset` dans build script
**Solution** : Retirer `--force-reset` du package.json

---

## Commandes Utiles

### Developpement local
```bash
npm install
npm run dev
```

### Database
```bash
npx prisma generate      # Generer client
npx prisma db push       # Sync schema -> DB
npx prisma studio        # Interface admin DB
```

### Build
```bash
npm run build
```

---

## URLs

- **Production** : https://audit-metabolique-v2.onrender.com
- **Questionnaire** : https://audit-metabolique-v2.onrender.com/audit-complet/questionnaire
- **Login** : https://audit-metabolique-v2.onrender.com/auth/login
- **Admin** : https://audit-metabolique-v2.onrender.com/admin
- **Dashboard Render** : https://dashboard.render.com/web/srv-d55tnl6uk2gs73c5rghg

---

## A Faire (TODO)

- [ ] Cron job pour detecter questionnaires abandonnes (24h sans activite)
- [ ] Emails de relance automatiques
- [ ] Integration Stripe pour paiements
- [ ] Generation rapport PDF
- [ ] Ameliorer dashboard avec graphiques
- [ ] Tests automatises

---

## Contact

- **Email** : coaching@achzodcoaching.com
- **Site** : achzodcoaching.com
