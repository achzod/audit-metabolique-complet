'use client';

import { QuestionnaireResponses } from '@/types/questionnaire';
import QuestionCard from './QuestionCard';
import RadioGroup from './RadioGroup';

interface Props {
  responses: Partial<QuestionnaireResponses>;
  updateResponses: (updates: Partial<QuestionnaireResponses>) => void;
}

export default function Section5Neurotransmetteurs({ responses, updateResponses }: Props) {
  return (
    <div className="space-y-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-4">Section 5 : Neurotransmetteurs</h2>
        <p className="text-gray-400">
          Dopamine, sérotonine, GABA, noradrénaline. Ces molécules dictent ta motivation, ton focus, ton humeur, et ta capacité à rester consistant.
        </p>
      </div>

      {/* Q1: Motivation quotidienne */}
      <QuestionCard number={1} title="Motivation quotidienne moyenne (1-10)">
        <input
          type="range"
          min="1"
          max="10"
          value={responses.motivationQuotidienne || 5}
          onChange={(e) => updateResponses({ motivationQuotidienne: parseInt(e.target.value) })}
          className="w-full accent-cyan-500"
        />
        <div className="flex justify-between text-sm text-gray-400 mt-2">
          <span>1 (zéro drive)</span>
          <span className="text-white font-bold">{responses.motivationQuotidienne || 5}</span>
          <span>10 (ultra motivé)</span>
        </div>
      </QuestionCard>

      {/* Q2: Procrastination */}
      <QuestionCard number={2} title="Niveau de procrastination">
        <RadioGroup
          name="procrastination"
          value={responses.procrastination}
          onChange={(value) => updateResponses({ procrastination: value as any })}
          options={[
            { value: 'JAMAIS', label: 'Jamais, exécution immédiate', good: true, tooltip: 'Dopamine saine' },
            { value: 'RAREMENT', label: 'Rarement (projets non urgents)', good: true },
            { value: 'PARFOIS', label: 'Parfois (tâches ennuyeuses)' },
            { value: 'SOUVENT', label: 'Souvent (même tâches importantes)', critical: true, tooltip: 'Dopamine basse' },
            { value: 'CONSTANTE', label: 'Constante (paralysie par analyse)', critical: true, tooltip: '🚨 Dopamine effondrée' },
          ]}
        />
      </QuestionCard>

      {/* Q3: Addictions */}
      <QuestionCard number={3} title="Addictions / dépendances actuelles (sélection multiple)">
        <div className="space-y-3">
          {[
            { value: 'SUCRE', label: 'Sucre / desserts' },
            { value: 'CAFE', label: 'Caféine excessive (>4 cafés/jour)' },
            { value: 'NICOTINE', label: 'Nicotine / vapotage' },
            { value: 'ALCOOL', label: 'Alcool (>3x/semaine)' },
            { value: 'PORNO', label: 'Pornographie' },
            { value: 'RESEAUX_SOCIAUX', label: 'Réseaux sociaux (scrolling compulsif)' },
            { value: 'JEUX_VIDEO', label: 'Jeux vidéo excessifs' },
            { value: 'SHOPPING', label: 'Shopping compulsif' },
            { value: 'AUCUNE', label: 'Aucune addiction' },
          ].map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all bg-gray-800/30 border-gray-700 hover:border-gray-600"
            >
              <input
                type="checkbox"
                checked={responses.addictions?.includes(option.value) || false}
                onChange={(e) => {
                  const current = responses.addictions || [];
                  const updated = e.target.checked
                    ? [...current, option.value]
                    : current.filter((v) => v !== option.value);
                  updateResponses({ addictions: updated });
                }}
                className="w-5 h-5 accent-cyan-500"
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      </QuestionCard>

      {/* Q4: Capacité focus */}
      <QuestionCard number={4} title="Capacité de focus / concentration soutenue">
        <RadioGroup
          name="capaciteFocus"
          value={responses.capaciteFocus}
          onChange={(value) => updateResponses({ capaciteFocus: value as any })}
          options={[
            { value: 'IMPOSSIBLE', label: 'Impossible (<15min)', critical: true, tooltip: 'ADHD-like, dopamine effondrée' },
            { value: 'MAUVAISE', label: 'Mauvaise (15-30min max)' },
            { value: 'MOYENNE', label: 'Moyenne (30min-1h)' },
            { value: 'BONNE', label: 'Bonne (1-2h)', good: true },
            { value: 'EXCELLENTE', label: 'Excellente (2h+ en flow)', good: true, tooltip: 'Dopamine optimale' },
          ]}
        />
      </QuestionCard>

      {/* Q5: Humeur baseline */}
      <QuestionCard number={5} title="Humeur baseline (sans événement particulier)">
        <RadioGroup
          name="humeurBaseline"
          value={responses.humeurBaseline}
          onChange={(value) => updateResponses({ humeurBaseline: value as any })}
          options={[
            { value: 'DEPRESSIVE', label: 'Dépressive / sombre', critical: true, tooltip: 'Sérotonine basse' },
            { value: 'BASSE', label: 'Basse / plate' },
            { value: 'NEUTRE', label: 'Neutre / stable' },
            { value: 'POSITIVE', label: 'Positive / bonne', good: true },
            { value: 'OPTIMISTE', label: 'Optimiste / joyeuse', good: true, tooltip: 'Sérotonine saine' },
          ]}
        />
      </QuestionCard>

      {/* Q6: Anxiété */}
      <QuestionCard number={6} title="Niveau d'anxiété général">
        <RadioGroup
          name="anxiete"
          value={responses.anxiete}
          onChange={(value) => updateResponses({ anxiete: value as any })}
          options={[
            { value: 'AUCUNE', label: 'Aucune, calme naturel', good: true, tooltip: 'GABA optimal' },
            { value: 'LEGERE', label: 'Légère (situations stressantes)', good: true },
            { value: 'MODEREE', label: 'Modérée (inquiétudes quotidiennes)' },
            { value: 'ELEVEE', label: 'Élevée (anxiété fréquente)', critical: true, tooltip: 'GABA bas' },
            { value: 'SEVERE', label: 'Sévère (attaques de panique)', critical: true, tooltip: '🚨 GABA effondré' },
          ]}
        />
      </QuestionCard>

      {/* Q7: Plaisir activités */}
      <QuestionCard number={7} title="Plaisir dans les activités habituellement plaisantes">
        <RadioGroup
          name="plaisirActivites"
          value={responses.plaisirActivites}
          onChange={(value) => updateResponses({ plaisirActivites: value as any })}
          options={[
            { value: 'AUCUN', label: 'Aucun, anhedonie totale', critical: true, tooltip: '🚨 Dopamine effondrée' },
            { value: 'TRES_BAS', label: 'Très bas, rien n\'excite', critical: true },
            { value: 'BAS', label: 'Bas, peu d\'intérêt' },
            { value: 'MOYEN', label: 'Moyen, certaines choses plaisantes' },
            { value: 'BON', label: 'Bon, plaisir régulier', good: true },
            { value: 'EXCELLENT', label: 'Excellent, passionné', good: true },
          ]}
        />
      </QuestionCard>

      {/* Q8: Reward sensitivity */}
      <QuestionCard number={8} title="Sensibilité aux récompenses (besoin de stimulation intense ?)">
        <RadioGroup
          name="rewardSensitivity"
          value={responses.rewardSensitivity}
          onChange={(value) => updateResponses({ rewardSensitivity: value as any })}
          options={[
            { value: 'TRES_BASSE', label: 'Très basse (rien ne satisfait)', critical: true, tooltip: 'Récepteurs dopamine désensibilisés' },
            { value: 'BASSE', label: 'Basse (besoin stimulation forte)' },
            { value: 'NORMALE', label: 'Normale (équilibrée)', good: true },
            { value: 'ELEVEE', label: 'Élevée (petites choses plaisantes)', good: true, tooltip: 'Récepteurs dopamine sensibles' },
          ]}
        />
      </QuestionCard>

      {/* Q9: Impulsivité */}
      <QuestionCard number={9} title="Impulsivité / acting without thinking">
        <RadioGroup
          name="impulsivite"
          value={responses.impulsivite}
          onChange={(value) => updateResponses({ impulsivite: value as any })}
          options={[
            { value: 'TRES_BASSE', label: 'Très basse (réfléchi à l\'excès)', tooltip: 'Peut indiquer sérotonine élevée' },
            { value: 'BASSE', label: 'Basse (réfléchit avant d\'agir)', good: true },
            { value: 'MOYENNE', label: 'Moyenne (situationnel)', good: true },
            { value: 'ELEVEE', label: 'Élevée (souvent impulsif)' },
            { value: 'TRES_ELEVEE', label: 'Très élevée (actions regrettées)', critical: true, tooltip: 'Sérotonine basse' },
          ]}
        />
      </QuestionCard>

      {/* Q10: Sociabilité */}
      <QuestionCard number={10} title="Sociabilité / besoin d'interaction sociale">
        <RadioGroup
          name="sociabilite"
          value={responses.sociabilite}
          onChange={(value) => updateResponses({ sociabilite: value as any })}
          options={[
            { value: 'ISOLATION', label: 'Évite activement (anxiété sociale)', critical: true, tooltip: 'Peut indiquer oxytocine/sérotonine basses' },
            { value: 'TRES_FAIBLE', label: 'Très faible (préfère solitude)' },
            { value: 'FAIBLE', label: 'Faible (sociable occasionnel)' },
            { value: 'MOYENNE', label: 'Moyenne (équilibrée)', good: true },
            { value: 'ELEVEE', label: 'Élevée (extraverti)', good: true },
            { value: 'TRES_ELEVEE', label: 'Très élevée (hypersocial)' },
          ]}
        />
      </QuestionCard>

      {/* Q11: Libido */}
      <QuestionCard number={11} title="Libido / sex drive">
        <RadioGroup
          name="libido"
          value={responses.libido}
          onChange={(value) => updateResponses({ libido: value as any })}
          options={[
            { value: 'INEXISTANTE', label: 'Inexistante', critical: true, tooltip: 'Dopamine + testostérone basses' },
            { value: 'TRES_BASSE', label: 'Très basse', critical: true },
            { value: 'BASSE', label: 'Basse' },
            { value: 'MOYENNE', label: 'Moyenne', good: true },
            { value: 'ELEVEE', label: 'Élevée', good: true },
            { value: 'TRES_ELEVEE', label: 'Très élevée', good: true },
          ]}
        />
      </QuestionCard>

      {/* Q12: Mental clarity */}
      <QuestionCard number={12} title="Clarté mentale / brain fog">
        <RadioGroup
          name="mentalClarity"
          value={responses.mentalClarity}
          onChange={(value) => updateResponses({ mentalClarity: value as any })}
          options={[
            { value: 'FOG_CONSTANT', label: 'Brain fog constant', critical: true, tooltip: '🚨 Inflammation + neurotransmetteurs dysfonctionnels' },
            { value: 'FOG_FREQUENT', label: 'Brain fog fréquent', critical: true },
            { value: 'FOG_PARFOIS', label: 'Brain fog parfois (après repas, fatigue)' },
            { value: 'CLAIRE', label: 'Claire la plupart du temps', good: true },
            { value: 'TRES_CLAIRE', label: 'Très claire (pensée rapide, précise)', good: true, tooltip: 'Neurotransmetteurs optimaux' },
          ]}
        />
      </QuestionCard>
    </div>
  );
}
