# INLAAB Website - Next.js Migration

Esta es la migración completa del sitio web de INLAAB de Astro a Next.js 14 con App Router.

## 🚀 Características

- **Next.js 14** con App Router
- **TypeScript** para type safety
- **Tailwind CSS** para estilos (configuración idéntica al proyecto original)
- **API Routes** para el chatbot ISA
- **Componentes React** optimizados
- **Configuración lista para Vercel**

## 📁 Estructura del Proyecto

```
nextjs-migration/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── ask-isa/
│   │   │       └── route.ts          # API del chatbot ISA
│   │   ├── globals.css               # Estilos globales y fuentes
│   │   ├── layout.tsx                # Layout principal
│   │   └── page.tsx                  # Página principal
│   └── components/
│       ├── Hero.tsx                  # Componente Hero con navbar
│       ├── Services.tsx              # Sección DNA
│       ├── OurServices.tsx           # Nuestros servicios
│       ├── BeingFriends.tsx          # Sección Being Friends
│       ├── SimplifyingComplex.tsx    # Simplifying Complex
│       ├── OurOffer.tsx              # Nuestra oferta
│       ├── Contact.tsx               # Formulario de contacto
│       ├── Footer.tsx                # Footer
│       └── ChatBubble.tsx            # Componente del chat
├── public/                           # Archivos estáticos (copiar del proyecto original)
├── package.json
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
└── tsconfig.json
```

## 🛠️ Instalación y Configuración

### 1. Instalar dependencias

```bash
cd nextjs-migration
npm install
```

### 2. Copiar archivos públicos

Copia todos los archivos de la carpeta `public/` del proyecto original de Astro:

```bash
# Desde el directorio raíz del proyecto original
cp -r public/* nextjs-migration/public/
```

Esto incluye:
- Imágenes (BackHero.jpg, logos, etc.)
- Fuentes (carpeta fonts/)
- Favicon y otros assets

### 3. Variables de entorno (opcional)

Si necesitas configurar variables de entorno, crea un archivo `.env.local`:

```bash
# .env.local
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. Ejecutar en desarrollo

```bash
npm run dev
```

El sitio estará disponible en `http://localhost:3000`

## 🚀 Despliegue en Vercel

### Opción 1: Vercel CLI

```bash
npm install -g vercel
vercel
```

### Opción 2: GitHub + Vercel

1. Sube el código a un repositorio de GitHub
2. Conecta el repositorio en Vercel
3. Vercel detectará automáticamente que es un proyecto Next.js
4. El despliegue será automático

### Configuración de Vercel

El proyecto ya incluye la configuración necesaria:
- `next.config.js` con `output: 'standalone'`
- Estructura de API Routes compatible
- Optimizaciones de imagen con Next.js Image

## 🔧 Diferencias principales con Astro

### APIs
- **Astro**: `src/pages/api/ask-isa.ts` con `APIRoute`
- **Next.js**: `src/app/api/ask-isa/route.ts` con `NextRequest/NextResponse`

### Componentes
- **Astro**: Archivos `.astro` con frontmatter
- **Next.js**: Componentes React `.tsx` con hooks

### Imágenes
- **Astro**: `<img>` tags normales
- **Next.js**: Componente `<Image>` optimizado

### Estilos
- **Astro**: `<style>` tags en componentes
- **Next.js**: Clases de Tailwind y CSS modules

## 🎨 Características Migradas

✅ **Completamente migrado:**
- Layout principal con chat integrado
- Componente Hero con navbar dinámico
- Todos los componentes de sección
- API del chatbot ISA
- Estilos y fuentes personalizadas
- Configuración de Tailwind CSS
- Funcionalidad del chat

✅ **Mejorado en Next.js:**
- Optimización automática de imágenes
- Code splitting automático
- Mejor SEO con metadata API
- TypeScript nativo
- Mejor performance en producción

## 🐛 Solución de Problemas

### Error de fuentes
Si las fuentes no cargan correctamente, verifica que:
1. Los archivos de fuentes estén en `public/fonts/`
2. Los paths en `globals.css` sean correctos

### Error de imágenes
Si las imágenes no cargan:
1. Verifica que estén en `public/`
2. Los paths no deben incluir `/public/`

### Error de API
Si el chat no funciona:
1. Verifica que la API esté en `src/app/api/ask-isa/route.ts`
2. Comprueba que las credenciales de CodeGPT sean correctas

## 📞 Soporte

Si tienes problemas con la migración, revisa:
1. La documentación de Next.js 14
2. Los logs de desarrollo (`npm run dev`)
3. La consola del navegador para errores de JavaScript

---

**¡La migración está completa y lista para producción!** 🎉