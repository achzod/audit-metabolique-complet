import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'accent-cyan': '#00F5D4',
        'accent-purple': '#A78BFA',
        background: '#101010',
        foreground: '#ffffff',
      },
      fontFamily: {
        audiowide: ['Audiowide', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      },
      keyframes: {
        scanlines: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(10px)' },
        },
      },
      animation: {
        scanlines: 'scanlines 8s linear infinite',
      },
    },
  },
  plugins: [],
}

export default config
