'use client';

import { useState } from 'react';
import './globals.css';
import dynamic from 'next/dynamic';

// Importación dinámica del componente ChatBubble con SSR deshabilitado
const ChatBubbleComponent = dynamic(
  () => import('@/components/ChatBubble'),
  { ssr: false }
);

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
      content: "Hi! I'm ISA, your Inlaab Sales Assistant. How can I help you today?"
    }
  ]);

  return (
    <html lang="es">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </head>
      <body className={`font-sans antialiased bg-gray-50 ${isChatOpen ? 'overflow-hidden' : ''}`}>
        <main
          id="main-content"
          className="min-h-screen transition-all duration-500 ease-out lg:pr-0"
        >
          {children}
        </main>

        {/* Botón flotante del chat - Posición superior en móviles, inferior en desktop */}
        <button
          id="chat-button"
          className="fixed top-8 right-8 bottom-auto sm:top-auto sm:bottom-8 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/10 backdrop-blur-md text-white text-2xl flex items-center justify-center drop-shadow-xl shadow-2xl z-[2001] hover:bg-white/20 hover:drop-shadow-2xl transition-all duration-200"
          aria-label="Abrir chat con ISA"
        >
          ✨
        </button>

        {/* Chat Aside */}
        <aside
          id="chat-aside"
          className="fixed top-0 right-0 h-full w-96 bg-white shadow-2xl transform translate-x-full transition-all duration-500 ease-out opacity-0 scale-95 z-40"
        >
          <ChatBubbleComponent 
            initialMessages={messages}
            onMessagesChange={(newMessages) => {
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
