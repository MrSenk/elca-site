/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Base theme colors
        'theme-base': 'var(--theme-base)',
        'theme-text': 'var(--theme-text)',
        'theme-peach': 'var(--theme-peach)',
        'theme-blue': 'var(--theme-blue)',
        'theme-overlay': 'var(--theme-overlay)',
        'theme-surface': 'var(--theme-surface)',
        // Extended Catppuccin palette
        'theme-mauve': 'var(--theme-mauve)',
        'theme-sapphire': 'var(--theme-sapphire)',
        'theme-green': 'var(--theme-green)',
        'theme-red': 'var(--theme-red)',
        'theme-yellow': 'var(--theme-yellow)',
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'glow': 'glow 2s ease-in-out infinite',
        'gradient': 'gradient 8s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(203, 166, 247, 0.3)' },
          '50%': { boxShadow: '0 0 30px rgba(203, 166, 247, 0.6)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.1)',
        'glass-hover': '0 12px 48px 0 rgba(0, 0, 0, 0.15)',
      },
    },
  },
  plugins: [],
}

