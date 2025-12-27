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
- Bouton Home sur TOUTES les pages

---

## Design & Branding

### Nom de marque
- **NEUROCORE 360°** - Affiche partout (header, questionnaire, checkout, landing)

### Palette de couleurs
```css
/* Couleurs principales */
--cyan-primary: #5EECC5;      /* Vert cyan - accent principal */
--purple-primary: #9990EA;     /* Violet - accent secondaire */
--pink-accent: #FF6B9D;        /* Rose - accent tertiaire */

/* Fond sombre */
--bg-dark: #0A0A0B;            /* Fond principal */
--bg-card: #1C1C1E;            /* Fond cartes */
--bg-input: #1a1a1f;           /* Fond inputs */
--border-subtle: rgba(255,255,255,0.1);  /* Bordures subtiles */
--border-hover: rgba(255,255,255,0.15);  /* Bordures hover */

/* Texte */
--text-primary: #FFFFFF;       /* Texte principal */
--text-secondary: #9CA3AF;     /* Texte secondaire (gray-400) */
--text-muted: #6B7280;         /* Texte muted (gray-500) */
```

### Gradients
```css
/* Gradient principal (titres, boutons) */
background: linear-gradient(to right, #5EECC5, #9990EA);

/* Gradient accent (headers animés) */
background: linear-gradient(to right, #5EECC5, #9990EA, #FF6B9D);

/* Gradient boutons CTA */
background: linear-gradient(to right, #00F5D4, #A78BFA);
```

### Typographie
- **Font principale** : System font stack (Inter-like)
- **Titres** : Bold, gradient text avec `bg-clip-text text-transparent`
- **Corps** : Regular, blanc ou gris selon importance

### Composants UI

#### Bouton Home (BackToHomeButton)
- Position : fixed top-6 left-6, z-50
- Style : glassmorphism (bg-white/5, backdrop-blur-md, border-white/10)
- Icone : lucide-house + "Menu Principal" (cache sur mobile)
- Hover : bg-white/10, text-cyan-400
- **PRESENT SUR TOUTES LES PAGES**

#### Inputs
```css
.input-field {
  background: #1a1a1f;
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: 0.75rem;
  padding: 0.75rem 1rem;
  color: white;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.input-field:focus {
  border-color: #5EECC5;
  box-shadow: 0 0 0 2px rgba(94,236,197,0.2);
}
```

#### Boutons CTA
```css
.btn-primary {
  background: linear-gradient(to right, #00F5D4, #A78BFA);
  color: black;
  font-weight: 600;
  border-radius: 0.75rem;
  padding: 0.75rem 1.5rem;
}
.btn-primary:hover {
  opacity: 0.9;
}
```

#### Cartes
```css
.card {
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 1rem;
  backdrop-filter: blur(10px);
}
```

#### Select Custom (pas de dropdown gris moche)
- Composant SelectField custom dans questionnaire
- Dropdown avec fond #1a1a1f, bordures blanches subtiles
- Options avec hover bg-white/10
- Option selectionnee avec bg-cyan/20 et check icon

### Animations (Framer Motion)
- Page transitions : fadeIn + slideUp
- Boutons : scale on hover
- Progress bar : animate width
- Toast sauvegarde : fadeIn/fadeOut

### Responsive
- Mobile-first
- Breakpoints : sm (640px), md (768px), lg (1024px)
- Header texte "Menu Principal" cache sur mobile (icone seule)
- Grilles adaptatives pour les questions

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
DATABASE_URL=postgresql://achzod_audits_hormonal_user:xxxxxxxx@dpg-d55ua3shg0os73abnvl0-a.frankfurt-postgres.render.com/achzod_audits_hormonal
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
  /admin                    # Panel admin (avec BackToHomeButton)
  /api
    /auth
      /check-email          # Verifie si email existe
      /magic-link           # Genere et envoie magic link
      /verify               # Verifie token et cree session
    /questionnaire
      /save-progress        # Sauvegarde progressive
  /audit-complet
    /page.tsx               # Landing page NEUROCORE 360 (avec BackToHomeButton)
    /questionnaire          # Questionnaire 126 questions (avec BackToHomeButton)
    /checkout               # Selection du plan (avec BackToHomeButton)
  /auth
    /login                  # Page connexion (avec BackToHomeButton)
    /check-email            # Page "verifie ta boite mail" (avec BackToHomeButton)
    /verify-request         # Page verification email (avec BackToHomeButton)
  /dashboard                # Dashboard utilisateur (avec BackToHomeButton)
    /[auditId]              # Vue detail audit (avec BackToHomeButton)
  /questionnaire            # Ancien questionnaire (avec BackToHomeButton)

/components
  /BackToHomeButton.tsx     # Bouton retour accueil (OBLIGATOIRE sur toutes pages)
  /Header.tsx               # Header avec logo NEUROCORE 360°
  /FormSelect.tsx           # Select custom (pas de dropdown gris)
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

### QuestionnaireProgress
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
**Solution** : Retirer `--force-reset`, utiliser `--accept-data-loss` pour migrations

### 5. Dropdown Select gris moche
**Probleme** : Les select natifs HTML sont gris et moches
**Solution** : Composant SelectField custom avec design coherent

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
- **Landing** : https://audit-metabolique-v2.onrender.com/audit-complet
- **Questionnaire** : https://audit-metabolique-v2.onrender.com/audit-complet/questionnaire
- **Login** : https://audit-metabolique-v2.onrender.com/auth/login
- **Admin** : https://audit-metabolique-v2.onrender.com/admin
- **Dashboard Render** : https://dashboard.render.com/web/srv-d55tnl6uk2gs73c5rghg
- **GitHub** : https://github.com/achzod/audit-metabolique-complet

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
