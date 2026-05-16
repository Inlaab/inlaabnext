'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import MetrycaBackground from '../components/MetrycaBackground';
import TourCard from './TourCard';

interface Tour {
  slug:    string;
  title:   string;
  subtitle: string;
  accent:  string;
  glow:    string;
}

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.35 },
  },
};

const cardItem = {
  hidden:   { opacity: 0, y: 30 },
  visible:  { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 260, damping: 24 } },
};

export default function ToursClient({ tours }: { tours: Tour[] }) {
  return (
    <main
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ background: '#0f0f0f' }}
    >
      <MetrycaBackground />

      {/* Header glassmorfismo */}
      <motion.header
        className="relative z-10 flex items-center justify-between px-8 py-5"
        style={{
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          background: 'rgba(15,15,15,0.6)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 240, damping: 26, delay: 0.05 }}
      >
        <Image
          src="/Logo Metryca.svg"
          alt="Metryca"
          width={110}
          height={59}
          style={{ filter: 'brightness(0) invert(1)', opacity: 0.9 }}
        />
        <form action="/api/logout" method="POST">
          <button className="text-[11px] tracking-[0.3em] uppercase transition-colors duration-300 text-white/20 hover:text-white/50">
            Cerrar sesión
          </button>
        </form>
      </motion.header>

      {/* Grid de tours */}
      <section className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-16">
        <motion.p
          className="text-[11px] tracking-[0.5em] uppercase mb-12"
          style={{ color: 'rgba(255,255,255,0.2)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.6 }}
        >
          Selecciona un recorrido
        </motion.p>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full max-w-2xl"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {tours.map((tour) => (
            <motion.div key={tour.slug} variants={cardItem}>
              <TourCard {...tour} />
            </motion.div>
          ))}
        </motion.div>
      </section>

      <motion.footer
        className="relative z-10 text-center py-5 text-[10px] tracking-[0.4em] uppercase"
        style={{
          color: 'rgba(255,255,255,0.08)',
          borderTop: '1px solid rgba(255,255,255,0.05)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.6 }}
      >
        Acceso privado
      </motion.footer>
    </main>
  );
}
