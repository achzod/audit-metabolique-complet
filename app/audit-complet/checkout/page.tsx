'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function CheckoutPage() {
  const router = useRouter()
  const [responses, setResponses] = useState<any>(null)
  const [selectedPlan, setSelectedPlan] = useState<'GRATUIT' | 'PREMIUM' | null>(null)
  const [loading, setLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<'STRIPE' | 'PAYPAL'>('STRIPE')

  useEffect(() => {
    // Load questionnaire responses from localStorage
    const saved = localStorage.getItem('questionnaire_responses')
    if (saved) {
      setResponses(JSON.parse(saved))
    } else {
      // Redirect back to questionnaire if no responses
      router.push('/audit-complet/questionnaire')
    }
  }, [router])

  const handleSelectPlan = async (plan: 'GRATUIT' | 'PREMIUM') => {
    setSelectedPlan(plan)

    if (plan === 'GRATUIT') {
      // For free plan, redirect directly to auth/signup
      router.push('/auth/signup?plan=GRATUIT')
    }
  }

  const handlePayment = async () => {
    if (!selectedPlan || selectedPlan === 'GRATUIT') return

    setLoading(true)

    try {
      if (paymentMethod === 'STRIPE') {
        // Create Stripe checkout session
        const response = await fetch('/api/payment/stripe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            plan: 'PREMIUM',
            responses,
          }),
        })

        const { url } = await response.json()

        // Redirect to Stripe Checkout
        window.location.href = url
      } else {
        // PayPal checkout
        const response = await fetch('/api/payment/paypal', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            plan: 'PREMIUM',
            responses,
          }),
        })

        const { approvalUrl } = await response.json()
        window.location.href = approvalUrl
      }
    } catch (error) {
      console.error('Payment error:', error)
      alert('Erreur lors du paiement. Réessaye.')
      setLoading(false)
    }
  }

  if (!responses) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner" />
      </div>
    )
  }

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-4">
            Choisis ta version
          </h1>
          <p className="text-xl text-light/70">
            Quelle profondeur d'analyse veux-tu ?
          </p>
        </motion.div>

        {/* Plans */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Free Plan */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`glass gradient-border rounded-3xl p-8 cursor-pointer transition-all ${
              selectedPlan === 'GRATUIT' ? 'ring-4 ring-cyan-400' : ''
            }`}
            onClick={() => handleSelectPlan('GRATUIT')}
          >
            <div className="text-center mb-6">
              <div className="text-5xl mb-4">🎁</div>
              <h2 className="text-3xl font-bold text-cyan-400 mb-2">
                Version Gratuite
              </h2>
              <p className="text-light/60">Parfait pour démarrer</p>
            </div>

            <div className="text-center mb-8">
              <p className="text-5xl font-bold text-light mb-2">0€</p>
              <p className="text-light/50 text-sm">Accès immédiat</p>
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <span className="text-green-400 text-xl">✅</span>
                <span>Résumé Exécutif complet</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400 text-xl">✅</span>
                <span>Analyse Anthropométrique</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400 text-xl">✅</span>
                <span>Diagnostic Métabolisme & Énergie</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400 text-xl">✅</span>
                <span>Plan d'Action 30 Jours</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-light/40 text-xl">🔒</span>
                <span className="text-light/40">11 sections verrouillées</span>
              </li>
            </ul>

            <button
              className="btn-secondary w-full text-lg py-4"
              onClick={() => handleSelectPlan('GRATUIT')}
            >
              Choisir Gratuit
            </button>
          </motion.div>

          {/* Premium Plan */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`glass gradient-border rounded-3xl p-8 cursor-pointer transition-all relative ${
              selectedPlan === 'PREMIUM' ? 'ring-4 ring-purple-400' : ''
            }`}
            onClick={() => setSelectedPlan('PREMIUM')}
          >
            <div className="absolute -top-4 right-8 bg-gradient-to-r from-cyan-400 to-purple-400 text-dark px-4 py-1 rounded-full text-sm font-bold">
              🔥 RECOMMANDÉ
            </div>

            <div className="text-center mb-6">
              <div className="text-5xl mb-4">💎</div>
              <h2 className="text-3xl font-bold gradient-text mb-2">
                Version Premium
              </h2>
              <p className="text-light/60">Analyse ultra-complète</p>
            </div>

            <div className="text-center mb-8">
              <p className="text-6xl font-bold gradient-text mb-2">1€</p>
              <p className="text-light/50 text-sm">Paiement unique</p>
            </div>

            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <span className="text-green-400 text-xl">✅</span>
                <span className="font-semibold">15 sections complètes</span>
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
                <span>Performance & Récupération</span>
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
                <span className="text-cyan-400 text-xl">📝</span>
                <span>Analyse ultra-détaillée (16 000+ mots)</span>
              </li>
            </ul>

            {selectedPlan === 'PREMIUM' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mb-6"
              >
                <p className="text-light/70 mb-4 text-center font-semibold">
                  Choisis ton mode de paiement:
                </p>
                <div className="flex gap-4 mb-4">
                  <button
                    className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                      paymentMethod === 'STRIPE'
                        ? 'bg-purple-500 text-white'
                        : 'bg-light/10 text-light/60 hover:bg-light/20'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation()
                      setPaymentMethod('STRIPE')
                    }}
                  >
                    💳 Carte Bancaire
                  </button>
                  <button
                    className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                      paymentMethod === 'PAYPAL'
                        ? 'bg-blue-500 text-white'
                        : 'bg-light/10 text-light/60 hover:bg-light/20'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation()
                      setPaymentMethod('PAYPAL')
                    }}
                  >
                    🅿️ PayPal
                  </button>
                </div>
              </motion.div>
            )}

            <button
              className={`w-full text-lg py-4 ${
                selectedPlan === 'PREMIUM' ? 'btn-primary' : 'btn-secondary'
              }`}
              onClick={(e) => {
                e.stopPropagation()
                if (selectedPlan === 'PREMIUM') {
                  handlePayment()
                } else {
                  setSelectedPlan('PREMIUM')
                }
              }}
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="spinner w-5 h-5" />
                  Redirection...
                </div>
              ) : selectedPlan === 'PREMIUM' ? (
                `Payer 1€ via ${paymentMethod === 'STRIPE' ? 'Carte' : 'PayPal'}`
              ) : (
                'Choisir Premium'
              )}
            </button>
          </motion.div>
        </div>

        {/* Features Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="glass rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold text-center gradient-text mb-8">
            Comparaison des sections
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-cyan-400 font-bold mb-4">✅ Gratuit (4 sections):</h4>
              <ul className="space-y-2 text-light/70">
                <li>• Résumé Exécutif</li>
                <li>• Profil Anthropométrique</li>
                <li>• Métabolisme & Énergie</li>
                <li>• Plan d'Action 30j</li>
              </ul>
            </div>

            <div>
              <h4 className="gradient-text font-bold mb-4">💎 Premium (+11 sections):</h4>
              <ul className="space-y-2 text-light/70">
                <li>• Historique Pondéral</li>
                <li>• Digestion & Microbiome</li>
                <li>• Hormones & Signaux</li>
                <li>• Activité & Performance</li>
                <li>• Sommeil & Récupération</li>
                <li>• Lifestyle & Substances</li>
                <li>• Synthèse Métabolique Globale</li>
                <li>• Plan Nutritionnel Personnalisé</li>
                <li>• Protocole Entraînement</li>
                <li>• Optimisation Hormonale</li>
                <li>• Feuille de Route 90 Jours</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Back button */}
        <div className="text-center mt-8">
          <button
            onClick={() => router.back()}
            className="text-light/50 hover:text-cyan-400 transition-colors"
          >
            ← Retour au questionnaire
          </button>
        </div>
      </div>
    </div>
  )
}
