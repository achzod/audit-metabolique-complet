import { QuestionnaireResponses, MetabolicScores } from '@/types/questionnaire';

/**
 * SYSTÈME DE SCORING 40 AXES MÉTABOLIQUES
 *
 * Chaque axe est scoré de 0 à 100 basé sur les réponses du questionnaire
 *
 * Logique:
 * - Réponses critiques 🚨 → score bas (0-40)
 * - Réponses moyennes → score moyen (41-70)
 * - Réponses optimales ✓ → score élevé (71-100)
 */

export async function calculateMetabolicScores(
  responses: QuestionnaireResponses
): Promise<MetabolicScores> {
  // ============================================================================
  // CATÉGORIE: MÉTABOLISME & ÉNERGIE
  // ============================================================================

  const flexibiliteMetabolique = calculateFlexibiliteMetabolique(responses);
  const switchingCarburant = calculateSwitchingCarburant(responses);
  const santeMitochondriale = calculateSanteMitochondriale(responses);
  const utilisationGlucose = calculateUtilisationGlucose(responses);
  const utilisationLipides = calculateUtilisationLipides(responses);

  // ============================================================================
  // CATÉGORIE: HORMONES
  // ============================================================================

  const testosterone = calculateTestosterone(responses);
  const oestrogenes = calculateOestrogenes(responses);
  const cortisol = calculateCortisol(responses);
  const patternCortisol = calculatePatternCortisol(responses);
  const sensibiliteInsuline = calculateSensibiliteInsuline(responses);
  const fonctionThyroidienne = calculateFonctionThyroidienne(responses);
  const t3Libre = fonctionThyroidienne; // Proxy
  const t4Libre = fonctionThyroidienne; // Proxy

  // ============================================================================
  // CATÉGORIE: NEUROTRANSMETTEURS
  // ============================================================================

  const dopamine = calculateDopamine(responses);
  const sensibiliteRecepteursD2 = calculateSensibiliteRecepteursD2(responses);
  const serotonine = calculateSerotonine(responses);
  const gaba = calculateGABA(responses);
  const noradrenaline = calculateNoradrenaline(responses);
  const equilibreNeurotransmetteurs = Math.round(
    (dopamine + serotonine + gaba + noradrenaline) / 4
  );

  // ============================================================================
  // CATÉGORIE: DIGESTION & MICROBIOME
  // ============================================================================

  const santéDigestive = calculateSanteDigestive(responses);
  const diversiteMicrobiome = calculateDiversiteMicrobiome(responses);
  const integritéIntestinale = calculateIntegriteIntestinale(responses);
  const productionEnzymes = calculateProductionEnzymes(responses);
  const absorptionNutriments = santéDigestive; // Proxy

  // ============================================================================
  // CATÉGORIE: INFLAMMATION & IMMUNITÉ
  // ============================================================================

  const inflammationSystemique = calculateInflammationSystemique(responses);
  const marqueursCRP = inflammationSystemique; // Proxy
  const stressOxydatif = calculateStressOxydatif(responses);
  const fonctionImmunitaire = calculateFonctionImmunitaire(responses);

  // ============================================================================
  // CATÉGORIE: CARDIOVASCULAIRE
  // ============================================================================

  const santeCardiovasculaire = calculateSanteCardiovasculaire(responses);
  const circulationSanguine = santeCardiovasculaire; // Proxy
  const pressionArterielle = santeCardiovasculaire; // Proxy
  const profilLipidique = calculateProfilLipidique(responses);

  // ============================================================================
  // CATÉGORIE: DÉTOXIFICATION
  // ============================================================================

  const fonctionHepatique = calculateFonctionHepatique(responses);
  const phaseIDetox = fonctionHepatique; // Proxy
  const phaseIIDetox = fonctionHepatique; // Proxy

  // ============================================================================
  // CATÉGORIE: BIOMÉCANIQUE & ARTICULATIONS
  // ============================================================================

  const santeArticulaire = calculateSanteArticulaire(responses);
  const qualiteCollagene = calculateQualiteCollagene(responses);
  const posture = 70; // TODO: analyse photos IA
  const equilibresMusculaires = 70; // TODO: analyse photos IA

  // ============================================================================
  // CATÉGORIE: SOMMEIL & RÉCUPÉRATION
  // ============================================================================

  const qualiteSommeil = calculateQualiteSommeil(responses);
  const sommesProfond = qualiteSommeil; // Proxy
  const sommeilREM = calculateSommeilREM(responses);
  const recuperation = calculateRecuperation(responses);

  // ============================================================================
  // CATÉGORIE: PERFORMANCE
  // ============================================================================

  const performanceAnaerobie = calculatePerformanceAnaerobie(responses);
  const performanceAerobie = calculatePerformanceAerobie(responses);
  const capaciteRecuperation = recuperation; // Proxy

  // ============================================================================
  // CALCUL MOYENNES PAR CATÉGORIE
  // ============================================================================

  const categorieMetabolisme = Math.round(
    (flexibiliteMetabolique +
      switchingCarburant +
      santeMitochondriale +
      utilisationGlucose +
      utilisationLipides) /
      5
  );

  const categorieHormones = Math.round(
    (testosterone +
      oestrogenes +
      cortisol +
      patternCortisol +
      sensibiliteInsuline +
      fonctionThyroidienne +
      t3Libre +
      t4Libre) /
      8
  );

  const categorieNeurotransmetteurs = Math.round(
    (dopamine +
      sensibiliteRecepteursD2 +
      serotonine +
      gaba +
      noradrenaline +
      equilibreNeurotransmetteurs) /
      6
  );

  const categorieDigestion = Math.round(
    (santéDigestive +
      diversiteMicrobiome +
      integritéIntestinale +
      productionEnzymes +
      absorptionNutriments) /
      5
  );

  const categorieInflammation = Math.round(
    (inflammationSystemique +
      marqueursCRP +
      stressOxydatif +
      fonctionImmunitaire) /
      4
  );

  const categorieCardiovasculaire = Math.round(
    (santeCardiovasculaire +
      circulationSanguine +
      pressionArterielle +
      profilLipidique) /
      4
  );

  const categorieDetoxification = Math.round(
    (fonctionHepatique + phaseIDetox + phaseIIDetox) / 3
  );

  const categorieBiomecanique = Math.round(
    (santeArticulaire +
      qualiteCollagene +
      posture +
      equilibresMusculaires) /
      4
  );

  const categorieSommeil = Math.round(
    (qualiteSommeil + sommesProfond + sommeilREM + recuperation) / 4
  );

  const categoriePerformance = Math.round(
    (performanceAnaerobie +
      performanceAerobie +
      capaciteRecuperation) /
      3
  );

  // ============================================================================
  // SCORE GLOBAL (moyenne des 10 catégories)
  // ============================================================================

  const overall = Math.round(
    (categorieMetabolisme +
      categorieHormones +
      categorieNeurotransmetteurs +
      categorieDigestion +
      categorieInflammation +
      categorieCardiovasculaire +
      categorieDetoxification +
      categorieBiomecanique +
      categorieSommeil +
      categoriePerformance) /
      10
  );

  return {
    overall,
    axes: {
      flexibiliteMetabolique,
      switchingCarburant,
      santeMitochondriale,
      utilisationGlucose,
      utilisationLipides,
      testosterone,
      oestrogenes,
      cortisol,
      patternCortisol,
      sensibiliteInsuline,
      fonctionThyroidienne,
      t3Libre,
      t4Libre,
      dopamine,
      sensibiliteRecepteursD2,
      serotonine,
      gaba,
      noradrenaline,
      equilibreNeurotransmetteurs,
      santéDigestive,
      diversiteMicrobiome,
      integritéIntestinale,
      productionEnzymes,
      absorptionNutriments,
      inflammationSystemique,
      marqueursCRP,
      stressOxydatif,
      fonctionImmunitaire,
      santeCardiovasculaire,
      circulationSanguine,
      pressionArterielle,
      profilLipidique,
      fonctionHepatique,
      phaseIDetox,
      phaseIIDetox,
      santeArticulaire,
      qualiteCollagene,
      posture,
      equilibresMusculaires,
      qualiteSommeil,
      sommesProfond,
      sommeilREM,
      recuperation,
      performanceAnaerobie,
      performanceAerobie,
      capaciteRecuperation,
    },
    categories: {
      metabolisme: categorieMetabolisme,
      hormones: categorieHormones,
      neurotransmetteurs: categorieNeurotransmetteurs,
      digestion: categorieDigestion,
      inflammation: categorieInflammation,
      cardiovasculaire: categorieCardiovasculaire,
      detoxification: categorieDetoxification,
      biomecanique: categorieBiomecanique,
      sommeil: categorieSommeil,
      performance: categoriePerformance,
    },
  };
}

