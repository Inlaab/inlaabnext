'use client';

import { useEffect, useRef } from 'react';

const Services = () => {
  const flipCard1Ref = useRef<HTMLDivElement>(null);
  const flipCard2Ref = useRef<HTMLDivElement>(null);
  const dividerLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const flipCard1 = flipCard1Ref.current;
    const flipCard2 = flipCard2Ref.current;
    const dividerLine = dividerLineRef.current;

    if (flipCard1 && flipCard2 && dividerLine) {
      // Hover en card 1 - card 2 baja opacidad
      const handleCard1Enter = () => {
        flipCard2.style.opacity = '0.4';
        dividerLine.style.height = '12rem'; // h-48 (192px)
        dividerLine.style.transform = 'translate(-50%, -50%) scaleY(0.75)';
      };

      const handleCard1Leave = () => {
        flipCard2.style.opacity = '1';
        dividerLine.style.height = '16rem'; // h-64 (256px)
        dividerLine.style.transform = 'translate(-50%, -50%) scaleY(1)';
      };

      // Hover en card 2 - card 1 baja opacidad
      const handleCard2Enter = () => {
        flipCard1.style.opacity = '0.4';
        dividerLine.style.height = '12rem'; // h-48 (192px)
        dividerLine.style.transform = 'translate(-50%, -50%) scaleY(0.75)';
      };

      const handleCard2Leave = () => {
        flipCard1.style.opacity = '1';
        dividerLine.style.height = '16rem'; // h-64 (256px)
        dividerLine.style.transform = 'translate(-50%, -50%) scaleY(1)';
      };

      flipCard1.addEventListener('mouseenter', handleCard1Enter);
      flipCard1.addEventListener('mouseleave', handleCard1Leave);
      flipCard2.addEventListener('mouseenter', handleCard2Enter);
      flipCard2.addEventListener('mouseleave', handleCard2Leave);

      return () => {
        flipCard1.removeEventListener('mouseenter', handleCard1Enter);
        flipCard1.removeEventListener('mouseleave', handleCard1Leave);
        flipCard2.removeEventListener('mouseenter', handleCard2Enter);
        flipCard2.removeEventListener('mouseleave', handleCard2Leave);
      };
    }

    // No cleanup needed when elements are not found
    return () => {};
  }, []);

  return (
    <section className="py-20 bg-inlaab-blue relative overflow-hidden">
      {/* Fondo con líneas diagonales sutiles */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full">
          <svg className="w-full h-full" viewBox="0 0 1200 800" fill="none">
            <defs>
              <pattern
                id="diagonal-lines"
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
              fill="url(#diagonal-lines)"
              className="text-white"
            />
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-rajdhani font-bold text-inlaab-red mb-8 tracking-wider">
            DNA
          </h2>
          <p className="text-lg md:text-xl text-inlaab-cream max-w-5xl mx-auto leading-relaxed font-light">
            We specialize in two essential fronts: strategic business consulting
            and advanced technological development. Our Insight division focuses
            on business transformation and growth, while DevHub drives
            innovation with custom software and hardware solutions. Together, we
            provide a comprehensive strategy to drive your business towards
            success in the digital era.
          </p>
        </div>

        {/* Flip Cards Container */}
        <div
          id="flip-cards-container"
          className="relative grid md:grid-cols-2 gap-0 max-w-5xl mx-auto mb-12"
        >
          {/* Flip Card 1 - Insight */}
          <div
            ref={flipCard1Ref}
            className="flip-card h-80 transition-opacity duration-300"
            id="flip-card-1"
          >
            <div className="flip-card-inner">
              {/* Front */}
              <div className="flip-card-front text-white flex flex-col justify-center items-center p-8 text-center">
                <h3 className="text-3xl font-bold mb-4 font-heading">
                  Insight
                </h3>
                <p className="text-lg mb-6 font-medium">
                  Expertise in Business Strategy
                </p>
                <div className="space-y-3 text-sm font-light">
                  <div className="flex items-center justify-center">
                    <span className="px-3 py-1">- IDEALAB -</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <span className="px-3 py-1">- ADVANCED BUSINESS -</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <span className="px-3 py-1">- GROWING UP -</span>
                  </div>
                </div>
              </div>

              {/* Back */}
              <div className="flip-card-back text-white flex flex-col justify-center items-center p-8 text-center">
                <h3 className="text-2xl font-bold mb-6 font-heading">
                  Insight
                </h3>
                <p className="text-sm leading-relaxed font-light">
                  Discover how INLAAB&apos;s Insight can be your strategic ally,
                  offering business consulting, digital transformation, and
                  process optimization to take your company to the next level.
                  Turn challenges into opportunities and accelerate your growth
                  with customized and scalable solutions.
                </p>
              </div>
            </div>
          </div>

          {/* Línea divisoria roja */}
          <div
            ref={dividerLineRef}
            id="divider-line"
            className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-px h-64 bg-inlaab-red z-10 hidden md:block transition-all duration-300 ease-in-out"
          ></div>

          {/* Flip Card 2 - DevHub */}
          <div
            ref={flipCard2Ref}
            className="flip-card h-80 transition-opacity duration-300"
            id="flip-card-2"
          >
            <div className="flip-card-inner">
              {/* Front */}
              <div className="flip-card-front text-white flex flex-col justify-center items-center p-8 text-center">
                <h3 className="text-3xl font-bold mb-4 font-heading">DevHub</h3>
                <p className="text-lg mb-6 font-medium">
                  Advanced Technological Development
                </p>
                <div className="space-y-3 text-sm font-light">
                  <div className="flex items-center justify-center">
                    <span className="px-3 py-1">- HARDWARE ENGINEERING -</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <span className="px-3 py-1">- TAILORED SOFTWARE -</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <span className="px-3 py-1">
                      - INNOVATIVE AI PRODUCTS -
                    </span>
                  </div>
                </div>
              </div>

              {/* Back */}
              <div className="flip-card-back text-white flex flex-col justify-center items-center p-8 text-center">
                <h3 className="text-2xl font-bold mb-6 font-heading">DevHub</h3>
                <p className="text-sm leading-relaxed font-light">
                  At INLAAB&apos;s DevHub, we combine advanced engineering and
                  custom software development to create technology that drives
                  your vision. From artificial intelligence solutions to
                  cross-platform applications, our expert team is ready to
                  innovate and automate your operations.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Hover instruction */}
        <div className="text-center">
          <p className="text-inlaab-red text-sm font-light tracking-wide">
            Hover for more details
          </p>
        </div>
      </div>

      <style jsx>{`
        .flip-card {
          background-color: transparent;
          perspective: 1000px;
        }

        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          text-align: center;
          transition: transform 0.8s;
          transform-style: preserve-3d;
        }

        .flip-card:hover .flip-card-inner {
          transform: rotateY(180deg);
        }

        .flip-card-front,
        .flip-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
        }

        .flip-card-back {
          transform: rotateY(180deg);
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .flip-card {
            height: 24rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Services;
