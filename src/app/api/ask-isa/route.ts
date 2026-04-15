import { NextRequest, NextResponse } from 'next/server';
import { ratelimit } from '../../../../lib/rate-limit';

// Definir tipos para el logger
type LoggerMethod = (...args: unknown[]) => void;

interface Logger {
  log: LoggerMethod;
  error: LoggerMethod;
}

// Implementación del logger que solo muestra mensajes en desarrollo
const logger: Logger = {
  log: (...args: unknown[]): void => {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.log('[LOG]', ...args);
    }
  },
  error: (...args: unknown[]): void => {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error('[ERROR]', ...args);
    }
  },
};

interface RequestBody {
  messages: Array<{
    role: 'user' | 'assistant';
    content: string;
  }>;
}

// Obtener variables de entorno
const CODEGPT_API_URL = process.env.CODEGPT_API_URL || '';
const ORG_ID = process.env.CODEGPT_ORG_ID || '';
const AGENT_ID = process.env.CODEGPT_AGENT_ID || '';
const API_KEY = process.env.CODEGPT_API_KEY || '';

export async function POST(request: NextRequest) {
  try {
    // Obtener la IP del cliente de forma segura
    const forwardedFor = request.headers.get('x-forwarded-for') ?? '';
    const firstIp = forwardedFor.split(',').find(ip => ip.trim().length > 0);
    const ip = firstIp ? firstIp.trim() : '127.0.0.1';

    logger.log('Rate limiting para IP:', ip);

    // Aplicar rate limiting - La implementación actual no necesita la IP
    const result = await ratelimit.limit();
    logger.log('Resultado del rate limit:', result);

    // Configurar cabeceras de respuesta
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    headers.set('X-RateLimit-Limit', result.limit.toString());
    headers.set('X-RateLimit-Remaining', result.remaining.toString());
    headers.set('X-RateLimit-Reset', result.reset.toString());

    // Verificar si se excedió el límite
    if (!result.success) {
      logger.log('Límite excedido para IP:', ip);
      headers.set('Retry-After', '60');

      return new NextResponse(
        JSON.stringify({
          error: 'Demasiadas peticiones',
          message: 'Has excedido el límite de 5 peticiones por minuto',
        }),
        {
          status: 429,
          headers,
        }
      );
    }

    // Si todo está bien, continuar con la solicitud
    logger.log(
      'Petición permitida para IP:',
      ip,
      'Restantes:',
      result.remaining
    );

    // Procesar la solicitud usando la función handleCodeGPTRequest
    const response = await handleCodeGPTRequest(request);

    // Agregar las cabeceras de rate limit a la respuesta
    if (response) {
      headers.forEach((value, key) => {
        response.headers.set(key, value);
      });
      return response;
    }

    return NextResponse.json(
      { error: 'Error al procesar la solicitud' },
      { status: 500 }
    );
  } catch (error) {
    logger.error('Error en el rate limiting:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

// Función para manejar la solicitud a la API de CodeGPT
async function handleCodeGPTRequest(request: NextRequest) {
  try {
    const body = (await request.json()) as RequestBody;

    if (!body || !Array.isArray(body.messages)) {
      return NextResponse.json(
        { error: 'Missing or invalid messages array in request body' },
        { status: 400 }
      );
    }

    // Validar variables de entorno
    if (!CODEGPT_API_URL || !ORG_ID || !AGENT_ID || !API_KEY) {
      return NextResponse.json(
        {
          error: 'Missing required environment variables',
          missingVariables: [
            !CODEGPT_API_URL ? 'CODEGPT_API_URL' : null,
            !ORG_ID ? 'CODEGPT_ORG_ID' : null,
            !AGENT_ID ? 'CODEGPT_AGENT_ID' : null,
            !API_KEY ? 'CODEGPT_API_KEY' : null,
          ].filter(Boolean),
        },
        { status: 500 }
      );
    }

    const payload = {
      agentId: AGENT_ID,
      messages: body.messages || [],
      format: 'text',
      stream: false,
    };

    const headers = new Headers({
      accept: 'application/json',
      'content-type': 'application/json',
      'CodeGPT-Org-Id': ORG_ID,
      authorization: `Bearer ${API_KEY}`,
    });

    const apiUrl = CODEGPT_API_URL;

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      let errorText;
      const rawErrorText = await response.text();
      try {
        const errorData = JSON.parse(rawErrorText);
        errorText = JSON.stringify(errorData);
      } catch {
        errorText = rawErrorText;
      }

      return NextResponse.json(
        {
          error: 'Error from CodeGPT API',
          statusCode: response.status,
          statusText: response.statusText,
          details: errorText,
        },
        {
          status: response.status,
        }
      );
    }

    let data;
    const responseText = await response.text();
    try {
      data = JSON.parse(responseText);
    } catch {
      // Si no es JSON, usa el texto directamente
      data = responseText;
    }

    // Response processed successfully

    // Si la respuesta es string plano, envuélvela en { result: ... }
    if (typeof data === 'string') {
      return NextResponse.json(
        { result: data },
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    if (!data || (!data.choices && !data.result)) {
      return NextResponse.json(
        { error: 'No valid answer from CodeGPT', data },
        { status: 502 }
      );
    }

    return NextResponse.json(data, {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    logger.error('Error en la API de CodeGPT:', error);

    return NextResponse.json(
      {
        error: 'Error en la comunicación con el servicio de IA',
        message: error instanceof Error ? error.message : 'Error desconocido',
      },
      {
        status: 500,
      }
    );
  }
}