// ============================================================================
// FONCTIONS DE CALCUL PAR AXE
// ============================================================================

function calculateFlexibiliteMetabolique(responses: QuestionnaireResponses): number {
  let score = 50; // Base

  // Temps sans manger
  if (responses.tempsSansManger === '<2H') score -= 30;
  else if (responses.tempsSansManger === '2-3H') score -= 20;
  else if (responses.tempsSansManger === '3-4H') score -= 10;
  else if (responses.tempsSansManger === '4-6H') score += 5;
  else if (responses.tempsSansManger === '6-12H') score += 15;
  else if (responses.tempsSansManger === '12-16H') score += 25;
  else if (responses.tempsSansManger === '16H+') score += 35;

  // Sauter petit-déj
  if (responses.sauterPetitDej === 'HYPOGLYCEMIE_SEVERE') score -= 25;
  else if (responses.sauterPetitDej === 'BRAIN_FOG_INTENSE') score -= 20;
  else if (responses.sauterPetitDej === 'IRRITABILITE_EXTREME') score -= 10;
  else if (responses.sauterPetitDej === 'AUCUNE_SENSATION') score += 15;
  else if (responses.sauterPetitDej === 'BOOST_ENERGIE') score += 25;

  // Cétose
  if (responses.tempsEntreeCetose === 'JAMAIS_REUSSI') score -= 25;
  else if (responses.tempsEntreeCetose === '3-4_SEMAINES') score -= 15;
  else if (responses.tempsEntreeCetose === '2-3_SEMAINES') score -= 10;
  else if (responses.tempsEntreeCetose === '1-2_SEMAINES') score += 5;
  else if (responses.tempsEntreeCetose === '3-7_JOURS') score += 15;
  else if (responses.tempsEntreeCetose === '24-72H') score += 25;

  return Math.max(0, Math.min(100, score));
}

