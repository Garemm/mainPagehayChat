/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#f6f3ff',
        surface: '#ffffff',
        'surface-2': '#f3effd',
        'surface-3': '#ece5fb',
        border: '#ddd6f3',
        'border-subtle': '#cdbfe9',
        accent: '#2563eb',
        'accent-glow': '#3b82f6',
        'accent-dim': '#1e3a8a',
        'accent-2': '#60a5fa',
        foreground: '#161325',
        'foreground-muted': '#615b78',
        'foreground-subtle': '#8d87a3',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        glow: '0 16px 40px rgba(124, 58, 237, 0.16)',
        'glow-sm': '0 8px 20px rgba(124, 58, 237, 0.14)',
        'glow-lg': '0 24px 60px rgba(124, 58, 237, 0.18)',
        'glow-xl': '0 30px 90px rgba(124, 58, 237, 0.22)',
        card: '0 18px 45px rgba(63, 38, 100, 0.08), 0 0 0 1px rgba(221, 214, 243, 0.95)',
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
