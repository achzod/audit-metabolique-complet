'use client';

import { QuestionnaireResponses } from '@/types/questionnaire';
import QuestionCard from './QuestionCard';
import RadioGroup from './RadioGroup';

interface Props {
  responses: Partial<QuestionnaireResponses>;
  updateResponses: (updates: Partial<QuestionnaireResponses>) => void;
}

export default function Section1Profil({ responses, updateResponses }: Props) {
  return (
    <div className="space-y-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-4">Section 1 : Profil Général</h2>
        <p className="text-gray-400">Commençons par les bases pour établir ton profil.</p>
      </div>

      {/* Q1: Âge */}
      <QuestionCard number={1} title="Quel âge as-tu ?">
        <input
          type="number"
          min="18"
          max="80"
          value={responses.age || ''}
          onChange={(e) => updateResponses({ age: parseInt(e.target.value) })}
          className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
          placeholder="Ex: 32"
        />
      </QuestionCard>

      {/* Q2: Sexe */}
      <QuestionCard number={2} title="Sexe biologique">
        <RadioGroup
          name="sexe"
          value={responses.sexe}
          onChange={(value) => updateResponses({ sexe: value as any })}
          options={[
            { value: 'HOMME', label: 'Homme' },
            { value: 'FEMME', label: 'Femme' },
          ]}
        />
      </QuestionCard>

      {/* Q3: Poids */}
      <QuestionCard number={3} title="Poids actuel (kg)">
        <input
          type="number"
          min="40"
          max="200"
          step="0.5"
          value={responses.poids || ''}
          onChange={(e) => updateResponses({ poids: parseFloat(e.target.value) })}
          className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
          placeholder="Ex: 82.5"
        />
      </QuestionCard>

      {/* Q4: Taille */}
      <QuestionCard number={4} title="Taille (cm)">
        <input
          type="number"
          min="140"
          max="220"
          value={responses.taille || ''}
          onChange={(e) => updateResponses({ taille: parseInt(e.target.value) })}
          className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
          placeholder="Ex: 178"
        />
      </QuestionCard>

      {/* Q5: Objectif principal */}
      <QuestionCard number={5} title="Objectif principal">
        <RadioGroup
          name="objectifPrincipal"
          value={responses.objectifPrincipal}
          onChange={(value) => updateResponses({ objectifPrincipal: value as any })}
          options={[
            { value: 'PERTE_GRAS', label: 'Perte de gras', tooltip: 'Réduire le bodyfat tout en gardant le muscle' },
            { value: 'PRISE_MUSCLE', label: 'Prise de muscle', tooltip: 'Maximiser l\'hypertrophie musculaire' },
            { value: 'RECOMPOSITION', label: 'Recomposition corporelle', tooltip: 'Perdre du gras ET gagner du muscle simultanément' },
            { value: 'PERFORMANCE', label: 'Performance sportive', tooltip: 'Force, endurance, vitesse' },
            { value: 'ENERGIE_SANTE', label: 'Énergie & santé globale', tooltip: 'Optimiser le métabolisme, hormones, bien-être' },
            { value: 'LONGÉVITÉ', label: 'Longévité & anti-aging', tooltip: 'Ralentir le vieillissement, optimiser la healthspan' },
          ]}
        />
      </QuestionCard>

      {/* Q6: Années d'entraînement */}
      <QuestionCard number={6} title="Années d'entraînement régulier">
        <input
          type="number"
          min="0"
          max="50"
          value={responses.anneesEntrainement || ''}
          onChange={(e) => updateResponses({ anneesEntrainement: parseInt(e.target.value) })}
          className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
          placeholder="Ex: 5"
        />
      </QuestionCard>

      {/* Q7: Régimes essayés */}
      <QuestionCard number={7} title="Régimes / protocoles déjà essayés (sélection multiple)">
        <div className="space-y-3">
          {[
            { value: 'KETO', label: 'Keto / Cétogène' },
            { value: 'PALEO', label: 'Paléo' },
            { value: 'CARNIVORE', label: 'Carnivore' },
            { value: 'VEGAN', label: 'Vegan / Végétarien' },
            { value: 'INTERMITTENT_FASTING', label: 'Jeûne intermittent' },
            { value: 'LOW_CARB', label: 'Low-carb' },
            { value: 'CALORIE_COUNTING', label: 'Comptage calories / IIFYM' },
            { value: 'FLEXIBLE_DIETING', label: 'Flexible dieting' },
            { value: 'AUCUN', label: 'Aucun régime spécifique' },
          ].map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all bg-gray-800/30 border-gray-700 hover:border-gray-600"
            >
              <input
                type="checkbox"
                checked={responses.regimesEssayes?.includes(option.value) || false}
                onChange={(e) => {
                  const current = responses.regimesEssayes || [];
                  const updated = e.target.checked
                    ? [...current, option.value]
                    : current.filter((v) => v !== option.value);
                  updateResponses({ regimesEssayes: updated });
                }}
                className="w-5 h-5 accent-cyan-500"
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      </QuestionCard>

      {/* Q8: Problème principal (texte libre) */}
      <QuestionCard number={8} title="Quel est ton problème / blocage principal actuellement ?">
        <textarea
          value={responses.problemePrincipal || ''}
          onChange={(e) => updateResponses({ problemePrincipal: e.target.value })}
          rows={4}
          className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500 resize-none"
          placeholder="Ex: Je stagne à 18% bodyfat depuis 6 mois malgré mes efforts, aucun cardio ne marche, j'ai essayé keto mais je n'ai aucune énergie..."
        />
      </QuestionCard>
    </div>
  );
}
