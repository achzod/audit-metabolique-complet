'use client'

import Link from 'next/link'
import { motion, useScroll, useTransform, useSpring, useMotionValue, useAnimationFrame } from 'framer-motion'
import { useRef, useState, useEffect, useMemo } from 'react'
import { ArrowRight, Zap, Brain, Heart, Activity, Moon, Dumbbell, Target, ChevronDown, Check, X, Crown, Sparkles, RefreshCw, Flame, Dna, Shield, Beaker, Clock, Apple, TrendingUp, Droplets, Wind, Eye, Battery, Atom } from 'lucide-react'

// ============================================
// ANIMATED DNA HELIX COMPONENT
// ============================================
function DNAHelix() {
  return (
    <svg
      className="absolute right-0 top-1/2 -translate-y-1/2 w-[400px] h-[600px] opacity-20"
      viewBox="0 0 200 400"
    >
      <defs>
        <linearGradient id="dnaGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#5EECC5" />
          <stop offset="100%" stopColor="#9990EA" />
        </linearGradient>
        <linearGradient id="dnaGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FF6B9D" />
          <stop offset="100%" stopColor="#5EECC5" />
        </linearGradient>
      </defs>
      {[...Array(20)].map((_, i) => {
        const y = i * 20
        const phase = i * 0.3
        return (
          <g key={i}>
            <motion.circle
              cx={100 + Math.sin(phase) * 40}
              cy={y}
              r="4"
              fill="url(#dnaGradient1)"
              animate={{
                cx: [100 + Math.sin(phase) * 40, 100 + Math.sin(phase + Math.PI) * 40, 100 + Math.sin(phase) * 40],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.05 }}
            />
            <motion.circle
              cx={100 + Math.sin(phase + Math.PI) * 40}
              cy={y}
              r="4"
              fill="url(#dnaGradient2)"
              animate={{
                cx: [100 + Math.sin(phase + Math.PI) * 40, 100 + Math.sin(phase) * 40, 100 + Math.sin(phase + Math.PI) * 40],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.05 }}
            />
            <motion.line
              x1={100 + Math.sin(phase) * 40}
              y1={y}
              x2={100 + Math.sin(phase + Math.PI) * 40}
              y2={y}
              stroke="url(#dnaGradient1)"
              strokeWidth="1"
              strokeOpacity="0.3"
              animate={{
                x1: [100 + Math.sin(phase) * 40, 100 + Math.sin(phase + Math.PI) * 40, 100 + Math.sin(phase) * 40],
                x2: [100 + Math.sin(phase + Math.PI) * 40, 100 + Math.sin(phase) * 40, 100 + Math.sin(phase + Math.PI) * 40],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.05 }}
            />
          </g>
        )
      })}
    </svg>
  )
}

// ============================================
// FLOATING PARTICLES COMPONENT
// ============================================
function FloatingParticles() {
  const particles = useMemo(() =>
    [...Array(30)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
    })), []
  )

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: `radial-gradient(circle, ${p.id % 3 === 0 ? '#5EECC5' : p.id % 3 === 1 ? '#9990EA' : '#FF6B9D'} 0%, transparent 70%)`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.sin(p.id) * 20, 0],
            opacity: [0.3, 0.7, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  )
}

// ============================================
// GLOWING ORB BACKGROUND
// ============================================
function GlowingOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(94,236,197,0.15) 0%, transparent 70%)',
          top: '-20%',
          right: '-10%',
        }}
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(153,144,234,0.12) 0%, transparent 70%)',
          bottom: '-10%',
          left: '-5%',
        }}
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -20, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255,107,157,0.08) 0%, transparent 70%)',
          top: '40%',
          left: '30%',
        }}
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 180, 360],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />
    </div>
  )
}

