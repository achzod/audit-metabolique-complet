export default {
  build: (responses: any) => `Tu es un expert en nutrition et métabolisme. Génère un audit métabolique personnalisé PREMIUM en HTML pour ce client.

**TYPE**: Version PREMIUM (15 sections complètes)

**DONNÉES CLIENT**:
${JSON.stringify(responses, null, 2)}

**INSTRUCTIONS**:

1. Analyse TOUTES les réponses du questionnaire (85 questions, 9 sections)
2. Génère un document HTML complet avec 15 sections d'analyse:

**SECTIONS OBLIGATOIRES**:
1. Résumé Exécutif (métriques clés, scores)
2. Profil Anthropométrique (IMC, composition corporelle, objectifs)
3. Historique Pondéral (analyse variations poids, yoyo)
4. Métabolisme & Énergie (TEE, thermogenèse, fatigue)
5. Digestion & Microbiome (santé digestive, intolérances)
6. Hormones & Signaux (cortisol, thyroïde, insuline, sexuelles)
7. Activité & Performance (volume, intensité, récupération)
8. Sommeil & Récupération (qualité, durée, chronotype)
9. Lifestyle & Substances (stress, alcool, stimulants)
10. Objectifs & Motivation (psychologie, obstacles)
11. Synthèse Métabolique Globale (profil métabolique unique)
12. Plan Nutritionnel Personnalisé (macros, timing, aliments)
13. Protocole Entraînement Sur-Mesure (split, volume, intensité)
14. Stratégies Optimisation Hormonale (sommeil, stress, suppléments)
15. Feuille de Route 90 Jours (semaine par semaine)

**DESIGN HTML** (obligatoire):
- Fond: #0A0A0F avec gradients subtils
- Couleurs: #00F5D4 (cyan), #A78BFA (purple), #FF6B6B (red alerts), #4FFFB0 (green success)
- Glassmorphism: backdrop-filter: blur(10px), rgba backgrounds
- Bordures holographiques: linear-gradient(45deg, #00F5D4, #A78BFA)
- Cards avec hover effects (transform: translateY(-2px))
- Typography: Inter (body), Space Grotesk (headings)
- Graphiques ASCII pour visualisations
- Badges de couleur pour status (⚠️ Attention, ✅ Optimal, 🔥 Priorité)
- Responsive mobile-first

**STRUCTURE HTML**:

<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Audit Métabolique Premium - [NOM CLIENT]</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Inter', sans-serif;
      background: #0A0A0F;
      color: #E5E5E5;
      line-height: 1.6;
      padding: 20px;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
    }

    header {
      text-align: center;
      padding: 60px 20px;
      background: linear-gradient(135deg, rgba(0, 245, 212, 0.1), rgba(167, 139, 250, 0.1));
      border: 2px solid transparent;
      border-image: linear-gradient(45deg, #00F5D4, #A78BFA) 1;
      border-radius: 20px;
      margin-bottom: 40px;
      backdrop-filter: blur(10px);
    }

    h1 {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 3rem;
      background: linear-gradient(135deg, #00F5D4, #A78BFA);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 10px;
    }

    .subtitle {
      color: #00F5D4;
      font-size: 1.2rem;
      font-weight: 500;
    }

    section {
      background: rgba(255, 255, 255, 0.03);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 16px;
      padding: 40px;
      margin-bottom: 30px;
      transition: transform 0.3s ease;
    }

    section:hover {
      transform: translateY(-2px);
      border-color: rgba(0, 245, 212, 0.3);
    }

    h2 {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 2rem;
      color: #00F5D4;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    h3 {
      font-family: 'Space Grotesk', sans-serif;
      color: #A78BFA;
      margin-top: 30px;
      margin-bottom: 15px;
    }

    .badge {
      display: inline-block;
      padding: 6px 14px;
      border-radius: 20px;
      font-size: 0.85rem;
      font-weight: 600;
      margin: 5px;
    }

    .badge.success { background: rgba(79, 255, 176, 0.2); color: #4FFFB0; }
    .badge.warning { background: rgba(255, 214, 0, 0.2); color: #FFD600; }
    .badge.danger { background: rgba(255, 107, 107, 0.2); color: #FF6B6B; }

    .metric-card {
      background: rgba(0, 245, 212, 0.05);
      border: 1px solid rgba(0, 245, 212, 0.2);
      border-radius: 12px;
      padding: 20px;
      margin: 15px 0;
    }

    .metric-value {
      font-size: 2.5rem;
      font-weight: 700;
      color: #00F5D4;
    }

    .action-item {
      background: rgba(167, 139, 250, 0.1);
      border-left: 4px solid #A78BFA;
      padding: 15px 20px;
      margin: 10px 0;
      border-radius: 8px;
    }

    .ascii-chart {
      font-family: monospace;
      white-space: pre;
      background: rgba(0, 0, 0, 0.3);
      padding: 20px;
      border-radius: 8px;
      overflow-x: auto;
      color: #00F5D4;
    }

    footer {
      text-align: center;
      padding: 40px 20px;
      color: #666;
      margin-top: 60px;
    }

    @media (max-width: 768px) {
      h1 { font-size: 2rem; }
      h2 { font-size: 1.5rem; }
      section { padding: 20px; }
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>🔥 AUDIT MÉTABOLIQUE PREMIUM</h1>
      <p class="subtitle">[NOM CLIENT] - [DATE]</p>
    </header>

    <!-- Génère les 15 sections ici avec contenu détaillé et personnalisé -->

    <footer>
      <p>© 2025 AchZod Coaching - Audit Premium généré par Claude Sonnet 4</p>
      <p>Questions? coaching@achzodcoaching.com</p>
    </footer>
  </div>
</body>
</html>

**IMPORTANT**:
- Personnalise TOUT selon les données uniques du client
- Sois ultra-précis: calculs métaboliques, macros, timing, volumes
- Analyse scientifique + ton friendly et motivant
- Émojis pour clarté visuelle
- Actionable: chaque section = actions concrètes
- Graphiques ASCII pour visualisations (ex: progression, ratios macros)
- Maximum 16000 tokens
- HTML complet, autonome, prêt à afficher
`,
}
