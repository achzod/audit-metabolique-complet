'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import BackToHomeButton from '@/components/BackToHomeButton'

// Types pour les données d'audit
interface AuditScores {
  overall: number
  axes: {
    dopamine: number
    serotonin: number
    gaba: number
    acetylcholine: number
    cortisol: number
    testosterone: number
    estrogen: number
    thyroid: number
    insulin: number
    growth_hormone: number
    melatonin: number
    inflammation: number
    gut_health: number
    liver_detox: number
    cellular_energy: number
    mitochondria: number
    cardiovascular: number
    immunity: number
    hydration: number
    micronutrients: number
  }
  categories: {
    neurotransmitters: number
    hormones: number
    metabolism: number
    digestion: number
    inflammation: number
    sleep: number
    stress: number
    nutrition: number
    biomechanics: number
    cognition: number
  }
}

interface AuditData {
  id: string
  type: string
  status: string
  scores: AuditScores | null
  aiAnalysis: {
    morphotype?: string
    metabolicProfile?: string
    topBlockages?: string[]
    topStrengths?: string[]
    detailedAnalysis?: string
    recommendations?: string[]
    warnings?: string[]
  } | null
  htmlFree: string | null
  htmlPremium: string | null
  createdAt: string
  completedAt: string | null
}

// Composant Cercle de Score Animé
function AnimatedScoreCircle({
  score,
  label,
  size = 120,
  strokeWidth = 8,
  color = 'cyan'
}: {
  score: number
  label: string
  size?: number
  strokeWidth?: number
  color?: string
}) {
  const [displayScore, setDisplayScore] = useState(0)
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (displayScore / 100) * circumference

  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayScore(prev => {
          if (prev >= score) {
            clearInterval(interval)
            return score
          }
          return prev + 1
        })
      }, 20)
      return () => clearInterval(interval)
    }, 300)
    return () => clearTimeout(timer)
  }, [score])

  const getColor = () => {
    if (displayScore >= 80) return 'text-green-400'
    if (displayScore >= 60) return 'text-cyan-400'
    if (displayScore >= 40) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getGradient = () => {
    if (displayScore >= 80) return 'from-green-400 to-emerald-500'
    if (displayScore >= 60) return 'from-cyan-400 to-blue-500'
    if (displayScore >= 40) return 'from-yellow-400 to-orange-500'
    return 'from-red-400 to-rose-500'
  }

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        {/* Background circle */}
        <svg className="transform -rotate-90" width={size} height={size}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="rgba(255,255,255,0.1)"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Animated progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="url(#scoreGradient)"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-500"
          />
          <defs>
            <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
          </defs>
        </svg>
        {/* Center score */}
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          <span className={`text-3xl font-bold ${getColor()}`}>{displayScore}</span>
          <span className="text-xs text-light/50">/ 100</span>
        </div>
      </div>
      <span className="mt-2 text-sm text-light/70 text-center">{label}</span>
    </div>
  )
}

