import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import TourCard from './TourCard';

const TOURS = [
  {
    slug: 'oficina',
    title: 'Tour Oficina',
    subtitle: '7 de agosto',
    accent: '#d52828',
    glow: 'rgba(213,40,40,0.12)',
  },
  {
    slug: 'sheraton',
    title: 'Tour Sheraton',
    subtitle: 'Bodega',
    accent: '#fbbe49',
    glow: 'rgba(251,190,73,0.12)',
  },
];

export default async function ToursPage() {
  const cookieStore = await cookies();
  if (!cookieStore.get('metryca_session')) redirect('/metryca');

  return (
    <main
      className="min-h-screen flex flex-col"
      style={{ background: '#0f0f0f' }}
    >
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-6 border-b border-white/5">
        <div>
          <p className="text-[10px] tracking-[0.5em] text-white/30 uppercase mb-1">
            INLAAB
          </p>
          <h1
            className="text-xl font-bold text-white"
            style={{ fontFamily: 'var(--font-playfair, Georgia, serif)' }}
          >
            Metryca{' '}
            <span className="text-white/30 font-normal text-base">360°</span>
          </h1>
        </div>
        <form action="/api/logout" method="POST">
          <button className="text-white/20 hover:text-white/50 text-[11px] tracking-[0.3em] uppercase transition-colors duration-300">
            Cerrar sesión
          </button>
        </form>
      </header>

      {/* Grid */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 py-16">
        <p className="text-white/25 text-[11px] tracking-[0.5em] uppercase mb-12">
          Selecciona un recorrido
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full max-w-2xl">
          {TOURS.map(tour => (
            <TourCard key={tour.slug} {...tour} />
          ))}
        </div>
      </section>

      <footer className="text-center py-5 text-white/10 text-[10px] tracking-[0.4em] uppercase border-t border-white/5">
        INLAAB · Acceso privado
      </footer>
    </main>
  );
}
