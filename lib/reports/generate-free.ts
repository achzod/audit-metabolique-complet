import Anthropic from '@anthropic-ai/sdk';
import { QuestionnaireResponses, MetabolicScores, AIAnalysis } from '@/types/questionnaire';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

interface GenerateFreeReportParams {
  userName: string;
  responses: any;
  scores: MetabolicScores;
  aiAnalysis: AIAnalysis;
}

export async function generateFreeReport(params: GenerateFreeReportParams): Promise<string> {
  const { userName, responses, scores, aiAnalysis } = params;

  console.log('📝 Génération rapport GRATUIT...');

  // ÉTAPE 1: Générer l'introduction personnalisée
  console.log('1/6 - Génération introduction...');
  const introduction = await generateIntroduction(userName, scores, aiAnalysis);

  // ÉTAPE 2: Générer l'explication du score
  console.log('2/6 - Génération explication score...');
  const scoreExplanation = await generateScoreExplanation(userName, scores, aiAnalysis);

  // ÉTAPE 3: Générer les 5 analyses de blocages
  console.log('3/6 - Génération analyses blocages...');
  const blockageAnalyses = await Promise.all(
    aiAnalysis.topBlockages.map((blockage, index) =>
      generateBlockageAnalysis(userName, blockage, index + 1, responses, scores)
    )
  );

  // ÉTAPE 4: Générer le stack suppléments baseline
  console.log('4/6 - Génération stack suppléments...');
  const supplementStack = await generateSupplementStack(aiAnalysis.topBlockages);

  // ÉTAPE 5: Générer le CTA upgrade premium
  console.log('5/6 - Génération CTA upgrade...');
  const ctaUpgrade = generateCTAUpgrade(userName);

  // ÉTAPE 6: Assembler le HTML final
  console.log('6/6 - Assemblage HTML...');
  const htmlContent = assembleHTMLReport({
    userName,
    scores,
    aiAnalysis,
    introduction,
    scoreExplanation,
    blockageAnalyses,
    supplementStack,
    ctaUpgrade,
  });

  return htmlContent;
}

// ============================================================================
// GÉNÉRATION INTRODUCTION (PAGE 2)
// ============================================================================

async function generateIntroduction(
  userName: string,
  scores: MetabolicScores,
  aiAnalysis: AIAnalysis
): Promise<string> {
  const optimizationPotential = 100 - scores.overall;
  const metabolicCategory = getMetabolicCategory(scores.overall);

  const observations = aiAnalysis.observations.slice(0, 5).join('", "');

  const prompt = `Tu es AchZod, expert métabolisme avec 11 certifications et 5000+ transformations.

Rédige l'introduction du rapport gratuit en prose narrative fluide, ton expert mais accessible, comme si tu parlais directement à ${userName}.

STRUCTURE (4-5 paragraphes) :

Paragraphe 1 :
Salutation personnelle et explication de l'analyse. Exemple :
"Salut ${userName}, j'ai analysé en détail tes 100 réponses ainsi que tes photos pour établir ton profil métabolique complet. Après 10 ans à optimiser le métabolisme de milliers de personnes, j'ai développé un système d'analyse qui va bien au-delà des simples recommandations génériques."

Paragraphe 2 :
Annonce du score et ce que ça signifie concrètement. Lier au CONTEXTE SPÉCIFIQUE du client basé sur ses réponses. Exemple :
"Ton score métabolique global se situe à ${scores.overall} sur 100, ce qui te place dans la catégorie ${metabolicCategory}. Ce n'est ni catastrophique ni optimal, et c'est exactement ce que je vois chez quelqu'un qui [INSÉRER OBSERVATIONS BASÉES SUR SES RÉPONSES - ex: "${observations}"]. La bonne nouvelle, c'est qu'il y a ${optimizationPotential} points d'amélioration possibles, et je vais te montrer exactement comment les débloquer."

Paragraphe 3 :
Expliquer ce que contient ce rapport gratuit. Rester factuel. Exemple :
"Dans ce diagnostic gratuit, tu vas découvrir tes 5 blocages métaboliques principaux qui expliquent pourquoi tu stagnes actuellement, un aperçu de ton profil hormonal et neurotransmetteurs, et des quick wins actionnables immédiatement pour commencer à progresser dès aujourd'hui."

Paragraphe 4 :
Transition vers le contenu. Ton motivant. Exemple :
"Je ne vais pas te noyer sous des généralités. Chaque insight que tu vas lire est directement tiré de TES réponses spécifiques et de mon analyse experte de TON profil unique. C'est parti."

Paragraphe 5 :
Signature simple.
"— AchZod
Expert Métabolisme & Biohacking • 11 Certifications"

RÈGLES ABSOLUES :
- JAMAIS de bullet points
- TOUJOURS en paragraphes fluides
- Phrases complètes, variations de longueur (10-25 mots)
- Vocabulaire technique expliqué simplement
- Lier systématiquement aux DONNÉES CLIENT spécifiques
- Ton professionnel mais chaleureux, pas corporate
- Pas de bullshit motivationnel creux
- Factuel et honnête

Réponds UNIQUEMENT avec les paragraphes, pas de markdown, pas de titre.`;

  const response = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 2000,
    messages: [{ role: 'user', content: prompt }],
  });

  return response.content[0].type === 'text' ? response.content[0].text : '';
}

