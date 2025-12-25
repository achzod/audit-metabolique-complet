import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import BackToHomeButton from '@/components/BackToHomeButton'

export default async function AuditDetailPage({
  params,
}: {
  params: Promise<{ auditId: string }>
}) {
  const { auditId } = await params
  const session = await auth()

  if (!session?.user) {
    redirect('/auth/login')
  }

  // Get audit
  const audit = await prisma.audit.findUnique({
    where: {
      id: auditId,
      userId: session.user.id,
    },
  })

  if (!audit) {
    notFound()
  }

  // If audit is still processing
  if (audit.status === 'PROCESSING') {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <BackToHomeButton />
        <div className="glass gradient-border rounded-3xl p-12 text-center max-w-md">
          <div className="spinner w-16 h-16 mx-auto mb-6" />
          <h1 className="text-3xl font-bold gradient-text mb-4">
            Analyse en cours...
          </h1>
          <p className="text-light/60 mb-6">
            Claude est en train d'analyser tes réponses et de générer ton audit personnalisé.
          </p>
          <p className="text-light/40 text-sm">
            Cela peut prendre quelques instants. Cette page se rechargera automatiquement.
          </p>
        </div>
      </div>
    )
  }

  // If audit has an error
  if (audit.status === 'FAILED') {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <BackToHomeButton />
        <div className="glass gradient-border rounded-3xl p-12 text-center max-w-md">
          <div className="text-6xl mb-6">❌</div>
          <h1 className="text-3xl font-bold text-red-400 mb-4">
            Erreur
          </h1>
          <p className="text-light/60 mb-6">
            Une erreur est survenue lors de l'analyse de ton audit.
          </p>
          <Link href="/dashboard" className="btn-primary px-8 py-3 inline-block">
            Retour au dashboard
          </Link>
        </div>
      </div>
    )
  }

  // If audit is pending
  if (audit.status === 'PENDING') {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <BackToHomeButton />
        <div className="glass gradient-border rounded-3xl p-12 text-center max-w-md">
          <div className="text-6xl mb-6">⏸️</div>
          <h1 className="text-3xl font-bold gradient-text mb-4">
            En attente
          </h1>
          <p className="text-light/60 mb-6">
            Ton audit est en attente de traitement. Il sera analysé sous peu.
          </p>
          <Link href="/dashboard" className="btn-primary px-8 py-3 inline-block">
            Retour au dashboard
          </Link>
        </div>
      </div>
    )
  }

  // Display completed audit
  return (
    <div className="min-h-screen py-12 px-4">
      <BackToHomeButton />
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <Link
            href="/dashboard"
            className="text-light/50 hover:text-cyan-400 transition-colors"
          >
            ← Retour au dashboard
          </Link>
          <span
            className={`text-sm font-bold px-4 py-2 rounded-full ${
              audit.version === 'PREMIUM'
                ? 'bg-gradient-to-r from-cyan-400 to-purple-400 text-dark'
                : 'bg-light/10 text-light'
            }`}
          >
            {audit.version === 'PREMIUM' ? '💎 Premium' : '🎁 Gratuit'}
          </span>
        </div>

        {/* Audit Content */}
        <div className="glass gradient-border rounded-3xl overflow-hidden">
          <div
            className="audit-content p-8"
            dangerouslySetInnerHTML={{ __html: audit.htmlContent || '' }}
          />
        </div>

        {/* Upgrade CTA for free users */}
        {audit.version === 'GRATUIT' && (
          <div className="mt-12 glass gradient-border rounded-3xl p-8 text-center">
            <h2 className="text-3xl font-bold gradient-text mb-4">
              Débloquer l'analyse complète
            </h2>
            <p className="text-light/70 mb-6">
              11 sections supplémentaires + Plan personnalisé 90 jours
            </p>
            <Link
              href="/audit-complet/questionnaire"
              className="btn-primary px-8 py-4 inline-block"
            >
              Passer en Premium - 79€
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
