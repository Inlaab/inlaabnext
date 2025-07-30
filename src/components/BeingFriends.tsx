'use client';

import { useEffect } from 'react';

const BeingFriends = () => {
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
    <section className="py-20 bg-inlaab-blue relative overflow-hidden">
      {/* Fondo con patrón de líneas diagonales sutiles */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full">
          <svg className="w-full h-full" viewBox="0 0 1200 800" fill="none">
            <defs>
              <pattern
                id="diagonal-lines-friends"
                patternUnits="userSpaceOnUse"
                width="40"
                height="40"
              >
                <path
                  d="M0,40 L40,0"
                  stroke="currentColor"
                  strokeWidth="1"
                  opacity="0.3"
                />
              </pattern>
            </defs>
            <rect
              width="100%"
              height="100%"
              fill="url(#diagonal-lines-friends)"
              className="text-white"
            />
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Columna izquierda - Título */}
          <div className="text-left">
            <h2 className="text-5xl md:text-6xl font-rajdhani font-bold text-inlaab-red mb-8 animate-slide-up">
              Being Friends!
            </h2>
          </div>

          {/* Columna derecha - Contenido */}
          <div
            className="text-inlaab-cream space-y-6 animate-slide-up"
            style={{ animationDelay: '0.2s' }}
          >
            {/* Subtítulo */}
            <h3 className="text-xl font-semibold text-inlaab-yellow mb-6">
              That&apos;s our Mission
            </h3>

            {/* Párrafos de contenido */}
            <p className="text-base leading-relaxed font-light">
              From friendship, we lay the groundwork for our vision. We are
              professionals with experience in a variety of fields and have
              decided to create a different concept in development: to be more
              than just a command line in programming.
            </p>

            <p className="text-base leading-relaxed font-light">
              This is how INLAAB was born, a model where from the very beginning
              we get involved with projects from a 360° view and provide
              comprehensive ideas to create or improve processes, resulting in a
              scalable and tailored technological solution for your projects.
            </p>

            <p className="text-base leading-relaxed font-light">
              Thanks to you, this model allows us to expand our group of{' '}
              <span className="text-inlaab-yellow font-medium">FRIENDS</span>{' '}
              more and more each day!
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

export default BeingFriends;
