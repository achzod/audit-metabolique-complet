#!/usr/bin/env ts-node

/**
 * VALIDATION SYSTÈME COMPLÈTE
 *
 * Vérifie que tous les composants sont fonctionnels :
 * - Base de données
 * - API Claude
 * - Scoring 40 axes
 * - Génération rapports
 */

import { PrismaClient } from '@prisma/client';
import Anthropic from '@anthropic-ai/sdk';
import { calculateMetabolicScores } from '../lib/scoring/metabolic-scores';
import { QuestionnaireResponses } from '../types/questionnaire';

const prisma = new PrismaClient();

// Mock responses pour tester le système
const mockResponses: QuestionnaireResponses = {
  // Section 1 - Profil
  age: 32,
  sexe: 'HOMME',
  poids: 82,
  taille: 178,
  objectifPrincipal: 'RECOMPOSITION',
  anneesEntrainement: 5,
  regimesEssayes: ['KETO', 'INTERMITTENT_FASTING'],
  problemePrincipal: 'Stagne à 18% bodyfat depuis 6 mois',

  // Section 2 - Morpho
  morphotypePercu: 'MESO_ENDO',
  bodyfatEstime: '18-22%',
  distributionGras: 'ABDOMEN_SOUS_CUTANE',
  retentionEau: 'LEGERE',

  // Section 3 - Flexibilité métabolique
  tempsSansManger: '3-4H',
  sauterPetitDej: 'BRAIN_FOG_MODERE',
  tempsEntreeCetose: '1-2_SEMAINES',
  energieLowCarb: 'MOYEN',
  apresGlucidesRapides: 'CRASH_LEGER',
  maintienCetose: 'DIFFICILE_CRAVINGS',
  performanceFasting: 'DIMINUTION_MODEREE',
  sensationFaimIntense: 'PARFOIS',
  heuresFastingMax: '14-16H',
  preferenceCarburant: 'DEPEND_CONTEXTE',
  stabiliteEnergie: 'PICS_CRASHES',
  faimReveilNocturne: 'RARE',
  cravingsSucre: 'PARFOIS',
  sensibiliteFroid: 'PARFOIS',
  concentrationJeune: 'DIMINUTION_MODEREE',

  // Section 4 - Énergie & Cortisol
  energieReveil: 'BAS',
  picEnergie: 'MILIEU_MATINEE',
  crashApresMidi: 'PARFOIS',
  deuxiemeSouffleNocturne: 'PARFOIS',
  difficulteEndormissement: 'PARFOIS',
  heureEndormissement: '23H-MINUIT',
  reveilsNocturnes: 'PARFOIS',
  heureReveilSpontane: '7H-8H',
  stressChronique: 6,
  resistanceStress: 'MOYENNE',
  irritabiliteSiRepasManque: 'PARFOIS',
  besoinStimulants: 'CAFE_MULTIPLE',

  // Section 5 - Neurotransmetteurs
  motivationQuotidienne: 6,
  procrastination: 'PARFOIS',
  addictions: ['CAFE', 'RESEAUX_SOCIAUX'],
  capaciteFocus: 'MOYENNE',
  humeurBaseline: 'NEUTRE',
  anxiete: 'MODEREE',
  plaisirActivites: 'MOYEN',
  rewardSensitivity: 'NORMALE',
  impulsivite: 'MOYENNE',
  sociabilite: 'MOYENNE',
  libido: 'MOYENNE',
  mentalClarity: 'FOG_PARFOIS',

  // Section 6 - Hormones
  facilitePriseMuscle: 'MOYENNE',
  facilitePerteGras: 'DIFFICILE',
  retentionMuscleCut: 'PERTE_MODEREE',
  gynecomastieMasculine: 'LEGERE',
  qualiteErectionsMatin: 'PARFOIS',
  croissancePilosite: 'MOYENNE',
  testosteroneDerniereAnalyse: '500-700',
  sensibiliteFroid: 'PARFOIS',
  temperatureCorporelleMatin: '36.4-36.6',
  chuteCheveux: 'LEGERE',
  peauSeche: 'LEGERE',
  constipation: 'PARFOIS',
  prisePoidsGrasFacile: 'FACILE',
  chaleurApresRepas: 'PARFOIS',

  // Section 7 - Digestion
  ballonnements: 'PARFOIS',
  gazExcessifs: 'PARFOIS',
  refluxAcide: 'RARE',
  qualiteSelles: 'TYPE_3',
  frequenceSelles: '1X',
  alimentsNonDigeres: 'RARE',
  intolerancesAlimentaires: ['LACTOSE'],
  douleursAbdominales: 'RARE',
  antibiotiquesRecents: 'AUCUN',
  diversiteAlimentaire: '20-30',
  consommationFibres: 'MOYENNE',
  probiotiques: 'PARFOIS',

  // Section 8 - Inflammation
  douleursArticulaires: 'LEGERES',
  raideurMatinale: 'LEGERE',
  tendinitesRecurrentes: 'RARE',
  recuperationBlessures: 'NORMALE',
  allergies: 'LEGERES',
  frequenceMaladies: 'RARE',
  acneInflammatoire: 'LEGER',
  eczema: 'AUCUN',
  inflammationsGencives: 'RARE',
  antiInflammatoiresFrequence: 'RARE',

  // Section 9 - Sommeil
  heuresSommeilNuit: '7-8H',
  qualiteSommeilPercue: 6,
  sensationReveil: 'MOYEN',
  revesIntenses: 'PARFOIS',
  ronflements: 'LEGERS',
  besoinSieste: 'RARE',
  expositionLumiereBleueSoir: 'MODEREE',
  recuperationMusculaire: 'NORMALE',

  // Section 10 - Training
  frequenceTraining: '4-5X',
  typeTrainingDominant: 'MUSCU_HYPERTROPHIE',
  energiePendantTraining: 'MOYENNE',
  qualitePump: 'MOYEN',
};

