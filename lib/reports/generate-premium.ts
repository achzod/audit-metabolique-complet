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

  console.log('📝 Génération rapport PREMIUM BIOHACKING (25-30 pages)...');

  // ÉTAPE 1: Introduction - Philosophie biohacking
  console.log('1/12 - Introduction biohacking...');
  const introduction = await generateBiohackingIntroduction(userName, scores, aiAnalysis);

  // ÉTAPE 2: Analyse morphotype & biomécanique profonde
  console.log('2/12 - Analyse morphotype & biomécanique...');
  const morphoBiomecanique = await generateMorphoBiomecaniqueAnalysis(aiAnalysis, responses);

  // ÉTAPE 3: Profil métabolique - Dysfonctionnements expliqués
  console.log('3/12 - Profil métabolique dysfonctionnements...');
  const metabolicDysfonctions = await generateMetabolicDysfonctionsAnalysis(aiAnalysis.metabolicProfile, responses);

  // ÉTAPE 4: Neurotransmetteurs - Analyse profonde
  console.log('4/12 - Neurotransmetteurs analyse profonde...');
  const neuroAnalysis = await generateNeuroDeepAnalysis(scores, responses);

  // ÉTAPE 5: Hormones - Cascade hormonale
  console.log('5/12 - Cascade hormonale...');
  const hormonesAnalysis = await generateHormoneCascadeAnalysis(scores, responses);

  // ÉTAPE 6: Axe HPA & Stress chronique
  console.log('6/12 - Axe HPA & stress chronique...');
  const hpaAnalysis = await generateHPAAxisAnalysis(scores, responses);

  // ÉTAPE 7: Inflammation & Immunité
  console.log('7/12 - Inflammation systémique...');
  const inflammationAnalysis = await generateInflammationAnalysis(scores, responses);

  // ÉTAPE 8: Santé mitochondriale & énergie cellulaire
  console.log('8/12 - Mitochondries & énergie cellulaire...');
  const mitoAnalysis = await generateMitochondrialAnalysis(scores, responses);

  // ÉTAPE 9: Digestion & Microbiome
  console.log('9/12 - Digestion & microbiome...');
  const gutAnalysis = await generateGutAnalysis(scores, responses);

  // ÉTAPE 10: Détoxification hépatique
  console.log('10/12 - Détoxification hépatique...');
  const detoxAnalysis = await generateDetoxAnalysis(scores, responses);

  // ÉTAPE 11: Recommandations biohacking pointues
  console.log('11/12 - Recommandations biohacking...');
  const biohackingRecos = await generateBiohackingRecommendations(aiAnalysis, scores);

  // ÉTAPE 12: Analyses sanguines & marqueurs à tracker
  console.log('12/12 - Bloodwork & marqueurs...');
  const bloodworkAnalysis = await generateBloodworkDeepAnalysis(aiAnalysis.topBlockages, scores);

  // ASSEMBLAGE HTML FINAL
  console.log('Assemblage HTML premium biohacking...');
  const htmlContent = assemblePremiumBiohackingHTML({
    userName,
    scores,
    aiAnalysis,
    introduction,
    morphoBiomecanique,
    metabolicDysfonctions,
    neuroAnalysis,
    hormonesAnalysis,
    hpaAnalysis,
    inflammationAnalysis,
    mitoAnalysis,
    gutAnalysis,
    detoxAnalysis,
    biohackingRecos,
    bloodworkAnalysis,
  });

  return htmlContent;
}

// ============================================================================
// INTRODUCTION BIOHACKING PREMIUM
// ============================================================================

async function generateBiohackingIntroduction(
  userName: string,
  scores: MetabolicScores,
  aiAnalysis: AIAnalysis
): Promise<string> {
  const prompt = `Tu es AchZod, expert en biohacking et optimisation métabolique. Rédige l'introduction du rapport PREMIUM pour ${userName}.

CE RAPPORT N'EST PAS un programme nutrition/training. C'est une ANALYSE PROFONDE style "consultation biohacking à 10 000€".

DONNÉES :
- Score global : ${scores.overall}/100
- Top 3 blocages : ${aiAnalysis.topBlockages.slice(0, 3).map(b => `${b.axeName} (${b.score}/100)`).join(', ')}

STRUCTURE (8-10 paragraphes denses) :

Paragraphe 1 : Ce que représente ce rapport - pas un programme, mais une CARTOGRAPHIE COMPLÈTE de ton métabolisme. La différence entre suivre un plan générique et comprendre POURQUOI ton corps fonctionne comme il fonctionne.

Paragraphe 2 : La philosophie biohacking - on ne traite pas les symptômes, on remonte aux CAUSES RACINES. Chaque dysfonctionnement a une origine, souvent interconnectée avec d'autres systèmes.

Paragraphe 3 : Score global ${scores.overall}/100 - ce que ça signifie VRAIMENT. Pas un jugement, mais un point de départ. Où tu te situes par rapport à l'optimal physiologique.

Paragraphe 4 : Les 3 blocages majeurs identifiés et pourquoi ils sont CRITIQUES à comprendre avant toute action.

Paragraphe 5 : L'approche systémique - pourquoi on va analyser neurotransmetteurs, hormones, mitochondries, microbiome, inflammation... Tout est connecté.

Paragraphe 6 : Ce que tu vas apprendre - comprendre TON corps comme jamais. Les mécanismes cachés, les cascades de dysfonctionnements, les leviers d'optimisation.

Paragraphe 7 : L'importance de la biomécanique - souvent négligée, pourtant fondamentale. Posture, asymétries, compensations... Impact sur tout le reste.

Paragraphe 8 : Ce rapport te donne les CLÉS. Les recommandations pointues. Pour un accompagnement personnalisé et un plan sur-mesure, le coaching 1:1 prend le relais.

Paragraphe 9 : Comment lire ce rapport - prends ton temps. Chaque section mérite réflexion. Note tes questions.

Paragraphe 10 : Let's dive deep.

RÈGLES :
- Ton expert mais accessible
- Créer l'excitation de COMPRENDRE son corps
- Positionner comme prestation haut de gamme
- Pas de bullshit, que de la substance
- Français naturel, pas de formulations IA

Réponds UNIQUEMENT avec les paragraphes.`;

  const response = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 3500,
    messages: [{ role: 'user', content: prompt }],
  });

  return response.content[0].type === 'text' ? response.content[0].text : '';
}

// ============================================================================
// MORPHOTYPE & BIOMÉCANIQUE PROFONDE
// ============================================================================

