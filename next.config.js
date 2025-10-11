/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuración de Imágenes (Tu configuración original, más los hostnames externos)
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
      // Hosts de Flutterflow: Añadidos para prevenir errores de optimización de imágenes si Flutterflow las usa
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
  // === REGLAS DE REESCRITURA (REWRITES) ROBUSTAS PARA PROXY INVERSO ===
  // =================================================================
  
  async rewrites() {
    return [
      // 1. Reglas para /nrk
      {
        // Petición a la URL base (inlaab.com/nrk)
        source: '/nrk', 
        destination: 'https://cohe-inventories-nrk.flutterflow.app/', // Apunta a la raíz del destino
      },
      {
        // Petición a cualquier sub-ruta (inlaab.com/nrk/login, inlaab.com/nrk/main.dart.js, etc.)
        source: '/nrk/:path*', 
        destination: 'https://cohe-inventories-nrk.flutterflow.app/:path*',
      },
      
      // 2. Reglas para /cohe
      {
        // Petición a la URL base (inlaab.com/cohe)
        source: '/cohe', 
        destination: 'https://cohe-manager.flutterflow.app/', // Apunta a la raíz del destino
      },
      {
        // Petición a cualquier sub-ruta (inlaab.com/cohe/recursos, etc.)
        source: '/cohe/:path*', 
        destination: 'https://cohe-manager.flutterflow.app/:path*',
      },
      
    ];
  },
  
  // Reglas de Redirección (las dejamos vacías por ahora)
  async redirects() {
    return []; 
  },

};

module.exports = nextConfig;
