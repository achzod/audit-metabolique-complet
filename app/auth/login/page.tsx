'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { motion } from 'framer-motion'
import BackToHomeButton from '@/components/BackToHomeButton'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const result = await signIn('nodemailer', {
        email,
        redirect: false,
        callbackUrl: '/dashboard',
      })

      if (result?.error) {
        setError('Erreur lors de l\'envoi. Vérifie ton email.')
        setLoading(false)
      } else {
        setSent(true)
        setLoading(false)
      }
    } catch (error) {
      setError('Une erreur est survenue')
      setLoading(false)
    }
  }

  if (sent) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-12">
        <BackToHomeButton />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="glass gradient-border rounded-3xl p-8 text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold gradient-text mb-4">
              Check tes emails !
            </h1>
            <p className="text-light/70 mb-2">
              Un lien magique a été envoyé à :
            </p>
            <p className="text-cyan-400 font-semibold text-lg mb-6">
              {email}
            </p>
            <p className="text-light/50 text-sm">
              Clique sur le lien dans l'email pour accéder à ton dashboard.
              <br />
              Le lien expire dans 1 heure.
            </p>

            <div className="mt-8 pt-6 border-t border-light/10">
              <button
                onClick={() => {
                  setSent(false)
                  setEmail('')
                }}
                className="text-light/50 hover:text-cyan-400 transition-colors"
              >
                ← Utiliser un autre email
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    )
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
            <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold gradient-text mb-2">
              Connexion
            </h1>
            <p className="text-light/60">
              Entre ton email pour recevoir un lien magique
            </p>
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-400 px-4 py-3 rounded-xl mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-light/70 mb-2 font-medium">
                Ton email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-light/5 border border-light/20 rounded-xl px-4 py-4 text-light focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/30 transition-all text-lg"
                placeholder="ton@email.com"
              />
            </div>

            <button
              type="submit"
              disabled={loading || !email}
              className="btn-primary w-full py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="spinner w-5 h-5" />
                  Envoi en cours...
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Recevoir le lien magique
                </div>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-light/10 text-center">
            <p className="text-light/50 text-sm">
              Pas de mot de passe à retenir.
              <br />
              On t'envoie un lien sécurisé par email.
            </p>
          </div>
        </div>

        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-light/50 hover:text-cyan-400 transition-colors"
          >
            ← Retour à l'accueil
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
