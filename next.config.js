/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuración de Imágenes (Mantenemos tu configuración original)
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
      // OPCIONAL pero RECOMENDADO: Añadir los hostnames de Flutterflow para evitar problemas de optimización de imágenes.
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
  
  // Configuración para Vercel (Mantenemos tu configuración original)
  output: 'standalone',

  // =================================================================
  // === REGLAS DE REESCRITURA (REWRITES) ===
  // =================================================================
  
  // Usamos Rewrites para que el contenido externo (FlutterFlow) cargue BAJO tu dominio (inlaab.com)
  async rewrites() {
    return [
      // 1. Reglas para /nrk y sus sub-rutas
      {
        source: '/nrk', 
        destination: 'https://cohe-inventories-nrk.flutterflow.app',
      },
      {
        // El comodín :path* asegura que /nrk/login o /nrk/dashboard también funcione
        source: '/nrk/:path*', 
        destination: 'https://cohe-inventories-nrk.flutterflow.app/:path*',
      },
      
      // 2. Reglas para /cohe y sus sub-rutas
      {
        source: '/cohe', 
        destination: 'https://cohe-manager.flutterflow.app',
      },
      {
        // El comodín :path* para sub-rutas de /cohe
        source: '/cohe/:path*', 
        destination: 'https://cohe-manager.flutterflow.app/:path*',
      },
      
      // Puedes añadir más rutas aquí si fuera necesario
    ];
  },
  
  // Reglas de Redirección (redirects) si las necesitaras en el futuro
  async redirects() {
    return []; 
  },

};

module.exports = nextConfig;
