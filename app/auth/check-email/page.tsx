'use client'

import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Mail, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Suspense } from 'react'
import BackToHomeButton from '@/components/BackToHomeButton'

function CheckEmailContent() {
  const searchParams = useSearchParams()
  const email = searchParams.get('email')

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md w-full text-center"
    >
      <div className="mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#5EECC5]/20 to-[#9990EA]/20 border border-[#5EECC5]/30 mb-6">
          <Mail className="w-10 h-10 text-[#5EECC5]" />
        </div>

        <h1 className="text-3xl font-bold bg-gradient-to-r from-[#5EECC5] to-[#9990EA] bg-clip-text text-transparent mb-4">
          Vérifie ta boîte mail
        </h1>

        <p className="text-gray-400 mb-2">
          Nous avons envoyé un lien de connexion à :
        </p>

        <p className="text-[#5EECC5] font-semibold text-lg mb-6">
          {email || 'ton adresse email'}
        </p>

        <div className="bg-[#2C2C2E] rounded-2xl p-6 mb-8">
          <p className="text-gray-400 text-sm">
            Clique sur le lien dans l'email pour accéder à ton audit métabolique personnalisé.
            Le lien expire dans 24 heures.
          </p>
        </div>

        <div className="space-y-4">
          <p className="text-gray-500 text-sm">
            Tu n'as pas reçu l'email ?
          </p>
          <button className="text-[#5EECC5] hover:underline text-sm">
            Renvoyer l'email
          </button>
        </div>
      </div>

      <Link
        href="/audit-complet"
        className="inline-flex items-center gap-2 text-gray-500 hover:text-[#5EECC5] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Retour à l'accueil
      </Link>
    </motion.div>
  )
}

function LoadingFallback() {
  return (
    <div className="max-w-md w-full text-center animate-pulse">
      <div className="w-20 h-20 rounded-full bg-gray-700 mx-auto mb-6" />
      <div className="h-8 bg-gray-700 rounded w-3/4 mx-auto mb-4" />
      <div className="h-4 bg-gray-700 rounded w-1/2 mx-auto" />
    </div>
  )
}

export default function CheckEmailPage() {
  return (
    <div className="min-h-screen bg-[#1C1C1E] text-white flex items-center justify-center px-4">
      <BackToHomeButton />
      <Suspense fallback={<LoadingFallback />}>
        <CheckEmailContent />
      </Suspense>
    </div>
  )
}
