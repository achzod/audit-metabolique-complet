'use client';

import { QuestionnaireResponses } from '@/types/questionnaire';
import QuestionCard from './QuestionCard';
import RadioGroup from './RadioGroup';

interface Props {
  responses: any;
  updateResponses: (updates: any) => void;
}

export default function Section9Sommeil({ responses, updateResponses }: Props) {
  return (
    <div className="space-y-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-4">Section 9 : Sommeil & Récupération</h2>
        <p className="text-gray-400">
          Le sommeil est la base de ton métabolisme. Sans sommeil profond de qualité, ton cortisol explose, ta testostérone s'effondre, et tu ne progresseras jamais.
        </p>
      </div>

      {/* Q1: Heures sommeil nuit */}
      <QuestionCard number={1} title="Heures de sommeil par nuit (moyenne)">
        <RadioGroup
          name="heuresSommeilNuit"
          value={responses?.heuresSommeilNuit}
          onChange={(value) => updateResponses({ heuresSommeilNuit: value as any })}
          options={[
            { value: '<5H', label: '<5h (privation sévère)', critical: true, tooltip: '🚨 Métabolisme détruit' },
            { value: '5-6H', label: '5-6h (insuffisant)', critical: true },
            { value: '6-7H', label: '6-7h (limite)' },
            { value: '7-8H', label: '7-8h (optimal)', good: true },
            { value: '8-9H', label: '8-9h (bon)', good: true },
            { value: '>9H', label: '>9h (beaucoup)', tooltip: 'Peut indiquer fatigue chronique' },
          ]}
        />
      </QuestionCard>

      {/* Q2: Qualité sommeil perçue */}
      <QuestionCard number={2} title="Qualité sommeil perçue (1-10)">
        <input
          type="range"
          min="1"
          max="10"
          value={responses?.qualiteSommeilPercue || 5}
          onChange={(e) => updateResponses({ qualiteSommeilPercue: parseInt(e.target.value) })}
          className="w-full accent-cyan-500"
        />
        <div className="flex justify-between text-sm text-gray-400 mt-2">
          <span>1 (atroce)</span>
          <span className="text-white font-bold">{responses?.qualiteSommeilPercue || 5}</span>
          <span>10 (parfait)</span>
        </div>
      </QuestionCard>

      {/* Q3: Sensation réveil */}
      <QuestionCard number={3} title="Sensation au réveil">
        <RadioGroup
          name="sensationReveil"
          value={responses?.sensationReveil}
          onChange={(value) => updateResponses({ sensationReveil: value as any })}
          options={[
            { value: 'EPUISE', label: 'Épuisé, non récupéré', critical: true, tooltip: 'Sommeil non réparateur' },
            { value: 'FATIGUE', label: 'Fatigué, besoin caféine immédiat', critical: true },
            { value: 'MOYEN', label: 'Moyen, fonctionnel' },
            { value: 'REPOSE', label: 'Reposé, bonne énergie', good: true },
            { value: 'EXCELLENT', label: 'Excellent, alerte immédiat', good: true },
          ]}
        />
      </QuestionCard>

      {/* Q4: Rêves / cauchemars */}
      <QuestionCard number={4} title="Fréquence rêves / cauchemars intenses">
        <RadioGroup
          name="revesIntenses"
          value={responses?.revesIntenses}
          onChange={(value) => updateResponses({ revesIntenses: value as any })}
          options={[
            { value: 'JAMAIS', label: 'Jamais, sommeil profond', good: true },
            { value: 'RARE', label: 'Rare', good: true },
            { value: 'PARFOIS', label: 'Parfois (1-2x/semaine)' },
            { value: 'SOUVENT', label: 'Souvent (plusieurs x/semaine)', tooltip: 'REM dominant, pas assez de sommeil profond' },
            { value: 'TOUTES_NUITS', label: 'Toutes les nuits', critical: true, tooltip: 'Sommeil profond insuffisant' },
          ]}
        />
      </QuestionCard>

      {/* Q5: Ronflements / apnées */}
      <QuestionCard number={5} title="Ronflements / apnées du sommeil">
        <RadioGroup
          name="ronflements"
          value={responses?.ronflements}
          onChange={(value) => updateResponses({ ronflements: value as any })}
          options={[
            { value: 'AUCUN', label: 'Aucun', good: true },
            { value: 'LEGERS', label: 'Légers occasionnels', good: true },
            { value: 'REGULIERS', label: 'Réguliers' },
            { value: 'IMPORTANTS', label: 'Importants (partenaire se plaint)', critical: true },
            { value: 'APNEES', label: 'Apnées diagnostiquées', critical: true, tooltip: '🚨 Destruction sommeil profond + risque santé' },
          ]}
        />
      </QuestionCard>

      {/* Q6: Besoin sieste */}
      <QuestionCard number={6} title="Besoin de sieste journalière">
        <RadioGroup
          name="besoinSieste"
          value={responses?.besoinSieste}
          onChange={(value) => updateResponses({ besoinSieste: value as any })}
          options={[
            { value: 'JAMAIS', label: 'Jamais, énergie stable', good: true },
            { value: 'RARE', label: 'Rare (si sommeil court)', good: true },
            { value: 'PARFOIS', label: 'Parfois (2-3x/semaine)' },
            { value: 'SOUVENT', label: 'Souvent (quotidien)', critical: true, tooltip: 'Sommeil nocturne non récupérateur' },
            { value: 'OBLIGATOIRE', label: 'Obligatoire pour fonctionner', critical: true },
          ]}
        />
      </QuestionCard>

      {/* Q7: Exposition lumière bleue soir */}
      <QuestionCard number={7} title="Exposition écrans (lumière bleue) avant coucher">
        <RadioGroup
          name="expositionLumiereBleueSoir"
          value={responses?.expositionLumiereBleueSoir}
          onChange={(value) => updateResponses({ expositionLumiereBleueSoir: value as any })}
          options={[
            { value: 'AUCUNE', label: 'Aucune (coupure 2h avant)', good: true, tooltip: 'Optimal pour mélatonine' },
            { value: 'MINIME', label: 'Minime (coupure 1h avant)', good: true },
            { value: 'MODEREE', label: 'Modérée (30min avant coucher)' },
            { value: 'IMPORTANTE', label: 'Importante (au lit)', critical: true, tooltip: 'Mélatonine sabotée' },
            { value: 'EXTREME', label: 'Extrême (scroll jusqu\'à endormissement)', critical: true, tooltip: '🚨 Destruction mélatonine' },
          ]}
        />
      </QuestionCard>

      {/* Q8: Récupération musculaire */}
      <QuestionCard number={8} title="Vitesse récupération musculaire post-training">
        <RadioGroup
          name="recuperationMusculaire"
          value={responses?.recuperationMusculaire}
          onChange={(value) => updateResponses({ recuperationMusculaire: value as any })}
          options={[
            { value: 'TRES_LENTE', label: 'Très lente (5-7 jours)', critical: true, tooltip: 'Sommeil ou hormones' },
            { value: 'LENTE', label: 'Lente (3-4 jours)' },
            { value: 'NORMALE', label: 'Normale (48-72h)', good: true },
            { value: 'RAPIDE', label: 'Rapide (24-48h)', good: true },
            { value: 'TRES_RAPIDE', label: 'Très rapide (<24h)', good: true, tooltip: 'Récupération optimale' },
          ]}
        />
      </QuestionCard>
    </div>
  );
}
