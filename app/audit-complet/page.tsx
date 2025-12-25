'use client'

import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { ArrowRight, Zap, Brain, Heart, Activity, Moon, Dumbbell, Target, ChevronDown, Check, X, Crown, Sparkles, RefreshCw } from 'lucide-react'

// Animated counter hook
function useCounter(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!isVisible) return

    let startTime: number
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * end))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [end, duration, isVisible])

  return { count, setIsVisible }
}

export default function LandingPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])

  const questionsCounter = useCounter(105)
  const sectionsCounter = useCounter(15)
  const clientsCounter = useCounter(2847)

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated background blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="hero-blob hero-blob-aqua absolute"
            style={{ top: '10%', right: '10%' }}
            animate={{
              x: [0, 30, -20, 0],
              y: [0, -30, 20, 0],
              scale: [1, 1.1, 0.9, 1],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="hero-blob hero-blob-purple absolute"
            style={{ bottom: '20%', left: '5%' }}
            animate={{
              x: [0, -20, 30, 0],
              y: [0, 20, -30, 0],
              scale: [1, 0.9, 1.1, 1],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="relative z-10 max-w-6xl mx-auto px-4 py-20 text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-[#101010] text-white text-sm font-medium"
          >
            <Zap className="w-4 h-4 text-[#8DFFE0]" />
            Analyse IA avancee par Claude Sonnet
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mb-6"
          >
            <span className="block text-[#101010]">Audit Metabolique</span>
            <span className="gradient-text">Complet</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-xl md:text-2xl text-[#4A4A4A] max-w-3xl mx-auto mb-12"
          >
            Lanalyse metabolique la plus complete du marche.
            <br className="hidden md:block" />
            <span className="text-[#101010] font-semibold">105 questions</span> • <span className="text-[#101010] font-semibold">15 sections</span> • <span className="text-[#101010] font-semibold">IA Claude Sonnet</span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Link href="/audit-complet/questionnaire" className="btn-aqua text-lg px-10 py-5 w-full sm:w-auto">
              <span>Commencer gratuitement</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a href="#pricing" className="btn-secondary w-full sm:w-auto">
              Voir les offres
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="grid grid-cols-3 gap-8 max-w-2xl mx-auto"
            onViewportEnter={() => {
              questionsCounter.setIsVisible(true)
              sectionsCounter.setIsVisible(true)
              clientsCounter.setIsVisible(true)
            }}
          >
            <div>
              <div className="text-4xl md:text-5xl font-bold text-[#101010]">{questionsCounter.count}</div>
              <div className="text-sm text-[#7A7A7A] mt-1">Questions</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-[#101010]">{sectionsCounter.count}</div>
              <div className="text-sm text-[#7A7A7A] mt-1">Sections</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-[#101010]">{clientsCounter.count}+</div>
              <div className="text-sm text-[#7A7A7A] mt-1">Audits generes</div>
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ChevronDown className="w-6 h-6 text-[#7A7A7A]" />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Domains Section */}
      <section className="py-24 px-4 bg-beige">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="mb-4">15 sections danalyse</h2>
            <p className="text-xl text-[#4A4A4A] max-w-2xl mx-auto">
              Une vision complete de ta physiologie pour des recommandations ultra-personnalisees
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { icon: Target, label: 'Profil de Base' },
              { icon: Activity, label: 'Composition Corporelle' },
              { icon: Zap, label: 'Metabolisme & Energie' },
              { icon: Brain, label: 'Nutrition & Tracking' },
              { icon: Heart, label: 'Digestion & Microbiome' },
              { icon: Dumbbell, label: 'Activite & Performance' },
              { icon: Moon, label: 'Sommeil & Recuperation' },
              { icon: Activity, label: 'HRV & Cardiaque' },
              { icon: Brain, label: 'Analyses Sanguines' },
              { icon: Heart, label: 'Hormones & Stress' },
              { icon: Zap, label: 'Lifestyle' },
              { icon: Target, label: 'Plan Nutritionnel' },
              { icon: Dumbbell, label: 'Plan Entrainement' },
              { icon: Brain, label: 'Supplements' },
              { icon: Activity, label: 'Feuille de Route' },
            ].map((domain, i) => (
              <motion.div
                key={domain.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                viewport={{ once: true }}
                className="card-light p-4 hover-lift cursor-default text-center"
              >
                <domain.icon className="w-6 h-6 mx-auto mb-2 text-[#5EECC5]" />
                <div className="font-medium text-sm text-[#101010]">{domain.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-24 px-4 bg-cream">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="mb-4">Comment ca marche ?</h2>
            <p className="text-xl text-[#4A4A4A]">3 etapes simples vers ton audit personnalise</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Reponds au questionnaire',
                desc: '105 questions couvrant metabolisme, nutrition, sommeil, HRV, analyses sanguines...',
                badge: '15 min'
              },
              {
                step: '02',
                title: 'Choisis ton offre',
                desc: 'Gratuit, Premium (39euros) ou Elite (79euros) avec analyses illimitees',
                badge: '3 options'
              },
              {
                step: '03',
                title: 'Recois ton audit',
                desc: 'Claude Sonnet analyse tes reponses et genere un rapport ultra-personnalise',
                badge: 'Instantane'
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                viewport={{ once: true }}
                className="card-dark p-8"
              >
                <div className="text-5xl font-bold text-[#8DFFE0] opacity-30 mb-4">{item.step}</div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-white/60 mb-4">{item.desc}</p>
                <div className="tag-aqua">{item.badge}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section - 3 OFFERS */}
      <section id="pricing" className="py-24 px-4 bg-sand">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="mb-4">Choisis ton niveau danalyse</h2>
            <p className="text-xl text-[#4A4A4A]">Tu decides apres avoir rempli le questionnaire</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* FREE Plan */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="card-light p-6 relative"
            >
              <div className="text-center mb-6">
                <div className="w-12 h-12 rounded-full bg-[#101010]/5 flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-6 h-6 text-[#7A7A7A]" />
                </div>
                <div className="text-sm font-semibold text-[#7A7A7A] uppercase tracking-wider mb-2">Decouverte</div>
                <div className="text-4xl font-bold text-[#101010] mb-1">Gratuit</div>
                <div className="text-sm text-[#7A7A7A]">Pour tester</div>
              </div>

              <ul className="space-y-3 mb-6">
                {[
                  { included: true, text: 'Resume Executif' },
                  { included: true, text: 'Analyse Anthropometrique' },
                  { included: true, text: 'Profil Metabolique' },
                  { included: true, text: 'Plan dAction 30 Jours' },
                  { included: false, text: '11 sections supplementaires' },
                  { included: false, text: 'Protocoles personnalises' },
                  { included: false, text: 'Analyses illimitees' },
                ].map((feature, i) => (
                  <li key={i} className={`flex items-start gap-3 ${!feature.included ? 'opacity-40' : ''}`}>
                    {feature.included ? (
                      <Check className="w-5 h-5 text-[#5EECC5] mt-0.5 flex-shrink-0" />
                    ) : (
                      <X className="w-5 h-5 text-[#7A7A7A] mt-0.5 flex-shrink-0" />
                    )}
                    <span className="text-sm text-[#4A4A4A]">{feature.text}</span>
                  </li>
                ))}
              </ul>

              <Link href="/audit-complet/questionnaire" className="btn-secondary w-full justify-center text-sm">
                Commencer gratuitement
              </Link>
            </motion.div>

            {/* PREMIUM Plan - RECOMMENDED */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="card-dark p-6 relative md:-mt-4 md:mb-[-16px] md:scale-105 z-10"
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 badge">Le + populaire</div>

              <div className="text-center mb-6">
                <div className="w-12 h-12 rounded-full bg-[#8DFFE0]/20 flex items-center justify-center mx-auto mb-4">
                  <Crown className="w-6 h-6 text-[#8DFFE0]" />
                </div>
                <div className="text-sm font-semibold text-[#8DFFE0] uppercase tracking-wider mb-2">Premium</div>
                <div className="flex items-center justify-center gap-2 mb-1">
                  <span className="text-lg text-white/40 line-through">79&#8364;</span>
                  <span className="text-4xl font-bold text-white">39&#8364;</span>
                </div>
                <div className="text-sm text-white/60">Paiement unique</div>
              </div>

              <ul className="space-y-3 mb-6">
                {[
                  '15 sections danalyse completes',
                  'Digestion & Microbiome avance',
                  'Analyse HRV & Recuperation',
                  'Profil Hormonal complet',
                  'Protocole Nutrition detaille',
                  'Protocole Supplements',
                  'Feuille de Route 90 Jours',
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#8DFFE0] mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-white/80">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link href="/audit-complet/questionnaire" className="btn-aqua w-full justify-center text-sm">
                <span>Choisir Premium</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* ELITE Plan */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
              className="card-light p-6 relative border-2 border-[#9990EA]/30"
            >
              <div className="absolute -top-3 right-6 bg-[#9990EA] text-white text-xs font-bold px-3 py-1 rounded-full">
                Best Value
              </div>

              <div className="text-center mb-6">
                <div className="w-12 h-12 rounded-full bg-[#9990EA]/10 flex items-center justify-center mx-auto mb-4">
                  <RefreshCw className="w-6 h-6 text-[#9990EA]" />
                </div>
                <div className="text-sm font-semibold text-[#9990EA] uppercase tracking-wider mb-2">Elite</div>
                <div className="flex items-center justify-center gap-2 mb-1">
                  <span className="text-lg text-[#7A7A7A] line-through">156&#8364;</span>
                  <span className="text-4xl font-bold text-[#101010]">79&#8364;</span>
                </div>
                <div className="text-sm text-[#7A7A7A]">4 analyses / an</div>
              </div>

              <ul className="space-y-3 mb-6">
                {[
                  'Tout le Premium inclus',
                  '4 analyses par an (1/trimestre)',
                  'Suivi de ta progression',
                  'Compare tes resultats',
                  'Ajuste tes protocoles',
                  'Support prioritaire',
                  'Economise 77&#8364;/an',
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#9990EA] mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-[#4A4A4A]" dangerouslySetInnerHTML={{ __html: feature }} />
                  </li>
                ))}
              </ul>

              <Link href="/audit-complet/questionnaire" className="w-full justify-center text-sm inline-flex items-center gap-2 px-6 py-3 bg-[#9990EA] text-white font-semibold rounded-xl hover:bg-[#7B70D9] transition-all">
                <span>Choisir Elite</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <div className="inline-flex flex-wrap items-center justify-center gap-6 px-8 py-4 rounded-2xl bg-white/50">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-[#5EECC5]" />
                <span className="text-sm text-[#4A4A4A]">Aucune carte requise pour le gratuit</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-[#5EECC5]" />
                <span className="text-sm text-[#4A4A4A]">Donnees securisees</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-[#5EECC5]" />
                <span className="text-sm text-[#4A4A4A]">Resultats instantanes</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4 bg-dark">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-white mb-6">
              Pret a optimiser ton metabolisme ?
            </h2>
            <p className="text-xl text-white/60 mb-10 max-w-2xl mx-auto">
              Rejoins les milliers de personnes qui ont deja transforme leur sante grace a notre audit metabolique.
            </p>
            <Link href="/audit-complet/questionnaire" className="btn-aqua text-lg px-12 py-5">
              <span>Commencer maintenant</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <p className="text-white/40 mt-6 text-sm">
              15 minutes - 100% gratuit pour commencer
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-[#101010] border-t border-white/5">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-white/40 text-sm">
            2025 AchZod Coaching - Audit Metabolique Complet
          </div>
          <div className="text-white/30 text-xs mt-2">
            Propulse par Claude Sonnet - coaching@achzodcoaching.com
          </div>
        </div>
      </footer>
    </div>
  )
}
