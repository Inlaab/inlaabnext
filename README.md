# INLAAB Website

> Sitio web corporativo de INLAAB desarrollado con Next.js 14, TypeScript y Tailwind CSS

[![Next.js](https://img.shields.io/badge/Next.js-14.0.4-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

## 📋 Descripción

Sitio web corporativo de **INLAAB** (Innovación y Tecnología para tu Negocio), una empresa especializada en desarrollo de software, consultoría tecnológica y soluciones digitales innovadoras. El sitio incluye un asistente virtual inteligente (ISA) integrado para atención al cliente.

## ✨ Características Principales

- 🚀 **Next.js 14** con App Router para máximo rendimiento
- 📱 **Diseño Responsive** optimizado para todos los dispositivos
- 🎨 **UI/UX Moderna** con animaciones fluidas y microinteracciones
- 🤖 **Chatbot ISA** integrado con IA para atención al cliente
- 🎯 **SEO Optimizado** con metadata dinámica
- ⚡ **Performance Optimizada** con lazy loading y code splitting
- 🔒 **TypeScript** para desarrollo type-safe con configuración estricta
- 🎨 **Tailwind CSS** con sistema de diseño personalizado
- 📊 **Analytics Ready** preparado para Google Analytics
- 🌐 **Internacionalización** preparada para múltiples idiomas (actualmente en inglés)
- 🛡️ **Seguridad Mejorada** con variables de entorno y código limpio
- 🔧 **Herramientas de Desarrollo** con ESLint, Prettier y VS Code optimizado

## 🏗️ Arquitectura del Proyecto

```
inlaab-website/
├── 📁 src/
│   ├── 📁 app/                    # App Router (Next.js 14)
│   │   ├── 📁 api/               # API Routes
│   │   │   └── 📁 ask-isa/       # Endpoint del chatbot
│   │   │       └── route.ts      # Handler de la API ISA
│   │   ├── globals.css           # Estilos globales y fuentes
│   │   ├── layout.tsx            # Layout raíz de la aplicación
│   │   └── page.tsx              # Página principal (Home)
│   └── 📁 components/            # Componentes React reutilizables
│       ├── Hero.tsx              # Hero section con navbar dinámico
│       ├── Services.tsx          # Sección DNA de servicios
│       ├── OurServices.tsx       # Grid de servicios principales
│       ├── BeingFriends.tsx      # Sección "Being Friends"
│       ├── SimplifyingComplex.tsx # Sección "Simplifying Complex"
│       ├── OurOffer.tsx          # Propuesta de valor
│       ├── Contact.tsx           # Formulario de contacto
│       └── ChatBubble.tsx        # Componente del chatbot ISA
├── 📁 public/                    # Assets estáticos
│   ├── 📁 fonts/                # Fuentes personalizadas
│   │   ├── Artifakt Element/     # Familia tipográfica principal
│   │   ├── Playfair Display/     # Tipografía para títulos
│   │   └── Rajdhani/            # Tipografía complementaria
│   ├── 📁 assets/               # Imágenes y recursos
│   ├── BackHero.jpg             # Imagen de fondo del hero
│   ├── Logo INLAAB.svg          # Logo principal
│   └── favicon.svg              # Favicon del sitio
├── 📄 next.config.js            # Configuración de Next.js
├── 📄 tailwind.config.js        # Configuración de Tailwind CSS
├── 📄 tsconfig.json             # Configuración de TypeScript
├── 📄 package.json              # Dependencias y scripts
└── 📄 README.md                 # Documentación del proyecto
```

## 🎨 Sistema de Diseño

### Paleta de Colores

```css
/* Colores principales de INLAAB */
--inlaab-blue: #003049      /* Azul corporativo principal */
--inlaab-red: #d52828       /* Rojo para CTAs y alertas */
--inlaab-orange: #f67f00    /* Naranja para acentos */
--inlaab-yellow: #fbbe49    /* Amarillo para highlights */
--inlaab-cream: #e9e1b6     /* Crema para fondos suaves */
--inlaab-white: #ffffff     /* Blanco puro */
```

### Tipografía

- **Artifakt Element**: Tipografía principal para texto y UI
- **Playfair Display**: Tipografía elegante para títulos principales
- **Rajdhani**: Tipografía moderna para elementos específicos

### Componentes UI

- Navbar dinámico con efectos de scroll
- Botones con gradientes y microanimaciones
- Cards con hover effects y sombras suaves
- Formularios con validación visual
- Chat bubble con animaciones fluidas

## 🤖 Chatbot ISA (Inlaab Sales Assistant)

### Características

- **IA Conversacional**: Powered by CodeGPT API
- **Contexto Empresarial**: Entrenado con información específica de INLAAB
- **Interfaz Intuitiva**: Chat bubble flotante con animaciones
- **Responsive**: Adaptado para móviles y desktop
- **Historial**: Mantiene contexto de la conversación

### Configuración API

```typescript
// src/app/api/ask-isa/route.ts
// Configuración segura usando variables de entorno
const CODEGPT_API_URL = process.env.CODEGPT_API_URL
const ORG_ID = process.env.CODEGPT_ORG_ID
const AGENT_ID = process.env.CODEGPT_AGENT_ID
const API_KEY = process.env.CODEGPT_API_KEY
```

### Seguridad

- **Variables de entorno**: Todas las credenciales API están externalizadas
- **Validación de entorno**: Verificación automática de variables requeridas
- **Código limpio**: Sin console.log en producción
- **Manejo de errores**: Gestión segura de fallos de API

## 🛠️ Instalación y Desarrollo

### Prerrequisitos

- Node.js 18.0 o superior
- npm, yarn o pnpm
- Git

### TypeScript

El proyecto utiliza TypeScript con configuración estricta mejorada para garantizar la máxima calidad del código:

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true
  }
}
```

**Beneficios de la configuración estricta:**
- Detección temprana de errores
- Mejor autocompletado en el IDE
- Código más robusto y mantenible
- Prevención de bugs comunes

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/Inlaab/inlaabnext.git
cd inlaabnext

# Instalar dependencias
npm install
# o
yarn install
# o
pnpm install
```

### Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```bash
# .env.local
CODEGPT_API_URL=https://api.codegpt.co
CODEGPT_ORG_ID=tu_org_id
CODEGPT_AGENT_ID=tu_agent_id
CODEGPT_API_KEY=tu_api_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX  # Google Analytics (opcional)
NODE_ENV=development
```

### 🔧 Herramientas de Desarrollo

- **ESLint**: Análisis estático de código con reglas TypeScript personalizadas
- **Prettier**: Formateo automático de código con configuración consistente
- **TypeScript**: Verificación de tipos estricta en tiempo de compilación
- **VS Code**: Configuración optimizada con extensiones recomendadas

#### Configuración VS Code

El proyecto incluye configuración automática para VS Code:

- **Formateo automático**: Al guardar archivos
- **Organización de imports**: Automática
- **Extensiones recomendadas**: Se instalan automáticamente
- **Configuración TypeScript**: Optimizada para el proyecto

#### Extensiones VS Code Recomendadas

- Prettier - Code formatter
- ESLint
- Tailwind CSS IntelliSense
- TypeScript Importer
- Auto Rename Tag
- Path Intellisense
- Code Spell Checker

#### Git Hooks Recomendados

```bash
# Pre-commit hook
npm run check-all
```

## 🔍 Mejoras de Calidad Implementadas

### Audit de Seguridad y Calidad

Se han implementado las siguientes mejoras basadas en un audit completo del código:

#### 🛡️ Seguridad
- **Externalización de credenciales**: API keys movidas a variables de entorno
- **Eliminación de logs**: Removidos console.log de producción
- **Validación de entorno**: Verificación automática de variables requeridas

#### 🔧 Calidad de Código
- **TypeScript estricto**: Configuración mejorada con reglas adicionales
- **ESLint actualizado**: Reglas TypeScript específicas
- **Prettier integrado**: Formateo consistente automático
- **Limpieza de código**: Eliminación de variables no utilizadas
- **Manejo de eventos**: Cleanup adecuado de event listeners

#### 🛠️ Herramientas de Desarrollo
- **VS Code optimizado**: Configuración automática y extensiones
- **Scripts mejorados**: Comandos para linting, formateo y verificación
- **Documentación actualizada**: README con mejores prácticas

## 🚀 Desarrollo

### Comandos Disponibles

```bash
# Desarrollo local
npm run dev

# Build de producción
npm run build

# Iniciar servidor de producción
npm run start

