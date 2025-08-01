import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Configuración
const RATE_LIMIT = 5; // 5 peticiones (reducido para pruebas)
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minuto

// Usamos un Map en memoria (en producción, usa una solución distribuida como Redis)
const rateLimitCache = new Map<string, { count: number; resetTime: number }>();

// Última limpieza
let lastCleanup = Date.now();

// Función para limpiar entradas expiradas
function cleanupExpiredEntries() {
  const now = Date.now();
  // Usamos un enfoque compatible con Edge Runtime
  const keysToCheck: string[] = [];
  // Primero recolectamos las claves a verificar
  rateLimitCache.forEach((_, key) => {
    if (key) keysToCheck.push(key);
  });
  
  // Luego verificamos cada clave
  for (const key of keysToCheck) {
    const entry = rateLimitCache.get(key);
    if (entry && now > entry.resetTime) {
      rateLimitCache.delete(key);
    }
  }
  lastCleanup = now;
}

// Función para manejar CORS
function getCorsHeaders() {
  const headers = new Headers();
  headers.set('Access-Control-Allow-Origin', '*');
  headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  headers.set('Access-Control-Max-Age', '86400');
  return headers;
}

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Manejar preflight OPTIONS primero
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, { 
      status: 204,
      headers: getCorsHeaders()
    });
  }

  // Solo procesar rutas de API
  if (!path.startsWith('/api/')) {
    return NextResponse.next();
  }

  // Limpiar entradas expiradas periódicamente
  if (Date.now() - lastCleanup > RATE_LIMIT_WINDOW_MS) {
    cleanupExpiredEntries();
  }

  // Obtener IP del cliente
  const getClientIp = (req: NextRequest): string => {
    const xForwardedFor = req.headers.get('x-forwarded-for');
    const realIp = req.headers.get('x-real-ip');
    
    if (req.ip) return req.ip;
    if (realIp) return realIp;
    if (xForwardedFor) {
      const firstIp = xForwardedFor.split(',')[0]?.trim();
      if (firstIp) return firstIp;
    }
    return '127.0.0.1';
  };
  
  const ip = getClientIp(request);
  const now = Date.now();
  const cacheKey = `rl:${ip}`;
  
  // Obtener o inicializar el contador para esta IP
  let requestInfo = rateLimitCache.get(cacheKey);
  
  if (!requestInfo || now > requestInfo.resetTime) {
    requestInfo = {
      count: 0,
      resetTime: now + RATE_LIMIT_WINDOW_MS,
    };
  }

  // Incrementar contador
  requestInfo.count++;
  rateLimitCache.set(cacheKey, requestInfo);

  // Calcular valores para las cabeceras
  const remaining = Math.max(0, RATE_LIMIT - requestInfo.count);
  const reset = Math.ceil((requestInfo.resetTime - now) / 1000);

  // Crear respuesta base
  const response = new NextResponse();
  
  // Agregar cabeceras de rate limiting
  response.headers.set('X-RateLimit-Limit', RATE_LIMIT.toString());
  response.headers.set('X-RateLimit-Remaining', remaining.toString());
  response.headers.set('X-RateLimit-Reset', reset.toString());
  
  // Agregar cabeceras CORS
  const corsHeaders = getCorsHeaders();
  corsHeaders.forEach((value, key) => {
    response.headers.set(key, value);
  });

  // Manejar exceso de peticiones
  if (requestInfo.count > RATE_LIMIT) {
    return new NextResponse(
      JSON.stringify({
        error: 'Rate limit exceeded',
        message: `Demasiadas peticiones. Intenta de nuevo en ${reset} segundos.`
      }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': reset.toString(),
          ...Object.fromEntries(getCorsHeaders().entries())
        }
      }
    );
  }

  // Para peticiones que no son OPTIONS y están dentro del límite
  if (request.method !== 'OPTIONS') {
    // Aquí podrías modificar la respuesta si es necesario
    // Por ejemplo, agregar encabezados personalizados
  }

  return response;
}

export const config = {
  matcher: ['/api/:path*'],
  runtime: 'edge',
};


