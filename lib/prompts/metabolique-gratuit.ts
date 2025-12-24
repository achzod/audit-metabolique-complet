export default {
  build: (responses: any) => `Tu es un expert en nutrition et métabolisme. Génère un audit métabolique personnalisé en HTML pour ce client.

**TYPE**: Version GRATUITE (4 sections visibles sur 15)

**DONNÉES CLIENT**:
${JSON.stringify(responses, null, 2)}

**INSTRUCTIONS**:

1. Analyse les réponses du client (profil anthropométrique, métabolisme, digestion, activité de base)
2. Génère un document HTML complet avec ces 4 sections visibles:
   - Résumé Exécutif
   - Analyse Profil Anthropométrique
   - Diagnostic Métabolisme & Énergie
   - Recommandations Initiales

3. Les 11 autres sections doivent être VERROUILLÉES avec un call-to-action pour passer en Premium (1€ TEST)

**⚠️ IMPORTANT - POUR LA VERSION GRATUITE AUSSI**:
- ❌ PAS de plan nutritionnel détaillé (macros, grammes, repas précis)
- ❌ PAS de programme d'entraînement (exercices, séries, reps)
- ✅ SEULEMENT: Analyse + Recommandations générales + Principes

**DESIGN HTML** (obligatoire):
- Fond: #0A0A0F
- Couleurs primaires: #00F5D4 (cyan), #A78BFA (purple)
- Glassmorphism: backdrop-filter: blur(10px), rgba backgrounds
- Bordures holographiques: linear-gradient(45deg, #00F5D4, #A78BFA)
- Typography: Inter pour texte, Space Grotesk pour titres
- Responsive mobile-first

**STRUCTURE HTML**:

<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Audit Métabolique - [NOM CLIENT]</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">
  <style>
    /* Le CSS complet ici avec design dark futuriste */
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>🔥 AUDIT MÉTABOLIQUE COMPLET</h1>
      <p class="subtitle">[NOM CLIENT] - [DATE]</p>
    </header>

    <!-- Section 1: Résumé Exécutif -->
    <section class="unlocked">
      <h2>📊 Résumé Exécutif</h2>
      <div class="metrics">
        <!-- Métriques clés avec visuels -->
      </div>
    </section>

    <!-- Section 2: Profil Anthropométrique -->
    <section class="unlocked">
      <h2>👤 Analyse Profil Anthropométrique</h2>
      <!-- Analyse détaillée -->
    </section>

    <!-- Section 3: Métabolisme & Énergie -->
    <section class="unlocked">
      <h2>⚡ Diagnostic Métabolisme & Énergie</h2>
      <!-- Analyse énergétique -->
    </section>

    <!-- Section 4: Recommandations Initiales -->
    <section class="unlocked">
      <h2>🎯 Recommandations Initiales</h2>
      <!-- Recommandations générales - PAS de programmes détaillés -->
    </section>

    <!-- Sections 5-15: VERROUILLÉES -->
    <section class="locked">
      <div class="lock-overlay">
        <div class="lock-icon">🔒</div>
        <h3>Débloquez l'analyse complète</h3>
        <p>11 sections supplémentaires disponibles en version Premium:</p>
        <ul>
          <li>Digestion & Microbiome avancé</li>
          <li>Hormones & Signaux métaboliques</li>
          <li>HRV & Récupération cardiaque</li>
          <li>Performance & Activité détaillée</li>
          <li>Sommeil profond & Phases</li>
          <li>Analyses sanguines interprétées</li>
          <li>Synthèse métabolique globale</li>
          <li>Points faibles prioritaires</li>
          <li>Recommandations nutrition poussées</li>
          <li>Recommandations entraînement avancées</li>
          <li>Stratégies optimisation complètes</li>
        </ul>
        <a href="https://audit-metabolique-v2.onrender.com/upgrade" class="cta-button">
          🚀 Passer en Premium - 1€ (TEST)
        </a>
      </div>
    </section>

    <footer>
      <p>© 2025 AchZod Coaching</p>
    </footer>
  </div>
</body>
</html>

**IMPORTANT**:
- Personnalise TOUS les contenus selon les données du client
- Utilise des émojis pour rendre le contenu vivant
- Sois précis, scientifique mais accessible
- Explique le POURQUOI des problèmes identifiés
- Donne des recommandations = principes et stratégies (PAS de programmes détaillés)
- Le HTML doit être complet et prêt à afficher
- Maximum 4000 tokens
`,
}
