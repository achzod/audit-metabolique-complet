'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ChevronLeft, ChevronRight, Check, Activity, TrendingUp, Zap, Heart, Dumbbell, Moon, Coffee, Target, Scale, Utensils, BarChart3 } from 'lucide-react';

// Zod validation schema
const questionnaireSchema = z.object({
  // Section 1: Profil de Base (8Q)
  age: z.number().min(18).max(100),
  sexe: z.enum(['homme', 'femme', 'autre']),
  poidsActuel: z.number().min(30).max(300),
  taille: z.number().min(120).max(250),
  poidsObjectif: z.number().min(30).max(300),
  timelineObjectif: z.enum(['1_3_mois', '3_6_mois', '6_12_mois', 'plus_12_mois']),
  objectifPrincipal: z.enum(['perte_graisse', 'gain_muscle', 'recomposition', 'performance', 'sante', 'energie']),
  motivationPrincipale: z.string(),

  // Section 2: Composition Corporelle & Tracking (8Q)
  balanceImpedancemetre: z.enum(['oui', 'non']),
  massGrasseActuel: z.number().min(0).max(100).optional(),
  masseMusculaireActuel: z.number().min(0).max(100).optional(),
  graisseViscerale: z.number().min(0).max(30).optional(),
  wearableTracker: z.enum(['whoop', 'oura', 'apple_watch', 'garmin', 'fitbit', 'aucun']),
  wearableDepuis: z.string().optional(),
  consultationDonnees: z.enum(['quotidien', 'hebdo', 'rarement', 'jamais']).optional(),
  photosProgression: z.enum(['oui_regulier', 'parfois', 'jamais']),

  // Section 3: Métabolisme & Énergie (10Q)
  energieMatin: z.number().min(1).max(10),
  energieMidi: z.number().min(1).max(10),
  energieApresMidi: z.number().min(1).max(10),
  energieSoir: z.number().min(1).max(10),
  heureCoupBarre: z.string().optional(),
  frequenceCoupsPompe: z.enum(['jamais', 'rare', 'parfois', 'souvent', 'quotidien']),
  cravingsSucre: z.enum(['jamais', 'rare', 'parfois', 'souvent', 'constant']),
  cravingsSale: z.enum(['jamais', 'rare', 'parfois', 'souvent', 'constant']),
  temperatureCorporelle: z.enum(['toujours_froid', 'souvent_froid', 'normal', 'souvent_chaud', 'toujours_chaud']),
  perceptionMetabolisme: z.enum(['tres_lent', 'lent', 'normal', 'rapide', 'tres_rapide']),

  // Section 4: Nutrition & Tracking Alimentaire (12Q)
  suiviAlimentation: z.enum(['myfitnesspal', 'autre_app', 'carnet', 'non']),
  suiviAlimentationDepuis: z.string().optional(),
  connaisMacros: z.enum(['oui_precisement', 'approximativement', 'non']),
  proteinesJour: z.number().min(0).max(500).optional(),
  glucidesJour: z.number().min(0).max(1000).optional(),
  lipidesJour: z.number().min(0).max(300).optional(),
  caloriesMoyennesJour: z.number().min(0).max(10000).optional(),
  nombreRepasJour: z.enum(['1', '2', '3', '4', '5_plus']),
  jeuneIntermittent: z.enum(['oui', 'non', 'parfois']),
  fenetreAlimentation: z.enum(['16_8', '18_6', '20_4', 'omad', 'autre', 'non_applicable']).optional(),
  nutritionPreWorkout: z.enum(['glucides', 'proteines', 'rien', 'ne_entraine_pas']),
  nutritionPostWorkout: z.enum(['proteines_glucides', 'proteines_seules', 'rien', 'ne_entraine_pas']),

  // Section 5: Digestion & Microbiome (8Q)
  ballonnements: z.enum(['jamais', 'rare', 'parfois', 'souvent', 'quotidien']),
  transitIntestinal: z.enum(['constipation', 'normal', 'diarrhee', 'alterne']),
  frequenceSelles: z.enum(['moins_3_sem', '3_6_sem', '1_jour', '2_3_jour', '3_plus_jour']),
  douleursAbdominales: z.enum(['jamais', 'rare', 'parfois', 'souvent', 'quotidien']),
  intolerances: z.array(z.string()).default([]),
  refluxGastrique: z.enum(['jamais', 'rare', 'parfois', 'souvent', 'quotidien']),
  priseProbiotiques: z.enum(['jamais', 'passe', 'actuellement']),
  qualiteDigestion: z.number().min(1).max(10),

  // Section 6: Activité & Performance (12Q)
  frequenceEntrainement: z.enum(['0', '1_2', '3_4', '5_6', '7_plus']),
  repartitionCardio: z.number().min(0).max(100),
  repartitionMusculation: z.number().min(0).max(100),
  repartitionSport: z.number().min(0).max(100),
  intensiteMoyenne: z.enum(['legere', 'moderee', 'intense', 'tres_intense']),
  dureeSessionMoyenne: z.number().min(0).max(300),
  vo2Max: z.number().min(0).max(100).optional(),
  pbDeveloppe: z.number().min(0).max(500).optional(),
  pbSquat: z.number().min(0).max(500).optional(),
  pbDeadlift: z.number().min(0).max(500).optional(),
  nombrePasJour: z.number().min(0).max(50000).optional(),
  progressionPerformance: z.enum(['regresse', 'stagne', 'lente', 'bonne', 'excellente']),

  // Section 7: Sommeil & Récupération (15Q)
  heuresCoucher: z.string(),
  heuresReveil: z.string(),
  heuresSommeilNuit: z.number().min(3).max(14),
  qualiteSommeil: z.number().min(1).max(10),
  difficulteEndormissement: z.enum(['jamais', 'rare', 'parfois', 'souvent', 'quotidien']),
  reveilsNocturnes: z.number().min(0).max(10),
  reveilleMatin: z.enum(['tres_difficile', 'difficile', 'normal', 'facile', 'tres_facile']),
  chronotype: z.enum(['matin', 'intermediaire', 'soir']),
  wearableTrackSommeil: z.enum(['oui', 'non', 'pas_de_wearable']),
  scoreSommeilMoyen: z.number().min(0).max(100).optional(),
  sommeilProfond: z.string().optional(),
  sommeilLeger: z.string().optional(),
  sommeilREM: z.string().optional(),
  frequenceCardiaqueNocturne: z.number().min(0).max(200).optional(),
  hrvNocturne: z.number().min(0).max(300).optional(),

  // Section 8: HRV & Récupération Cardiaque (8Q)
  connaisHRV: z.enum(['oui_track', 'jai_mesure', 'non']),
  hrvMoyenReveil: z.number().min(0).max(300).optional(),
  hrvPlusBasRecent: z.number().min(0).max(300).optional(),
  hrvPlusHautRecent: z.number().min(0).max(300).optional(),
  frequenceCardiaqueRepos: z.number().min(30).max(150).optional(),
  frequenceCardiaqueMax: z.number().min(100).max(250).optional(),
  tempsRecuperationFC: z.enum(['moins_1min', '1_2min', '2_3min', '3plus_min', 'ne_sais_pas']).optional(),
  readyRecoveryScore: z.number().min(0).max(100).optional(),

  // Section 9: Analyses & Biomarqueurs (7Q)
  analysesSanguines: z.enum(['moins_3mois', '3_6mois', '6_12mois', 'plus_12mois', 'jamais']),
  vitamineD: z.number().min(0).max(200).optional(),
  ferritine: z.number().min(0).max(1000).optional(),
  tsh: z.number().min(0).max(20).optional(),
  testosteroneTotale: z.number().min(0).max(2000).optional(),
  glycemieJeun: z.number().min(0).max(300).optional(),
  utiliseCGM: z.enum(['oui', 'non', 'jai_teste']),

  // Section 10: Hormones & Stress (8Q)
  niveauStress: z.number().min(1).max(10),
  gestionStress: z.enum(['tres_mauvaise', 'mauvaise', 'moyenne', 'bonne', 'excellente']),
  symptomesThyroide: z.array(z.string()).default([]),
  resistanceInsuline: z.enum(['non', 'soupconnee', 'diagnostiquee']),
  hypoglycemiesFrequentes: z.enum(['jamais', 'rare', 'parfois', 'souvent', 'quotidien']),
  menstruationReguliere: z.enum(['oui', 'non', 'non_applicable']),
  symptomesSPM: z.array(z.string()).default([]),
  menopauseAndropause: z.enum(['non', 'pre', 'en_cours', 'post']),

  // Section 11: Lifestyle & Substances (7Q)
  consommationAlcool: z.enum(['aucune', 'occasionnel', '1_3_verres', '4_7_verres', '8_plus_verres']).optional(),
  consommationCafeine: z.enum(['0', '1_cafe', '2_3_cafes', '4_5_cafes', '6_plus_cafes']).optional(),
  heureDernierCafe: z.string().optional(),
  tabac: z.enum(['jamais', 'ancien', 'occasionnel', 'regulier']).optional(),
  hydratationLitresJour: z.number().min(0).max(10).optional(),
  supplementsActuels: z.array(z.string()).default([]),
  medicamentsReguliers: z.string().optional(),
});

