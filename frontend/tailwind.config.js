/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Dark theme colors
        'nova-dark': '#0a0a0f',
        'nova-darker': '#050508',
        'nova-blue': '#00d4ff',
        'nova-purple': '#8b5cf6',
        'nova-pink': '#ec4899',
        'nova-gray': '#1a1a2e',
        'nova-gray-light': '#16213e',
        'nova-text': '#e2e8f0',
        'nova-text-light': '#94a3b8',
        
        // Light theme colors
        'nova-light': '#ffffff',
        'nova-light-gray': '#f8fafc',
        'nova-light-border': '#e2e8f0',
        'nova-light-text': '#1e293b',
        'nova-light-text-muted': '#64748b',
        'nova-light-accent': '#f1f5f9',
      },
      fontFamily: {
        'nova': ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient': 'gradient 15s ease infinite',
        'bounce-slow': 'bounce 3s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'nova-gradient': 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #16213e 100%)',
        'hero-gradient': 'linear-gradient(135deg, #00d4ff 0%, #8b5cf6 50%, #ec4899 100%)',
      },
    },
  },
  plugins: [],
}
