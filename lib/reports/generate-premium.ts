import Anthropic from '@anthropic-ai/sdk';
import { QuestionnaireResponses, MetabolicScores, AIAnalysis } from '@/types/questionnaire';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

interface GeneratePremiumReportParams {
  userName: string;
  responses: any;
  scores: MetabolicScores;
  aiAnalysis: AIAnalysis;
}

export async function generatePremiumReport(params: GeneratePremiumReportParams): Promise<string> {
  const { userName, responses, scores, aiAnalysis } = params;

  console.log('📝 Génération rapport PREMIUM (25-30 pages)...');

  // ÉTAPE 1: Introduction premium (plus détaillée que gratuit)
  console.log('1/10 - Génération introduction premium...');
  const introduction = await generatePremiumIntroduction(userName, scores, aiAnalysis);

  // ÉTAPE 2: Analyse morphotype détaillée
  console.log('2/10 - Analyse morphotype détaillée...');
  const morphotypeAnalysis = await generateMorphotypeAnalysis(aiAnalysis.morphotype);

  // ÉTAPE 3: Profil métabolique détaillé
  console.log('3/10 - Profil métabolique détaillé...');
  const metabolicProfileAnalysis = await generateMetabolicProfileAnalysis(
    aiAnalysis.metabolicProfile,
    responses
  );

  // ÉTAPE 4: Analyse des 40 axes (cœur du rapport premium)
  console.log('4/10 - Analyse des 40 axes...');
  const allAxesAnalysis = await generateAllAxesAnalysis(scores, responses);

  // ÉTAPE 5: Protocole suppléments détaillé (phase par phase)
  console.log('5/10 - Protocole suppléments détaillé...');
  const supplementProtocol = await generateSupplementProtocol(
    aiAnalysis.topBlockages,
    scores
  );

  // ÉTAPE 6: Protocole nutrition
  console.log('6/10 - Protocole nutrition...');
  const nutritionProtocol = await generateNutritionProtocol(
    responses,
    scores,
    aiAnalysis.metabolicProfile
  );

  // ÉTAPE 7: Protocole training
  console.log('7/10 - Protocole training...');
  const trainingProtocol = await generateTrainingProtocol(
    responses,
    scores,
    aiAnalysis
  );

  // ÉTAPE 8: Recommandations analyses sanguines
  console.log('8/10 - Recommandations bloodwork...');
  const bloodworkRecommendations = await generateBloodworkRecommendations(
    aiAnalysis.topBlockages,
    scores
  );

  // ÉTAPE 9: Roadmap 90 jours
  console.log('9/10 - Roadmap 90 jours...');
  const roadmap90Days = await generateRoadmap90Days(
    aiAnalysis.topBlockages,
    scores
  );

  // ÉTAPE 10: Troubleshooting / Plan B
  console.log('10/10 - Troubleshooting...');
  const troubleshooting = generateTroubleshooting();

  // ASSEMBLAGE HTML FINAL
  console.log('Assemblage HTML premium...');
  const htmlContent = assemblePremiumHTML({
    userName,
    scores,
    aiAnalysis,
    introduction,
    morphotypeAnalysis,
    metabolicProfileAnalysis,
    allAxesAnalysis,
    supplementProtocol,
    nutritionProtocol,
    trainingProtocol,
    bloodworkRecommendations,
    roadmap90Days,
    troubleshooting,
  });

  return htmlContent;
}

// ============================================================================
// INTRODUCTION PREMIUM
// ============================================================================