async function generateMorphoBiomecaniqueAnalysis(
  aiAnalysis: AIAnalysis,
  responses: any
): Promise<string> {
  const prompt = `Tu es AchZod. Analyse PROFONDE morphotype ET biomécanique - style consultation biohacking premium.

DONNÉES MORPHOTYPE :
- Ectomorphe : ${aiAnalysis.morphotype.ectomorphe}%
- Mésomorphe : ${aiAnalysis.morphotype.mesomorphe}%
- Endomorphe : ${aiAnalysis.morphotype.endomorphe}%
- Dominant : ${aiAnalysis.morphotype.dominant}
- Bodyfat estimé : ${aiAnalysis.morphotype.bodyfatEstime}%
- Répartition gras : ${aiAnalysis.morphotype.repartitionGras}
- Posture : ${aiAnalysis.morphotype.posture.join(', ')}
- Déséquilibres : ${aiAnalysis.morphotype.desequilibres.join(', ')}

STRUCTURE (12-15 paragraphes) :

PARTIE 1 - MORPHOTYPE GÉNÉTIQUE :
- Ton profil morphologique et ce qu'il RÉVÈLE sur ta génétique
- Pourquoi tu stockes le gras OÙ tu le stockes (lien hormonal)
- Ce que la répartition androïde vs gynoïde signifie métaboliquement
- Implications pour la sensibilité insuline, le cortisol, les œstrogènes

PARTIE 2 - ANALYSE BIOMÉCANIQUE PROFONDE :
- Chaque problème postural EXPLIQUÉ (pas juste listé)
- Les CHAÎNES MUSCULAIRES impliquées
- Pourquoi une hyperlordose = problème de psoas = lien avec respiration = impact cortisol
- Pourquoi des épaules enroulées = faiblesse rhomboïdes = compensation trapèzes = tensions cervicales = maux de tête
- Les COMPENSATIONS que ton corps a développées et leur coût énergétique

PARTIE 3 - ASYMÉTRIES & DÉSÉQUILIBRES :
- Chaque asymétrie et son ORIGINE probable
- Impact sur la performance ET sur la santé long terme
- Risque de blessure si non corrigé
- Lien entre asymétries et système nerveux (latéralité, dominance)

PARTIE 4 - IMPLICATIONS SYSTÉMIQUES :
- Comment ta posture affecte ta RESPIRATION (et donc ton système nerveux)
- Lien posture → fascias → circulation → récupération
- Impact sur la digestion (compression organes)
- Influence sur le sommeil et la récupération

RÈGLES :
- EXPLIQUER le POURQUOI de chaque observation
- Faire les liens entre systèmes
- Niveau expert mais vulgarisé
- Pas de solutions détaillées (juste la compréhension profonde)
- Mentionner que les corrections spécifiques = coaching personnalisé

Réponds UNIQUEMENT avec l'analyse.`;

  const response = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 5000,
    messages: [{ role: 'user', content: prompt }],
  });

  return response.content[0].type === 'text' ? response.content[0].text : '';
}

// ============================================================================
// DYSFONCTIONNEMENTS MÉTABOLIQUES PROFONDS
// ============================================================================

async function generateMetabolicDysfonctionsAnalysis(
  metabolicProfile: AIAnalysis['metabolicProfile'],
  responses: any
): Promise<string> {
  const prompt = `Tu es AchZod. Explique les DYSFONCTIONNEMENTS métaboliques en profondeur - style biohacking premium.

PROFIL :
- Flexibilité métabolique : ${metabolicProfile.flexibility}
- Dépendance glucose : ${metabolicProfile.glucoseDependency}
- Adaptation cétose : ${metabolicProfile.ketoAdaptation}
- Santé mitochondriale : ${metabolicProfile.mitochondrialHealth}

STRUCTURE (15+ paragraphes) :

PARTIE 1 - FLEXIBILITÉ MÉTABOLIQUE (LE CŒUR DU PROBLÈME) :
- Qu'est-ce que la flexibilité métabolique AU NIVEAU CELLULAIRE
- Les transporteurs GLUT4, l'oxydation des acides gras, le pyruvate...
- POURQUOI tu es inflexible - les mécanismes biochimiques
- Ce qui se passe quand tu manges des glucides (spike insuline, crash, cravings...)
- Ce qui se passe quand tu jeûnes (difficulté à switcher sur les graisses)
- Les CONSÉQUENCES sur l'énergie, la composition corporelle, le cerveau

PARTIE 2 - DÉPENDANCE AU GLUCOSE :
- Comment le cerveau devient "accro" au glucose
- Le rôle de l'insuline chroniquement élevée
- La downregulation des récepteurs
- Pourquoi tu as des coups de barre après manger
- Le cercle vicieux glucides → insuline → stockage → faim → glucides

PARTIE 3 - RÉSISTANCE À L'INSULINE (SI APPLICABLE) :
- Les stades de progression vers le diabète type 2
- Où tu te situes sur ce spectre
- Les organes touchés (foie, muscles, tissu adipeux)
- Les marqueurs à surveiller (HOMA-IR, insuline à jeun)

PARTIE 4 - SWITCH MÉTABOLIQUE DÉFAILLANT :
- La β-oxydation des acides gras
- Pourquoi tes mitochondries "préfèrent" le glucose
- L'enzyme CPT-1 et son importance
- Comment le foie réagit (ou ne réagit pas) au jeûne

PARTIE 5 - IMPLICATIONS LONG TERME :
- Risques cardiovasculaires
- Vieillissement accéléré
- Déclin cognitif
- Inflammation chronique de bas grade

RÈGLES :
- Biochimie vulgarisée mais précise
- EXPLIQUER les mécanismes profonds
- Faire peur intelligemment (réalité des risques)
- Pas de protocole détaillé (juste recommandations générales)

Réponds UNIQUEMENT avec l'analyse.`;

  const response = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 5000,
    messages: [{ role: 'user', content: prompt }],
  });

  return response.content[0].type === 'text' ? response.content[0].text : '';
}

// ============================================================================
// NEUROTRANSMETTEURS - ANALYSE PROFONDE
// ============================================================================

async function generateNeuroDeepAnalysis(
  scores: MetabolicScores,
  responses: any
): Promise<string> {
  const dopamine = scores.axes.dopamine || 50;
  const serotonin = scores.axes.serotonine || 50;
  const gaba = scores.axes.gaba || 50;
  const acetylcholine = scores.axes.noradrenaline || 50; // Using noradrenaline as proxy

  const prompt = `Tu es AchZod. Analyse PROFONDE des neurotransmetteurs - niveau biohacking premium.

SCORES :
- Dopamine : ${dopamine}/100
- Sérotonine : ${serotonin}/100
- GABA : ${gaba}/100
- Acétylcholine : ${acetylcholine}/100

STRUCTURE (15+ paragraphes) :

PARTIE 1 - DOPAMINE (Le moteur de la motivation) :
- Score ${dopamine}/100 - ce que ça signifie CONCRÈTEMENT
- La voie de synthèse : Phénylalanine → Tyrosine → L-DOPA → Dopamine
- Les récepteurs D1, D2, D3... et leur rôle
- POURQUOI ta dopamine est là où elle est :
  * Cofacteurs manquants (fer, B6, cuivre, vitamine C) ?
  * Inflammation cérébrale qui dégrade la dopamine ?
  * Excès de stimulation (réseaux sociaux, porn, sucre) = downregulation récepteurs ?
  * Stress chronique qui détourne la tyrosine vers l'adrénaline ?
- Conséquences : motivation, focus, procrastination, addictions, plaisir...
- Le lien dopamine-testostérone-cortisol

PARTIE 2 - SÉROTONINE (L'équilibre émotionnel) :
- Score ${serotonin}/100 - implications
- Voie de synthèse : Tryptophane → 5-HTP → Sérotonine
- 95% produite dans l'INTESTIN - lien microbiome crucial
- POURQUOI ta sérotonine est basse/haute :
  * Inflammation intestinale détournant le tryptophane vers kynurénine ?
  * Compétition avec les BCAA pour le transport cérébral ?
  * Déficit en B6, zinc, magnésium ?
- Conséquences : humeur, sommeil (précurseur mélatonine), impulsivité, douleur...

PARTIE 3 - GABA (Le frein naturel) :
- Score ${gaba}/100 - ce que ça révèle
- Principal neurotransmetteur inhibiteur
- Voie de synthèse : Glutamate → GABA (enzyme GAD + B6)
- Équilibre GABA/Glutamate crucial
- POURQUOI déséquilibre :
  * Déficit B6 (cofacteur GAD) ?
  * Excès de glutamate (MSG, aspartame, stress) ?
  * Inflammation qui augmente l'excitotoxicité ?
- Conséquences : anxiété, rumination, insomnie, tension musculaire...

PARTIE 4 - ACÉTYLCHOLINE (La mémoire et le focus) :
- Score ${acetylcholine}/100
- Voie de synthèse : Choline + Acétyl-CoA → Acétylcholine
- Rôle dans mémoire, apprentissage, contraction musculaire
- POURQUOI déficit :
  * Apport en choline insuffisant ?
  * Problème mitochondrial (manque d'Acétyl-CoA) ?
  * Dégradation excessive (activité cholinestérase) ?
- Conséquences : brain fog, oublis, difficulté d'apprentissage...

PARTIE 5 - INTERACTIONS & ÉQUILIBRE GLOBAL :
- Comment ces 4 neurotransmetteurs interagissent
- L'effet domino d'un déséquilibre
- Lien avec les hormones (cortisol, thyroïde, sexuelles)

RÈGLES :
- Neurobiologie vulgarisée mais PRÉCISE
- Expliquer les MÉCANISMES, pas juste les symptômes
- Faire les liens entre systèmes
- Recommandations générales uniquement (pas de protocole détaillé)

Réponds UNIQUEMENT avec l'analyse.`;

  const response = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 5000,
    messages: [{ role: 'user', content: prompt }],
  });

  return response.content[0].type === 'text' ? response.content[0].text : '';
}