// ============================================================================
// GÉNÉRATION EXPLICATION SCORE (PAGE 3)
// ============================================================================

async function generateScoreExplanation(
  userName: string,
  scores: MetabolicScores,
  aiAnalysis: AIAnalysis
): Promise<string> {
  const topStrengths = aiAnalysis.topStrengths.slice(0, 3);
  const topWeaknesses = aiAnalysis.topBlockages.slice(0, 5);

  const prompt = `Tu es AchZod. Rédige un paragraphe interprétatif pour expliquer le score métabolique de ${userName}.

DONNÉES :
- Score global : ${scores.overall}/100
- Top 3 forces : ${topStrengths.map(s => `${s.axeName} (${s.score}/100)`).join(', ')}
- Top 5 blocages : ${topWeaknesses.map(b => `${b.axeName} (${b.score}/100)`).join(', ')}
- Catégories faibles : ${Object.entries(scores.categories)
    .filter(([_, score]) => score < 60)
    .map(([cat, score]) => `${cat} (${score}/100)`)
    .join(', ')}

STRUCTURE (1 paragraphe, 8-10 phrases) :

"Ton métabolisme fonctionne à ${scores.overall}% de son potentiel optimal. Tes points forts se situent au niveau de ${topStrengths[0].axeName} et ${topStrengths[1].axeName}, ce qui indique que tu as une bonne base physiologique à exploiter. En revanche, les 5 blocages identifiés ci-dessus expliquent précisément pourquoi tu stagnes malgré tes efforts. Le plus critique est ton ${topWeaknesses[0].axeName} à ${topWeaknesses[0].score}/100, qui sabote directement ta capacité à [IMPACT SPÉCIFIQUE basé sur l'axe]. Dans les pages suivantes, je vais détailler chacun de ces blocages et te donner des solutions concrètes."

RÈGLES :
- Prose narrative fluide
- Phrases variées 10-25 mots
- Lier aux impacts physiologiques réels
- Ton professionnel et factuel

Réponds UNIQUEMENT avec le paragraphe.`;

  const response = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 1500,
    messages: [{ role: 'user', content: prompt }],
  });

  return response.content[0].type === 'text' ? response.content[0].text : '';
}

// ============================================================================
// GÉNÉRATION ANALYSE BLOCAGE (PAGES 4-8)
// ============================================================================

async function generateBlockageAnalysis(
  userName: string,
  blockage: AIAnalysis['topBlockages'][0],
  blockageNumber: number,
  responses: any,
  scores: MetabolicScores
): Promise<{ title: string; content: string }> {
  const relevantResponses = getRelevantResponses(blockage.axeName, responses);

  const prompt = `Tu es AchZod. Rédige l'analyse du BLOCAGE #${blockageNumber} pour ${userName}.

DONNÉES BLOCAGE :
- Nom : ${blockage.axeName}
- Score : ${blockage.score}/100
- Catégorie : ${blockage.category}
- Signaux détectés : ${blockage.detectedSignals.join(', ')}
- Impacts : ${blockage.impacts.join(', ')}
- Réponses client pertinentes : ${JSON.stringify(relevantResponses)}

STRUCTURE (prose narrative, 5-7 paragraphes) :

Paragraphe 1 - ANNONCE DU BLOCAGE :
"Blocage #${blockageNumber} : ${blockage.axeName}. Score : ${blockage.score}/100. [Qualifier la sévérité selon catégorie]."

Paragraphe 2 - CE QUE J'AI DÉTECTÉ :
Lister en PROSE (pas bullet points) les signaux spécifiques du client qui ont permis d'identifier ce blocage. Utiliser les données réelles fournies.

Paragraphe 3 - POURQUOI C'EST PROBLÉMATIQUE :
Expliquer la physiologie de manière accessible. Lier aux problèmes concrets du client. Utiliser des termes comme "cortisol", "mitochondries", "dopamine", "insuline" mais les expliquer simplement.

Paragraphe 4 - IMPACT SUR TA VIE :
Décrire concrètement comment ce blocage affecte le client au quotidien. Utiliser les impacts passés en paramètre.

Paragraphes 5-7 - QUICK WINS (3-4 max) :
Pour chaque quick win, expliquer en 2-3 phrases QUOI faire et POURQUOI. Être spécifique et actionnable.

Exemple de quick win :
"Premier quick win immédiat : déplace ton training du soir au matin. Quand tu t'entraînes le matin, tu crées un spike cortisol au moment où il doit naturellement être élevé, ce qui renforce ton rythme circadien au lieu de le perturber."

RÈGLES :
- Prose narrative fluide, jamais de bullet points
- Vocabulaire expert mais accessible
- Lier SYSTÉMATIQUEMENT aux données client spécifiques
- Phrases variées 10-25 mots
- Ton professionnel, factuel, pas de bullshit
- Expliquer le POURQUOI physiologique simplement

Réponds UNIQUEMENT avec les paragraphes.`;

  const response = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 3000,
    messages: [{ role: 'user', content: prompt }],
  });

  const content = response.content[0].type === 'text' ? response.content[0].text : '';

  return {
    title: `Blocage #${blockageNumber}: ${blockage.axeName}`,
    content,
  };
}