async function generatePremiumIntroduction(
  userName: string,
  scores: MetabolicScores,
  aiAnalysis: AIAnalysis
): Promise<string> {
  const prompt = `Tu es AchZod. Rédige l'introduction du rapport PREMIUM pour ${userName}.

DONNÉES :
- Score global : ${scores.overall}/100
- Observations : ${aiAnalysis.observations.join(', ')}
- Top blockage : ${aiAnalysis.topBlockages[0].axeName} (${aiAnalysis.topBlockages[0].score}/100)

STRUCTURE (6-8 paragraphes) :

Paragraphe 1 : Félicitations pour l'upgrade premium + ce qui l'attend
Paragraphe 2 : Rappel du score + contexte spécifique
Paragraphe 3 : Différence entre gratuit et premium (profondeur analyse)
Paragraphe 4 : Structure du rapport premium (40 axes, protocoles, roadmap)
Paragraphe 5 : Philosophie AchZod (data-driven, pas de bullshit, résultats)
Paragraphe 6 : Engagement qualité + support
Paragraphe 7 : Motivation finale avant de plonger
Paragraphe 8 : Signature

RÈGLES :
- Prose narrative fluide
- Ton expert mais accessible
- Créer excitation pour le contenu à venir
- Rassurer sur la profondeur et la valeur

Réponds UNIQUEMENT avec les paragraphes.`;

  const response = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 2500,
    messages: [{ role: 'user', content: prompt }],
  });

  return response.content[0].type === 'text' ? response.content[0].text : '';
}

// ============================================================================
// ANALYSE MORPHOTYPE DÉTAILLÉE
// ============================================================================

async function generateMorphotypeAnalysis(morphotype: AIAnalysis['morphotype']): Promise<string> {
  const prompt = `Tu es AchZod. Rédige une analyse morphotype DÉTAILLÉE.

DONNÉES MORPHOTYPE :
- Ectomorphe : ${morphotype.ectomorphe}%
- Mésomorphe : ${morphotype.mesomorphe}%
- Endomorphe : ${morphotype.endomorphe}%
- Dominant : ${morphotype.dominant}
- Bodyfat estimé : ${morphotype.bodyfatEstime}%
- Répartition gras : ${morphotype.repartitionGras}
- Posture : ${morphotype.posture.join(', ')}
- Déséquilibres : ${morphotype.desequilibres.join(', ')}
- Points forts musculaires : ${morphotype.pointsForts.join(', ')}
- Points faibles musculaires : ${morphotype.pointsFaibles.join(', ')}

STRUCTURE (8-10 paragraphes) :

Paragraphe 1 : Morphotype dominant et ce que ça signifie
Paragraphe 2 : Breakdown des 3 morphotypes (%)
Paragraphe 3 : Bodyfat estimé + où stocké
Paragraphe 4 : Analyse posturale (problèmes détectés)
Paragraphe 5 : Déséquilibres musculaires (asymétries)
Paragraphe 6 : Points forts à capitaliser
Paragraphe 7 : Points faibles à corriger
Paragraphe 8 : Implications pour nutrition
Paragraphe 9 : Implications pour training
Paragraphe 10 : Recommandations correctives spécifiques

RÈGLES :
- Prose narrative
- Expliquer POURQUOI chaque observation est importante
- Donner des implications concrètes
- Ton expert mais accessible

Réponds UNIQUEMENT avec les paragraphes.`;

  const response = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 3500,
    messages: [{ role: 'user', content: prompt }],
  });

  return response.content[0].type === 'text' ? response.content[0].text : '';
}

// ============================================================================
// PROFIL MÉTABOLIQUE DÉTAILLÉ
// ============================================================================

async function generateMetabolicProfileAnalysis(
  metabolicProfile: AIAnalysis['metabolicProfile'],
  responses: any
): Promise<string> {
  const prompt = `Tu es AchZod. Analyse le profil métabolique DÉTAILLÉ.

PROFIL :
- Flexibilité métabolique : ${metabolicProfile.flexibility}
- Dépendance glucose : ${metabolicProfile.glucoseDependency}
- Adaptation cétose : ${metabolicProfile.ketoAdaptation}
- Santé mitochondriale : ${metabolicProfile.mitochondrialHealth}

DONNÉES BRUTES :
- Temps sans manger : ${responses.tempsSansManger}
- Sauter petit-déj : ${responses.sauterPetitDej}
- Temps entrée cétose : ${responses.tempsEntreeCetose}
- Après glucides rapides : ${responses.apresGlucidesRapides}

STRUCTURE (10-12 paragraphes) :

Paragraphe 1 : Vue d'ensemble du profil métabolique
Paragraphe 2 : Flexibilité métabolique expliquée + niveau actuel
Paragraphe 3 : Dépendance glucose (sévérité + impacts)
Paragraphe 4 : Capacité fat-burning actuelle
Paragraphe 5 : Adaptation cétose (facilité + historique)
Paragraphe 6 : Santé mitochondriale (état + implications)
Paragraphe 7 : Switch carburant (glucose ↔ cétones)
Paragraphe 8 : Sensibilité insuline estimée
Paragraphe 9 : Implications pour composition corporelle
Paragraphe 10 : Stratégies nutrition optimales pour CE profil
Paragraphe 11 : Timeline amélioration réaliste
Paragraphe 12 : Marqueurs à tracker

RÈGLES :
- Prose narrative
- Expliquer physiologie simplement
- Personnaliser basé sur données
- Donner stratégies concrètes

Réponds UNIQUEMENT avec les paragraphes.`;

  const response = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 4000,
    messages: [{ role: 'user', content: prompt }],
  });

  return response.content[0].type === 'text' ? response.content[0].text : '';
}

