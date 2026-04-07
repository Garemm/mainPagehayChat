/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#080c10',
        surface: '#0d1117',
        'surface-2': '#161b22',
        'surface-3': '#1c2128',
        border: '#21262d',
        'border-subtle': '#161b22',
        accent: '#0ea5e9',
        'accent-glow': '#38bdf8',
        'accent-dim': '#0c4a6e',
        'accent-2': '#06b6d4',
        foreground: '#e6edf3',
        'foreground-muted': '#8b949e',
        'foreground-subtle': '#484f58',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 20px rgba(14, 165, 233, 0.25)',
        'glow-sm': '0 0 10px rgba(14, 165, 233, 0.15)',
        'glow-lg': '0 0 40px rgba(14, 165, 233, 0.3)',
        'glow-xl': '0 0 80px rgba(14, 165, 233, 0.2)',
        card: '0 1px 3px rgba(0,0,0,0.5), 0 0 0 1px rgba(33,38,45,0.8)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'typing': 'typing 1s steps(1) infinite',
        'fade-up': 'fadeUp 0.5s ease-out forwards',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        typing: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
