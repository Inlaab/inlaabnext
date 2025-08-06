'use client';

import { useEffect } from 'react';

const SourceCodeProtection = () => {
  useEffect(() => {
    // Solo interceptar Ctrl+U
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'u') {
        e.preventDefault();
        alert('To view the source code of this website, you must take classes with Inlaab.');
      }
    };

    // Agregar event listener solo para Ctrl+U
    document.addEventListener('keydown', handleKeyDown);

    // Limpiar event listener al desmontar el componente
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return null; // Este componente no renderiza nada
};

export default SourceCodeProtection;