// ============================================================================
// ANALYSE DES 40 AXES (CŒUR DU PREMIUM)
// ============================================================================

async function generateAllAxesAnalysis(
  scores: MetabolicScores,
  responses: any
): Promise<Record<string, string>> {
  const axesEntries = Object.entries(scores.axes);

  // Generate analysis for each axis in batches to avoid rate limits
  const analyses: Record<string, string> = {};

  for (const [axeName, score] of axesEntries) {
    const prompt = `Tu es AchZod. Analyse l'axe "${axeName}" pour le rapport premium.

DONNÉES :
- Nom axe : ${axeName}
- Score : ${score}/100

STRUCTURE (4-5 paragraphes) :

Paragraphe 1 : Qu'est-ce que cet axe (définition physiologique)
Paragraphe 2 : Score actuel + ce que ça signifie
Paragraphe 3 : Pourquoi c'est important (impacts)
Paragraphe 4 : Stratégies optimisation (nutrition, suppléments, lifestyle)
Paragraphe 5 : Timeline amélioration attendue

RÈGLES :
- Prose narrative concise
- Expliquer simplement
- Actionnable
- Max 250 mots par axe

Réponds UNIQUEMENT avec les paragraphes.`;

    try {
      const response = await anthropic.messages.create({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 800,
        messages: [{ role: 'user', content: prompt }],
      });

      analyses[axeName] = response.content[0].type === 'text' ? response.content[0].text : '';
    } catch (error) {
      console.error(`Erreur analyse axe ${axeName}:`, error);
      analyses[axeName] = `Analyse de ${axeName} (score: ${score}/100). Cet axe est en cours d'analyse détaillée.`;
    }

    // Small delay to avoid rate limits
    await new Promise(resolve => setTimeout(resolve, 200));
  }

  return analyses;
}

// ============================================================================
// PROTOCOLE SUPPLÉMENTS DÉTAILLÉ
// ============================================================================

async function generateSupplementProtocol(
  topBlockages: AIAnalysis['topBlockages'],
  scores: MetabolicScores
): Promise<string> {
  const blockagesInfo = topBlockages
    .map((b, i) => `${i + 1}. ${b.axeName} (${b.score}/100)`)
    .join('\n');

  const prompt = `Tu es AchZod. Crée un protocole suppléments ULTRA-DÉTAILLÉ.

BLOCAGES À CIBLER :
${blockagesInfo}

STRUCTURE (protocole phase par phase) :

PHASE 1 - FONDATIONS (Semaines 1-4) :
- MATIN À JEUN : [Liste avec dosages exacts + raisons]
- AVEC PETIT-DÉJ : [Liste avec dosages + raisons]
- MIDI : [Liste]
- SOIR : [Liste]
- AVANT COUCHER : [Liste]

PHASE 2 - OPTIMISATION (Semaines 5-8) :
- Ajouts progressifs
- Augmentation dosages
- Nouvelles molécules

PHASE 3 - MAINTENANCE (Semaine 9+) :
- Stack long terme
- Cycles recommandés
- Breaks

INTERACTIONS À SURVEILLER :
- [Interactions importantes]

MARQUES RECOMMANDÉES :
- [Top marques par catégorie avec raisons]

COÛT TOTAL :
- Phase 1 : [montant]€/mois
- Phase 2 : [montant]€/mois
- Phase 3 : [montant]€/mois

RÈGLES :
- Dosages PRÉCIS en mg/UI
- Timing exact
- Expliquer le POURQUOI de chaque molécule
- Interactions détaillées
- Prose fluide, pas bullet points bruts

Réponds UNIQUEMENT avec le protocole.`;

  const response = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 4000,
    messages: [{ role: 'user', content: prompt }],
  });

  return response.content[0].type === 'text' ? response.content[0].text : '';
}

