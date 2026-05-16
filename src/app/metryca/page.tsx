'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { FormEvent, Suspense, useState } from 'react';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get('next') ?? '/metryca/tours';

  const [code, setCode] = useState('');
  const [error, setError] = useState('');
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
      style={{ background: "#0f0f0f" }}
    >
      {/* Fondo decorativo sutil */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.04]"
          style={{ background: "#fbbe49", filter: "blur(120px)" }}
        />
      </div>

      <div className="relative w-full max-w-md">
        {/* Marca */}
        <div className="text-center mb-10">
          <p className="text-xs tracking-[0.4em] text-[#fbbe49]/70 uppercase mb-2">
            INLAAB
          </p>
          <h1
            className="text-5xl font-bold text-white leading-tight"
            style={{ fontFamily: 'var(--font-playfair, Georgia, serif)' }}
          >
            Metryca
          </h1>
          <p className="text-xs tracking-[0.3em] text-white/40 uppercase mt-2">
            recorridos 360°
          </p>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl p-8"
          style={{
            background: "linear-gradient(145deg, #1a1a1a 0%, #111111 100%)",
            border: "1px solid rgba(255,255,255,0.07)",
            boxShadow: "0 2px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)",
          }}
        >
          <p className="text-white/60 text-sm text-center mb-6 tracking-wide">
            Ingresa código de acceso
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                value={code}
                onChange={e => setCode(e.target.value.toUpperCase())}
                placeholder="••••••••"
                maxLength={32}
                autoComplete="off"
                spellCheck={false}
                className="w-full px-4 py-3 rounded-xl text-white text-center text-lg tracking-[0.3em] outline-none transition-all duration-300"
                style={{
                  background: 'rgba(255,255,255,0.10)',
                  border: `1px solid ${error ? 'rgba(213,40,40,0.6)' : 'rgba(255,255,255,0.20)'}`,
                }}
              />
              {error && (
                <p className="text-red-400 text-xs text-center mt-2">{error}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || !code.trim()}
              className="w-full py-3 rounded-xl font-semibold text-sm tracking-widest uppercase transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ background: '#fbbe49', color: '#003049' }}
              onMouseEnter={e => {
                (e.target as HTMLElement).style.background = '#f67f00';
                (e.target as HTMLElement).style.color = '#fff';
              }}
              onMouseLeave={e => {
                (e.target as HTMLElement).style.background = '#fbbe49';
                (e.target as HTMLElement).style.color = '#003049';
              }}
            >
              {loading ? 'Verificando...' : 'Ingresar'}
            </button>
          </form>
        </div>

        <p className="text-center text-white/20 text-xs mt-8 tracking-widest uppercase">
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
