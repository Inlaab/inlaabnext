import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  let body: any = null;
  
  try {
    body = await request.json();
    console.log('Body recibido en ask-isa:', body);
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

  const CODEGPT_API_URL = 'https://api-beta.codegpt.co/api/v1/chat/completions';
  const ORG_ID = 'd5e1b2bf-2bde-4445-adec-7f5c32277f38';
  const AGENT_ID = 'e2a9e0fc-6e00-4ebf-bc16-1b0d742eecb7';
  const API_KEY = 'sk-6c0f9e72-cd5e-41d7-bdaf-99614bb3a225';

  // Construir historial de mensajes desde el frontend
  const messages = body.messages || [];

  const payload = {
    agentId: AGENT_ID,
    messages,
    format: 'text',
    stream: false // Para simplificar la integración inicial
  };

  try {
    const response = await fetch(CODEGPT_API_URL, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'CodeGPT-Org-Id': ORG_ID,
        authorization: `Bearer ${API_KEY}`
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const error = await response.text();
      return NextResponse.json(
        { error },
        { status: 500 }
      );
    }

    let data;
    try {
      data = await response.json();
    } catch (err) {
      // Si no es JSON, intenta leer como texto
      data = await response.text();
    }
    
    console.log('CodeGPT API response:', data);
    
    // Si la respuesta es string plano, envuélvela en { result: ... }
    if (typeof data === 'string') {
      return NextResponse.json(
        { result: data },
        { 
          status: 200,
          headers: { 'Content-Type': 'application/json' }
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
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}