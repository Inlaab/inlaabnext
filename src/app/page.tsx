import Hero from '@/components/Hero';
import Services from '@/components/Services';
import OurServices from '@/components/OurServices';
import BeingFriends from '@/components/BeingFriends';
import SimplifyingComplex from '@/components/SimplifyingComplex';
import OurOffer from '@/components/OurOffer';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <OurServices />
      <BeingFriends />
      <SimplifyingComplex />
      <OurOffer />
      <Contact />
    </main>
  );
}
