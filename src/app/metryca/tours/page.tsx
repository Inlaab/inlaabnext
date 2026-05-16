import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import TourCard from './TourCard';

const TOURS = [
  {
    slug:     'oficina',
    title:    'Tour Oficina',
    subtitle: '7 de agosto',
    accent:   '#d52828',
    glow:     'rgba(213,40,40,0.14)',
    delay:    0.3,
  },
  {
    slug:     'sheraton',
    title:    'Tour Sheraton',
    subtitle: 'Bodega',
    accent:   '#fbbe49',
    glow:     'rgba(251,190,73,0.12)',
    delay:    0.45,
  },
];

export default async function ToursPage() {
  const cookieStore = await cookies();
  if (!cookieStore.get('metryca_session')) redirect('/metryca');

  return (
    <main className="min-h-screen flex flex-col" style={{ background: '#0f0f0f' }}>

      {/* Header */}
      <header
        className="flex items-center justify-between px-8 py-6 border-b border-white/5"
        style={{ animation: 'fadeIn 0.5s ease 0.1s both' }}
      >
        <div>
          <p className="text-[10px] tracking-[0.5em] uppercase mb-1" style={{ color: 'rgba(255,255,255,0.2)' }}>
            INLAAB
          </p>
          <h1
            className="text-xl font-bold text-white"
            style={{ fontFamily: 'var(--font-playfair, Georgia, serif)' }}
          >
            Metryca <span className="font-normal text-base" style={{ color: 'rgba(255,255,255,0.2)' }}>360°</span>
          </h1>
        </div>
        <form action="/api/logout" method="POST">
          <button className="text-[11px] tracking-[0.3em] uppercase transition-colors duration-300 text-white/20 hover:text-white/50">
            Cerrar sesión
          </button>
        </form>
      </header>

      {/* Grid */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 py-16">
        <p
          className="text-[11px] tracking-[0.5em] uppercase mb-12"
          style={{ color: 'rgba(255,255,255,0.2)', animation: 'fadeIn 0.5s ease 0.2s both' }}
        >
          Selecciona un recorrido
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full max-w-2xl">
          {TOURS.map((tour) => (
            <TourCard key={tour.slug} {...tour} />
          ))}
        </div>
      </section>

      <footer
        className="text-center py-5 text-[10px] tracking-[0.4em] uppercase border-t border-white/5"
        style={{ color: 'rgba(255,255,255,0.08)', animation: 'fadeIn 0.5s ease 0.6s both' }}
      >
        INLAAB · Acceso privado
      </footer>
    </main>
  );
}
