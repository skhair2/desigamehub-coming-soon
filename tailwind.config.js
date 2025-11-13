/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        saffron: {
          DEFAULT: '#FF6B35',
          light: '#FFE8CC',
          dark: '#873D00',
        },
        purple: {
          DEFAULT: '#8B2CA0',
          light: '#EBCCFF',
          dark: '#3E0D46',
        },
        peacock: {
          DEFAULT: '#20B2AA',
          light: '#CCFFFF',
          dark: '#004444',
        },
        gold: {
          DEFAULT: '#FFD700',
          light: '#FFFEF5',
          dark: '#FF7F00',
        },
        charcoal: {
          dark: '#1C2833',
          medium: '#2C3E50',
          light: '#E8EBED',
        },
        cream: '#FFFAF0',
      },
      fontFamily: {
        display: ['var(--font-sora)', 'ui-sans-serif', 'system-ui'],
        heading: ['var(--font-poppins)', 'ui-sans-serif', 'sans-serif'],
        body: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'Courier New', 'monospace'],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #FF6B35 0%, #8B2CA0 100%)',
        'gradient-celebration': 'linear-gradient(135deg, #20B2AA 0%, #FF6B35 50%, #FFD700 100%)',
        'gradient-premium': 'linear-gradient(135deg, #FFD700 0%, #FF6B35 100%)',
      },
      boxShadow: {
        'subtle': '0 2px 4px rgba(0, 0, 0, 0.1)',
        'card': '0 4px 8px rgba(0, 0, 0, 0.15)',
        'medium': '0 8px 24px rgba(0, 0, 0, 0.12)',
        'heavy': '0 16px 48px rgba(0, 0, 0, 0.16)',
        'saffron-glow': '0 0 20px rgba(255, 107, 53, 0.5)',
        'purple-glow': '0 0 20px rgba(139, 44, 160, 0.5)',
        'gold-glow': '0 0 20px rgba(255, 215, 0, 0.5)',
      },
    },
  },
  plugins: [],
}

