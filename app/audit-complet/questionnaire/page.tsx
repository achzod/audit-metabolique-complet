'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ChevronLeft, ChevronRight, Check, Activity, TrendingUp, Zap, Heart, Dumbbell, Moon, Coffee, Target } from 'lucide-react';

// Zod validation schema
const questionnaireSchema = z.object({
  // Section 1: Profil Anthropométrique
  age: z.number().min(18).max(100),
  sexe: z.enum(['homme', 'femme', 'autre']),
  poidsActuel: z.number().min(30).max(300),
  taille: z.number().min(120).max(250),
  tourDeTaille: z.number().min(50).max(200),
  tourDeHanches: z.number().min(50).max(200),
  tourDeCou: z.number().optional(),
  objetifPoids: z.number().min(30).max(300),
  dateDebutObjectif: z.string().optional(),
  motivationPrincipale: z.string(),

  // Section 2: Historique Pondéral
  poidsMinimum: z.number().min(30).max(300),
  agePoidsMinimum: z.number().min(10).max(100),
  poidsMaximum: z.number().min(30).max(300),
  agePoidsMaximum: z.number().min(10).max(100),
  nombreRegimes: z.number().min(0).max(50),
  typeRegimesPasses: z.array(z.string()),
  effetYoyo: z.enum(['jamais', 'rarement', 'parfois', 'souvent', 'toujours']),
  variationPoids6Mois: z.number(),

  // Section 3: Métabolisme & Énergie
  energieMatin: z.number().min(1).max(10),
  energieMidi: z.number().min(1).max(10),
  energieApresMidi: z.number().min(1).max(10),
  energieSoir: z.number().min(1).max(10),
  fatigueChronique: z.enum(['jamais', 'rarement', 'parfois', 'souvent', 'toujours']),
  coupDePompe: z.enum(['jamais', 'rarement', 'parfois', 'souvent', 'toujours']),
  faimConstante: z.enum(['jamais', 'rarement', 'parfois', 'souvent', 'toujours']),
  cravingsSucre: z.enum(['jamais', 'rarement', 'parfois', 'souvent', 'toujours']),
  cravingsSale: z.enum(['jamais', 'rarement', 'parfois', 'souvent', 'toujours']),
  temperatureCorporelle: z.enum(['toujours_froid', 'souvent_froid', 'normal', 'souvent_chaud', 'toujours_chaud']),
  transpirationAnormale: z.enum(['jamais', 'rarement', 'parfois', 'souvent', 'toujours']),
  metabolismePercption: z.enum(['tres_lent', 'lent', 'normal', 'rapide', 'tres_rapide']),

  // Section 4: Digestion & Microbiome
  ballonnements: z.enum(['jamais', 'rarement', 'parfois', 'souvent', 'toujours']),
  gazIntestinaux: z.enum(['jamais', 'rarement', 'parfois', 'souvent', 'toujours']),
  transit: z.enum(['constipation', 'normal', 'diarrhee', 'alterne']),
  frequenceSelles: z.enum(['moins_3_semaine', '3_6_semaine', '1_jour', '2_3_jour', 'plus_3_jour']),
  douleurAbdominale: z.enum(['jamais', 'rarement', 'parfois', 'souvent', 'toujours']),
  intolerancesAlimentaires: z.array(z.string()),
  refluxGastrique: z.enum(['jamais', 'rarement', 'parfois', 'souvent', 'toujours']),
  antibiotiquesAnnee: z.number().min(0).max(20),
  probiotiquesPrise: z.enum(['jamais', 'passé', 'actuellement']),
  qualiteDigestion: z.number().min(1).max(10),

  // Section 5: Hormones & Signaux
  niveauStress: z.number().min(1).max(10),
  gestionStress: z.enum(['tres_mauvaise', 'mauvaise', 'moyenne', 'bonne', 'excellente']),
  symptomesThyroide: z.array(z.string()),
  frissonsFrequents: z.enum(['jamais', 'rarement', 'parfois', 'souvent', 'toujours']),
  chuteCheveuxAnormale: z.enum(['jamais', 'rarement', 'parfois', 'souvent', 'toujours']),
  peauSeche: z.enum(['jamais', 'rarement', 'parfois', 'souvent', 'toujours']),
  resistanceInsuline: z.enum(['non_diagnostique', 'soupcon', 'diagnostique']),
  hypoglycemies: z.enum(['jamais', 'rarement', 'parfois', 'souvent', 'toujours']),
  menstruationReguliere: z.enum(['oui', 'non', 'non_applicable']),
  symptomesSPM: z.array(z.string()),
  menopauseAndropause: z.enum(['non', 'pre', 'en_cours', 'post']),
  libido: z.enum(['tres_faible', 'faible', 'moyenne', 'elevee', 'tres_elevee']),

  // Section 6: Activité & Performance
  frequenceEntrainement: z.enum(['sedentaire', '1_2_semaine', '3_4_semaine', '5_6_semaine', 'quotidien']),
  typeActiviteCardio: z.number().min(0).max(100),
  typeActiviteMuscu: z.number().min(0).max(100),
  typeActiviteSport: z.number().min(0).max(100),
  intensiteMoyenne: z.enum(['legere', 'moderee', 'intense', 'tres_intense']),
  dureeSessionMoyenne: z.number().min(0).max(300),
  progressionPerformance: z.enum(['regresse', 'stagne', 'lente', 'bonne', 'excellente']),
  courbaturesRecuperation: z.enum(['rapide_24h', 'normale_48h', 'lente_72h', 'tres_lente_plus']),
  motivationEntrainement: z.number().min(1).max(10),
  objectifPerformance: z.array(z.string()),

  // Section 7: Sommeil & Récupération
  heuresCoucher: z.string(),
  heuresReveil: z.string(),
  heuresSommeilMoyenne: z.number().min(3).max(14),
  qualiteSommeil: z.number().min(1).max(10),
  difficulteEndormissement: z.enum(['jamais', 'rarement', 'parfois', 'souvent', 'toujours']),
  reveilsNocturnes: z.number().min(0).max(10),
  reveilleMatin: z.enum(['tres_difficile', 'difficile', 'normal', 'facile', 'tres_facile']),
  chronotype: z.enum(['du_matin', 'intermediaire', 'du_soir']),

  // Section 8: Lifestyle & Substances
  consommationAlcool: z.enum(['jamais', 'occasionnel', '1_3_semaine', '4_7_semaine', 'quotidien_multiple']),
  verresAlcoolSemaine: z.number().min(0).max(100),
  consommationCafeine: z.enum(['jamais', '1_cafe', '2_3_cafes', '4_5_cafes', 'plus_5_cafes']),
  heureDernierCafe: z.string().optional(),
  tabac: z.enum(['jamais', 'ancien', 'occasionnel', 'regulier']),
  cigarettesJour: z.number().min(0).max(100).optional(),
  hydratationLitresJour: z.number().min(0).max(10),
  supplementsActuels: z.array(z.string()),

  // Section 9: Objectifs & Motivation
  objectifPrincipal: z.enum(['perte_poids', 'gain_muscle', 'recomposition', 'performance', 'sante', 'energie']),
  objectifSecondaires: z.array(z.string()),
  timelineObjectif: z.enum(['1_3_mois', '3_6_mois', '6_12_mois', 'plus_12_mois']),
  obstaclesPrincipaux: z.array(z.string()),
  tentativesPrecedentes: z.string(),
  niveauMotivation: z.number().min(1).max(10),
  soutiensEntourage: z.enum(['aucun', 'faible', 'moyen', 'fort', 'tres_fort']),
});

