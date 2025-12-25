import Anthropic from '@anthropic-ai/sdk';
import { QuestionnaireResponses, MetabolicScores, AIAnalysis } from '@/types/questionnaire';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function analyzeWithClaude(
  responses: QuestionnaireResponses,
  scores: MetabolicScores,
  photos?: {
    photoFace?: string;
    photoBack?: string;
    photoSide?: string;
  }
): Promise<AIAnalysis> {
  // STEP 1: Analyze morphotype from photos (si disponibles)
  const morphotype = photos?.photoFace
    ? await analyzeMorphotypeFromPhotos(photos)
    : {
        ectomorphe: 33,
        mesomorphe: 33,
        endomorphe: 34,
        dominant: 'MESOMORPHE' as const,
        bodyfatEstime: 20,
        repartitionGras: 'Non analysé (photos non disponibles)',
        posture: [],
        desequilibres: [],
        pointsForts: [],
        pointsFaibles: [],
      };

  // STEP 2: Determine metabolic profile
  const metabolicProfile = determineMetabolicProfile(responses, scores);

  // STEP 3: Identify top 5 blockages (axes les plus faibles)
  const topBlockages = identifyTopBlockages(responses, scores);

  // STEP 4: Identify top 3 strengths (axes les plus forts)
  const topStrengths = identifyTopStrengths(scores);

  // STEP 5: Extract observations
  const observations = extractObservations(responses);

  return {
    morphotype,
    metabolicProfile,
    topBlockages,
    topStrengths,
    observations,
  };
}

async function analyzeMorphotypeFromPhotos(photos: {
  photoFace?: string;
  photoBack?: string;
  photoSide?: string;
}): Promise<AIAnalysis['morphotype']> {
  try {
    const messages: Anthropic.MessageParam[] = [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: `Tu es un expert en analyse morphologique. Analyse ces 3 photos (face, dos, profil) et estime:

1. MORPHOTYPE (% ectomorphe/mésomorphe/endomorphe)
2. BODYFAT ESTIMÉ (%)
3. RÉPARTITION MASSE GRASSE (abdomen viscéral/sous-cutané/hanches/cuisses/uniforme)
4. POSTURE (épaules enroulées/tête avancée/hyperlordose/cyphose/scoliose)
5. DÉSÉQUILIBRES MUSCULAIRES (épaule haute/rotation pelvienne/asymétries)
6. POINTS FORTS MUSCULAIRES (groupes surdéveloppés)
7. POINTS FAIBLES MUSCULAIRES (groupes sous-développés)
8. RÉTENTION D'EAU VISIBLE (chevilles/visage/abdomen)
9. VASCULARISATION (absent/légère/modérée/prononcée)
10. QUALITÉ PEAU (texture, élasticité, inflammation)

Réponds en JSON structuré.`,
          },
        ],
      },
    ];

    // Add photos as base64 images
    if (photos.photoFace) {
      messages[0].content.push({
        type: 'image',
        source: {
          type: 'base64',
          media_type: 'image/jpeg',
          data: photos.photoFace.split(',')[1],
        },
      });
    }

    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 2000,
      messages,
    });

    const analysis = JSON.parse(response.content[0].type === 'text' ? response.content[0].text : '{}');

    return {
      ectomorphe: analysis.morphotype?.ectomorphe || 33,
      mesomorphe: analysis.morphotype?.mesomorphe || 33,
      endomorphe: analysis.morphotype?.endomorphe || 34,
      dominant: analysis.morphotype?.dominant || 'MESOMORPHE',
      bodyfatEstime: analysis.bodyfat || 20,
      repartitionGras: analysis.repartitionGras || 'Uniforme',
      posture: analysis.posture || [],
      desequilibres: analysis.desequilibres || [],
      pointsForts: analysis.pointsForts || [],
      pointsFaibles: analysis.pointsFaibles || [],
    };
  } catch (error) {
    console.error('Erreur analyse photos:', error);
    // Return default values si erreur
    return {
      ectomorphe: 33,
      mesomorphe: 33,
      endomorphe: 34,
      dominant: 'MESOMORPHE',
      bodyfatEstime: 20,
      repartitionGras: 'Non analysé (erreur)',
      posture: [],
      desequilibres: [],
      pointsForts: [],
      pointsFaibles: [],
    };
  }
}

