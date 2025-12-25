'use client';

import { QuestionnaireResponses } from '@/types/questionnaire';
import QuestionCard from './QuestionCard';
import RadioGroup from './RadioGroup';

interface Props {
  responses: Partial<QuestionnaireResponses>;
  updateResponses: (updates: Partial<QuestionnaireResponses>) => void;
}

export default function Section6Hormones({ responses, updateResponses }: Props) {
  return (
    <div className="space-y-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-4">Section 6 : Hormones</h2>
        <p className="text-gray-400">
          Testostérone, œstrogènes, thyroïde, insuline. Ces hormones contrôlent ta composition corporelle, ton énergie, et ta capacité à progresser.
        </p>
      </div>

      {/* Q1: Facilité prise muscle */}
      <QuestionCard number={1} title="Facilité à prendre du muscle (progression hypertrophie)">
        <RadioGroup
          name="facilitePriseMuscle"
          value={responses.facilitePriseMuscle}
          onChange={(value) => updateResponses({ facilitePriseMuscle: value as any })}
          options={[
            { value: 'IMPOSSIBLE', label: 'Impossible / stagnation totale', critical: true, tooltip: 'Testostérone ou hormones anaboliques basses' },
            { value: 'TRES_DIFFICILE', label: 'Très difficile (gains minimes)' },
            { value: 'DIFFICILE', label: 'Difficile (lent)' },
            { value: 'MOYENNE', label: 'Moyenne (progression normale)' },
            { value: 'FACILE', label: 'Facile (bon répondeur)', good: true },
            { value: 'TRES_FACILE', label: 'Très facile (gains rapides)', good: true, tooltip: 'Excellent profil hormonal anabolique' },
          ]}
        />
      </QuestionCard>

      {/* Q2: Facilité perte gras */}
      <QuestionCard number={2} title="Facilité à perdre du gras (en déficit calorique)">
        <RadioGroup
          name="facilitePerteGras"
          value={responses.facilitePerteGras}
          onChange={(value) => updateResponses({ facilitePerteGras: value as any })}
          options={[
            { value: 'IMPOSSIBLE', label: 'Impossible même en déficit sévère', critical: true, tooltip: 'Métabolisme endommagé / thyroïde' },
            { value: 'TRES_DIFFICILE', label: 'Très difficile (perte minime)', critical: true },
            { value: 'DIFFICILE', label: 'Difficile (plateau rapide)' },
            { value: 'MOYENNE', label: 'Moyenne (progression régulière)' },
            { value: 'FACILE', label: 'Facile (répond bien)', good: true },
            { value: 'TRES_FACILE', label: 'Très facile (sèche rapide)', good: true },
          ]}
        />
      </QuestionCard>

      {/* Q3: Rétention muscle en cut */}
      <QuestionCard number={3} title="Rétention musculaire en déficit calorique">
        <RadioGroup
          name="retentionMuscleCut"
          value={responses.retentionMuscleCut}
          onChange={(value) => updateResponses({ retentionMuscleCut: value as any })}
          options={[
            { value: 'PERTE_MASSIVE', label: 'Perte massive (muscle fond)', critical: true, tooltip: 'Testostérone basse ou cortisol élevé' },
            { value: 'PERTE_IMPORTANTE', label: 'Perte importante', critical: true },
            { value: 'PERTE_MODEREE', label: 'Perte modérée' },
            { value: 'BONNE', label: 'Bonne rétention', good: true },
            { value: 'EXCELLENTE', label: 'Excellente (garde tout)', good: true, tooltip: 'Profil hormonal optimal' },
          ]}
        />
      </QuestionCard>

      {/* Q4: Gynécomastie homme / rétention eau seins femme */}
      <QuestionCard number={4} title={responses.sexe === 'HOMME' ? 'Gynécomastie (développement tissu mammaire homme)' : 'Rétention d\'eau / gonflement seins'}>
        <RadioGroup
          name="gynecomastieMasculine"
          value={responses.gynecomastieMasculine}
          onChange={(value) => updateResponses({ gynecomastieMasculine: value as any })}
          options={[
            { value: 'AUCUNE', label: 'Aucune', good: true },
            { value: 'LEGERE', label: 'Légère (sous mamelon)' },
            { value: 'MODEREE', label: 'Modérée (visible)', critical: true, tooltip: 'Œstrogènes élevés ou ratio T/E déséquilibré' },
            { value: 'SEVERE', label: 'Sévère (prononcée)', critical: true },
          ]}
        />
      </QuestionCard>

      {/* Q5: Qualité érections HOMME / libido cycles FEMME */}
      <QuestionCard
        number={5}
        title={responses.sexe === 'HOMME' ? 'Qualité érections matinales' : 'Libido selon cycle menstruel'}
      >
        {responses.sexe === 'HOMME' ? (
          <RadioGroup
            name="qualiteErectionsMatin"
            value={responses.qualiteErectionsMatin}
            onChange={(value) => updateResponses({ qualiteErectionsMatin: value as any })}
            options={[
              { value: 'AUCUNE', label: 'Aucune depuis longtemps', critical: true, tooltip: '🚨 Testostérone très basse' },
              { value: 'RARE', label: 'Rares (1-2x/semaine)', critical: true },
              { value: 'PARFOIS', label: 'Parfois (3-4x/semaine)' },
              { value: 'FREQUENTES', label: 'Fréquentes (5-6x/semaine)', good: true },
              { value: 'QUOTIDIENNES', label: 'Quotidiennes (tous les matins)', good: true, tooltip: 'Testostérone saine' },
            ]}
          />
        ) : (
          <RadioGroup
            name="libidoCycleFeminin"
            value={responses.libidoCycleFeminin}
            onChange={(value) => updateResponses({ libidoCycleFeminin: value as any })}
            options={[
              { value: 'INEXISTANTE', label: 'Inexistante tout le cycle', critical: true },
              { value: 'PLATE', label: 'Plate (pas de variations)' },
              { value: 'PIC_OVULATION', label: 'Pic à l\'ovulation (normal)', good: true },
              { value: 'PIC_REGLES', label: 'Pic pendant règles (inhabituel)', tooltip: 'Peut indiquer dominance œstrogènes' },
            ]}
          />
        )}
      </QuestionCard>

      {/* Q6: Pilosité faciale HOMME / acné hormonale FEMME */}
      <QuestionCard
        number={6}
        title={responses.sexe === 'HOMME' ? 'Croissance pilosité faciale (barbe)' : 'Acné hormonale (mâchoire, cou)'}
      >
        {responses.sexe === 'HOMME' ? (
          <RadioGroup
            name="croissancePilosite"
            value={responses.croissancePilosite}
            onChange={(value) => updateResponses({ croissancePilosite: value as any })}
            options={[
              { value: 'INEXISTANTE', label: 'Inexistante / très faible', tooltip: 'Testostérone ou DHT bas' },
              { value: 'FAIBLE', label: 'Faible (pousse lente)' },
              { value: 'MOYENNE', label: 'Moyenne (normale)', good: true },
              { value: 'RAPIDE', label: 'Rapide (rase souvent)', good: true },
              { value: 'TRES_RAPIDE', label: 'Très rapide (2x/jour)', good: true, tooltip: 'DHT élevé' },
            ]}
          />
        ) : (
          <RadioGroup
            name="acneHormonale"
            value={responses.acneHormonale}
            onChange={(value) => updateResponses({ acneHormonale: value as any })}
            options={[
              { value: 'AUCUNE', label: 'Aucune', good: true },
              { value: 'LEGERE', label: 'Légère (quelques boutons)' },
              { value: 'MODEREE', label: 'Modérée (régulière)', critical: true, tooltip: 'Dominance androgènes ou œstrogènes' },
              { value: 'SEVERE', label: 'Sévère (kystique)', critical: true },
            ]}
          />
        )}
      </QuestionCard>

      {/* Q7: Testostérone dernière analyse sanguine */}
      <QuestionCard number={7} title="Testostérone TOTALE (dernière prise de sang)">
        <RadioGroup
          name="testosteroneDerniereAnalyse"
          value={responses.testosteroneDerniereAnalyse}
          onChange={(value) => updateResponses({ testosteroneDerniereAnalyse: value as any })}
          options={[
            { value: 'JAMAIS_TESTE', label: 'Jamais testé' },
            { value: '<300', label: '<300 ng/dL (hypogonadisme)', critical: true },
            { value: '300-500', label: '300-500 ng/dL (bas)', critical: true },
            { value: '500-700', label: '500-700 ng/dL (moyen)' },
            { value: '700-900', label: '700-900 ng/dL (bon)', good: true },
            { value: '900+', label: '900+ ng/dL (optimal)', good: true },
          ]}
        />
      </QuestionCard>

      {/* Q8: Sensibilité froid / mains pieds froids */}
      <QuestionCard number={8} title="Sensibilité au froid (mains/pieds glacés)">
        <RadioGroup
          name="sensibiliteFroid"
          value={responses.sensibiliteFroid}
          onChange={(value) => updateResponses({ sensibiliteFroid: value as any })}
          options={[
            { value: 'JAMAIS', label: 'Jamais, toujours chaud', good: true },
            { value: 'RARE', label: 'Rarement (hiver extrême)', good: true },
            { value: 'PARFOIS', label: 'Parfois (hiver normal)' },
            { value: 'SOUVENT', label: 'Souvent (même en été)', critical: true, tooltip: 'Thyroïde basse probable' },
            { value: 'CONSTANT', label: 'Constant (mains/pieds glacés 24/7)', critical: true, tooltip: '🚨 Hypothyroïdie' },
          ]}
        />
      </QuestionCard>

      {/* Q9: Température corporelle matin */}
      <QuestionCard number={9} title="Température corporelle au réveil (si mesurée)">
        <RadioGroup
          name="temperatureCorporelleMatin"
          value={responses.temperatureCorporelleMatin}
          onChange={(value) => updateResponses({ temperatureCorporelleMatin: value as any })}
          options={[
            { value: 'JAMAIS_MESURE', label: 'Jamais mesuré' },
            { value: '<36.0', label: '<36.0°C (hypothermie)', critical: true, tooltip: 'Thyroïde très basse' },
            { value: '36.0-36.3', label: '36.0-36.3°C (bas)', critical: true },
            { value: '36.4-36.6', label: '36.4-36.6°C (limite)', tooltip: 'Thyroïde possiblement basse' },
            { value: '36.7-37.0', label: '36.7-37.0°C (optimal)', good: true },
            { value: '>37.0', label: '>37.0°C (élevé)' },
          ]}
        />
      </QuestionCard>

      {/* Q10: Chute cheveux */}
      <QuestionCard number={10} title="Chute de cheveux / calvitie">
        <RadioGroup
          name="chuteCheveux"
          value={responses.chuteCheveux}
          onChange={(value) => updateResponses({ chuteCheveux: value as any })}
          options={[
            { value: 'AUCUNE', label: 'Aucune', good: true },
            { value: 'LEGERE', label: 'Légère (quelques cheveux)' },
            { value: 'MODEREE', label: 'Modérée (visible)', tooltip: 'DHT élevé ou thyroïde' },
            { value: 'SEVERE', label: 'Sévère (rapide)', critical: true, tooltip: 'Check hormones thyroïde + DHT' },
          ]}
        />
      </QuestionCard>

      {/* Q11: Peau sèche */}
      <QuestionCard number={11} title="Peau sèche / épaisse (surtout coudes, genoux)">
        <RadioGroup
          name="peauSeche"
          value={responses.peauSeche}
          onChange={(value) => updateResponses({ peauSeche: value as any })}
          options={[
            { value: 'JAMAIS', label: 'Jamais, peau normale', good: true },
            { value: 'LEGERE', label: 'Légère sécheresse hivernale' },
            { value: 'MODEREE', label: 'Modérée (crème régulière)', tooltip: 'Thyroïde possiblement basse' },
            { value: 'SEVERE', label: 'Sévère (peau épaisse, craquelée)', critical: true, tooltip: 'Hypothyroïdie probable' },
          ]}
        />
      </QuestionCard>

      {/* Q12: Constipation */}
      <QuestionCard number={12} title="Fréquence constipation">
        <RadioGroup
          name="constipation"
          value={responses.constipation}
          onChange={(value) => updateResponses({ constipation: value as any })}
          options={[
            { value: 'JAMAIS', label: 'Jamais (transit régulier)', good: true },
            { value: 'RARE', label: 'Rare (1x/mois)' },
            { value: 'PARFOIS', label: 'Parfois (1x/semaine)' },
            { value: 'SOUVENT', label: 'Souvent (plusieurs x/semaine)', critical: true, tooltip: 'Thyroïde ou digestion' },
            { value: 'CHRONIQUE', label: 'Chronique (tous les jours)', critical: true, tooltip: '🚨 Check thyroïde' },
          ]}
        />
      </QuestionCard>

      {/* Q13: Prise poids facile */}
      <QuestionCard number={13} title="Facilité à prendre du poids (gras) en surplus léger">
        <RadioGroup
          name="prisePoidsGrasFacile"
          value={responses.prisePoidsGrasFacile}
          onChange={(value) => updateResponses({ prisePoidsGrasFacile: value as any })}
          options={[
            { value: 'IMPOSSIBLE', label: 'Impossible (ectomorphe extrême)', tooltip: 'Métabolisme très rapide' },
            { value: 'TRES_DIFFICILE', label: 'Très difficile' },
            { value: 'DIFFICILE', label: 'Difficile' },
            { value: 'MOYENNE', label: 'Moyenne (normal)', good: true },
            { value: 'FACILE', label: 'Facile (prend vite)', tooltip: 'Métabolisme lent ou insulino-résistance' },
            { value: 'TRES_FACILE', label: 'Très facile (gras immédiat)', critical: true, tooltip: 'Métabolisme endommagé / insulino-résistance sévère' },
          ]}
        />
      </QuestionCard>

      {/* Q14: Sensation de chaleur après repas */}
      <QuestionCard number={14} title="Sensation de chaleur après repas (thermogenèse)">
        <RadioGroup
          name="chaleurApresRepas"
          value={responses.chaleurApresRepas}
          onChange={(value) => updateResponses({ chaleurApresRepas: value as any })}
          options={[
            { value: 'JAMAIS', label: 'Jamais (froid après repas)', critical: true, tooltip: 'Métabolisme très lent' },
            { value: 'RARE', label: 'Rare' },
            { value: 'PARFOIS', label: 'Parfois' },
            { value: 'SOUVENT', label: 'Souvent (repas gros)', good: true },
            { value: 'SYSTEMATIQUE', label: 'Systématique (chaleur après chaque repas)', good: true, tooltip: 'Métabolisme rapide, thyroïde saine' },
          ]}
        />
      </QuestionCard>

      {/* Q15: Cycles menstruels FEMME */}
      {responses.sexe === 'FEMME' && (
        <QuestionCard number={15} title="Régularité cycles menstruels">
          <RadioGroup
            name="regulariteCycles"
            value={responses.regulariteCycles}
            onChange={(value) => updateResponses({ regulariteCycles: value as any })}
            options={[
              { value: 'REGULIERS', label: 'Réguliers (25-32 jours)', good: true },
              { value: 'LEGEREMENT_IRREGULIERS', label: 'Légèrement irréguliers (23-35 jours)' },
              { value: 'IRREGULIERS', label: 'Irréguliers (variations importantes)', critical: true, tooltip: 'Déséquilibre hormonal' },
              { value: 'AMENORRHEE', label: 'Aménorrhée (absence cycles)', critical: true, tooltip: '🚨 Check hormones' },
              { value: 'MENOPAUSE', label: 'Ménopause / périménopause' },
            ]}
          />
        </QuestionCard>
      )}
    </div>
  );
}