type QuestionnaireFormData = z.infer<typeof questionnaireSchema>;

const sections = [
  {
    id: 1,
    title: 'Profil Anthropométrique',
    icon: Activity,
    color: '#00F5D4',
  },
  {
    id: 2,
    title: 'Historique Pondéral',
    icon: TrendingUp,
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
    title: 'Digestion & Microbiome',
    icon: Heart,
    color: '#F472B6',
  },
  {
    id: 5,
    title: 'Hormones & Signaux',
    icon: Activity,
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
    title: 'Lifestyle & Substances',
    icon: Coffee,
    color: '#C084FC',
  },
  {
    id: 9,
    title: 'Objectifs & Motivation',
    icon: Target,
    color: '#FF6B9D',
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
                      {/* Section 1: Profil Anthropométrique */}
                      <QuestionCard title="Quel est votre âge ?" error={errors.age?.message}>
                        <input
                          type="number"
                          {...register('age', { valueAsNumber: true })}
                          className="input-field"
                          placeholder="Ex: 35"
                        />
                      </QuestionCard>

                      <QuestionCard title="Quel est votre sexe biologique ?" error={errors.sexe?.message}>
                        <select {...register('sexe')} className="input-field">
                          <option value="">Sélectionner...</option>
                          <option value="homme">Homme</option>
                          <option value="femme">Femme</option>
                          <option value="autre">Autre</option>
                        </select>
                      </QuestionCard>

                      <QuestionCard title="Quel est votre poids actuel ? (kg)" error={errors.poidsActuel?.message}>
                        <input
                          type="number"
                          step="0.1"
                          {...register('poidsActuel', { valueAsNumber: true })}
                          className="input-field"
                          placeholder="Ex: 75.5"
                        />
                      </QuestionCard>

                      <QuestionCard title="Quelle est votre taille ? (cm)" error={errors.taille?.message}>
                        <input
                          type="number"
                          {...register('taille', { valueAsNumber: true })}
                          className="input-field"
                          placeholder="Ex: 175"
                        />
                      </QuestionCard>

                      <QuestionCard title="Quel est votre tour de taille ? (cm)" error={errors.tourDeTaille?.message}>
                        <input
                          type="number"
                          {...register('tourDeTaille', { valueAsNumber: true })}
                          className="input-field"
                          placeholder="Ex: 85"
                        />
                      </QuestionCard>

                      <QuestionCard title="Quel est votre tour de hanches ? (cm)" error={errors.tourDeHanches?.message}>
                        <input
                          type="number"
                          {...register('tourDeHanches', { valueAsNumber: true })}
                          className="input-field"
                          placeholder="Ex: 95"
                        />
                      </QuestionCard>

                      <QuestionCard title="Quel est votre tour de cou ? (cm) - Optionnel" error={errors.tourDeCou?.message}>
                        <input
                          type="number"
                          {...register('tourDeCou', { valueAsNumber: true })}
                          className="input-field"
                          placeholder="Ex: 38"
                        />
                      </QuestionCard>

                      <QuestionCard title="Quel est votre poids objectif ? (kg)" error={errors.objetifPoids?.message}>
                        <input
                          type="number"
                          step="0.1"
                          {...register('objetifPoids', { valueAsNumber: true })}
                          className="input-field"
                          placeholder="Ex: 70"
                        />
                      </QuestionCard>

                      <QuestionCard title="Quand souhaitez-vous atteindre cet objectif ?" error={errors.dateDebutObjectif?.message}>
                        <input
                          type="date"
                          {...register('dateDebutObjectif')}
                          className="input-field"
                        />
                      </QuestionCard>

                      <QuestionCard title="Quelle est votre motivation principale ?" error={errors.motivationPrincipale?.message}>
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
                      {/* Section 2: Historique Pondéral */}
                      <QuestionCard title="Quel est votre poids minimum à l'âge adulte ? (kg)" error={errors.poidsMinimum?.message}>
                        <input
                          type="number"
                          step="0.1"
                          {...register('poidsMinimum', { valueAsNumber: true })}
                          className="input-field"
                          placeholder="Ex: 65"
                        />
                      </QuestionCard>

                      <QuestionCard title="À quel âge aviez-vous ce poids minimum ?" error={errors.agePoidsMinimum?.message}>
                        <input
                          type="number"
                          {...register('agePoidsMinimum', { valueAsNumber: true })}
                          className="input-field"
                          placeholder="Ex: 25"
                        />
                      </QuestionCard>

                      <QuestionCard title="Quel est votre poids maximum à l'âge adulte ? (kg)" error={errors.poidsMaximum?.message}>
                        <input
                          type="number"
                          step="0.1"
                          {...register('poidsMaximum', { valueAsNumber: true })}
                          className="input-field"
                          placeholder="Ex: 90"
                        />
                      </QuestionCard>

                      <QuestionCard title="À quel âge aviez-vous ce poids maximum ?" error={errors.agePoidsMaximum?.message}>
                        <input
                          type="number"
                          {...register('agePoidsMaximum', { valueAsNumber: true })}
                          className="input-field"
                          placeholder="Ex: 40"
                        />
                      </QuestionCard>

                      <QuestionCard title="Combien de régimes avez-vous suivi dans votre vie ?" error={errors.nombreRegimes?.message}>
                        <input
                          type="number"
                          {...register('nombreRegimes', { valueAsNumber: true })}
                          className="input-field"
                          placeholder="Ex: 5"
                        />
                      </QuestionCard>

                      <QuestionCard title="Quels types de régimes avez-vous essayés ? (sélection multiple)" error={errors.typeRegimesPasses?.message}>
                        <div className="space-y-2">
                          {['Hypocalorique', 'Low-carb', 'Keto', 'Jeûne intermittent', 'Paléo', 'Végétarien/Vegan', 'Weight Watchers', 'Protéiné', 'Autre'].map((regime) => (
                            <label key={regime} className="flex items-center gap-2 text-sm">
                              <input
                                type="checkbox"
                                value={regime}
                                {...register('typeRegimesPasses')}
                                className="checkbox-field"
                              />
                              <span>{regime}</span>
                            </label>
                          ))}
                        </div>
                      </QuestionCard>

                      <QuestionCard title="Avez-vous expérimenté l'effet yoyo (reprise de poids après régime) ?" error={errors.effetYoyo?.message}>
                        <select {...register('effetYoyo')} className="input-field">
                          <option value="">Sélectionner...</option>
                          <option value="jamais">Jamais</option>
                          <option value="rarement">Rarement</option>
                          <option value="parfois">Parfois</option>
                          <option value="souvent">Souvent</option>
                          <option value="toujours">Toujours</option>
                        </select>
                      </QuestionCard>

                      <QuestionCard title="Quelle a été votre variation de poids sur les 6 derniers mois ? (kg)" error={errors.variationPoids6Mois?.message}>
                        <input
                          type="number"
                          step="0.1"
                          {...register('variationPoids6Mois', { valueAsNumber: true })}
                          className="input-field"
                          placeholder="Ex: +3 ou -2"
                        />
                        <p className="text-xs text-gray-400 mt-1">Utilisez + pour gain, - pour perte</p>
                      </QuestionCard>
                    </>
                  )}

                  {currentSection === 2 && (
                    <>
                      {/* Section 3: Métabolisme & Énergie */}
                      <QuestionCard title="Quel est votre niveau d'énergie le MATIN ? (1-10)" error={errors.energieMatin?.message}>
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

                      <QuestionCard title="Quel est votre niveau d'énergie à MIDI ? (1-10)" error={errors.energieMidi?.message}>
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

                      <QuestionCard title="Quel est votre niveau d'énergie l'APRÈS-MIDI ? (1-10)" error={errors.energieApresMidi?.message}>
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

                      <QuestionCard title="Quel est votre niveau d'énergie le SOIR ? (1-10)" error={errors.energieSoir?.message}>
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

                      <QuestionCard title="Ressentez-vous une fatigue chronique ?" error={errors.fatigueChronique?.message}>
                        <select {...register('fatigueChronique')} className="input-field">
                          <option value="">Sélectionner...</option>
                          <option value="jamais">Jamais</option>
                          <option value="rarement">Rarement</option>
                          <option value="parfois">Parfois</option>
                          <option value="souvent">Souvent</option>
                          <option value="toujours">Toujours</option>
                        </select>
                      </QuestionCard>

                      <QuestionCard title="À quelle fréquence avez-vous des coups de pompe ?" error={errors.coupDePompe?.message}>
                        <select {...register('coupDePompe')} className="input-field">
                          <option value="">Sélectionner...</option>
                          <option value="jamais">Jamais</option>
                          <option value="rarement">Rarement</option>
                          <option value="parfois">Parfois</option>
                          <option value="souvent">Souvent</option>
                          <option value="toujours">Toujours</option>
                        </select>
                      </QuestionCard>

                      <QuestionCard title="Ressentez-vous une faim constante ?" error={errors.faimConstante?.message}>
                        <select {...register('faimConstante')} className="input-field">
                          <option value="">Sélectionner...</option>
                          <option value="jamais">Jamais</option>
                          <option value="rarement">Rarement</option>
                          <option value="parfois">Parfois</option>
                          <option value="souvent">Souvent</option>
                          <option value="toujours">Toujours</option>
                        </select>
                      </QuestionCard>

                      <QuestionCard title="Avez-vous des envies de sucre (cravings) ?" error={errors.cravingsSucre?.message}>
                        <select {...register('cravingsSucre')} className="input-field">
                          <option value="">Sélectionner...</option>
                          <option value="jamais">Jamais</option>
                          <option value="rarement">Rarement</option>
                          <option value="parfois">Parfois</option>
                          <option value="souvent">Souvent</option>
                          <option value="toujours">Toujours</option>
                        </select>
                      </QuestionCard>

                      <QuestionCard title="Avez-vous des envies de salé ?" error={errors.cravingsSale?.message}>
                        <select {...register('cravingsSale')} className="input-field">
                          <option value="">Sélectionner...</option>
                          <option value="jamais">Jamais</option>
                          <option value="rarement">Rarement</option>
                          <option value="parfois">Parfois</option>
                          <option value="souvent">Souvent</option>
                          <option value="toujours">Toujours</option>
                        </select>
                      </QuestionCard>

                      <QuestionCard title="Comment décririez-vous votre température corporelle ?" error={errors.temperatureCorporelle?.message}>
                        <select {...register('temperatureCorporelle')} className="input-field">
                          <option value="">Sélectionner...</option>
                          <option value="toujours_froid">Toujours froid</option>
                          <option value="souvent_froid">Souvent froid</option>
                          <option value="normal">Normal</option>
                          <option value="souvent_chaud">Souvent chaud</option>
                          <option value="toujours_chaud">Toujours chaud</option>
                        </select>
                      </QuestionCard>

                      <QuestionCard title="Avez-vous une transpiration anormale ?" error={errors.transpirationAnormale?.message}>
                        <select {...register('transpirationAnormale')} className="input-field">
                          <option value="">Sélectionner...</option>
                          <option value="jamais">Jamais</option>
                          <option value="rarement">Rarement</option>
                          <option value="parfois">Parfois</option>
                          <option value="souvent">Souvent</option>
                          <option value="toujours">Toujours</option>
                        </select>
                      </QuestionCard>

                      <QuestionCard title="Comment percevez-vous votre métabolisme ?" error={errors.metabolismePercption?.message}>
                        <select {...register('metabolismePercption')} className="input-field">
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
                      {/* Section 4: Digestion & Microbiome */}
                      <QuestionCard title="À quelle fréquence avez-vous des ballonnements ?" error={errors.ballonnements?.message}>
                        <select {...register('ballonnements')} className="input-field">
                          <option value="">Sélectionner...</option>
                          <option value="jamais">Jamais</option>
                          <option value="rarement">Rarement</option>
                          <option value="parfois">Parfois</option>
                          <option value="souvent">Souvent</option>
                          <option value="toujours">Toujours</option>
                        </select>
                      </QuestionCard>

                      <QuestionCard title="Avez-vous des gaz intestinaux fréquents ?" error={errors.gazIntestinaux?.message}>
                        <select {...register('gazIntestinaux')} className="input-field">
                          <option value="">Sélectionner...</option>
                          <option value="jamais">Jamais</option>
                          <option value="rarement">Rarement</option>
                          <option value="parfois">Parfois</option>
                          <option value="souvent">Souvent</option>
                          <option value="toujours">Toujours</option>
                        </select>
                      </QuestionCard>

                      <QuestionCard title="Comment décririez-vous votre transit intestinal ?" error={errors.transit?.message}>
                        <select {...register('transit')} className="input-field">
                          <option value="">Sélectionner...</option>
                          <option value="constipation">Constipation régulière</option>
                          <option value="normal">Normal</option>
                          <option value="diarrhee">Diarrhée fréquente</option>
                          <option value="alterne">Alterne entre les deux</option>
                        </select>
                      </QuestionCard>

                      <QuestionCard title="Quelle est votre fréquence de selles ?" error={errors.frequenceSelles?.message}>
                        <select {...register('frequenceSelles')} className="input-field">
                          <option value="">Sélectionner...</option>
                          <option value="moins_3_semaine">Moins de 3 fois par semaine</option>
                          <option value="3_6_semaine">3 à 6 fois par semaine</option>
                          <option value="1_jour">1 fois par jour</option>
                          <option value="2_3_jour">2 à 3 fois par jour</option>
                          <option value="plus_3_jour">Plus de 3 fois par jour</option>
                        </select>
                      </QuestionCard>

                      <QuestionCard title="Ressentez-vous des douleurs abdominales ?" error={errors.douleurAbdominale?.message}>
                        <select {...register('douleurAbdominale')} className="input-field">
                          <option value="">Sélectionner...</option>
                          <option value="jamais">Jamais</option>
                          <option value="rarement">Rarement</option>
                          <option value="parfois">Parfois</option>
                          <option value="souvent">Souvent</option>
                          <option value="toujours">Toujours</option>
                        </select>
                      </QuestionCard>

                      <QuestionCard title="Avez-vous des intolérances alimentaires identifiées ?" error={errors.intolerancesAlimentaires?.message}>
                        <div className="space-y-2">
                          {['Lactose', 'Gluten', 'FODMAPs', 'Histamine', 'Fructose', 'Oeufs', 'Fruits à coque', 'Aucune'].map((intolerance) => (
                            <label key={intolerance} className="flex items-center gap-2 text-sm">
                              <input
                                type="checkbox"
                                value={intolerance}
                                {...register('intolerancesAlimentaires')}
                                className="checkbox-field"
                              />
                              <span>{intolerance}</span>
                            </label>
                          ))}
                        </div>
                      </QuestionCard>

                      <QuestionCard title="Souffrez-vous de reflux gastrique ?" error={errors.refluxGastrique?.message}>
                        <select {...register('refluxGastrique')} className="input-field">
                          <option value="">Sélectionner...</option>
                          <option value="jamais">Jamais</option>
                          <option value="rarement">Rarement</option>
                          <option value="parfois">Parfois</option>
                          <option value="souvent">Souvent</option>
                          <option value="toujours">Toujours</option>
                        </select>
                      </QuestionCard>

                      <QuestionCard title="Combien de cures d'antibiotiques avez-vous prises dans l'année ?" error={errors.antibiotiquesAnnee?.message}>
                        <input
                          type="number"
                          {...register('antibiotiquesAnnee', { valueAsNumber: true })}
                          className="input-field"
                          placeholder="Ex: 2"
                        />
                      </QuestionCard>

                      <QuestionCard title="Prenez-vous ou avez-vous pris des probiotiques ?" error={errors.probiotiquesPrise?.message}>
                        <select {...register('probiotiquesPrise')} className="input-field">
                          <option value="">Sélectionner...</option>
                          <option value="jamais">Jamais</option>
                          <option value="passé">Oui, dans le passé</option>
                          <option value="actuellement">Oui, actuellement</option>
                        </select>
                      </QuestionCard>

                      <QuestionCard title="Comment évaluez-vous la qualité de votre digestion ? (1-10)" error={errors.qualiteDigestion?.message}>
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

                  {currentSection === 4 && (
                    <>
                      {/* Section 5: Hormones & Signaux */}
                      <QuestionCard title="Quel est votre niveau de stress au quotidien ? (1-10)" error={errors.niveauStress?.message}>
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

                      <QuestionCard title="Comment gérez-vous votre stress ?" error={errors.gestionStress?.message}>
                        <select {...register('gestionStress')} className="input-field">
                          <option value="">Sélectionner...</option>
                          <option value="tres_mauvaise">Très mauvaise</option>
                          <option value="mauvaise">Mauvaise</option>
                          <option value="moyenne">Moyenne</option>
                          <option value="bonne">Bonne</option>
                          <option value="excellente">Excellente</option>
                        </select>
                      </QuestionCard>

                      <QuestionCard title="Présentez-vous des symptômes liés à la thyroïde ?" error={errors.symptomesThyroide?.message}>
                        <div className="space-y-2">
                          {['Fatigue extrême', 'Prise de poids inexpliquée', 'Frilosité', 'Peau sèche', 'Chute de cheveux', 'Dépression', 'Constipation', 'Aucun symptôme'].map((symptome) => (
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

                      <QuestionCard title="Avez-vous souvent froid (frissons fréquents) ?" error={errors.frissonsFrequents?.message}>
                        <select {...register('frissonsFrequents')} className="input-field">
                          <option value="">Sélectionner...</option>
                          <option value="jamais">Jamais</option>
                          <option value="rarement">Rarement</option>
                          <option value="parfois">Parfois</option>
                          <option value="souvent">Souvent</option>
                          <option value="toujours">Toujours</option>
                        </select>
                      </QuestionCard>

                      <QuestionCard title="Avez-vous une chute de cheveux anormale ?" error={errors.chuteCheveuxAnormale?.message}>
                        <select {...register('chuteCheveuxAnormale')} className="input-field">
                          <option value="">Sélectionner...</option>
                          <option value="jamais">Jamais</option>
                          <option value="rarement">Rarement</option>
                          <option value="parfois">Parfois</option>
                          <option value="souvent">Souvent</option>
                          <option value="toujours">Toujours</option>
                        </select>
                      </QuestionCard>

                      <QuestionCard title="Avez-vous la peau sèche ?" error={errors.peauSeche?.message}>
                        <select {...register('peauSeche')} className="input-field">
                          <option value="">Sélectionner...</option>
                          <option value="jamais">Jamais</option>
                          <option value="rarement">Rarement</option>
                          <option value="parfois">Parfois</option>
                          <option value="souvent">Souvent</option>
                          <option value="toujours">Toujours</option>
                        </select>
                      </QuestionCard>

                      <QuestionCard title="Avez-vous une résistance à l'insuline diagnostiquée ?" error={errors.resistanceInsuline?.message}>
                        <select {...register('resistanceInsuline')} className="input-field">
                          <option value="">Sélectionner...</option>
                          <option value="non_diagnostique">Non, pas diagnostiquée</option>
                          <option value="soupcon">Soupçonnée mais non confirmée</option>
                          <option value="diagnostique">Oui, diagnostiquée</option>
                        </select>
                      </QuestionCard>

                      <QuestionCard title="Faites-vous des hypoglycémies (malaises, tremblements) ?" error={errors.hypoglycemies?.message}>
                        <select {...register('hypoglycemies')} className="input-field">
                          <option value="">Sélectionner...</option>
                          <option value="jamais">Jamais</option>
                          <option value="rarement">Rarement</option>
                          <option value="parfois">Parfois</option>
                          <option value="souvent">Souvent</option>
                          <option value="toujours">Toujours</option>
                        </select>
                      </QuestionCard>

                      <QuestionCard title="Avez-vous des menstruations régulières ? (si applicable)" error={errors.menstruationReguliere?.message}>
                        <select {...register('menstruationReguliere')} className="input-field">
                          <option value="">Sélectionner...</option>
                          <option value="oui">Oui, régulières</option>
                          <option value="non">Non, irrégulières</option>
                          <option value="non_applicable">Non applicable</option>
                        </select>
                      </QuestionCard>

                      <QuestionCard title="Présentez-vous des symptômes prémenstruels (SPM) ?" error={errors.symptomesSPM?.message}>
                        <div className="space-y-2">
                          {['Irritabilité', 'Ballonnements', 'Douleurs mammaires', 'Fatigue', 'Fringales', 'Maux de tête', 'Anxiété', 'Aucun'].map((symptome) => (
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

                      <QuestionCard title="Êtes-vous en ménopause/andropause ?" error={errors.menopauseAndropause?.message}>
                        <select {...register('menopauseAndropause')} className="input-field">
                          <option value="">Sélectionner...</option>
                          <option value="non">Non</option>
                          <option value="pre">Pré-ménopause/andropause</option>
                          <option value="en_cours">En cours</option>
                          <option value="post">Post-ménopause/andropause</option>
                        </select>
                      </QuestionCard>

                      <QuestionCard title="Comment évaluez-vous votre libido ?" error={errors.libido?.message}>
                        <select {...register('libido')} className="input-field">
                          <option value="">Sélectionner...</option>
                          <option value="tres_faible">Très faible</option>
                          <option value="faible">Faible</option>
                          <option value="moyenne">Moyenne</option>
                          <option value="elevee">Élevée</option>
                          <option value="tres_elevee">Très élevée</option>
                        </select>
                      </QuestionCard>
                    </>
                  )}

                  {currentSection === 5 && (
                    <>
                      {/* Section 6: Activité & Performance */}
                      <QuestionCard title="Quelle est votre fréquence d'entraînement ?" error={errors.frequenceEntrainement?.message}>
                        <select {...register('frequenceEntrainement')} className="input-field">
                          <option value="">Sélectionner...</option>
                          <option value="sedentaire">Sédentaire (aucun)</option>
                          <option value="1_2_semaine">1-2 fois par semaine</option>
                          <option value="3_4_semaine">3-4 fois par semaine</option>
                          <option value="5_6_semaine">5-6 fois par semaine</option>
                          <option value="quotidien">Quotidien ou plus</option>
                        </select>
                      </QuestionCard>

                      <QuestionCard title="Répartition cardio (%) - Ex: 40%" error={errors.typeActiviteCardio?.message}>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          {...register('typeActiviteCardio', { valueAsNumber: true })}
                          className="input-field"
                          placeholder="Ex: 40"
                        />
                      </QuestionCard>

                      <QuestionCard title="Répartition musculation (%) - Ex: 50%" error={errors.typeActiviteMuscu?.message}>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          {...register('typeActiviteMuscu', { valueAsNumber: true })}
                          className="input-field"
                          placeholder="Ex: 50"
                        />
                      </QuestionCard>

                      <QuestionCard title="Répartition sport/autre (%) - Ex: 10%" error={errors.typeActiviteSport?.message}>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          {...register('typeActiviteSport', { valueAsNumber: true })}
                          className="input-field"
                          placeholder="Ex: 10"
                        />
                        <p className="text-xs text-gray-400 mt-1">Total doit égaler 100%</p>
                      </QuestionCard>

                      <QuestionCard title="Quelle est l'intensité moyenne de vos séances ?" error={errors.intensiteMoyenne?.message}>
                        <select {...register('intensiteMoyenne')} className="input-field">
                          <option value="">Sélectionner...</option>
                          <option value="legere">Légère (conversation facile)</option>
                          <option value="moderee">Modérée (conversation difficile)</option>
                          <option value="intense">Intense (parler est difficile)</option>
                          <option value="tres_intense">Très intense (impossible de parler)</option>
                        </select>
                      </QuestionCard>

                      <QuestionCard title="Durée moyenne d'une séance (minutes)" error={errors.dureeSessionMoyenne?.message}>
                        <input
                          type="number"
                          {...register('dureeSessionMoyenne', { valueAsNumber: true })}
                          className="input-field"
                          placeholder="Ex: 60"
                        />
                      </QuestionCard>

                      <QuestionCard title="Comment évoluent vos performances ?" error={errors.progressionPerformance?.message}>
                        <select {...register('progressionPerformance')} className="input-field">
                          <option value="">Sélectionner...</option>
                          <option value="regresse">Régression</option>
                          <option value="stagne">Stagnation</option>
                          <option value="lente">Progression lente</option>
                          <option value="bonne">Bonne progression</option>
                          <option value="excellente">Excellente progression</option>
                        </select>
                      </QuestionCard>

                      <QuestionCard title="Vitesse de récupération après effort ?" error={errors.courbaturesRecuperation?.message}>
                        <select {...register('courbaturesRecuperation')} className="input-field">
                          <option value="">Sélectionner...</option>
                          <option value="rapide_24h">Rapide (moins de 24h)</option>
                          <option value="normale_48h">Normale (24-48h)</option>
                          <option value="lente_72h">Lente (48-72h)</option>
                          <option value="tres_lente_plus">Très lente (plus de 72h)</option>
                        </select>
                      </QuestionCard>

                      <QuestionCard title="Quel est votre niveau de motivation pour l'entraînement ? (1-10)" error={errors.motivationEntrainement?.message}>
                        <input
                          type="range"
                          min="1"
                          max="10"
                          {...register('motivationEntrainement', { valueAsNumber: true })}
                          className="range-field"
                        />
                        <div className="flex justify-between text-xs text-gray-400 mt-2">
                          <span>Aucune motivation</span>
                          <span>Très motivé</span>
                        </div>
                      </QuestionCard>

                      <QuestionCard title="Quels sont vos objectifs de performance ?" error={errors.objectifPerformance?.message}>
                        <div className="space-y-2">
                          {['Gagner en force', 'Gagner en endurance', 'Gagner en masse musculaire', 'Améliorer flexibilité', 'Améliorer vitesse', 'Compétition', 'Santé générale'].map((objectif) => (
                            <label key={objectif} className="flex items-center gap-2 text-sm">
                              <input
                                type="checkbox"
                                value={objectif}
                                {...register('objectifPerformance')}
                                className="checkbox-field"
                              />
                              <span>{objectif}</span>
                            </label>
                          ))}
                        </div>
                      </QuestionCard>
                    </>
                  )}

                  {currentSection === 6 && (
                    <>
                      {/* Section 7: Sommeil & Récupération */}
                      <QuestionCard title="À quelle heure vous couchez-vous généralement ?" error={errors.heuresCoucher?.message}>
                        <input
                          type="time"
                          {...register('heuresCoucher')}
                          className="input-field"
                        />
                      </QuestionCard>

                      <QuestionCard title="À quelle heure vous réveillez-vous généralement ?" error={errors.heuresReveil?.message}>
                        <input
                          type="time"
                          {...register('heuresReveil')}
                          className="input-field"
                        />
                      </QuestionCard>

                      <QuestionCard title="Combien d'heures dormez-vous en moyenne par nuit ?" error={errors.heuresSommeilMoyenne?.message}>
                        <input
                          type="number"
                          step="0.5"
                          {...register('heuresSommeilMoyenne', { valueAsNumber: true })}
                          className="input-field"
                          placeholder="Ex: 7.5"
                        />
                      </QuestionCard>

                      <QuestionCard title="Comment évaluez-vous la qualité de votre sommeil ? (1-10)" error={errors.qualiteSommeil?.message}>
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

                      <QuestionCard title="Avez-vous des difficultés d'endormissement ?" error={errors.difficulteEndormissement?.message}>
                        <select {...register('difficulteEndormissement')} className="input-field">
                          <option value="">Sélectionner...</option>
                          <option value="jamais">Jamais</option>
                          <option value="rarement">Rarement</option>
                          <option value="parfois">Parfois</option>
                          <option value="souvent">Souvent</option>
                          <option value="toujours">Toujours</option>
                        </select>
                      </QuestionCard>

                      <QuestionCard title="Combien de fois vous réveillez-vous la nuit ?" error={errors.reveilsNocturnes?.message}>
                        <input
                          type="number"
                          {...register('reveilsNocturnes', { valueAsNumber: true })}
                          className="input-field"
                          placeholder="Ex: 2"
                        />
                      </QuestionCard>

                      <QuestionCard title="Comment vous sentez-vous au réveil ?" error={errors.reveilleMatin?.message}>
                        <select {...register('reveilleMatin')} className="input-field">
                          <option value="">Sélectionner...</option>
                          <option value="tres_difficile">Très difficile (je n'arrive pas à me lever)</option>
                          <option value="difficile">Difficile (j'ai besoin d'alarmes multiples)</option>
                          <option value="normal">Normal (je me lève avec l'alarme)</option>
                          <option value="facile">Facile (je me réveille avant l'alarme)</option>
                          <option value="tres_facile">Très facile (je me réveille naturellement, plein d'énergie)</option>
                        </select>
                      </QuestionCard>

                      <QuestionCard title="Quel est votre chronotype ?" error={errors.chronotype?.message}>
                        <select {...register('chronotype')} className="input-field">
                          <option value="">Sélectionner...</option>
                          <option value="du_matin">Du matin (je suis plus productif le matin)</option>
                          <option value="intermediaire">Intermédiaire (aucune préférence marquée)</option>
                          <option value="du_soir">Du soir (je suis plus productif le soir)</option>
                        </select>
                      </QuestionCard>
                    </>
                  )}

                  {currentSection === 7 && (
                    <>
                      {/* Section 8: Lifestyle & Substances */}
                      <QuestionCard title="Quelle est votre consommation d'alcool ?" error={errors.consommationAlcool?.message}>
                        <select {...register('consommationAlcool')} className="input-field">
                          <option value="">Sélectionner...</option>
                          <option value="jamais">Jamais</option>
                          <option value="occasionnel">Occasionnel (événements spéciaux)</option>
                          <option value="1_3_semaine">1-3 fois par semaine</option>
                          <option value="4_7_semaine">4-7 fois par semaine</option>
                          <option value="quotidien_multiple">Quotidien, plusieurs verres</option>
                        </select>
                      </QuestionCard>

                      <QuestionCard title="Combien de verres d'alcool par semaine en moyenne ?" error={errors.verresAlcoolSemaine?.message}>
                        <input
                          type="number"
                          {...register('verresAlcoolSemaine', { valueAsNumber: true })}
                          className="input-field"
                          placeholder="Ex: 3"
                        />
                      </QuestionCard>

                      <QuestionCard title="Quelle est votre consommation de caféine ?" error={errors.consommationCafeine?.message}>
                        <select {...register('consommationCafeine')} className="input-field">
                          <option value="">Sélectionner...</option>
                          <option value="jamais">Jamais</option>
                          <option value="1_cafe">1 café par jour</option>
                          <option value="2_3_cafes">2-3 cafés par jour</option>
                          <option value="4_5_cafes">4-5 cafés par jour</option>
                          <option value="plus_5_cafes">Plus de 5 cafés par jour</option>
                        </select>
                      </QuestionCard>

                      <QuestionCard title="À quelle heure prenez-vous votre dernier café ?" error={errors.heureDernierCafe?.message}>
                        <input
                          type="time"
                          {...register('heureDernierCafe')}
                          className="input-field"
                        />
                      </QuestionCard>

                      <QuestionCard title="Consommez-vous du tabac ?" error={errors.tabac?.message}>
                        <select {...register('tabac')} className="input-field">
                          <option value="">Sélectionner...</option>
                          <option value="jamais">Jamais</option>
                          <option value="ancien">Ancien fumeur</option>
                          <option value="occasionnel">Occasionnel</option>
                          <option value="regulier">Régulier</option>
                        </select>
                      </QuestionCard>

                      <QuestionCard title="Si fumeur, combien de cigarettes par jour ?" error={errors.cigarettesJour?.message}>
                        <input
                          type="number"
                          {...register('cigarettesJour', { valueAsNumber: true })}
                          className="input-field"
                          placeholder="Ex: 10"
                        />
                      </QuestionCard>

                      <QuestionCard title="Combien de litres d'eau buvez-vous par jour ?" error={errors.hydratationLitresJour?.message}>
                        <input
                          type="number"
                          step="0.1"
                          {...register('hydratationLitresJour', { valueAsNumber: true })}
                          className="input-field"
                          placeholder="Ex: 2.5"
                        />
                      </QuestionCard>

                      <QuestionCard title="Quels suppléments prenez-vous actuellement ?" error={errors.supplementsActuels?.message}>
                        <div className="space-y-2">
                          {['Multivitamines', 'Vitamine D', 'Oméga-3', 'Magnésium', 'Probiotiques', 'Protéines en poudre', 'Créatine', 'Pré-workout', 'Aucun'].map((supplement) => (
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
                    </>
                  )}

                  {currentSection === 8 && (
                    <>
                      {/* Section 9: Objectifs & Motivation */}
                      <QuestionCard title="Quel est votre objectif principal ?" error={errors.objectifPrincipal?.message}>
                        <select {...register('objectifPrincipal')} className="input-field">
                          <option value="">Sélectionner...</option>
                          <option value="perte_poids">Perte de poids / graisse</option>
                          <option value="gain_muscle">Gain de masse musculaire</option>
                          <option value="recomposition">Recomposition corporelle</option>
                          <option value="performance">Amélioration performance</option>
                          <option value="sante">Amélioration santé générale</option>
                          <option value="energie">Augmentation énergie / vitalité</option>
                        </select>
                      </QuestionCard>

                      <QuestionCard title="Quels sont vos objectifs secondaires ?" error={errors.objectifSecondaires?.message}>
                        <div className="space-y-2">
                          {['Améliorer sommeil', 'Réduire stress', 'Optimiser digestion', 'Équilibre hormonal', 'Améliorer humeur', 'Augmenter libido', 'Meilleure peau'].map((objectif) => (
                            <label key={objectif} className="flex items-center gap-2 text-sm">
                              <input
                                type="checkbox"
                                value={objectif}
                                {...register('objectifSecondaires')}
                                className="checkbox-field"
                              />
                              <span>{objectif}</span>
                            </label>
                          ))}
                        </div>
                      </QuestionCard>

                      <QuestionCard title="Dans quelle timeline souhaitez-vous atteindre votre objectif ?" error={errors.timelineObjectif?.message}>
                        <select {...register('timelineObjectif')} className="input-field">
                          <option value="">Sélectionner...</option>
                          <option value="1_3_mois">1-3 mois</option>
                          <option value="3_6_mois">3-6 mois</option>
                          <option value="6_12_mois">6-12 mois</option>
                          <option value="plus_12_mois">Plus de 12 mois</option>
                        </select>
                      </QuestionCard>

                      <QuestionCard title="Quels sont vos principaux obstacles ?" error={errors.obstaclesPrincipaux?.message}>
                        <div className="space-y-2">
                          {['Manque de temps', 'Manque de motivation', 'Manque de connaissances', 'Budget limité', 'Environnement défavorable', 'Stress', 'Blessures/limitations', 'Manque de soutien'].map((obstacle) => (
                            <label key={obstacle} className="flex items-center gap-2 text-sm">
                              <input
                                type="checkbox"
                                value={obstacle}
                                {...register('obstaclesPrincipaux')}
                                className="checkbox-field"
                              />
                              <span>{obstacle}</span>
                            </label>
                          ))}
                        </div>
                      </QuestionCard>

                      <QuestionCard title="Décrivez vos tentatives précédentes pour atteindre vos objectifs" error={errors.tentativesPrecedentes?.message}>
                        <textarea
                          {...register('tentativesPrecedentes')}
                          className="input-field"
                          rows={4}
                          placeholder="Qu'avez-vous essayé ? Qu'est-ce qui a fonctionné ou non ?"
                        />
                      </QuestionCard>

                      <QuestionCard title="Quel est votre niveau de motivation actuel ? (1-10)" error={errors.niveauMotivation?.message}>
                        <input
                          type="range"
                          min="1"
                          max="10"
                          {...register('niveauMotivation', { valueAsNumber: true })}
                          className="range-field"
                        />
                        <div className="flex justify-between text-xs text-gray-400 mt-2">
                          <span>Aucune motivation</span>
                          <span>Extrêmement motivé</span>
                        </div>
                      </QuestionCard>

                      <QuestionCard title="Quel niveau de soutien avez-vous de votre entourage ?" error={errors.soutiensEntourage?.message}>
                        <select {...register('soutiensEntourage')} className="input-field">
                          <option value="">Sélectionner...</option>
                          <option value="aucun">Aucun soutien</option>
                          <option value="faible">Faible soutien</option>
                          <option value="moyen">Soutien moyen</option>
                          <option value="fort">Fort soutien</option>
                          <option value="tres_fort">Très fort soutien</option>
                        </select>
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
                  Terminer et Passer au Paiement
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
