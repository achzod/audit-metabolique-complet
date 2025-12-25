// ============================================================================
// TYPES QUESTIONNAIRE 100 QUESTIONS - SCAN MÉTABOLIQUE COMPLET
// ============================================================================

export interface QuestionnaireResponses {
  // SECTION 1: PROFIL GÉNÉRAL (8Q)
  age: number;
  sexe: "HOMME" | "FEMME";
  poids: number; // kg
  taille: number; // cm
  tourTaille: number; // cm
  objectif: "PERTE_GRAS" | "GAIN_MUSCLE" | "RECOMPOSITION" | "PERFORMANCE" | "SANTE" | "ANTI_AGING";
  deadline: "AUCUNE" | "3_MOIS" | "6_MOIS" | "12_MOIS";
  experienceTraining: "0" | "<1" | "1-3" | "3-5" | "5-10" | "10+";

  // SECTION 2: MORPHOLOGIE (après upload photos)
  morphotypePercu: "ECTOMORPHE" | "MESOMORPHE" | "ENDOMORPHE" | "MIXTE";
  facilitePriseMuscle: 1 | 2 | 3 | 4 | 5; // 1=très facile, 5=très difficile
  facilitePriseGras: 1 | 2 | 3 | 4 | 5;
  zonesStockageGras: "ABDOMEN_VISCERAL" | "ABDOMEN_SOUS_CUTANE" | "HANCHES_FESSIERS" | "CUISSES" | "DOS_BRAS" | "UNIFORME" | "TRES_SEC";

  // SECTION 3: FLEXIBILITÉ MÉTABOLIQUE (15Q) 🔥 CRITIQUE
  tempsSansManger: "<2H" | "2-3H" | "3-4H" | "4-6H" | "6-12H" | "12-16H" | "16H+";
  sauterPetitDej: "HYPOGLYCEMIE_SEVERE" | "BRAIN_FOG_INTENSE" | "IRRITABILITE_EXTREME" | "FAIM_INTENSE" | "FAIM_LEGERE" | "AUCUNE_SENSATION" | "BOOST_ENERGIE";
  energieJeuneIntermittent: "JAMAIS_TESTE" | "EFFONDREMENT" | "MAUVAISE_PERSISTANTE" | "MAUVAISE_PUIS_BONNE" | "BONNE_DEBUT";
  tempsEntreeCetose: "JAMAIS_KETO" | "JAMAIS_REUSSI" | "3-4_SEMAINES" | "2-3_SEMAINES" | "1-2_SEMAINES" | "3-7_JOURS" | "24-72H";
  energieLowCarb: "JAMAIS_TESTE" | "CATASTROPHIQUE" | "MAUVAISE_PUIS_OK" | "MAUVAISE_PUIS_EXCELLENTE" | "BONNE_DEBUT";
  apresGlucidesRapides: "CRASH_IMMEDIAT" | "BOOST_PUIS_CRASH" | "BOOST_PUIS_REDEMANDER" | "ENERGIE_STABLE" | "AUCUN_EFFET";
  frequenceEnviesSucre: "1-2H" | "3-4H" | "2-3X_JOUR" | "1X_JOUR" | "RARE" | "JAMAIS";
  momentPicEnviesSucre: "REVEIL" | "MATIN_10-11H" | "APRES_MIDI_15-17H" | "SOIR" | "NUIT" | "PAS_PATTERN" | "JAMAIS";
  performanceCognitiveJeun: "INCAPACITE" | "BRAIN_FOG_SEVERE" | "BRAIN_FOG_MODERE" | "CORRECTE" | "BONNE" | "EXCELLENTE";
  niveauEnergieGras: "JAMAIS_TESTE" | "CATASTROPHIQUE" | "MAUVAIS" | "CORRECT" | "BON" | "EXCELLENT";
  lecteurCetones: "NON" | "JAMAIS_DEPASSE_0.5" | "0.5-1.5" | "1.5-3" | ">3";
  glycemieJeun: "JAMAIS_MESUREE" | ">100" | "90-99" | "85-89" | "80-84" | "70-79" | "<70";
  tremblementsSansManger: "OUI_SYSTEMATIQUE" | "OUI_PARFOIS" | "RAREMENT" | "JAMAIS";
  consommationGlucidesJour: ">400G" | "300-400G" | "200-300G" | "150-200G" | "100-150G" | "50-100G" | "<50G";
  typeGrasConsos: "HUILES_VEGETALES" | "HUILES_RAFFINEES" | "OLIVE_BEURRE" | "OLIVE_AVOCAT_GRASSFED" | "COCO_MCT_GRASSFED" | "PAS_DE_GRAS";

