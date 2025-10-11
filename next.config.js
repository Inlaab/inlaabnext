/** @type {import('next').NextConfig} */
const nextConfig = {
  // Mantenemos tu configuración original
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
      // Puedes eliminar los hosts de Flutterflow de aquí
    ],
  },
  output: 'standalone',

  // Eliminamos completamente las secciones async rewrites() y async redirects()
  // No deben aparecer en el archivo.
};

module.exports = nextConfig;