function calculateSwitchingCarburant(responses: QuestionnaireResponses): number {
  // Similaire à flexibilité métabolique mais focus différent
  return calculateFlexibiliteMetabolique(responses);
}

function calculateSanteMitochondriale(responses: QuestionnaireResponses): number {
  let score = 50;

  // Énergie en low-carb
  if (responses.energieLowCarb === 'CATASTROPHIQUE') score -= 30;
  else if (responses.energieLowCarb === 'MAUVAISE_PUIS_OK') score -= 10;
  else if (responses.energieLowCarb === 'MAUVAISE_PUIS_EXCELLENTE') score += 15;
  else if (responses.energieLowCarb === 'BONNE_DEBUT') score += 25;

  // Qualité des gras consommés (CRITIQUE pour mitochondries)
  if (responses.typeGrasConsos === 'HUILES_VEGETALES') score -= 40; // Mitochondries DAMAGED
  else if (responses.typeGrasConsos === 'HUILES_RAFFINEES') score -= 25;
  else if (responses.typeGrasConsos === 'OLIVE_BEURRE') score += 10;
  else if (responses.typeGrasConsos === 'OLIVE_AVOCAT_GRASSFED') score += 20;
  else if (responses.typeGrasConsos === 'COCO_MCT_GRASSFED') score += 30;

  // Niveau énergie avec gras
  if (responses.niveauEnergieGras === 'CATASTROPHIQUE') score -= 25;
  else if (responses.niveauEnergieGras === 'MAUVAIS') score -= 15;
  else if (responses.niveauEnergieGras === 'BON') score += 15;
  else if (responses.niveauEnergieGras === 'EXCELLENT') score += 25;

  return Math.max(0, Math.min(100, score));
}

// À COMPLÉTER: Toutes les autres fonctions de scoring (37 restantes)
// Même logique: analyser les réponses, appliquer des modifieurs, clamp 0-100

function calculateDopamine(responses: QuestionnaireResponses): number {
  let score = 50;

  // Motivation
  score += (responses.motivationQuotidienne - 5) * 5;

  // Procrastination
  if (responses.procrastination === 'CONSTANTE') score -= 30;
  else if (responses.procrastination === 'SOUVENT') score -= 20;
  else if (responses.procrastination === 'PARFOIS') score -= 10;
  else if (responses.procrastination === 'RAREMENT') score += 10;
  else if (responses.procrastination === 'JAMAIS') score += 20;

  // Addictions (chaque addiction réduit dopamine)
  const addictionCount = responses.addictions?.filter(a => a !== 'AUCUNE').length || 0;
  score -= addictionCount * 8;

  // Focus
  if (responses.capaciteFocus === 'IMPOSSIBLE') score -= 30;
  else if (responses.capaciteFocus === 'MAUVAISE') score -= 20;
  else if (responses.capaciteFocus === 'MOYENNE') score -= 5;
  else if (responses.capaciteFocus === 'BONNE') score += 10;
  else if (responses.capaciteFocus === 'EXCELLENTE') score += 20;

  return Math.max(0, Math.min(100, score));
}

function calculateUtilisationGlucose(r: QuestionnaireResponses): number {
  let score = 50;

  // Résistance insuline
  if (r.apresGlucidesRapides === 'CRASH_IMMEDIAT') score -= 30;
  else if (r.apresGlucidesRapides === 'BOOST_PUIS_CRASH') score -= 20;
  else if (r.apresGlucidesRapides === 'ENERGIE_STABLE') score += 20;

  // Acanthosis (marqueur résistance insuline)
  if (r.acanthosisNigricans === 'PRONONCE') score -= 25;
  else if (r.acanthosisNigricans === 'LEGER') score -= 10;

  // Crash post-prandial
  if (r.crashPostPrandial === 'TOUJOURS') score -= 20;
  else if (r.crashPostPrandial === 'SOUVENT') score -= 10;
  else if (r.crashPostPrandial === 'JAMAIS') score += 15;

  return Math.max(0, Math.min(100, score));
}

function calculateUtilisationLipides(r: QuestionnaireResponses): number {
  let score = 50;

  // Énergie avec gras
  if (r.niveauEnergieGras === 'CATASTROPHIQUE') score -= 30;
  else if (r.niveauEnergieGras === 'MAUVAIS') score -= 15;
  else if (r.niveauEnergieGras === 'BON') score += 15;
  else if (r.niveauEnergieGras === 'EXCELLENT') score += 30;

  // Réaction repas gras
  if (r.reactionGras === 'DIARRHEE') score -= 25;
  else if (r.reactionGras === 'NAUSEE') score -= 15;
  else if (r.reactionGras === 'STABLE') score += 20;

  // Qualité gras (critique pour utilisation)
  if (r.typeGrasConsos === 'COCO_MCT_GRASSFED') score += 25;
  else if (r.typeGrasConsos === 'HUILES_VEGETALES') score -= 30;

  return Math.max(0, Math.min(100, score));
}