// ============================================================================
// PROTOCOLE NUTRITION
// ============================================================================

async function generateNutritionProtocol(
  responses: any,
  scores: MetabolicScores,
  metabolicProfile: AIAnalysis['metabolicProfile']
): Promise<string> {
  const prompt = `Tu es AchZod. Crée un protocole nutrition PERSONNALISÉ.

DONNÉES :
- Objectif : ${responses.objectifPrincipal}
- Poids : ${responses.poids} kg
- Taille : ${responses.taille} cm
- Flexibilité métabolique : ${metabolicProfile.flexibility}
- Dépendance glucose : ${metabolicProfile.glucoseDependency}

STRUCTURE :

MACROS OPTIMALES :
- Calories : [calcul TDEE + ajustement objectif]
- Protéines : [grammes + g/kg + pourquoi]
- Lipides : [grammes + % + types]
- Glucides : [grammes + timing]

TIMING REPAS :
- Fenêtre alimentaire optimale : [heures]
- Nombre repas : [X repas + raisons]
- Timing glucides : [pré/post-training + raisons physiologiques]

PROTOCOLE SEMAINE :
- Lundi (Training Haut) : [macros détaillées]
- Mardi (Off) : [macros détaillées]
- Mercredi (Training Bas) : [macros]
- etc.

ALIMENTS PRIORITAIRES :
- Protéines : [liste + pourquoi]
- Lipides : [liste + pourquoi]
- Glucides : [liste + index glycémique]
- Micronutriments clés : [liste]

ALIMENTS À ÉVITER :
- [Liste avec raisons spécifiques AU PROFIL]

HYDRATATION :
- Volume eau : [litres + timing]
- Électrolytes : [stratégie]

RÈGLES :
- Prose narrative
- Explique POURQUOI chaque choix
- Personnalisé au profil métabolique
- Actionnable immédiatement

Réponds UNIQUEMENT avec le protocole.`;

  const response = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 4000,
    messages: [{ role: 'user', content: prompt }],
  });

  return response.content[0].type === 'text' ? response.content[0].text : '';
}

// ============================================================================
// PROTOCOLE TRAINING
// ============================================================================

async function generateTrainingProtocol(
  responses: any,
  scores: MetabolicScores,
  aiAnalysis: AIAnalysis
): Promise<string> {
  const prompt = `Tu es AchZod. Crée un protocole training PERSONNALISÉ.

DONNÉES :
- Objectif : ${responses.objectifPrincipal}
- Années training : ${responses.anneesEntrainement}
- Fréquence actuelle : ${responses.frequenceTraining}
- Type dominant : ${responses.typeTrainingDominant}
- Récupération : ${responses.recuperationMusculaire}
- Morphotype : ${aiAnalysis.morphotype.dominant}
- Points forts : ${aiAnalysis.morphotype.pointsForts.join(', ')}
- Points faibles : ${aiAnalysis.morphotype.pointsFaibles.join(', ')}

STRUCTURE :

SPLIT OPTIMAL :
- [X jours/semaine]
- Jour 1 : [Groupes musculaires + raisons]
- Jour 2 : [Groupes]
- etc.

PARAMÈTRES :
- Volume par groupe : [séries + raisons]
- Intensité : [% 1RM ou RPE + raisons]
- Tempo : [phases excentriques/concentriques]
- Repos inter-séries : [secondes]

EXERCICES PRIORITAIRES :
- Points forts : [Exercices maintenance]
- Points faibles : [Exercices correction + volume augmenté]

PÉRIODISATION :
- Phase 1 (4 semaines) : [Focus]
- Phase 2 (4 semaines) : [Focus]
- Phase 3 (4 semaines) : [Focus]
- Deload : [Stratégie]

CARDIO :
- Type : [LISS/HIIT/Aucun + raisons]
- Fréquence : [X fois/semaine]
- Timing : [Quand + pourquoi]

RÉCUPÉRATION :
- Jours off : [Nombre + raisons]
- Techniques : [Étirements, mobilité, etc.]

RÈGLES :
- Prose narrative
- Explique POURQUOI chaque choix
- Personnalisé au morphotype et objectif
- Progression claire

Réponds UNIQUEMENT avec le protocole.`;

  const response = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 4000,
    messages: [{ role: 'user', content: prompt }],
  });

  return response.content[0].type === 'text' ? response.content[0].text : '';
}