// Composant Barre de Progression Médicale
function MedicalProgressBar({
  value,
  label,
  icon,
  description
}: {
  value: number
  label: string
  icon: string
  description?: string
}) {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    setTimeout(() => setWidth(value), 100)
  }, [value])

  const getColorClass = () => {
    if (value >= 80) return 'from-green-500 to-emerald-400'
    if (value >= 60) return 'from-cyan-500 to-blue-400'
    if (value >= 40) return 'from-yellow-500 to-orange-400'
    return 'from-red-500 to-rose-400'
  }

  const getStatus = () => {
    if (value >= 80) return { text: 'Optimal', color: 'text-green-400' }
    if (value >= 60) return { text: 'Bon', color: 'text-cyan-400' }
    if (value >= 40) return { text: 'À améliorer', color: 'text-yellow-400' }
    return { text: 'Critique', color: 'text-red-400' }
  }

  const status = getStatus()

  return (
    <motion.div
      className="glass rounded-xl p-4 hover:bg-white/5 transition-all"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{icon}</span>
          <div>
            <h4 className="font-semibold text-light">{label}</h4>
            {description && <p className="text-xs text-light/50">{description}</p>}
          </div>
        </div>
        <div className="text-right">
          <span className="text-xl font-bold text-light">{value}%</span>
          <p className={`text-xs ${status.color}`}>{status.text}</p>
        </div>
      </div>
      <div className="h-3 bg-dark/50 rounded-full overflow-hidden">
        <motion.div
          className={`h-full bg-gradient-to-r ${getColorClass()} rounded-full relative`}
          initial={{ width: 0 }}
          animate={{ width: `${width}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <div className="absolute inset-0 bg-white/20 animate-pulse" />
        </motion.div>
      </div>
    </motion.div>
  )
}

// Composant Corps Humain Interactif
function InteractiveBodyScan({ scores }: { scores: AuditScores }) {
  const [activeSystem, setActiveSystem] = useState<string | null>(null)

  const systems = [
    { id: 'brain', name: 'Cerveau', icon: '🧠', score: scores.categories.neurotransmitters, x: 50, y: 8 },
    { id: 'thyroid', name: 'Thyroïde', icon: '🦋', score: scores.axes.thyroid, x: 50, y: 18 },
    { id: 'heart', name: 'Cardiovasculaire', icon: '❤️', score: scores.axes.cardiovascular, x: 45, y: 30 },
    { id: 'lungs', name: 'Poumons', icon: '🫁', score: scores.axes.cellular_energy, x: 55, y: 30 },
    { id: 'liver', name: 'Foie', icon: '🫀', score: scores.axes.liver_detox, x: 40, y: 42 },
    { id: 'stomach', name: 'Digestion', icon: '🔥', score: scores.categories.digestion, x: 50, y: 45 },
    { id: 'kidneys', name: 'Reins', icon: '💧', score: scores.axes.hydration, x: 60, y: 48 },
    { id: 'gut', name: 'Intestin', icon: '🦠', score: scores.axes.gut_health, x: 50, y: 55 },
    { id: 'hormones', name: 'Hormones', icon: '⚗️', score: scores.categories.hormones, x: 35, y: 52 },
    { id: 'muscles', name: 'Muscles', icon: '💪', score: scores.categories.biomechanics, x: 25, y: 40 },
    { id: 'immunity', name: 'Immunité', icon: '🛡️', score: scores.axes.immunity, x: 75, y: 40 },
    { id: 'energy', name: 'Énergie', icon: '⚡', score: scores.axes.mitochondria, x: 50, y: 70 },
  ]

  return (
    <div className="relative glass rounded-3xl p-8 overflow-hidden">
      {/* Titre */}
      <h3 className="text-2xl font-bold gradient-text mb-6 text-center">Scanner Corporel</h3>

      {/* Grille de fond style scanner */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(6, 182, 212, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6, 182, 212, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
        }} />
      </div>

      {/* Corps SVG avec points interactifs */}
      <div className="relative h-[500px] mx-auto max-w-md">
        {/* Silhouette du corps */}
        <svg viewBox="0 0 100 120" className="w-full h-full absolute inset-0">
          {/* Contour du corps humain simplifié */}
          <path
            d="M50 5
               C60 5 65 15 65 20
               C65 25 60 28 55 30
               L58 35 L70 40 L80 45 L85 55 L80 55 L70 50 L60 48
               L62 60 L65 80 L68 100 L60 105 L55 100 L50 90
               L45 100 L40 105 L32 100 L35 80 L38 60 L40 48
               L30 50 L20 55 L15 55 L20 45 L30 40 L42 35 L45 30
               C40 28 35 25 35 20
               C35 15 40 5 50 5"
            fill="none"
            stroke="rgba(6, 182, 212, 0.4)"
            strokeWidth="0.5"
          />
          {/* Ligne de scan animée */}
          <motion.line
            x1="10" y1="0"
            x2="90" y2="0"
            stroke="rgba(6, 182, 212, 0.8)"
            strokeWidth="2"
            initial={{ y1: 0, y2: 0 }}
            animate={{ y1: [0, 120, 0], y2: [0, 120, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          />
        </svg>

        {/* Points interactifs */}
        {systems.map((system, index) => (
          <motion.div
            key={system.id}
            className="absolute cursor-pointer"
            style={{ left: `${system.x}%`, top: `${system.y}%`, transform: 'translate(-50%, -50%)' }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            onMouseEnter={() => setActiveSystem(system.id)}
            onMouseLeave={() => setActiveSystem(null)}
          >
            {/* Cercle pulsant */}
            <motion.div
              className={`absolute inset-0 rounded-full ${
                system.score >= 70 ? 'bg-green-400' : system.score >= 50 ? 'bg-yellow-400' : 'bg-red-400'
              }`}
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ width: 40, height: 40, marginLeft: -20, marginTop: -20 }}
            />

            {/* Point central */}
            <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center text-lg
              ${system.score >= 70 ? 'bg-green-500/80' : system.score >= 50 ? 'bg-yellow-500/80' : 'bg-red-500/80'}
              border-2 border-white/30 shadow-lg`}
            >
              {system.icon}
            </div>

            {/* Tooltip */}
            <AnimatePresence>
              {activeSystem === system.id && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.9 }}
                  className="absolute left-1/2 -translate-x-1/2 top-full mt-2 z-50 whitespace-nowrap"
                >
                  <div className="glass rounded-lg px-4 py-2 shadow-xl border border-white/10">
                    <p className="font-bold text-light">{system.name}</p>
                    <p className={`text-lg font-bold ${
                      system.score >= 70 ? 'text-green-400' : system.score >= 50 ? 'text-yellow-400' : 'text-red-400'
                    }`}>
                      {system.score}%
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// Composant Graphique Radar
function RadarChart({ scores }: { scores: AuditScores }) {
  const categories = [
    { key: 'neurotransmitters', label: 'Neuro', score: scores.categories.neurotransmitters },
    { key: 'hormones', label: 'Hormones', score: scores.categories.hormones },
    { key: 'metabolism', label: 'Métabo', score: scores.categories.metabolism },
    { key: 'digestion', label: 'Digestion', score: scores.categories.digestion },
    { key: 'inflammation', label: 'Inflam.', score: scores.categories.inflammation },
    { key: 'sleep', label: 'Sommeil', score: scores.categories.sleep },
    { key: 'stress', label: 'Stress', score: scores.categories.stress },
    { key: 'nutrition', label: 'Nutrition', score: scores.categories.nutrition },
    { key: 'biomechanics', label: 'Biomeca', score: scores.categories.biomechanics },
    { key: 'cognition', label: 'Cognition', score: scores.categories.cognition },
  ]

  const centerX = 150
  const centerY = 150
  const maxRadius = 120

  const getPoint = (index: number, value: number) => {
    const angle = (index / categories.length) * 2 * Math.PI - Math.PI / 2
    const radius = (value / 100) * maxRadius
    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    }
  }

  const polygonPoints = categories
    .map((cat, i) => {
      const point = getPoint(i, cat.score)
      return `${point.x},${point.y}`
    })
    .join(' ')

  return (
    <div className="glass rounded-3xl p-6">
      <h3 className="text-xl font-bold gradient-text mb-4 text-center">Profil Métabolique</h3>
      <svg viewBox="0 0 300 300" className="w-full max-w-md mx-auto">
        {/* Cercles de fond */}
        {[20, 40, 60, 80, 100].map((level) => (
          <circle
            key={level}
            cx={centerX}
            cy={centerY}
            r={(level / 100) * maxRadius}
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="1"
          />
        ))}

        {/* Lignes radiales */}
        {categories.map((_, i) => {
          const point = getPoint(i, 100)
          return (
            <line
              key={i}
              x1={centerX}
              y1={centerY}
              x2={point.x}
              y2={point.y}
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="1"
            />
          )
        })}

        {/* Polygone des scores */}
        <motion.polygon
          points={polygonPoints}
          fill="url(#radarGradient)"
          stroke="rgba(6, 182, 212, 0.8)"
          strokeWidth="2"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />

        {/* Points sur le polygone */}
        {categories.map((cat, i) => {
          const point = getPoint(i, cat.score)
          return (
            <motion.circle
              key={cat.key}
              cx={point.x}
              cy={point.y}
              r="6"
              fill="rgba(6, 182, 212, 1)"
              stroke="white"
              strokeWidth="2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.1 }}
            />
          )
        })}

        {/* Labels */}
        {categories.map((cat, i) => {
          const labelPoint = getPoint(i, 115)
          return (
            <text
              key={cat.key}
              x={labelPoint.x}
              y={labelPoint.y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-light/70 text-xs font-medium"
            >
              {cat.label}
            </text>
          )
        })}

        <defs>
          <linearGradient id="radarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(6, 182, 212, 0.4)" />
            <stop offset="100%" stopColor="rgba(168, 85, 247, 0.4)" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

// Composant Alertes Médicales
function MedicalAlerts({ aiAnalysis }: { aiAnalysis: AuditData['aiAnalysis'] }) {
  if (!aiAnalysis) return null

  return (
    <div className="glass rounded-3xl p-6">
      <h3 className="text-xl font-bold gradient-text mb-6 flex items-center gap-2">
        <span>🚨</span> Alertes & Priorités
      </h3>

      {/* Blocages critiques */}
      {aiAnalysis.topBlockages && aiAnalysis.topBlockages.length > 0 && (
        <div className="mb-6">
          <h4 className="text-red-400 font-semibold mb-3 flex items-center gap-2">
            <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
            Blocages à traiter en priorité
          </h4>
          <div className="space-y-2">
            {aiAnalysis.topBlockages.map((blockage, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-sm"
              >
                <span className="text-red-300">{blockage}</span>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Points forts */}
      {aiAnalysis.topStrengths && aiAnalysis.topStrengths.length > 0 && (
        <div className="mb-6">
          <h4 className="text-green-400 font-semibold mb-3 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-400 rounded-full" />
            Points forts à maintenir
          </h4>
          <div className="space-y-2">
            {aiAnalysis.topStrengths.map((strength, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 text-sm"
              >
                <span className="text-green-300">{strength}</span>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Avertissements */}
      {aiAnalysis.warnings && aiAnalysis.warnings.length > 0 && (
        <div>
          <h4 className="text-yellow-400 font-semibold mb-3 flex items-center gap-2">
            <span className="w-2 h-2 bg-yellow-400 rounded-full" />
            Attention particulière
          </h4>
          <div className="space-y-2">
            {aiAnalysis.warnings.map((warning, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3 text-sm"
              >
                <span className="text-yellow-300">{warning}</span>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// Composant principal du Dashboard
export default function AuditDetailPage({
  params,
}: {
  params: Promise<{ auditId: string }>
}) {
  const [audit, setAudit] = useState<AuditData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'overview' | 'details' | 'plan'>('overview')

  useEffect(() => {
    const loadAudit = async () => {
      try {
        const { auditId } = await params
        const response = await fetch(`/api/audit/${auditId}`)
        if (!response.ok) throw new Error('Audit non trouvé')
        const data = await response.json()
        setAudit(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur inconnue')
      } finally {
        setLoading(false)
      }
    }
    loadAudit()
  }, [params])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <BackToHomeButton />
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="relative w-32 h-32 mx-auto mb-8">
            {/* ADN animé pendant le chargement */}
            <motion.div
              className="absolute inset-0"
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            >
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {[...Array(8)].map((_, i) => (
                  <motion.circle
                    key={i}
                    cx={50 + 35 * Math.cos((i / 8) * Math.PI * 2)}
                    cy={50 + 35 * Math.sin((i / 8) * Math.PI * 2)}
                    r="6"
                    fill={i % 2 === 0 ? '#06b6d4' : '#a855f7'}
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                  />
                ))}
              </svg>
            </motion.div>
          </div>
          <h2 className="text-2xl font-bold gradient-text">Chargement de votre audit...</h2>
        </motion.div>
      </div>
    )
  }

  if (error || !audit) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <BackToHomeButton />
        <div className="glass gradient-border rounded-3xl p-12 text-center max-w-md">
          <div className="text-6xl mb-6">❌</div>
          <h1 className="text-3xl font-bold text-red-400 mb-4">Erreur</h1>
          <p className="text-light/60 mb-6">{error || 'Audit non trouvé'}</p>
          <Link href="/dashboard" className="btn-primary px-8 py-3 inline-block">
            Retour au dashboard
          </Link>
        </div>
      </div>
    )
  }

  // Données de démonstration si pas de scores
  const defaultScores: AuditScores = {
    overall: 67,
    axes: {
      dopamine: 58, serotonin: 72, gaba: 65, acetylcholine: 70,
      cortisol: 45, testosterone: 78, estrogen: 68, thyroid: 62,
      insulin: 55, growth_hormone: 74, melatonin: 60, inflammation: 52,
      gut_health: 68, liver_detox: 71, cellular_energy: 63, mitochondria: 66,
      cardiovascular: 75, immunity: 69, hydration: 58, micronutrients: 64
    },
    categories: {
      neurotransmitters: 66, hormones: 70, metabolism: 59, digestion: 68,
      inflammation: 52, sleep: 60, stress: 45, nutrition: 64,
      biomechanics: 72, cognition: 68
    }
  }

  const scores = audit.scores || defaultScores

  // Processing state
  if (audit.status === 'PROCESSING') {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <BackToHomeButton />
        <motion.div
          className="glass gradient-border rounded-3xl p-12 text-center max-w-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="relative w-40 h-40 mx-auto mb-8">
            {/* Scanner animation */}
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-cyan-400/30"
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.2, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              className="absolute inset-4 rounded-full border-4 border-purple-400/30"
              animate={{ scale: [1.1, 0.9, 1.1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-6xl">🧬</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold gradient-text mb-4">
            Analyse en cours...
          </h1>
          <p className="text-light/60 mb-6">
            Notre IA analyse vos 126 réponses sur 13 domaines de santé.
          </p>
          <div className="space-y-2 text-left text-sm text-light/50">
            <motion.div
              className="flex items-center gap-2"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <span className="text-green-400">✓</span> Neurotransmetteurs analysés
            </motion.div>
            <motion.div
              className="flex items-center gap-2"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
            >
              <span className="text-green-400">✓</span> Profil hormonal calculé
            </motion.div>
            <motion.div
              className="flex items-center gap-2"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
            >
              <span className="spinner w-4 h-4" /> Génération du rapport...
            </motion.div>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8 px-4 bg-gradient-to-br from-dark via-dark to-dark/95">
      <BackToHomeButton />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <Link
                href="/dashboard"
                className="text-light/50 hover:text-cyan-400 transition-colors text-sm mb-2 inline-block"
              >
                ← Retour au dashboard
              </Link>
              <h1 className="text-4xl md:text-5xl font-bold">
                <span className="gradient-text">Audit Métabolique</span>
              </h1>
              <p className="text-light/60 mt-2">
                Généré le {new Date(audit.createdAt).toLocaleDateString('fr-FR', {
                  day: 'numeric', month: 'long', year: 'numeric'
                })}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className={`text-sm font-bold px-4 py-2 rounded-full ${
                audit.type === 'PREMIUM' || audit.type === 'ELITE'
                  ? 'bg-gradient-to-r from-cyan-400 to-purple-400 text-dark'
                  : 'bg-light/10 text-light'
              }`}>
                {audit.type === 'ELITE' ? '👑 Elite' : audit.type === 'PREMIUM' ? '💎 Premium' : '🎁 Gratuit'}
              </span>
              <button className="btn-secondary px-4 py-2 text-sm">
                📄 Télécharger PDF
              </button>
            </div>
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {[
            { id: 'overview', label: 'Vue d\'ensemble', icon: '📊' },
            { id: 'details', label: 'Analyse détaillée', icon: '🔬' },
            { id: 'plan', label: 'Plan 90 jours', icon: '📋' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                  : 'glass hover:bg-white/10 text-light/70'
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content based on active tab */}
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Score Global + Scanner */}
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Score principal */}
                <div className="glass gradient-border rounded-3xl p-8">
                  <h3 className="text-xl font-bold text-center mb-8">Score Métabolique Global</h3>
                  <div className="flex justify-center mb-8">
                    <AnimatedScoreCircle score={scores.overall} label="" size={200} strokeWidth={12} />
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="glass rounded-xl p-4">
                      <div className="text-3xl font-bold text-cyan-400">{scores.overall >= 70 ? 'A' : scores.overall >= 50 ? 'B' : 'C'}</div>
                      <p className="text-sm text-light/60">Grade</p>
                    </div>
                    <div className="glass rounded-xl p-4">
                      <div className="text-3xl font-bold text-purple-400">
                        {scores.overall >= 70 ? 'Optimal' : scores.overall >= 50 ? 'Moyen' : 'Critique'}
                      </div>
                      <p className="text-sm text-light/60">Statut</p>
                    </div>
                  </div>
                </div>

                {/* Scanner corporel */}
                <InteractiveBodyScan scores={scores} />
              </div>

              {/* Graphique Radar */}
              <RadarChart scores={scores} />

              {/* Scores par catégorie */}
              <div className="glass rounded-3xl p-8">
                <h3 className="text-2xl font-bold gradient-text mb-6">Scores par Système</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <MedicalProgressBar value={scores.categories.neurotransmitters} label="Neurotransmetteurs" icon="🧠" description="Dopamine, Sérotonine, GABA" />
                  <MedicalProgressBar value={scores.categories.hormones} label="Hormones" icon="⚗️" description="Thyroïde, Cortisol, Testostérone" />
                  <MedicalProgressBar value={scores.categories.metabolism} label="Métabolisme" icon="🔥" description="Insuline, Énergie cellulaire" />
                  <MedicalProgressBar value={scores.categories.digestion} label="Digestion" icon="🦠" description="Microbiote, Absorption" />
                  <MedicalProgressBar value={scores.categories.inflammation} label="Inflammation" icon="🔴" description="Marqueurs inflammatoires" />
                  <MedicalProgressBar value={scores.categories.sleep} label="Sommeil" icon="😴" description="Qualité, Récupération" />
                  <MedicalProgressBar value={scores.categories.stress} label="Gestion du Stress" icon="🧘" description="Résilience, Cortisol" />
                  <MedicalProgressBar value={scores.categories.nutrition} label="Nutrition" icon="🥗" description="Micronutriments, Hydratation" />
                  <MedicalProgressBar value={scores.categories.biomechanics} label="Biomécanique" icon="💪" description="Mobilité, Posture" />
                  <MedicalProgressBar value={scores.categories.cognition} label="Cognition" icon="🎯" description="Focus, Mémoire" />
                </div>
              </div>

              {/* Alertes */}
              <MedicalAlerts aiAnalysis={audit.aiAnalysis} />
            </motion.div>
          )}

          {activeTab === 'details' && (
            <motion.div
              key="details"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="glass gradient-border rounded-3xl overflow-hidden">
                {audit.type === 'GRATUIT' ? (
                  <div className="p-12 text-center">
                    <div className="text-6xl mb-6">🔒</div>
                    <h2 className="text-3xl font-bold gradient-text mb-4">
                      Analyse Complète Verrouillée
                    </h2>
                    <p className="text-light/60 mb-8 max-w-md mx-auto">
                      Débloquez l'analyse détaillée de vos 20+ axes métaboliques avec le plan Premium ou Elite.
                    </p>
                    <Link
                      href="/audit-complet/checkout"
                      className="btn-primary px-8 py-4 inline-block"
                    >
                      Débloquer - À partir de 79€
                    </Link>
                  </div>
                ) : (
                  <div
                    className="audit-content p-8 prose prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: audit.htmlPremium || audit.htmlFree || '' }}
                  />
                )}
              </div>
            </motion.div>
          )}

          {activeTab === 'plan' && (
            <motion.div
              key="plan"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {audit.type === 'GRATUIT' ? (
                <div className="glass gradient-border rounded-3xl p-12 text-center">
                  <div className="text-6xl mb-6">📋</div>
                  <h2 className="text-3xl font-bold gradient-text mb-4">
                    Plan Personnalisé 90 Jours
                  </h2>
                  <p className="text-light/60 mb-8 max-w-md mx-auto">
                    Obtenez votre plan d'action personnalisé basé sur vos résultats d'analyse.
                  </p>
                  <Link
                    href="/audit-complet/checkout"
                    className="btn-primary px-8 py-4 inline-block"
                  >
                    Obtenir mon plan - 79€
                  </Link>
                </div>
              ) : (
                <>
                  {/* Timeline du plan */}
                  <div className="glass rounded-3xl p-8">
                    <h3 className="text-2xl font-bold gradient-text mb-8 text-center">
                      Votre Plan de Transformation 90 Jours
                    </h3>
                    <div className="space-y-6">
                      {[
                        { phase: 1, title: 'Phase de Reset', duration: 'Jours 1-30', focus: 'Détox & Équilibre', color: 'cyan' },
                        { phase: 2, title: 'Phase d\'Optimisation', duration: 'Jours 31-60', focus: 'Performance & Énergie', color: 'purple' },
                        { phase: 3, title: 'Phase de Consolidation', duration: 'Jours 61-90', focus: 'Habitudes & Maintenance', color: 'green' },
                      ].map((phase, i) => (
                        <motion.div
                          key={phase.phase}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.2 }}
                          className="glass rounded-2xl p-6 border-l-4 border-cyan-400"
                        >
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <span className="text-sm text-light/50">{phase.duration}</span>
                              <h4 className="text-xl font-bold">{phase.title}</h4>
                            </div>
                            <span className="text-3xl">
                              {phase.phase === 1 ? '🔄' : phase.phase === 2 ? '⚡' : '✨'}
                            </span>
                          </div>
                          <p className="text-light/70">Focus: {phase.focus}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Recommandations */}
                  {audit.aiAnalysis?.recommendations && (
                    <div className="glass rounded-3xl p-8">
                      <h3 className="text-2xl font-bold gradient-text mb-6">
                        Recommandations Personnalisées
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {audit.aiAnalysis.recommendations.map((rec, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="glass rounded-xl p-4 flex items-start gap-3"
                          >
                            <span className="text-cyan-400 text-xl">✓</span>
                            <p className="text-light/80">{rec}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA Upgrade pour gratuit */}
        {audit.type === 'GRATUIT' && (
          <motion.div
            className="mt-12 glass gradient-border rounded-3xl p-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-3xl font-bold gradient-text mb-4">
              Débloquer l'Audit Complet
            </h2>
            <p className="text-light/70 mb-6 max-w-xl mx-auto">
              Accédez à l'analyse complète de vos 20+ axes métaboliques + Plan personnalisé 90 jours
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/audit-complet/checkout"
                className="btn-primary px-8 py-4 inline-block"
              >
                💎 Premium - 79€
              </Link>
              <Link
                href="/audit-complet/checkout"
                className="btn-secondary px-8 py-4 inline-block"
              >
                👑 Elite - 129€/an
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
