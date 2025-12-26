'use client'

import Link from 'next/link'
import Image from 'next/image'
import { LogIn, User } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 px-4 py-4"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="https://cdn.prod.website-files.com/5fd0a9c4883524725ec72282/5fd26bf8a848a19741305727_monogram-white.svg"
            alt="AchZod Coaching"
            width={40}
            height={40}
          />
          <span className="hidden sm:block text-white font-semibold">Audit Métabolique</span>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-4">
          {/* Connexion Button */}
          <Link
            href="/auth/login"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-[#5EECC5]/30 transition-all text-white/80 hover:text-[#5EECC5]"
          >
            <LogIn className="w-4 h-4" />
            <span className="hidden sm:inline text-sm font-medium">Connexion</span>
          </Link>
        </div>
      </div>
    </motion.header>
  )
}