  // SECTION 4: PATTERN ÉNERGÉTIQUE & CORTISOL (12Q)
  energieReveil: number; // 1-10
  picEnergie: "6-9H" | "9-12H" | "12-15H" | "15-18H" | "18-21H" | "21H+" | "PAS_DE_PIC";
  crashPostPrandial: "TOUJOURS" | "SOUVENT" | "PARFOIS" | "RAREMENT" | "JAMAIS";
  deuxiemeSouffleNocturne: "OUI_SYSTEMATIQUE" | "OUI_SOUVENT" | "PARFOIS" | "RAREMENT" | "JAMAIS";
  heureEndormissement: "<22H" | "22-23H" | "23H-MINUIT" | "MINUIT-1H" | "1H-2H" | ">2H";
  reveilsNocturnes: "JAMAIS" | "RARE" | "PARFOIS" | "SOUVENT" | "TOUTES_NUITS";
  heureReveilNocturne: "PAS_REVEILS" | "MINUIT-2H" | "2H-4H" | "4H-6H" | "VARIABLE";
  niveauStress: number; // 1-10
  recuperationStress: "<1H" | "1-4H" | "4-12H" | "12-24H" | "PLUSIEURS_JOURS";
  deconnexionMentale: "TRES_FACILE" | "FACILE" | "DIFFICILE" | "TRES_DIFFICILE" | "IMPOSSIBLE";
  grasAbdominal: "ABSENT" | "LEGER" | "MODERE" | "IMPORTANT" | "TRES_IMPORTANT";
  typeGrasAbdominal: "SOUS_CUTANE" | "VISCERAL" | "LES_DEUX";

  // SECTION 5: NEUROTRANSMETTEURS (12Q)
  motivationQuotidienne: number; // 1-10
  procrastination: "JAMAIS" | "RAREMENT" | "PARFOIS" | "SOUVENT" | "CONSTANTE";
  addictions: string[]; // Multi-select: ["CAFE_1-2", "CAFE_3-5+", "SUCRE", "ALCOOL", "CANNABIS", "PORNO", "RESEAUX_SOCIAUX", "JEUX_VIDEO", "SHOPPING", "AUCUNE"]
  capaciteFocus: "EXCELLENTE" | "BONNE" | "MOYENNE" | "MAUVAISE" | "IMPOSSIBLE";
  humeurGlobale: number; // 1-10
  niveauAnxiete: number; // 1-10
  penseesNegatives: "JAMAIS" | "RAREMENT" | "PARFOIS" | "SOUVENT" | "CONSTANTES";
  tensionMusculaire: "JAMAIS" | "RAREMENT" | "PARFOIS" | "SOUVENT" | "CONSTANT";
  capaciteRelaxer: "TRES_FACILE" | "FACILE" | "DIFFICILE" | "TRES_DIFFICILE" | "IMPOSSIBLE";
  energieMentale: number; // 1-10
  symptomesDepressifs: "AUCUN" | "LEGERS" | "MODERES" | "SEVERES";
  antidepresseurs: boolean;

  // SECTION 6: HORMONES (15Q)
  libido: number; // 1-10
  erectionsMatinales?: "QUOTIDIENNES" | "4-5X_SEMAINE" | "2-3X_SEMAINE" | "1X_SEMAINE" | "JAMAIS"; // Si homme
  faciliteConstruireMuscle: "TRES_FACILE" | "FACILE" | "MOYENNE" | "DIFFICILE" | "TRES_DIFFICILE";
  pilositeFaciale?: "TRES_DENSE" | "DENSE" | "MOYENNE" | "FAIBLE" | "TRES_FAIBLE"; // Si homme
  gynecomastie?: "NON" | "LEGERE" | "MODEREE" | "PRONONCEE"; // Si homme
  retentionEau: "JAMAIS" | "RAREMENT" | "PARFOIS" | "SOUVENT" | "CONSTANTE";
  temperatureCorporelle: "CHAUD_FACILEMENT" | "NORMALE" | "FROID_FACILEMENT" | "TRES_FROID";
  mainsPiedsFroids: "JAMAIS" | "PARFOIS" | "SOUVENT" | "TOUJOURS";
  metabolismeRalentit: "NON_LINEAIRE" | "UN_PEU" | "BEAUCOUP" | "ENORMEMENT";
  diagnosticThyroide: "AUCUN" | "HYPOTHYROIDIE_TRAITEE" | "HYPOTHYROIDIE_NON_TRAITEE" | "HASHIMOTO" | "HYPERTHYROIDIE";
  acanthosisNigricans: "NON" | "LEGER" | "PRONONCE";
  soifExcessive: boolean;
  urinesFrequentes: boolean;
  antecedentsDiabete: boolean;
  difficultePerteGrasAbdominal: boolean;

