'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError('Email ou mot de passe incorrect')
        setLoading(false)
      } else {
        router.push('/dashboard')
      }
    } catch (error) {
      setError('Une erreur est survenue')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="glass gradient-border rounded-3xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold gradient-text mb-2">
              Connexion
            </h1>
            <p className="text-light/60">
              Accède à tes audits métaboliques
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
                  Connexion...
                </div>
              ) : (
                'Se connecter'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-light/60">
              Pas encore de compte?{' '}
              <Link
                href="/auth/signup"
                className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
              >
                Créer un compte
              </Link>
            </p>
          </div>
        </div>

        <div className="text-center mt-6">
          <Link
            href="/audit-complet"
            className="text-light/50 hover:text-cyan-400 transition-colors"
          >
            ← Retour à l'accueil
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
