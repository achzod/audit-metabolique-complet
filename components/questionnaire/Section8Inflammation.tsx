'use client';

import { QuestionnaireResponses } from '@/types/questionnaire';
import QuestionCard from './QuestionCard';
import RadioGroup from './RadioGroup';

interface Props {
  responses: Partial<QuestionnaireResponses>;
  updateResponses: (updates: Partial<QuestionnaireResponses>) => void;
}

export default function Section8Inflammation({ responses, updateResponses }: Props) {
  return (
    <div className="space-y-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-4">Section 8 : Inflammation & Articulations</h2>
        <p className="text-gray-400">
          L'inflammation chronique sabote ton métabolisme, ta récupération, et ta capacité à brûler du gras. Elle est souvent silencieuse mais dévastatrice.
        </p>
      </div>

      {/* Q1: Douleurs articulaires */}
      <QuestionCard number={1} title="Douleurs articulaires / raideurs">
        <RadioGroup
          name="douleursArticulaires"
          value={responses.douleursArticulaires}
          onChange={(value) => updateResponses({ douleursArticulaires: value as any })}
          options={[
            { value: 'AUCUNE', label: 'Aucune, articulations souples', good: true },
            { value: 'LEGERES', label: 'Légères (post-training uniquement)', good: true },
            { value: 'MODEREES', label: 'Modérées (plusieurs articulations)' },
            { value: 'IMPORTANTES', label: 'Importantes (quotidiennes)', critical: true, tooltip: 'Inflammation chronique' },
            { value: 'SEVERES', label: 'Sévères (limite mouvement)', critical: true, tooltip: '🚨 Inflammation systémique élevée' },
          ]}
        />
      </QuestionCard>

      {/* Q2: Raideur matinale */}
      <QuestionCard number={2} title="Raideur articulaire au réveil">
        <RadioGroup
          name="raideurMatinale"
          value={responses.raideurMatinale}
          onChange={(value) => updateResponses({ raideurMatinale: value as any })}
          options={[
            { value: 'AUCUNE', label: 'Aucune, mobile immédiatement', good: true },
            { value: 'LEGERE', label: 'Légère (<15min)', good: true },
            { value: 'MODEREE', label: 'Modérée (15-30min)' },
            { value: 'IMPORTANTE', label: 'Importante (30min-1h)', critical: true },
            { value: 'SEVERE', label: 'Sévère (>1h)', critical: true, tooltip: 'Inflammation élevée ou arthrite' },
          ]}
        />
      </QuestionCard>

      {/* Q3: Tendinites récurrentes */}
      <QuestionCard number={3} title="Tendinites / blessures récurrentes">
        <RadioGroup
          name="tendinitesRecurrentes"
          value={responses.tendinitesRecurrentes}
          onChange={(value) => updateResponses({ tendinitesRecurrentes: value as any })}
          options={[
            { value: 'JAMAIS', label: 'Jamais', good: true },
            { value: 'RARE', label: 'Rare (1 en plusieurs années)', good: true },
            { value: 'PARFOIS', label: 'Parfois (1x/an)' },
            { value: 'SOUVENT', label: 'Souvent (plusieurs/an)', critical: true, tooltip: 'Collagène ou inflammation' },
            { value: 'CHRONIQUES', label: 'Chroniques (constantes)', critical: true },
          ]}
        />
      </QuestionCard>

      {/* Q4: Temps récupération blessures */}
      <QuestionCard number={4} title="Temps de récupération blessures mineures">
        <RadioGroup
          name="recuperationBlessures"
          value={responses.recuperationBlessures}
          onChange={(value) => updateResponses({ recuperationBlessures: value as any })}
          options={[
            { value: 'RAPIDE', label: 'Rapide (<1 semaine)', good: true },
            { value: 'NORMALE', label: 'Normale (1-2 semaines)', good: true },
            { value: 'LENTE', label: 'Lente (2-4 semaines)' },
            { value: 'TRES_LENTE', label: 'Très lente (1-2 mois)', critical: true },
            { value: 'EXTREMEMENT_LENTE', label: 'Extrêmement lente (>2 mois)', critical: true, tooltip: 'Inflammation chronique ou collagène défectueux' },
          ]}
        />
      </QuestionCard>

      {/* Q5: Allergies */}
      <QuestionCard number={5} title="Allergies (saisonnières, alimentaires, environnementales)">
        <RadioGroup
          name="allergies"
          value={responses.allergies}
          onChange={(value) => updateResponses({ allergies: value as any })}
          options={[
            { value: 'AUCUNE', label: 'Aucune', good: true },
            { value: 'LEGERES', label: 'Légères (saisonnières mineures)', good: true },
            { value: 'MODEREES', label: 'Modérées (gênantes)' },
            { value: 'IMPORTANTES', label: 'Importantes (multiples)', critical: true, tooltip: 'Système immunitaire hyperactif' },
            { value: 'SEVERES', label: 'Sévères (anaphylaxie)', critical: true },
          ]}
        />
      </QuestionCard>

      {/* Q6: Fréquence maladies */}
      <QuestionCard number={6} title="Fréquence maladies (rhumes, infections)">
        <RadioGroup
          name="frequenceMaladies"
          value={responses.frequenceMaladies}
          onChange={(value) => updateResponses({ frequenceMaladies: value as any })}
          options={[
            { value: 'JAMAIS', label: 'Jamais malade', good: true, tooltip: 'Système immunitaire fort' },
            { value: 'RARE', label: 'Rare (1x/an)', good: true },
            { value: 'PARFOIS', label: 'Parfois (2-3x/an)' },
            { value: 'SOUVENT', label: 'Souvent (4-6x/an)', critical: true, tooltip: 'Immunité compromise' },
            { value: 'TRES_SOUVENT', label: 'Très souvent (>6x/an)', critical: true, tooltip: '🚨 Système immunitaire effondré' },
          ]}
        />
      </QuestionCard>

      {/* Q7: Acné / problèmes peau */}
      <QuestionCard number={7} title="Acné / problèmes de peau inflammatoires">
        <RadioGroup
          name="acneInflammatoire"
          value={responses.acneInflammatoire}
          onChange={(value) => updateResponses({ acneInflammatoire: value as any })}
          options={[
            { value: 'AUCUN', label: 'Aucun, peau claire', good: true },
            { value: 'LEGER', label: 'Léger (quelques boutons)', good: true },
            { value: 'MODERE', label: 'Modéré (acné régulière)' },
            { value: 'IMPORTANT', label: 'Important (acné sévère)', critical: true, tooltip: 'Inflammation ou hormones' },
            { value: 'SEVERE', label: 'Sévère (kystique, cicatrices)', critical: true },
          ]}
        />
      </QuestionCard>

      {/* Q8: Eczéma / psoriasis */}
      <QuestionCard number={8} title="Eczéma / psoriasis / conditions auto-immunes cutanées">
        <RadioGroup
          name="eczema"
          value={responses.eczema}
          onChange={(value) => updateResponses({ eczema: value as any })}
          options={[
            { value: 'AUCUN', label: 'Aucun', good: true },
            { value: 'LEGER', label: 'Léger (zones limitées)' },
            { value: 'MODERE', label: 'Modéré (plusieurs zones)', critical: true },
            { value: 'SEVERE', label: 'Sévère (étendu)', critical: true, tooltip: 'Auto-immunité probable' },
          ]}
        />
      </QuestionCard>

      {/* Q9: Inflammations gencives */}
      <QuestionCard number={9} title="Inflammations gencives (saignements brossage)">
        <RadioGroup
          name="inflammationsGencives"
          value={responses.inflammationsGencives}
          onChange={(value) => updateResponses({ inflammationsGencives: value as any })}
          options={[
            { value: 'JAMAIS', label: 'Jamais, gencives saines', good: true },
            { value: 'RARE', label: 'Rare', good: true },
            { value: 'PARFOIS', label: 'Parfois (1-2x/semaine)' },
            { value: 'SOUVENT', label: 'Souvent (quotidien)', critical: true, tooltip: 'Inflammation systémique ou carence vitamine C' },
            { value: 'CONSTANT', label: 'Constant + gonflement', critical: true },
          ]}
        />
      </QuestionCard>

      {/* Q10: Consommation anti-inflammatoires */}
      <QuestionCard number={10} title="Fréquence prise anti-inflammatoires (ibuprofène, etc.)">
        <RadioGroup
          name="antiInflammatoiresFrequence"
          value={responses.antiInflammatoiresFrequence}
          onChange={(value) => updateResponses({ antiInflammatoiresFrequence: value as any })}
          options={[
            { value: 'JAMAIS', label: 'Jamais', good: true },
            { value: 'RARE', label: 'Rare (urgence)', good: true },
            { value: 'PARFOIS', label: 'Parfois (1-2x/mois)' },
            { value: 'SOUVENT', label: 'Souvent (1-2x/semaine)', critical: true, tooltip: 'Dépendance aux anti-inflammatoires' },
            { value: 'QUOTIDIEN', label: 'Quotidien', critical: true, tooltip: '🚨 Inflammation chronique non traitée' },
          ]}
        />
      </QuestionCard>
    </div>
  );
}
