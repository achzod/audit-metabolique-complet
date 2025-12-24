'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import BackToHomeButton from '@/components/BackToHomeButton'

function SignupForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const plan = searchParams.get('plan') || 'GRATUIT'

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas')
      setLoading(false)
      return
    }

    if (password.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères')
      setLoading(false)
      return
    }

    try {
      // Get questionnaire responses from localStorage
      const responses = JSON.parse(localStorage.getItem('questionnaire_responses') || '{}')

      // Create user account
      const signupResponse = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      })

      if (!signupResponse.ok) {
        const data = await signupResponse.json()
        throw new Error(data.error || 'Erreur lors de la création du compte')
      }

      const { userId } = await signupResponse.json()

      // Create audit
      const auditResponse = await fetch('/api/audit/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          type: plan,
          responses,
        }),
      })

      const { auditId } = await auditResponse.json()

      // Trigger audit analysis
      await fetch('/api/audit/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ auditId }),
      })

      // Clear localStorage
      localStorage.removeItem('questionnaire_responses')

      // Redirect to dashboard
      router.push('/dashboard')
    } catch (error: any) {
      setError(error.message || 'Une erreur est survenue')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <BackToHomeButton />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="glass gradient-border rounded-3xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold gradient-text mb-2">
              Créer un compte
            </h1>
            <p className="text-light/60">
              Pour accéder à ton audit {plan === 'PREMIUM' ? 'premium' : 'gratuit'}
            </p>
          </div>

          {error && (
            <div className="bg-red/20 border border-red text-red px-4 py-3 rounded-xl mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-light/70 mb-2 font-medium">
                Nom complet
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-light/5 border border-light/20 rounded-xl px-4 py-3 text-light focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/30 transition-all"
                placeholder="Jean Dupont"
              />
            </div>

            <div>
              <label className="block text-light/70 mb-2 font-medium">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-light/5 border border-light/20 rounded-xl px-4 py-3 text-light focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/30 transition-all"
                placeholder="ton@email.com"
              />
            </div>

            <div>
              <label className="block text-light/70 mb-2 font-medium">
                Mot de passe
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                className="w-full bg-light/5 border border-light/20 rounded-xl px-4 py-3 text-light focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/30 transition-all"
                placeholder="••••••••"
              />
              <p className="text-light/40 text-sm mt-1">
                Minimum 8 caractères
              </p>
            </div>

            <div>
              <label className="block text-light/70 mb-2 font-medium">
                Confirmer le mot de passe
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={8}
                className="w-full bg-light/5 border border-light/20 rounded-xl px-4 py-3 text-light focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/30 transition-all"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-4 text-lg"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="spinner w-5 h-5" />
                  Création du compte...
                </div>
              ) : (
                'Créer mon compte'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-light/60">
              Déjà un compte?{' '}
              <Link
                href="/auth/login"
                className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
              >
                Se connecter
              </Link>
            </p>
          </div>
        </div>

        <div className="text-center mt-6">
          <Link
            href="/audit-complet/checkout"
            className="text-light/50 hover:text-cyan-400 transition-colors"
          >
            ← Retour au checkout
          </Link>
        </div>
      </motion.div>
    </div>
  )
}


export default function SignupPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner" />
      </div>
    }>
      <SignupForm />
    </Suspense>
  )
}