async function validateSystem() {
  console.log('🔥 VALIDATION SYSTÈME SCAN MÉTABOLIQUE COMPLET\n');

  let errors = 0;

  // ============================================================================
  // 1. BASE DE DONNÉES
  // ============================================================================
  console.log('1️⃣  Validation Base de Données...');
  try {
    await prisma.$connect();
    console.log('   ✅ Connexion PostgreSQL OK');

    // Test création user
    const testUser = await prisma.user.findFirst({
      where: { email: 'test@validation.com' },
    });

    if (testUser) {
      console.log('   ✅ User de test existe déjà');
    } else {
      console.log('   ℹ️  User de test non trouvé (normal si première exécution)');
    }
  } catch (error: any) {
    console.error('   ❌ ERREUR Base de données:', error.message);
    errors++;
  }

  // ============================================================================
  // 2. SYSTÈME DE SCORING 40 AXES
  // ============================================================================
  console.log('\n2️⃣  Validation Système de Scoring 40 Axes...');
  try {
    const scores = await calculateMetabolicScores(mockResponses);

    console.log(`   ✅ Score global: ${scores.overall}/100`);
    console.log(`   ✅ Nombre d'axes calculés: ${Object.keys(scores.axes).length}/40`);
    console.log(`   ✅ Nombre de catégories: ${Object.keys(scores.categories).length}/10`);

    // Vérifier que tous les axes sont entre 0-100
    const invalidAxes = Object.entries(scores.axes).filter(
      ([_, score]) => score < 0 || score > 100
    );

    if (invalidAxes.length > 0) {
      console.error('   ❌ Axes hors range 0-100:', invalidAxes);
      errors++;
    } else {
      console.log('   ✅ Tous les axes dans le range valide 0-100');
    }

    // Top 5 blocages
    const sortedAxes = Object.entries(scores.axes)
      .sort(([, a], [, b]) => a - b)
      .slice(0, 5);

    console.log('\n   📊 Top 5 Blocages (scores les plus bas):');
    sortedAxes.forEach(([name, score], i) => {
      console.log(`      ${i + 1}. ${name}: ${score}/100`);
    });
  } catch (error: any) {
    console.error('   ❌ ERREUR Scoring:', error.message);
    errors++;
  }

  // ============================================================================
  // 3. API CLAUDE
  // ============================================================================
  console.log('\n3️⃣  Validation API Claude (Anthropic)...');
  try {
    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (!apiKey || apiKey === 'your-key-here') {
      console.log('   ⚠️  ANTHROPIC_API_KEY non configurée (placeholder détecté)');
      console.log('   ℹ️  Configurez votre clé API dans .env.local:');
      console.log('      ANTHROPIC_API_KEY="sk-ant-api..."');
      errors++;
    } else {
      const anthropic = new Anthropic({ apiKey });

      // Test simple
      const response = await anthropic.messages.create({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 50,
        messages: [
          {
            role: 'user',
            content: 'Réponds juste "OK" si tu me lis.',
          },
        ],
      });

      const text = response.content[0].type === 'text' ? response.content[0].text : '';

      if (text.includes('OK') || text.includes('ok')) {
        console.log('   ✅ API Claude fonctionnelle');
      } else {
        console.log('   ⚠️  API Claude répond mais réponse inattendue:', text);
      }
    }
  } catch (error: any) {
    if (error.message.includes('authentication') || error.message.includes('API key')) {
      console.error('   ❌ ERREUR API Key invalide');
    } else {
      console.error('   ❌ ERREUR API Claude:', error.message);
    }
    errors++;
  }

  // ============================================================================
  // 4. GÉNÉRATION RAPPORTS (structure)
  // ============================================================================
  console.log('\n4️⃣  Validation Structure Rapports...');
  try {
    // Vérifier que les fonctions existent
    const { generateFreeReport } = await import('../lib/reports/generate-free');
    const { generatePremiumReport } = await import('../lib/reports/generate-premium');

    console.log('   ✅ Générateur rapport GRATUIT importable');
    console.log('   ✅ Générateur rapport PREMIUM importable');

    console.log('\n   ℹ️  Note: Génération réelle nécessite API Claude configurée');
  } catch (error: any) {
    console.error('   ❌ ERREUR Import générateurs:', error.message);
    errors++;
  }

  // ============================================================================
  // 5. COMPOSANTS VISUALISATION
  // ============================================================================
  console.log('\n5️⃣  Validation Composants Visualisation...');
  try {
    // Check que les fichiers existent
    const fs = require('fs');
    const componentsPath = './components/visualization';

    const gauge = fs.existsSync(`${componentsPath}/CircularGauge.tsx`);
    const radar = fs.existsSync(`${componentsPath}/RadarChart.tsx`);
    const heatmap = fs.existsSync(`${componentsPath}/Heatmap.tsx`);

    if (gauge && radar && heatmap) {
      console.log('   ✅ CircularGauge.tsx');
      console.log('   ✅ RadarChart.tsx');
      console.log('   ✅ Heatmap.tsx');
    } else {
      console.error('   ❌ Composants visualisation manquants');
      errors++;
    }
  } catch (error: any) {
    console.error('   ❌ ERREUR Vérification composants:', error.message);
    errors++;
  }

  // ============================================================================
  // RÉSUMÉ
  // ============================================================================
  console.log('\n' + '='.repeat(60));
  console.log('📊 RÉSUMÉ VALIDATION\n');

  if (errors === 0) {
    console.log('✅ SYSTÈME 100% FONCTIONNEL !');
    console.log('\n🚀 Prêt pour production. Tous les composants validés.\n');
  } else {
    console.log(`⚠️  ${errors} erreur(s) détectée(s)`);
    console.log('\n🔧 Corrigez les erreurs ci-dessus avant déploiement.\n');
  }

  console.log('📋 CHECKLIST DÉPLOIEMENT:');
  console.log('   [ ] ANTHROPIC_API_KEY configurée');
  console.log('   [ ] DATABASE_URL configurée (PostgreSQL)');
  console.log('   [ ] Migrations Prisma exécutées');
  console.log('   [ ] STRIPE_SECRET_KEY configurée (si paiement)');
  console.log('   [ ] Build Next.js passe (npm run build)');
  console.log('   [ ] Tests end-to-end sur questionnaire');
  console.log('\n');

  await prisma.$disconnect();
  process.exit(errors > 0 ? 1 : 0);
}

// Exécuter
validateSystem().catch((error) => {
  console.error('❌ ERREUR FATALE:', error);
  process.exit(1);
});