function calculateTestosterone(r: QuestionnaireResponses): number {
  let score = 50;

  // Libido
  score += (r.libido - 5) * 6;

  // Érections matinales (si homme)
  if (r.erectionsMatinales === 'JAMAIS') score -= 30;
  else if (r.erectionsMatinales === '1X_SEMAINE') score -= 20;
  else if (r.erectionsMatinales === '2-3X_SEMAINE') score -= 10;
  else if (r.erectionsMatinales === '4-5X_SEMAINE') score += 10;
  else if (r.erectionsMatinales === 'QUOTIDIENNES') score += 25;

  // Facilité construire muscle
  if (r.faciliteConstruireMuscle === 'TRES_DIFFICILE') score -= 25;
  else if (r.faciliteConstruireMuscle === 'DIFFICILE') score -= 15;
  else if (r.faciliteConstruireMuscle === 'FACILE') score += 15;
  else if (r.faciliteConstruireMuscle === 'TRES_FACILE') score += 25;

  // Pilosité (si homme - marqueur DHT)
  if (r.pilositeFaciale === 'TRES_FAIBLE') score -= 20;
  else if (r.pilositeFaciale === 'FAIBLE') score -= 10;
  else if (r.pilositeFaciale === 'DENSE') score += 10;
  else if (r.pilositeFaciale === 'TRES_DENSE') score += 15;

  return Math.max(0, Math.min(100, score));
}

function calculateOestrogenes(r: QuestionnaireResponses): number {
  let score = 50;

  // Gynécomastie (excès E2 chez homme)
  if (r.gynecomastie === 'PRONONCEE') score -= 40;
  else if (r.gynecomastie === 'MODEREE') score -= 25;
  else if (r.gynecomastie === 'LEGERE') score -= 10;
  else if (r.gynecomastie === 'NON') score += 20;

  // Rétention eau (E2 élevé)
  if (r.retentionEau === 'CONSTANTE') score -= 25;
  else if (r.retentionEau === 'SOUVENT') score -= 15;
  else if (r.retentionEau === 'JAMAIS') score += 15;

  // Type gras abdominal (œstrogènes favorisent sous-cutané)
  if (r.typeGrasAbdominal === 'SOUS_CUTANE') score -= 10;

  return Math.max(0, Math.min(100, score));
}

function calculateCortisol(r: QuestionnaireResponses): number {
  let score = 50;

  // Niveau stress chronique
  score -= (r.niveauStress - 5) * 5;

  // Récupération stress
  if (r.recuperationStress === 'PLUSIEURS_JOURS') score -= 25;
  else if (r.recuperationStress === '12-24H') score -= 15;
  else if (r.recuperationStress === '4-12H') score -= 5;
  else if (r.recuperationStress === '<1H') score += 15;

  // Gras abdominal (cortisol → stockage viscéral)
  if (r.grasAbdominal === 'TRES_IMPORTANT') score -= 25;
  else if (r.grasAbdominal === 'IMPORTANT') score -= 15;
  else if (r.grasAbdominal === 'ABSENT') score += 20;

  // Difficulté perdre gras abdominal
  if (r.difficultePerteGrasAbdominal) score -= 15;

  return Math.max(0, Math.min(100, score));
}

function calculatePatternCortisol(r: QuestionnaireResponses): number {
  let score = 50;

  // Énergie réveil (cortisol doit être élevé le matin)
  score += (r.energieReveil - 5) * 4;

  // Pic énergie (doit être le matin)
  if (r.picEnergie === '6-9H') score += 25;
  else if (r.picEnergie === '9-12H') score += 15;
  else if (r.picEnergie === '21H+') score -= 30; // Inversé
  else if (r.picEnergie === '18-21H') score -= 20;

  // Deuxième souffle nocturne (cortisol inversé)
  if (r.deuxiemeSouffleNocturne === 'OUI_SYSTEMATIQUE') score -= 30;
  else if (r.deuxiemeSouffleNocturne === 'OUI_SOUVENT') score -= 20;
  else if (r.deuxiemeSouffleNocturne === 'JAMAIS') score += 15;

  // Heure endormissement (cortisol élevé empêche sommeil)
  if (r.heureEndormissement === '>2H') score -= 25;
  else if (r.heureEndormissement === '1H-2H') score -= 20;
  else if (r.heureEndormissement === '<22H') score += 15;

  // Réveils nocturnes 2-4h (spike cortisol)
  if (r.heureReveilNocturne === '2H-4H') score -= 20;

  return Math.max(0, Math.min(100, score));
}

function calculateSensibiliteInsuline(r: QuestionnaireResponses): number {
  let score = 50;

  // Crash après glucides
  if (r.apresGlucidesRapides === 'CRASH_IMMEDIAT') score -= 35;
  else if (r.apresGlucidesRapides === 'BOOST_PUIS_CRASH') score -= 25;
  else if (r.apresGlucidesRapides === 'ENERGIE_STABLE') score += 25;

  // Acanthosis (marqueur spécifique résistance)
  if (r.acanthosisNigricans === 'PRONONCE') score -= 30;
  else if (r.acanthosisNigricans === 'LEGER') score -= 15;

  // Gras viscéral (cause ET conséquence résistance)
  if (r.typeGrasAbdominal === 'VISCERAL') score -= 20;
  else if (r.typeGrasAbdominal === 'LES_DEUX') score -= 15;

  // Soif excessive + urines fréquentes (diabète)
  if (r.soifExcessive && r.urinesFrequentes) score -= 40;
  else if (r.soifExcessive || r.urinesFrequentes) score -= 20;

  // Antécédents diabète
  if (r.antecedentsDiabete) score -= 10;

  // Glycémie à jeun
  if (r.glycemieJeun === '>100') score -= 40;
  else if (r.glycemieJeun === '90-99') score -= 20;
  else if (r.glycemieJeun === '85-89') score -= 5;
  else if (r.glycemieJeun === '70-79') score += 20;

  return Math.max(0, Math.min(100, score));
}

