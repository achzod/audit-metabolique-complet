'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useTransform, useMotionValue, useSpring, animate } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { ArrowRight, Brain, Heart, Activity, Moon, Dumbbell, Target, Check, X, Crown, Sparkles, RefreshCw, Flame, Beaker, Clock, Apple, Droplets, Zap, Move, Waves } from 'lucide-react'
import Header from '@/components/Header'

// ============================================
// ANIMATED DNA HELIX - 3D ROTATING
// ============================================
function DNAHelix() {
  return (
    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[400px] h-[600px] opacity-30 pointer-events-none hidden lg:block">
      <svg viewBox="0 0 200 400" className="w-full h-full">
        <defs>
          <linearGradient id="dnaGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#5EECC5" />
            <stop offset="100%" stopColor="#9990EA" />
          </linearGradient>
          <linearGradient id="dnaGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF6B9D" />
            <stop offset="100%" stopColor="#9990EA" />
          </linearGradient>
        </defs>

        {/* DNA Double Helix Animation */}
        {Array.from({ length: 20 }).map((_, i) => {
          const y = i * 20
          const delay = i * 0.1
          return (
            <g key={i}>
              {/* Left strand */}
              <motion.circle
                cx="60"
                cy={y}
                r="6"
                fill="url(#dnaGradient1)"
                animate={{
                  cx: [60, 140, 60],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 3,
                  delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              {/* Right strand */}
              <motion.circle
                cx="140"
                cy={y}
                r="6"
                fill="url(#dnaGradient2)"
                animate={{
                  cx: [140, 60, 140],
                  opacity: [1, 0.3, 1],
                }}
                transition={{
                  duration: 3,
                  delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              {/* Connecting bar */}
              <motion.line
                y1={y}
                y2={y}
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="2"
                animate={{
                  x1: [60, 140, 60],
                  x2: [140, 60, 140],
                }}
                transition={{
                  duration: 3,
                  delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </g>
          )
        })}
      </svg>
    </div>
  )
}

// ============================================
// ANIMATED HUMAN BODY VISUALIZATION
// ============================================
function HumanBodyVisualization() {
  const [activeSystem, setActiveSystem] = useState(0)
  const systems = [
    { name: 'Métabolisme', color: '#5EECC5', points: [[100, 120], [100, 180], [85, 150], [115, 150]] },
    { name: 'Hormones', color: '#9990EA', points: [[100, 60], [100, 100], [80, 80], [120, 80]] },
    { name: 'Biomécanique', color: '#FF6B9D', points: [[70, 120], [130, 120], [60, 200], [140, 200], [100, 180], [70, 280], [130, 280]] },
    { name: 'Cerveau', color: '#5EECC5', points: [[100, 35]] },
    { name: 'Digestion', color: '#9990EA', points: [[100, 160], [90, 180], [110, 180]] },
    { name: 'Neurotransmetteurs', color: '#FF6B9D', points: [[100, 45], [85, 40], [115, 40]] },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSystem((prev) => (prev + 1) % systems.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[350px] h-[500px] opacity-40 pointer-events-none hidden lg:block">
      <svg viewBox="0 0 200 350" className="w-full h-full">
        {/* Human silhouette */}
        <motion.path
          d="M100 20
             C120 20 130 40 130 50
             C130 60 120 70 100 70
             C80 70 70 60 70 50
             C70 40 80 20 100 20 Z
             M100 75
             L100 180
             M100 100 L60 150
             M100 100 L140 150
             M100 180 L70 280
             M100 180 L130 280"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />

        {/* Active system points */}
        {systems[activeSystem].points.map((point, i) => (
          <motion.g key={i}>
            <motion.circle
              cx={point[0]}
              cy={point[1]}
              r="8"
              fill={systems[activeSystem].color}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 1.5, 1],
                opacity: [0, 1, 0.8],
              }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            />
            <motion.circle
              cx={point[0]}
              cy={point[1]}
              r="15"
              fill="none"
              stroke={systems[activeSystem].color}
              strokeWidth="2"
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 2, 2.5],
                opacity: [0, 0.5, 0],
              }}
              transition={{ duration: 1.5, delay: i * 0.1, repeat: Infinity }}
            />
          </motion.g>
        ))}

        {/* System name */}
        <motion.text
          x="100"
          y="320"
          textAnchor="middle"
          fill={systems[activeSystem].color}
          fontSize="14"
          fontWeight="bold"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          key={activeSystem}
        >
          {systems[activeSystem].name}
        </motion.text>
      </svg>
    </div>
  )
}

// ============================================
// FLOATING PARTICLES
// ============================================
// Pre-generate particle positions to avoid Math.random() during render
const particleData = Array.from({ length: 50 }).map((_, i) => ({
  left: ((i * 17) % 100), // Deterministic pseudo-random distribution
  top: ((i * 23) % 100),
  duration: 3 + (i % 3),
  delay: (i % 5) * 0.4,
  color: ['#5EECC5', '#9990EA', '#FF6B9D'][i % 3],
}))

function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particleData.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            background: particle.color,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
          }}
        />
      ))}
    </div>
  )
}