// ============================================================================
// GÉNÉRATION STACK SUPPLÉMENTS (PAGE FINALE)
// ============================================================================

async function generateSupplementStack(
  topBlockages: AIAnalysis['topBlockages']
): Promise<string> {
  const blockagesInfo = topBlockages
    .map((b, i) => `${i + 1}. ${b.axeName} (${b.score}/100) - ${b.category}`)
    .join('\n');

  const prompt = `Tu es AchZod. Rédige un stack suppléments BASELINE pour ces blocages :

${blockagesInfo}

STRUCTURE (prose narrative, PAS de bullet points) :

Organise par timing de prise (MATIN À JEUN / MATIN AVEC REPAS / MIDI / SOIR / AVANT COUCHER).

Pour chaque timing, liste en PROSE les suppléments avec dosages précis et rôle bref.

Exemple :
"Le matin à jeun, je te recommande 1500 milligrammes de L-Tyrosine pour booster ta production de dopamine, ainsi que 600 milligrammes d'Ashwagandha KSM-66 pour réguler ton cortisol. Avec ton petit-déjeuner gras, prends 5000 UI de vitamine D3 combinée à 200 microgrammes de vitamine K2 MK-7 pour optimiser ta testostérone et ta santé osseuse, 10 milligrammes de bore pour réduire ta SHBG et augmenter ta testostérone libre, et 3 grammes d'oméga-3 EPA/DHA pour réduire ton inflammation systémique..."

Termine avec :
"COÛT ESTIMÉ : ~[montant]€/mois

Note : Ceci est un stack baseline général. Pour un protocole EXACT personnalisé avec dosages précis, timing optimal, cycles, interactions, et marques recommandées → Upgrade premium."

RÈGLES :
- Prose fluide uniquement
- Dosages précis avec unités
- Rôle expliqué en 1 phrase par supplément
- Coût estimé réaliste

Réponds UNIQUEMENT avec la prose.`;

  const response = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 2500,
    messages: [{ role: 'user', content: prompt }],
  });

  return response.content[0].type === 'text' ? response.content[0].text : '';
}

// ============================================================================
// CTA UPGRADE PREMIUM
// ============================================================================

function generateCTAUpgrade(userName: string): string {
  return `Tu connais maintenant tes 5 blocages métaboliques principaux et tu as des quick wins actionnables pour commencer à progresser dès aujourd'hui. Ce diagnostic gratuit te donne les fondations, mais si tu veux une analyse COMPLÈTE avec les 40 axes détaillés en profondeur, des protocoles ultra-précis avec dosages exacts, cycles, interactions, une roadmap 90 jours phase par phase, des protocoles nutrition et training sur-mesure, les analyses sanguines recommandées avec interprétation experte, un dashboard premium avec tracking illimité, et un plan B si le protocole ne fonctionne pas comme prévu, alors l'analyse premium à 79€ est faite pour toi.`;
}

// ============================================================================
// ASSEMBLAGE HTML FINAL
// ============================================================================

