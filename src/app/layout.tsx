import type { Metadata } from 'next';
import './globals.css';
import ChatBubbleComponent from '@/components/ChatBubble';

export const metadata: Metadata = {
  title: 'INLAAB - Innovation and Technology for Your Business',
  description: 'INLAAB - Innovation and Technology Solutions',
  generator: 'Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

        {/* Local fonts are loaded via globals.css */}
      </head>
      <body className="font-sans antialiased bg-gray-50">
        <main
          id="main-content"
          className="min-h-screen transition-all duration-500 ease-out lg:pr-0"
        >
          {children}
        </main>

        {/* Botón flotante del chat - Fuera del aside para que siempre sea visible */}
        <button
          id="chat-button"
          className="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-white/10 backdrop-blur-md text-white text-2xl flex items-center justify-center drop-shadow-xl shadow-2xl z-[2001] hover:bg-white/20 hover:drop-shadow-2xl transition-all duration-200"
          aria-label="Abrir chat con ISA"
        >
          ✨
        </button>

        {/* Chat Aside */}
        <aside
          id="chat-aside"
          className="fixed top-0 right-0 h-full w-96 bg-white shadow-2xl transform translate-x-full transition-all duration-500 ease-out opacity-0 scale-95 z-40 border-l border-gray-200"
        >
          <ChatBubbleComponent />
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