// ============================================================================
// CASCADE HORMONALE
// ============================================================================

async function generateHormoneCascadeAnalysis(
  scores: MetabolicScores,
  responses: any
): Promise<string> {
  const prompt = `Tu es AchZod. Analyse la CASCADE HORMONALE - niveau biohacking premium.

SCORES HORMONAUX :
- Axe thyroïdien : ${scores.axes.fonctionThyroidienne || 50}/100
- Cortisol : ${scores.axes.cortisol || 50}/100
- Testostérone : ${scores.axes.testosterone || 50}/100
- Œstrogènes : ${scores.axes.oestrogenes || 50}/100
- Insuline : ${scores.axes.sensibiliteInsuline || 50}/100
- GH/IGF-1 : ${scores.axes.recuperation || 50}/100

STRUCTURE (15+ paragraphes) :

PARTIE 1 - LA CASCADE HORMONALE (Vue d'ensemble) :
- Hypothalamus → Hypophyse → Glandes périphériques
- Pourquoi TOUT est connecté
- Le concept de "pregnenolone steal" sous stress chronique
- L'ordre d'importance : survie (cortisol) > reproduction (sexuelles) > optimisation (GH, thyroïde)

PARTIE 2 - AXE THYROÏDIEN EN PROFONDEUR :
- TSH → T4 → T3 (forme active) + Reverse T3 (frein)
- POURQUOI ta thyroïde dysfonctionne :
  * Déficit en iode, sélénium, zinc ?
  * Stress chronique augmentant reverse T3 ?
  * Inflammation bloquant la conversion T4→T3 ?
  * Auto-immunité (Hashimoto) à investiguer ?
- Impact sur TOUT : métabolisme, énergie, poids, humeur, libido, cheveux...
- Les vraies valeurs "optimales" vs les ranges "normaux" de labo

PARTIE 3 - CORTISOL & RYTHME CIRCADIEN :
- Le pattern normal : haut le matin, bas le soir
- TON pattern probable et ce qu'il révèle
- Les 4 stades de fatigue surrénalienne
- POURQUOI ton cortisol est déréglé :
  * Stress chronique non géré ?
  * Inflammation de bas grade ?
  * Perturbateurs de sommeil ?
  * Surentraînement ?
- Conséquences : stockage abdominal, catabolisme musculaire, immunité, sommeil...

PARTIE 4 - HORMONES SEXUELLES :
- Testostérone : synthèse, SHBG, forme libre, conversion DHT/œstrogènes
- Œstrogènes : les 3 types, détoxification hépatique, dominance œstrogénique
- Rapport testostérone/œstrogènes et son importance
- POURQUOI déséquilibre :
  * Aromatase excessive (tissu adipeux) ?
  * Foie surchargé ne détoxifiant pas les œstrogènes ?
  * Déficit en zinc, magnésium, vitamine D ?
  * Xénoestrogènes (plastiques, cosmétiques) ?

PARTIE 5 - INSULINE & SENSIBILITÉ :
- Le chef d'orchestre métabolique
- Résistance insuline = chaos hormonal
- Impact sur TOUTES les autres hormones
- Les mécanismes cellulaires de la résistance

PARTIE 6 - GH & IGF-1 :
- Hormone de croissance et son rôle chez l'adulte
- Facteurs qui l'optimisent vs la bloquent
- Lien avec sommeil profond, jeûne, exercice intense
- Pourquoi tu ne récupères peut-être pas bien

RÈGLES :
- Endocrinologie vulgarisée mais PRÉCISE
- Montrer les INTERCONNEXIONS
- Expliquer les cercles vicieux
- Valeurs optimales biohacking vs ranges "normaux"

Réponds UNIQUEMENT avec l'analyse.`;

  const response = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 5000,
    messages: [{ role: 'user', content: prompt }],
  });

  return response.content[0].type === 'text' ? response.content[0].text : '';
}

// ============================================================================
// AXE HPA & STRESS CHRONIQUE
// ============================================================================

async function generateHPAAxisAnalysis(
  scores: MetabolicScores,
  responses: any
): Promise<string> {
  const prompt = `Tu es AchZod. Analyse de l'AXE HPA et du stress chronique - niveau biohacking premium.

SCORE STRESS/CORTISOL : ${scores.axes.cortisol || 50}/100
SCORE RÉCUPÉRATION : ${scores.axes.qualiteSommeil || 50}/100

STRUCTURE (12+ paragraphes) :

PARTIE 1 - L'AXE HPA EXPLIQUÉ :
- Hypothalamus-Pituitary-Adrenal axis
- CRH → ACTH → Cortisol
- Le système de feedback négatif
- Pourquoi c'est LE système à comprendre pour tout biohacker

PARTIE 2 - TON PROFIL DE STRESS :
- Analyse des patterns de stress identifiés
- Stress aigu vs chronique - la différence CRUCIALE
- Les 4 stades de dysfonction surrénalienne :
  1. Alarme (cortisol élevé)
  2. Résistance (cortisol encore élevé mais fatigue)
  3. Épuisement (cortisol qui s'effondre)
  4. Burnout (cortisol plat, DHEA effondrée)
- OÙ tu te situes et pourquoi c'est CRITIQUE

PARTIE 3 - CONSÉQUENCES SYSTÉMIQUES DU STRESS CHRONIQUE :
- Impact sur la thyroïde (T4→T3 bloquée, reverse T3 augmentée)
- Impact sur les hormones sexuelles (pregnenolone steal)
- Impact sur l'intestin (perméabilité, microbiome)
- Impact sur l'inflammation (cytokines pro-inflammatoires)
- Impact sur le cerveau (hippocampe, mémoire, anxiété)
- Impact sur le sommeil (architecture perturbée)
- Impact sur la composition corporelle (stockage abdominal)

PARTIE 4 - LE SYSTÈME NERVEUX AUTONOME :
- Sympathique (fight or flight) vs Parasympathique (rest & digest)
- Ton ratio probable et ce qu'il implique
- La Variabilité de Fréquence Cardiaque (HRV) comme marqueur
- Pourquoi tu es peut-être bloqué en mode sympathique

PARTIE 5 - LES SIGNAUX D'ALARME :
- Fatigue au réveil malgré 8h de sommeil
- Second souffle le soir
- Dépendance à la caféine
- Incapacité à gérer les stresseurs mineurs
- Récupération compromise après l'effort

RÈGLES :
- Neurophysiologie du stress vulgarisée
- Expliquer les MÉCANISMES précis
- Montrer l'urgence sans catastrophisme
- Pas de protocole anti-stress détaillé

Réponds UNIQUEMENT avec l'analyse.`;

  const response = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 4000,
    messages: [{ role: 'user', content: prompt }],
  });

  return response.content[0].type === 'text' ? response.content[0].text : '';
}

// ============================================================================
// INFLAMMATION SYSTÉMIQUE
// ============================================================================