function assembleHTMLReport(params: {
  userName: string;
  scores: MetabolicScores;
  aiAnalysis: AIAnalysis;
  introduction: string;
  scoreExplanation: string;
  blockageAnalyses: Array<{ title: string; content: string }>;
  supplementStack: string;
  ctaUpgrade: string;
}): string {
  const { userName, scores, aiAnalysis, introduction, scoreExplanation, blockageAnalyses, supplementStack, ctaUpgrade } = params;

  const metabolicCategory = getMetabolicCategory(scores.overall);
  const generatedDate = new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
  const generatedTime = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });

  const topStrengths = aiAnalysis.topStrengths.slice(0, 3);
  const topWeaknesses = aiAnalysis.topBlockages.slice(0, 5);

  // HTML avec styles inline pour compatibilité email/PDF
  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Scan Métabolique Complet - ${userName}</title>
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
    }
    .page-title {
      font-size: 32px;
      font-weight: 700;
      background: linear-gradient(90deg, #00F5D4 0%, #A78BFA 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 32px;
    }
    .score-gauge {
      width: 300px;
      height: 300px;
      margin: 40px auto;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .score-number {
      font-size: 72px;
      font-weight: 700;
      color: ${getScoreColor(scores.overall)};
    }
    .score-label {
      font-size: 20px;
      color: rgba(255,255,255,0.8);
      margin-top: 8px;
    }
    .blockage-card {
      background: linear-gradient(135deg, rgba(239,68,68,0.1) 0%, rgba(220,38,38,0.05) 100%);
      border-left: 4px solid ${getBlockageCategoryColor(aiAnalysis.topBlockages[0]?.category || 'MODÉRÉ')};
      border-radius: 12px;
      padding: 32px;
      margin-bottom: 32px;
    }
    .blockage-title {
      font-size: 24px;
      font-weight: 600;
      margin-bottom: 24px;
    }
    .blockage-content p {
      margin-bottom: 20px;
      font-size: 17px;
      line-height: 1.9;
    }
    .cta-box {
      background: linear-gradient(135deg, #00F5D4 0%, #A78BFA 100%);
      border-radius: 16px;
      padding: 40px;
      text-align: center;
      margin-top: 40px;
    }
    .cta-button {
      display: inline-block;
      background: #FFFFFF;
      color: #0A0A0F;
      padding: 16px 48px;
      border-radius: 12px;
      font-size: 18px;
      font-weight: 700;
      text-decoration: none;
      margin-top: 24px;
    }
    .strengths-weaknesses {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 32px;
      margin: 32px 0;
    }
    .strength-item, .weakness-item {
      padding: 16px;
      border-radius: 8px;
      background: rgba(255,255,255,0.05);
    }
    .strength-item { border-left: 3px solid #10B981; }
    .weakness-item { border-left: 3px solid #EF4444; }
  </style>
</head>
<body>
  <div class="container">

    <!-- PAGE 1: COVER -->
    <div class="page" style="text-align: center;">
      <h1 style="font-size: 48px; margin-bottom: 24px; background: linear-gradient(90deg, #00F5D4 0%, #A78BFA 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
        🔥 SCAN MÉTABOLIQUE COMPLET
      </h1>
      <p style="font-size: 24px; margin-bottom: 48px;">${userName}</p>

      <div class="score-gauge">
        <div style="text-align: center;">
          <div class="score-number">${scores.overall}</div>
          <div style="font-size: 20px; color: rgba(255,255,255,0.6);">/100</div>
          <div class="score-label">${metabolicCategory}</div>
          <div style="font-size: 14px; color: rgba(255,255,255,0.5); margin-top: 16px;">
            Potentiel +${100 - scores.overall} points
          </div>
        </div>
      </div>

      <p style="color: rgba(255,255,255,0.6); margin-top: 48px;">
        Généré le ${generatedDate} à ${generatedTime}
      </p>
    </div>

    <!-- PAGE 2: INTRODUCTION -->
    <div class="page">
      <h2 class="page-title">📊 TON PROFIL MÉTABOLIQUE</h2>
      ${introduction.split('\n\n').map(p => `<p style="margin-bottom: 24px; font-size: 17px;">${p}</p>`).join('')}
    </div>

    <!-- PAGE 3: SCORE & TOP FORCES/BLOCAGES -->
    <div class="page">
      <h2 class="page-title">📊 TON SCORE MÉTABOLIQUE GLOBAL</h2>

      <div class="score-gauge">
        <div style="text-align: center;">
          <div class="score-number">${scores.overall}</div>
          <div style="font-size: 20px; color: rgba(255,255,255,0.6);">/100</div>
          <div class="score-label">${metabolicCategory}</div>
        </div>
      </div>

      <div class="strengths-weaknesses">
        <div>
          <h3 style="color: #10B981; margin-bottom: 16px;">✓ TOP 3 POINTS FORTS</h3>
          ${topStrengths.map(s => `
            <div class="strength-item">
              <strong>${s.axeName}</strong>: ${s.score}/100
            </div>
          `).join('')}
        </div>

        <div>
          <h3 style="color: #EF4444; margin-bottom: 16px;">⚠️ TOP 5 BLOCAGES</h3>
          ${topWeaknesses.map(b => `
            <div class="weakness-item">
              <strong>${b.axeName}</strong>: ${b.score}/100
            </div>
          `).join('')}
        </div>
      </div>

      <div style="margin-top: 32px;">
        ${scoreExplanation.split('\n\n').map(p => `<p style="margin-bottom: 20px; font-size: 17px;">${p}</p>`).join('')}
      </div>
    </div>

    <!-- PAGES 4-8: BLOCAGES -->
    ${blockageAnalyses.map((analysis, index) => `
      <div class="page">
        <div class="blockage-card">
          <h2 class="blockage-title">
            🔴 ${analysis.title}
            <span style="font-size: 16px; color: rgba(255,255,255,0.7);">
              [${aiAnalysis.topBlockages[index].category}]
            </span>
          </h2>
          <div class="blockage-content">
            ${analysis.content.split('\n\n').map(p => `<p>${p}</p>`).join('')}
          </div>
        </div>
      </div>
    `).join('')}

    <!-- PAGE FINALE: SUPPLÉMENTS + CTA -->
    <div class="page">
      <h2 class="page-title">💊 STACK SUPPLÉMENTS BASELINE</h2>
      <p style="margin-bottom: 32px; color: rgba(255,255,255,0.7);">
        (basé sur tes 5 blocages principaux)
      </p>

      <div style="font-size: 17px;">
        ${supplementStack.split('\n\n').map(p => `<p style="margin-bottom: 20px;">${p}</p>`).join('')}
      </div>

      <div style="margin-top: 48px; padding: 32px; background: rgba(255,255,255,0.05); border-radius: 12px;">
        <h3 style="margin-bottom: 16px;">🚀 PROCHAINES ÉTAPES</h3>
        <p style="font-size: 17px; line-height: 1.8;">${ctaUpgrade}</p>

        <div class="cta-box">
          <a href="/upgrade?from=free-report" class="cta-button">
            DÉBLOQUER ANALYSE PREMIUM - 79€ ►
          </a>
          <p style="margin-top: 16px; color: rgba(0,0,0,0.7); font-size: 14px;">
            ✓ Satisfait ou remboursé 14 jours<br>
            ✓ Livraison sous 24h maximum
          </p>
        </div>
      </div>

      <div style="margin-top: 48px; text-align: center; color: rgba(255,255,255,0.6);">
        <p>— AchZod</p>
        <p>achzodcoaching.com</p>
      </div>
    </div>

  </div>
</body>
</html>
  `.trim();
}

// ============================================================================
// HELPERS
// ============================================================================

function getMetabolicCategory(score: number): string {
  if (score >= 86) return 'Métabolisme Optimal';
  if (score >= 61) return 'Métabolisme Bon';
  if (score >= 41) return 'Métabolisme Moyen';
  return 'Métabolisme Ralenti';
}

function getScoreColor(score: number): string {
  if (score >= 86) return '#00F5D4';
  if (score >= 61) return '#10B981';
  if (score >= 41) return '#F59E0B';
  return '#EF4444';
}

function getBlockageCategoryColor(category: string): string {
  if (category === 'CRITIQUE') return '#EF4444';
  if (category === 'IMPORTANT') return '#F59E0B';
  return '#10B981';
}

function getRelevantResponses(axeName: string, responses: any): Partial<QuestionnaireResponses> {
  // Map relevant responses based on axis
  const mapping: Record<string, (keyof QuestionnaireResponses)[]> = {
    dopamine: ['motivationQuotidienne', 'procrastination', 'addictions', 'capaciteFocus'],
    flexibiliteMetabolique: ['tempsSansManger', 'sauterPetitDej', 'tempsEntreeCetose', 'energieLowCarb'],
    patternCortisol: ['energieReveil', 'picEnergie', 'deuxiemeSouffleNocturne', 'heureEndormissement'],
    // ... mapper tous les axes
  };

  const relevantKeys = mapping[axeName] || [];
  const relevant: any = {};
  relevantKeys.forEach(key => {
    relevant[key] = responses[key];
  });

  return relevant;
}