// ============================================
// ANIMATED COUNTER
// ============================================
function AnimatedNumber({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [isVisible])

  useEffect(() => {
    if (!isVisible) return
    let startTime: number
    const duration = 2000
    const animateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(eased * value))
      if (progress < 1) requestAnimationFrame(animateCount)
    }
    requestAnimationFrame(animateCount)
  }, [value, isVisible])

  return <div ref={ref} className="tabular-nums">{count}{suffix}</div>
}

// ============================================
// GLOW CARD WITH MOUSE TRACKING
// ============================================
function GlowCard({ children, className, glowColor = '#5EECC5' }: { children: React.ReactNode; className?: string; glowColor?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={(e) => {
        if (!ref.current) return
        const rect = ref.current.getBoundingClientRect()
        setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
    >
      {isHovered && (
        <div
          className="absolute pointer-events-none transition-opacity duration-300"
          style={{
            left: mousePos.x - 150,
            top: mousePos.y - 150,
            width: 300,
            height: 300,
            background: `radial-gradient(circle, ${glowColor}30 0%, transparent 70%)`,
          }}
        />
      )}
      {children}
    </motion.div>
  )
}

// ============================================
// PULSE RING ANIMATION
// ============================================
function PulseRings() {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#5EECC5]/20"
          style={{ width: 200 + i * 150, height: 200 + i * 150 }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 3,
            delay: i * 0.5,
            repeat: Infinity,
          }}
        />
      ))}
    </div>
  )
}