# Linting y formateo
npm run lint              # Ejecutar ESLint
npm run lint:fix          # Corregir errores de ESLint automáticamente
npm run format            # Formatear código con Prettier
npm run format:check      # Verificar formato sin cambios
npm run type-check        # Verificar tipos de TypeScript
npm run check-all         # Ejecutar todas las verificaciones
npm run analyze           # Analizar bundle size
```

### Desarrollo Local

1. Ejecuta `npm run dev`
2. Abre [http://localhost:3000](http://localhost:3000)
3. Los cambios se reflejan automáticamente (Hot Reload)

## 🚀 Despliegue

### Vercel (Recomendado)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Inlaab/inlaabnext)

```bash
# Usando Vercel CLI
npm i -g vercel
vercel
```

### Otras Plataformas

- **Netlify**: Compatible con build automático
- **AWS Amplify**: Soporte nativo para Next.js
- **Railway**: Deploy directo desde GitHub
- **Docker**: Dockerfile incluido para containerización

### Configuración de Producción

El proyecto incluye optimizaciones para producción:

- Output standalone para mejor performance
- Compresión de imágenes automática
- Code splitting optimizado
- Caché de assets estáticos
- SEO metadata completa

## 📊 Performance

### Métricas Objetivo

- **Lighthouse Score**: 95+ en todas las categorías
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **Time to Interactive**: < 3.5s

### Optimizaciones Implementadas

- ⚡ Lazy loading de imágenes y componentes
- 🗜️ Compresión automática de assets
- 📦 Code splitting por rutas
- 🔄 Caché inteligente de recursos
- 🖼️ Optimización automática de imágenes con Next.js Image
- 📱 Responsive images con srcset automático

## 🧪 Testing

```bash
# Tests unitarios (cuando se implementen)
npm run test

# Tests e2e (cuando se implementen)
npm run test:e2e

# Coverage
npm run test:coverage
```

## 📱 Responsive Design

### Breakpoints

```css
/* Tailwind CSS Breakpoints */
sm: 640px   /* Móviles grandes */
md: 768px   /* Tablets */
lg: 1024px  /* Laptops */
xl: 1280px  /* Desktops */
2xl: 1536px /* Pantallas grandes */
```

### Características Responsive

- 📱 Mobile-first design
- 🖥️ Adaptación automática a diferentes pantallas
- 👆 Touch-friendly en dispositivos móviles
- 🔄 Orientación landscape/portrait
- ⌨️ Navegación por teclado accesible

## ♿ Accesibilidad

- **WCAG 2.1 AA** compliance
- **Semantic HTML** estructura
- **ARIA labels** en elementos interactivos
- **Keyboard navigation** completa
- **Screen reader** compatible
- **Color contrast** optimizado

## 🔧 Configuración Avanzada

### Tailwind CSS Personalizado

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        inlaab: {
          blue: '#003049',
          red: '#d52828',
          orange: '#f67f00',
          yellow: '#fbbe49',
          cream: '#e9e1b6',
        }
      },
      fontFamily: {
        sans: ['Artifakt Element', 'system-ui'],
        heading: ['Playfair Display', 'serif'],
      }
    }
  }
}
```

### Next.js Configuración

```javascript
// next.config.js
module.exports = {
  images: {
    domains: ['localhost'],
    formats: ['image/webp', 'image/avif'],
  },
  output: 'standalone',
  experimental: {
    optimizeCss: true,
  }
}
```

## 🐛 Troubleshooting

### Problemas Comunes

#### Fuentes no cargan
```bash
# Verificar que las fuentes estén en public/fonts/
ls public/fonts/

# Verificar paths en globals.css
grep -n "font-face" src/app/globals.css
```

#### Imágenes no aparecen
```bash
# Verificar estructura de public/
ls public/

# Verificar paths (sin /public/ en el código)
# ✅ Correcto: /logo.svg
# ❌ Incorrecto: /public/logo.svg
```

#### Chat no funciona
```bash
# Verificar API endpoint
curl -X POST http://localhost:3000/api/ask-isa \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"test"}]}'

# Verificar logs del servidor
npm run dev
```

#### Build falla
```bash
# Limpiar caché
rm -rf .next
npm run build

# Verificar TypeScript
npx tsc --noEmit
```

## 📚 Recursos Adicionales

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vercel Deployment Guide](https://vercel.com/docs)

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

## 👥 Equipo

**INLAAB Development Team**
- 🌐 Website: [inlaab.com](https://inlaab.com)
- 📧 Email: info@inlaab.com
- 💼 LinkedIn: [INLAAB](https://linkedin.com/company/inlaab)

---

<div align="center">
  <strong>Desarrollado con ❤️ por el equipo de INLAAB</strong>
  <br>
  <em>We are Developers, of Business.</em>
</div>