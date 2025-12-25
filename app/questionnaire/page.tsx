'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QuestionnaireResponses } from '@/types/questionnaire';
import Section1Profil from '@/components/questionnaire/Section1Profil';
import Section2Photos from '@/components/questionnaire/Section2Photos';
import Section3FlexibiliteMetabolique from '@/components/questionnaire/Section3FlexibiliteMetabolique';
import Section4EnergieCortisol from '@/components/questionnaire/Section4EnergieCortisol';
import Section5Neurotransmetteurs from '@/components/questionnaire/Section5Neurotransmetteurs';
import Section6Hormones from '@/components/questionnaire/Section6Hormones';
import Section7Digestion from '@/components/questionnaire/Section7Digestion';
import Section8Inflammation from '@/components/questionnaire/Section8Inflammation';
import Section9Sommeil from '@/components/questionnaire/Section9Sommeil';
import Section10Training from '@/components/questionnaire/Section10Training';

const TOTAL_SECTIONS = 10;

export default function QuestionnairePage() {
  const [currentSection, setCurrentSection] = useState(1);
  const [responses, setResponses] = useState<Partial<QuestionnaireResponses>>({});
  const [photos, setPhotos] = useState<{
    face?: File;
    back?: File;
    side?: File;
  }>({});

  const updateResponses = (newData: Partial<QuestionnaireResponses>) => {
    setResponses(prev => ({ ...prev, ...newData }));
  };

  const handleNext = () => {
    if (currentSection < TOTAL_SECTIONS) {
      setCurrentSection(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    if (currentSection > 1) {
      setCurrentSection(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async () => {
    try {
      // Upload photos
      const formData = new FormData();
      if (photos.face) formData.append('photoFace', photos.face);
      if (photos.back) formData.append('photoBack', photos.back);
      if (photos.side) formData.append('photoSide', photos.side);
      formData.append('responses', JSON.stringify(responses));

      const res = await fetch('/api/questionnaire/submit', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        // Redirect vers page de paiement ou génération gratuite
        window.location.href = `/checkout?auditId=${data.auditId}`;
      }
    } catch (error) {
      console.error('Erreur submission:', error);
      alert('Erreur lors de la soumission. Réessayez.');
    }
  };

  const progress = (currentSection / TOTAL_SECTIONS) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-sm">
        <div className="h-2 bg-gray-800">
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-500 to-purple-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              🔥 SCAN MÉTABOLIQUE COMPLET
            </h1>
            <span className="text-sm text-gray-400">
              Section {currentSection} / {TOTAL_SECTIONS} • {Math.round(progress)}%
            </span>
          </div>
        </div>
      </div>

      {/* Questionnaire Content */}
      <div className="container mx-auto px-4 pt-32 pb-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSection}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {currentSection === 1 && (
              <Section1Profil
                responses={responses}
                updateResponses={updateResponses}
              />
            )}
            {currentSection === 2 && (
              <Section2Photos
                responses={responses}
                updateResponses={updateResponses}
                photos={photos}
                setPhotos={setPhotos}
              />
            )}
            {currentSection === 3 && (
              <Section3FlexibiliteMetabolique
                responses={responses}
                updateResponses={updateResponses}
              />
            )}
            {currentSection === 4 && (
              <Section4EnergieCortisol
                responses={responses}
                updateResponses={updateResponses}
              />
            )}
            {currentSection === 5 && (
              <Section5Neurotransmetteurs
                responses={responses}
                updateResponses={updateResponses}
              />
            )}
            {currentSection === 6 && (
              <Section6Hormones
                responses={responses}
                updateResponses={updateResponses}
              />
            )}
            {currentSection === 7 && (
              <Section7Digestion
                responses={responses}
                updateResponses={updateResponses}
              />
            )}
            {currentSection === 8 && (
              <Section8Inflammation
                responses={responses}
                updateResponses={updateResponses}
              />
            )}
            {currentSection === 9 && (
              <Section9Sommeil
                responses={responses}
                updateResponses={updateResponses}
              />
            )}
            {currentSection === 10 && (
              <Section10Training
                responses={responses}
                updateResponses={updateResponses}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-12">
          <button
            onClick={handlePrevious}
            disabled={currentSection === 1}
            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
          >
            ← Précédent
          </button>

          {currentSection < TOTAL_SECTIONS ? (
            <button
              onClick={handleNext}
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 rounded-lg font-semibold transition-all"
            >
              Suivant →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-8 py-4 bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-400 hover:to-cyan-400 rounded-lg font-bold text-lg transition-all shadow-lg hover:shadow-xl"
            >
              🚀 Générer Mon Scan Métabolique
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
