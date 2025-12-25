'use client';

import { QuestionnaireResponses } from '@/types/questionnaire';
import QuestionCard from './QuestionCard';
import RadioGroup from './RadioGroup';

interface Props {
  responses: any;
  updateResponses: (data: any) => void;
}

export default function Section3FlexibiliteMetabolique({ responses, updateResponses }: Props) {
  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          🔥 SECTION 3 : FLEXIBILITÉ MÉTABOLIQUE & SWITCHING CARBURANT
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Cette section est <span className="text-red-500 font-bold">CRITIQUE</span> pour détecter si tes mitochondries sont cassées
        </p>
      </div>

      {/* Question 1 */}
      <QuestionCard
        number={1}
        title="Combien de temps peux-tu rester sans manger avant brain fog/malaise ?"
        critical
      >
        <RadioGroup
          name="tempsSansManger"
          value={responses?.tempsSansManger}
          onChange={(value) => updateResponses({ tempsSansManger: value as any })}
          options={[
            { value: '<2H', label: 'Moins de 2h', critical: true, tooltip: 'Métabolisme 100% glucose-dépendant 🚨' },
            { value: '2-3H', label: '2-3h', critical: true, tooltip: 'Très glucose-dépendant' },
            { value: '3-4H', label: '3-4h', tooltip: 'Moyennement flexible' },
            { value: '4-6H', label: '4-6h', tooltip: 'Bonne flexibilité' },
            { value: '6-12H', label: '6-12h', good: true, tooltip: 'Très bonne flexibilité' },
            { value: '12-16H', label: '12-16h', good: true, tooltip: 'Excellente flexibilité, fat-adapted' },
            { value: '16H+', label: '16h+ facile', good: true, tooltip: 'Métabolisme ultra flexible' },
          ]}
        />
      </QuestionCard>

      {/* Question 2 */}
      <QuestionCard
        number={2}
        title="Que ressens-tu si tu sautes le petit-déjeuner ?"
        critical
      >
        <RadioGroup
          name="sauterPetitDej"
          value={responses?.sauterPetitDej}
          onChange={(value) => updateResponses({ sauterPetitDej: value as any })}
          options={[
            { value: 'HYPOGLYCEMIE_SEVERE', label: 'Hypoglycémie sévère (tremblements, sueurs, malaise)', critical: true },
            { value: 'BRAIN_FOG_INTENSE', label: 'Brain fog intense, incapacité à réfléchir', critical: true },
            { value: 'IRRITABILITE_EXTREME', label: 'Irritabilité extrême (hangry)' },
            { value: 'FAIM_INTENSE', label: 'Faim intense mais gérable' },
            { value: 'FAIM_LEGERE', label: 'Faim légère' },
            { value: 'AUCUNE_SENSATION', label: 'Aucune sensation particulière, énergie stable', good: true },
            { value: 'BOOST_ENERGIE', label: 'Boost d\'énergie et clarté mentale (autophagie activée)', good: true },
          ]}
        />
      </QuestionCard>

      {/* Question 3 */}
      <QuestionCard
        number={3}
        title="Énergie en jeûne intermittent (si déjà testé) :"
      >
        <RadioGroup
          name="energieJeuneIntermittent"
          value={responses?.energieJeuneIntermittent}
          onChange={(value) => updateResponses({ energieJeuneIntermittent: value as any })}
          options={[
            { value: 'JAMAIS_TESTE', label: 'Jamais testé' },
            { value: 'EFFONDREMENT', label: 'Effondrement total (impossible de tenir)', critical: true },
            { value: 'MAUVAISE_PERSISTANTE', label: 'Mauvaise au début ET mauvaise après 2-3 semaines (non-adaptation)', critical: true },
            { value: 'MAUVAISE_PUIS_BONNE', label: 'Mauvaise au début puis excellente après adaptation (2-4 semaines)', good: true },
            { value: 'BONNE_DEBUT', label: 'Bonne dès le début (déjà fat-adapted)', good: true },
          ]}
        />
      </QuestionCard>

      {/* Question 4 */}
      <QuestionCard
        number={4}
        title="Combien de temps pour entrer en cétose fonctionnelle (si déjà testé keto) ?"
      >
        <RadioGroup
          name="tempsEntreeCetose"
          value={responses?.tempsEntreeCetose}
          onChange={(value) => updateResponses({ tempsEntreeCetose: value as any })}
          options={[
            { value: 'JAMAIS_KETO', label: 'Jamais fait keto' },
            { value: 'JAMAIS_REUSSI', label: 'Jamais réussi à entrer en cétose même après 4+ semaines', critical: true },
            { value: '3-4_SEMAINES', label: '3-4 semaines (très mauvaise adaptation)', critical: true },
            { value: '2-3_SEMAINES', label: '2-3 semaines (mauvaise adaptation)' },
            { value: '1-2_SEMAINES', label: '1-2 semaines (adaptation moyenne)' },
            { value: '3-7_JOURS', label: '3-7 jours (bonne adaptation)', good: true },
            { value: '24-72H', label: '24-72h (excellente flexibilité métabolique)', good: true },
          ]}
        />
      </QuestionCard>

      {/* Question 5 */}
      <QuestionCard
        number={5}
        title="Ton énergie en régime low-carb strict (< 50g glucides/jour) si déjà testé :"
      >
        <RadioGroup
          name="energieLowCarb"
          value={responses?.energieLowCarb}
          onChange={(value) => updateResponses({ energieLowCarb: value as any })}
          options={[
            { value: 'JAMAIS_TESTE', label: 'Jamais testé' },
            { value: 'CATASTROPHIQUE', label: 'Catastrophique même après 4+ semaines (mitochondries cassées)', critical: true },
            { value: 'MAUVAISE_PUIS_OK', label: 'Mauvaise pendant 2-3 semaines puis OK' },
            { value: 'MAUVAISE_PUIS_EXCELLENTE', label: 'Mauvaise pendant 1 semaine puis excellente', good: true },
            { value: 'BONNE_DEBUT', label: 'Bonne dès le début', good: true },
          ]}
        />
      </QuestionCard>

      {/* Question 6 */}
      <QuestionCard
        number={6}
        title="Après avoir mangé des glucides rapides (pain blanc, bonbons, soda), que se passe-t-il ?"
        critical
      >
        <RadioGroup
          name="apresGlucidesRapides"
          value={responses?.apresGlucidesRapides}
          onChange={(value) => updateResponses({ apresGlucidesRapides: value as any })}
          options={[
            { value: 'CRASH_IMMEDIAT', label: 'Crash d\'énergie immédiat + brain fog (résistance insuline sévère)', critical: true },
            { value: 'BOOST_PUIS_CRASH', label: 'Boost 30 min puis crash brutal (spike insuline)', critical: true },
            { value: 'BOOST_PUIS_REDEMANDER', label: 'Boost puis besoin d\'en remanger rapidement (addiction glucose)' },
            { value: 'ENERGIE_STABLE', label: 'Énergie stable (bonne gestion insuline)', good: true },
            { value: 'AUCUN_EFFET', label: 'Aucun effet particulier', good: true },
          ]}
        />
      </QuestionCard>

      {/* Question 7 */}
      <QuestionCard
        number={7}
        title="Fréquence RÉELLE des envies de sucre dans ta journée :"
        critical
      >
        <RadioGroup
          name="frequenceEnviesSucre"
          value={responses?.frequenceEnviesSucre}
          onChange={(value) => updateResponses({ frequenceEnviesSucre: value as any })}
          options={[
            { value: '1-2H', label: 'Toutes les 1-2h (glucose-addict total)', critical: true },
            { value: '3-4H', label: 'Toutes les 3-4h', critical: true },
            { value: '2-3X_JOUR', label: '2-3 fois par jour' },
            { value: '1X_JOUR', label: '1 fois par jour' },
            { value: 'RARE', label: 'Rarement (1-2x/semaine)', good: true },
            { value: 'JAMAIS', label: 'Jamais', good: true },
          ]}
        />
      </QuestionCard>

      {/* Question 8 */}
      <QuestionCard
        number={8}
        title="Moment pic des envies de sucre :"
      >
        <RadioGroup
          name="momentPicEnviesSucre"
          value={responses?.momentPicEnviesSucre}
          onChange={(value) => updateResponses({ momentPicEnviesSucre: value as any })}
          options={[
            { value: 'REVEIL', label: 'Dès le réveil' },
            { value: 'MATIN_10-11H', label: 'Milieu de matinée (10-11h)' },
            { value: 'APRES_MIDI_15-17H', label: 'Après-midi (15-17h) - crash cortisol classique' },
            { value: 'SOIR', label: 'Soir après dîner' },
            { value: 'NUIT', label: 'Nuit' },
            { value: 'PAS_PATTERN', label: 'Pas de pattern clair / Toute la journée' },
            { value: 'JAMAIS', label: 'Jamais d\'envies', good: true },
          ]}
        />
      </QuestionCard>

      {/* Question 9 */}
      <QuestionCard
        number={9}
        title="Performance cognitive à jeun (matin avant manger) :"
        critical
      >
        <RadioGroup
          name="performanceCognitiveJeun"
          value={responses?.performanceCognitiveJeun}
          onChange={(value) => updateResponses({ performanceCognitiveJeun: value as any })}
          options={[
            { value: 'INCAPACITE', label: 'Incapacité totale à réfléchir (cerveau 100% glucose)', critical: true },
            { value: 'BRAIN_FOG_SEVERE', label: 'Brain fog sévère', critical: true },
            { value: 'BRAIN_FOG_MODERE', label: 'Brain fog modéré' },
            { value: 'CORRECTE', label: 'Correcte mais sous-optimale' },
            { value: 'BONNE', label: 'Bonne' },
            { value: 'EXCELLENTE', label: 'Excellente (cétones cérébrales actifs)', good: true },
          ]}
        />
      </QuestionCard>

      {/* Question 10 */}
      <QuestionCard
        number={10}
        title="Ton niveau d'énergie avec alimentation riche en graisses (>60% calories) :"
      >
        <RadioGroup
          name="niveauEnergieGras"
          value={responses?.niveauEnergieGras}
          onChange={(value) => updateResponses({ niveauEnergieGras: value as any })}
          options={[
            { value: 'JAMAIS_TESTE', label: 'Jamais testé' },
            { value: 'CATASTROPHIQUE', label: 'Catastrophique (nausée, fatigue, digestion impossible)', critical: true },
            { value: 'MAUVAIS', label: 'Mauvais' },
            { value: 'CORRECT', label: 'Correct' },
            { value: 'BON', label: 'Bon' },
            { value: 'EXCELLENT', label: 'Excellent (fat-adapted)', good: true },
          ]}
        />
      </QuestionCard>

      {/* Questions 11-15 : lecteur cétones, glycémie, tremblements, glucides jour, type gras */}
      {/* À compléter... (même structure) */}
    </div>
  );
}
