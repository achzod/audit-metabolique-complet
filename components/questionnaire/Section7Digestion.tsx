'use client';

import { QuestionnaireResponses } from '@/types/questionnaire';
import QuestionCard from './QuestionCard';
import RadioGroup from './RadioGroup';

interface Props {
  responses: any;
  updateResponses: (updates: any) => void;
}

export default function Section7Digestion({ responses, updateResponses }: Props) {
  return (
    <div className="space-y-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-4">Section 7 : Digestion & Microbiome</h2>
        <p className="text-gray-400">
          Ton intestin fabrique 90% de ta sérotonine, contrôle ton inflammation, et dicte ton absorption des nutriments. Un gut endommagé = métabolisme cassé.
        </p>
      </div>

      {/* Q1: Ballonnements */}
      <QuestionCard number={1} title="Fréquence ballonnements abdominaux">
        <RadioGroup
          name="ballonnements"
          value={responses?.ballonnements}
          onChange={(value) => updateResponses({ ballonnements: value as any })}
          options={[
            { value: 'JAMAIS', label: 'Jamais, ventre plat', good: true },
            { value: 'RARE', label: 'Rare (certains aliments)', good: true },
            { value: 'PARFOIS', label: 'Parfois (2-3x/semaine)' },
            { value: 'SOUVENT', label: 'Souvent (quotidien)', critical: true, tooltip: 'SIBO / dysbiose probable' },
            { value: 'CONSTANT', label: 'Constant (ventre gonflé 24/7)', critical: true, tooltip: '🚨 Gut sévèrement endommagé' },
          ]}
        />
      </QuestionCard>

      {/* Q2: Gaz / flatulences */}
      <QuestionCard number={2} title="Gaz / flatulences excessifs">
        <RadioGroup
          name="gazExcessifs"
          value={responses?.gazExcessifs}
          onChange={(value) => updateResponses({ gazExcessifs: value as any })}
          options={[
            { value: 'JAMAIS', label: 'Jamais / rare', good: true },
            { value: 'PARFOIS', label: 'Parfois (normaux)' },
            { value: 'SOUVENT', label: 'Souvent (fréquents)', tooltip: 'Fermentation excessive' },
            { value: 'CONSTANT', label: 'Constants et nauséabonds', critical: true, tooltip: 'Dysbiose / SIBO' },
          ]}
        />
      </QuestionCard>

      {/* Q3: Reflux acide */}
      <QuestionCard number={3} title="Reflux acide / brûlures d'estomac">
        <RadioGroup
          name="refluxAcide"
          value={responses?.refluxAcide}
          onChange={(value) => updateResponses({ refluxAcide: value as any })}
          options={[
            { value: 'JAMAIS', label: 'Jamais', good: true },
            { value: 'RARE', label: 'Rare (aliments spécifiques)' },
            { value: 'PARFOIS', label: 'Parfois (1-2x/semaine)' },
            { value: 'SOUVENT', label: 'Souvent (plusieurs x/semaine)', critical: true, tooltip: 'GERD / acide gastrique bas' },
            { value: 'CHRONIQUE', label: 'Chronique (quotidien)', critical: true },
          ]}
        />
      </QuestionCard>

      {/* Q4: Qualité selles */}
      <QuestionCard number={4} title="Qualité selles (échelle Bristol)">
        <RadioGroup
          name="qualiteSelles"
          value={responses?.qualiteSelles}
          onChange={(value) => updateResponses({ qualiteSelles: value as any })}
          options={[
            { value: 'TYPE_1_2', label: 'Type 1-2 (dures, séparées)', critical: true, tooltip: 'Constipation / transit lent' },
            { value: 'TYPE_3', label: 'Type 3 (forme saucisse mais craquelée)' },
            { value: 'TYPE_4', label: 'Type 4 (lisse, en forme)', good: true, tooltip: 'Optimal' },
            { value: 'TYPE_5', label: 'Type 5 (morceaux mous)' },
            { value: 'TYPE_6_7', label: 'Type 6-7 (liquides, diarrhée)', critical: true, tooltip: 'Inflammation / malabsorption' },
          ]}
        />
      </QuestionCard>

      {/* Q5: Fréquence selles */}
      <QuestionCard number={5} title="Fréquence selles quotidienne">
        <RadioGroup
          name="frequenceSelles"
          value={responses?.frequenceSelles}
          onChange={(value) => updateResponses({ frequenceSelles: value as any })}
          options={[
            { value: '<1', label: '<1x/jour (tous les 2-3 jours)', critical: true, tooltip: 'Transit lent' },
            { value: '1X', label: '1x/jour (normal)', good: true },
            { value: '2X', label: '2x/jour (bon)', good: true },
            { value: '3X+', label: '3x+/jour', tooltip: 'Peut indiquer inflammation ou malabsorption' },
          ]}
        />
      </QuestionCard>

      {/* Q6: Aliments non digérés */}
      <QuestionCard number={6} title="Aliments non digérés visibles dans les selles">
        <RadioGroup
          name="alimentsNonDigeres"
          value={responses?.alimentsNonDigeres}
          onChange={(value) => updateResponses({ alimentsNonDigeres: value as any })}
          options={[
            { value: 'JAMAIS', label: 'Jamais', good: true },
            { value: 'RARE', label: 'Rare (fibres végétales normales)', good: true },
            { value: 'PARFOIS', label: 'Parfois (morceaux visibles)' },
            { value: 'SOUVENT', label: 'Souvent', critical: true, tooltip: 'Enzymes digestives insuffisantes' },
            { value: 'SYSTEMATIQUE', label: 'Systématique', critical: true, tooltip: '🚨 Malabsorption sévère' },
          ]}
        />
      </QuestionCard>

      {/* Q7: Intolérances alimentaires */}
      <QuestionCard number={7} title="Intolérances / sensibilités alimentaires connues (sélection multiple)">
        <div className="space-y-3">
          {[
            { value: 'GLUTEN', label: 'Gluten' },
            { value: 'LACTOSE', label: 'Lactose / produits laitiers' },
            { value: 'FODMAPS', label: 'FODMAPs (oignons, ail, légumineuses)' },
            { value: 'HISTAMINE', label: 'Histamine (aliments fermentés, viande vieillie)' },
            { value: 'FRUCTOSE', label: 'Fructose (fruits)' },
            { value: 'OEUFS', label: 'Œufs' },
            { value: 'NOIX', label: 'Noix / graines' },
            { value: 'AUCUNE', label: 'Aucune intolérance connue' },
          ].map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all bg-gray-800/30 border-gray-700 hover:border-gray-600"
            >
              <input
                type="checkbox"
                checked={responses?.intolerancesAlimentaires?.includes(option.value) || false}
                onChange={(e) => {
                  const current = responses?.intolerancesAlimentaires || [];
                  const updated = e.target.checked
                    ? [...current, option.value]
                    : current.filter((v) => v !== option.value);
                  updateResponses({ intolerancesAlimentaires: updated });
                }}
                className="w-5 h-5 accent-cyan-500"
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      </QuestionCard>

      {/* Q8: Douleurs abdominales */}
      <QuestionCard number={8} title="Douleurs / crampes abdominales">
        <RadioGroup
          name="douleursAbdominales"
          value={responses?.douleursAbdominales}
          onChange={(value) => updateResponses({ douleursAbdominales: value as any })}
          options={[
            { value: 'JAMAIS', label: 'Jamais', good: true },
            { value: 'RARE', label: 'Rares (certains aliments)', good: true },
            { value: 'PARFOIS', label: 'Parfois (1-2x/semaine)' },
            { value: 'SOUVENT', label: 'Souvent (plusieurs x/semaine)', critical: true },
            { value: 'CHRONIQUES', label: 'Chroniques (quotidiennes)', critical: true, tooltip: '🚨 IBS / IBD possible' },
          ]}
        />
      </QuestionCard>

      {/* Q9: Antibiotiques récents */}
      <QuestionCard number={9} title="Antibiotiques dans les 12 derniers mois">
        <RadioGroup
          name="antibiotiquesRecents"
          value={responses?.antibiotiquesRecents}
          onChange={(value) => updateResponses({ antibiotiquesRecents: value as any })}
          options={[
            { value: 'AUCUN', label: 'Aucun', good: true },
            { value: '1_CURE', label: '1 cure' },
            { value: '2_3_CURES', label: '2-3 cures', critical: true, tooltip: 'Microbiome possiblement endommagé' },
            { value: '4_CURES+', label: '4 cures ou plus', critical: true, tooltip: '🚨 Dysbiose probable' },
          ]}
        />
      </QuestionCard>

      {/* Q10: Diversité alimentaire */}
      <QuestionCard number={10} title="Diversité alimentaire (nombre aliments différents/semaine)">
        <RadioGroup
          name="diversiteAlimentaire"
          value={responses?.diversiteAlimentaire}
          onChange={(value) => updateResponses({ diversiteAlimentaire: value as any })}
          options={[
            { value: '<10', label: '<10 aliments (très faible)', critical: true, tooltip: 'Microbiome appauvri' },
            { value: '10-20', label: '10-20 aliments (faible)' },
            { value: '20-30', label: '20-30 aliments (moyen)' },
            { value: '30-40', label: '30-40 aliments (bon)', good: true },
            { value: '40+', label: '40+ aliments (excellent)', good: true, tooltip: 'Optimal pour microbiome' },
          ]}
        />
      </QuestionCard>

      {/* Q11: Consommation fibres */}
      <QuestionCard number={11} title="Consommation quotidienne de fibres (légumes, fruits)">
        <RadioGroup
          name="consommationFibres"
          value={responses?.consommationFibres}
          onChange={(value) => updateResponses({ consommationFibres: value as any })}
          options={[
            { value: 'TRES_FAIBLE', label: 'Très faible (<10g/jour)', critical: true },
            { value: 'FAIBLE', label: 'Faible (10-20g/jour)' },
            { value: 'MOYENNE', label: 'Moyenne (20-30g/jour)' },
            { value: 'ELEVEE', label: 'Élevée (30-40g/jour)', good: true },
            { value: 'TRES_ELEVEE', label: 'Très élevée (40g+/jour)', good: true },
          ]}
        />
      </QuestionCard>

      {/* Q12: Probiotiques / prébiotiques */}
      <QuestionCard number={12} title="Consommation régulière probiotiques / aliments fermentés">
        <RadioGroup
          name="probiotiques"
          value={responses?.probiotiques}
          onChange={(value) => updateResponses({ probiotiques: value as any })}
          options={[
            { value: 'JAMAIS', label: 'Jamais' },
            { value: 'RARE', label: 'Rare (1x/mois)' },
            { value: 'PARFOIS', label: 'Parfois (1-2x/semaine)' },
            { value: 'REGULIER', label: 'Régulier (3-5x/semaine)', good: true },
            { value: 'QUOTIDIEN', label: 'Quotidien (kéfir, kimchi, suppléments)', good: true },
          ]}
        />
      </QuestionCard>
    </div>
  );
}
