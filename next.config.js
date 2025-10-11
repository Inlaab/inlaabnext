/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuración de Imágenes (Tus configuraciones originales, más los hostnames externos)
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: 'localhost',
      },
      // Hosts de Flutterflow: Añadidos para prevenir errores de optimización
      {
        protocol: 'https',
        hostname: 'cohe-inventories-nrk.flutterflow.app', 
      },
      {
        protocol: 'https',
        hostname: 'cohe-manager.flutterflow.app', 
      },
    ],
  },
  
  // Configuración de Vercel
  output: 'standalone',

  // =================================================================
  // === REGLAS DE REESCRITURA (REWRITES) PARA ENMASCARAMIENTO ===
  // =================================================================
  
  async rewrites() {
    return [
      
      // 1. REGLAS ESPECÍFICAS DE INTERCEPTACIÓN (La clave para arreglar el 404)
      // Estas reglas interceptan los archivos estáticos que FlutterFlow pide desde la raíz (/)
      // y los reescribe al servidor de origen de la aplicación /nrk.
      {
        source: '/main.dart.js', 
        destination: 'https://cohe-inventories-nrk.flutterflow.app/main.dart.js',
      },
      {
        source: '/manifest.json', 
        destination: 'https://cohe-inventories-nrk.flutterflow.app/manifest.json',
      },
      
      // 2. REGLAS DE ENMASCARAMIENTO PARA /nrk
      {
        // Enmascara la URL base
        source: '/nrk', 
        destination: 'https://cohe-inventories-nrk.flutterflow.app/', 
      },
      {
        // Enmascara todas las sub-rutas de /nrk
        source: '/nrk/:path*', 
        destination: 'https://cohe-inventories-nrk.flutterflow.app/:path*',
      },
      
      // 3. REGLAS DE ENMASCARAMIENTO PARA /cohe
      // Asumimos que /cohe utiliza los MISMOS archivos estáticos principales.
      {
        source: '/cohe', 
        destination: 'https://cohe-manager.flutterflow.app/',
      },
      {
        source: '/cohe/:path*', 
        destination: 'https://cohe-manager.flutterflow.app/:path*',
      },
      
      
      // NOTA: Si al probar /cohe arroja 404 para archivos estáticos con nombres diferentes, 
      // debes añadir reglas de interceptación adicionales para esos archivos aquí.
      
    ];
  },
  
  async redirects() {
    return []; 
  },

};

module.exports = nextConfig;
