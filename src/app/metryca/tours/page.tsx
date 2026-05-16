import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import ToursClient from './ToursClient';

const TOURS = [
  {
    slug:     'oficina',
    title:    'Tour Oficina',
    subtitle: '7 de agosto',
    accent:   '#d52828',
    glow:     'rgba(213,40,40,0.14)',
  },
  {
    slug:     'sheraton',
    title:    'Tour Sheraton',
    subtitle: 'Bodega',
    accent:   '#fbbe49',
    glow:     'rgba(251,190,73,0.12)',
  },
];

export default async function ToursPage() {
  const cookieStore = await cookies();
  if (!cookieStore.get('metryca_session')) redirect('/metryca');

  return <ToursClient tours={TOURS} />;
}
