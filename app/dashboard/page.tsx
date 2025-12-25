import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import Link from 'next/link'

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
    <div className="min-h-screen bg-[#0A0A0F] text-white flex">
      {/* Sidebar - Placeholder for actual nav items */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-white/5 p-6 space-y-8">
        <div className="text-2xl font-bold gradient-text">AchZod</div>
        <nav className="flex-1 space-y-2">
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-[#00F5D4]">
            📊 Mes Audits
          </Link>
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-white/5 transition-colors cursor-not-allowed">
            🔒 Programmes
          </div>
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-white/5 transition-colors cursor-not-allowed">
            🔒 Coaching
          </div>
        </nav>
      </aside>

      <main className="flex-1 py-12 px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
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

          {/* Filter Tabs - Simple implementation */}
          <div className="flex gap-4 mb-8 border-b border-white/5 pb-4 overflow-x-auto">
            <button className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm font-bold text-[#00F5D4]">Tous</button>
            <button className="px-4 py-2 rounded-lg text-sm text-gray-400 hover:text-white transition-colors">Terminés</button>
            <button className="px-4 py-2 rounded-lg text-sm text-gray-400 hover:text-white transition-colors">En cours</button>
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
                  className="glass glass-hover gradient-border rounded-2xl p-6 block transition-all hover:scale-[1.02]"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`text-[10px] uppercase tracking-wider font-black px-2 py-0.5 rounded ${audit.version === 'PREMIUM'
                        ? 'bg-gradient-to-r from-cyan-400 to-purple-400 text-dark'
                        : 'bg-white/10 text-white'
                        }`}
                    >
                      {audit.version === 'PREMIUM' ? '💎 Premium' : '🎁 Gratuit'}
                    </span>
                    <span
                      className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded ${audit.status === 'COMPLETED'
                        ? 'bg-green-500/20 text-green-400'
                        : audit.status === 'PROCESSING'
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : audit.status === 'FAILED'
                            ? 'bg-red-500/20 text-red-400'
                            : 'bg-white/10 text-gray-400'
                        }`}
                    >
                      {audit.status === 'COMPLETED' && '✓ Terminé'}
                      {audit.status === 'PROCESSING' && '⌛ En cours'}
                      {audit.status === 'FAILED' && '✕ Erreur'}
                      {audit.status === 'PENDING' && '⏸ En attente'}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold mb-1">
                    Audit Métabolique
                  </h3>
                  <p className="text-light/40 text-[10px] uppercase font-bold mb-6">
                    Créé le {new Date(audit.createdAt).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>

                  {audit.status === 'COMPLETED' ? (
                    <div className="w-full bg-[#00F5D4]/10 text-[#00F5D4] text-center py-2 rounded-lg text-xs font-bold uppercase tracking-widest group-hover:bg-[#00F5D4] group-hover:text-dark transition-all">
                      Voir l'audit →
                    </div>
                  ) : audit.status === 'PROCESSING' ? (
                    <div className="text-yellow-400 text-center py-2 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                      <div className="w-3 h-3 border-2 border-yellow-400/30 border-t-yellow-400 rounded-full animate-spin" />
                      Analyse en cours...
                    </div>
                  ) : (
                    <div className="text-light/20 text-center py-2 text-xs font-bold uppercase tracking-widest">
                      En attente
                    </div>
                  )}
                </Link>
              ))}
            </div>
          )}

          {/* Stats Section */}
          {audits.length > 0 && (
            <div className="mt-12 grid md:grid-cols-3 gap-6">
              <div className="glass rounded-2xl p-10 text-center border-white/5">
                <div className="text-5xl font-black gradient-text mb-2">
                  {audits.length}
                </div>
                <p className="text-light/40 text-xs font-bold uppercase tracking-widest">Audits réalisés</p>
              </div>
              <div className="glass rounded-2xl p-10 text-center border-white/5">
                <div className="text-5xl font-black text-green-400 mb-2">
                  {audits.filter((a) => a.status === 'COMPLETED').length}
                </div>
                <p className="text-light/40 text-xs font-bold uppercase tracking-widest">Audits terminés</p>
              </div>
              <div className="glass rounded-2xl p-10 text-center border-white/5">
                <div className="text-5xl font-black text-purple-400 mb-2">
                  {audits.filter((a) => a.version === 'PREMIUM').length}
                </div>
                <p className="text-light/40 text-xs font-bold uppercase tracking-widest">Audits premium</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
