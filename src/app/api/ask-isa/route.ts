import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { ratelimit } from '../../../../lib/rate-limit';

interface RequestBody {
  messages: Array<{
    role: 'user' | 'assistant';
    content: string;
  }>;
}

export async function POST(request: NextRequest) {
  // Aplicar rate limiting
  const ip = headers().get('x-forwarded-for') || '127.0.0.1';
  const { success, limit, reset, remaining } = await ratelimit.limit(ip);

  if (!success) {
    return new NextResponse(
      JSON.stringify({ 
        error: 'Demasiadas peticiones',
        message: 'Has excedido el límite de 5 peticiones por minuto' 
      }), 
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'X-RateLimit-Limit': limit.toString(),
          'X-RateLimit-Remaining': remaining.toString(),
          'X-RateLimit-Reset': reset.toString(),
          'Retry-After': '60'
        }
      }
    );
  }

  let body: RequestBody | null = null;

  try {
    body = await request.json();
  } catch (err) {
    return NextResponse.json(
      { error: 'Invalid or empty JSON body' },
      { status: 400 }
    );
  }

  if (!body || !Array.isArray(body.messages)) {
    return NextResponse.json(
      { error: 'Missing or invalid messages array in request body' },
      { status: 400 }
    );
  }

  // Get configuration from environment variables
  const CODEGPT_API_URL = process.env.CODEGPT_API_URL;
  const ORG_ID = process.env.CODEGPT_ORG_ID;
  const AGENT_ID = process.env.CODEGPT_AGENT_ID;
  const API_KEY = process.env.CODEGPT_API_KEY;

  // Validate environment variables with more detailed error message
  const missingVars = [];
  if (!CODEGPT_API_URL) missingVars.push('CODEGPT_API_URL');
  if (!ORG_ID) missingVars.push('CODEGPT_ORG_ID');
  if (!AGENT_ID) missingVars.push('CODEGPT_AGENT_ID');
  if (!API_KEY) missingVars.push('CODEGPT_API_KEY');
  
  if (missingVars.length > 0) {
    return NextResponse.json(
      { 
        error: 'Missing required environment variables',
        missingVariables: missingVars,
        message: 'Please configure the missing environment variables in your Vercel project settings.'
      },
      { status: 500 }
    );
  }

  // Construir historial de mensajes desde el frontend
  const messages = body.messages || [];

  const payload = {
    agentId: AGENT_ID,
    messages,
    format: 'text',
    stream: false, // Para simplificar la integración inicial
  };

  try {
    // Type assertion since we've already validated these variables
    const apiUrl = CODEGPT_API_URL!;
    // Create headers object with type assertion
    const headers = new Headers();
    headers.append('accept', 'application/json');
    headers.append('content-type', 'application/json');
    headers.append('CodeGPT-Org-Id', ORG_ID!);
    headers.append('authorization', `Bearer ${API_KEY}`);

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      let errorText;
      try {
        const errorData = await response.json();
        errorText = JSON.stringify(errorData);
      } catch {
        errorText = await response.text();
      }
      
      return NextResponse.json({ 
        error: 'Error from CodeGPT API',
        statusCode: response.status,
        statusText: response.statusText,
        details: errorText
      }, { 
        status: response.status 
      });
    }

    let data;
    try {
      data = await response.json();
    } catch (err) {
      // Si no es JSON, intenta leer como texto
      data = await response.text();
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
    const err = error as Error;
    
    // In production, you might want to use a proper logging service like Sentry, LogRocket, etc.
    // For now, we'll use a simple error handling approach that satisfies ESLint
    const handleError = (error: Error) => {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error('Error in ask-isa API route:', error);
      }
      // In production, you would typically send the error to a monitoring service
      // Example: Sentry.captureException(error);
    };
    
    handleError(err);
    
    return NextResponse.json({ 
      error: 'Internal server error',
      message: err.message,
      // Only include stack trace in development
      ...(process.env.NODE_ENV === 'development' ? { stack: err.stack } : {})
    }, { 
      status: 500 
    });
  }
}