function calculateFonctionThyroidienne(r: QuestionnaireResponses): number {
  let score = 50;

  // Température corporelle
  if (r.temperatureCorporelle === 'TRES_FROID') score -= 30;
  else if (r.temperatureCorporelle === 'FROID_FACILEMENT') score -= 15;
  else if (r.temperatureCorporelle === 'CHAUD_FACILEMENT') score += 15;

  // Mains/pieds froids chroniques
  if (r.mainsPiedsFroids === 'TOUJOURS') score -= 25;
  else if (r.mainsPiedsFroids === 'SOUVENT') score -= 15;
  else if (r.mainsPiedsFroids === 'JAMAIS') score += 10;

  // Métabolisme ralentit en restriction
  if (r.metabolismeRalentit === 'ENORMEMENT') score -= 30;
  else if (r.metabolismeRalentit === 'BEAUCOUP') score -= 20;
  else if (r.metabolismeRalentit === 'UN_PEU') score -= 10;
  else if (r.metabolismeRalentit === 'NON_LINEAIRE') score += 15;

  // Diagnostic thyroïde
  if (r.diagnosticThyroide === 'HYPOTHYROIDIE_NON_TRAITEE') score -= 35;
  else if (r.diagnosticThyroide === 'HASHIMOTO') score -= 30;
  else if (r.diagnosticThyroide === 'HYPOTHYROIDIE_TRAITEE') score -= 15;

  return Math.max(0, Math.min(100, score));
}

function calculateSensibiliteRecepteursD2(r: QuestionnaireResponses): number {
  // Basé sur dopamine mais focus sur downregulation récepteurs
  let score = calculateDopamine(r);

  // Addictions multiples (downregulation sévère)
  const addictionCount = r.addictions?.filter(a => a !== 'AUCUNE').length || 0;
  if (addictionCount >= 3) score -= 15;

  // Sucre et stimulants (pire pour récepteurs)
  if (r.addictions?.includes('SUCRE')) score -= 10;
  if (r.addictions?.includes('CAFE_3-5+')) score -= 10;

  return Math.max(0, Math.min(100, score));
}

function calculateSerotonine(r: QuestionnaireResponses): number {
  let score = 50;

  // Humeur globale
  score += (r.humeurGlobale - 5) * 6;

  // Anxiété (inverse)
  score -= (r.niveauAnxiete - 5) * 5;

  // Pensées négatives
  if (r.penseesNegatives === 'CONSTANTES') score -= 30;
  else if (r.penseesNegatives === 'SOUVENT') score -= 20;
  else if (r.penseesNegatives === 'PARFOIS') score -= 10;
  else if (r.penseesNegatives === 'JAMAIS') score += 15;

  // Symptômes dépressifs
  if (r.symptomesDepressifs === 'SEVERES') score -= 35;
  else if (r.symptomesDepressifs === 'MODERES') score -= 20;
  else if (r.symptomesDepressifs === 'LEGERS') score -= 10;

  // Antidépresseurs (indication sérotonine basse)
  if (r.antidepresseurs) score -= 15;

  return Math.max(0, Math.min(100, score));
}

function calculateGABA(r: QuestionnaireResponses): number {
  let score = 50;

  // Niveau anxiété (inverse)
  score -= (r.niveauAnxiete - 5) * 5;

  // Tension musculaire chronique
  if (r.tensionMusculaire === 'CONSTANT') score -= 30;
  else if (r.tensionMusculaire === 'SOUVENT') score -= 20;
  else if (r.tensionMusculaire === 'PARFOIS') score -= 10;
  else if (r.tensionMusculaire === 'JAMAIS') score += 15;

  // Capacité relaxer
  if (r.capaciteRelaxer === 'IMPOSSIBLE') score -= 30;
  else if (r.capaciteRelaxer === 'TRES_DIFFICILE') score -= 20;
  else if (r.capaciteRelaxer === 'DIFFICILE') score -= 10;
  else if (r.capaciteRelaxer === 'TRES_FACILE') score += 15;

  // Déconnexion mentale
  if (r.deconnexionMentale === 'IMPOSSIBLE') score -= 25;
  else if (r.deconnexionMentale === 'TRES_DIFFICILE') score -= 15;
  else if (r.deconnexionMentale === 'TRES_FACILE') score += 15;

  return Math.max(0, Math.min(100, score));
}

function calculateNoradrenaline(r: QuestionnaireResponses): number {
  let score = 50;

  // Énergie mentale & vigilance
  score += (r.energieMentale - 5) * 6;

  // Énergie réveil
  score += (r.energieReveil - 5) * 4;

  // Performance cognitive à jeun
  if (r.performanceCognitiveJeun === 'EXCELLENTE') score += 20;
  else if (r.performanceCognitiveJeun === 'BONNE') score += 10;
  else if (r.performanceCognitiveJeun === 'BRAIN_FOG_SEVERE') score -= 20;
  else if (r.performanceCognitiveJeun === 'INCAPACITE') score -= 30;

  return Math.max(0, Math.min(100, score));
}

