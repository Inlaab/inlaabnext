import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  let body: any = null;

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

  // Validate environment variables
  if (!CODEGPT_API_URL || !ORG_ID || !AGENT_ID || !API_KEY) {
    return NextResponse.json(
      { error: 'Missing required environment variables' },
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
    const response = await fetch(CODEGPT_API_URL, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'CodeGPT-Org-Id': ORG_ID,
        authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error = await response.text();
      return NextResponse.json({ error }, { status: 500 });
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
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
