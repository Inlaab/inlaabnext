'use client';

import { motion } from 'framer-motion';

export default function MetrycaBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">

      {/* Orb 1 — rojo top-left */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 700, height: 700,
          top: '-20%', left: '-20%',
          background: 'radial-gradient(circle, rgba(185,28,28,0.18) 0%, transparent 65%)',
          filter: 'blur(2px)',
        }}
        animate={{ x: [0, 80, -30, 0], y: [0, -50, 40, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Orb 2 — naranja bottom-right */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 600, height: 600,
          bottom: '-15%', right: '-15%',
          background: 'radial-gradient(circle, rgba(249,115,22,0.12) 0%, transparent 65%)',
          filter: 'blur(2px)',
        }}
        animate={{ x: [0, -60, 40, 0], y: [0, 40, -60, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
      />

      {/* Orb 3 — rojo center sutil */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 400, height: 400,
          top: '35%', left: '35%',
          background: 'radial-gradient(circle, rgba(220,38,38,0.08) 0%, transparent 65%)',
        }}
        animate={{ x: [0, 50, -40, 20, 0], y: [0, -40, 50, -20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 9 }}
      />

      {/* Grid en perspectiva */}
      <style>{`
        @keyframes gridScroll {
          from { background-position: 0 0, 0 0; }
          to   { background-position: 0 70px, 0 70px; }
        }
      `}</style>
      <div
        style={{
          position: 'absolute', inset: 0,
          perspective: '500px',
          perspectiveOrigin: '50% 42%',
        }}
      >
        <div
          style={{
            position: 'absolute',
            width: '200%', height: '200%',
            left: '-50%', top: '28%',
            transformOrigin: '50% 0%',
            transform: 'rotateX(72deg)',
            backgroundImage: `
              linear-gradient(to right, rgba(220,38,38,0.14) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(220,38,38,0.09) 1px, transparent 1px)
            `,
            backgroundSize: '70px 70px',
            animation: 'gridScroll 5s linear infinite',
          }}
        />
      </div>

      {/* Fade bottom */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%',
        background: 'linear-gradient(to top, #0f0f0f 25%, transparent 100%)',
      }} />

      {/* Fade top */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '28%',
        background: 'linear-gradient(to bottom, #0f0f0f 0%, transparent 100%)',
      }} />

      {/* Vignette radial */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(0,0,0,0.6) 100%)',
      }} />
    </div>
  );
}
