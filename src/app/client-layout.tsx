'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import './globals.css';
import SourceCodeProtection from '@/components/SourceCodeProtection';

// Importación dinámica del componente Footer con SSR deshabilitado
const Footer = dynamic(() => import('@/components/Footer'), {
  ssr: false,
});

// Importación dinámica del componente ChatBubble con SSR deshabilitado
const ChatBubbleComponent = dynamic(() => import('@/components/ChatBubble'), {
  ssr: false,
});

// Definir el tipo de mensaje
type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        "Hi! I'm ISA, your Inlaab Sales Assistant. How can I help you today?",
    },
  ]);

  return (
    <html lang="es">
      <SourceCodeProtection />
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/svg+xml" href="/Favicon_INLAAB_Light.svg" />
      </head>
      <body
        className={`font-sans antialiased bg-gray-50 ${isChatOpen ? 'overflow-hidden' : ''}`}
      >
        <main
          id="main-content"
          className={`min-h-screen transition-all duration-500 ease-out ${isChatOpen ? 'lg:pr-96' : 'lg:pr-0'}`}
        >
          <div className="flex flex-col min-h-screen">
            <div className="flex-grow">
              {children}
            </div>
            <Footer />
          </div>
        </main>

        {/* Botón flotante del chat - Centrado a 51px del borde superior */}
        <button
          id="chat-button"
          className="fixed right-8 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/10 backdrop-blur-md text-white text-2xl flex items-center justify-center drop-shadow-xl shadow-2xl z-[2001] hover:bg-white/20 hover:drop-shadow-2xl transition-all duration-200"
          aria-label="Abrir chat con ISA"
          style={{
            top: '53px', // Posición exacta del centro del botón
            marginTop: '-28px', // Mitad de la altura del botón (56px/2) para centrarlo en el punto especificado
          }}
        >
          ✨
        </button>

        {/* Chat Aside */}
        <aside
          id="chat-aside"
          className="fixed top-0 right-0 h-screen w-full sm:w-96 bg-white shadow-2xl transform translate-x-full transition-all duration-500 ease-out opacity-0 z-[100] flex flex-col"
          style={{ margin: 0, padding: 0 }}
        >
          <ChatBubbleComponent
            initialMessages={messages}
            onMessagesChange={newMessages => {
              setMessages(newMessages);
            }}
            onChatToggle={setIsChatOpen}
          />
        </aside>

        {/* Overlay */}
        <div
          id="chat-overlay"
          className="fixed inset-0 bg-transparent z-30 opacity-0 pointer-events-none transition-opacity duration-300"
        ></div>
      </body>
    </html>
  );
}
