'use client';

import { useEffect, useState } from 'react';

const Footer = () => {
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

  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);

  // Lock body scroll and handle Esc to close when modal is open
  useEffect(() => {
    if (isCalendlyOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      const onKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setIsCalendlyOpen(false);
      };
      window.addEventListener('keydown', onKey);
      return () => {
        document.body.style.overflow = prev;
        window.removeEventListener('keydown', onKey);
      };
    }
    return;
  }, [isCalendlyOpen]);

  return (
    <footer className="py-20 bg-inlaab-blue relative overflow-hidden">
      {/* Fondo con patrón de líneas diagonales sutiles */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full">
          <svg className="w-full h-full" viewBox="0 0 1200 800" fill="none">
            <defs>
              <pattern
                id="diagonal-lines-contact"
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
              fill="url(#diagonal-lines-contact)"
              className="text-white"
            />
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-3 gap-16 items-start">
          {/* Columna izquierda - Título principal */}
          <div className="lg:col-span-1">
            {/* Línea roja superior */}
            <div className="w-full h-0.5 bg-inlaab-red mb-8 animate-fade-in"></div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-inlaab-red mb-8 animate-slide-up leading-tight">
              Let&apos;s be
              <br />
              in contact
            </h2>

            {/* Línea roja inferior */}
            <div
              className="w-full h-0.5 bg-inlaab-red animate-fade-in"
              style={{ animationDelay: '0.2s' }}
            ></div>
          </div>

          {/* Columna central - Información de contacto */}
          <div
            className="lg:col-span-1 text-center animate-slide-up"
            style={{ animationDelay: '0.3s' }}
          >
            {/* Talk to an Expert */}
            <div className="mb-8">
              <div className="flex items-center justify-center mb-4">
                <svg
                  className="w-5 h-5 text-inlaab-cream mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
                <a
                  href="mailto:sales@inlaab.com"
                  className="text-inlaab-cream text-sm font-light tracking-wide hover:underline"
                  aria-label="Email sales at inlaab dot com"
                >
                  Talk to an Expert
                </a>
              </div>
            </div>

            {/* Schedule Time With Us */}
            <button
              type="button"
              onClick={() => setIsCalendlyOpen(true)}
              className="border-l border-r border-inlaab-cream/30 px-8 py-6 mb-8 inline-block text-left"
              aria-haspopup="dialog"
              aria-expanded={isCalendlyOpen}
              aria-controls="calendly-modal"
            >
              <h3 className="text-inlaab-cream text-lg font-medium mb-2 text-center">
                Schedule Time
                <br />
                With Us
              </h3>
            </button>
          </div>

          {/* Columna derecha - Dirección */}
          <div
            className="lg:col-span-1 text-center animate-slide-up"
            style={{ animationDelay: '0.4s' }}
          >
            <div className="space-y-2 text-inlaab-cream">
              {/* Pin de ubicación */}
              <div className="flex justify-center mb-4">
                <svg
                  className="w-6 h-6 text-inlaab-red"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
              </div>

              <p className="font-semibold text-base tracking-wide">
                INLAAB LLC
              </p>
              <p className="text-sm font-light">8335 NE 2ND AVE</p>
              <p className="text-sm font-light">STE 349-38</p>
              <p className="text-sm font-light">MIAMI, FL, US 33138</p>
            </div>
          </div>
        </div>
      </div>
      {/* Calendly modal */}
      {isCalendlyOpen && (
        <div
          id="calendly-modal"
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setIsCalendlyOpen(false)}
          />

          <div className="relative w-full max-w-3xl h-[80vh] bg-white rounded shadow-lg overflow-hidden">
            <button
              aria-label="Close calendly dialog"
              className="absolute top-3 right-3 z-10 bg-inlaab-blue text-inlaab-cream rounded-full w-8 h-8 flex items-center justify-center"
              onClick={() => setIsCalendlyOpen(false)}
            >
              ×
            </button>

            <iframe
              title="Schedule with Inlaab"
              src="https://calendly.com/inlaab/30min?embed_domain=localhost&embed_type=Inline"
              className="w-full h-full border-0"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            />
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
