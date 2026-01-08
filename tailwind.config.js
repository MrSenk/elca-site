/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'theme-base': 'var(--theme-base)',
        'theme-text': 'var(--theme-text)',
        'theme-peach': 'var(--theme-peach)',
        'theme-blue': 'var(--theme-blue)',
        'theme-overlay': 'var(--theme-overlay)',
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}