function calculateSanteDigestive(r: QuestionnaireResponses): number {
  let score = 50;

  // Ballonnements
  if (r.ballonnements === 'CONSTANT') score -= 30;
  else if (r.ballonnements === 'SOUVENT') score -= 20;
  else if (r.ballonnements === 'PARFOIS') score -= 10;
  else if (r.ballonnements === 'JAMAIS') score += 15;

  // Consistance selles
  if (r.consistanceSelles === 'TYPE_3-4') score += 20;
  else if (r.consistanceSelles === 'TYPE_1-2') score -= 20;
  else if (r.consistanceSelles === 'TYPE_7') score -= 25;

  // Fréquence selles
  if (r.frequenceSelles === '1_PAR_JOUR') score += 15;
  else if (r.frequenceSelles === '<1_TOUS_2J') score -= 20;
  else if (r.frequenceSelles === '3+_PAR_JOUR') score -= 15;

  // Reflux gastrique
  if (r.refluxGastrique === 'QUOTIDIEN') score -= 25;
  else if (r.refluxGastrique === 'SOUVENT') score -= 15;

  // Aliments non digérés
  if (r.alimentsNonDigeres === 'SOUVENT') score -= 20;

  return Math.max(0, Math.min(100, score));
}

function calculateDiversiteMicrobiome(r: QuestionnaireResponses): number {
  let score = 50;

  // Cures antibiotiques (détruisent microbiome)
  if (r.curesAntibiotiques === '15+') score -= 35;
  else if (r.curesAntibiotiques === '10-15') score -= 25;
  else if (r.curesAntibiotiques === '6-10') score -= 15;
  else if (r.curesAntibiotiques === '3-5') score -= 5;

  // Aliments fermentés (nourrissent microbiome)
  if (r.alimentsFermentes === 'QUOTIDIEN') score += 25;
  else if (r.alimentsFermentes === '3-5X_SEMAINE') score += 15;
  else if (r.alimentsFermentes === 'JAMAIS') score -= 20;

  // Intolérances multiples (signe dysbiose)
  const intoleranceCount = r.intolerances?.filter(i => i !== 'AUCUNE').length || 0;
  score -= intoleranceCount * 10;

  return Math.max(0, Math.min(100, score));
}

function calculateIntegriteIntestinale(r: QuestionnaireResponses): number {
  let score = 50;

  // Intolérances multiples (leaky gut)
  const intoleranceCount = r.intolerances?.filter(i => i !== 'AUCUNE').length || 0;
  if (intoleranceCount >= 3) score -= 30;
  else if (intoleranceCount >= 2) score -= 20;
  else if (intoleranceCount === 1) score -= 10;

  // Maladies auto-immunes (lien avec leaky gut)
  if (r.maladiesAutoImmunes) score -= 25;

  // Allergies développées adulte (perméabilité intestinale)
  if (r.allergiesAdulte) score -= 20;

  // Ballonnements constants
  if (r.ballonnements === 'CONSTANT') score -= 15;

  return Math.max(0, Math.min(100, score));
}

function calculateProductionEnzymes(r: QuestionnaireResponses): number {
  let score = 50;

  // Réaction gras (déficit enzymes/bile)
  if (r.reactionGras === 'DIARRHEE') score -= 30;
  else if (r.reactionGras === 'NAUSEE') score -= 20;
  else if (r.reactionGras === 'STABLE') score += 15;

  // Réaction protéines (déficit HCl/pepsine)
  if (r.reactionProteines === 'FATIGUE') score -= 25;
  else if (r.reactionProteines === 'BALLONNEMENTS') score -= 15;
  else if (r.reactionProteines === 'FACILE') score += 15;

  // Aliments non digérés
  if (r.alimentsNonDigeres === 'SOUVENT') score -= 25;
  else if (r.alimentsNonDigeres === 'RAREMENT') score -= 5;

  // Reflux (peut indiquer hypochlorhydrie)
  if (r.refluxGastrique === 'QUOTIDIEN') score -= 20;

  return Math.max(0, Math.min(100, score));
}

function calculateInflammationSystemique(r: QuestionnaireResponses): number {
  let score = 50;

  // Douleurs articulaires
  if (r.douleursArticulaires === 'SEVERES') score -= 30;
  else if (r.douleursArticulaires === 'MODEREES') score -= 20;
  else if (r.douleursArticulaires === 'LEGERES') score -= 10;

  // Raideur matinale (inflammation)
  if (r.raideurMatinale === '>60MIN') score -= 25;
  else if (r.raideurMatinale === '30-60MIN') score -= 15;
  else if (r.raideurMatinale === '10-30MIN') score -= 5;

  // Acné/eczéma/psoriasis (inflammation)
  const skinIssues = r.acneEczemaPsoriasis?.filter(i => i !== 'AUCUN').length || 0;
  score -= skinIssues * 10;

  // Maladies auto-immunes
  if (r.maladiesAutoImmunes) score -= 25;

  // Récupération musculaire lente
  if (r.recuperationMusculaire === '>96H') score -= 20;
  else if (r.recuperationMusculaire === '72-96H') score -= 10;

  return Math.max(0, Math.min(100, score));
}

