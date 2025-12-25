'use client';

import { QuestionnaireResponses } from '@/types/questionnaire';
import { useState } from 'react';
import QuestionCard from './QuestionCard';
import RadioGroup from './RadioGroup';

interface Props {
  responses: Partial<QuestionnaireResponses>;
  updateResponses: (updates: Partial<QuestionnaireResponses>) => void;
  photos: { face?: File; back?: File; side?: File };
  setPhotos: (photos: { face?: File; back?: File; side?: File }) => void;
}

export default function Section2Photos({ responses, updateResponses, photos, setPhotos }: Props) {
  const [previewFace, setPreviewFace] = useState<string | null>(null);
  const [previewBack, setPreviewBack] = useState<string | null>(null);
  const [previewSide, setPreviewSide] = useState<string | null>(null);

  const handlePhotoUpload = (type: 'face' | 'back' | 'side', file: File | null) => {
    if (!file) return;

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      if (type === 'face') setPreviewFace(result);
      if (type === 'back') setPreviewBack(result);
      if (type === 'side') setPreviewSide(result);
    };
    reader.readAsDataURL(file);

    // Update photos
    setPhotos({ ...photos, [type]: file });
  };

  return (
    <div className="space-y-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-4">Section 2 : Photos + Morphologie</h2>
        <p className="text-gray-400">
          Upload 3 photos (face, dos, profil) pour analyse morphologique AI. Ces photos permettent d'analyser ton morphotype, estimer ton bodyfat, détecter des déséquilibres posturaux et musculaires.
        </p>
        <p className="text-sm text-yellow-500 mt-2">
          ⚠️ Photos optionnelles mais fortement recommandées pour analyse complète
        </p>
      </div>

      {/* PHOTO 1: Face */}
      <QuestionCard number={1} title="Photo de face (torse nu, lumière naturelle)">
        <div className="space-y-4">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handlePhotoUpload('face', e.target.files?.[0] || null)}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
          />
          {previewFace && (
            <div className="relative w-full max-w-md mx-auto">
              <img src={previewFace} alt="Preview face" className="rounded-lg border border-cyan-500" />
            </div>
          )}
        </div>
      </QuestionCard>

      {/* PHOTO 2: Dos */}
      <QuestionCard number={2} title="Photo de dos (torse nu, lumière naturelle)">
        <div className="space-y-4">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handlePhotoUpload('back', e.target.files?.[0] || null)}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
          />
          {previewBack && (
            <div className="relative w-full max-w-md mx-auto">
              <img src={previewBack} alt="Preview back" className="rounded-lg border border-cyan-500" />
            </div>
          )}
        </div>
      </QuestionCard>

      {/* PHOTO 3: Profil */}
      <QuestionCard number={3} title="Photo de profil (torse nu, lumière naturelle)">
        <div className="space-y-4">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handlePhotoUpload('side', e.target.files?.[0] || null)}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
          />
          {previewSide && (
            <div className="relative w-full max-w-md mx-auto">
              <img src={previewSide} alt="Preview side" className="rounded-lg border border-cyan-500" />
            </div>
          )}
        </div>
      </QuestionCard>

      {/* Q4: Morphotype perçu */}
      <QuestionCard number={4} title="Comment décrirais-tu ton morphotype actuel ?">
        <RadioGroup
          name="morphotypePercu"
          value={responses.morphotypePercu}
          onChange={(value) => updateResponses({ morphotypePercu: value as any })}
          options={[
            {
              value: 'ECTOMORPHE',
              label: 'Ectomorphe',
              tooltip: 'Difficile de prendre du poids (muscle ou gras), structure fine, métabolisme rapide',
            },
            {
              value: 'MESOMORPHE',
              label: 'Mésomorphe',
              tooltip: 'Prend facilement du muscle, structure athlétique naturelle, bon ratio muscle/gras',
            },
            {
              value: 'ENDOMORPHE',
              label: 'Endomorphe',
              tooltip: 'Prend facilement du poids (gras surtout), difficulté à sécher, métabolisme lent',
            },
            {
              value: 'ECTO_MESO',
              label: 'Ecto-Mésomorphe',
              tooltip: 'Mix ectomorphe dominant avec capacité musculaire mésomorphe',
            },
            {
              value: 'MESO_ENDO',
              label: 'Méso-Endomorphe',
              tooltip: 'Mix mésomorphe avec tendance à stocker du gras comme endomorphe',
            },
          ]}
        />
      </QuestionCard>

      {/* Q5: Bodyfat estimé */}
      <QuestionCard number={5} title="Bodyfat estimé actuellement (%) - approximatif">
        <RadioGroup
          name="bodyfatEstime"
          value={responses.bodyfatEstime}
          onChange={(value) => updateResponses({ bodyfatEstime: value as any })}
          options={[
            { value: '5-8%', label: '5-8% (vascularisation extrême, abdos hyper définis)', good: true },
            { value: '8-12%', label: '8-12% (abdos très visibles, vascularisation claire)', good: true },
            { value: '12-15%', label: '12-15% (abdos visibles, léger gras bas du ventre)' },
            { value: '15-18%', label: '15-18% (abdos visibles haut, gras modéré)' },
            { value: '18-22%', label: '18-22% (silhouette définie mais pas de détails abdos)' },
            { value: '22-28%', label: '22-28% (gras abdominal visible, silhouette enrobée)' },
            { value: '28%+', label: '28%+ (gras significatif, obésité)' },
          ]}
        />
      </QuestionCard>

      {/* Q6: Distribution gras */}
      <QuestionCard number={6} title="Où stockes-tu le plus de gras ?">
        <RadioGroup
          name="distributionGras"
          value={responses.distributionGras}
          onChange={(value) => updateResponses({ distributionGras: value as any })}
          options={[
            { value: 'ABDOMEN_VISCERAL', label: 'Abdomen viscéral (ventre dur, gonflé)', critical: true, tooltip: 'Signe d\'insulino-résistance / cortisol élevé' },
            { value: 'ABDOMEN_SOUS_CUTANE', label: 'Abdomen sous-cutané (poignées d\'amour)', tooltip: 'Gras sous la peau, plus facile à perdre' },
            { value: 'HANCHES_CUISSES', label: 'Hanches & cuisses (pattern féminin)', tooltip: 'Pattern oestrogénique' },
            { value: 'DOS_EPAULES', label: 'Dos & épaules (back fat)', tooltip: 'Peut indiquer problème thyroïdien' },
            { value: 'UNIFORME', label: 'Distribution uniforme', good: true },
            { value: 'TRES_SEC', label: 'Très sec partout', good: true },
          ]}
        />
      </QuestionCard>

      {/* Q7: Rétention d'eau */}
      <QuestionCard number={7} title="Rétention d'eau visible ?">
        <RadioGroup
          name="retentionEau"
          value={responses.retentionEau}
          onChange={(value) => updateResponses({ retentionEau: value as any })}
          options={[
            { value: 'AUCUNE', label: 'Aucune, peau fine', good: true },
            { value: 'LEGERE', label: 'Légère (chevilles gonflées fin de journée)' },
            { value: 'MODEREE', label: 'Modérée (visage gonflé matin + chevilles)', tooltip: 'Peut indiquer problème cortisol / sodium' },
            { value: 'SEVERE', label: 'Sévère (gonflement généralisé constant)', critical: true, tooltip: 'Check médical recommandé' },
          ]}
        />
      </QuestionCard>
    </div>
  );
}
