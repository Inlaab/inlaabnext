'use client';

import { useEffect } from 'react';

const OurOffer = () => {
  useEffect(() => {
    // Add intersection observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).style.animationPlayState = 'running';
        }
      });
    }, observerOptions);

    // Observe animated elements
    document
      .querySelectorAll('.animate-fade-in, .animate-slide-up')
      .forEach(el => {
        (el as HTMLElement).style.animationPlayState = 'paused';
        observer.observe(el);
      });

    // Cleanup
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section className="py-20 bg-inlaab-cream relative overflow-hidden">
      {/* Fondo con formas geométricas sutiles */}
      <div className="absolute inset-0 opacity-20">
        {/* Formas circulares y geométricas de fondo */}
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-gradient-to-br from-inlaab-yellow/30 to-inlaab-orange/20"></div>
        <div className="absolute top-32 right-20 w-24 h-24 rounded-full bg-gradient-to-br from-inlaab-orange/20 to-inlaab-red/10"></div>
        <div className="absolute bottom-20 left-32 w-40 h-40 rounded-full bg-gradient-to-br from-inlaab-yellow/20 to-inlaab-cream/30"></div>
        <div className="absolute bottom-32 right-10 w-28 h-28 rounded-full bg-gradient-to-br from-inlaab-orange/15 to-inlaab-yellow/25"></div>

        {/* Formas adicionales para crear profundidad */}
        <div className="absolute top-1/2 left-1/4 w-20 h-20 rounded-full bg-gradient-to-br from-inlaab-yellow/25 to-transparent"></div>
        <div className="absolute top-1/3 right-1/3 w-16 h-16 rounded-full bg-gradient-to-br from-inlaab-orange/20 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Columna izquierda - Título principal */}
          <div className="text-left">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-rajdhani font-bold text-inlaab-red mb-8 animate-slide-up leading-tight">
              Innovation - Collaboration - Integrity - Agility
            </h2>
          </div>

          {/* Columna derecha - Contenido */}
          <div
            className="text-inlaab-blue space-y-6 animate-slide-up"
            style={{ animationDelay: '0.2s' }}
          >
            {/* Subtítulo */}
            <h3 className="text-xl font-semibold text-inlaab-blue mb-6">
              Our Offer
            </h3>

            {/* Párrafos de contenido */}
            <p className="text-base leading-relaxed font-light">
              At <span className="font-medium text-inlaab-red">Inlaab</span>,
              innovation is the cornerstone that drives us to tackle complex
              challenges and open new opportunities. Through close collaboration
              with our clients, we make their vision our own, striving to
              deliver the best of our team in every project.
            </p>

            <p className="text-base leading-relaxed font-light">
              Maintaining integrity as our guiding principle, we operate with
              transparency and trust. Our agility ensures adaptability in a
              dynamic business environment, keeping our clients one step ahead.
            </p>
          </div>
        </div>
      </div>

      {/* CSS Styles */}
      <style jsx>{`
        /* Animaciones */
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }

        .animate-slide-up {
          animation: slideUp 0.8s ease-out forwards;
        }

        /* Responsive adjustments */
        @media (max-width: 1024px) {
          .grid {
            text-align: center;
          }
        }
      `}</style>
    </section>
  );
};

export default OurOffer;
