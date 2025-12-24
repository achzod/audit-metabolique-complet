'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function LandingPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated particles background */}
      {mounted && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                width: Math.random() * 100 + 50 + 'px',
                height: Math.random() * 100 + 50 + 'px',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                animationDelay: Math.random() * 6 + 's',
                animationDuration: Math.random() * 10 + 10 + 's',
              }}
            />
          ))}
        </div>
      )}

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold gradient-text mb-6">
              🔥 Audit Métabolique Complet
            </h1>
            <p className="text-xl md:text-2xl text-light/80 mb-4">
              Découvre ton profil métabolique unique en{' '}
              <span className="text-cyan-400 font-semibold">85 questions</span>
            </p>
            <p className="text-lg md:text-xl text-light/60 mb-12 max-w-3xl mx-auto">
              Analyse scientifique par IA + Plan personnalisé d'optimisation hormonale,
              nutritionnelle et énergétique
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                href="/audit-complet/questionnaire"
                className="btn-primary text-lg px-8 py-4 inline-block"
              >
                🎯 Commencer l'Audit Gratuit
              </Link>
              <a
                href="#what-you-get"
                className="btn-secondary text-lg px-8 py-4 inline-block"
              >
                📊 Voir ce que tu recevras
              </a>
            </div>

            <p className="text-light/50 mt-6 text-sm">
              ✅ Version gratuite (4 sections) • 💎 Version premium (15 sections, 79€)
            </p>
          </motion.div>
        </div>
      </section>

      {/* What You Get Section */}
      <section id="what-you-get" className="relative z-10 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-center gradient-text mb-16">
              Ce que tu vas recevoir
            </h2>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {/* Free Version */}
              <div className="glass gradient-border rounded-2xl p-8">
                <div className="text-center mb-6">
                  <h3 className="text-3xl font-bold text-cyan-400 mb-2">
                    🎁 Gratuit
                  </h3>
                  <p className="text-light/60">Parfait pour commencer</p>
                </div>

                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 text-xl">✅</span>
                    <span>Résumé Exécutif avec métriques clés</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 text-xl">✅</span>
                    <span>Analyse Profil Anthropométrique</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 text-xl">✅</span>
                    <span>Diagnostic Métabolisme & Énergie</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 text-xl">✅</span>
                    <span>Plan d'Action Rapide (30 jours)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-400 text-xl">🔒</span>
                    <span className="text-light/40">11 sections verrouillées</span>
                  </li>
                </ul>

                <div className="text-center">
                  <p className="text-3xl font-bold text-light mb-4">0€</p>
                  <Link
                    href="/audit-complet/questionnaire"
                    className="btn-secondary w-full block text-center"
                  >
                    Commencer Gratuitement
                  </Link>
                </div>
              </div>

              {/* Premium Version */}
              <div className="glass gradient-border rounded-2xl p-8 relative">
                <div className="absolute -top-4 right-8 bg-gradient-to-r from-cyan-400 to-purple-400 text-dark px-4 py-1 rounded-full text-sm font-bold">
                  🔥 RECOMMANDÉ
                </div>

                <div className="text-center mb-6">
                  <h3 className="text-3xl font-bold gradient-text mb-2">
                    💎 Premium
                  </h3>
                  <p className="text-light/60">Analyse complète sur-mesure</p>
                </div>

                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 text-xl">✅</span>
                    <span className="font-semibold">15 sections complètes d'analyse</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 text-xl">✅</span>
                    <span>Digestion & Microbiome avancé</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 text-xl">✅</span>
                    <span>Hormones & Signaux métaboliques</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 text-xl">✅</span>
                    <span>Performance & Activité sur-mesure</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 text-xl">✅</span>
                    <span>Plan Nutritionnel Personnalisé</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 text-xl">✅</span>
                    <span>Protocole Entraînement Sur-Mesure</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 text-xl">✅</span>
                    <span>Feuille de Route 90 Jours</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-400 text-xl">🤖</span>
                    <span>Analysé par Claude Sonnet 4 (16000 tokens)</span>
                  </li>
                </ul>

                <div className="text-center">
                  <p className="text-4xl font-bold gradient-text mb-4">79€</p>
                  <Link
                    href="/audit-complet/questionnaire"
                    className="btn-primary w-full block text-center"
                  >
                    Obtenir l'Audit Premium
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative z-10 py-20 px-4 bg-gradient-to-b from-transparent to-dark">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center gradient-text mb-16">
            Comment ça marche ?
          </h2>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: '1',
                icon: '📝',
                title: 'Questionnaire',
                desc: '85 questions sur ton métabolisme, hormones, nutrition, activité...',
              },
              {
                step: '2',
                icon: '💳',
                title: 'Choix Version',
                desc: 'Gratuit (4 sections) ou Premium (15 sections complètes)',
              },
              {
                step: '3',
                icon: '🤖',
                title: 'Analyse IA',
                desc: 'Claude Sonnet 4 analyse tes réponses et génère ton audit personnalisé',
              },
              {
                step: '4',
                icon: '📊',
                title: 'Dashboard',
                desc: 'Accède à ton audit complet dans ton espace personnel',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="glass glass-hover rounded-2xl p-6 text-center"
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <div className="text-cyan-400 font-bold text-2xl mb-2">
                  Étape {item.step}
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-light/60 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="glass gradient-border rounded-3xl p-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
              Prêt à optimiser ton métabolisme ?
            </h2>
            <p className="text-xl text-light/80 mb-8">
              Réponds au questionnaire maintenant et reçois ton audit personnalisé
            </p>
            <Link
              href="/audit-complet/questionnaire"
              className="btn-primary text-xl px-12 py-5 inline-block"
            >
              🚀 Commencer l'Audit (Gratuit)
            </Link>
            <p className="text-light/50 mt-6 text-sm">
              Moins de 10 minutes • Résultats immédiats • Analyse par IA
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-4 text-center text-light/40 border-t border-light/10">
        <p>© 2025 AchZod Coaching - Audit Métabolique Complet</p>
        <p className="text-sm mt-2">
          Propulsé par Claude Sonnet 4 • coaching@achzodcoaching.com
        </p>
      </footer>
    </div>
  )
}
