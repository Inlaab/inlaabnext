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
      // Hosts de Flutterflow: Necesarios para prevenir errores de optimización de imágenes.
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
      
      // 1. REGLAS DE INTERCEPTACIÓN GLOBAL (Solución al error 404 en la consola)
      // Intercepta recursos que las apps de FlutterFlow buscan desde la raíz (/)
      {
        // main.dart.js y manifest.json son la clave. Apuntamos a la app de /nrk, asumiendo que el recurso es igual.
        source: '/main.dart.js', 
        destination: 'https://cohe-inventories-nrk.flutterflow.app/main.dart.js',
      },
      {
        source: '/manifest.json', 
        destination: 'https://cohe-inventories-nrk.flutterflow.app/manifest.json',
      },
      {
        // Intercepta iconos y otros recursos dentro de /icons/
        source: '/icons/:path*', 
        destination: 'https://cohe-inventories-nrk.flutterflow.app/icons/:path*',
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
      {
        // Enmascara la URL base
        source: '/cohe', 
        destination: 'https://cohe-manager.flutterflow.app/',
      },
      {
        // Enmascara todas las sub-rutas de /cohe
        source: '/cohe/:path*', 
        destination: 'https://cohe-manager.flutterflow.app/:path*',
      },
      
    ];
  },
  
  // No necesitamos redirecciones permanentes (301) ya que estamos usando enmascaramiento.
  async redirects() {
    return []; 
  },

};

module.exports = nextConfig;
