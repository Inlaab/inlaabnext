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
        // Paleta de colores oficial de INLAAB
        inlaab: {
          blue: '#003049',      // Azul principal
          red: '#d52828',       // Rojo
          orange: '#f67f00',    // Naranja
          yellow: '#fbbe49',    // Amarillo
          cream: '#e9e1b6',     // Crema
          white: '#ffffff',     // Blanco
        },
        // Alias para facilitar el uso
        primary: '#003049',     // Azul como color primario
        secondary: '#fbbe49',   // Amarillo como secundario
        accent: '#f67f00',      // Naranja como acento
        danger: '#d52828',      // Rojo para alertas
        neutral: '#e9e1b6',     // Crema como neutral
      },
      fontFamily: {
        // Fuentes personalizadas
        sans: ['Artifakt Element', 'Inter', 'Helvetica Neue', 'system-ui', 'sans-serif'],
        heading: ['Playfair Display', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'Consolas', 'Monaco', 'monospace'],
        rajdhani: ['Rajdhani', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Tamaños de fuente personalizados
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      spacing: {
        // Espaciados personalizados
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        // Bordes redondeados personalizados
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        // Sombras personalizadas
        'inlaab': '0 4px 6px -1px rgba(0, 65, 176, 0.1), 0 2px 4px -1px rgba(0, 65, 176, 0.06)',
        'inlaab-lg': '0 10px 15px -3px rgba(0, 65, 176, 0.1), 0 4px 6px -2px rgba(0, 65, 176, 0.05)',
        'inlaab-xl': '0 20px 25px -5px rgba(0, 65, 176, 0.1), 0 10px 10px -5px rgba(0, 65, 176, 0.04)',
      },
      animation: {
        // Animaciones personalizadas
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
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
        pulse: {
          '0%, 100%': { opacity: '0.7' },
          '50%': { opacity: '0.9' },
        },
      },
      backgroundImage: {
        // Gradientes personalizados
        'gradient-inlaab': 'linear-gradient(135deg, #003049 0%, #fbbe49 100%)',
        'gradient-inlaab-reverse': 'linear-gradient(135deg, #fbbe49 0%, #003049 100%)',
        'gradient-hero': 'linear-gradient(135deg, #003049 0%, #f67f00 50%, #d52828 100%)',
        'gradient-warm': 'linear-gradient(135deg, #f67f00 0%, #fbbe49 50%, #e9e1b6 100%)',
      }
    },
  },
  plugins: [],
}