// ============================================
// NEURAL NETWORK BACKGROUND
// ============================================
function NeuralNetwork() {
  const nodes = useMemo(() =>
    [...Array(12)].map((_, i) => ({
      id: i,
      x: 10 + (i % 4) * 30 + Math.random() * 10,
      y: 20 + Math.floor(i / 4) * 30 + Math.random() * 10,
    })), []
  )

  return (
    <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" preserveAspectRatio="none">
      <defs>
        <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#5EECC5" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#9990EA" stopOpacity="0.5" />
        </linearGradient>
      </defs>
      {nodes.map((node, i) =>
        nodes.slice(i + 1).map((target, j) => {
          if (Math.abs(node.x - target.x) < 35 && Math.abs(node.y - target.y) < 35) {
            return (
              <motion.line
                key={`${i}-${j}`}
                x1={`${node.x}%`}
                y1={`${node.y}%`}
                x2={`${target.x}%`}
                y2={`${target.y}%`}
                stroke="url(#lineGrad)"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: [0, 1, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: i * 0.3 }}
              />
            )
          }
          return null
        })
      )}
      {nodes.map((node) => (
        <motion.circle
          key={node.id}
          cx={`${node.x}%`}
          cy={`${node.y}%`}
          r="4"
          fill="#5EECC5"
          animate={{
            r: [4, 6, 4],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{ duration: 2, repeat: Infinity, delay: node.id * 0.2 }}
        />
      ))}
    </svg>
  )
}

// ============================================
// ANIMATED COUNTER WITH INTERSECTION OBSERVER
// ============================================
function AnimatedNumber({ value, suffix = '', prefix = '' }: { value: number; suffix?: string; prefix?: string }) {
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

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(eased * value))
      if (progress < 1) requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)
  }, [value, isVisible])

  return (
    <div ref={ref} className="tabular-nums">
      {prefix}{count}{suffix}
    </div>
  )
}

// ============================================
// MAGNETIC BUTTON COMPONENT
// ============================================
function MagneticButton({ children, href, className }: { children: React.ReactNode; href: string; className?: string }) {
  const ref = useRef<HTMLAnchorElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 300, damping: 30 })
  const springY = useSpring(y, { stiffness: 300, damping: 30 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set((e.clientX - centerX) * 0.15)
    y.set((e.clientY - centerY) * 0.15)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.a>
  )
}

