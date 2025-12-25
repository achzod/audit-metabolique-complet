'use client'

import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { ArrowRight, Brain, Heart, Activity, Moon, Dumbbell, Target, Check, X, Crown, Sparkles, RefreshCw, Flame, Dna, Shield, Beaker, Clock, Apple, TrendingUp, Droplets, Wind, Zap, Move, Waves } from 'lucide-react'

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
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(eased * value))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [value, isVisible])

  return <div ref={ref} className="tabular-nums">{count}{suffix}</div>
}

// ============================================
// GLOW CARD
// ============================================
function GlowCard({ children, className, glowColor = '#5EECC5' }: { children: React.ReactNode; className?: string; glowColor?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
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
            background: `radial-gradient(circle, ${glowColor}25 0%, transparent 70%)`,
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
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])

  // 15 domaines avec Biomecanique et Neurotransmetteurs
  const domains = [
    { icon: Target, label: 'Profil de Base', color: '#5EECC5' },
    { icon: Activity, label: 'Composition Corporelle', color: '#9990EA' },
    { icon: Flame, label: 'Metabolisme Energetique', color: '#FF6B9D' },
    { icon: Apple, label: 'Nutrition & Tracking', color: '#5EECC5' },
    { icon: Beaker, label: 'Digestion & Microbiome', color: '#9990EA' },
    { icon: Move, label: 'Biomecanique & Mobilite', color: '#FF6B9D' },
    { icon: Waves, label: 'Neurotransmetteurs', color: '#5EECC5' },
    { icon: Dumbbell, label: 'Performance & Training', color: '#9990EA' },
    { icon: Moon, label: 'Sommeil & Recuperation', color: '#FF6B9D' },
    { icon: Heart, label: 'HRV & Systeme Cardiaque', color: '#5EECC5' },
    { icon: Droplets, label: 'Analyses Sanguines', color: '#9990EA' },
    { icon: Brain, label: 'Profil Hormonal', color: '#FF6B9D' },
    { icon: Shield, label: 'Immunite & Inflammation', color: '#5EECC5' },
    { icon: Dna, label: 'Detox & Charge Toxique', color: '#9990EA' },
    { icon: Clock, label: 'Chronobiologie', color: '#FF6B9D' },
  ]

  return (
    <div className="min-h-screen bg-[#1C1C1E] text-white overflow-hidden">

      {/* ============================================ */}
      {/* HERO SECTION */}
      {/* ============================================ */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#2C2C2E] via-[#1C1C1E] to-[#1C1C1E]" />

        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="relative z-10 max-w-6xl mx-auto px-4 py-20 text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 mb-8 rounded-full bg-[#2C2C2E] border border-[#3A3A3C]"
          >
            <Zap className="w-4 h-4 text-[#5EECC5]" />
            <span className="text-sm font-medium text-[#8E8E93]">Analyse metabolique avancee</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight"
          >
            <span className="block text-white">Audit Metabolique</span>
            <span className="block bg-gradient-to-r from-[#5EECC5] via-[#9990EA] to-[#FF6B9D] bg-clip-text text-transparent">
              Complet
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-xl md:text-2xl text-[#8E8E93] max-w-3xl mx-auto mb-12"
          >
            L'analyse la plus complete du marche.
            <br />
            <span className="text-white font-semibold">105+ questions</span> · <span className="text-white font-semibold">15 domaines</span> · <span className="text-white font-semibold">Resultats personnalises</span>
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
              className="group inline-flex items-center gap-3 px-10 py-5 bg-[#5EECC5] rounded-2xl font-bold text-[#1C1C1E] text-lg hover:bg-[#4DDBB4] transition-colors"
            >
              <span>Commencer gratuitement</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <a
              href="#pricing"
              className="px-8 py-4 rounded-2xl border border-[#3A3A3C] text-[#8E8E93] font-semibold hover:bg-[#2C2C2E] transition-all"
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
                <div className="text-sm text-[#8E8E93] mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ============================================ */}
      {/* DOMAINS SECTION */}
      {/* ============================================ */}
      <section className="py-24 px-4 bg-[#2C2C2E]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-[#3A3A3C] text-[#9990EA] mb-6">
              Analyse complete
            </span>
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              <span className="text-white">15 domaines </span>
              <span className="bg-gradient-to-r from-[#9990EA] to-[#FF6B9D] bg-clip-text text-transparent">d'expertise</span>
            </h2>
            <p className="text-lg text-[#8E8E93] max-w-2xl mx-auto">
              Une cartographie complete de ta physiologie pour des recommandations ultra-personnalisees
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {domains.map((domain, i) => (
              <GlowCard
                key={domain.label}
                className="group p-4 rounded-2xl bg-[#1C1C1E] border border-[#3A3A3C] cursor-default"
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
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-transform group-hover:scale-110"
                    style={{ background: `${domain.color}15` }}
                  >
                    <domain.icon className="w-5 h-5" style={{ color: domain.color }} />
                  </div>
                  <div className="font-semibold text-white/90 text-sm">{domain.label}</div>
                </motion.div>
              </GlowCard>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* HOW IT WORKS */}
      {/* ============================================ */}
      <section className="py-24 px-4 bg-[#1C1C1E]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-[#3A3A3C] text-[#5EECC5] mb-6">
              Processus simplifie
            </span>
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              <span className="text-white">3 etapes vers ton </span>
              <span className="bg-gradient-to-r from-[#5EECC5] to-[#9990EA] bg-clip-text text-transparent">audit</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                step: '01',
                title: 'Reponds au questionnaire',
                desc: '105 questions couvrant 15 domaines : metabolisme, hormones, neurotransmetteurs, biomecanique...',
                badge: '15 min',
                color: '#5EECC5'
              },
              {
                step: '02',
                title: 'Choisis ton offre',
                desc: 'Decouverte gratuit, Premium 79 euros ou Elite 129 euros/an avec analyses illimitees',
                badge: '3 options',
                color: '#9990EA'
              },
              {
                step: '03',
                title: 'Recois ton audit',
                desc: 'Analyse approfondie de tes reponses et rapport ultra-personnalise de 15+ pages',
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
                className="p-6 rounded-2xl border border-[#3A3A3C] bg-[#2C2C2E]"
              >
                <div className="text-6xl font-black mb-4 opacity-20" style={{ color: item.color }}>
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-[#8E8E93] mb-4 text-sm">{item.desc}</p>
                <span
                  className="inline-block px-3 py-1 rounded-full text-xs font-medium"
                  style={{ background: `${item.color}20`, color: item.color }}
                >
                  {item.badge}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* PRICING SECTION */}
      {/* ============================================ */}
      <section id="pricing" className="py-24 px-4 bg-[#2C2C2E]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-[#3A3A3C] text-[#FF6B9D] mb-6">
              Tarification transparente
            </span>
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              <span className="text-white">Choisis ton </span>
              <span className="bg-gradient-to-r from-[#FF6B9D] to-[#9990EA] bg-clip-text text-transparent">niveau</span>
            </h2>
            <p className="text-lg text-[#8E8E93]">Tu decides apres avoir rempli le questionnaire</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* GRATUIT */}
            <GlowCard className="p-6 rounded-2xl border border-[#3A3A3C] bg-[#1C1C1E]" glowColor="#5EECC5">
              <div className="relative z-10">
                <div className="text-center mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-[#3A3A3C] flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-7 h-7 text-[#8E8E93]" />
                  </div>
                  <div className="text-xs font-semibold text-[#8E8E93] uppercase tracking-wider mb-2">Decouverte</div>
                  <div className="text-4xl font-black text-white mb-1">Gratuit</div>
                  <div className="text-sm text-[#8E8E93]">Pour tester</div>
                </div>

                <ul className="space-y-3 mb-6">
                  {[
                    { included: true, text: 'Resume Executif' },
                    { included: true, text: 'Analyse Anthropometrique' },
                    { included: true, text: 'Profil Metabolique de Base' },
                    { included: true, text: 'Plan dAction 30 Jours' },
                    { included: false, text: '11 sections supplementaires' },
                    { included: false, text: 'Protocoles personnalises' },
                  ].map((feature, i) => (
                    <li key={i} className={`flex items-center gap-3 ${!feature.included ? 'opacity-40' : ''}`}>
                      {feature.included ? (
                        <Check className="w-4 h-4 text-[#5EECC5] flex-shrink-0" />
                      ) : (
                        <X className="w-4 h-4 text-[#8E8E93] flex-shrink-0" />
                      )}
                      <span className="text-sm text-[#8E8E93]">{feature.text}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/audit-complet/questionnaire"
                  className="block w-full py-3 rounded-xl border border-[#3A3A3C] text-center font-semibold text-[#8E8E93] hover:bg-[#3A3A3C] transition-all text-sm"
                >
                  Commencer gratuitement
                </Link>
              </div>
            </GlowCard>

            {/* PREMIUM */}
            <GlowCard className="p-6 rounded-2xl border-2 border-[#5EECC5]/50 bg-[#1C1C1E] md:-mt-4 md:mb-[-16px] relative" glowColor="#5EECC5">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-[#5EECC5] text-[#1C1C1E] text-xs font-bold">
                Le + populaire
              </div>

              <div className="relative z-10">
                <div className="text-center mb-6 mt-2">
                  <div className="w-14 h-14 rounded-2xl bg-[#5EECC5]/20 flex items-center justify-center mx-auto mb-4">
                    <Crown className="w-7 h-7 text-[#5EECC5]" />
                  </div>
                  <div className="text-xs font-semibold text-[#5EECC5] uppercase tracking-wider mb-2">Premium</div>
                  <div className="text-4xl font-black text-white mb-1">79&#8364;</div>
                  <div className="text-sm text-[#8E8E93]">Paiement unique</div>
                </div>

                <ul className="space-y-3 mb-6">
                  {[
                    '15 sections danalyse completes',
                    'Neurotransmetteurs & Biomecanique',
                    'Analyse HRV & Recuperation',
                    'Profil Hormonal complet',
                    'Protocole Nutrition detaille',
                    'Protocole Supplements',
                    'Feuille de Route 90 Jours',
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-[#5EECC5] flex-shrink-0" />
                      <span className="text-sm text-white/80">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/audit-complet/questionnaire"
                  className="block w-full py-3 rounded-xl bg-[#5EECC5] text-center font-bold text-[#1C1C1E] hover:bg-[#4DDBB4] transition-all text-sm"
                >
                  Choisir Premium
                </Link>
              </div>
            </GlowCard>

            {/* ELITE */}
            <GlowCard className="p-6 rounded-2xl border border-[#9990EA]/30 bg-[#1C1C1E] relative" glowColor="#9990EA">
              <div className="absolute -top-3 right-6 px-3 py-1 rounded-full bg-[#9990EA] text-white text-xs font-bold">
                Best Value
              </div>

              <div className="relative z-10">
                <div className="text-center mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-[#9990EA]/20 flex items-center justify-center mx-auto mb-4">
                    <RefreshCw className="w-7 h-7 text-[#9990EA]" />
                  </div>
                  <div className="text-xs font-semibold text-[#9990EA] uppercase tracking-wider mb-2">Elite</div>
                  <div className="text-4xl font-black text-white mb-1">129&#8364;</div>
                  <div className="text-sm text-[#8E8E93]">Par an - Analyses illimitees</div>
                </div>

                <ul className="space-y-3 mb-6">
                  {[
                    'Tout le Premium inclus',
                    'Analyses illimitees toute lannee',
                    'Suivi de ta progression',
                    'Compare tes resultats',
                    'Ajuste tes protocoles',
                    'Support prioritaire',
                    'Acces aux nouvelles fonctionnalites',
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-[#9990EA] flex-shrink-0" />
                      <span className="text-sm text-white/70">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/audit-complet/questionnaire"
                  className="block w-full py-3 rounded-xl bg-[#9990EA] text-center font-bold text-white hover:bg-[#8880DA] transition-all text-sm"
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
            <div className="inline-flex flex-wrap items-center justify-center gap-6 px-6 py-3 rounded-xl bg-[#1C1C1E] border border-[#3A3A3C]">
              {[
                'Aucune carte requise',
                'Donnees securisees',
                'Resultats instantanes',
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#5EECC5]" />
                  <span className="text-xs text-[#8E8E93]">{text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================================ */}
      {/* FINAL CTA */}
      {/* ============================================ */}
      <section className="py-24 px-4 bg-[#1C1C1E]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            <span className="text-white">Pret a </span>
            <span className="bg-gradient-to-r from-[#5EECC5] via-[#9990EA] to-[#FF6B9D] bg-clip-text text-transparent">optimiser</span>
            <span className="text-white"> ton metabolisme ?</span>
          </h2>

          <p className="text-lg text-[#8E8E93] mb-10 max-w-2xl mx-auto">
            Rejoins les milliers de personnes qui ont deja transforme leur sante grace a notre audit metabolique.
          </p>

          <Link
            href="/audit-complet/questionnaire"
            className="group inline-flex items-center gap-3 px-10 py-5 bg-[#5EECC5] rounded-2xl font-bold text-[#1C1C1E] text-lg hover:bg-[#4DDBB4] transition-colors"
          >
            <span>Commencer maintenant</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>

          <p className="text-[#8E8E93] mt-6 text-sm">
            15 minutes · 100% gratuit pour commencer · Resultats immediats
          </p>
        </motion.div>
      </section>

      {/* ============================================ */}
      {/* FOOTER */}
      {/* ============================================ */}
      <footer className="py-8 px-4 border-t border-[#3A3A3C] bg-[#1C1C1E]">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-[#8E8E93] text-sm mb-1">
            2025 AchZod Coaching - Audit Metabolique Complet
          </div>
          <div className="text-[#636366] text-xs">
            coaching@achzodcoaching.com
          </div>
        </div>
      </footer>
    </div>
  )
}
