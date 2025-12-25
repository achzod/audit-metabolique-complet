'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronDown, Check } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form'

interface Option {
  value: string
  label: string
}

interface FormSelectProps {
  name: string
  options: Option[]
  register: UseFormRegister<any>
  setValue: UseFormSetValue<any>
  watch: UseFormWatch<any>
  placeholder?: string
}

export default function FormSelect({
  name,
  options,
  register,
  setValue,
  watch,
  placeholder = 'Sélectionner...'
}: FormSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const currentValue = watch(name)

  // Register the field
  useEffect(() => {
    register(name)
  }, [register, name])

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

  const selectedOption = options.find(opt => opt.value === currentValue)

  const handleSelect = (value: string) => {
    setValue(name, value, { shouldValidate: false })
    setIsOpen(false)
  }

  return (
    <div ref={containerRef} className="relative">
      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-full px-4 py-3 rounded-xl text-left
          bg-[#1a1a1f] border border-white/15
          hover:border-[#5EECC5]/50
          focus:border-[#5EECC5] focus:outline-none focus:ring-2 focus:ring-[#5EECC5]/20
          transition-all duration-200
          flex items-center justify-between gap-2
          ${isOpen ? 'border-[#5EECC5] ring-2 ring-[#5EECC5]/20' : ''}
        `}
      >
        <span className={selectedOption ? 'text-white' : 'text-gray-500'}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-[#5EECC5] transition-transform duration-200 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}
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
              bg-[#1a1a1f] border border-white/20 rounded-xl
              shadow-2xl shadow-black/50
              overflow-hidden
            "
          >
            <div
              className="max-h-60 overflow-y-auto"
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: 'rgba(94, 236, 197, 0.3) transparent'
              }}
            >
              {options.map((option, index) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelect(option.value)}
                  className={`
                    w-full px-4 py-3 text-left
                    flex items-center justify-between gap-2
                    transition-all duration-150
                    ${currentValue === option.value
                      ? 'bg-[#5EECC5]/20 text-[#5EECC5]'
                      : 'text-white hover:bg-white/10'
                    }
                  `}
                >
                  <span>{option.label}</span>
                  {currentValue === option.value && (
                    <Check className="w-4 h-4 text-[#5EECC5] flex-shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
