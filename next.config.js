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
      // Puedes dejar solo estas dos, ya que el iFrame maneja el resto.
    ],
  },
  
  // Configuración de Vercel
  output: 'standalone',

  // =================================================================
  // === REGLAS DE REESCRITURA (REWITES) PARA SILENCIAR ERRORES ===
  // =================================================================
  
  // Usamos Rewrites solo para interceptar archivos que se buscan desde la raíz (/)
  // y que causan errores 404, como el manifest.json.
  async rewrites() {
    return [
      // 1. Interceptamos manifest.json para que apunte al servidor de NRK.
      // Esta regla es suficiente para silenciar el error, ya que solo necesitamos que el archivo exista.
      {
        source: '/manifest.json', 
        destination: 'https://cohe-inventories-nrk.flutterflow.app/manifest.json',
      },
    ];
  },
  
  // No necesitamos redirecciones permanentes (301).
  async redirects() {
    return []; 
  },

};

module.exports = nextConfig;
