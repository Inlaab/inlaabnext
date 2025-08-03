import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

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
  // Manejar preflight OPTIONS
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, { 
      status: 204,
      headers: getCorsHeaders()
    });
  }

  // Aplicar CORS a todas las respuestas
  const response = NextResponse.next();
  const corsHeaders = getCorsHeaders();
  
  // Agregar cabeceras CORS
  corsHeaders.forEach((value, key) => {
    response.headers.set(key, value);
  });

  return response;
}

export const config = {
  matcher: ['/api/:path*'],
  runtime: 'edge',
};
