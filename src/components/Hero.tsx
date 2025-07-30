'use client';

import { useEffect } from 'react';
import Image from 'next/image';

const Hero = () => {
  useEffect(() => {
    // Función para actualizar estilos del navbar basado en el estado del chat
    function updateNavbarStyles() {
      const navbar = document.getElementById('hero-navbar');
      const navbarContainer = document.getElementById('navbar-container');
      const chatAside = document.getElementById('chat-aside');
      const scrollY = window.scrollY;
      
      if (!navbar || !navbarContainer) return;
      
      const isChatOpen = chatAside && !chatAside.classList.contains('translate-x-full');
      
      // Ajustar el padding derecho cuando el chat está abierto
      if (isChatOpen) {
        const chatWidth = chatAside.offsetWidth;
        navbar.style.paddingRight = `${chatWidth}px`;
      } else {
        navbar.style.paddingRight = '0';
      }
      
      // Mantener la lógica existente de scroll
      if (scrollY <= 100) {
        navbar.style.opacity = '1';
        navbar.style.bottom = '2rem';
        navbar.style.top = 'auto';
        navbarContainer.classList.add('bg-white/10', 'rounded-2xl', 'py-6', 'px-8');
        navbarContainer.classList.remove('bg-inlaab-blue/80', 'border', 'border-inlaab-blue/20', 'py-4');
      } else if (scrollY > 100 && scrollY < 600) {
        navbar.style.opacity = '0';
      } else {
        navbar.style.opacity = '1';
        navbar.style.top = '1rem';
        navbar.style.bottom = 'auto';
        navbarContainer.classList.remove('bg-white/10', 'rounded-2xl', 'py-6', 'px-8');
        navbarContainer.classList.add('bg-inlaab-blue/80', 'border', 'border-inlaab-blue/20', 'rounded-2xl', 'py-4', 'px-8');
      }
    }

    // Escuchar eventos de scroll y redimensionamiento
    window.addEventListener('scroll', updateNavbarStyles);
    window.addEventListener('resize', updateNavbarStyles);

    // Observar cambios en el aside del chat
    const chatObserver = new MutationObserver(updateNavbarStyles);
    const chatAside = document.getElementById('chat-aside');
    if (chatAside) {
      chatObserver.observe(chatAside, { 
        attributes: true, 
        attributeFilter: ['class'] 
      });
    }

    // Ejecutar una vez al cargar
    updateNavbarStyles();

    // Cleanup
    return () => {
      window.removeEventListener('scroll', updateNavbarStyles);
      window.removeEventListener('resize', updateNavbarStyles);
      chatObserver.disconnect();
    };
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Fondo con imagen real */}
      <div className="absolute inset-0">
        <Image 
          src="/BackHero.jpg" 
          alt="INLAAB Hero Background" 
          fill
          className="object-cover"
          priority
        />
        {/* Overlay opcional para mejorar legibilidad del texto */}
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Contenido principal centrado */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center text-white">
        {/* Título principal */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-light mb-8 max-w-4xl font-rajdhani leading-tight">
          We are <span className="text-inlaab-cream font-medium font-rajdhani">Developers</span>, <span className="italic font-light font-heading">of Business</span>.
        </h1>

        {/* Subtítulo */}
        <p className="text-lg md:text-xl text-gray-300 mb-16 max-w-2xl font-rajdhani">
          Tailored Solutions to Elevate Your Insights
        </p>

        {/* Botón CTA */}
        <div className="relative">
          <div className="border-l-2 border-r-2 border-gray-400 px-8 py-4">
            <button className="text-white text-lg md:text-xl font-light hover:text-inlaab-yellow transition-colors duration-300">
              Discover Your<br/>
              Custom Solution
            </button>
          </div>
        </div>
      </div>

      {/* Navbar con efecto glassmorphism (inicialmente en la parte inferior) */}
      <nav id="hero-navbar" className="fixed bottom-8 left-0 right-0 z-50 opacity-100 transition-all duration-300 ease-in-out">
        <div className="w-full px-4">
          <div id="navbar-container" className="backdrop-blur-md bg-white/10 rounded-2xl py-6 px-8 shadow-2xl max-w-5xl mx-auto transition-all duration-300 ease-in-out chat-navbar">
            <div className="text-white">
              {/* Usando Flex para mejor control */}
              <div className="flex items-center justify-between">
                <a href="#about" className="hover:text-inlaab-yellow transition-colors duration-300 font-light text-sm tracking-wide text-center w-1/5">About</a>
                <a href="#services" className="hover:text-inlaab-yellow transition-colors duration-300 font-light text-sm tracking-wide text-center w-1/5">Services</a>
                
                {/* Logo central */}
                <div className="flex justify-center w-1/5">
                  <Image 
                    src="/Logo InlaabNav.svg"
                    alt="INLAAB Logo" 
                    width={64}
                    height={64}
                    className="h-16 w-auto brightness-0 invert sepia-[.15] saturate-[.8] hue-rotate-[25deg]"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/Logo INLAAB.png';
                      console.log('SVG failed, using PNG fallback');
                    }}
                  />
                </div>
                
                <a href="#values" className="hover:text-inlaab-yellow transition-colors duration-300 font-light text-sm tracking-wide text-center w-1/5">Values</a>
                <a href="#work" className="hover:text-inlaab-yellow transition-colors duration-300 font-light text-sm tracking-wide text-center w-1/5">Work</a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </section>
  );
};

export default Hero;