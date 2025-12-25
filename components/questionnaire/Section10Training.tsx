'use client';

import { QuestionnaireResponses } from '@/types/questionnaire';
import QuestionCard from './QuestionCard';
import RadioGroup from './RadioGroup';

interface Props {
  responses: any;
  updateResponses: (updates: any) => void;
}

export default function Section10Training({ responses, updateResponses }: Props) {
  return (
    <div className="space-y-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-4">Section 10 : Training & Performance</h2>
        <p className="text-gray-400">
          Dernière section : ton entraînement actuel et ta capacité de performance physique.
        </p>
      </div>

      {/* Q1: Fréquence training */}
      <QuestionCard number={1} title="Fréquence entraînement hebdomadaire">
        <RadioGroup
          name="frequenceTraining"
          value={responses?.frequenceTraining}
          onChange={(value) => updateResponses({ frequenceTraining: value as any })}
          options={[
            { value: 'AUCUN', label: 'Aucun (sédentaire)', critical: true },
            { value: '1-2X', label: '1-2x/semaine (débutant)' },
            { value: '3-4X', label: '3-4x/semaine (intermédiaire)', good: true },
            { value: '5-6X', label: '5-6x/semaine (avancé)', good: true },
            { value: '7X+', label: '7x+/semaine (athlète ou overtraining)', tooltip: 'Risque overtraining si récupération mauvaise' },
          ]}
        />
      </QuestionCard>

      {/* Q2: Type training dominant */}
      <QuestionCard number={2} title="Type d'entraînement dominant">
        <RadioGroup
          name="typeTrainingDominant"
          value={responses?.typeTrainingDominant}
          onChange={(value) => updateResponses({ typeTrainingDominant: value as any })}
          options={[
            { value: 'MUSCU_HYPERTROPHIE', label: 'Musculation hypertrophie' },
            { value: 'MUSCU_FORCE', label: 'Musculation force (powerlifting)' },
            { value: 'CROSSFIT_HIIT', label: 'CrossFit / HIIT' },
            { value: 'CARDIO_ENDURANCE', label: 'Cardio endurance (course, vélo)' },
            { value: 'SPORTS_COMBAT', label: 'Sports de combat' },
            { value: 'MIXTE', label: 'Mixte (plusieurs types)' },
            { value: 'AUCUN', label: 'Aucun entraînement' },
          ]}
        />
      </QuestionCard>

      {/* Q3: Énergie pendant training */}
      <QuestionCard number={3} title="Énergie / performance pendant le training">
        <RadioGroup
          name="energiePendantTraining"
          value={responses?.energiePendantTraining}
          onChange={(value) => updateResponses({ energiePendantTraining: value as any })}
          options={[
            { value: 'EPUISE', label: 'Épuisé, performances effondrées', critical: true, tooltip: 'Métabolisme ou hormones cassés' },
            { value: 'FAIBLE', label: 'Faible, difficile de finir sessions', critical: true },
            { value: 'MOYENNE', label: 'Moyenne, variable selon jour' },
            { value: 'BONNE', label: 'Bonne, performances stables', good: true },
            { value: 'EXCELLENTE', label: 'Excellente, PR réguliers', good: true },
          ]}
        />
      </QuestionCard>

      {/* Q4: Pump / congestion musculaire */}
      <QuestionCard number={4} title="Qualité pump / congestion musculaire (si musculation)">
        <RadioGroup
          name="qualitePump"
          value={responses?.qualitePump}
          onChange={(value) => updateResponses({ qualitePump: value as any })}
          options={[
            { value: 'INEXISTANT', label: 'Inexistant (muscles plats)', critical: true, tooltip: 'Glycogène vide ou circulation mauvaise' },
            { value: 'FAIBLE', label: 'Faible (pump limité)' },
            { value: 'MOYEN', label: 'Moyen (pump correct)' },
            { value: 'BON', label: 'Bon (pump solide)', good: true },
            { value: 'EXCELLENT', label: 'Excellent (pump extrême, vascularisation)', good: true, tooltip: 'Métabolisme glucides optimal' },
            { value: 'NON_APPLICABLE', label: 'Non applicable (pas de musculation)' },
          ]}
        />
      </QuestionCard>
    </div>
  );
}