  // SECTION 7: DIGESTION & MICROBIOME (12Q)
  ballonnements: "JAMAIS" | "RAREMENT" | "PARFOIS" | "SOUVENT" | "CONSTANT";
  consistanceSelles: "TYPE_1-2" | "TYPE_3-4" | "TYPE_5-6" | "TYPE_7";
  frequenceSelles: "<1_TOUS_2J" | "1_TOUS_2J" | "1_PAR_JOUR" | "2_PAR_JOUR" | "3+_PAR_JOUR";
  curesAntibiotiques: "0-2" | "3-5" | "6-10" | "10-15" | "15+";
  alimentsFermentes: "QUOTIDIEN" | "3-5X_SEMAINE" | "1-2X_SEMAINE" | "RAREMENT" | "JAMAIS";
  intolerances: string[]; // Multi-select: ["AUCUNE", "LACTOSE", "GLUTEN", "FODMAP", "HISTAMINE"]
  refluxGastrique: "JAMAIS" | "RAREMENT" | "SOUVENT" | "QUOTIDIEN";
  reactionGras: "STABLE" | "FATIGUE" | "NAUSEE" | "DIARRHEE";
  reactionProteines: "FACILE" | "BALLONNEMENTS" | "FATIGUE";
  alimentsNonDigeres: "JAMAIS" | "RAREMENT" | "SOUVENT";
  maladiesAutoImmunes: boolean;
  allergiesAdulte: boolean;

  // SECTION 8: INFLAMMATION & ARTICULATIONS (10Q)
  douleursArticulaires: "AUCUNE" | "LEGERES" | "MODEREES" | "SEVERES";
  localisationsDouleurs: string[]; // Multi-select
  raideurMatinale: "AUCUNE" | "<10MIN" | "10-30MIN" | "30-60MIN" | ">60MIN";
  craquements: "RARES" | "FREQUENTS" | "CONSTANT_AVEC_DOULEUR";
  qualitePeau: "EPAISSE_ELASTIQUE" | "NORMALE" | "FINE" | "TRES_FINE_RIDEE";
  acneEczemaPsoriasis: string[]; // Multi-select: ["AUCUN", "ACNE", "ECZEMA", "PSORIASIS", "ROSACEE"]
  qualiteOngles: "FORTS" | "NORMAUX" | "CASSANTS";
  qualiteCheveux: "EPAIS_BRILLANTS" | "NORMAUX" | "FINS_CASSANTS" | "PERTE_EXCESSIVE";
  recuperationMusculaire: "<24H" | "24-48H" | "48-72H" | "72-96H" | ">96H";
  courbaturesDuree: "24H" | "48H" | "72H" | "96H+" | "SEMAINE+";

  // SECTION 9: SOMMEIL (8Q)
  heuresSommeil: "<5H" | "5-6H" | "6-7H" | "7-8H" | "8-9H" | ">9H";
  latenceEndormissement: "<10MIN" | "10-20MIN" | "20-30MIN" | "30-60MIN" | ">60MIN";
  qualiteSommeil: number; // 1-10
  sensationRepose: number; // 1-10
  ecransAvantCoucher: "NON" | "OUI_AVEC_FILTRE" | "OUI_SANS_FILTRE";
  apneeSommeil: "NON" | "SUSPECTEE" | "DIAGNOSTIQUEE";
  frequenceReves: "TOUTES_NUITS" | "SOUVENT" | "PARFOIS" | "RAREMENT" | "JAMAIS";
  trackerSommeil: "OURA" | "WHOOP" | "APPLE_WATCH" | "AUTRE" | "AUCUN";

  // SECTION 10: TRAINING & PERFORMANCE (4Q)
  frequenceTraining: "0" | "1-2" | "3-4" | "5-6" | "7+" | "AUCUN" | "1-2X" | "3-4X" | "5-6X" | "7+";
  typeTraining: "MUSCU_HYPERTROPHIE" | "MUSCU_FORCE" | "CROSSFIT" | "CARDIO" | "SPORTS" | "MIXTE";
  typeTrainingDominant: "MUSCU_HYPERTROPHIE" | "MUSCU_FORCE" | "CROSSFIT" | "CARDIO" | "SPORTS" | "MIXTE" | "AUCUN";
  intensiteMoyenne: string;
  recuperationEntreSeances: string;
  progressionPerformance: "EXCELLENTE" | "BONNE" | "STAGNATION" | "REGRESSION" | "REGULIERE" | "PLATEAU" | "REGRESSION";
  pumpMusculaire: "EXCELLENT" | "BON" | "MOYEN" | "FAIBLE" | "ABSENT" | "TRES_BON" | "MAUVAIS";
  forceFatigue: string;
  dernierePerf: string;
  comparaison1An: string;
}

