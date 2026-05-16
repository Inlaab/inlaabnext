'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { FormEvent, Suspense, useState } from 'react';

function LoginForm() {
  const router       = useRouter();
  const searchParams = useSearchParams();
  const next         = searchParams.get('next') ?? '/metryca/tours';

  const [code,    setCode]    = useState('');
  const [error,   setError]   = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });
      if (res.ok) {
        router.push(next);
      } else {
        const data = await res.json();
        setError(data.error ?? 'Código incorrecto');
      }
    } catch {
      setError('Error de conexión. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden"
      style={{ background: '#0f0f0f' }}
    >
      <style>{`
        @keyframes btnColor {
          0%   { background-color: #dc2626; }
          33%  { background-color: #f97316; }
          66%  { background-color: #fbbe49; }
          100% { background-color: #dc2626; }
        }
      `}</style>
      {/* Glow decorativo */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full"
          style={{ background: '#b91c1c', filter: 'blur(140px)', opacity: 0.06 }}
        />
      </div>

      <div className="relative w-full max-w-sm">

        {/* Marca */}
        <div className="text-center mb-10">
          <p
            className="text-[10px] tracking-[0.5em] uppercase mb-3"
            style={{ color: 'rgba(255,255,255,0.25)', animation: 'fadeIn 0.6s ease 0.1s both' }}
          >
            INLAAB
          </p>
          <h1
            className="text-5xl font-bold text-white leading-tight"
            style={{ fontFamily: 'var(--font-playfair, Georgia, serif)', animation: 'slideUp 0.7s ease 0.2s both' }}
          >
            Metryca
          </h1>
          <p
            className="text-[10px] tracking-[0.4em] uppercase mt-3"
            style={{ color: 'rgba(255,255,255,0.2)', animation: 'fadeIn 0.6s ease 0.4s both' }}
          >
            recorridos 360°
          </p>
        </div>

        {/* Border Beam Card */}
        <div
          style={{
            position:     'relative',
            borderRadius: '1rem',
            padding:      '1px',
            overflow:     'hidden',
            animation:    'slideUp 0.7s ease 0.35s both',
          }}
        >
          {/* Beam giratorio */}
          <div
            className="animate-spin"
            style={{
              position:              'absolute',
              width:                 '200%',
              height:                '200%',
              top:                   '-50%',
              left:                  '-50%',
              animationDuration:     '5s',
              animationTimingFunction: 'linear',
              background:            'conic-gradient(from 0deg, transparent 60%, rgba(153,27,27,0.4) 74%, rgba(220,38,38,0.85) 82%, rgba(153,27,27,0.4) 89%, transparent 100%)',
            }}
          />

          {/* Card interior */}
          <div
            style={{
              position:     'relative',
              borderRadius: 'calc(1rem - 1px)',
              background:   'linear-gradient(145deg, #1a1a1a 0%, #111111 100%)',
              padding:      '2rem',
            }}
          >
            <p className="text-[11px] tracking-[0.3em] text-white/25 text-center uppercase mb-7">
              Ingresa tu código de acceso
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  value={code}
                  onChange={e => setCode(e.target.value.toUpperCase())}
                  placeholder="· · · · · · · ·"
                  maxLength={32}
                  autoComplete="off"
                  spellCheck={false}
                  className="w-full px-4 py-3 rounded-xl text-center text-base tracking-[0.4em] outline-none transition-all duration-300"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border:     `1px solid ${error ? 'rgba(185,28,28,0.5)' : 'rgba(255,255,255,0.10)'}`,
                    color:      'rgba(200,200,200,0.55)',
                    caretColor: 'rgba(255,255,255,0.4)',
                  }}
                />
                {error && (
                  <p className="text-[11px] text-center mt-2" style={{ color: 'rgba(220,38,38,0.9)' }}>
                    {error}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading || !code.trim()}
                className="w-full py-3 rounded-xl text-[11px] tracking-[0.35em] uppercase font-semibold disabled:opacity-25 disabled:cursor-not-allowed"
                style={{
                  backgroundColor: '#dc2626',
                  animation:       'btnColor 20s ease infinite',
                  color:           '#1a0800',
                  border:          'none',
                }}
              >
                {loading ? 'Verificando...' : 'Ingresar'}
              </button>
            </form>
          </div>
        </div>

        <p
          className="text-center text-[10px] tracking-[0.4em] uppercase mt-8"
          style={{ color: 'rgba(255,255,255,0.1)', animation: 'fadeIn 0.6s ease 0.7s both' }}
        >
          Acceso privado · Solo usuarios autorizados
        </p>
      </div>
    </main>
  );
}

export default function MetrycaLoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