function determineMetabolicProfile(
  responses: QuestionnaireResponses,
  scores: MetabolicScores
) {
  const flexScore = scores.axes.flexibiliteMetabolique;

  let flexibility: AIAnalysis['metabolicProfile']['flexibility'];
  if (flexScore < 30) flexibility = 'CASSÉ';
  else if (flexScore < 45) flexibility = 'TRÈS_MAUVAIS';
  else if (flexScore < 60) flexibility = 'MAUVAIS';
  else if (flexScore < 75) flexibility = 'MOYEN';
  else if (flexScore < 85) flexibility = 'BON';
  else flexibility = 'EXCELLENT';

  // Glucose dependency
  let glucoseDependency: AIAnalysis['metabolicProfile']['glucoseDependency'];
  if (responses.tempsSansManger === '<2H') glucoseDependency = 'TOTALE';
  else if (responses.tempsSansManger === '2-3H') glucoseDependency = 'TRÈS_ÉLEVÉE';
  else if (responses.tempsSansManger === '3-4H') glucoseDependency = 'ÉLEVÉE';
  else if (responses.tempsSansManger === '4-6H') glucoseDependency = 'MODÉRÉE';
  else if (responses.tempsSansManger === '6-12H') glucoseDependency = 'FAIBLE';
  else glucoseDependency = 'ABSENTE';

  // Keto adaptation
  let ketoAdaptation: AIAnalysis['metabolicProfile']['ketoAdaptation'];
  if (responses.tempsEntreeCetose === 'JAMAIS_REUSSI') ketoAdaptation = 'IMPOSSIBLE';
  else if (responses.tempsEntreeCetose === '3-4_SEMAINES') ketoAdaptation = 'TRÈS_DIFFICILE';
  else if (responses.tempsEntreeCetose === '2-3_SEMAINES') ketoAdaptation = 'DIFFICILE';
  else if (responses.tempsEntreeCetose === '1-2_SEMAINES') ketoAdaptation = 'MOYENNE';
  else if (responses.tempsEntreeCetose === '3-7_JOURS') ketoAdaptation = 'FACILE';
  else ketoAdaptation = 'IMMÉDIATE';

  // Mitochondrial health
  const mitoScore = scores.axes.santeMitochondriale;
  let mitochondrialHealth: AIAnalysis['metabolicProfile']['mitochondrialHealth'];
  if (mitoScore < 40) mitochondrialHealth = 'ENDOMMAGÉES';
  else if (mitoScore < 55) mitochondrialHealth = 'COMPROMISES';
  else if (mitoScore < 70) mitochondrialHealth = 'MOYENNES';
  else if (mitoScore < 85) mitochondrialHealth = 'BONNES';
  else mitochondrialHealth = 'EXCELLENTES';

  return {
    flexibility,
    glucoseDependency,
    ketoAdaptation,
    mitochondrialHealth,
  };
}

function identifyTopBlockages(
  responses: QuestionnaireResponses,
  scores: MetabolicScores
): AIAnalysis['topBlockages'] {
  // Convert axes object to array with names
  const axesArray = Object.entries(scores.axes).map(([name, score]) => ({
    name,
    score,
  }));

  // Sort by score (ascending) and take top 5
  const weakest = axesArray.sort((a, b) => a.score - b.score).slice(0, 5);

  return weakest.map((axis) => ({
    axeName: axis.name,
    score: axis.score,
    category: axis.score < 50 ? 'CRITIQUE' : axis.score < 60 ? 'IMPORTANT' : 'MODÉRÉ',
    detectedSignals: getDetectedSignalsForAxis(axis.name, responses),
    impacts: getImpactsForAxis(axis.name, responses),
  }));
}

function identifyTopStrengths(scores: MetabolicScores): AIAnalysis['topStrengths'] {
  const axesArray = Object.entries(scores.axes).map(([name, score]) => ({
    axeName: name,
    score,
  }));

  // Sort by score (descending) and take top 3
  return axesArray.sort((a, b) => b.score - a.score).slice(0, 3);
}

function extractObservations(responses: QuestionnaireResponses): string[] {
  const observations: string[] = [];

  // Flexibilité métabolique
  if (responses.tempsSansManger === '<2H') {
    observations.push('brain fog si jeûne >2h');
  }

  // Glucose crashes
  if (responses.apresGlucidesRapides === 'CRASH_IMMEDIAT') {
    observations.push('crash après glucides');
  }

  // Cortisol
  if (responses.deuxiemeSouffleNocturne === 'OUI_SYSTEMATIQUE') {
    observations.push('cortisol inversé détecté');
  }

  // Dopamine
  if (responses.procrastination === 'CONSTANTE') {
    observations.push('procrastination chronique');
  }

  // Inflammation
  if (responses.douleursArticulaires === 'SEVERES') {
    observations.push('douleurs articulaires sévères');
  }

  // ... ajouter plus d'observations selon réponses

  return observations;
}

function getDetectedSignalsForAxis(axeName: string, responses: QuestionnaireResponses): string[] {
  // Map signals based on axis name
  // Exemple pour dopamine:
  if (axeName === 'dopamine') {
    return [
      `Motivation ${responses.motivationQuotidienne}/10`,
      `Procrastination: ${responses.procrastination}`,
      `Addictions: ${responses.addictions?.length || 0}`,
      `Focus: ${responses.capaciteFocus}`,
    ];
  }

  // ... mapper pour chaque axe
  return [];
}

function getImpactsForAxis(axeName: string, responses: QuestionnaireResponses): string[] {
  // Map impacts based on axis
  if (axeName === 'dopamine') {
    return [
      'Impossibilité rester consistant nutrition',
      'Abandon projets mi-chemin',
      'Cravings sucre/stimulants constants',
    ];
  }

  // ... mapper pour chaque axe
  return [];
}