// ============================================================================
// TYPES SCORES & ANALYSE
// ============================================================================

export interface MetabolicScores {
  overall: number; // 0-100

  // 40 axes individuels
  axes: {
    // Métabolisme & Énergie
    flexibiliteMetabolique: number;
    switchingCarburant: number;
    santeMitochondriale: number;
    utilisationGlucose: number;
    utilisationLipides: number;

    // Hormones
    testosterone: number;
    oestrogenes: number;
    cortisol: number;
    patternCortisol: number;
    sensibiliteInsuline: number;
    fonctionThyroidienne: number;
    t3Libre: number;
    t4Libre: number;

    // Neurotransmetteurs
    dopamine: number;
    sensibiliteRecepteursD2: number;
    serotonine: number;
    gaba: number;
    noradrenaline: number;
    equilibreNeurotransmetteurs: number;

    // Digestion & Microbiome
    santéDigestive: number;
    diversiteMicrobiome: number;
    integritéIntestinale: number;
    productionEnzymes: number;
    absorptionNutriments: number;

    // Inflammation & Immunité
    inflammationSystemique: number;
    marqueursCRP: number;
    stressOxydatif: number;
    fonctionImmunitaire: number;

    // Cardiovasculaire
    santeCardiovasculaire: number;
    circulationSanguine: number;
    pressionArterielle: number;
    profilLipidique: number;

    // Détoxification
    fonctionHepatique: number;
    phaseIDetox: number;
    phaseIIDetox: number;

    // Biomécanique & Articulations
    santeArticulaire: number;
    qualiteCollagene: number;
    posture: number;
    equilibresMusculaires: number;

    // Sommeil & Récupération
    qualiteSommeil: number;
    sommesProfond: number;
    sommeilREM: number;
    recuperation: number;

    // Performance
    performanceAnaerobie: number;
    performanceAerobie: number;
    capaciteRecuperation: number;
  };

  // Moyennes par catégorie
  categories: {
    metabolisme: number;
    hormones: number;
    neurotransmetteurs: number;
    digestion: number;
    inflammation: number;
    cardiovasculaire: number;
    detoxification: number;
    biomecanique: number;
    sommeil: number;
    performance: number;
  };
}

export interface AIAnalysis {
  // Analyse morphologique (depuis photos)
  morphotype: {
    ectomorphe: number; // %
    mesomorphe: number; // %
    endomorphe: number; // %
    dominant: "ECTOMORPHE" | "MESOMORPHE" | "ENDOMORPHE";
    bodyfatEstime: number; // %
    repartitionGras: string;
    posture: string[];
    desequilibres: string[];
    pointsForts: string[];
    pointsFaibles: string[];
  };

  // Profil métabolique
  metabolicProfile: {
    flexibility: "CASSÉ" | "TRÈS_MAUVAIS" | "MAUVAIS" | "MOYEN" | "BON" | "EXCELLENT";
    glucoseDependency: "TOTALE" | "TRÈS_ÉLEVÉE" | "ÉLEVÉE" | "MODÉRÉE" | "FAIBLE" | "ABSENTE";
    ketoAdaptation: "IMPOSSIBLE" | "TRÈS_DIFFICILE" | "DIFFICILE" | "MOYENNE" | "FACILE" | "IMMÉDIATE";
    mitochondrialHealth: "ENDOMMAGÉES" | "COMPROMISES" | "MOYENNES" | "BONNES" | "EXCELLENTES";
  };

  // Top blocages (5 axes les plus faibles)
  topBlockages: Array<{
    axeName: string;
    score: number;
    category: "CRITIQUE" | "IMPORTANT" | "MODÉRÉ";
    detectedSignals: string[];
    impacts: string[];
  }>;

  // Top forces (3 axes les plus forts)
  topStrengths: Array<{
    axeName: string;
    score: number;
  }>;

  // Observations globales
  observations: string[]; // Ex: ["fait 6+ régimes yo-yo", "brain fog si jeûne >3h", etc.]
}

export interface GeneratedReport {
  type: "FREE" | "PREMIUM";
  generatedAt: Date;

  // Contenu narratif généré par Claude
  pages: {
    introduction: string; // Prose narrative personnalisée
    scoreExplanation: string;
    blockageAnalyses: Array<{
      blockageNumber: number;
      title: string;
      content: string; // 10-12 paragraphes prose
    }>;
    supplementStack?: string; // Premium only: protocole détaillé
    roadmap90Days?: string; // Premium only
    bloodwork?: string; // Premium only
  };

  // HTML final
  htmlContent: string;
}
