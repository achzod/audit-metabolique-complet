import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import BackToHomeButton from '@/components/BackToHomeButton'

export default async function DashboardPage() {
  const session = await auth()

  if (!session?.user) {
    redirect('/auth/login')
  }

  // Get user's audits
  const audits = await prisma.audit.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="min-h-screen py-12 px-4">
      <BackToHomeButton />
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-2">
              Mes Audits
            </h1>
            <p className="text-light/60">
              Bienvenue {session.user.name || session.user.email}
            </p>
          </div>
          <Link
            href="/audit-complet/questionnaire"
            className="btn-primary px-6 py-3"
          >
            + Nouvel Audit
          </Link>
        </div>

        {/* Audits List */}
        {audits.length === 0 ? (
          <div className="glass gradient-border rounded-3xl p-12 text-center">
            <div className="text-6xl mb-6">📊</div>
            <h2 className="text-2xl font-bold mb-4">Aucun audit pour le moment</h2>
            <p className="text-light/60 mb-8">
              Commence ton premier audit métabolique maintenant!
            </p>
            <Link
              href="/audit-complet/questionnaire"
              className="btn-primary px-8 py-4 inline-block"
            >
              Commencer mon audit
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {audits.map((audit) => (
              <Link
                key={audit.id}
                href={`/dashboard/${audit.id}`}
                className="glass glass-hover gradient-border rounded-2xl p-6 block"
              >
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full ${
                      audit.type === 'PREMIUM'
                        ? 'bg-gradient-to-r from-cyan-400 to-purple-400 text-dark'
                        : 'bg-light/10 text-light'
                    }`}
                  >
                    {audit.type === 'PREMIUM' ? '💎 Premium' : '🎁 Gratuit'}
                  </span>
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      audit.status === 'COMPLETED'
                        ? 'bg-green-500/20 text-green-400'
                        : audit.status === 'PROCESSING'
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : audit.status === 'ERROR'
                        ? 'bg-red-500/20 text-red-400'
                        : 'bg-light/10 text-light/50'
                    }`}
                  >
                    {audit.status === 'COMPLETED' && '✅ Terminé'}
                    {audit.status === 'PROCESSING' && '⏳ En cours...'}
                    {audit.status === 'ERROR' && '❌ Erreur'}
                    {audit.status === 'PENDING' && '⏸️ En attente'}
                  </span>
                </div>

                <h3 className="text-xl font-bold mb-2">
                  Audit Métabolique
                </h3>
                <p className="text-light/60 text-sm mb-4">
                  Créé le {new Date(audit.createdAt).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>

                {audit.status === 'COMPLETED' ? (
                  <div className="btn-secondary text-center py-2 text-sm">
                    Voir l'audit →
                  </div>
                ) : audit.status === 'PROCESSING' ? (
                  <div className="text-yellow-400 text-center py-2 text-sm">
                    <div className="spinner w-4 h-4 mx-auto mb-1" />
                    Analyse en cours...
                  </div>
                ) : audit.status === 'ERROR' ? (
                  <div className="text-red-400 text-center py-2 text-sm">
                    Erreur lors de l'analyse
                  </div>
                ) : (
                  <div className="text-light/40 text-center py-2 text-sm">
                    En attente de traitement
                  </div>
                )}
              </Link>
            ))}
          </div>
        )}

        {/* Stats Section */}
        {audits.length > 0 && (
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="glass rounded-2xl p-6 text-center">
              <div className="text-4xl font-bold gradient-text mb-2">
                {audits.length}
              </div>
              <p className="text-light/60">Audits réalisés</p>
            </div>
            <div className="glass rounded-2xl p-6 text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">
                {audits.filter((a) => a.status === 'COMPLETED').length}
              </div>
              <p className="text-light/60">Audits terminés</p>
            </div>
            <div className="glass rounded-2xl p-6 text-center">
              <div className="text-4xl font-bold text-purple-400 mb-2">
                {audits.filter((a) => a.type === 'PREMIUM').length}
              </div>
              <p className="text-light/60">Audits premium</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
