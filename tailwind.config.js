/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          primary: '#7FDBCA',
          secondary: '#F8BBD9', 
          accent: '#87CEEB',
          dark: '#0a0a0a',
          darker: '#000000',
          gray: '#1a1a1a',
          lightgray: '#333333',
        },
      },
      fontFamily: {
        'cyber': ['Cascadia Code', 'monospace'],
        'mono': ['Cascadia Code', 'monospace'],
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'flicker': 'flicker 3s linear infinite',
        'scan': 'scan 2s linear infinite',
      },
      scale: {
        '102': '1.02',
      },
      keyframes: {
        glow: {
          'from': { 'text-shadow': '0 0 5px #7FDBCA, 0 0 10px #7FDBCA, 0 0 15px #7FDBCA' },
          'to': { 'text-shadow': '0 0 10px #7FDBCA, 0 0 20px #7FDBCA, 0 0 30px #7FDBCA' }
        },
        flicker: {
          '0%, 18%, 22%, 25%, 53%, 57%, 100%': { opacity: '1' },
          '20%, 24%, 55%': { opacity: '0.4' }
        },
        scan: {
          '0%': { transform: 'translateY(-100vh)' },
          '100%': { transform: 'translateY(100vh)' }
        }
      }
    },
  },
  plugins: [],
}