function calculateStressOxydatif(r: QuestionnaireResponses): number {
  let score = 50;

  // Qualité peau (collagène dégradé par stress oxydatif)
  if (r.qualitePeau === 'TRES_FINE_RIDEE') score -= 25;
  else if (r.qualitePeau === 'FINE') score -= 10;
  else if (r.qualitePeau === 'EPAISSE_ELASTIQUE') score += 15;

  // Qualité cheveux
  if (r.qualiteCheveux === 'PERTE_EXCESSIVE') score -= 20;
  else if (r.qualiteCheveux === 'FINS_CASSANTS') score -= 10;
  else if (r.qualiteCheveux === 'EPAIS_BRILLANTS') score += 10;

  // Qualité ongles
  if (r.qualiteOngles === 'CASSANTS') score -= 15;
  else if (r.qualiteOngles === 'FORTS') score += 10;

  // Type gras (huiles végétales = stress oxydatif massif)
  if (r.typeGrasConsos === 'HUILES_VEGETALES') score -= 35;
  else if (r.typeGrasConsos === 'COCO_MCT_GRASSFED') score += 20;

  return Math.max(0, Math.min(100, score));
}

function calculateFonctionImmunitaire(r: QuestionnaireResponses): number {
  let score = 50;

  // Maladies auto-immunes (système immunitaire déréglé)
  if (r.maladiesAutoImmunes) score -= 30;

  // Qualité sommeil (récupération immunitaire)
  score += (r.qualiteSommeil - 5) * 4;

  // Stress chronique (supprime immunité)
  score -= (r.niveauStress - 5) * 3;

  // Diversité microbiome (80% immunité intestinale)
  const microScore = calculateDiversiteMicrobiome(r);
  score += (microScore - 50) * 0.3;

  return Math.max(0, Math.min(100, score));
}

function calculateSanteCardiovasculaire(r: QuestionnaireResponses): number {
  let score = 50;

  // Gras viscéral (risque cardio)
  if (r.typeGrasAbdominal === 'VISCERAL' || r.typeGrasAbdominal === 'LES_DEUX') {
    score -= 20;
  }

  // Inflammation systémique (risque cardio)
  const inflamScore = calculateInflammationSystemique(r);
  score += (inflamScore - 50) * 0.3;

  // Performance aérobie
  if (r.progressionPerformance === 'REGRESSION') score -= 20;
  else if (r.progressionPerformance === 'EXCELLENTE') score += 15;

  return Math.max(0, Math.min(100, score));
}

function calculateProfilLipidique(r: QuestionnaireResponses): number {
  let score = 50;

  // Sensibilité insuline (impact profil lipidique)
  const insulinScore = calculateSensibiliteInsuline(r);
  score += (insulinScore - 50) * 0.4;

  // Qualité gras consommés
  if (r.typeGrasConsos === 'HUILES_VEGETALES') score -= 30;
  else if (r.typeGrasConsos === 'COCO_MCT_GRASSFED') score += 20;

  // Gras viscéral (triglycérides élevés)
  if (r.typeGrasAbdominal === 'VISCERAL') score -= 15;

  return Math.max(0, Math.min(100, score));
}

function calculateFonctionHepatique(r: QuestionnaireResponses): number {
  let score = 50;

  // Gras viscéral (foie gras)
  if (r.grasAbdominal === 'TRES_IMPORTANT') score -= 25;
  else if (r.grasAbdominal === 'IMPORTANT') score -= 15;

  // Résistance insuline (NAFLD)
  const insulinScore = calculateSensibiliteInsuline(r);
  score += (insulinScore - 50) * 0.3;

  // Digestion gras (bile)
  if (r.reactionGras === 'DIARRHEE') score -= 20;
  else if (r.reactionGras === 'NAUSEE') score -= 10;

  return Math.max(0, Math.min(100, score));
}

function calculateSanteArticulaire(r: QuestionnaireResponses): number {
  let score = 50;

  // Douleurs articulaires
  if (r.douleursArticulaires === 'SEVERES') score -= 35;
  else if (r.douleursArticulaires === 'MODEREES') score -= 20;
  else if (r.douleursArticulaires === 'LEGERES') score -= 10;

  // Raideur matinale
  if (r.raideurMatinale === '>60MIN') score -= 25;
  else if (r.raideurMatinale === '30-60MIN') score -= 15;

  // Craquements avec douleur
  if (r.craquements === 'CONSTANT_AVEC_DOULEUR') score -= 30;
  else if (r.craquements === 'FREQUENTS') score -= 10;

  // Localisations multiples
  const locCount = r.localisationsDouleurs?.length || 0;
  if (locCount >= 4) score -= 20;
  else if (locCount >= 2) score -= 10;

  return Math.max(0, Math.min(100, score));
}

function calculateQualiteCollagene(r: QuestionnaireResponses): number {
  let score = 50;

  // Qualité peau
  if (r.qualitePeau === 'TRES_FINE_RIDEE') score -= 30;
  else if (r.qualitePeau === 'FINE') score -= 15;
  else if (r.qualitePeau === 'EPAISSE_ELASTIQUE') score += 20;

  // Qualité ongles
  if (r.qualiteOngles === 'CASSANTS') score -= 20;
  else if (r.qualiteOngles === 'FORTS') score += 15;

  // Qualité cheveux
  if (r.qualiteCheveux === 'FINS_CASSANTS') score -= 15;
  else if (r.qualiteCheveux === 'EPAIS_BRILLANTS') score += 15;

  // Inflammation (dégrade collagène)
  const inflamScore = calculateInflammationSystemique(r);
  score += (inflamScore - 50) * 0.2;

  return Math.max(0, Math.min(100, score));
}

