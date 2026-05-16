'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormEvent, Suspense, useState } from 'react';
import MetrycaBackground from './components/MetrycaBackground';

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 260, damping: 24 } },
};

function LoginForm() {
  const router       = useRouter();
  const searchParams = useSearchParams();
  const next         = searchParams.get('next') ?? '/metryca/tours';

  const [code,    setCode]    = useState('');
  const [error,   setError]   = useState('');
  const [loading, setLoading] = useState(false);
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!code.trim() || loading) return;
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
        setCode('');
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
      <MetrycaBackground />

      <div className="relative w-full max-w-sm z-10">

        {/* Logo */}
        <motion.div
          className="flex flex-col items-center mb-10"
          initial={{ opacity: 0, y: -28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 22, delay: 0.05 }}
        >
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          >
            <Image
              src="/Logo Metryca.svg"
              alt="Metryca"
              width={220}
              height={118}
              style={{ filter: 'brightness(0) invert(1)' }}
              priority
            />
          </motion.div>
          <motion.p
            className="text-[10px] tracking-[0.4em] uppercase mt-3"
            style={{ color: 'rgba(255,255,255,0.2)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            recorridos 360°
          </motion.p>
        </motion.div>

        {/* Card glassmorfismo con border-beam */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 220, damping: 26, delay: 0.18 }}
          style={{
            position: 'relative',
            borderRadius: '1rem',
            padding: '1px',
            overflow: 'hidden',
          }}
        >
          {/* Beam giratorio */}
          <motion.div
            className="animate-spin"
            style={{
              position: 'absolute',
              width: '200%', height: '200%',
              top: '-50%', left: '-50%',
              animationDuration: '5s',
              animationTimingFunction: 'linear',
              background: 'conic-gradient(from 0deg, transparent 60%, rgba(153,27,27,0.5) 74%, rgba(220,38,38,0.9) 82%, rgba(153,27,27,0.5) 89%, transparent 100%)',
            }}
          />

          {/* Card interior — glassmorfismo */}
          <div
            style={{
              position: 'relative',
              borderRadius: 'calc(1rem - 1px)',
              background: 'rgba(12,12,12,0.88)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              padding: '2rem',
            }}
          >
            <motion.p
              className="text-[11px] tracking-[0.3em] text-white/25 text-center uppercase mb-7"
              variants={item}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.35 } as never}
            >
              Ingresa tu código de acceso
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 24, delay: 0.45 }}
            >
              <style>{`
                @keyframes btnColor {
                  0%   { background-color: #dc2626; }
                  33%  { background-color: #f97316; }
                  66%  { background-color: #fbbe49; }
                  100% { background-color: #dc2626; }
                }
              `}</style>

              <form onSubmit={handleSubmit}>
                {/* Fila: input + botón cuadrado */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={code}
                    onChange={e => {
                      if (error) setError('');
                      setCode(e.target.value.toUpperCase());
                    }}
                    placeholder="· · · · · · · ·"
                    maxLength={32}
                    autoComplete="off"
                    autoCapitalize="characters"
                    spellCheck={false}
                    disabled={loading}
                    className="flex-1 min-w-0 px-4 py-3 rounded-xl text-center text-base tracking-[0.4em] outline-none disabled:opacity-40"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: 'none',
                      color: 'rgba(200,200,200,0.6)',
                      caretColor: 'rgba(255,255,255,0.4)',
                    }}
                  />

                  <motion.button
                    type="submit"
                    disabled={loading || !code.trim()}
                    whileTap={{ scale: 0.92 }}
                    className="flex-shrink-0 flex items-center justify-center rounded-xl disabled:opacity-30 disabled:cursor-not-allowed"
                    style={{
                      width: '48px',
                      height: '48px',
                      animation: 'btnColor 20s ease infinite',
                      border: 'none',
                    }}
                  >
                    {loading ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(0,0,0,0.7)" strokeWidth="2.5" strokeLinecap="round">
                        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(0,0,0,0.7)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    )}
                  </motion.button>
                </div>

                <p className="text-[11px] text-center mt-2 h-4" style={{ color: 'rgba(220,38,38,0.9)' }}>
                  {error}
                </p>
              </form>
            </motion.div>
          </div>
        </motion.div>

        <motion.p
          className="text-center text-[10px] tracking-[0.4em] uppercase mt-8"
          style={{ color: 'rgba(255,255,255,0.1)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65, duration: 0.6 }}
        >
          Acceso privado · Solo usuarios autorizados
        </motion.p>
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