async function generateInflammationAnalysis(
  scores: MetabolicScores,
  responses: any
): Promise<string> {
  const prompt = `Tu es AchZod. Analyse de l'INFLAMMATION SYSTÉMIQUE - niveau biohacking premium.

SCORE INFLAMMATION : ${scores.axes.inflammationSystemique || 50}/100
SCORE IMMUNITÉ : ${scores.axes.fonctionImmunitaire || 50}/100

STRUCTURE (12+ paragraphes) :

PARTIE 1 - INFLAMMATION : L'ENNEMI SILENCIEUX :
- Différence inflammation aiguë (utile) vs chronique de bas grade (destructrice)
- Pourquoi l'inflammation chronique est LA cause racine de presque toutes les maladies modernes
- Les cytokines pro-inflammatoires : IL-1, IL-6, TNF-alpha
- CRP haute sensibilité comme marqueur gold standard

PARTIE 2 - LES SOURCES D'INFLAMMATION IDENTIFIÉES :
- Alimentation inflammatoire (huiles végétales, sucres, aliments transformés)
- Intestin perméable (leaky gut) → inflammation systémique
- Tissu adipeux viscéral = organe endocrinien inflammatoire
- Stress chronique → cortisol → inflammation
- Infections chroniques de bas grade (EBV réactivé, candidose, SIBO...)
- Toxines environnementales (métaux lourds, pesticides, plastiques)

PARTIE 3 - LA CASCADE INFLAMMATOIRE DANS TON CAS :
- Analyse des sources probables basée sur tes réponses
- L'effet boule de neige : inflammation → résistance insuline → plus de gras → plus d'inflammation
- Impact sur le cerveau (neuroinflammation, brain fog, dépression)
- Impact sur les articulations et les tissus
- Impact sur la récupération et la performance

PARTIE 4 - INFLAMMATION & VIEILLISSEMENT :
- Concept d'inflammaging
- Télomères et inflammation
- Pourquoi contrôler l'inflammation = ralentir le vieillissement biologique
- Les centenaires ont TOUS des marqueurs inflammatoires bas

PARTIE 5 - SYSTÈME IMMUNITAIRE :
- Th1 vs Th2 balance
- Auto-immunité et inflammation
- Immunosénescence et ses causes
- Comment le mode de vie moderne détruit l'immunité

RÈGLES :
- Immunologie vulgarisée
- Montrer les LIENS avec tout le reste
- Créer conscience de l'urgence
- Recommandations générales uniquement

Réponds UNIQUEMENT avec l'analyse.`;

  const response = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 4000,
    messages: [{ role: 'user', content: prompt }],
  });

  return response.content[0].type === 'text' ? response.content[0].text : '';
}

// ============================================================================
// SANTÉ MITOCHONDRIALE
// ============================================================================

async function generateMitochondrialAnalysis(
  scores: MetabolicScores,
  responses: any
): Promise<string> {
  const prompt = `Tu es AchZod. Analyse de la SANTÉ MITOCHONDRIALE - niveau biohacking premium.

SCORE MITOCHONDRIES : ${scores.axes.santeMitochondriale || 50}/100
SCORE ÉNERGIE CELLULAIRE : ${scores.axes.flexibiliteMetabolique || 50}/100

STRUCTURE (12+ paragraphes) :

PARTIE 1 - LES MITOCHONDRIES : TES CENTRALES ÉNERGÉTIQUES :
- Qu'est-ce qu'une mitochondrie VRAIMENT
- Combien tu en as (des milliards) et leur importance
- La chaîne respiratoire : Complexes I, II, III, IV, V
- Production d'ATP : la monnaie énergétique universelle
- Pourquoi des mitochondries dysfonctionnelles = fatigue chronique

PARTIE 2 - POURQUOI TES MITOCHONDRIES SOUFFRENT :
- Stress oxydatif et radicaux libres
- Déficits en cofacteurs (CoQ10, NAD+, magnésium, fer, B vitamines)
- Inflammation chronique
- Toxines (métaux lourds, pesticides, médicaments)
- Manque d'exercice (moins de biogenèse mitochondriale)
- Excès d'exercice (stress oxydatif)
- Mauvaise alimentation (substrats de mauvaise qualité)

PARTIE 3 - CONSÉQUENCES DE LA DYSFONCTION MITOCHONDRIALE :
- Fatigue chronique inexpliquée
- Brain fog (le cerveau consomme 20% de l'énergie)
- Difficulté à perdre du gras (β-oxydation compromise)
- Récupération lente après l'effort
- Vieillissement accéléré
- Risque de maladies neurodégénératives

PARTIE 4 - BIOGENÈSE MITOCHONDRIALE :
- Comment ton corps crée de NOUVELLES mitochondries
- Le rôle de PGC-1α (master regulator)
- Ce qui stimule la biogenèse : froid, exercice, jeûne, certains composés
- Ce qui la bloque : inflammation, toxines, sédentarité

PARTIE 5 - MITOPHAGIE : LE NETTOYAGE :
- Élimination des mitochondries défectueuses
- Importance de l'autophagie
- Pourquoi tu accumules peut-être des mitochondries zombies

PARTIE 6 - NAD+ ET LE VIEILLISSEMENT :
- NAD+ : le cofacteur CRUCIAL qui décline avec l'âge
- Lien avec les sirtuines et la longévité
- Pourquoi ton NAD+ est probablement bas

RÈGLES :
- Biologie cellulaire vulgarisée
- Montrer l'importance FONDAMENTALE des mitochondries
- Lier à l'énergie quotidienne ressentie
- Pas de protocole détaillé de supplémentation

Réponds UNIQUEMENT avec l'analyse.`;

  const response = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 4000,
    messages: [{ role: 'user', content: prompt }],
  });

  return response.content[0].type === 'text' ? response.content[0].text : '';
}

// ============================================================================
// DIGESTION & MICROBIOME
// ============================================================================

async function generateGutAnalysis(
  scores: MetabolicScores,
  responses: any
): Promise<string> {
  const prompt = `Tu es AchZod. Analyse PROFONDE de la DIGESTION & MICROBIOME - niveau biohacking premium.

SCORE DIGESTION : ${scores.axes.santéDigestive || 50}/100
SCORE MICROBIOME : ${scores.axes.diversiteMicrobiome || 50}/100
SCORE PERMÉABILITÉ : ${scores.axes.integritéIntestinale || 50}/100

STRUCTURE (15+ paragraphes) :

PARTIE 1 - L'INTESTIN : TON DEUXIÈME CERVEAU :
- 500 millions de neurones dans l'intestin
- L'axe intestin-cerveau (nerf vague, neurotransmetteurs)
- 70% du système immunitaire dans l'intestin
- Pourquoi TOUT commence par le gut

PARTIE 2 - TON MICROBIOME :
- 100 trillions de bactéries, plus que tes propres cellules
- Ratio Firmicutes/Bacteroidetes et ce qu'il signifie
- Diversité microbienne et son importance
- Ce que tes symptômes révèlent sur ton microbiome

PARTIE 3 - DYSBIOSE IDENTIFIÉE :
- Les signes de déséquilibre dans TES réponses
- Excès de pathogènes opportunistes probables
- Manque de bactéries bénéfiques
- SIBO (Small Intestinal Bacterial Overgrowth) - probabilité
- Candida et prolifération fongique

PARTIE 4 - PERMÉABILITÉ INTESTINALE (LEAKY GUT) :
- Les jonctions serrées et leur rôle
- Ce qui les détruit : gluten (zonuline), stress, anti-inflammatoires, alcool, toxines
- Conséquences : passage de toxines et protéines non digérées dans le sang
- Réaction immunitaire → inflammation systémique
- Lien avec auto-immunité, allergies, intolérances

PARTIE 5 - DIGESTION HAUTE :
- Acide gastrique (HCl) : probablement insuffisant
- Enzymes pancréatiques
- Bile et son rôle dans la digestion des graisses
- Pourquoi tu ne digères/absorbes peut-être pas bien malgré une "bonne" alimentation

PARTIE 6 - L'AXE GUT-BRAIN :
- Production de sérotonine (95% dans l'intestin)
- Production de GABA par certaines bactéries
- Impact du microbiome sur l'humeur, l'anxiété, la dépression
- Pourquoi soigner l'intestin = soigner le mental

PARTIE 7 - IMPACT SUR LE MÉTABOLISME :
- Microbiome et extraction calorique
- Microbiome et sensibilité insuline
- Microbiome et stockage des graisses
- Les bactéries qui te font grossir vs celles qui te font maigrir

RÈGLES :
- Gastroentérologie et microbiologie vulgarisées
- Montrer l'importance CAPITALE du gut
- Lier aux symptômes mentionnés
- Pas de protocole de guérison détaillé

Réponds UNIQUEMENT avec l'analyse.`;

  const response = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 5000,
    messages: [{ role: 'user', content: prompt }],
  });

  return response.content[0].type === 'text' ? response.content[0].text : '';
}