function calculateQualiteSommeil(r: QuestionnaireResponses): number {
  let score = 50;

  // Heures sommeil
  if (r.heuresSommeil === '<5H') score -= 35;
  else if (r.heuresSommeil === '5-6H') score -= 20;
  else if (r.heuresSommeil === '6-7H') score -= 5;
  else if (r.heuresSommeil === '7-8H') score += 15;
  else if (r.heuresSommeil === '>9H') score -= 10; // Trop = problème

  // Qualité perçue
  score += (r.qualiteSommeil - 5) * 6;

  // Sensation reposé
  score += (r.sensationRepose - 5) * 5;

  // Latence endormissement
  if (r.latenceEndormissement === '>60MIN') score -= 25;
  else if (r.latenceEndormissement === '30-60MIN') score -= 15;
  else if (r.latenceEndormissement === '<10MIN') score += 15;

  // Réveils nocturnes
  if (r.reveilsNocturnes === 'TOUTES_NUITS') score -= 25;
  else if (r.reveilsNocturnes === 'SOUVENT') score -= 15;
  else if (r.reveilsNocturnes === 'JAMAIS') score += 15;

  // Apnée sommeil
  if (r.apneeSommeil === 'DIAGNOSTIQUEE') score -= 35;
  else if (r.apneeSommeil === 'SUSPECTEE') score -= 20;

  // Écrans avant coucher
  if (r.ecransAvantCoucher === 'OUI_SANS_FILTRE') score -= 15;
  else if (r.ecransAvantCoucher === 'NON') score += 10;

  return Math.max(0, Math.min(100, score));
}

function calculateSommeilREM(r: QuestionnaireResponses): number {
  let score = 50;

  // Fréquence rêves (marqueur REM)
  if (r.frequenceReves === 'JAMAIS') score -= 30;
  else if (r.frequenceReves === 'RAREMENT') score -= 20;
  else if (r.frequenceReves === 'PARFOIS') score -= 10;
  else if (r.frequenceReves === 'SOUVENT') score += 10;
  else if (r.frequenceReves === 'TOUTES_NUITS') score += 20;

  // Qualité sommeil globale
  score += (r.qualiteSommeil - 5) * 3;

  // Pattern cortisol (cortisol élevé supprime REM)
  const cortisolScore = calculatePatternCortisol(r);
  score += (cortisolScore - 50) * 0.3;

  return Math.max(0, Math.min(100, score));
}

function calculateRecuperation(r: QuestionnaireResponses): number {
  let score = 50;

  // Récupération musculaire
  if (r.recuperationMusculaire === '>96H') score -= 30;
  else if (r.recuperationMusculaire === '72-96H') score -= 20;
  else if (r.recuperationMusculaire === '48-72H') score -= 10;
  else if (r.recuperationMusculaire === '24-48H') score += 5;
  else if (r.recuperationMusculaire === '<24H') score += 20;

  // Courbatures durée
  if (r.courbaturesDuree === 'SEMAINE+') score -= 30;
  else if (r.courbaturesDuree === '96H+') score -= 20;
  else if (r.courbaturesDuree === '24H') score += 15;

  // Qualité sommeil (critique pour récup)
  const sommeilScore = calculateQualiteSommeil(r);
  score += (sommeilScore - 50) * 0.4;

  // Récup stress
  if (r.recuperationStress === 'PLUSIEURS_JOURS') score -= 20;
  else if (r.recuperationStress === '<1H') score += 15;

  return Math.max(0, Math.min(100, score));
}

function calculatePerformanceAnaerobie(r: QuestionnaireResponses): number {
  let score = 50;

  // Pump musculaire (marqueur sensibilité insuline + vascularisation)
  if (r.pumpMusculaire === 'ABSENT') score -= 30;
  else if (r.pumpMusculaire === 'FAIBLE') score -= 20;
  else if (r.pumpMusculaire === 'MOYEN') score -= 5;
  else if (r.pumpMusculaire === 'BON') score += 10;
  else if (r.pumpMusculaire === 'EXCELLENT') score += 25;

  // Progression performance
  if (r.progressionPerformance === 'REGRESSION') score -= 25;
  else if (r.progressionPerformance === 'STAGNATION') score -= 10;
  else if (r.progressionPerformance === 'BONNE') score += 10;
  else if (r.progressionPerformance === 'EXCELLENTE') score += 20;

  // Récupération
  const recupScore = calculateRecuperation(r);
  score += (recupScore - 50) * 0.3;

  return Math.max(0, Math.min(100, score));
}

function calculatePerformanceAerobie(r: QuestionnaireResponses): number {
  let score = 50;

  // Flexibilité métabolique (critique pour aérobie)
  const flexScore = calculateFlexibiliteMetabolique(r);
  score += (flexScore - 50) * 0.4;

  // Progression
  if (r.progressionPerformance === 'REGRESSION') score -= 25;
  else if (r.progressionPerformance === 'STAGNATION') score -= 10;
  else if (r.progressionPerformance === 'EXCELLENTE') score += 20;

  // Type training
  if (r.typeTraining === 'CARDIO') score += 10;
  else if (r.typeTraining === 'CROSSFIT') score += 5;

  return Math.max(0, Math.min(100, score));
}
