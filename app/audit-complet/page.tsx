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
      <section className="relative z-10 min-h-screen flex items-center justify-center px-4 py-20">
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
              L'analyse métabolique la plus complète du marché
            </p>
            <p className="text-lg md:text-xl text-light/60 mb-12 max-w-3xl mx-auto">
              105 questions scientifiques • Analyse par IA Claude Sonnet 4 • Plan personnalisé d'optimisation
            </p>

            {/* CTA Principal */}
            <div className="glass gradient-border rounded-3xl p-8 md:p-12 mb-8 max-w-2xl mx-auto">
              <div className="mb-6">
                <div className="inline-block bg-gradient-to-r from-cyan-400 to-purple-400 text-dark px-4 py-2 rounded-full text-sm font-bold mb-4">
                  ⚡ COMMENCE GRATUITEMENT
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Comment ça marche ?
                </h2>
              </div>

              <div className="space-y-4 text-left mb-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-cyan-400/20 flex items-center justify-center text-cyan-400 font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Tu réponds au questionnaire (gratuit)</h3>
                    <p className="text-light/70 text-sm">105 questions sur ton métabolisme, nutrition, sommeil, HRV, tracking...</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-400/20 flex items-center justify-center text-purple-400 font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Tu choisis ta version</h3>
                    <p className="text-light/70 text-sm">
                      <span className="text-cyan-400 font-semibold">Gratuite (4 sections)</span> ou <span className="text-purple-400 font-semibold">Premium (15 sections, 79€)</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-cyan-400/20 flex items-center justify-center text-cyan-400 font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Claude Sonnet 4 analyse tes réponses</h3>
                    <p className="text-light/70 text-sm">IA médicale de pointe • 16 000 tokens • Analyse scientifique personnalisée</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-400/20 flex items-center justify-center text-purple-400 font-bold">
                    4
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Tu reçois ton audit complet</h3>
                    <p className="text-light/70 text-sm">Diagnostic + Plan d'action + Protocoles nutrition/entraînement/suppléments</p>
                  </div>
                </div>
              </div>

              <Link
                href="/audit-complet/questionnaire"
                className="btn-primary text-xl px-12 py-5 inline-block w-full text-center"
              >
                🚀 Commencer Maintenant (Gratuit)
              </Link>
              <p className="text-light/50 mt-4 text-sm">
                ⏱️ 10-15 minutes • 💳 Tu payes SEULEMENT si tu veux la version premium
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Comparaison Gratuit vs Premium */}
      <section id="pricing" className="relative z-10 py-20 px-4 bg-gradient-to-b from-transparent to-dark">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-center gradient-text mb-4">
              Gratuit ou Premium ?
            </h2>
            <p className="text-center text-light/70 mb-16 text-lg">
              Tu choisis APRÈS avoir répondu au questionnaire
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Free Version */}
              <div className="glass gradient-border rounded-2xl p-8">
                <div className="text-center mb-6">
                  <h3 className="text-3xl font-bold text-cyan-400 mb-2">
                    🎁 Version Gratuite
                  </h3>
                  <p className="text-light/60">Parfait pour commencer</p>
                </div>

                <div className="text-center mb-8">
                  <p className="text-5xl font-bold text-light mb-2">0€</p>
                  <p className="text-light/50 text-sm">Pour toujours</p>
                </div>

                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 text-xl">✅</span>
                    <span><strong>4 sections d'analyse :</strong><br/>
                    <span className="text-sm text-light/70">Résumé exécutif • Profil anthropométrique • Métabolisme & énergie • Plan d'action 30 jours</span>
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 text-xl">✅</span>
                    <span>Analyse par Claude Sonnet 4</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 text-xl">✅</span>
                    <span>Métriques clés (IMC, rapport taille/hanches...)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 text-xl">✅</span>
                    <span>Diagnostic métabolique de base</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-400 text-xl">🔒</span>
                    <span className="text-light/40">11 sections verrouillées</span>
                  </li>
                </ul>

                <Link
                  href="/audit-complet/questionnaire"
                  className="btn-secondary w-full block text-center"
                >
                  Commencer Gratuitement
                </Link>
              </div>

              {/* Premium Version */}
              <div className="glass gradient-border rounded-2xl p-8 relative">
                <div className="absolute -top-4 right-8 bg-gradient-to-r from-cyan-400 to-purple-400 text-dark px-4 py-1 rounded-full text-sm font-bold">
                  🔥 RECOMMANDÉ
                </div>

                <div className="text-center mb-6">
                  <h3 className="text-3xl font-bold gradient-text mb-2">
                    💎 Version Premium
                  </h3>
                  <p className="text-light/60">Analyse complète sur-mesure</p>
                </div>

                <div className="text-center mb-8">
                  <p className="text-5xl font-bold gradient-text mb-2">79€</p>
                  <p className="text-light/50 text-sm">Paiement unique</p>
                </div>

                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 text-xl">✅</span>
                    <span className="font-semibold">15 sections complètes d'analyse</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 text-xl">✅</span>
                    <span><strong>Digestion & Microbiome</strong> approfondi</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 text-xl">✅</span>
                    <span><strong>Hormones & Signaux</strong> métaboliques</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 text-xl">✅</span>
                    <span><strong>HRV & Récupération</strong> cardiaque</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 text-xl">✅</span>
                    <span><strong>Performance & Activité</strong> personnalisée</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 text-xl">✅</span>
                    <span><strong>Plan Nutritionnel</strong> avec macros détaillées</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 text-xl">✅</span>
                    <span><strong>Protocole Entraînement</strong> sur-mesure</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 text-xl">✅</span>
                    <span><strong>Protocole Suppléments</strong> personnalisé</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 text-xl">✅</span>
                    <span><strong>Feuille de Route 90 Jours</strong> étape par étape</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-400 text-xl">🤖</span>
                    <span>Analyse ultra-détaillée (16 000 tokens)</span>
                  </li>
                </ul>

                <Link
                  href="/audit-complet/questionnaire"
                  className="btn-primary w-full block text-center"
                >
                  Démarrer l'Audit Premium
                </Link>
              </div>
            </div>

            {/* Clarification importante */}
            <div className="mt-16 text-center glass gradient-border rounded-2xl p-8 max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold mb-4 gradient-text">📌 Important à savoir</h3>
              <div className="space-y-3 text-left text-light/80">
                <p className="flex items-start gap-3">
                  <span className="text-cyan-400 text-xl">•</span>
                  <span>Le <strong>questionnaire est 100% gratuit</strong> - aucune carte bancaire demandée</span>
                </p>
                <p className="flex items-start gap-3">
                  <span className="text-cyan-400 text-xl">•</span>
                  <span>Tu <strong>choisis ta version APRÈS</strong> avoir répondu aux questions</span>
                </p>
                <p className="flex items-start gap-3">
                  <span className="text-cyan-400 text-xl">•</span>
                  <span>La version gratuite te donne déjà <strong>un vrai diagnostic + plan d'action</strong></span>
                </p>
                <p className="flex items-start gap-3">
                  <span className="text-cyan-400 text-xl">•</span>
                  <span>Tu peux <strong>tester la version gratuite</strong> et décider ensuite si tu veux upgrader</span>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Ce que tu vas découvrir */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center gradient-text mb-16">
            Ce que tu vas découvrir
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '🔬',
                title: 'Analyse Scientifique',
                desc: '105 questions couvrant métabolisme, hormones, HRV, sommeil profond, nutrition trackée, analyses sanguines...',
              },
              {
                icon: '🤖',
                title: 'Intelligence Artificielle',
                desc: 'Claude Sonnet 4 (le meilleur modèle médical) analyse tes réponses comme un expert métabolique',
              },
              {
                icon: '📊',
                title: 'Diagnostic Précis',
                desc: 'Identification de tes points faibles métaboliques, déséquilibres hormonaux, carences potentielles',
              },
              {
                icon: '🎯',
                title: 'Plan Personnalisé',
                desc: 'Protocoles nutrition, entraînement, suppléments adaptés À TOI (pas du générique)',
              },
              {
                icon: '📈',
                title: 'Données Quantifiables',
                desc: 'Integration wearables (Whoop, Oura, Apple Watch), tracking, analyses sanguines, biomarqueurs',
              },
              {
                icon: '🚀',
                title: 'Feuille de Route',
                desc: 'Plan d\'action concret sur 30 jours (gratuit) ou 90 jours (premium) avec étapes précises',
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
              Prêt à hacker ton métabolisme ?
            </h2>
            <p className="text-xl text-light/80 mb-8">
              Commence gratuitement maintenant • Résultats en 15 minutes
            </p>
            <Link
              href="/audit-complet/questionnaire"
              className="btn-primary text-xl px-12 py-5 inline-block"
            >
              🔥 Démarrer l'Audit Gratuit
            </Link>
            <p className="text-light/50 mt-6 text-sm">
              ✅ Aucune carte bancaire • 🤖 Analyse par IA • ⚡ Instantané
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
