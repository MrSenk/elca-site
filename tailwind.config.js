/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bb-void':   'var(--bb-void)',
        'bb-rust':   'var(--bb-rust)',
        'bb-panel':  'var(--bb-panel)',
        'bb-amber':  'var(--bb-amber)',
        'bb-cyan':   'var(--bb-cyan)',
        'bb-red':    'var(--bb-red)',
        'bb-text':   'var(--bb-text)',
        'bb-dim':    'var(--bb-dim)',
        'bb-border': 'var(--bb-border)',
      },
      fontFamily: {
        display:  ['"Orbitron"', 'sans-serif'],
        terminal: ['"VT323"', 'monospace'],
        mono:     ['"Share Tech Mono"', '"Fira Code"', 'monospace'],
        sans:     ['"Share Tech Mono"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'flicker':    'flicker 8s step-end infinite',
        'blink':      'blink 1s step-end infinite',
        'grain':      'grainShift 0.15s steps(1) infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'glitch':     'glitch 0.3s steps(2) forwards',
        'slide-in':   'slideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        'reveal':     'reveal 0.6s ease-out forwards',
        'scan-drift': 'scanDrift 12s linear infinite',
      },
      keyframes: {
        flicker: {
          '0%, 95%, 97%, 99%': { opacity: '1' },
          '96%, 98%':           { opacity: '0.98' },
          '100%':               { opacity: '1' },
        },
        blink: {
          '0%, 50%':   { opacity: '1' },
          '51%, 100%': { opacity: '0' },
        },
        grainShift: {
          '0%':   { transform: 'translate(0, 0)' },
          '25%':  { transform: 'translate(-2px, 2px)' },
          '50%':  { transform: 'translate(2px, -1px)' },
          '75%':  { transform: 'translate(-1px, -2px)' },
          '100%': { transform: 'translate(1px, 1px)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.7' },
          '50%':      { opacity: '1' },
        },
        glitch: {
          '0%':   { transform: 'translate(0)' },
          '25%':  { transform: 'translate(-3px, 1px)' },
          '50%':  { transform: 'translate(3px, -1px)' },
          '75%':  { transform: 'translate(-1px, 2px)' },
          '100%': { transform: 'translate(0)' },
        },
        slideIn: {
          '0%':   { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        reveal: {
          '0%':   { opacity: '0', clipPath: 'inset(0 100% 0 0)' },
          '100%': { opacity: '1', clipPath: 'inset(0 0% 0 0)' },
        },
        scanDrift: {
          '0%':   { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '0 200px' },
        },
      },
      boxShadow: {
        'amber-glow': '0 0 12px rgba(255, 176, 0, 0.4)',
        'cyan-glow':  '0 0 12px rgba(0, 240, 255, 0.4)',
        'red-glow':   '0 0 12px rgba(223, 32, 32, 0.4)',
        'panel':      'inset 0 1px 0 rgba(255,176,0,0.06), 0 4px 24px rgba(0,0,0,0.6)',
      },
    },
  },
  plugins: [],
}