// ============================================================================
// RECOMMANDATIONS BLOODWORK
// ============================================================================

async function generateBloodworkRecommendations(
  topBlockages: AIAnalysis['topBlockages'],
  scores: MetabolicScores
): Promise<string> {
  const blockagesInfo = topBlockages
    .map(b => `${b.axeName} (${b.score}/100)`)
    .join(', ');

  const prompt = `Tu es AchZod. Recommande les analyses sanguines SPÉCIFIQUES.

BLOCAGES DÉTECTÉS :
${blockagesInfo}

STRUCTURE :

ANALYSES ESSENTIELLES (panel baseline) :
- [Nom analyse] : Ce qu'elle mesure + pourquoi critique pour CE profil + valeurs optimales
- etc.

ANALYSES HORMONALES :
- Testostérone (totale + libre)
- SHBG
- Œstrogènes
- Cortisol (matin + soir)
- TSH, T3 libre, T4 libre, reverse T3
- etc.

MARQUEURS MÉTABOLIQUES :
- Insuline à jeun
- HOMA-IR
- HbA1c
- etc.

MARQUEURS INFLAMMATION :
- CRP haute sensibilité
- Homocystéine
- etc.

INTERPRÉTATION :
- Valeurs "normales" vs "optimales"
- Ce que chaque marqueur révèle sur le métabolisme
- Actions si hors range

TIMING :
- Quand faire les analyses (matin à jeun, etc.)
- À quelle fréquence re-tester

COÛT ESTIMÉ :
- Panel complet : [montant]€

RÈGLES :
- Prose narrative
- Expliquer POURQUOI chaque analyse
- Personnalisé aux blocages
- Valeurs optimales, pas juste normales

Réponds UNIQUEMENT avec les recommandations.`;

  const response = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 4000,
    messages: [{ role: 'user', content: prompt }],
  });

  return response.content[0].type === 'text' ? response.content[0].text : '';
}

// ============================================================================
// ROADMAP 90 JOURS
// ============================================================================

async function generateRoadmap90Days(
  topBlockages: AIAnalysis['topBlockages'],
  scores: MetabolicScores
): Promise<string> {
  const prompt = `Tu es AchZod. Crée une roadmap 90 jours DÉTAILLÉE.

STRUCTURE :

SEMAINE 1-2 (Fondations) :
- Objectif : [Clair + mesurable]
- Nutrition : [Changements à implémenter]
- Suppléments : [Phase 1 start]
- Training : [Volume + intensité]
- Lifestyle : [Sommeil, stress, etc.]
- Marqueurs à tracker : [Poids, énergie, etc.]

SEMAINE 3-4 (Adaptation) :
- Objectif :
- Ajustements nutrition :
- Suppléments :
- Training :
- Check-in : [Que mesurer]

SEMAINE 5-8 (Optimisation) :
- Objectif :
- Progression nutrition :
- Suppléments phase 2 :
- Training progression :
- Analyses sanguines : [Si prévu]

SEMAINE 9-12 (Consolidation) :
- Objectif :
- Fine-tuning :
- Évaluation résultats :
- Plan suite :

CHECKPOINTS :
- Jour 7 : [Que vérifier]
- Jour 14 : [Ajustements possibles]
- Jour 30 : [Évaluation complète]
- Jour 60 : [Mi-parcours]
- Jour 90 : [Bilan final]

RÈGLES :
- Prose narrative
- Progression logique
- Réaliste et actionnable
- Marqueurs objectifs

Réponds UNIQUEMENT avec la roadmap.`;

  const response = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 4000,
    messages: [{ role: 'user', content: prompt }],
  });

  return response.content[0].type === 'text' ? response.content[0].text : '';
}

