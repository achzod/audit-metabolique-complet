'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import BackToHomeButton from '@/components/BackToHomeButton'

interface User {
  id: string
  email: string
  name: string | null
  createdAt: string
  _count: {
    audits: number
  }
}

interface Audit {
  id: string
  type: string
  status: string
  createdAt: string
  completedAt: string | null
  user: {
    email: string
    name: string | null
  }
  scores: any
  responses: any
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [users, setUsers] = useState<User[]>([])
  const [audits, setAudits] = useState<Audit[]>([])
  const [selectedAudit, setSelectedAudit] = useState<Audit | null>(null)
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<'users' | 'audits'>('audits')
  const [stats, setStats] = useState({ totalUsers: 0, totalAudits: 0, premiumAudits: 0 })

  const handleLogin = async () => {
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      if (res.ok) {
        setIsAuthenticated(true)
        localStorage.setItem('admin_auth', 'true')
        fetchData()
      } else {
        setError('Mot de passe incorrect')
      }
    } catch (err) {
      setError('Erreur de connexion')
    } finally {
      setLoading(false)
    }
  }

  const fetchData = async () => {
    setLoading(true)
    try {
      const [usersRes, auditsRes, statsRes] = await Promise.all([
        fetch('/api/admin/users'),
        fetch('/api/admin/audits'),
        fetch('/api/admin/stats'),
      ])

      if (usersRes.ok) setUsers(await usersRes.json())
      if (auditsRes.ok) setAudits(await auditsRes.json())
      if (statsRes.ok) setStats(await statsRes.json())
    } catch (err) {
      console.error('Error fetching data:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const auth = localStorage.getItem('admin_auth')
    if (auth === 'true') {
      setIsAuthenticated(true)
      fetchData()
    }
  }, [])

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0A0A0B] text-white flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#1C1C1E] rounded-3xl p-8 w-full max-w-md"
        >
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🔐</div>
            <h1 className="text-2xl font-bold text-[#5EECC5]">Admin Dashboard</h1>
            <p className="text-gray-400 mt-2">Accès réservé</p>
          </div>

          <div className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              placeholder="Mot de passe admin"
              className="w-full px-4 py-3 bg-[#2C2C2E] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#5EECC5]"
            />

            {error && (
              <p className="text-red-400 text-sm text-center">{error}</p>
            )}

            <button
              onClick={handleLogin}
              disabled={loading || !password}
              className="w-full py-3 bg-[#5EECC5] text-black font-bold rounded-xl hover:opacity-90 transition-all disabled:opacity-50"
            >
              {loading ? 'Connexion...' : 'Accéder'}
            </button>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white">
      <BackToHomeButton />
      {/* Header */}
      <div className="bg-[#1C1C1E] border-b border-[#2C2C2E] px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-2xl">🧬</span>
            <h1 className="text-xl font-bold">Admin Dashboard</h1>
          </div>
          <button
            onClick={() => {
              localStorage.removeItem('admin_auth')
              setIsAuthenticated(false)
            }}
            className="text-gray-400 hover:text-red-400 transition-colors"
          >
            Déconnexion
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#1C1C1E] rounded-2xl p-6"
          >
            <div className="text-4xl mb-2">👥</div>
            <p className="text-gray-400 text-sm">Utilisateurs</p>
            <p className="text-3xl font-bold text-[#5EECC5]">{stats.totalUsers}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-[#1C1C1E] rounded-2xl p-6"
          >
            <div className="text-4xl mb-2">📊</div>
            <p className="text-gray-400 text-sm">Audits Total</p>
            <p className="text-3xl font-bold text-[#9990EA]">{stats.totalAudits}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#1C1C1E] rounded-2xl p-6"
          >
            <div className="text-4xl mb-2">💎</div>
            <p className="text-gray-400 text-sm">Audits Premium</p>
            <p className="text-3xl font-bold text-[#FF6B9D]">{stats.premiumAudits}</p>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab('audits')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              activeTab === 'audits'
                ? 'bg-[#5EECC5] text-black'
                : 'bg-[#1C1C1E] text-gray-400 hover:text-white'
            }`}
          >
            📊 Audits ({audits.length})
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              activeTab === 'users'
                ? 'bg-[#5EECC5] text-black'
                : 'bg-[#1C1C1E] text-gray-400 hover:text-white'
            }`}
          >
            👥 Utilisateurs ({users.length})
          </button>
          <button
            onClick={fetchData}
            className="px-6 py-3 rounded-xl bg-[#2C2C2E] text-gray-400 hover:text-white transition-all ml-auto"
          >
            🔄 Rafraîchir
          </button>
        </div>

        {/* Content */}
        {activeTab === 'audits' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Audits List */}
            <div className="bg-[#1C1C1E] rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-4">Liste des Audits</h2>

              {loading ? (
                <div className="flex justify-center py-8">
                  <div className="w-8 h-8 border-4 border-[#5EECC5] border-t-transparent rounded-full animate-spin" />
                </div>
              ) : audits.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Aucun audit pour le moment</p>
              ) : (
                <div className="space-y-3 max-h-[600px] overflow-y-auto">
                  {audits.map((audit) => (
                    <div
                      key={audit.id}
                      onClick={() => setSelectedAudit(audit)}
                      className={`p-4 rounded-xl cursor-pointer transition-all ${
                        selectedAudit?.id === audit.id
                          ? 'bg-[#5EECC5]/20 border border-[#5EECC5]'
                          : 'bg-[#2C2C2E] hover:bg-[#3A3A3C]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold">{audit.user.email}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                          audit.type === 'PREMIUM'
                            ? 'bg-[#9990EA]/20 text-[#9990EA]'
                            : audit.type === 'ELITE'
                              ? 'bg-[#FF6B9D]/20 text-[#FF6B9D]'
                              : 'bg-gray-600/20 text-gray-400'
                        }`}>
                          {audit.type}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-400">
                        <span>{new Date(audit.createdAt).toLocaleDateString('fr-FR')}</span>
                        <span className={`${
                          audit.status === 'COMPLETED' ? 'text-green-400' :
                          audit.status === 'PROCESSING' ? 'text-yellow-400' :
                          'text-gray-400'
                        }`}>
                          {audit.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Audit Detail */}
            <div className="bg-[#1C1C1E] rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-4">Détail de l'Audit</h2>

              {selectedAudit ? (
                <div className="space-y-6">
                  {/* Info */}
                  <div className="bg-[#2C2C2E] rounded-xl p-4">
                    <h3 className="font-semibold text-[#5EECC5] mb-2">Informations</h3>
                    <div className="space-y-2 text-sm">
                      <p><span className="text-gray-400">Email:</span> {selectedAudit.user.email}</p>
                      <p><span className="text-gray-400">Type:</span> {selectedAudit.type}</p>
                      <p><span className="text-gray-400">Status:</span> {selectedAudit.status}</p>
                      <p><span className="text-gray-400">Date:</span> {new Date(selectedAudit.createdAt).toLocaleString('fr-FR')}</p>
                    </div>
                  </div>

                  {/* Scores */}
                  {selectedAudit.scores && (
                    <div className="bg-[#2C2C2E] rounded-xl p-4">
                      <h3 className="font-semibold text-[#9990EA] mb-2">Scores</h3>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <p><span className="text-gray-400">Global:</span> {selectedAudit.scores.overall}/100</p>
                        {selectedAudit.scores.axes && Object.entries(selectedAudit.scores.axes).slice(0, 10).map(([key, value]) => (
                          <p key={key}>
                            <span className="text-gray-400">{key}:</span> {String(value)}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Responses */}
                  <div className="bg-[#2C2C2E] rounded-xl p-4">
                    <h3 className="font-semibold text-[#FF6B9D] mb-2">Réponses Questionnaire</h3>
                    <div className="max-h-[300px] overflow-y-auto text-sm">
                      {selectedAudit.responses && typeof selectedAudit.responses === 'object' ? (
                        <pre className="text-gray-300 whitespace-pre-wrap">
                          {JSON.stringify(selectedAudit.responses, null, 2)}
                        </pre>
                      ) : (
                        <p className="text-gray-500">Pas de réponses disponibles</p>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-[400px] text-gray-500">
                  <p>Sélectionne un audit pour voir les détails</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="bg-[#1C1C1E] rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-4">Liste des Utilisateurs</h2>

            {loading ? (
              <div className="flex justify-center py-8">
                <div className="w-8 h-8 border-4 border-[#5EECC5] border-t-transparent rounded-full animate-spin" />
              </div>
            ) : users.length === 0 ? (
              <p className="text-gray-500 text-center py-8">Aucun utilisateur pour le moment</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#2C2C2E]">
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Email</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Nom</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Audits</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Inscrit le</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="border-b border-[#2C2C2E] hover:bg-[#2C2C2E]">
                        <td className="py-3 px-4">{user.email}</td>
                        <td className="py-3 px-4 text-gray-400">{user.name || '-'}</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 bg-[#5EECC5]/20 text-[#5EECC5] rounded-full text-sm">
                            {user._count.audits}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-400">
                          {new Date(user.createdAt).toLocaleDateString('fr-FR')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
