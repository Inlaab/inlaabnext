import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Inicializar el cliente de Redis usando las variables de entorno de Upstash
export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL as string,
  token: process.env.UPSTASH_REDIS_REST_TOKEN as string,
});

// Configuración del rate limiter
export const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, '1 m'), // 5 peticiones por minuto
  analytics: true,
  prefix: 'rate-limit',
  // Opciones adicionales para mejor depuración
  timeout: 10000, // 10 segundos de timeout
});