// ============================================================================
// TROUBLESHOOTING / PLAN B
// ============================================================================

function generateTroubleshooting(): string {
  return `Si après 4-6 semaines tu ne vois AUCUN progrès malgré une adhérence stricte au protocole, voici les plans B à considérer.

Scénario 1 : Aucune perte de gras malgré déficit calorique strict. Plan B : Check thyroïde (TSH, T3 libre, reverse T3), augmenter activité NEAT, implémenter refeeds stratégiques, vérifier qualité sommeil (tracker Oura/Whoop).

Scénario 2 : Aucun gain musculaire malgré surplus et training. Plan B : Testostérone totale + libre + SHBG, vérifier récupération (diminuer volume), augmenter fréquence protéines, check cortisol.

Scénario 3 : Énergie toujours effondrée. Plan B : Panel hormones thyroïde complet, cortisol salivaire 4 points, check carence fer + ferritine + vitamine D, éliminer infections chroniques.

Scénario 4 : Inflammation toujours élevée. Plan B : Élimination diet (retire gluten + laitages 30 jours), test sensibilités alimentaires, check gut (SIBO breath test), augmenter oméga-3 drastiquement.

Quand consulter un médecin : Si symptômes sévères (fatigue extrême, perte cheveux massive, température corporelle <36°C constante, libido inexistante), consulte endocrinologue pour analyses approfondies.

Support AchZod : Email à support@achzodcoaching.com avec sujet "Premium - Troubleshooting" + résumé situation. Réponse sous 48h maximum avec ajustements personnalisés.`;
}

// ============================================================================
// ASSEMBLAGE HTML PREMIUM
// ============================================================================