// ============================================================================
// DÉTOXIFICATION HÉPATIQUE
// ============================================================================

async function generateDetoxAnalysis(
  scores: MetabolicScores,
  responses: any
): Promise<string> {
  const prompt = `Tu es AchZod. Analyse de la DÉTOXIFICATION HÉPATIQUE - niveau biohacking premium.

SCORE DÉTOX HÉPATIQUE : ${scores.axes.fonctionHepatique || 50}/100

STRUCTURE (10+ paragraphes) :

PARTIE 1 - LE FOIE : L'USINE DE DÉTOX :
- 500+ fonctions du foie
- Les 2 phases de détoxification expliquées en détail
- Phase 1 : Cytochrome P450, oxydation (rend les toxines plus réactives)
- Phase 2 : Conjugaison (glutathion, méthylation, sulfation, glucuronidation)
- L'importance de l'ÉQUILIBRE entre phases

PARTIE 2 - POURQUOI TON FOIE EST SURCHARGÉ :
- Charge toxique moderne (pesticides, additifs, médicaments, alcool, pollution)
- Xénoestrogènes et perturbateurs endocriniens
- Métabolites des hormones à éliminer
- Sous-produits du métabolisme normal

PARTIE 3 - PHASE 1 - ANALYSE :
- Vitesse de ta phase 1 (rapide/normale/lente)
- Implications d'une phase 1 trop rapide : accumulation d'intermédiaires toxiques
- Implications d'une phase 1 lente : toxines qui stagnent
- Polymorphismes génétiques possibles (CYP450)

PARTIE 4 - PHASE 2 - ANALYSE :
- Les 6 voies de conjugaison
- Méthylation : MTHFR et ses implications
- Glutathion : le maître antioxydant
- Sulfation et glucuronidation
- POURQUOI ta phase 2 ne suit peut-être pas

PARTIE 5 - CONSÉQUENCES D'UNE DÉTOX DÉFAILLANTE :
- Accumulation de toxines
- Dominance œstrogénique (œstrogènes non éliminés)
- Fatigue hépatique
- Peau, acné, problèmes dermatologiques
- Sensibilité chimique
- Brain fog

PARTIE 6 - LA VÉSICULE BILIAIRE :
- Production et flux de bile
- Importance pour l'élimination des toxines
- Signes de stase biliaire

RÈGLES :
- Hépatologie et toxicologie vulgarisées
- Montrer le rôle CRUCIAL du foie
- Lier aux symptômes et hormones
- Pas de protocole de détox détaillé

Réponds UNIQUEMENT avec l'analyse.`;

  const response = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 4000,
    messages: [{ role: 'user', content: prompt }],
  });

  return response.content[0].type === 'text' ? response.content[0].text : '';
}

// ============================================================================
// RECOMMANDATIONS BIOHACKING POINTUES
// ============================================================================

async function generateBiohackingRecommendations(
  aiAnalysis: AIAnalysis,
  scores: MetabolicScores
): Promise<string> {
  const blockages = aiAnalysis.topBlockages.slice(0, 5).map(b => `${b.axeName} (${b.score}/100)`).join(', ');

  const prompt = `Tu es AchZod. Donne des RECOMMANDATIONS BIOHACKING POINTUES - pas un programme, des PISTES PRÉCISES.

TOP BLOCAGES : ${blockages}

IMPORTANT :
- Ce sont des RECOMMANDATIONS, pas un programme complet
- Le programme personnalisé = coaching 1:1
- Ici tu donnes des PISTES d'optimisation basées sur l'analyse

STRUCTURE (15+ paragraphes) :

PARTIE 1 - PRIORITÉS ABSOLUES (les 3 leviers à activer EN PREMIER) :
Pour chaque priorité :
- QUOI optimiser précisément
- POURQUOI c'est prioritaire dans SON cas
- COMMENT ça va impacter le reste (effet domino positif)
- Exemple de molécule/pratique clé (sans dosage précis)

PARTIE 2 - RECOMMANDATIONS SOMMEIL & CIRCADIEN :
- Chronotype probable et comment l'optimiser
- Exposition lumineuse (timing, intensité)
- Température et sommeil
- Molécules potentiellement utiles (magnésium glycinate, L-théanine, etc.)
- Pratiques biohacking (lunettes bleues, grounding, etc.)

PARTIE 3 - RECOMMANDATIONS NUTRITION (PISTES, PAS PLAN) :
- Type d'alimentation qui CONVIENDRAIT à ce profil métabolique
- Timing alimentaire optimal (fenêtre, jeûne potentiel)
- Aliments à PRIORISER pour ses blocages spécifiques
- Aliments à ÉVITER (et pourquoi précisément)
- Ratio macros général suggéré

PARTIE 4 - RECOMMANDATIONS SUPPLÉMENTATION (AXES, PAS PROTOCOLE) :
- Catégories de suppléments pertinentes
- Molécules spécifiques à INVESTIGUER
- Dans quel ordre logique les introduire
- Préciser que dosages = coaching personnalisé

PARTIE 5 - RECOMMANDATIONS LIFESTYLE & BIOHACKS :
- Gestion du stress : techniques spécifiques recommandées
- Exposition au froid : pertinence pour ce profil
- Sauna/chaleur : pertinence
- Respiration : techniques spécifiques
- Exposition solaire/vitamine D

PARTIE 6 - RECOMMANDATIONS MOUVEMENT (PISTES) :
- Type d'activité qui CONVIENDRAIT
- Fréquence/intensité générales
- Ce qu'il faut ÉVITER dans son cas
- Travail postural/correctif prioritaire

PARTIE 7 - POUR ALLER PLUS LOIN :
- Analyses sanguines recommandées
- Tests fonctionnels utiles
- Pourquoi le coaching 1:1 est le next step pour un plan COMPLET

RÈGLES :
- Recommandations PRÉCISES mais pas de protocole complet
- Toujours expliquer POURQUOI cette reco pour CE profil
- Montrer l'expertise biohacking
- Créer l'envie d'aller plus loin avec le coaching

Réponds UNIQUEMENT avec les recommandations.`;

  const response = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 5000,
    messages: [{ role: 'user', content: prompt }],
  });

  return response.content[0].type === 'text' ? response.content[0].text : '';
}

// ============================================================================
// BLOODWORK & MARQUEURS
// ============================================================================

