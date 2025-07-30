'use client';

import { useEffect } from 'react';

const SimplifyingComplex = () => {
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
    <section className="py-20 bg-inlaab-red relative overflow-hidden">
      {/* Formas geométricas de fondo */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Forma triangular grande en la esquina superior derecha */}
        <div className="absolute -top-32 -right-32 w-96 h-96 opacity-20">
          <svg viewBox="0 0 400 400" className="w-full h-full">
            <polygon
              points="200,50 350,350 50,350"
              fill="currentColor"
              className="text-red-800"
            />
          </svg>
        </div>

        {/* Forma geométrica adicional en la parte inferior */}
        <div className="absolute -bottom-24 -right-24 w-80 h-80 opacity-15">
          <svg viewBox="0 0 320 320" className="w-full h-full">
            <polygon
              points="160,20 300,140 300,280 160,300 20,280 20,140"
              fill="currentColor"
              className="text-red-900"
            />
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Columna izquierda - Contenido */}
          <div className="text-white space-y-6 animate-slide-up">
            {/* Subtítulo */}
            <h3 className="text-lg font-light text-red-200 mb-6 tracking-wide">
              Clear Vision
            </h3>

            {/* Párrafos de contenido */}
            <p className="text-base leading-relaxed font-light">
              Often, the world of development can seem complex due to its
              dynamics and multiple languages. That&apos;s why we decided to
              stick to just one:{' '}
              <span className="font-medium text-red-100">Yours</span>.
            </p>

            <p className="text-base leading-relaxed font-light">
              We believe that technology should be accessible to everyone
              because it impacts our own dynamics, enhances them, and elevates
              knowledge to a higher level. That&apos;s why we speak plainly,
              understand needs without complications, and always in your
              language.
            </p>

            <p className="text-base leading-relaxed font-light">
              As for the rest, we take care of it because we understand the
              importance of ideas as well as the power of processes that
              transform lives.
            </p>
          </div>

          {/* Columna derecha - Título principal */}
          <div className="text-right lg:text-left">
            {/* Texto de fondo sutil */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center justify-center opacity-10">
                <span className="text-8xl md:text-9xl font-rajdhani font-bold text-red-800 tracking-wider transform rotate-12">
                  LET&apos;S GET STARTED
                </span>
              </div>

              {/* Título principal */}
              <h2
                className="text-4xl md:text-5xl lg:text-6xl font-rajdhani font-bold text-white mb-8 animate-slide-up relative z-10"
                style={{ animationDelay: '0.2s' }}
              >
                Simplifying the Complex
              </h2>
            </div>
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

          .text-right {
            text-align: center;
          }
        }
      `}</style>
    </section>
  );
};

export default SimplifyingComplex;
