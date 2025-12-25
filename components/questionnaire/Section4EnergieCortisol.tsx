'use client';

import { QuestionnaireResponses } from '@/types/questionnaire';
import QuestionCard from './QuestionCard';
import RadioGroup from './RadioGroup';

interface Props {
  responses: Partial<QuestionnaireResponses>;
  updateResponses: (updates: Partial<QuestionnaireResponses>) => void;
}

export default function Section4EnergieCortisol({ responses, updateResponses }: Props) {
  return (
    <div className="space-y-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-4">Section 4 : Énergie & Pattern Cortisol</h2>
        <p className="text-gray-400">
          Le cortisol dicte ton rythme énergétique quotidien. Un pattern inversé sabote ton métabolisme, ton sommeil, et ta capacité à brûler du gras.
        </p>
      </div>

      {/* Q1: Énergie au réveil */}
      <QuestionCard number={1} title="Énergie au réveil (avant caféine)">
        <RadioGroup
          name="energieReveil"
          value={responses.energieReveil}
          onChange={(value) => updateResponses({ energieReveil: value as any })}
          options={[
            { value: 'ZOMBIE', label: 'Zombie total (impossible de fonctionner)', critical: true, tooltip: 'Cortisol trop bas le matin' },
            { value: 'TRES_BAS', label: 'Très bas (besoin 30-60min pour émerger)', critical: true },
            { value: 'BAS', label: 'Bas (besoin caféine immédiate)' },
            { value: 'MOYEN', label: 'Moyen (fonctionnel mais pas optimal)' },
            { value: 'BON', label: 'Bon (alerte rapidement)', good: true },
            { value: 'EXCELLENT', label: 'Excellent (alerte immédiate, prêt à performer)', good: true },
          ]}
        />
      </QuestionCard>

      {/* Q2: Pic énergie journée */}
      <QuestionCard number={2} title="À quelle heure est ton pic d'énergie naturel ?">
        <RadioGroup
          name="picEnergie"
          value={responses.picEnergie}
          onChange={(value) => updateResponses({ picEnergie: value as any })}
          options={[
            { value: 'MATIN', label: 'Matin (6h-10h)', good: true, tooltip: 'Pattern cortisol normal' },
            { value: 'MILIEU_MATINEE', label: 'Milieu matinée (10h-12h)', good: true },
            { value: 'APRES_MIDI', label: 'Après-midi (14h-17h)', tooltip: 'Légèrement décalé' },
            { value: 'FIN_APRES_MIDI', label: 'Fin après-midi (17h-20h)', tooltip: 'Pattern décalé' },
            { value: 'SOIREE', label: 'Soirée (20h-23h)', critical: true, tooltip: 'Cortisol inversé 🚨' },
            { value: 'NUIT', label: 'Nuit (23h-2h)', critical: true, tooltip: 'Pattern nocturne pathologique' },
            { value: 'AUCUN_PIC', label: 'Aucun pic, énergie plate toute la journée', critical: true },
          ]}
        />
      </QuestionCard>

      {/* Q3: Crash après-midi */}
      <QuestionCard number={3} title="Crash énergétique 14h-16h ?">
        <RadioGroup
          name="crashApresMidi"
          value={responses.crashApresMidi}
          onChange={(value) => updateResponses({ crashApresMidi: value as any })}
          options={[
            { value: 'JAMAIS', label: 'Jamais, énergie stable', good: true },
            { value: 'RARE', label: 'Rarement (1-2x/semaine)', good: true },
            { value: 'PARFOIS', label: 'Parfois (3-4x/semaine)' },
            { value: 'SOUVENT', label: 'Souvent (5-6x/semaine)', tooltip: 'Problème glycémie ou cortisol' },
            { value: 'SYSTEMATIQUE', label: 'Systématique tous les jours', critical: true, tooltip: 'Insulino-résistance probable' },
            { value: 'BESOIN_SIESTE', label: 'Besoin sieste obligatoire', critical: true },
          ]}
        />
      </QuestionCard>

      {/* Q4: Deuxième souffle nocturne */}
      <QuestionCard number={4} title="Deuxième souffle en soirée (regain énergie 21h-minuit) ?">
        <RadioGroup
          name="deuxiemeSouffleNocturne"
          value={responses.deuxiemeSouffleNocturne}
          onChange={(value) => updateResponses({ deuxiemeSouffleNocturne: value as any })}
          options={[
            { value: 'JAMAIS', label: 'Jamais, fatigue naturelle le soir', good: true, tooltip: 'Cortisol normal' },
            { value: 'RARE', label: 'Rarement (1-2x/mois)', good: true },
            { value: 'PARFOIS', label: 'Parfois (1-2x/semaine)' },
            { value: 'SOUVENT', label: 'Souvent (3-5x/semaine)', critical: true, tooltip: 'Cortisol inversé' },
            { value: 'OUI_SYSTEMATIQUE', label: 'OUI systématique tous les soirs', critical: true, tooltip: '🚨 Pattern nocturne pathologique' },
          ]}
        />
      </QuestionCard>

      {/* Q5: Difficulté s'endormir */}
      <QuestionCard number={5} title="Difficulté à t'endormir ?">
        <RadioGroup
          name="difficulteEndormissement"
          value={responses.difficulteEndormissement}
          onChange={(value) => updateResponses({ difficulteEndormissement: value as any })}
          options={[
            { value: 'JAMAIS', label: 'Jamais, endormi en <15min', good: true },
            { value: 'RARE', label: 'Rarement (1-2x/semaine)', good: true },
            { value: 'PARFOIS', label: 'Parfois (3-4x/semaine)' },
            { value: 'SOUVENT', label: 'Souvent (5-6x/semaine)', critical: true },
            { value: 'SYSTEMATIQUE', label: 'Systématique tous les soirs', critical: true, tooltip: 'Cortisol élevé la nuit' },
            { value: 'INSOMNIE_SEVERE', label: 'Insomnie sévère (>1h pour s\'endormir)', critical: true },
          ]}
        />
      </QuestionCard>

      {/* Q6: Heure endormissement */}
      <QuestionCard number={6} title="À quelle heure t'endors-tu naturellement ?">
        <RadioGroup
          name="heureEndormissement"
          value={responses.heureEndormissement}
          onChange={(value) => updateResponses({ heureEndormissement: value as any })}
          options={[
            { value: '21H-22H', label: '21h-22h (très tôt)', good: true },
            { value: '22H-23H', label: '22h-23h (optimal)', good: true },
            { value: '23H-MINUIT', label: '23h-minuit (normal)' },
            { value: 'MINUIT-1H', label: 'Minuit-1h (légèrement tardif)' },
            { value: '1H-2H', label: '1h-2h (tardif)', critical: true },
            { value: '2H+', label: '2h du matin ou plus tard', critical: true, tooltip: 'Pattern nocturne pathologique' },
          ]}
        />
      </QuestionCard>

      {/* Q7: Réveils nocturnes */}
      <QuestionCard number={7} title="Réveils nocturnes fréquents ?">
        <RadioGroup
          name="reveilsNocturnes"
          value={responses.reveilsNocturnes}
          onChange={(value) => updateResponses({ reveilsNocturnes: value as any })}
          options={[
            { value: 'JAMAIS', label: 'Jamais, sommeil continu', good: true },
            { value: 'RARE', label: '1-2x/mois', good: true },
            { value: 'PARFOIS', label: '1-2x/semaine' },
            { value: 'SOUVENT', label: '3-5x/semaine', critical: true },
            { value: 'TOUTES_LES_NUITS', label: 'Toutes les nuits', critical: true, tooltip: 'Cortisol ou glycémie nocturne' },
          ]}
        />
      </QuestionCard>

      {/* Q8: Heure réveil spontané */}
      <QuestionCard number={8} title="Si pas de réveil, à quelle heure te réveilles-tu naturellement ?">
        <RadioGroup
          name="heureReveilSpontane"
          value={responses.heureReveilSpontane}
          onChange={(value) => updateResponses({ heureReveilSpontane: value as any })}
          options={[
            { value: 'AVANT_6H', label: 'Avant 6h (très tôt)', tooltip: 'Peut indiquer cortisol élevé tôt' },
            { value: '6H-7H', label: '6h-7h (optimal)', good: true },
            { value: '7H-8H', label: '7h-8h (normal)', good: true },
            { value: '8H-9H', label: '8h-9h' },
            { value: '9H-10H', label: '9h-10h (tardif)' },
            { value: '10H+', label: '10h ou plus tard', critical: true, tooltip: 'Cortisol bas le matin' },
          ]}
        />
      </QuestionCard>

      {/* Q9: Stress chronique perçu */}
      <QuestionCard number={9} title="Niveau de stress chronique perçu (1-10)">
        <input
          type="range"
          min="1"
          max="10"
          value={responses.stressChronique || 5}
          onChange={(e) => updateResponses({ stressChronique: parseInt(e.target.value) })}
          className="w-full accent-cyan-500"
        />
        <div className="flex justify-between text-sm text-gray-400 mt-2">
          <span>1 (zen total)</span>
          <span className="text-white font-bold">{responses.stressChronique || 5}</span>
          <span>10 (burnout)</span>
        </div>
      </QuestionCard>

      {/* Q10: Résistance au stress */}
      <QuestionCard number={10} title="Résistance au stress / résilience">
        <RadioGroup
          name="resistanceStress"
          value={responses.resistanceStress}
          onChange={(value) => updateResponses({ resistanceStress: value as any })}
          options={[
            { value: 'TRES_BASSE', label: 'Très basse (stressé par tout)', critical: true, tooltip: 'Adrenals fatigués' },
            { value: 'BASSE', label: 'Basse (facilement overwhelmed)' },
            { value: 'MOYENNE', label: 'Moyenne (dépend du contexte)' },
            { value: 'BONNE', label: 'Bonne (gère bien la plupart des situations)', good: true },
            { value: 'EXCELLENTE', label: 'Excellente (calme sous pression)', good: true },
          ]}
        />
      </QuestionCard>

      {/* Q11: Irritabilité si repas sauté */}
      <QuestionCard number={11} title="Irritabilité / anger si tu sautes un repas ?">
        <RadioGroup
          name="irritabiliteSiRepasManque"
          value={responses.irritabiliteSiRepasManque}
          onChange={(value) => updateResponses({ irritabiliteSiRepasManque: value as any })}
          options={[
            { value: 'JAMAIS', label: 'Jamais, mood stable', good: true, tooltip: 'Métabolisme flexible' },
            { value: 'RARE', label: 'Rarement', good: true },
            { value: 'PARFOIS', label: 'Parfois' },
            { value: 'SOUVENT', label: 'Souvent (devient "hangry")', critical: true, tooltip: 'Hypoglycémie réactionnelle' },
            { value: 'SYSTEMATIQUE', label: 'Systématique (rage mode)', critical: true, tooltip: '🚨 Glucose-dépendant + cortisol dysrégulé' },
          ]}
        />
      </QuestionCard>

      {/* Q12: Besoin stimulants */}
      <QuestionCard number={12} title="Besoin de stimulants pour fonctionner ?">
        <RadioGroup
          name="besoinStimulants"
          value={responses.besoinStimulants}
          onChange={(value) => updateResponses({ besoinStimulants: value as any })}
          options={[
            { value: 'AUCUN', label: 'Aucun, énergie naturelle', good: true },
            { value: 'CAFE_MATIN', label: 'Café matin uniquement (plaisir, pas besoin)', good: true },
            { value: 'CAFE_MULTIPLE', label: 'Plusieurs cafés par jour' },
            { value: 'CAFE_PREWORKOUT', label: 'Café + pré-workout systématique', tooltip: 'Dépendance stimulants' },
            { value: 'DEPENDANCE_TOTALE', label: 'Dépendance totale multi-stimulants', critical: true, tooltip: '🚨 Adrenal fatigue' },
          ]}
        />
      </QuestionCard>
    </div>
  );
}
