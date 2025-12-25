'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronDown, Check } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface Option {
  value: string
  label: string
}

interface CustomSelectProps {
  options: Option[]
  value?: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export default function CustomSelect({
  options,
  value,
  onChange,
  placeholder = 'Sélectionner...',
  className = ''
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false)
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  const selectedOption = options.find(opt => opt.value === value)

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-full px-4 py-3 rounded-xl text-left
          bg-[#1a1a1f] border border-white/15
          hover:border-[#5EECC5]/50
          focus:border-[#5EECC5] focus:ring-2 focus:ring-[#5EECC5]/20
          transition-all duration-200
          flex items-center justify-between gap-2
          ${isOpen ? 'border-[#5EECC5] ring-2 ring-[#5EECC5]/20' : ''}
        `}
      >
        <span className={selectedOption ? 'text-white' : 'text-gray-500'}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-[#5EECC5] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="
              absolute z-50 w-full mt-2
              bg-[#1a1a1f] border border-white/15 rounded-xl
              shadow-2xl shadow-black/50
              overflow-hidden
              max-h-60 overflow-y-auto
              scrollbar-thin scrollbar-thumb-[#5EECC5]/30 scrollbar-track-transparent
            "
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#5EECC5 transparent'
            }}
          >
            {options.map((option, index) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value)
                  setIsOpen(false)
                }}
                className={`
                  w-full px-4 py-3 text-left
                  flex items-center justify-between gap-2
                  transition-all duration-150
                  ${value === option.value
                    ? 'bg-[#5EECC5]/20 text-[#5EECC5]'
                    : 'text-white hover:bg-white/10'
                  }
                  ${index === 0 ? 'rounded-t-xl' : ''}
                  ${index === options.length - 1 ? 'rounded-b-xl' : ''}
                `}
              >
                <span>{option.label}</span>
                {value === option.value && (
                  <Check className="w-4 h-4 text-[#5EECC5]" />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