function assemblePremiumHTML(params: {
  userName: string;
  scores: MetabolicScores;
  aiAnalysis: AIAnalysis;
  introduction: string;
  morphotypeAnalysis: string;
  metabolicProfileAnalysis: string;
  allAxesAnalysis: Record<string, string>;
  supplementProtocol: string;
  nutritionProtocol: string;
  trainingProtocol: string;
  bloodworkRecommendations: string;
  roadmap90Days: string;
  troubleshooting: string;
}): string {
  const {
    userName,
    scores,
    aiAnalysis,
    introduction,
    morphotypeAnalysis,
    metabolicProfileAnalysis,
    allAxesAnalysis,
    supplementProtocol,
    nutritionProtocol,
    trainingProtocol,
    bloodworkRecommendations,
    roadmap90Days,
    troubleshooting,
  } = params;

  const generatedDate = new Date().toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  // Helper to format paragraphs
  const formatParagraphs = (text: string) =>
    text
      .split('\n\n')
      .map(p => `<p style="margin-bottom: 20px; font-size: 17px; line-height: 1.8;">${p}</p>`)
      .join('');

  // Group axes by category for heatmap
  const axesByCategory = Object.entries(scores.axes).reduce((acc, [name, score]) => {
    // Determine category (simplified mapping)
    let category = 'Autres';
    if (name.includes('metaboli') || name.includes('mitochondr') || name.includes('glucose') || name.includes('lipide')) category = 'Métabolisme';
    else if (name.includes('testosterone') || name.includes('oestrogen') || name.includes('cortisol') || name.includes('insulin') || name.includes('thyroid')) category = 'Hormones';
    else if (name.includes('dopamine') || name.includes('serotonin') || name.includes('gaba') || name.includes('noradrenaline')) category = 'Neurotransmetteurs';
    else if (name.includes('digest') || name.includes('microbiome') || name.includes('intestin')) category = 'Digestion';
    else if (name.includes('inflamm') || name.includes('immun')) category = 'Inflammation';

    if (!acc[category]) acc[category] = [];
    acc[category].push({ name, score });
    return acc;
  }, {} as Record<string, Array<{name: string, score: number}>>);

  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Scan Métabolique Premium - ${userName}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: linear-gradient(180deg, #0A0A0F 0%, #1A1A2E 100%);
      color: #FFFFFF;
      line-height: 1.9;
      padding: 40px 20px;
    }
    .container { max-width: 900px; margin: 0 auto; }
    .page {
      background: rgba(20, 20, 30, 0.8);
      border-radius: 16px;
      padding: 60px;
      margin-bottom: 40px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      page-break-after: always;
    }
    .page-title {
      font-size: 32px;
      font-weight: 700;
      background: linear-gradient(90deg, #00F5D4 0%, #A78BFA 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 32px;
    }
    .premium-badge {
      display: inline-block;
      background: linear-gradient(135deg, #FFD700, #FFA500);
      color: #000;
      padding: 8px 16px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 700;
      margin-bottom: 16px;
    }
    .axis-card {
      background: rgba(255,255,255,0.05);
      border-left: 4px solid #00F5D4;
      border-radius: 12px;
      padding: 24px;
      margin-bottom: 24px;
    }
    .heatmap-grid {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 12px;
      margin: 32px 0;
    }
    .heatmap-cell {
      aspect-ratio: 1;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      font-weight: 700;
    }
    .protocol-section {
      background: rgba(0,245,212,0.1);
      border: 2px solid #00F5D4;
      border-radius: 12px;
      padding: 32px;
      margin: 24px 0;
    }
  </style>
</head>
<body>
  <div class="container">

    <!-- PAGE 1: COVER PREMIUM -->
    <div class="page" style="text-align: center;">
      <div class="premium-badge">✨ RAPPORT PREMIUM ✨</div>
      <h1 style="font-size: 48px; margin-bottom: 24px; background: linear-gradient(90deg, #FFD700 0%, #00F5D4 50%, #A78BFA 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
        🔥 SCAN MÉTABOLIQUE COMPLET<br/>PREMIUM
      </h1>
      <p style="font-size: 28px; margin-bottom: 48px; color: #FFD700;">${userName}</p>
      <div style="font-size: 72px; color: #00F5D4; margin: 40px 0;">${scores.overall}</div>
      <div style="font-size: 20px; color: rgba(255,255,255,0.8);">/100</div>
      <p style="color: rgba(255,255,255,0.6); margin-top: 64px;">
        Généré le ${generatedDate}<br/>
        Analyse 40 axes • Protocoles détaillés • Roadmap 90 jours
      </p>
    </div>

    <!-- PAGE 2: INTRODUCTION PREMIUM -->
    <div class="page">
      <h2 class="page-title">📊 BIENVENUE DANS TON RAPPORT PREMIUM</h2>
      ${formatParagraphs(introduction)}
    </div>

    <!-- PAGE 3: MORPHOTYPE DÉTAILLÉ -->
    <div class="page">
      <h2 class="page-title">👤 ANALYSE MORPHOTYPE DÉTAILLÉE</h2>
      <div style="text-align: center; margin: 32px 0;">
        <div style="font-size: 18px; color: rgba(255,255,255,0.7); margin-bottom: 16px;">
          ${aiAnalysis.morphotype.dominant}
        </div>
        <div style="display: flex; justify-content: center; gap: 32px;">
          <div>
            <div style="font-size: 32px; color: #00F5D4;">${aiAnalysis.morphotype.ectomorphe}%</div>
            <div style="font-size: 14px;">Ectomorphe</div>
          </div>
          <div>
            <div style="font-size: 32px; color: #10B981;">${aiAnalysis.morphotype.mesomorphe}%</div>
            <div style="font-size: 14px;">Mésomorphe</div>
          </div>
          <div>
            <div style="font-size: 32px; color: #F59E0B;">${aiAnalysis.morphotype.endomorphe}%</div>
            <div style="font-size: 14px;">Endomorphe</div>
          </div>
        </div>
        <div style="margin-top: 32px;">
          <span style="font-size: 24px; color: #EF4444;">${aiAnalysis.morphotype.bodyfatEstime}%</span>
          <span style="color: rgba(255,255,255,0.6);"> bodyfat estimé</span>
        </div>
      </div>
      ${formatParagraphs(morphotypeAnalysis)}
    </div>

    <!-- PAGE 4: PROFIL MÉTABOLIQUE -->
    <div class="page">
      <h2 class="page-title">⚡ PROFIL MÉTABOLIQUE DÉTAILLÉ</h2>
      ${formatParagraphs(metabolicProfileAnalysis)}
    </div>

    <!-- PAGES 5-12: TOUS LES 40 AXES -->
    ${Object.entries(allAxesAnalysis).map(([axeName, analysis]) => `
      <div class="page">
        <div class="axis-card">
          <h3 style="font-size: 24px; margin-bottom: 16px; color: #00F5D4;">
            ${axeName}
            <span style="float: right; font-size: 32px;">${scores.axes[axeName as keyof typeof scores.axes]}</span>
          </h3>
          ${formatParagraphs(analysis)}
        </div>
      </div>
    `).join('')}

    <!-- PAGE: HEATMAP 40 AXES -->
    <div class="page">
      <h2 class="page-title">🗺️ HEATMAP COMPLÈTE - 40 AXES</h2>
      ${Object.entries(axesByCategory).map(([category, axes]) => `
        <h3 style="color: #00F5D4; margin: 24px 0 16px;">${category}</h3>
        <div class="heatmap-grid">
          ${axes.map(axis => {
            const color = axis.score >= 86 ? '#00F5D4' : axis.score >= 61 ? '#10B981' : axis.score >= 41 ? '#F59E0B' : '#EF4444';
            return `
              <div class="heatmap-cell" style="background: ${color}40; border: 2px solid ${color};" title="${axis.name}">
                ${axis.score}
              </div>
            `;
          }).join('')}
        </div>
      `).join('')}
    </div>

    <!-- PAGE: PROTOCOLE SUPPLÉMENTS -->
    <div class="page">
      <h2 class="page-title">💊 PROTOCOLE SUPPLÉMENTS DÉTAILLÉ</h2>
      <div class="protocol-section">
        ${formatParagraphs(supplementProtocol)}
      </div>
    </div>

    <!-- PAGE: PROTOCOLE NUTRITION -->
    <div class="page">
      <h2 class="page-title">🍽️ PROTOCOLE NUTRITION PERSONNALISÉ</h2>
      <div class="protocol-section">
        ${formatParagraphs(nutritionProtocol)}
      </div>
    </div>

    <!-- PAGE: PROTOCOLE TRAINING -->
    <div class="page">
      <h2 class="page-title">💪 PROTOCOLE TRAINING OPTIMISÉ</h2>
      <div class="protocol-section">
        ${formatParagraphs(trainingProtocol)}
      </div>
    </div>

    <!-- PAGE: BLOODWORK -->
    <div class="page">
      <h2 class="page-title">🔬 ANALYSES SANGUINES RECOMMANDÉES</h2>
      ${formatParagraphs(bloodworkRecommendations)}
    </div>

    <!-- PAGE: ROADMAP 90 JOURS -->
    <div class="page">
      <h2 class="page-title">🗺️ ROADMAP 90 JOURS</h2>
      <div class="protocol-section">
        ${formatParagraphs(roadmap90Days)}
      </div>
    </div>

    <!-- PAGE FINALE: TROUBLESHOOTING -->
    <div class="page">
      <h2 class="page-title">🛠️ TROUBLESHOOTING & PLAN B</h2>
      ${formatParagraphs(troubleshooting)}

      <div style="margin-top: 48px; text-align: center; padding: 32px; background: rgba(0,245,212,0.1); border-radius: 12px;">
        <p style="font-size: 18px; margin-bottom: 16px;">Questions ? Besoin d'ajustements ?</p>
        <p style="color: #00F5D4; font-size: 20px; font-weight: 700;">support@achzodcoaching.com</p>
        <p style="margin-top: 16px; color: rgba(255,255,255,0.6); font-size: 14px;">
          Réponse sous 48h maximum • Support premium inclus
        </p>
      </div>

      <div style="margin-top: 48px; text-align: center; color: rgba(255,255,255,0.6);">
        <p style="font-size: 18px; margin-bottom: 8px;">— AchZod</p>
        <p>Expert Métabolisme & Biohacking • 11 Certifications</p>
        <p>achzodcoaching.com</p>
      </div>
    </div>

  </div>
</body>
</html>
  `.trim();
}
