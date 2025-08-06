import Hero from '@/components/Hero';
import Services from '@/components/Services';
import OurServices from '@/components/OurServices';
import BeingFriends from '@/components/BeingFriends';
import SimplifyingComplex from '@/components/SimplifyingComplex';
import OurOffer from '@/components/OurOffer';

export default function Home() {
  return (
    <main>
      <Hero />
      <section id="about">
        <Services />
      </section>
      <section id="services">
        <OurServices />
      </section>
      <section id="values">
        <BeingFriends />
      </section>
      <SimplifyingComplex />
      <section id="contact">
        <OurOffer />
      </section>
    </main>
  );
}
