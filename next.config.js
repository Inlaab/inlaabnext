/** @type {import('next').NextConfig} */
const nextConfig = {
  // Mantenemos la configuración original
  images: {
    // ... tu configuración original aquí
    // Ya NO necesitas los hostnames de Flutterflow aquí
  },
  output: 'standalone',

  // Eliminamos las reglas de rewrites, ya que no funcionan.
  
  // =================================================================
  // === REDIRECCIONES (REDIRECTS) PARA ENVIAR EL TRÁFICO AL DOMINIO EXTERNO ===
  // =================================================================
  async redirects() {
    return [
      {
        // 1. Redirección para /nrk
        source: '/nrk', 
        destination: 'https://cohe-inventories-nrk.flutterflow.app', 
        permanent: true, // Redirección 301. Buen SEO.
      },
      {
        // 2. Redirección para /cohe
        source: '/cohe', 
        destination: 'https://cohe-manager.flutterflow.app', 
        permanent: true, // Redirección 301.
      },
      // Si la aplicación requiere que las sub-rutas también redirijan:
      {
        source: '/nrk/:path*', 
        destination: 'https://cohe-inventories-nrk.flutterflow.app/:path*', 
        permanent: true, 
      },
      {
        source: '/cohe/:path*', 
        destination: 'https://cohe-manager.flutterflow.app/:path*', 
        permanent: true, 
      },
    ];
  },
};

module.exports = nextConfig;