// ============================================
// GLOW CARD COMPONENT
// ============================================
function GlowCard({ children, className, glowColor = '#5EECC5' }: { children: React.ReactNode; className?: string; glowColor?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -5, transition: { duration: 0.3 } }}
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
// MAIN COMPONENT
// ============================================
export default function LandingPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9])
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 100])

  const domains = [
    { icon: Target, label: 'Profil de Base', color: '#5EECC5' },
    { icon: Activity, label: 'Composition Corporelle', color: '#9990EA' },
    { icon: Flame, label: 'Metabolisme', color: '#FF6B9D' },
    { icon: Apple, label: 'Nutrition', color: '#5EECC5' },
    { icon: Beaker, label: 'Digestion', color: '#9990EA' },
    { icon: Dumbbell, label: 'Performance', color: '#FF6B9D' },
    { icon: Moon, label: 'Sommeil', color: '#5EECC5' },
    { icon: Heart, label: 'HRV & Cardiaque', color: '#9990EA' },
    { icon: Droplets, label: 'Analyses Sanguines', color: '#FF6B9D' },
    { icon: Brain, label: 'Hormones', color: '#5EECC5' },
    { icon: Wind, label: 'Lifestyle', color: '#9990EA' },
    { icon: Shield, label: 'Immunite', color: '#FF6B9D' },
    { icon: Dna, label: 'Detox', color: '#5EECC5' },
    { icon: Clock, label: 'Chronobiologie', color: '#9990EA' },
    { icon: TrendingUp, label: 'Protocoles', color: '#FF6B9D' },
  ]

  return (
    <div className="min-h-screen bg-[#030305] text-white overflow-hidden">

      {/* ============================================ */}
      {/* HERO SECTION */}
      {/* ============================================ */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center">
        <GlowingOrbs />
        <FloatingParticles />
        <DNAHelix />

        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
          className="relative z-10 max-w-6xl mx-auto px-4 py-20 text-center"
        >
          {/* Floating Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 mb-8 rounded-full border border-[#5EECC5]/30 bg-[#5EECC5]/10 backdrop-blur-sm"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Atom className="w-4 h-4 text-[#5EECC5]" />
            </motion.div>
            <span className="text-sm font-medium text-[#5EECC5]">Propulse par Claude Sonnet 4</span>
          </motion.div>

          {/* Main Heading with Gradient */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight"
          >
            <span className="block text-white/90">Audit Metabolique</span>
            <span className="block bg-gradient-to-r from-[#5EECC5] via-[#9990EA] to-[#FF6B9D] bg-clip-text text-transparent">
              Revolutionnaire
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-xl md:text-2xl text-white/60 max-w-3xl mx-auto mb-12"
          >
            L'analyse la plus complete du marche.
            <br />
            <span className="text-white/80 font-semibold">105+ questions</span> • <span className="text-white/80 font-semibold">15 domaines</span> • <span className="text-white/80 font-semibold">IA de pointe</span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <MagneticButton
              href="/audit-complet/questionnaire"
              className="group relative inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[#5EECC5] to-[#3DD4AF] rounded-2xl font-bold text-[#030305] text-lg overflow-hidden"
            >
              <span className="relative z-10">Commencer gratuitement</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#3DD4AF] to-[#5EECC5] opacity-0 group-hover:opacity-100 transition-opacity" />
            </MagneticButton>

            <motion.a
              href="#pricing"
              className="px-8 py-4 rounded-2xl border border-white/20 text-white/80 font-semibold hover:bg-white/5 transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Voir les offres
            </motion.a>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
          >
            {[
              { value: 105, suffix: '+', label: 'Questions', color: '#5EECC5' },
              { value: 15, suffix: '', label: 'Domaines', color: '#9990EA' },
              { value: 21, suffix: '', label: 'Protocoles', color: '#FF6B9D' },
              { value: 90, suffix: 'J', label: 'Feuille de route', color: '#5EECC5' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + i * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-black" style={{ color: stat.color }}>
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm text-white/50 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2"
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1.5 h-1.5 rounded-full bg-[#5EECC5]"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ============================================ */}
      {/* DOMAINS SECTION */}
      {/* ============================================ */}
      <section className="relative py-32 px-4">
        <NeuralNetwork />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.span
              className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-[#9990EA]/20 text-[#9990EA] mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              Analyse complete
            </motion.span>
            <h2 className="text-4xl md:text-6xl font-black mb-6">
              <span className="text-white">15 domaines d'</span>
              <span className="bg-gradient-to-r from-[#9990EA] to-[#FF6B9D] bg-clip-text text-transparent">expertise</span>
            </h2>
            <p className="text-xl text-white/50 max-w-2xl mx-auto">
              Une cartographie complete de ta physiologie pour des recommandations ultra-personnalisees
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {domains.map((domain, i) => (
              <GlowCard
                key={domain.label}
                className="group p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm cursor-default"
                glowColor={domain.color}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  viewport={{ once: true }}
                  className="relative z-10"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                    style={{ background: `${domain.color}20` }}
                  >
                    <domain.icon className="w-6 h-6" style={{ color: domain.color }} />
                  </div>
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
      <section className="py-32 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#5EECC5]/5 to-transparent" />

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-[#5EECC5]/20 text-[#5EECC5] mb-6">
              Processus simplifie
            </span>
            <h2 className="text-4xl md:text-6xl font-black mb-6">
              <span className="text-white">3 etapes vers ton </span>
              <span className="bg-gradient-to-r from-[#5EECC5] to-[#9990EA] bg-clip-text text-transparent">audit</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Reponds au questionnaire',
                desc: '105 questions couvrant 15 domaines : metabolisme, hormones, sommeil, HRV, analyses sanguines...',
                badge: '15 min',
                color: '#5EECC5'
              },
              {
                step: '02',
                title: 'Choisis ton offre',
                desc: 'Decouverte gratuit, Premium 39 euros ou Elite 79 euros avec 4 analyses par an',
                badge: '3 options',
                color: '#9990EA'
              },
              {
                step: '03',
                title: 'Recois ton audit',
                desc: 'Claude Sonnet analyse tes reponses et genere un rapport ultra-personnalise de 15+ pages',
                badge: 'Instantane',
                color: '#FF6B9D'
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm">
                  <div
                    className="text-7xl font-black mb-6 opacity-20"
                    style={{ color: item.color }}
                  >
                    {item.step}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                  <p className="text-white/50 mb-6">{item.desc}</p>
                  <span
                    className="inline-block px-4 py-1.5 rounded-full text-sm font-medium"
                    style={{ background: `${item.color}20`, color: item.color }}
                  >
                    {item.badge}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* PRICING SECTION */}
      {/* ============================================ */}
      <section id="pricing" className="py-32 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#9990EA]/5 to-transparent" />

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-[#FF6B9D]/20 text-[#FF6B9D] mb-6">
              Tarification transparente
            </span>
            <h2 className="text-4xl md:text-6xl font-black mb-6">
              <span className="text-white">Choisis ton </span>
              <span className="bg-gradient-to-r from-[#FF6B9D] to-[#9990EA] bg-clip-text text-transparent">niveau</span>
            </h2>
            <p className="text-xl text-white/50">Tu decides apres avoir rempli le questionnaire</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* FREE */}
            <GlowCard className="p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm" glowColor="#5EECC5">
              <div className="relative z-10">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-8 h-8 text-white/60" />
                  </div>
                  <div className="text-sm font-semibold text-white/40 uppercase tracking-wider mb-2">Decouverte</div>
                  <div className="text-5xl font-black text-white mb-1">Gratuit</div>
                  <div className="text-sm text-white/40">Pour tester</div>
                </div>

                <ul className="space-y-4 mb-8">
                  {[
                    { included: true, text: 'Resume Executif' },
                    { included: true, text: 'Analyse Anthropometrique' },
                    { included: true, text: 'Profil Metabolique de Base' },
                    { included: true, text: 'Plan dAction 30 Jours' },
                    { included: false, text: '11 sections supplementaires' },
                    { included: false, text: 'Protocoles personnalises' },
                  ].map((feature, i) => (
                    <li key={i} className={`flex items-center gap-3 ${!feature.included ? 'opacity-30' : ''}`}>
                      {feature.included ? (
                        <Check className="w-5 h-5 text-[#5EECC5] flex-shrink-0" />
                      ) : (
                        <X className="w-5 h-5 text-white/30 flex-shrink-0" />
                      )}
                      <span className="text-white/70">{feature.text}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/audit-complet/questionnaire"
                  className="block w-full py-4 rounded-xl border border-white/20 text-center font-semibold text-white/80 hover:bg-white/5 transition-all"
                >
                  Commencer gratuitement
                </Link>
              </div>
            </GlowCard>

            {/* PREMIUM - FEATURED */}
            <GlowCard className="p-8 rounded-3xl border-2 border-[#5EECC5]/50 bg-gradient-to-b from-[#5EECC5]/10 to-transparent backdrop-blur-sm md:-mt-4 md:mb-[-16px] relative" glowColor="#5EECC5">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full bg-gradient-to-r from-[#5EECC5] to-[#3DD4AF] text-[#030305] text-sm font-bold">
                Le + populaire
              </div>

              <div className="relative z-10">
                <div className="text-center mb-8 mt-4">
                  <div className="w-16 h-16 rounded-2xl bg-[#5EECC5]/20 flex items-center justify-center mx-auto mb-4">
                    <Crown className="w-8 h-8 text-[#5EECC5]" />
                  </div>
                  <div className="text-sm font-semibold text-[#5EECC5] uppercase tracking-wider mb-2">Premium</div>
                  <div className="flex items-center justify-center gap-3 mb-1">
                    <span className="text-2xl text-white/30 line-through">79&#8364;</span>
                    <span className="text-5xl font-black text-white">39&#8364;</span>
                  </div>
                  <div className="text-sm text-white/40">Paiement unique</div>
                </div>

                <ul className="space-y-4 mb-8">
                  {[
                    '15 sections danalyse completes',
                    'Digestion & Microbiome avance',
                    'Analyse HRV & Recuperation',
                    'Profil Hormonal complet',
                    'Protocole Nutrition detaille',
                    'Protocole Supplements',
                    'Feuille de Route 90 Jours',
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-[#5EECC5] flex-shrink-0" />
                      <span className="text-white/80">{feature}</span>
                    </li>
                  ))}
                </ul>

                <MagneticButton
                  href="/audit-complet/questionnaire"
                  className="block w-full py-4 rounded-xl bg-gradient-to-r from-[#5EECC5] to-[#3DD4AF] text-center font-bold text-[#030305]"
                >
                  Choisir Premium
                </MagneticButton>
              </div>
            </GlowCard>

            {/* ELITE */}
            <GlowCard className="p-8 rounded-3xl border border-[#9990EA]/30 bg-white/5 backdrop-blur-sm relative" glowColor="#9990EA">
              <div className="absolute -top-3 right-6 px-4 py-1.5 rounded-full bg-[#9990EA] text-white text-xs font-bold">
                Best Value
              </div>

              <div className="relative z-10">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-[#9990EA]/20 flex items-center justify-center mx-auto mb-4">
                    <RefreshCw className="w-8 h-8 text-[#9990EA]" />
                  </div>
                  <div className="text-sm font-semibold text-[#9990EA] uppercase tracking-wider mb-2">Elite</div>
                  <div className="flex items-center justify-center gap-3 mb-1">
                    <span className="text-2xl text-white/30 line-through">156&#8364;</span>
                    <span className="text-5xl font-black text-white">79&#8364;</span>
                  </div>
                  <div className="text-sm text-white/40">4 analyses / an</div>
                </div>

                <ul className="space-y-4 mb-8">
                  {[
                    'Tout le Premium inclus',
                    '4 analyses par an (1/trimestre)',
                    'Suivi de ta progression',
                    'Compare tes resultats',
                    'Ajuste tes protocoles',
                    'Support prioritaire',
                    'Economise 77&#8364;/an',
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-[#9990EA] flex-shrink-0" />
                      <span className="text-white/70" dangerouslySetInnerHTML={{ __html: feature }} />
                    </li>
                  ))}
                </ul>

                <Link
                  href="/audit-complet/questionnaire"
                  className="block w-full py-4 rounded-xl bg-[#9990EA] text-center font-bold text-white hover:bg-[#8880DA] transition-all"
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
            className="mt-16 text-center"
          >
            <div className="inline-flex flex-wrap items-center justify-center gap-8 px-8 py-4 rounded-2xl bg-white/5 border border-white/10">
              {[
                'Aucune carte requise',
                'Donnees securisees',
                'Resultats instantanes',
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-[#5EECC5]" />
                  <span className="text-sm text-white/60">{text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================================ */}
      {/* FINAL CTA */}
      {/* ============================================ */}
      <section className="py-32 px-4 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#5EECC5]/20 via-[#9990EA]/20 to-[#FF6B9D]/20 blur-3xl" />
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
            className="w-20 h-20 mx-auto mb-8 rounded-full bg-gradient-to-r from-[#5EECC5] via-[#9990EA] to-[#FF6B9D] p-0.5"
          >
            <div className="w-full h-full rounded-full bg-[#030305] flex items-center justify-center">
              <Battery className="w-10 h-10 text-[#5EECC5]" />
            </div>
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-black mb-6">
            <span className="text-white">Pret a </span>
            <span className="bg-gradient-to-r from-[#5EECC5] via-[#9990EA] to-[#FF6B9D] bg-clip-text text-transparent">optimiser</span>
            <span className="text-white"> ton metabolisme ?</span>
          </h2>

          <p className="text-xl text-white/50 mb-12 max-w-2xl mx-auto">
            Rejoins les milliers de personnes qui ont deja transforme leur sante grace a notre audit metabolique.
          </p>

          <MagneticButton
            href="/audit-complet/questionnaire"
            className="group inline-flex items-center gap-3 px-12 py-6 bg-gradient-to-r from-[#5EECC5] to-[#3DD4AF] rounded-2xl font-bold text-[#030305] text-xl"
          >
            <span>Commencer maintenant</span>
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </MagneticButton>

          <p className="text-white/30 mt-8 text-sm">
            15 minutes • 100% gratuit pour commencer • Resultats immediats
          </p>
        </motion.div>
      </section>

      {/* ============================================ */}
      {/* FOOTER */}
      {/* ============================================ */}
      <footer className="py-12 px-4 border-t border-white/5">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-white/30 text-sm mb-2">
            2025 AchZod Coaching - Audit Metabolique Complet
          </div>
          <div className="text-white/20 text-xs">
            Propulse par Claude Sonnet • coaching@achzodcoaching.com
          </div>
        </div>
      </footer>
    </div>
  )
}
