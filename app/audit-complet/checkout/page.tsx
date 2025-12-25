'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import BackToHomeButton from '@/components/BackToHomeButton'

export default function CheckoutPage() {
  const router = useRouter()
  const [responses, setResponses] = useState<any>(null)
  const [selectedPlan, setSelectedPlan] = useState<'GRATUIT' | 'PREMIUM' | 'ELITE' | null>(null)
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')

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

  const handleSelectPlan = async (plan: 'GRATUIT' | 'PREMIUM' | 'ELITE') => {
    setSelectedPlan(plan)
  }

  const handlePayment = async () => {
    if (!selectedPlan || !email) return

    setLoading(true)

    try {
      if (selectedPlan === 'GRATUIT') {
        // For free plan, create account and generate audit
        const response = await fetch('/api/auth/magic-link', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            plan: 'GRATUIT',
            responses,
          }),
        })

        if (response.ok) {
          router.push('/auth/check-email?email=' + encodeURIComponent(email))
        }
      } else {
        // Premium/Elite - Stripe checkout
        const priceId = selectedPlan === 'PREMIUM'
          ? process.env.NEXT_PUBLIC_STRIPE_PREMIUM_PRICE_ID
          : process.env.NEXT_PUBLIC_STRIPE_ELITE_PRICE_ID

        const response = await fetch('/api/payment/stripe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            plan: selectedPlan,
            email,
            responses,
            priceId,
          }),
        })

        const { url } = await response.json()
        if (url) {
          window.location.href = url
        }
      }
    } catch (error) {
      console.error('Payment error:', error)
      alert('Erreur lors du paiement. Réessaye.')
    } finally {
      setLoading(false)
    }
  }

  if (!responses) {
    return (
      <div className="min-h-screen bg-[#1C1C1E] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#5EECC5] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#1C1C1E] text-white py-20 px-4">
      <BackToHomeButton />
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-[#5EECC5] to-[#9990EA] bg-clip-text text-transparent mb-4">
            Choisis ton niveau d'analyse
          </h1>
          <p className="text-xl text-gray-400">
            126 questions analysées • 13 domaines métaboliques
          </p>
        </motion.div>

        {/* Plans */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* Free Plan */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`bg-[#2C2C2E] rounded-3xl p-8 cursor-pointer transition-all border-2 ${
              selectedPlan === 'GRATUIT' ? 'border-[#5EECC5]' : 'border-transparent hover:border-[#3A3A3C]'
            }`}
            onClick={() => handleSelectPlan('GRATUIT')}
          >
            <div className="text-center mb-6">
              <div className="text-5xl mb-4">🎁</div>
              <h2 className="text-2xl font-bold text-[#5EECC5] mb-2">
                Gratuit
              </h2>
              <p className="text-gray-400 text-sm">Découverte</p>
            </div>

            <div className="text-center mb-8">
              <p className="text-5xl font-bold text-white mb-2">0€</p>
              <p className="text-gray-500 text-sm">Accès immédiat</p>
            </div>

            <ul className="space-y-3 mb-8 text-sm">
              <li className="flex items-start gap-3">
                <span className="text-green-400">✓</span>
                <span>Résumé Exécutif</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400">✓</span>
                <span>Analyse Anthropométrique</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400">✓</span>
                <span>Diagnostic Métabolisme</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400">✓</span>
                <span>Plan d'Action 30 Jours</span>
              </li>
              <li className="flex items-start gap-3 text-gray-500">
                <span>🔒</span>
                <span>9 sections verrouillées</span>
              </li>
            </ul>

            <button
              className={`w-full py-4 rounded-xl font-semibold transition-all ${
                selectedPlan === 'GRATUIT'
                  ? 'bg-[#5EECC5] text-black'
                  : 'bg-[#3A3A3C] text-white hover:bg-[#4A4A4C]'
              }`}
            >
              {selectedPlan === 'GRATUIT' ? '✓ Sélectionné' : 'Choisir'}
            </button>
          </motion.div>

          {/* Premium Plan */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`bg-[#2C2C2E] rounded-3xl p-8 cursor-pointer transition-all border-2 relative ${
              selectedPlan === 'PREMIUM' ? 'border-[#9990EA]' : 'border-transparent hover:border-[#3A3A3C]'
            }`}
            onClick={() => handleSelectPlan('PREMIUM')}
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#5EECC5] to-[#9990EA] text-black px-4 py-1 rounded-full text-xs font-bold">
              POPULAIRE
            </div>

            <div className="text-center mb-6">
              <div className="text-5xl mb-4">💎</div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-[#5EECC5] to-[#9990EA] bg-clip-text text-transparent mb-2">
                Premium
              </h2>
              <p className="text-gray-400 text-sm">Analyse complète</p>
            </div>

            <div className="text-center mb-8">
              <p className="text-5xl font-bold bg-gradient-to-r from-[#5EECC5] to-[#9990EA] bg-clip-text text-transparent mb-2">79€</p>
              <p className="text-gray-500 text-sm">Paiement unique</p>
            </div>

            <ul className="space-y-3 mb-8 text-sm">
              <li className="flex items-start gap-3">
                <span className="text-green-400">✓</span>
                <span className="font-semibold">Tout le Gratuit +</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400">✓</span>
                <span>Digestion & Microbiome</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400">✓</span>
                <span>Hormones & Signaux</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400">✓</span>
                <span>Performance & Récupération</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400">✓</span>
                <span>Biomécanique & Mobilité</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400">✓</span>
                <span>Plan Nutritionnel Personnalisé</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400">✓</span>
                <span>Protocole Entraînement</span>
              </li>
            </ul>

            <button
              className={`w-full py-4 rounded-xl font-semibold transition-all ${
                selectedPlan === 'PREMIUM'
                  ? 'bg-gradient-to-r from-[#5EECC5] to-[#9990EA] text-black'
                  : 'bg-[#3A3A3C] text-white hover:bg-[#4A4A4C]'
              }`}
            >
              {selectedPlan === 'PREMIUM' ? '✓ Sélectionné' : 'Choisir'}
            </button>
          </motion.div>

          {/* Elite Plan */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className={`bg-[#2C2C2E] rounded-3xl p-8 cursor-pointer transition-all border-2 relative ${
              selectedPlan === 'ELITE' ? 'border-[#FF6B9D]' : 'border-transparent hover:border-[#3A3A3C]'
            }`}
            onClick={() => handleSelectPlan('ELITE')}
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#FF6B9D] to-[#9990EA] text-white px-4 py-1 rounded-full text-xs font-bold">
              ULTIMATE
            </div>

            <div className="text-center mb-6">
              <div className="text-5xl mb-4">👑</div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-[#FF6B9D] to-[#9990EA] bg-clip-text text-transparent mb-2">
                Elite
              </h2>
              <p className="text-gray-400 text-sm">L'excellence absolue</p>
            </div>

            <div className="text-center mb-8">
              <p className="text-5xl font-bold bg-gradient-to-r from-[#FF6B9D] to-[#9990EA] bg-clip-text text-transparent mb-2">129€</p>
              <p className="text-gray-500 text-sm">Par an • Accès illimité</p>
            </div>

            <ul className="space-y-3 mb-8 text-sm">
              <li className="flex items-start gap-3">
                <span className="text-green-400">✓</span>
                <span className="font-semibold">Tout le Premium +</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400">✓</span>
                <span>Neurotransmetteurs & Cognition</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400">✓</span>
                <span>Analyse Photos Posturales</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400">✓</span>
                <span>Optimisation Hormonale Avancée</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400">✓</span>
                <span>Feuille de Route 90 Jours</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#FF6B9D]">★</span>
                <span>Mises à jour illimitées pendant 1 an</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#FF6B9D]">★</span>
                <span>Rapport PDF complet (20 000+ mots)</span>
              </li>
            </ul>

            <button
              className={`w-full py-4 rounded-xl font-semibold transition-all ${
                selectedPlan === 'ELITE'
                  ? 'bg-gradient-to-r from-[#FF6B9D] to-[#9990EA] text-white'
                  : 'bg-[#3A3A3C] text-white hover:bg-[#4A4A4C]'
              }`}
            >
              {selectedPlan === 'ELITE' ? '✓ Sélectionné' : 'Choisir'}
            </button>
          </motion.div>
        </div>

        {/* Email & Payment */}
        {selectedPlan && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-xl mx-auto bg-[#2C2C2E] rounded-3xl p-8"
          >
            <h3 className="text-xl font-bold text-center mb-6">
              {selectedPlan === 'GRATUIT'
                ? 'Reçois ton audit par email'
                : `Finaliser l'achat ${selectedPlan}`}
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Ton email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="exemple@email.com"
                  className="w-full px-4 py-3 bg-[#3A3A3C] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#5EECC5]"
                />
              </div>

              <button
                onClick={handlePayment}
                disabled={loading || !email}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                  loading || !email
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : selectedPlan === 'GRATUIT'
                      ? 'bg-[#5EECC5] text-black hover:opacity-90'
                      : selectedPlan === 'PREMIUM'
                        ? 'bg-gradient-to-r from-[#5EECC5] to-[#9990EA] text-black hover:opacity-90'
                        : 'bg-gradient-to-r from-[#FF6B9D] to-[#9990EA] text-white hover:opacity-90'
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Traitement...
                  </span>
                ) : selectedPlan === 'GRATUIT' ? (
                  'Recevoir mon audit gratuit'
                ) : (
                  `Payer ${selectedPlan === 'PREMIUM' ? '79€' : '129€'}`
                )}
              </button>

              <p className="text-center text-xs text-gray-500">
                {selectedPlan === 'GRATUIT'
                  ? 'Tu recevras un magic link pour accéder à ton audit.'
                  : 'Paiement sécurisé par Stripe. Tu recevras un lien de connexion par email.'}
              </p>
            </div>
          </motion.div>
        )}

        {/* Back button */}
        <div className="text-center mt-8">
          <button
            onClick={() => router.back()}
            className="text-gray-500 hover:text-[#5EECC5] transition-colors"
          >
            ← Retour au questionnaire
          </button>
        </div>
      </div>
    </div>
  )
}
