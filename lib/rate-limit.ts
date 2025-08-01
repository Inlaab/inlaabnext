import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Inicializar el cliente de Redis usando las variables de entorno de Upstash
export const redis = Redis.fromEnv();

// Configuración del rate limiter
export const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, '1 m'), // 5 peticiones por minuto
  analytics: true,
  prefix: 'rate-limit',
});