async function generateBloodworkDeepAnalysis(
  topBlockages: AIAnalysis['topBlockages'],
  scores: MetabolicScores
): Promise<string> {
  const blockagesInfo = topBlockages.map(b => `${b.axeName} (${b.score}/100)`).join(', ');

  const prompt = `Tu es AchZod. Analyse APPROFONDIE des analyses sanguines recommandées - niveau biohacking premium.

BLOCAGES : ${blockagesInfo}

STRUCTURE (15+ paragraphes) :

PARTIE 1 - POURQUOI LES ANALYSES SONT CRUCIALES :
- Différence entre "normal" et "optimal"
- Les ranges de laboratoire vs les ranges biohacking
- Ce que les médecins ne regardent pas (et devraient)
- L'importance du contexte et de l'interprétation

PARTIE 2 - PANEL MÉTABOLIQUE ESSENTIEL :
Pour chaque marqueur :
- Ce qu'il mesure PRÉCISÉMENT
- Pourquoi il est pertinent pour CE profil
- Range "normal" vs range "optimal biohacking"
- Ce que signifie une valeur haute/basse
- Marqueurs : Glycémie, HbA1c, Insuline à jeun, HOMA-IR, Triglycérides, Cholestérol (LDL, HDL, ratio)

PARTIE 3 - PANEL THYROÏDIEN COMPLET :
- TSH : pourquoi c'est insuffisant seul
- T4 libre et T3 libre : la vraie activité thyroïdienne
- Reverse T3 : le frein souvent ignoré
- Ratio T3/rT3 : le marqueur crucial
- Anticorps anti-TPO et anti-TG : auto-immunité
- Valeurs optimales précises

PARTIE 4 - PANEL HORMONAL :
- Testostérone totale ET libre
- SHBG (le transporteur qui "kidnappe" les hormones)
- Œstradiol et rapport T/E2
- DHEA-S (marqueur surrénalien)
- Cortisol (matin + courbe journalière idéalement)
- Prolactine (souvent oubliée)

PARTIE 5 - MARQUEURS INFLAMMATION :
- CRP haute sensibilité : l'inflammation de bas grade
- Homocystéine : inflammation + méthylation
- Ferritine : inflammation + réserves fer
- Vitesse de sédimentation
- Fibrinogène

PARTIE 6 - PANEL HÉPATIQUE & DÉTOX :
- ASAT/ALAT : fonction hépatique
- GGT : stress oxydatif hépatique
- Bilirubine
- Acide urique

PARTIE 7 - MICRONUTRIMENTS CLÉS :
- Vitamine D (25-OH) - valeur optimale 50-70 ng/mL
- Vitamine B12 et folates (formes actives si possible)
- Ferritine (pas juste fer sérique)
- Magnésium RBC (pas magnésium sérique)
- Zinc plasmatique

PARTIE 8 - TESTS FONCTIONNELS AVANCÉS :
- Test cortisol salivaire 4 points
- Dutch test (métabolites hormonaux)
- Test microbiome (analyse selles)
- SIBO breath test
- Test acides organiques urinaires

PARTIE 9 - COMMENT INTERPRÉTER :
- Ne jamais regarder un marqueur isolément
- Les patterns à identifier
- Quand re-tester
- L'importance du suivi longitudinal

RÈGLES :
- Précision médicale vulgarisée
- Valeurs optimales PRÉCISES
- Expliquer l'interprétation
- Montrer l'expertise biohacking

Réponds UNIQUEMENT avec l'analyse.`;

  const response = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 5000,
    messages: [{ role: 'user', content: prompt }],
  });

  return response.content[0].type === 'text' ? response.content[0].text : '';
}

// ============================================================================
// ASSEMBLAGE HTML PREMIUM BIOHACKING
// ============================================================================