type QuestionnaireFormData = z.infer<typeof questionnaireSchema>;

const sections = [
  {
    id: 1,
    title: 'Profil de Base',
    icon: Activity,
    color: '#00F5D4',
  },
  {
    id: 2,
    title: 'Composition Corporelle & Tracking',
    icon: Scale,
    color: '#A78BFA',
  },
  {
    id: 3,
    title: 'Métabolisme & Énergie',
    icon: Zap,
    color: '#FCD34D',
  },
  {
    id: 4,
    title: 'Nutrition & Tracking Alimentaire',
    icon: Utensils,
    color: '#F472B6',
  },
  {
    id: 5,
    title: 'Digestion & Microbiome',
    icon: Heart,
    color: '#FB923C',
  },
  {
    id: 6,
    title: 'Activité & Performance',
    icon: Dumbbell,
    color: '#34D399',
  },
  {
    id: 7,
    title: 'Sommeil & Récupération',
    icon: Moon,
    color: '#60A5FA',
  },
  {
    id: 8,
    title: 'HRV & Récupération Cardiaque',
    icon: Activity,
    color: '#C084FC',
  },
  {
    id: 9,
    title: 'Analyses & Biomarqueurs',
    icon: BarChart3,
    color: '#FF6B9D',
  },
  {
    id: 10,
    title: 'Hormones & Stress',
    icon: TrendingUp,
    color: '#00F5D4',
  },
  {
    id: 11,
    title: 'Lifestyle & Substances',
    icon: Coffee,
    color: '#A78BFA',
  },
];

