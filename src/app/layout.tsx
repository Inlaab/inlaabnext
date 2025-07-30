import type { Metadata } from 'next'
import './globals.css'
import ChatBubbleComponent from '@/components/ChatBubble'

export const metadata: Metadata = {
  title: 'INLAAB - Innovación y Tecnología para tu Negocio',
  description: 'INLAAB - Innovación y Tecnología',
  generator: 'Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        
        {/* Preload fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-sans">
        <div id="main-content">
          {children}
        </div>
        
        {/* Chat Button */}
        <button
          id="chat-button"
          className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-r from-inlaab-blue to-inlaab-orange rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group hover:scale-110"
          aria-label="Abrir chat con ISA"
        >
          <svg 
            className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-200" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" 
            />
          </svg>
        </button>

        {/* Chat Aside */}
        <aside
          id="chat-aside"
          className="fixed top-0 right-0 h-full w-96 bg-white shadow-2xl transform translate-x-full transition-transform duration-300 ease-in-out z-40 border-l border-gray-200"
        >
          <ChatBubbleComponent />
        </aside>

        {/* Overlay */}
        <div
          id="chat-overlay"
          className="fixed inset-0 bg-black bg-opacity-50 z-30 opacity-0 pointer-events-none transition-opacity duration-300"
        ></div>


      </body>
    </html>
  )
}