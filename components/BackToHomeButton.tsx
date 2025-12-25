'use client'

import Link from 'next/link'
import { Home } from 'lucide-react'

export default function BackToHomeButton() {
  return (
    <Link
      href="/"
      className="fixed top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-all text-white/70 hover:text-cyan-400"
    >
      <Home className="w-4 h-4" />
      <span className="hidden sm:inline text-sm font-medium">Menu Principal</span>
    </Link>
  )
}