// ============================================
// MAIN COMPONENT
// ============================================
export default function LandingPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 100])

  // 13 domaines
  const domains = [
    { icon: Target, label: 'Profil de Base', color: '#5EECC5' },
    { icon: Activity, label: 'Composition Corporelle', color: '#9990EA' },
    { icon: Flame, label: 'Métabolisme & Énergie', color: '#FF6B9D' },
    { icon: Apple, label: 'Nutrition & Tracking', color: '#5EECC5' },
    { icon: Beaker, label: 'Digestion & Microbiome', color: '#9990EA' },
    { icon: Dumbbell, label: 'Activité & Performance', color: '#FF6B9D' },
    { icon: Moon, label: 'Sommeil & Récupération', color: '#5EECC5' },
    { icon: Heart, label: 'HRV & Cardiaque', color: '#9990EA' },
    { icon: Droplets, label: 'Analyses & Biomarqueurs', color: '#FF6B9D' },
    { icon: Brain, label: 'Hormones & Stress', color: '#5EECC5' },
    { icon: Clock, label: 'Lifestyle & Substances', color: '#9990EA' },
    { icon: Move, label: 'Biomécanique & Mobilité', color: '#FF6B9D' },
    { icon: Waves, label: 'Neurotransmetteurs', color: '#5EECC5' },
  ]

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white overflow-hidden">
      {/* Header with Connexion button */}
      <Header />

      {/* ============================================ */}
      {/* HERO SECTION */}
      {/* ============================================ */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#151518] via-[#0A0A0B] to-[#0A0A0B]" />
        <FloatingParticles />
        <PulseRings />
        <DNAHelix />
        <HumanBodyVisualization />

        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
          className="relative z-10 max-w-6xl mx-auto px-4 py-20 text-center"
        >
          {/* Logo AchZod */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Image
              src="https://cdn.prod.website-files.com/5fd0a9c4883524725ec72282/5fd26bf8a848a19741305727_monogram-white.svg"
              alt="AchZod Coaching"
              width={80}
              height={80}
              className="mx-auto"
            />
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 mb-8 rounded-full bg-gradient-to-r from-[#5EECC5]/10 to-[#9990EA]/10 border border-[#5EECC5]/30"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Zap className="w-4 h-4 text-[#5EECC5]" />
            </motion.div>
            <span className="text-sm font-medium bg-gradient-to-r from-[#5EECC5] to-[#9990EA] bg-clip-text text-transparent">
              Diagnostic Biohacking Complet
            </span>
          </motion.div>

          {/* Main Heading with animated gradient */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight"
          >
            <motion.span
              className="block bg-gradient-to-r from-[#5EECC5] via-[#9990EA] to-[#FF6B9D] bg-clip-text text-transparent bg-[length:200%_auto]"
              animate={{ backgroundPosition: ['0% center', '200% center'] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            >
              NEUROCORE
            </motion.span>
            <span className="block text-white">360°</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12"
          >
            Hormones · Métabolisme · Biohacking · Biomécanique · Neurotransmetteurs
            <br />
            <span className="text-white font-semibold">126 questions</span> · <span className="text-white font-semibold">13 domaines</span> · <span className="text-white font-semibold">Rapport 20+ pages</span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Link
              href="/audit-complet/questionnaire"
              className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-2xl font-bold text-[#0A0A0B] text-lg overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#5EECC5] via-[#9990EA] to-[#5EECC5] bg-[length:200%_auto]"
                animate={{ backgroundPosition: ['0% center', '200% center'] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
              <span className="relative z-10">Commencer gratuitement</span>
              <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <a
              href="#pricing"
              className="px-8 py-4 rounded-2xl border border-gray-700 text-gray-400 font-semibold hover:bg-white/5 hover:border-[#5EECC5]/50 transition-all"
            >
              Voir les offres
            </a>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
          >
            {[
              { value: 126, suffix: '', label: 'Questions', color: '#5EECC5' },
              { value: 13, suffix: '', label: 'Domaines', color: '#9990EA' },
              { value: 20, suffix: '+', label: 'Pages', color: '#FF6B9D' },
              { value: 90, suffix: 'J', label: 'Plan d\'action', color: '#5EECC5' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + i * 0.1 }}
                className="relative p-4 rounded-2xl bg-white/5 border border-white/10"
              >
                <div className="text-4xl md:text-5xl font-black" style={{ color: stat.color }}>
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-[#5EECC5]"
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* ============================================ */}
      {/* DOMAINS SECTION */}
      {/* ============================================ */}
      <section className="py-24 px-4 bg-[#0F0F10]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.span
              className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-[#9990EA]/10 text-[#9990EA] border border-[#9990EA]/30 mb-6"
              whileHover={{ scale: 1.05 }}
            >
              Analyse complète
            </motion.span>
            <h2 className="text-4xl md:text-6xl font-black mb-6">
              <span className="text-white">13 domaines </span>
              <span className="bg-gradient-to-r from-[#9990EA] to-[#FF6B9D] bg-clip-text text-transparent">d'expertise</span>
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Une cartographie complète de ta physiologie pour des recommandations ultra-personnalisées
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {domains.map((domain, i) => (
              <GlowCard
                key={domain.label}
                className="group p-5 rounded-2xl bg-[#151518] border border-white/5 cursor-default"
                glowColor={domain.color}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  viewport={{ once: true }}
                  className="relative z-10"
                >
                  <motion.div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: `${domain.color}15` }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <domain.icon className="w-6 h-6" style={{ color: domain.color }} />
                  </motion.div>
                  <div className="font-semibold text-white/90">{domain.label}</div>
                </motion.div>
              </GlowCard>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* HOW IT WORKS */}
      {/* ============================================ */}
      <section className="py-24 px-4 bg-[#0A0A0B] relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#5EECC5]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#9990EA]/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-[#5EECC5]/10 text-[#5EECC5] border border-[#5EECC5]/30 mb-6">
              Processus simplifié
            </span>
            <h2 className="text-4xl md:text-6xl font-black mb-6">
              <span className="text-white">3 étapes vers ton </span>
              <span className="bg-gradient-to-r from-[#5EECC5] to-[#9990EA] bg-clip-text text-transparent">audit</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Réponds au questionnaire',
                desc: '126 questions couvrant 13 domaines : métabolisme, hormones, neurotransmetteurs, biomécanique, photos posturales...',
                badge: '20 min',
                color: '#5EECC5',
                icon: '🧬'
              },
              {
                step: '02',
                title: 'Choisis ton offre',
                desc: 'Gratuit, Premium 79€ ou Elite 129€/an avec 4 analyses complètes',
                badge: '3 options',
                color: '#9990EA',
                icon: '💎'
              },
              {
                step: '03',
                title: 'Reçois ton audit',
                desc: 'Rapport médical ultra-détaillé de 20+ pages. Un médecin serait choqué par la précision.',
                badge: 'Instantané',
                color: '#FF6B9D',
                icon: '📊'
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                viewport={{ once: true }}
                className="relative p-8 rounded-3xl bg-[#151518] border border-white/5 overflow-hidden group"
              >
                <motion.div
                  className="absolute -right-8 -top-8 text-[120px] opacity-5 group-hover:opacity-10 transition-opacity"
                  whileHover={{ scale: 1.1, rotate: 10 }}
                >
                  {item.icon}
                </motion.div>

                <div
                  className="text-7xl font-black mb-6 opacity-20"
                  style={{ color: item.color }}
                >
                  {item.step}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                <p className="text-gray-500 mb-6">{item.desc}</p>
                <motion.span
                  className="inline-block px-4 py-2 rounded-full text-sm font-medium"
                  style={{ background: `${item.color}15`, color: item.color }}
                  whileHover={{ scale: 1.05 }}
                >
                  {item.badge}
                </motion.span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* PRICING SECTION */}
      {/* ============================================ */}
      <section id="pricing" className="py-24 px-4 bg-[#0F0F10]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-[#FF6B9D]/10 text-[#FF6B9D] border border-[#FF6B9D]/30 mb-6">
              Tarification transparente
            </span>
            <h2 className="text-4xl md:text-6xl font-black mb-6">
              <span className="text-white">Choisis ton </span>
              <span className="bg-gradient-to-r from-[#FF6B9D] to-[#9990EA] bg-clip-text text-transparent">niveau</span>
            </h2>
            <p className="text-lg text-gray-500">Tu décides après avoir rempli le questionnaire</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* GRATUIT */}
            <GlowCard className="p-8 rounded-3xl border border-white/10 bg-[#151518]" glowColor="#5EECC5">
              <div className="relative z-10">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-8 h-8 text-gray-500" />
                  </div>
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Découverte</div>
                  <div className="text-5xl font-black text-white mb-1">Gratuit</div>
                  <div className="text-sm text-gray-600">Pour tester</div>
                </div>

                <ul className="space-y-4 mb-8">
                  {[
                    { included: true, text: 'Résumé Exécutif' },
                    { included: true, text: 'Analyse Anthropométrique' },
                    { included: true, text: 'Profil Métabolique de Base' },
                    { included: true, text: 'Plan d\'Action 30 Jours' },
                    { included: false, text: '9 sections verrouillées' },
                  ].map((feature, i) => (
                    <li key={i} className={`flex items-center gap-3 ${!feature.included ? 'opacity-40' : ''}`}>
                      {feature.included ? (
                        <div className="w-5 h-5 rounded-full bg-[#5EECC5]/20 flex items-center justify-center">
                          <Check className="w-3 h-3 text-[#5EECC5]" />
                        </div>
                      ) : (
                        <X className="w-5 h-5 text-gray-600" />
                      )}
                      <span className="text-sm text-gray-400">{feature.text}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/audit-complet/questionnaire"
                  className="block w-full py-4 rounded-xl border border-white/10 text-center font-semibold text-gray-400 hover:bg-white/5 hover:border-[#5EECC5]/30 transition-all"
                >
                  Commencer gratuitement
                </Link>
              </div>
            </GlowCard>

            {/* PREMIUM */}
            <GlowCard className="p-8 rounded-3xl border-2 border-[#5EECC5]/50 bg-[#151518] md:-mt-4 md:mb-[-16px] relative" glowColor="#5EECC5">
              <motion.div
                className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full bg-gradient-to-r from-[#5EECC5] to-[#9990EA] text-[#0A0A0B] text-xs font-bold"
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ⭐ Le + populaire
              </motion.div>

              <div className="relative z-10">
                <div className="text-center mb-8 mt-4">
                  <div className="w-16 h-16 rounded-2xl bg-[#5EECC5]/20 flex items-center justify-center mx-auto mb-4">
                    <Crown className="w-8 h-8 text-[#5EECC5]" />
                  </div>
                  <div className="text-xs font-semibold text-[#5EECC5] uppercase tracking-wider mb-2">Premium</div>
                  <div className="text-5xl font-black text-white mb-1">79€</div>
                  <div className="text-sm text-gray-600">Paiement unique</div>
                </div>

                <ul className="space-y-4 mb-8">
                  {[
                    '13 sections d\'analyse complètes',
                    'Analyse HRV & Récupération',
                    'Profil Hormonal complet',
                    'Digestion & Microbiome',
                    'Protocole Nutrition détaillé',
                    'Protocole Suppléments',
                    'Feuille de Route 90 Jours',
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#5EECC5]/20 flex items-center justify-center">
                        <Check className="w-3 h-3 text-[#5EECC5]" />
                      </div>
                      <span className="text-sm text-white/80">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/audit-complet/questionnaire"
                  className="block w-full py-4 rounded-xl bg-gradient-to-r from-[#5EECC5] to-[#4DDBB4] text-center font-bold text-[#0A0A0B] hover:opacity-90 transition-all"
                >
                  Choisir Premium
                </Link>
              </div>
            </GlowCard>

            {/* ELITE */}
            <GlowCard className="p-8 rounded-3xl border border-[#9990EA]/30 bg-[#151518] relative" glowColor="#9990EA">
              <div className="absolute -top-3 right-6 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#9990EA] to-[#FF6B9D] text-white text-xs font-bold">
                Best Value
              </div>

              <div className="relative z-10">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-[#9990EA]/20 flex items-center justify-center mx-auto mb-4">
                    <RefreshCw className="w-8 h-8 text-[#9990EA]" />
                  </div>
                  <div className="text-xs font-semibold text-[#9990EA] uppercase tracking-wider mb-2">Elite</div>
                  <div className="text-5xl font-black text-white mb-1">129€</div>
                  <div className="text-sm text-gray-600">Par an • 4 analyses</div>
                </div>

                <ul className="space-y-4 mb-8">
                  {[
                    'Tout le Premium inclus',
                    '4 analyses complètes par an',
                    'Suivi de ta progression',
                    'Compare tes résultats',
                    'Ajuste tes protocoles',
                    'Analyse photos posturales',
                    'Rapport PDF 20+ pages',
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#9990EA]/20 flex items-center justify-center">
                        <Check className="w-3 h-3 text-[#9990EA]" />
                      </div>
                      <span className="text-sm text-white/70">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/audit-complet/questionnaire"
                  className="block w-full py-4 rounded-xl bg-gradient-to-r from-[#9990EA] to-[#8880DA] text-center font-bold text-white hover:opacity-90 transition-all"
                >
                  Choisir Elite
                </Link>
              </div>
            </GlowCard>
          </div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <div className="inline-flex flex-wrap items-center justify-center gap-6 px-8 py-4 rounded-2xl bg-white/5 border border-white/10">
              {[
                { icon: '🔒', text: 'Paiement sécurisé' },
                { icon: '⚡', text: 'Résultats instantanés' },
                { icon: '🎁', text: 'Garantie satisfait' },
              ].map((badge, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-lg">{badge.icon}</span>
                  <span className="text-sm text-gray-400">{badge.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================================ */}
      {/* FINAL CTA */}
      {/* ============================================ */}
      <section className="py-32 px-4 bg-[#0A0A0B] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-[#5EECC5]/5 via-[#9990EA]/5 to-[#FF6B9D]/5 rounded-full blur-3xl" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center relative z-10"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-20 h-20 mx-auto mb-8"
          >
            <Image
              src="https://cdn.prod.website-files.com/5fd0a9c4883524725ec72282/5fd26bf8a848a19741305727_monogram-white.svg"
              alt="AchZod"
              width={80}
              height={80}
            />
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-black mb-6">
            <span className="text-white">Prêt à </span>
            <motion.span
              className="bg-gradient-to-r from-[#5EECC5] via-[#9990EA] to-[#FF6B9D] bg-clip-text text-transparent bg-[length:200%_auto]"
              animate={{ backgroundPosition: ['0% center', '200% center'] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              optimiser
            </motion.span>
            <span className="text-white"> ton corps ?</span>
          </h2>

          <p className="text-xl text-gray-500 mb-12 max-w-2xl mx-auto">
            L'analyse métabolique la plus complète du marché. Un médecin serait choqué par la précision.
          </p>

          <Link
            href="/audit-complet/questionnaire"
            className="group relative inline-flex items-center gap-3 px-12 py-6 rounded-2xl font-bold text-[#0A0A0B] text-xl overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#5EECC5] via-[#9990EA] to-[#5EECC5] bg-[length:200%_auto]"
              animate={{ backgroundPosition: ['0% center', '200% center'] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
            <span className="relative z-10">Commencer mon audit</span>
            <ArrowRight className="relative z-10 w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </Link>

          <p className="text-gray-600 mt-8 text-sm">
            20 minutes · 100% gratuit pour commencer · Résultats immédiats
          </p>
        </motion.div>
      </section>

      {/* ============================================ */}
      {/* FOOTER */}
      {/* ============================================ */}
      <footer className="py-12 px-4 border-t border-white/5 bg-[#0A0A0B]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <Image
                src="https://cdn.prod.website-files.com/5fd0a9c4883524725ec72282/5fd26bf8a848a19741305727_monogram-white.svg"
                alt="AchZod"
                width={40}
                height={40}
              />
              <span className="text-gray-400 font-medium">AchZod Coaching</span>
            </div>

            <div className="text-gray-600 text-sm">
              © 2025 Audit Métabolique Complet
            </div>

            <a href="mailto:coaching@achzodcoaching.com" className="text-gray-500 hover:text-[#5EECC5] transition-colors text-sm">
              coaching@achzodcoaching.com
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
