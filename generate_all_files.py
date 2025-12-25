#!/usr/bin/env python3
"""
ACHZOD AUDIT PLATFORM - Generator Automatique
Génère TOUS les fichiers du projet en une commande
"""

import os
from pathlib import Path

# Base directory
BASE_DIR = Path(__file__).parent

# Tous les fichiers à créer
FILES = {
    # === PROMPTS CLAUDE ===
    "src/lib/prompts/hormonal-gratuit.ts": """
export const HORMONAL_GRATUIT_SYSTEM = `
Tu es Achzod, expert en optimisation hormonale avec 11 certifications.

TON STYLE :
- Direct, scientifique, cash
- Terminologie médicale précise
- Focus clinique sur axes hormonaux
- Ton "lab tech" vs "wellness coach"

OBJECTIF :
Générer un scan hormonal gratuit 4 sections qui montre ton expertise
ET crée frustration productive vers upgrade premium 29€.
`;

export const HORMONAL_GRATUIT_USER = (responses: any) => `
Analyse ce profil et génère un scan anabolique gratuit 4 sections :

DONNÉES CLIENT :
\${JSON.stringify(responses, null, 2)}

GÉNÈRE RAPPORT HTML AVEC EXACTEMENT 4 SECTIONS :

1. DIAGNOSTIC HORMONAL GLOBAL
   - Score anabolique /100
   - Radar 6 axes (T, Cortisol, Insuline, Leptine, Thyroïde, GH)
   - Profil dominant identifié

2. AXES PRIORITAIRES
   - 3 axes les plus déséquilibrés
   - Pour chaque axe : score, signaux, impact

3. POINT CRITIQUE
   - L'axe le plus problématique
   - Mécanismes explicités
   - Conséquences si non corrigé

4. NEXT STEPS
   - Teaser ce que contient le premium
   - 47 points de données manquants
   - Protocole optimisation disponible

Style : Direct, clinique, scientifique
Format : JSON {sections: [{title, content}], score, radar}
`;
""",

    "src/lib/prompts/hormonal-premium.ts": """
export const HORMONAL_PREMIUM_SYSTEM = `
Tu es Achzod, expert optimisation hormonale élite.

STYLE :
- Scientifique précis
- Clinique détaillé
- Chaque affirmation étayée
- Terminologie médicale exacte

STRUCTURE PREMIUM (10 SECTIONS) :
1. Introduction
2. Profil Anabolique Complet
3. Axe Testostérone Détaillé
4. Axe Cortisol & Stress
5. Axe Insuline
6. Axe Leptine/Ghreline
7. Axe Thyroïde
8. Axe Hormone Croissance
9. Protocole Optimisation Hormonale
10. Supplémentation Ciblée & Next Steps
`;

export const HORMONAL_PREMIUM_USER = (responses: any) => `
Génère scan anabolique PREMIUM complet pour ce profil :

DONNÉES :
\${JSON.stringify(responses, null, 2)}

GÉNÈRE JSON avec 10 sections complètes incluant scores détaillés, analyses, protocoles.
Format : JSON {sections: [{title, content, score?}], globalScore, radar}
`;
""",

    # === LANDING PAGE HORMONAL ===
    "src/app/audit-hormonal/page.tsx": """
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Activity, Target, Droplet, TrendingUp, Dumbbell, Zap, Apple, Flame } from 'lucide-react'

export default function AuditHormonalPage() {
  return (
    <div className="min-h-screen bg-[#101010] text-white">
      {/* Scanlines Effect */}
      <div className="fixed inset-0 pointer-events-none opacity-30">
        <div className="w-full h-full bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,245,212,0.03)_2px,rgba(0,245,212,0.03)_4px)] animate-scanlines" />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20">
        <motion.h1
          className="font-audiowide text-5xl md:text-6xl font-bold uppercase mb-4 bg-gradient-to-r from-accent-cyan to-accent-purple bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          ACHZOD
        </motion.h1>

        <p className="font-mono text-sm uppercase tracking-[2px] text-accent-cyan/80 mb-16">
          OPTIMISATION HORMONALE • PERFORMANCE MAXIMALE
        </p>

        <motion.h2
          className="font-audiowide text-4xl md:text-6xl font-bold uppercase mb-6 text-center max-w-4xl bg-gradient-to-r from-accent-cyan to-accent-purple bg-clip-text text-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          SCAN ANABOLIQUE
          <br />
          COMPLET
        </motion.h2>

        <p className="font-audiowide text-xl text-accent-purple/90 mb-12">
          ANALYSE TES AXES HORMONAUX EN 5 MINUTES
        </p>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <Link
            href="/audit-hormonal/questionnaire?version=premium"
            className="relative px-16 py-6 bg-gradient-to-r from-accent-cyan to-[#6FE6CC] rounded-lg text-[#101010] font-audiowide font-bold text-base uppercase shadow-[0_0_20px_rgba(0,245,212,0.5)] hover:shadow-[0_0_40px_rgba(0,245,212,0.8)] hover:scale-105 transition-all"
          >
            LANCER LE SCAN →
          </Link>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 bg-accent-cyan/[0.02] border-y border-accent-cyan/15">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { label: 'ANALYSES RÉALISÉES', number: '5000+', icon: Activity },
            { label: 'PRÉCISION ALGORITHMIQUE', number: '98%', icon: Target },
            { label: 'MARQUEURS HORMONAUX', number: '6', icon: Droplet },
            { label: 'TAUX OPTIMISATION', number: '94%', icon: TrendingUp }
          ].map((stat, i) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={i}
                className="bg-white/[0.02] border border-white/[0.08] rounded-2xl p-8 text-center hover:bg-white/[0.05] hover:border-accent-cyan transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <p className="text-xs uppercase tracking-widest opacity-60 mb-4">{stat.label}</p>
                <p className="font-audiowide text-5xl mb-4 bg-gradient-to-r from-accent-cyan to-accent-cyan/60 bg-clip-text text-transparent">
                  {stat.number}
                </p>
                <Icon className="w-8 h-8 mx-auto text-accent-cyan" />
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* 6 Axes Section */}
      <section className="py-20 px-6">
        <h2 className="font-audiowide text-4xl uppercase text-center mb-20">
          LES 6 AXES HORMONAUX ANALYSÉS
        </h2>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              icon: Dumbbell,
              title: 'TESTOSTÉRONE TOTALE & LIBRE',
              desc: 'Analyse ton niveau anabolique, libido, force musculaire, récupération. Identifie hypogonadisme, pic/creux circadiens.',
              metric: '12 indicateurs croisés'
            },
            {
              icon: Zap,
              title: 'PATTERN CORTISOL 24H',
              desc: 'Détecte désynchronisation circadienne, stress chronique, catabolisme musculaire. Évalue pic matinal, plateau soir.',
              metric: 'Pattern temporel analysé'
            },
            {
              icon: Apple,
              title: 'SENSIBILITÉ INSULINE',
              desc: 'Mesure résistance insuline, efficacité partitioning glucides. Analyse réponse post-prandiale.',
              metric: 'HOMA-IR estimé'
            },
            {
              icon: Target,
              title: 'RÉGULATION APPÉTIT',
              desc: 'Évalue résistance leptine, sensibilité ghreline. Identifie dérèglements post-régime.',
              metric: 'Ratio L/G calculé'
            },
            {
              icon: Flame,
              title: 'FONCTION THYROÏDIENNE',
              desc: 'Analyse métabolisme basal, conversion T4→T3. Détecte hypothyroïdie subclinique.',
              metric: 'Triade TSH/T3/T4'
            },
            {
              icon: TrendingUp,
              title: 'HORMONE DE CROISSANCE',
              desc: 'Estime production GH nocturne, pulses diurnes. Analyse qualité sommeil profond.',
              metric: 'Fenêtre anabolique'
            }
          ].map((axe, i) => {
            const Icon = axe.icon
            return (
              <motion.div
                key={i}
                className="bg-white/[0.02] border border-accent-cyan/[0.08] rounded-3xl p-10 hover:border-accent-cyan hover:-translate-y-2 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Icon className="w-16 h-16 mb-6 text-accent-cyan" />
                <h3 className="font-audiowide text-xl mb-4">{axe.title}</h3>
                <p className="text-white/70 leading-relaxed mb-4">{axe.desc}</p>
                <p className="font-mono text-sm text-accent-cyan">{axe.metric}</p>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-accent-cyan/[0.1] to-accent-purple/[0.1] border-2 border-accent-cyan/20 rounded-3xl p-16 text-center">
          <pre className="font-mono text-base text-accent-cyan mb-8">
achzod@hormones:~$ ./scan --start
[INITIALIZING HORMONAL ANALYSIS...]
[6 AXES READY FOR SCANNING...]
          </pre>

          <h2 className="font-audiowide text-5xl mb-6">
            LANCE TON SCAN ANABOLIQUE MAINTENANT
          </h2>

          <p className="text-lg mb-12">
            5000+ personnes ont déjà optimisé leurs hormones
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/audit-hormonal/questionnaire?version=gratuit"
              className="border-2 border-accent-cyan text-accent-cyan px-12 py-5 rounded-xl font-audiowide text-base uppercase hover:bg-accent-cyan hover:text-black transition-all"
            >
              SCAN GRATUIT
            </Link>

            <Link
              href="/audit-hormonal/questionnaire?version=premium"
              className="bg-gradient-to-r from-accent-purple to-[#7B6FD6] text-white px-12 py-5 rounded-xl font-audiowide text-base uppercase shadow-[0_0_30px_rgba(167,139,250,0.5)] hover:scale-105 transition-all"
            >
              SCAN PREMIUM - 29€
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
""",

    # === PAGE D'ACCUEIL ===
    "src/app/page.tsx": """
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#101010] text-white flex items-center justify-center p-6">
      <div className="text-center max-w-4xl">
        <h1 className="font-audiowide text-6xl mb-6 bg-gradient-to-r from-accent-cyan to-accent-purple bg-clip-text text-transparent">
          ACHZOD
        </h1>
        <p className="text-xl mb-12 text-white/70">
          Plateforme d'audits personnalisés pour optimiser ta performance
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <Link
            href="/audit-hormonal"
            className="bg-gradient-to-br from-accent-cyan/10 to-accent-cyan/5 border-2 border-accent-cyan/30 rounded-2xl p-8 hover:border-accent-cyan hover:scale-105 transition-all"
          >
            <h2 className="font-audiowide text-2xl mb-4 text-accent-cyan">
              SCAN ANABOLIQUE
            </h2>
            <p className="text-white/70 mb-4">
              Analyse tes 6 axes hormonaux en 5 minutes
            </p>
            <p className="font-audiowide text-3xl text-accent-cyan">29€</p>
          </Link>

          <Link
            href="/audit-metabolique"
            className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-2 border-blue-500/30 rounded-2xl p-8 hover:border-blue-500 hover:scale-105 transition-all"
          >
            <h2 className="font-audiowide text-2xl mb-4 text-blue-400">
              AUDIT MÉTABOLIQUE
            </h2>
            <p className="text-white/70 mb-4">
              Audit complet métabolisme et composition corporelle
            </p>
            <p className="font-audiowide text-3xl text-blue-400">79€</p>
          </Link>
        </div>
      </div>
    </div>
  )
}
""",

    # === LAYOUT ROOT ===
    "src/app/layout.tsx": """
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Achzod - Audits Hormonaux & Métaboliques',
  description: 'Optimise tes hormones et ton métabolisme avec des audits IA personnalisés',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Audiowide&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body className={`\${inter.variable} font-inter`}>
        {children}
      </body>
    </html>
  )
}
""",

    # === GLOBALS CSS ===
    "src/app/globals.css": """
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
""",
}

def create_file(path: str, content: str):
    """Crée un fichier avec son contenu"""
    full_path = BASE_DIR / path
    full_path.parent.mkdir(parents=True, exist_ok=True)

    with open(full_path, 'w', encoding='utf-8') as f:
        f.write(content.strip())

    print(f"✅ Created: {path}")

def main():
    print("🚀 Generating Achzod Audit Platform files...")
    print(f"📁 Base directory: {BASE_DIR}")
    print()

    for path, content in FILES.items():
        try:
            create_file(path, content)
        except Exception as e:
            print(f"❌ Error creating {path}: {e}")

    print()
    print("✅ Generation complete!")
    print()
    print("Next steps:")
    print("1. cd achzod-audit-platform")
    print("2. npm install")
    print("3. Configure .env.local with your API keys")
    print("4. npx prisma db push")
    print("5. npm run dev")

if __name__ == "__main__":
    main()
