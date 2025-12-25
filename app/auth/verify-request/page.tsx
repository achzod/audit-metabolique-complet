'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function VerifyRequestPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-dark">
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
          <p className="text-light/70 mb-6">
            Un lien magique t'a été envoyé.
            <br />
            Clique dessus pour accéder à ton dashboard.
          </p>
          <p className="text-light/50 text-sm mb-8">
            Le lien expire dans 1 heure.
          </p>

          <Link
            href="/auth/login"
            className="text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            ← Retour à la connexion
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