function assemblePremiumBiohackingHTML(params: {
  userName: string;
  scores: MetabolicScores;
  aiAnalysis: AIAnalysis;
  introduction: string;
  morphoBiomecanique: string;
  metabolicDysfonctions: string;
  neuroAnalysis: string;
  hormonesAnalysis: string;
  hpaAnalysis: string;
  inflammationAnalysis: string;
  mitoAnalysis: string;
  gutAnalysis: string;
  detoxAnalysis: string;
  biohackingRecos: string;
  bloodworkAnalysis: string;
}): string {
  const {
    userName,
    scores,
    aiAnalysis,
    introduction,
    morphoBiomecanique,
    metabolicDysfonctions,
    neuroAnalysis,
    hormonesAnalysis,
    hpaAnalysis,
    inflammationAnalysis,
    mitoAnalysis,
    gutAnalysis,
    detoxAnalysis,
    biohackingRecos,
    bloodworkAnalysis,
  } = params;

  const generatedDate = new Date().toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  // Helper to format paragraphs with proper styling
  const formatContent = (text: string) => {
    return text
      .split('\n\n')
      .filter(p => p.trim())
      .map(p => {
        // Check if it's a header
        if (p.startsWith('PARTIE') || p.startsWith('##') || p.match(/^[A-Z\s&]+:$/)) {
          return `<h3 style="color: #00F5D4; font-size: 20px; margin: 32px 0 16px; font-weight: 700;">${p.replace(/^#+\s*/, '').replace(/:$/, '')}</h3>`;
        }
        return `<p style="margin-bottom: 20px; font-size: 17px; line-height: 1.9; color: rgba(255,255,255,0.9);">${p}</p>`;
      })
      .join('');
  };

  // Score color helper
  const getScoreColor = (score: number) => {
    if (score >= 80) return '#00F5D4';
    if (score >= 60) return '#10B981';
    if (score >= 40) return '#F59E0B';
    return '#EF4444';
  };

  // Top blockages for display
  const topBlockages = aiAnalysis.topBlockages.slice(0, 5);

  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Audit Métabolique Biohacking Premium - ${userName}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

    * { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: linear-gradient(180deg, #0A0A0F 0%, #1A1A2E 100%);
      color: #FFFFFF;
      line-height: 1.9;
      font-size: 17px;
    }

    .container {
      max-width: 900px;
      margin: 0 auto;
      padding: 40px 24px;
    }

    .page {
      background: rgba(20, 20, 30, 0.95);
      border-radius: 24px;
      padding: 48px 56px;
      margin-bottom: 48px;
      border: 1px solid rgba(0, 245, 212, 0.2);
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
      page-break-after: always;
    }

    .page-title {
      font-size: 28px;
      font-weight: 800;
      background: linear-gradient(90deg, #00F5D4 0%, #A78BFA 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 40px;
      padding-bottom: 16px;
      border-bottom: 2px solid rgba(0, 245, 212, 0.3);
    }

    .premium-badge {
      display: inline-block;
      background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
      color: #000;
      padding: 10px 24px;
      border-radius: 50px;
      font-size: 14px;
      font-weight: 800;
      letter-spacing: 1px;
      margin-bottom: 24px;
    }

    .score-display {
      text-align: center;
      padding: 48px;
      background: rgba(0, 245, 212, 0.05);
      border-radius: 24px;
      border: 2px solid rgba(0, 245, 212, 0.3);
      margin: 32px 0;
    }

    .score-number {
      font-size: 96px;
      font-weight: 800;
      background: linear-gradient(180deg, #00F5D4 0%, #00B4A0 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      line-height: 1;
    }

    .blockage-card {
      background: rgba(239, 68, 68, 0.1);
      border-left: 4px solid #EF4444;
      border-radius: 12px;
      padding: 20px 24px;
      margin-bottom: 16px;
    }

    .strength-card {
      background: rgba(0, 245, 212, 0.1);
      border-left: 4px solid #00F5D4;
      border-radius: 12px;
      padding: 20px 24px;
      margin-bottom: 16px;
    }

    .insight-box {
      background: linear-gradient(135deg, rgba(0, 245, 212, 0.1) 0%, rgba(167, 139, 250, 0.1) 100%);
      border: 2px solid rgba(0, 245, 212, 0.3);
      border-radius: 16px;
      padding: 32px;
      margin: 32px 0;
    }

    .cta-box {
      background: linear-gradient(135deg, #00F5D4 0%, #A78BFA 100%);
      border-radius: 16px;
      padding: 40px;
      text-align: center;
      margin: 48px 0;
    }

    .cta-box h3 {
      color: #000;
      font-size: 24px;
      margin-bottom: 16px;
    }

    .cta-box p {
      color: rgba(0, 0, 0, 0.8);
      margin-bottom: 24px;
    }

    .cta-button {
      display: inline-block;
      background: #000;
      color: #00F5D4;
      padding: 16px 40px;
      border-radius: 50px;
      font-weight: 700;
      text-decoration: none;
      font-size: 18px;
    }

    .axis-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
      margin: 32px 0;
    }

    .axis-item {
      background: rgba(255, 255, 255, 0.05);
      border-radius: 12px;
      padding: 16px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .axis-score {
      font-size: 24px;
      font-weight: 700;
    }

    @media print {
      .page { page-break-after: always; }
      body { background: white; color: black; }
    }

    @media (max-width: 768px) {
      .page { padding: 32px 24px; }
      .page-title { font-size: 24px; }
      .score-number { font-size: 72px; }
      .axis-grid { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>
  <div class="container">

    <!-- ============================================ -->
    <!-- COVER PAGE -->
    <!-- ============================================ -->
    <div class="page" style="text-align: center; min-height: 90vh; display: flex; flex-direction: column; justify-content: center;">
      <div class="premium-badge">🧬 AUDIT BIOHACKING PREMIUM</div>

      <h1 style="font-size: 42px; font-weight: 800; margin: 24px 0; line-height: 1.2;">
        <span style="background: linear-gradient(90deg, #00F5D4 0%, #A78BFA 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
          ANALYSE MÉTABOLIQUE<br/>COMPLÈTE
        </span>
      </h1>

      <p style="font-size: 28px; color: #FFD700; margin-bottom: 48px; font-weight: 600;">${userName}</p>

      <div class="score-display" style="display: inline-block; margin: 0 auto;">
        <div class="score-number">${scores.overall}</div>
        <div style="font-size: 20px; color: rgba(255,255,255,0.6); margin-top: 8px;">/100 Score Global</div>
      </div>

      <div style="margin-top: 48px; color: rgba(255,255,255,0.6);">
        <p>Généré le ${generatedDate}</p>
        <p style="margin-top: 16px; font-size: 14px;">
          20+ Axes Analysés • Biohacking Premium • Analyse Profonde
        </p>
      </div>

      <div style="margin-top: 48px;">
        <img src="https://cdn.prod.website-files.com/5fd0a9c4883524725ec72282/5fd26bf8a848a19741305727_monogram-white.svg"
             alt="AchZod" style="height: 60px; opacity: 0.8;" />
      </div>
    </div>

    <!-- ============================================ -->
    <!-- TOP BLOCAGES -->
    <!-- ============================================ -->
    <div class="page">
      <h2 class="page-title">🚨 TOP 5 BLOCAGES IDENTIFIÉS</h2>

      <p style="margin-bottom: 32px; color: rgba(255,255,255,0.8);">
        Ces axes nécessitent une attention prioritaire. Chaque blocage crée un effet domino sur le reste de ton métabolisme.
      </p>

      ${topBlockages.map((b, i) => `
        <div class="blockage-card">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <span style="font-size: 14px; color: #EF4444; font-weight: 600;">#${i + 1} PRIORITÉ</span>
              <h4 style="font-size: 18px; margin-top: 4px;">${b.axeName}</h4>
            </div>
            <div style="font-size: 32px; font-weight: 800; color: ${getScoreColor(b.score)};">${b.score}</div>
          </div>
        </div>
      `).join('')}

      <div class="insight-box" style="margin-top: 32px;">
        <h4 style="color: #00F5D4; margin-bottom: 12px;">💡 Ce que ça signifie</h4>
        <p style="color: rgba(255,255,255,0.8);">
          Ces blocages sont interconnectés. Corriger l'un améliore souvent les autres.
          L'analyse qui suit explique en PROFONDEUR les mécanismes derrière chaque dysfonctionnement.
        </p>
      </div>
    </div>

    <!-- ============================================ -->
    <!-- INTRODUCTION BIOHACKING -->
    <!-- ============================================ -->
    <div class="page">
      <h2 class="page-title">📊 BIENVENUE DANS TON AUDIT BIOHACKING</h2>
      ${formatContent(introduction)}
    </div>

    <!-- ============================================ -->
    <!-- MORPHOTYPE & BIOMÉCANIQUE -->
    <!-- ============================================ -->
    <div class="page">
      <h2 class="page-title">👤 MORPHOTYPE & BIOMÉCANIQUE</h2>

      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 32px; text-align: center;">
        <div style="background: rgba(0, 245, 212, 0.1); border-radius: 12px; padding: 24px;">
          <div style="font-size: 36px; font-weight: 800; color: #00F5D4;">${aiAnalysis.morphotype.ectomorphe}%</div>
          <div style="font-size: 14px; color: rgba(255,255,255,0.6);">Ectomorphe</div>
        </div>
        <div style="background: rgba(16, 185, 129, 0.1); border-radius: 12px; padding: 24px;">
          <div style="font-size: 36px; font-weight: 800; color: #10B981;">${aiAnalysis.morphotype.mesomorphe}%</div>
          <div style="font-size: 14px; color: rgba(255,255,255,0.6);">Mésomorphe</div>
        </div>
        <div style="background: rgba(245, 158, 11, 0.1); border-radius: 12px; padding: 24px;">
          <div style="font-size: 36px; font-weight: 800; color: #F59E0B;">${aiAnalysis.morphotype.endomorphe}%</div>
          <div style="font-size: 14px; color: rgba(255,255,255,0.6);">Endomorphe</div>
        </div>
      </div>

      <div style="text-align: center; margin-bottom: 32px;">
        <span style="font-size: 24px; font-weight: 700; color: #FFD700;">${aiAnalysis.morphotype.dominant}</span>
        <span style="color: rgba(255,255,255,0.6);"> • </span>
        <span style="color: #EF4444;">${aiAnalysis.morphotype.bodyfatEstime}% bodyfat estimé</span>
      </div>

      ${formatContent(morphoBiomecanique)}
    </div>

    <!-- ============================================ -->
    <!-- DYSFONCTIONNEMENTS MÉTABOLIQUES -->
    <!-- ============================================ -->
    <div class="page">
      <h2 class="page-title">⚡ DYSFONCTIONNEMENTS MÉTABOLIQUES</h2>
      ${formatContent(metabolicDysfonctions)}
    </div>

    <!-- ============================================ -->
    <!-- NEUROTRANSMETTEURS -->
    <!-- ============================================ -->
    <div class="page">
      <h2 class="page-title">🧠 NEUROTRANSMETTEURS - ANALYSE PROFONDE</h2>

      <div class="axis-grid" style="margin-bottom: 32px;">
        <div class="axis-item">
          <span>Dopamine</span>
          <span class="axis-score" style="color: ${getScoreColor(scores.axes.dopamine || 50)};">${scores.axes.dopamine || 50}</span>
        </div>
        <div class="axis-item">
          <span>Sérotonine</span>
          <span class="axis-score" style="color: ${getScoreColor(scores.axes.serotonine || 50)};">${scores.axes.serotonine || 50}</span>
        </div>
        <div class="axis-item">
          <span>GABA</span>
          <span class="axis-score" style="color: ${getScoreColor(scores.axes.gaba || 50)};">${scores.axes.gaba || 50}</span>
        </div>
        <div class="axis-item">
          <span>Noradrénaline</span>
          <span class="axis-score" style="color: ${getScoreColor(scores.axes.noradrenaline || 50)};">${scores.axes.noradrenaline || 50}</span>
        </div>
      </div>

      ${formatContent(neuroAnalysis)}
    </div>

    <!-- ============================================ -->
    <!-- CASCADE HORMONALE -->
    <!-- ============================================ -->
    <div class="page">
      <h2 class="page-title">⚗️ CASCADE HORMONALE</h2>

      <div class="axis-grid" style="margin-bottom: 32px;">
        <div class="axis-item">
          <span>Thyroïde</span>
          <span class="axis-score" style="color: ${getScoreColor(scores.axes.fonctionThyroidienne || 50)};">${scores.axes.fonctionThyroidienne || 50}</span>
        </div>
        <div class="axis-item">
          <span>Cortisol</span>
          <span class="axis-score" style="color: ${getScoreColor(scores.axes.cortisol || 50)};">${scores.axes.cortisol || 50}</span>
        </div>
        <div class="axis-item">
          <span>Testostérone</span>
          <span class="axis-score" style="color: ${getScoreColor(scores.axes.testosterone || 50)};">${scores.axes.testosterone || 50}</span>
        </div>
        <div class="axis-item">
          <span>Insuline</span>
          <span class="axis-score" style="color: ${getScoreColor(scores.axes.sensibiliteInsuline || 50)};">${scores.axes.sensibiliteInsuline || 50}</span>
        </div>
      </div>

      ${formatContent(hormonesAnalysis)}
    </div>

    <!-- ============================================ -->
    <!-- AXE HPA & STRESS -->
    <!-- ============================================ -->
    <div class="page">
      <h2 class="page-title">🔥 AXE HPA & STRESS CHRONIQUE</h2>
      ${formatContent(hpaAnalysis)}
    </div>

    <!-- ============================================ -->
    <!-- INFLAMMATION -->
    <!-- ============================================ -->
    <div class="page">
      <h2 class="page-title">🔴 INFLAMMATION SYSTÉMIQUE</h2>

      <div class="axis-grid" style="margin-bottom: 32px;">
        <div class="axis-item">
          <span>Contrôle Inflammation</span>
          <span class="axis-score" style="color: ${getScoreColor(scores.axes.inflammationSystemique || 50)};">${scores.axes.inflammationSystemique || 50}</span>
        </div>
        <div class="axis-item">
          <span>Immunité</span>
          <span class="axis-score" style="color: ${getScoreColor(scores.axes.fonctionImmunitaire || 50)};">${scores.axes.fonctionImmunitaire || 50}</span>
        </div>
      </div>

      ${formatContent(inflammationAnalysis)}
    </div>

    <!-- ============================================ -->
    <!-- MITOCHONDRIES -->
    <!-- ============================================ -->
    <div class="page">
      <h2 class="page-title">⚡ SANTÉ MITOCHONDRIALE</h2>

      <div class="axis-grid" style="margin-bottom: 32px;">
        <div class="axis-item">
          <span>Fonction Mitochondriale</span>
          <span class="axis-score" style="color: ${getScoreColor(scores.axes.santeMitochondriale || 50)};">${scores.axes.santeMitochondriale || 50}</span>
        </div>
        <div class="axis-item">
          <span>Énergie Cellulaire</span>
          <span class="axis-score" style="color: ${getScoreColor(scores.axes.flexibiliteMetabolique || 50)};">${scores.axes.flexibiliteMetabolique || 50}</span>
        </div>
      </div>

      ${formatContent(mitoAnalysis)}
    </div>

    <!-- ============================================ -->
    <!-- DIGESTION & MICROBIOME -->
    <!-- ============================================ -->
    <div class="page">
      <h2 class="page-title">🦠 DIGESTION & MICROBIOME</h2>

      <div class="axis-grid" style="margin-bottom: 32px;">
        <div class="axis-item">
          <span>Fonction Digestive</span>
          <span class="axis-score" style="color: ${getScoreColor(scores.axes.santéDigestive || 50)};">${scores.axes.santéDigestive || 50}</span>
        </div>
        <div class="axis-item">
          <span>Santé Microbiome</span>
          <span class="axis-score" style="color: ${getScoreColor(scores.axes.diversiteMicrobiome || 50)};">${scores.axes.diversiteMicrobiome || 50}</span>
        </div>
        <div class="axis-item">
          <span>Barrière Intestinale</span>
          <span class="axis-score" style="color: ${getScoreColor(scores.axes.integritéIntestinale || 50)};">${scores.axes.integritéIntestinale || 50}</span>
        </div>
      </div>

      ${formatContent(gutAnalysis)}
    </div>

    <!-- ============================================ -->
    <!-- DÉTOXIFICATION -->
    <!-- ============================================ -->
    <div class="page">
      <h2 class="page-title">🧪 DÉTOXIFICATION HÉPATIQUE</h2>

      <div class="axis-grid" style="margin-bottom: 32px;">
        <div class="axis-item">
          <span>Détox Hépatique</span>
          <span class="axis-score" style="color: ${getScoreColor(scores.axes.fonctionHepatique || 50)};">${scores.axes.fonctionHepatique || 50}</span>
        </div>
      </div>

      ${formatContent(detoxAnalysis)}
    </div>

    <!-- ============================================ -->
    <!-- RECOMMANDATIONS BIOHACKING -->
    <!-- ============================================ -->
    <div class="page">
      <h2 class="page-title">🎯 RECOMMANDATIONS BIOHACKING</h2>

      <div class="insight-box" style="margin-bottom: 32px;">
        <h4 style="color: #FFD700; margin-bottom: 12px;">⚠️ Important</h4>
        <p style="color: rgba(255,255,255,0.8);">
          Ces recommandations sont des PISTES d'optimisation basées sur ton analyse.
          Pour un protocole COMPLET et personnalisé avec dosages précis, timing optimal et suivi,
          le coaching 1:1 est la prochaine étape.
        </p>
      </div>

      ${formatContent(biohackingRecos)}
    </div>

    <!-- ============================================ -->
    <!-- ANALYSES SANGUINES -->
    <!-- ============================================ -->
    <div class="page">
      <h2 class="page-title">🔬 ANALYSES SANGUINES RECOMMANDÉES</h2>
      ${formatContent(bloodworkAnalysis)}
    </div>

    <!-- ============================================ -->
    <!-- CTA COACHING -->
    <!-- ============================================ -->
    <div class="page">
      <h2 class="page-title">🚀 PASSER À L'ACTION</h2>

      <p style="font-size: 18px; margin-bottom: 32px; color: rgba(255,255,255,0.9);">
        Tu as maintenant une compréhension PROFONDE de ton métabolisme.
        Chaque dysfonctionnement a été expliqué, chaque mécanisme décortiqué.
      </p>

      <p style="margin-bottom: 32px; color: rgba(255,255,255,0.8);">
        Mais comprendre, c'est la première étape. Pour TRANSFORMER ton corps et ton énergie,
        il faut un plan d'action PRÉCIS, adapté à TON profil unique.
      </p>

      <div class="cta-box">
        <h3>Coaching Personnalisé 1:1</h3>
        <p>
          Protocole sur-mesure • Dosages précis • Suivi continu<br/>
          Plan nutrition & training adapté • Ajustements en temps réel
        </p>
        <a href="https://achzodcoaching.com" class="cta-button">Découvrir le Coaching</a>
      </div>

      <div style="text-align: center; margin-top: 48px; padding: 32px; background: rgba(255,255,255,0.05); border-radius: 16px;">
        <p style="font-size: 14px; color: rgba(255,255,255,0.6); margin-bottom: 8px;">Questions sur ton rapport ?</p>
        <p style="color: #00F5D4; font-size: 18px; font-weight: 600;">support@achzodcoaching.com</p>
      </div>

      <div style="text-align: center; margin-top: 48px;">
        <img src="https://cdn.prod.website-files.com/5fd0a9c4883524725ec72282/5fd26bf8a848a19741305727_monogram-white.svg"
             alt="AchZod" style="height: 48px; opacity: 0.6;" />
        <p style="margin-top: 16px; color: rgba(255,255,255,0.5); font-size: 14px;">
          Expert Métabolisme & Biohacking<br/>
          achzodcoaching.com
        </p>
      </div>
    </div>

  </div>
</body>
</html>
  `.trim();
}
