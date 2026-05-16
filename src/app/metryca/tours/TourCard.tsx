'use client';

import Link from 'next/link';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

interface TourCardProps {
  slug:     string;
  title:    string;
  subtitle: string;
  accent:   string;
  glow:     string;
}

export default function TourCard({ slug, title, subtitle, accent, glow }: TourCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-70, 70], [8, -8]),  { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-70, 70], [-8, 8]),  { stiffness: 300, damping: 30 });
  const glowX   = useTransform(x, [-70, 70], [0, 100]);
  const glowY   = useTransform(y, [-70, 70], [0, 100]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect    = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width  / 2);
    y.set(e.clientY - rect.top  - rect.height / 2);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <Link href={`/metryca/tours/${slug}`} className="block" style={{ perspective: '800px' }}>
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        whileHover={{ scale: 1.03 }}
        transition={{ scale: { type: 'spring', stiffness: 300, damping: 28 } }}
        className="relative h-60 rounded-2xl p-7 flex flex-col justify-between cursor-pointer overflow-hidden"
      >
        {/* Fondo glassmorfismo */}
        <div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: 'rgba(255,255,255,0.035)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        />

        {/* Glow dinámico que sigue el mouse */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: useTransform(
              [glowX, glowY],
              ([gx, gy]) =>
                `radial-gradient(circle at ${gx}% ${gy}%, ${glow.replace(')', ', 0.6)').replace('rgba', 'rgba')} 0%, transparent 60%)`,
            ),
            opacity: 0,
          }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />

        {/* Borde accent al hover */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{ border: `1px solid ${accent}00` }}
          whileHover={{ borderColor: `${accent}30` }}
          transition={{ duration: 0.3 }}
        />

        {/* Contenido */}
        <div className="relative z-10 flex items-center gap-3">
          <motion.span
            className="text-[10px] tracking-[0.45em] uppercase font-medium"
            style={{ color: `${accent}80` }}
            whileHover={{ color: accent }}
          >
            360°
          </motion.span>
          <div
            className="h-px flex-1"
            style={{ background: `linear-gradient(90deg, ${accent}30, transparent)` }}
          />
        </div>

        <div className="relative z-10">
          <p
            className="text-[10px] tracking-[0.4em] uppercase mb-2"
            style={{ color: 'rgba(255,255,255,0.25)' }}
          >
            {subtitle}
          </p>
          <div className="flex items-end justify-between gap-4">
            <h2
              className="text-2xl font-bold leading-tight text-white/80"
              style={{ fontFamily: 'var(--font-playfair, Georgia, serif)' }}
            >
              {title}
            </h2>
            <motion.div
              className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 mb-0.5"
              style={{ border: `1px solid ${accent}30`, background: `${accent}10` }}
              whileHover={{ scale: 1.15, borderColor: `${accent}70` }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              <span style={{ color: accent, display: 'inline-block' }}>→</span>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