export default function QuestionnairePage() {
  const router = useRouter();
  const [currentSection, setCurrentSection] = useState(0);
  const [completedSections, setCompletedSections] = useState<number[]>([]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<QuestionnaireFormData>({
    resolver: zodResolver(questionnaireSchema),
    mode: 'onChange',
  });

  // Watch conditional fields
  const balanceImpedancemetre = watch('balanceImpedancemetre');
  const wearableTracker = watch('wearableTracker');
  const suiviAlimentation = watch('suiviAlimentation');
  const connaisMacros = watch('connaisMacros');
  const jeuneIntermittent = watch('jeuneIntermittent');
  const wearableTrackSommeil = watch('wearableTrackSommeil');
  const connaisHRV = watch('connaisHRV');
  const analysesSanguines = watch('analysesSanguines');

  const onSubmit = (data: QuestionnaireFormData) => {
    // Save to localStorage
    localStorage.setItem('questionnaireData', JSON.stringify(data));

    // Redirect to checkout
    router.push('/audit-complet/checkout');
  };

  const nextSection = () => {
    if (currentSection < sections.length - 1) {
      if (!completedSections.includes(currentSection)) {
        setCompletedSections([...completedSections, currentSection]);
      }
      setCurrentSection(currentSection + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const progress = ((currentSection + 1) / sections.length) * 100;
  const CurrentIcon = sections[currentSection].icon;

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white">
      {/* Header with Progress */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0F]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-xl font-bold bg-gradient-to-r from-[#00F5D4] to-[#A78BFA] bg-clip-text text-transparent">
              Audit Métabolique Complet
            </h1>
            <div className="text-sm text-gray-400">
              Section {currentSection + 1} / {sections.length}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="relative h-2 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#00F5D4] to-[#A78BFA]"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Section Pills */}
          <div className="flex gap-2 mt-4 overflow-x-auto pb-2 scrollbar-hide">
            {sections.map((section, idx) => (
              <button
                key={section.id}
                onClick={() => setCurrentSection(idx)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs whitespace-nowrap transition-all ${
                  idx === currentSection
                    ? 'bg-gradient-to-r from-[#00F5D4]/20 to-[#A78BFA]/20 border border-[#00F5D4]'
                    : completedSections.includes(idx)
                    ? 'bg-white/5 border border-white/10 text-gray-400'
                    : 'bg-white/5 border border-white/5 text-gray-500'
                }`}
              >
                {completedSections.includes(idx) && <Check className="w-3 h-3" />}
                {section.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-40 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit(onSubmit)}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSection}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Section Header */}
                <div className="mb-8 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#00F5D4]/20 to-[#A78BFA]/20 border border-[#00F5D4]/30 mb-4">
                    <CurrentIcon className="w-8 h-8 text-[#00F5D4]" />
                  </div>
                  <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-[#00F5D4] to-[#A78BFA] bg-clip-text text-transparent">
                    {sections[currentSection].title}
                  </h2>
                  <p className="text-gray-400">
                    Remplissez les informations suivantes avec précision
                  </p>
                </div>

                {/* Section Content */}
                <div className="space-y-6">
                  {currentSection === 0 && (
                    <>
                      {/* Section 1: Profil de Base (8Q) */}
                      <QuestionCard title="1. Quel est votre âge ?" error={errors.age?.message}>
                        <input
                          type="number"
                          {...register('age', { valueAsNumber: true })}
                          className="input-field"
                          placeholder="Ex: 35"
                        />
                      </QuestionCard>

                      <QuestionCard title="2. Quel est votre sexe biologique ?" error={errors.sexe?.message}>
                        <select {...register('sexe')} className="input-field">
                          <option value="">Sélectionner...</option>
                          <option value="homme">Homme</option>
                          <option value="femme">Femme</option>
                          <option value="autre">Autre</option>
                        </select>
                      </QuestionCard>

                      <QuestionCard title="3. Quel est votre poids actuel ? (kg)" error={errors.poidsActuel?.message}>
                        <input
                          type="number"
                          step="0.1"
                          {...register('poidsActuel', { valueAsNumber: true })}
                          className="input-field"
                          placeholder="Ex: 75.5"
                        />
                      </QuestionCard>

                      <QuestionCard title="4. Quelle est votre taille ? (cm)" error={errors.taille?.message}>
                        <input
                          type="number"
                          {...register('taille', { valueAsNumber: true })}
                          className="input-field"
                          placeholder="Ex: 175"
                        />
                      </QuestionCard>

                      <QuestionCard title="5. Quel est votre poids objectif ? (kg)" error={errors.poidsObjectif?.message}>
                        <input
                          type="number"
                          step="0.1"
                          {...register('poidsObjectif', { valueAsNumber: true })}
                          className="input-field"
                          placeholder="Ex: 70"
                        />
                      </QuestionCard>

                      <QuestionCard title="6. Dans quelle timeline souhaitez-vous atteindre votre objectif ?" error={errors.timelineObjectif?.message}>
                        <select {...register('timelineObjectif')} className="input-field">
                          <option value="">Sélectionner...</option>
                          <option value="1_3_mois">1-3 mois</option>
                          <option value="3_6_mois">3-6 mois</option>
                          <option value="6_12_mois">6-12 mois</option>
                          <option value="plus_12_mois">Plus de 12 mois</option>
                        </select>
                      </QuestionCard>

                      <QuestionCard title="7. Quel est votre objectif principal ?" error={errors.objectifPrincipal?.message}>
                        <select {...register('objectifPrincipal')} className="input-field">
                          <option value="">Sélectionner...</option>
                          <option value="perte_graisse">Perte de graisse</option>
                          <option value="gain_muscle">Gain de masse musculaire</option>
                          <option value="recomposition">Recomposition corporelle</option>
                          <option value="performance">Amélioration performance</option>
                          <option value="sante">Amélioration santé générale</option>
                          <option value="energie">Augmentation énergie / vitalité</option>
                        </select>
                      </QuestionCard>

                      <QuestionCard title="8. Quelle est votre motivation principale ?" error={errors.motivationPrincipale?.message}>
                        <textarea
                          {...register('motivationPrincipale')}
                          className="input-field"
                          rows={3}
                          placeholder="Décrivez votre motivation principale..."
                        />
                      </QuestionCard>
                    </>
                  )}

                  {currentSection === 1 && (
                    <>
                      {/* Section 2: Composition Corporelle & Tracking (8Q) */}
                      <QuestionCard title="11. As-tu une balance impédancemètre ?" error={errors.balanceImpedancemetre?.message}>
                        <select {...register('balanceImpedancemetre')} className="input-field">
                          <option value="">Sélectionner...</option>
                          <option value="oui">Oui</option>
                          <option value="non">Non</option>
                        </select>
                      </QuestionCard>

                      {balanceImpedancemetre === 'oui' && (
                        <>
                          <QuestionCard title="12. Si oui, quel est votre % de masse grasse actuel ?" error={errors.massGrasseActuel?.message}>
                            <input
                              type="number"
                              step="0.1"
                              {...register('massGrasseActuel', { valueAsNumber: true })}
                              className="input-field"
                              placeholder="Ex: 20.5"
                            />
                          </QuestionCard>

                          <QuestionCard title="13. Si oui, quel est votre % de masse musculaire actuel ?" error={errors.masseMusculaireActuel?.message}>
                            <input
                              type="number"
                              step="0.1"
                              {...register('masseMusculaireActuel', { valueAsNumber: true })}
                              className="input-field"
                              placeholder="Ex: 35.2"
                            />
                          </QuestionCard>

                          <QuestionCard title="14. Si oui, quel est votre niveau de graisse viscérale ?" error={errors.graisseViscerale?.message}>
                            <input
                              type="number"
                              {...register('graisseViscerale', { valueAsNumber: true })}
                              className="input-field"
                              placeholder="Ex: 8"
                            />
                          </QuestionCard>
                        </>
                      )}

                      <QuestionCard title="15. Utilises-tu un wearable/tracker ?" error={errors.wearableTracker?.message}>
                        <select {...register('wearableTracker')} className="input-field">
                          <option value="">Sélectionner...</option>
                          <option value="whoop">Whoop</option>
                          <option value="oura">Oura Ring</option>
                          <option value="apple_watch">Apple Watch</option>
                          <option value="garmin">Garmin</option>
                          <option value="fitbit">Fitbit</option>
                          <option value="aucun">Aucun</option>
                        </select>
                      </QuestionCard>

                      {wearableTracker !== 'aucun' && wearableTracker && (
                        <>
                          <QuestionCard title="16. Si oui, depuis combien de temps ?" error={errors.wearableDepuis?.message}>
                            <input
                              type="text"
                              {...register('wearableDepuis')}
                              className="input-field"
                              placeholder="Ex: 6 mois, 2 ans..."
                            />
                          </QuestionCard>

                          <QuestionCard title="17. Consultes-tu tes données régulièrement ?" error={errors.consultationDonnees?.message}>
                            <select {...register('consultationDonnees')} className="input-field">
                              <option value="">Sélectionner...</option>
                              <option value="quotidien">Quotidien</option>
                              <option value="hebdo">Hebdomadaire</option>
                              <option value="rarement">Rarement</option>
                              <option value="jamais">Jamais</option>
                            </select>
                          </QuestionCard>
                        </>
                      )}

                      <QuestionCard title="18. Prends-tu des photos de progression ?" error={errors.photosProgression?.message}>
                        <select {...register('photosProgression')} className="input-field">
                          <option value="">Sélectionner...</option>
                          <option value="oui_regulier">Oui régulièrement</option>
                          <option value="parfois">Parfois</option>
                          <option value="jamais">Jamais</option>
                        </select>
                      </QuestionCard>
                    </>
                  )}

                  {currentSection === 2 && (
                    <>
                      {/* Section 3: Métabolisme & Énergie (10Q) */}
                      <QuestionCard title="19. Niveau d'énergie le MATIN (1-10)" error={errors.energieMatin?.message}>
                        <input
                          type="range"
                          min="1"
                          max="10"
                          {...register('energieMatin', { valueAsNumber: true })}
                          className="range-field"
                        />
                        <div className="flex justify-between text-xs text-gray-400 mt-2">
                          <span>Épuisé</span>
                          <span>Très énergique</span>
                        </div>
                      </QuestionCard>

                      <QuestionCard title="20. Niveau d'énergie à MIDI (1-10)" error={errors.energieMidi?.message}>
                        <input
                          type="range"
                          min="1"
                          max="10"
                          {...register('energieMidi', { valueAsNumber: true })}
                          className="range-field"
                        />
                        <div className="flex justify-between text-xs text-gray-400 mt-2">
                          <span>Épuisé</span>
                          <span>Très énergique</span>
                        </div>
                      </QuestionCard>

                      <QuestionCard title="21. Niveau d'énergie l'APRÈS-MIDI (1-10)" error={errors.energieApresMidi?.message}>
                        <input
                          type="range"
                          min="1"
                          max="10"
                          {...register('energieApresMidi', { valueAsNumber: true })}
                          className="range-field"
                        />
                        <div className="flex justify-between text-xs text-gray-400 mt-2">
                          <span>Épuisé</span>
                          <span>Très énergique</span>
                        </div>
                      </QuestionCard>

                      <QuestionCard title="22. Niveau d'énergie le SOIR (1-10)" error={errors.energieSoir?.message}>
                        <input
                          type="range"
                          min="1"
                          max="10"
                          {...register('energieSoir', { valueAsNumber: true })}
                          className="range-field"
                        />
                        <div className="flex justify-between text-xs text-gray-400 mt-2">
                          <span>Épuisé</span>
                          <span>Très énergique</span>
                        </div>
                      </QuestionCard>

                      <QuestionCard title="23. Heure du 'coup de barre' principal (si applicable)" error={errors.heureCoupBarre?.message}>
                        <input
                          type="time"
                          {...register('heureCoupBarre')}
                          className="input-field"
                        />
                      </QuestionCard>

                      <QuestionCard title="24. Fréquence des coups de pompe" error={errors.frequenceCoupsPompe?.message}>
                        <select {...register('frequenceCoupsPompe')} className="input-field">
                          <option value="">Sélectionner...</option>
                          <option value="jamais">Jamais</option>
                          <option value="rare">Rare</option>
                          <option value="parfois">Parfois</option>
                          <option value="souvent">Souvent</option>
                          <option value="quotidien">Quotidien</option>
                        </select>
                      </QuestionCard>

                      <QuestionCard title="25. Cravings de sucre" error={errors.cravingsSucre?.message}>
                        <select {...register('cravingsSucre')} className="input-field">
                          <option value="">Sélectionner...</option>
                          <option value="jamais">Jamais</option>
                          <option value="rare">Rare</option>
                          <option value="parfois">Parfois</option>
                          <option value="souvent">Souvent</option>
                          <option value="constant">Constant</option>
                        </select>
                      </QuestionCard>

                      <QuestionCard title="26. Cravings de salé" error={errors.cravingsSale?.message}>
                        <select {...register('cravingsSale')} className="input-field">
                          <option value="">Sélectionner...</option>
                          <option value="jamais">Jamais</option>
                          <option value="rare">Rare</option>
                          <option value="parfois">Parfois</option>
                          <option value="souvent">Souvent</option>
                          <option value="constant">Constant</option>
                        </select>
                      </QuestionCard>

                      <QuestionCard title="27. Température corporelle perçue" error={errors.temperatureCorporelle?.message}>
                        <select {...register('temperatureCorporelle')} className="input-field">
                          <option value="">Sélectionner...</option>
                          <option value="toujours_froid">Toujours froid</option>
                          <option value="souvent_froid">Souvent froid</option>
                          <option value="normal">Normal</option>
                          <option value="souvent_chaud">Souvent chaud</option>
                          <option value="toujours_chaud">Toujours chaud</option>
                        </select>
                      </QuestionCard>

                      <QuestionCard title="28. Comment percevez-vous votre métabolisme ?" error={errors.perceptionMetabolisme?.message}>
                        <select {...register('perceptionMetabolisme')} className="input-field">
                          <option value="">Sélectionner...</option>
                          <option value="tres_lent">Très lent</option>
                          <option value="lent">Lent</option>
                          <option value="normal">Normal</option>
                          <option value="rapide">Rapide</option>
                          <option value="tres_rapide">Très rapide</option>
                        </select>
                      </QuestionCard>
                    </>
                  )}

                  {currentSection === 3 && (
                    <>
                      {/* Section 4: Nutrition & Tracking Alimentaire (12Q) */}
                      <QuestionCard title="29. Suis-tu ton alimentation ?" error={errors.suiviAlimentation?.message}>
                        <select {...register('suiviAlimentation')} className="input-field">
                          <option value="">Sélectionner...</option>
                          <option value="myfitnesspal">MyFitnessPal</option>
                          <option value="autre_app">Autre application</option>
                          <option value="carnet">Carnet papier/notes</option>
                          <option value="non">Non</option>
                        </select>
                      </QuestionCard>

                      {suiviAlimentation !== 'non' && suiviAlimentation && (
                        <QuestionCard title="30. Si oui, depuis combien de temps ?" error={errors.suiviAlimentationDepuis?.message}>
                          <input
                            type="text"
                            {...register('suiviAlimentationDepuis')}
                            className="input-field"
                            placeholder="Ex: 3 mois, 1 an..."
                          />
                        </QuestionCard>
                      )}

                      <QuestionCard title="31. Connais-tu tes macros actuelles ?" error={errors.connaisMacros?.message}>
                        <select {...register('connaisMacros')} className="input-field">
                          <option value="">Sélectionner...</option>
                          <option value="oui_precisement">Oui précisément</option>
                          <option value="approximativement">Approximativement</option>
                          <option value="non">Non</option>
                        </select>
                      </QuestionCard>

                      {(connaisMacros === 'oui_precisement' || connaisMacros === 'approximativement') && (
                        <>
                          <QuestionCard title="32. Protéines par jour (g)" error={errors.proteinesJour?.message}>
                            <input
                              type="number"
                              {...register('proteinesJour', { valueAsNumber: true })}
                              className="input-field"
                              placeholder="Ex: 150"
                            />
                          </QuestionCard>

                          <QuestionCard title="33. Glucides par jour (g)" error={errors.glucidesJour?.message}>
                            <input
                              type="number"
                              {...register('glucidesJour', { valueAsNumber: true })}
                              className="input-field"
                              placeholder="Ex: 200"
                            />
                          </QuestionCard>

                          <QuestionCard title="34. Lipides par jour (g)" error={errors.lipidesJour?.message}>
                            <input
                              type="number"
                              {...register('lipidesJour', { valueAsNumber: true })}
                              className="input-field"
                              placeholder="Ex: 70"
                            />
                          </QuestionCard>

                          <QuestionCard title="35. Calories moyennes par jour" error={errors.caloriesMoyennesJour?.message}>
                            <input
                              type="number"
                              {...register('caloriesMoyennesJour', { valueAsNumber: true })}
                              className="input-field"
                              placeholder="Ex: 2200"
                            />
                          </QuestionCard>
                        </>
                      )}

                      <QuestionCard title="36. Nombre de repas par jour" error={errors.nombreRepasJour?.message}>
                        <select {...register('nombreRepasJour')} className="input-field">
                          <option value="">Sélectionner...</option>
                          <option value="1">1 repas</option>
                          <option value="2">2 repas</option>
                          <option value="3">3 repas</option>
                          <option value="4">4 repas</option>
                          <option value="5_plus">5 repas ou plus</option>
                        </select>
                      </QuestionCard>

                      <QuestionCard title="37. Pratiques-tu le jeûne intermittent ?" error={errors.jeuneIntermittent?.message}>
                        <select {...register('jeuneIntermittent')} className="input-field">
                          <option value="">Sélectionner...</option>
                          <option value="oui">Oui</option>
                          <option value="non">Non</option>
                          <option value="parfois">Parfois</option>
                        </select>
                      </QuestionCard>

                      {(jeuneIntermittent === 'oui' || jeuneIntermittent === 'parfois') && (
                        <QuestionCard title="38. Si oui, quelle fenêtre d'alimentation ?" error={errors.fenetreAlimentation?.message}>
                          <select {...register('fenetreAlimentation')} className="input-field">
                            <option value="">Sélectionner...</option>
                            <option value="16_8">16/8 (jeûne 16h, alimentation 8h)</option>
                            <option value="18_6">18/6 (jeûne 18h, alimentation 6h)</option>
                            <option value="20_4">20/4 (jeûne 20h, alimentation 4h)</option>
                            <option value="omad">OMAD (1 repas par jour)</option>
                            <option value="autre">Autre</option>
                          </select>
                        </QuestionCard>
                      )}

                      <QuestionCard title="39. Nutrition pré-workout" error={errors.nutritionPreWorkout?.message}>
                        <select {...register('nutritionPreWorkout')} className="input-field">
                          <option value="">Sélectionner...</option>
                          <option value="glucides">Glucides</option>
                          <option value="proteines">Protéines</option>
                          <option value="rien">Rien</option>
                          <option value="ne_entraine_pas">Ne m'entraîne pas</option>
                        </select>
                      </QuestionCard>

                      <QuestionCard title="40. Nutrition post-workout" error={errors.nutritionPostWorkout?.message}>
                        <select {...register('nutritionPostWorkout')} className="input-field">
                          <option value="">Sélectionner...</option>
                          <option value="proteines_glucides">Protéines + Glucides</option>
                          <option value="proteines_seules">Protéines seules</option>
                          <option value="rien">Rien</option>
                          <option value="ne_entraine_pas">Ne m'entraîne pas</option>
                        </select>
                      </QuestionCard>
                    </>
                  )}

                  {currentSection === 4 && (
                    <>
                      {/* Section 5: Digestion & Microbiome (8Q) */}
                      <QuestionCard title="41. Ballonnements" error={errors.ballonnements?.message}>
                        <select {...register('ballonnements')} className="input-field">
                          <option value="">Sélectionner...</option>
                          <option value="jamais">Jamais</option>
                          <option value="rare">Rare</option>
                          <option value="parfois">Parfois</option>
                          <option value="souvent">Souvent</option>
                          <option value="quotidien">Quotidien</option>
                        </select>
                      </QuestionCard>

                      <QuestionCard title="42. Transit intestinal" error={errors.transitIntestinal?.message}>
                        <select {...register('transitIntestinal')} className="input-field">
                          <option value="">Sélectionner...</option>
                          <option value="constipation">Constipation</option>
                          <option value="normal">Normal</option>
                          <option value="diarrhee">Diarrhée</option>
                          <option value="alterne">Alterne</option>
                        </select>
                      </QuestionCard>

                      <QuestionCard title="43. Fréquence de selles par jour" error={errors.frequenceSelles?.message}>
                        <select {...register('frequenceSelles')} className="input-field">
                          <option value="">Sélectionner...</option>
                          <option value="moins_3_sem">Moins de 3 fois par semaine</option>
                          <option value="3_6_sem">3-6 fois par semaine</option>
                          <option value="1_jour">1 fois par jour</option>
                          <option value="2_3_jour">2-3 fois par jour</option>
                          <option value="3_plus_jour">3+ fois par jour</option>
                        </select>
                      </QuestionCard>

                      <QuestionCard title="44. Douleurs abdominales" error={errors.douleursAbdominales?.message}>
                        <select {...register('douleursAbdominales')} className="input-field">
                          <option value="">Sélectionner...</option>
                          <option value="jamais">Jamais</option>
                          <option value="rare">Rare</option>
                          <option value="parfois">Parfois</option>
                          <option value="souvent">Souvent</option>
                          <option value="quotidien">Quotidien</option>
                        </select>
                      </QuestionCard>

                      <QuestionCard title="45. Intolérances identifiées (sélection multiple)" error={errors.intolerances?.message}>
                        <div className="space-y-2">
                          {['Lactose', 'Gluten', 'FODMAPs', 'Histamine', 'Autre', 'Aucune'].map((intolerance) => (
                            <label key={intolerance} className="flex items-center gap-2 text-sm">
                              <input
                                type="checkbox"
                                value={intolerance}
                                {...register('intolerances')}
                                className="checkbox-field"
                              />
                              <span>{intolerance}</span>
                            </label>
                          ))}
                        </div>
                      </QuestionCard>

                      <QuestionCard title="46. Reflux gastrique" error={errors.refluxGastrique?.message}>
                        <select {...register('refluxGastrique')} className="input-field">
                          <option value="">Sélectionner...</option>
                          <option value="jamais">Jamais</option>
                          <option value="rare">Rare</option>
                          <option value="parfois">Parfois</option>
                          <option value="souvent">Souvent</option>
                          <option value="quotidien">Quotidien</option>
                        </select>
                      </QuestionCard>

                      <QuestionCard title="47. Prise de probiotiques" error={errors.priseProbiotiques?.message}>
                        <select {...register('priseProbiotiques')} className="input-field">
                          <option value="">Sélectionner...</option>
                          <option value="jamais">Jamais</option>
                          <option value="passe">Dans le passé</option>
                          <option value="actuellement">Actuellement</option>
                        </select>
                      </QuestionCard>

                      <QuestionCard title="48. Qualité de digestion globale (1-10)" error={errors.qualiteDigestion?.message}>
                        <input
                          type="range"
                          min="1"
                          max="10"
                          {...register('qualiteDigestion', { valueAsNumber: true })}
                          className="range-field"
                        />
                        <div className="flex justify-between text-xs text-gray-400 mt-2">
                          <span>Très mauvaise</span>
                          <span>Excellente</span>
                        </div>
                      </QuestionCard>
                    </>
                  )}

                  {currentSection === 5 && (
                    <>
                      {/* Section 6: Activité & Performance (12Q) */}
                      <QuestionCard title="49. Fréquence d'entraînement par semaine" error={errors.frequenceEntrainement?.message}>
                        <select {...register('frequenceEntrainement')} className="input-field">
                          <option value="">Sélectionner...</option>
                          <option value="0">0 (Sédentaire)</option>
                          <option value="1_2">1-2 fois</option>
                          <option value="3_4">3-4 fois</option>
                          <option value="5_6">5-6 fois</option>
                          <option value="7_plus">7+ fois</option>
                        </select>
                      </QuestionCard>

                      <QuestionCard title="50. Répartition Cardio (%)" error={errors.repartitionCardio?.message}>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          {...register('repartitionCardio', { valueAsNumber: true })}
                          className="input-field"
                          placeholder="Ex: 40"
                        />
                      </QuestionCard>

                      <QuestionCard title="51. Répartition Musculation (%)" error={errors.repartitionMusculation?.message}>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          {...register('repartitionMusculation', { valueAsNumber: true })}
                          className="input-field"
                          placeholder="Ex: 50"
                        />
                      </QuestionCard>

                      <QuestionCard title="52. Répartition Sport/Autre (%)" error={errors.repartitionSport?.message}>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          {...register('repartitionSport', { valueAsNumber: true })}
                          className="input-field"
                          placeholder="Ex: 10"
                        />
                        <p className="text-xs text-gray-400 mt-1">Total doit égaler 100%</p>
                      </QuestionCard>

                      <QuestionCard title="53. Intensité moyenne des séances" error={errors.intensiteMoyenne?.message}>
                        <select {...register('intensiteMoyenne')} className="input-field">
                          <option value="">Sélectionner...</option>
                          <option value="legere">Légère (conversation facile)</option>
                          <option value="moderee">Modérée (conversation difficile)</option>
                          <option value="intense">Intense (parler est difficile)</option>
                          <option value="tres_intense">Très intense (impossible de parler)</option>
                        </select>
                      </QuestionCard>

                      <QuestionCard title="54. Durée moyenne d'une séance (minutes)" error={errors.dureeSessionMoyenne?.message}>
                        <input
                          type="number"
                          {...register('dureeSessionMoyenne', { valueAsNumber: true })}
                          className="input-field"
                          placeholder="Ex: 60"
                        />
                      </QuestionCard>

                      <QuestionCard title="55. VO2 max si connu (ml/kg/min) - Optionnel" error={errors.vo2Max?.message}>
                        <input
                          type="number"
                          step="0.1"
                          {...register('vo2Max', { valueAsNumber: true })}
                          className="input-field"
                          placeholder="Ex: 45.5"
                        />
                      </QuestionCard>

                      <QuestionCard title="56. PB Développé couché (kg) - Optionnel" error={errors.pbDeveloppe?.message}>
                        <input
                          type="number"
                          {...register('pbDeveloppe', { valueAsNumber: true })}
                          className="input-field"
                          placeholder="Ex: 80"
                        />
                      </QuestionCard>

                      <QuestionCard title="57. PB Squat (kg) - Optionnel" error={errors.pbSquat?.message}>
                        <input
                          type="number"
                          {...register('pbSquat', { valueAsNumber: true })}
                          className="input-field"
                          placeholder="Ex: 100"
                        />
                      </QuestionCard>

                      <QuestionCard title="58. PB Deadlift (kg) - Optionnel" error={errors.pbDeadlift?.message}>
                        <input
                          type="number"
                          {...register('pbDeadlift', { valueAsNumber: true })}
                          className="input-field"
                          placeholder="Ex: 120"
                        />
                      </QuestionCard>

                      <QuestionCard title="59. Nombre de pas moyen par jour (si tracké) - Optionnel" error={errors.nombrePasJour?.message}>
                        <input
                          type="number"
                          {...register('nombrePasJour', { valueAsNumber: true })}
                          className="input-field"
                          placeholder="Ex: 10000"
                        />
                      </QuestionCard>

                      <QuestionCard title="60. Progression de performance" error={errors.progressionPerformance?.message}>
                        <select {...register('progressionPerformance')} className="input-field">
                          <option value="">Sélectionner...</option>
                          <option value="regresse">Régression</option>
                          <option value="stagne">Stagnation</option>
                          <option value="lente">Progression lente</option>
                          <option value="bonne">Bonne progression</option>
                          <option value="excellente">Excellente progression</option>
                        </select>
                      </QuestionCard>
                    </>
                  )}

                  {currentSection === 6 && (
                    <>
                      {/* Section 7: Sommeil & Récupération (15Q) */}
                      <QuestionCard title="61. Heures de coucher habituelles" error={errors.heuresCoucher?.message}>
                        <input
                          type="time"
                          {...register('heuresCoucher')}
                          className="input-field"
                        />
                      </QuestionCard>

                      <QuestionCard title="62. Heures de réveil habituelles" error={errors.heuresReveil?.message}>
                        <input
                          type="time"
                          {...register('heuresReveil')}
                          className="input-field"
                        />
                      </QuestionCard>

                      <QuestionCard title="63. Heures de sommeil par nuit (moyenne)" error={errors.heuresSommeilNuit?.message}>
                        <input
                          type="number"
                          step="0.5"
                          {...register('heuresSommeilNuit', { valueAsNumber: true })}
                          className="input-field"
                          placeholder="Ex: 7.5"
                        />
                      </QuestionCard>

                      <QuestionCard title="64. Qualité de sommeil perçue (1-10)" error={errors.qualiteSommeil?.message}>
                        <input
                          type="range"
                          min="1"
                          max="10"
                          {...register('qualiteSommeil', { valueAsNumber: true })}
                          className="range-field"
                        />
                        <div className="flex justify-between text-xs text-gray-400 mt-2">
                          <span>Très mauvaise</span>
                          <span>Excellente</span>
                        </div>
                      </QuestionCard>

                      <QuestionCard title="65. Difficulté d'endormissement" error={errors.difficulteEndormissement?.message}>
                        <select {...register('difficulteEndormissement')} className="input-field">
                          <option value="">Sélectionner...</option>
                          <option value="jamais">Jamais</option>
                          <option value="rare">Rare</option>
                          <option value="parfois">Parfois</option>
                          <option value="souvent">Souvent</option>
                          <option value="quotidien">Quotidien</option>
                        </select>
                      </QuestionCard>

                      <QuestionCard title="66. Réveils nocturnes par nuit" error={errors.reveilsNocturnes?.message}>
                        <input
                          type="number"
                          {...register('reveilsNocturnes', { valueAsNumber: true })}
                          className="input-field"
                          placeholder="Ex: 2"
                        />
                      </QuestionCard>

                      <QuestionCard title="67. Comment vous sentez-vous au réveil ?" error={errors.reveilleMatin?.message}>
                        <select {...register('reveilleMatin')} className="input-field">
                          <option value="">Sélectionner...</option>
                          <option value="tres_difficile">Très difficile</option>
                          <option value="difficile">Difficile</option>
                          <option value="normal">Normal</option>
                          <option value="facile">Facile</option>
                          <option value="tres_facile">Très facile</option>
                        </select>
                      </QuestionCard>

                      <QuestionCard title="68. Chronotype" error={errors.chronotype?.message}>
                        <select {...register('chronotype')} className="input-field">
                          <option value="">Sélectionner...</option>
                          <option value="matin">Personne du matin</option>
                          <option value="intermediaire">Intermédiaire</option>
                          <option value="soir">Personne du soir</option>
                        </select>
                      </QuestionCard>

                      <QuestionCard title="69. Ton wearable track ton sommeil ?" error={errors.wearableTrackSommeil?.message}>
                        <select {...register('wearableTrackSommeil')} className="input-field">
                          <option value="">Sélectionner...</option>
                          <option value="oui">Oui</option>
                          <option value="non">Non</option>
                          <option value="pas_de_wearable">Pas de wearable</option>
                        </select>
                      </QuestionCard>

                      {wearableTrackSommeil === 'oui' && (
                        <>
                          <QuestionCard title="70. Score de sommeil moyen (1-100)" error={errors.scoreSommeilMoyen?.message}>
                            <input
                              type="number"
                              {...register('scoreSommeilMoyen', { valueAsNumber: true })}
                              className="input-field"
                              placeholder="Ex: 85"
                            />
                          </QuestionCard>

                          <QuestionCard title="71. Sommeil profond moyen (heures ou %)" error={errors.sommeilProfond?.message}>
                            <input
                              type="text"
                              {...register('sommeilProfond')}
                              className="input-field"
                              placeholder="Ex: 1.5h ou 20%"
                            />
                          </QuestionCard>

                          <QuestionCard title="72. Sommeil léger moyen (heures ou %)" error={errors.sommeilLeger?.message}>
                            <input
                              type="text"
                              {...register('sommeilLeger')}
                              className="input-field"
                              placeholder="Ex: 4h ou 55%"
                            />
                          </QuestionCard>

                          <QuestionCard title="73. Sommeil REM moyen (heures ou %)" error={errors.sommeilREM?.message}>
                            <input
                              type="text"
                              {...register('sommeilREM')}
                              className="input-field"
                              placeholder="Ex: 2h ou 25%"
                            />
                          </QuestionCard>

                          <QuestionCard title="74. Fréquence cardiaque nocturne (bpm)" error={errors.frequenceCardiaqueNocturne?.message}>
                            <input
                              type="number"
                              {...register('frequenceCardiaqueNocturne', { valueAsNumber: true })}
                              className="input-field"
                              placeholder="Ex: 55"
                            />
                          </QuestionCard>

                          <QuestionCard title="75. Variabilité HRV nocturne (ms)" error={errors.hrvNocturne?.message}>
                            <input
                              type="number"
                              {...register('hrvNocturne', { valueAsNumber: true })}
                              className="input-field"
                              placeholder="Ex: 65"
                            />
                          </QuestionCard>
                        </>
                      )}
                    </>
                  )}

                  {currentSection === 7 && (
                    <>
                      {/* Section 8: HRV & Récupération Cardiaque (8Q) */}
                      <QuestionCard title="76. Connais-tu ton HRV ?" error={errors.connaisHRV?.message}>
                        <select {...register('connaisHRV')} className="input-field">
                          <option value="">Sélectionner...</option>
                          <option value="oui_track">Oui, je le track régulièrement</option>
                          <option value="jai_mesure">J'ai mesuré une fois</option>
                          <option value="non">Non</option>
                        </select>
                      </QuestionCard>

                      {(connaisHRV === 'oui_track' || connaisHRV === 'jai_mesure') && (
                        <>
                          <QuestionCard title="77. HRV moyen au réveil (ms)" error={errors.hrvMoyenReveil?.message}>
                            <input
                              type="number"
                              {...register('hrvMoyenReveil', { valueAsNumber: true })}
                              className="input-field"
                              placeholder="Ex: 65"
                            />
                          </QuestionCard>

                          <QuestionCard title="78. HRV le plus bas récent (ms)" error={errors.hrvPlusBasRecent?.message}>
                            <input
                              type="number"
                              {...register('hrvPlusBasRecent', { valueAsNumber: true })}
                              className="input-field"
                              placeholder="Ex: 40"
                            />
                          </QuestionCard>

                          <QuestionCard title="79. HRV le plus haut récent (ms)" error={errors.hrvPlusHautRecent?.message}>
                            <input
                              type="number"
                              {...register('hrvPlusHautRecent', { valueAsNumber: true })}
                              className="input-field"
                              placeholder="Ex: 90"
                            />
                          </QuestionCard>

                          <QuestionCard title="80. Fréquence cardiaque au repos (bpm)" error={errors.frequenceCardiaqueRepos?.message}>
                            <input
                              type="number"
                              {...register('frequenceCardiaqueRepos', { valueAsNumber: true })}
                              className="input-field"
                              placeholder="Ex: 60"
                            />
                          </QuestionCard>

                          <QuestionCard title="81. Fréquence cardiaque max connue (bpm)" error={errors.frequenceCardiaqueMax?.message}>
                            <input
                              type="number"
                              {...register('frequenceCardiaqueMax', { valueAsNumber: true })}
                              className="input-field"
                              placeholder="Ex: 190"
                            />
                          </QuestionCard>

                          <QuestionCard title="82. Temps de récupération FC post-effort" error={errors.tempsRecuperationFC?.message}>
                            <select {...register('tempsRecuperationFC')} className="input-field">
                              <option value="">Sélectionner...</option>
                              <option value="moins_1min">Moins de 1 minute</option>
                              <option value="1_2min">1-2 minutes</option>
                              <option value="2_3min">2-3 minutes</option>
                              <option value="3plus_min">3+ minutes</option>
                              <option value="ne_sais_pas">Ne sais pas</option>
                            </select>
                          </QuestionCard>

                          <QuestionCard title="83. Ready/Recovery Score de ton wearable (1-100) - Optionnel" error={errors.readyRecoveryScore?.message}>
                            <input
                              type="number"
                              {...register('readyRecoveryScore', { valueAsNumber: true })}
                              className="input-field"
                              placeholder="Ex: 75"
                            />
                          </QuestionCard>
                        </>
                      )}
                    </>
                  )}

                  {currentSection === 8 && (
                    <>
                      {/* Section 9: Analyses & Biomarqueurs (7Q) */}
                      <QuestionCard title="84. As-tu fait des analyses sanguines récentes ?" error={errors.analysesSanguines?.message}>
                        <select {...register('analysesSanguines')} className="input-field">
                          <option value="">Sélectionner...</option>
                          <option value="moins_3mois">Moins de 3 mois</option>
                          <option value="3_6mois">3-6 mois</option>
                          <option value="6_12mois">6-12 mois</option>
                          <option value="plus_12mois">Plus de 12 mois</option>
                          <option value="jamais">Jamais</option>
                        </select>
                      </QuestionCard>

                      {analysesSanguines !== 'jamais' && analysesSanguines && (
                        <>
                          <QuestionCard title="85. Vitamine D (ng/mL) - Optionnel" error={errors.vitamineD?.message}>
                            <input
                              type="number"
                              step="0.1"
                              {...register('vitamineD', { valueAsNumber: true })}
                              className="input-field"
                              placeholder="Ex: 35.5"
                            />
                          </QuestionCard>

                          <QuestionCard title="86. Ferritine (ng/mL) - Optionnel" error={errors.ferritine?.message}>
                            <input
                              type="number"
                              step="0.1"
                              {...register('ferritine', { valueAsNumber: true })}
                              className="input-field"
                              placeholder="Ex: 75.2"
                            />
                          </QuestionCard>

                          <QuestionCard title="87. TSH (mUI/L) - Optionnel" error={errors.tsh?.message}>
                            <input
                              type="number"
                              step="0.01"
                              {...register('tsh', { valueAsNumber: true })}
                              className="input-field"
                              placeholder="Ex: 2.5"
                            />
                          </QuestionCard>

                          <QuestionCard title="88. Testostérone totale (ng/dL) - Si homme - Optionnel" error={errors.testosteroneTotale?.message}>
                            <input
                              type="number"
                              {...register('testosteroneTotale', { valueAsNumber: true })}
                              className="input-field"
                              placeholder="Ex: 550"
                            />
                          </QuestionCard>

                          <QuestionCard title="89. Glycémie à jeun (mg/dL) - Optionnel" error={errors.glycemieJeun?.message}>
                            <input
                              type="number"
                              {...register('glycemieJeun', { valueAsNumber: true })}
                              className="input-field"
                              placeholder="Ex: 90"
                            />
                          </QuestionCard>
                        </>
                      )}

                      <QuestionCard title="90. Utilises-tu un CGM (Continuous Glucose Monitor) ?" error={errors.utiliseCGM?.message}>
                        <select {...register('utiliseCGM')} className="input-field">
                          <option value="">Sélectionner...</option>
                          <option value="oui">Oui, actuellement</option>
                          <option value="non">Non</option>
                          <option value="jai_teste">J'ai testé dans le passé</option>
                        </select>
                      </QuestionCard>
                    </>
                  )}

                  {currentSection === 9 && (
                    <>
                      {/* Section 10: Hormones & Stress (8Q) */}
                      <QuestionCard title="91. Niveau de stress quotidien (1-10)" error={errors.niveauStress?.message}>
                        <input
                          type="range"
                          min="1"
                          max="10"
                          {...register('niveauStress', { valueAsNumber: true })}
                          className="range-field"
                        />
                        <div className="flex justify-between text-xs text-gray-400 mt-2">
                          <span>Aucun stress</span>
                          <span>Stress extrême</span>
                        </div>
                      </QuestionCard>

                      <QuestionCard title="92. Gestion du stress" error={errors.gestionStress?.message}>
                        <select {...register('gestionStress')} className="input-field">
                          <option value="">Sélectionner...</option>
                          <option value="tres_mauvaise">Très mauvaise</option>
                          <option value="mauvaise">Mauvaise</option>
                          <option value="moyenne">Moyenne</option>
                          <option value="bonne">Bonne</option>
                          <option value="excellente">Excellente</option>
                        </select>
                      </QuestionCard>

                      <QuestionCard title="93. Symptômes thyroïde (sélection multiple)" error={errors.symptomesThyroide?.message}>
                        <div className="space-y-2">
                          {['Fatigue extrême', 'Prise de poids', 'Chute de cheveux', 'Peau sèche', 'Aucun'].map((symptome) => (
                            <label key={symptome} className="flex items-center gap-2 text-sm">
                              <input
                                type="checkbox"
                                value={symptome}
                                {...register('symptomesThyroide')}
                                className="checkbox-field"
                              />
                              <span>{symptome}</span>
                            </label>
                          ))}
                        </div>
                      </QuestionCard>

                      <QuestionCard title="94. Résistance à l'insuline diagnostiquée ?" error={errors.resistanceInsuline?.message}>
                        <select {...register('resistanceInsuline')} className="input-field">
                          <option value="">Sélectionner...</option>
                          <option value="non">Non</option>
                          <option value="soupconnee">Soupçonnée</option>
                          <option value="diagnostiquee">Diagnostiquée</option>
                        </select>
                      </QuestionCard>

                      <QuestionCard title="95. Hypoglycémies fréquentes ?" error={errors.hypoglycemiesFrequentes?.message}>
                        <select {...register('hypoglycemiesFrequentes')} className="input-field">
                          <option value="">Sélectionner...</option>
                          <option value="jamais">Jamais</option>
                          <option value="rare">Rare</option>
                          <option value="parfois">Parfois</option>
                          <option value="souvent">Souvent</option>
                          <option value="quotidien">Quotidien</option>
                        </select>
                      </QuestionCard>

                      <QuestionCard title="96. Menstruation régulière (si applicable)" error={errors.menstruationReguliere?.message}>
                        <select {...register('menstruationReguliere')} className="input-field">
                          <option value="">Sélectionner...</option>
                          <option value="oui">Oui, régulière</option>
                          <option value="non">Non, irrégulière</option>
                          <option value="non_applicable">Non applicable</option>
                        </select>
                      </QuestionCard>

                      <QuestionCard title="97. Symptômes SPM (sélection multiple)" error={errors.symptomesSPM?.message}>
                        <div className="space-y-2">
                          {['Irritabilité', 'Ballonnements', 'Fatigue', 'Fringales', 'Aucun'].map((symptome) => (
                            <label key={symptome} className="flex items-center gap-2 text-sm">
                              <input
                                type="checkbox"
                                value={symptome}
                                {...register('symptomesSPM')}
                                className="checkbox-field"
                              />
                              <span>{symptome}</span>
                            </label>
                          ))}
                        </div>
                      </QuestionCard>

                      <QuestionCard title="98. Ménopause/Andropause" error={errors.menopauseAndropause?.message}>
                        <select {...register('menopauseAndropause')} className="input-field">
                          <option value="">Sélectionner...</option>
                          <option value="non">Non</option>
                          <option value="pre">Pré-ménopause/andropause</option>
                          <option value="en_cours">En cours</option>
                          <option value="post">Post-ménopause/andropause</option>
                        </select>
                      </QuestionCard>
                    </>
                  )}

                  {currentSection === 10 && (
                    <>
                      {/* Section 11: Lifestyle & Substances (7Q) */}
                      <QuestionCard title="99. Consommation d'alcool par semaine" error={errors.consommationAlcool?.message}>
                        <select {...register('consommationAlcool')} className="input-field">
                          <option value="">Sélectionner...</option>
                          <option value="aucune">Aucune</option>
                          <option value="occasionnel">Occasionnel (événements spéciaux)</option>
                          <option value="1_3_verres">1-3 verres</option>
                          <option value="4_7_verres">4-7 verres</option>
                          <option value="8_plus_verres">8+ verres</option>
                        </select>
                      </QuestionCard>

                      <QuestionCard title="100. Consommation de caféine par jour" error={errors.consommationCafeine?.message}>
                        <select {...register('consommationCafeine')} className="input-field">
                          <option value="">Sélectionner...</option>
                          <option value="0">0 (aucune caféine)</option>
                          <option value="1_cafe">1 café</option>
                          <option value="2_3_cafes">2-3 cafés</option>
                          <option value="4_5_cafes">4-5 cafés</option>
                          <option value="6_plus_cafes">6+ cafés</option>
                        </select>
                      </QuestionCard>

                      <QuestionCard title="101. Heure du dernier café" error={errors.heureDernierCafe?.message}>
                        <input
                          type="time"
                          {...register('heureDernierCafe')}
                          className="input-field"
                        />
                      </QuestionCard>

                      <QuestionCard title="102. Tabac" error={errors.tabac?.message}>
                        <select {...register('tabac')} className="input-field">
                          <option value="">Sélectionner...</option>
                          <option value="jamais">Jamais fumé</option>
                          <option value="ancien">Ancien fumeur</option>
                          <option value="occasionnel">Occasionnel</option>
                          <option value="regulier">Régulier</option>
                        </select>
                      </QuestionCard>

                      <QuestionCard title="103. Hydratation litres par jour" error={errors.hydratationLitresJour?.message}>
                        <input
                          type="number"
                          step="0.1"
                          {...register('hydratationLitresJour', { valueAsNumber: true })}
                          className="input-field"
                          placeholder="Ex: 2.5"
                        />
                      </QuestionCard>

                      <QuestionCard title="104. Suppléments actuels (sélection multiple)" error={errors.supplementsActuels?.message}>
                        <div className="space-y-2">
                          {['Multivitamines', 'Vitamine D', 'Oméga-3', 'Magnésium', 'Probiotiques', 'Protéines', 'Créatine', 'Pré-workout', 'Aucun'].map((supplement) => (
                            <label key={supplement} className="flex items-center gap-2 text-sm">
                              <input
                                type="checkbox"
                                value={supplement}
                                {...register('supplementsActuels')}
                                className="checkbox-field"
                              />
                              <span>{supplement}</span>
                            </label>
                          ))}
                        </div>
                      </QuestionCard>

                      <QuestionCard title="105. Médicaments réguliers (texte libre) - Optionnel" error={errors.medicamentsReguliers?.message}>
                        <textarea
                          {...register('medicamentsReguliers')}
                          className="input-field"
                          rows={3}
                          placeholder="Liste des médicaments que vous prenez régulièrement..."
                        />
                      </QuestionCard>
                    </>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex gap-4 mt-12">
              {currentSection > 0 && (
                <button
                  type="button"
                  onClick={prevSection}
                  className="flex-1 px-6 py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all flex items-center justify-center gap-2 font-semibold"
                >
                  <ChevronLeft className="w-5 h-5" />
                  Précédent
                </button>
              )}

              {currentSection < sections.length - 1 ? (
                <button
                  type="button"
                  onClick={nextSection}
                  className="flex-1 px-6 py-4 rounded-xl bg-gradient-to-r from-[#00F5D4] to-[#A78BFA] hover:opacity-90 transition-all flex items-center justify-center gap-2 font-semibold text-black"
                >
                  Suivant
                  <ChevronRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="flex-1 px-6 py-4 rounded-xl bg-gradient-to-r from-[#00F5D4] to-[#A78BFA] hover:opacity-90 transition-all flex items-center justify-center gap-2 font-semibold text-black"
                >
                  <Check className="w-5 h-5" />
                  Terminer et Voir Mes Options
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      <style jsx>{`
        .input-field {
          width: 100%;
          padding: 0.75rem 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 0.75rem;
          color: white;
          font-size: 1rem;
          transition: all 0.2s;
        }

        .input-field:focus {
          outline: none;
          border-color: #00F5D4;
          background: rgba(255, 255, 255, 0.08);
        }

        .checkbox-field {
          width: 1.25rem;
          height: 1.25rem;
          accent-color: #00F5D4;
        }

        .range-field {
          width: 100%;
          height: 0.5rem;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 0.25rem;
          outline: none;
          -webkit-appearance: none;
        }

        .range-field::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 1.5rem;
          height: 1.5rem;
          background: linear-gradient(135deg, #00F5D4, #A78BFA);
          border-radius: 50%;
          cursor: pointer;
        }

        .range-field::-moz-range-thumb {
          width: 1.5rem;
          height: 1.5rem;
          background: linear-gradient(135deg, #00F5D4, #A78BFA);
          border-radius: 50%;
          cursor: pointer;
          border: none;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}

function QuestionCard({
  title,
  children,
  error
}: {
  title: string;
  children: React.ReactNode;
  error?: string;
}) {
  return (
    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-[#00F5D4]/30 transition-all">
      <h3 className="text-lg font-semibold mb-4 text-white">{title}</h3>
      {children}
      {error && (
        <p className="text-red-400 text-sm mt-2 flex items-center gap-2">
          <span className="w-1 h-1 bg-red-400 rounded-full" />
          {error}
        </p>
      )}
    </div>
  );
}
