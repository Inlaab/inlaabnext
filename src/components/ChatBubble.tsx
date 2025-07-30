'use client';

import React, { useState, useRef, useEffect, type FormEvent, type ChangeEvent } from 'react';
import { marked } from 'marked';

const primaryColor = '#0041b0';
const secondaryColor = '#b5a400';
const agentAvatar = '/assets/ISA_Avatar.jpg'; // Ruta corregida al avatar real

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

const ChatBubbleComponent: React.FC = () => {
  function renderMarkdown(text: string) {
    return marked.parse(text, { breaks: true });
  }

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hi! I'm ISA, your Inlaab Sales Assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const chatButtonRef = useRef<HTMLButtonElement | null>(null);

  // Efecto para configurar el botón del chat
  useEffect(() => {
    // Solo se ejecuta en el navegador
    if (typeof window === 'undefined') return;
    
    const chatButton = document.getElementById('chat-button') as HTMLButtonElement;
    if (chatButton) {
      chatButtonRef.current = chatButton;
      const handleClick = () => setOpen(prev => !prev);
      chatButton.addEventListener('click', handleClick);
      return () => chatButton.removeEventListener('click', handleClick);
    }
  }, []);

  // Efecto para controlar la visibilidad del aside y el padding del contenido principal
  useEffect(() => {
    // Solo se ejecuta en el navegador
    if (typeof window === 'undefined') return;
    
    const chatAside = document.getElementById('chat-aside');
    const mainContent = document.getElementById('main-content');
    const chatButton = document.getElementById('chat-button');

    if (chatAside && mainContent && chatButton) {
      if (open) {
        // Mostrar el chat
        chatAside.classList.remove('translate-x-full');
        chatAside.classList.add('translate-x-0');
        
        // Agregar padding al contenido principal en pantallas grandes
        if (window.innerWidth >= 1024) { // lg breakpoint
          mainContent.style.paddingRight = '24rem'; // w-96 = 24rem
        }
        
        // Mostrar overlay en pantallas pequeñas
        const overlay = document.getElementById('chat-overlay');
        if (overlay && window.innerWidth < 1024) {
          overlay.classList.remove('opacity-0', 'pointer-events-none');
          overlay.classList.add('opacity-100');
          
          // Cerrar chat al hacer clic en overlay
          const handleOverlayClick = () => setOpen(false);
          overlay.addEventListener('click', handleOverlayClick);
          
          return () => overlay.removeEventListener('click', handleOverlayClick);
        }
      } else {
        // Ocultar el chat
        chatAside.classList.remove('translate-x-0');
        chatAside.classList.add('translate-x-full');
        
        // Remover padding del contenido principal
        mainContent.style.paddingRight = '0';
        
        // Ocultar overlay
        const overlay = document.getElementById('chat-overlay');
        if (overlay) {
          overlay.classList.remove('opacity-100');
          overlay.classList.add('opacity-0', 'pointer-events-none');
        }
      }
    }
  }, [open]);

  // Efecto para hacer scroll al final del chat
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Efecto para manejar el redimensionamiento de la ventana
  useEffect(() => {
    const handleResize = () => {
      const mainContent = document.getElementById('main-content');
      if (mainContent && open) {
        if (window.innerWidth >= 1024) {
          mainContent.style.paddingRight = '24rem';
        } else {
          mainContent.style.paddingRight = '0';
        }
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [open]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    setLoading(true);

    // Agregar mensaje del usuario
    const newMessages = [...messages, { role: 'user' as const, content: userMessage }];
    setMessages(newMessages);

    try {
      const response = await fetch('/api/ask-isa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: newMessages
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('API Response:', data);

      let assistantMessage = '';
      
      if (data.choices && data.choices[0] && data.choices[0].message) {
        assistantMessage = data.choices[0].message.content;
      } else if (data.result) {
        assistantMessage = data.result;
      } else if (typeof data === 'string') {
        assistantMessage = data;
      } else {
        assistantMessage = 'Sorry, I couldn\'t process your request. Please try again.';
      }

      setMessages(prev => [...prev, { role: 'assistant', content: assistantMessage }]);
    } catch (error) {
      console.error('Error calling API:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, there was an error processing your request. Please try again later.' 
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header del chat */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-inlaab-blue to-inlaab-orange">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white">
            <img 
              src={agentAvatar} 
              alt="ISA Avatar" 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-semibold text-white">ISA</h3>
            <p className="text-xs text-white/80">Inlaab Sales Assistant</p>
          </div>
        </div>
        <button 
          onClick={() => setOpen(false)}
          className="text-white hover:text-gray-200 transition-colors duration-200"
          aria-label="Cerrar chat"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Área de mensajes */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
              message.role === 'user' 
                ? 'bg-inlaab-blue text-white' 
                : 'bg-gray-100 text-gray-800'
            }`}>
              {message.role === 'assistant' ? (
                <div 
                  className="prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: renderMarkdown(message.content) }}
                />
              ) : (
                <p className="text-sm">{message.content}</p>
              )}
            </div>
          </div>
        ))}
        
        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={chatEndRef} />
      </div>

      {/* Área de input */}
      <div className="p-4 border-t border-gray-200">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <textarea
            value={input}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 resize-none border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-inlaab-blue focus:border-transparent"
            rows={1}
            disabled={loading}
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="bg-inlaab-blue text-white px-4 py-2 rounded-lg hover:bg-inlaab-blue/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatBubbleComponent;