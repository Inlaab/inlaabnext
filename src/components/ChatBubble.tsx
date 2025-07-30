'use client';

import { marked } from 'marked';
import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  type ChangeEvent,
  type FormEvent,
} from 'react';
import Image from 'next/image';

// Colors defined in Tailwind CSS config

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

interface ChatBubbleProps {
  initialMessages?: Array<{ role: 'user' | 'assistant'; content: string }>;
  onMessagesChange?: (messages: Array<{ role: 'user' | 'assistant'; content: string }>) => void;
}

const ChatBubbleComponent: React.FC<ChatBubbleProps> = ({ 
  initialMessages = [{
    role: 'assistant',
    content: "Hi! I'm ISA, your Inlaab Sales Assistant. How can I help you today?",
  }],
  onMessagesChange 
}) => {
  function renderMarkdown(text: string) {
    return marked.parse(text, { breaks: true });
  }

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const chatButtonRef = useRef<HTMLButtonElement | null>(null);
  
  // Function to copy text to clipboard
  const copyToClipboard = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
    }
  }, []);

  // Efecto para configurar el botón del chat
  useEffect(() => {
    // Solo se ejecuta en el navegador
    if (typeof window === 'undefined') return;

    const chatButton = document.getElementById(
      'chat-button'
    ) as HTMLButtonElement;
    if (chatButton) {
      chatButtonRef.current = chatButton;
      const handleClick = () => setOpen(prev => !prev);
      chatButton.addEventListener('click', handleClick);
      return () => chatButton.removeEventListener('click', handleClick);
    }

    // No cleanup needed when chatButton is not found
    return () => {};
  }, []);

  // Efecto para controlar la visibilidad del aside y el padding del contenido principal
  useEffect(() => {
    // Solo se ejecuta en el navegador
    if (typeof window === 'undefined') return;

    const chatAside = document.getElementById('chat-aside');
    const mainContent = document.getElementById('main-content');
    const chatButton = document.getElementById('chat-button');
    const overlay = document.getElementById('chat-overlay');

    let overlayClickHandler: (() => void) | null = null;

    if (chatAside && mainContent && chatButton) {
      if (open) {
        // Mostrar el chat con animación elegante
        chatAside.classList.remove('translate-x-full', 'opacity-0', 'scale-95');
        chatAside.classList.add('translate-x-0', 'opacity-100', 'scale-100');

        // Ocultar el botón de chat cuando esté abierto
        chatButton.style.opacity = '0';
        chatButton.style.pointerEvents = 'none';
        chatButton.style.transform = 'scale(0.8)';

        // Agregar clase para padding automático en CSS
        document.body.classList.add('chat-open');

        // Overlay para móviles
        if (overlay && window.innerWidth < 1024) {
          overlay.classList.remove('opacity-0', 'pointer-events-none');
          overlay.classList.add('opacity-0', 'pointer-events-auto');

          overlayClickHandler = () => setOpen(false);
          overlay.addEventListener('click', overlayClickHandler);
        }
      } else {
        // Ocultar el chat con animación elegante
        chatAside.classList.remove('translate-x-0', 'opacity-100', 'scale-100');
        chatAside.classList.add('translate-x-full', 'opacity-0', 'scale-95');

        // Mostrar el botón de chat cuando esté cerrado
        chatButton.style.opacity = '1';
        chatButton.style.pointerEvents = 'auto';
        chatButton.style.transform = 'scale(1)';

        // Remover clase para padding automático
        document.body.classList.remove('chat-open');

        // Ocultar overlay
        if (overlay) {
          overlay.classList.remove('opacity-100');
          overlay.classList.add('opacity-0', 'pointer-events-none');
        }
      }
    }

    // Cleanup function
    return () => {
      if (overlay && overlayClickHandler) {
        overlay.removeEventListener('click', overlayClickHandler);
      }
    };
  }, [open]);

  // Efecto para hacer scroll al final del chat
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Notificar al componente padre cuando los mensajes cambien
    if (onMessagesChange) {
      onMessagesChange(messages);
    }
  }, [messages, onMessagesChange]);

  // Efecto para manejar el redimensionamiento de la ventana
  useEffect(() => {
    if (typeof window === 'undefined') return;

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

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [open]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    setLoading(true);

    // Agregar mensaje del usuario
    const newMessages = [
      ...messages,
      { role: 'user' as const, content: userMessage },
    ];
    setMessages(newMessages);
    
    // Notificar al componente padre
    if (onMessagesChange) {
      onMessagesChange(newMessages);
    }

    try {
      const response = await fetch('/api/ask-isa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: newMessages,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      let assistantMessage = '';

      if (data.choices && data.choices[0] && data.choices[0].message) {
        assistantMessage = data.choices[0].message.content;
      } else if (data.result) {
        assistantMessage = data.result;
      } else if (typeof data === 'string') {
        assistantMessage = data;
      } else {
        assistantMessage =
          "Sorry, I couldn't process your request. Please try again.";
      }

      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: assistantMessage },
      ]);
    } catch (error) {
      // Handle API error silently in production
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content:
            'Sorry, there was an error processing your request. Please try again later.',
        },
      ]);
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

  const handleClearChat = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to clear the conversation? This cannot be undone.')) {
      // Crear un nuevo array con el mensaje inicial
      const newMessages = [{
        role: 'assistant' as const,
        content: "Hi! I'm ISA, your Inlaab Sales Assistant. How can I help you today?"
      }];
      
      // Forzar una actualización del estado
      setMessages([]); // Primero vaciar para forzar la actualización
      setInput('');
      
      // Usar setTimeout para asegurar que el estado se actualice
      setTimeout(() => {
        setMessages(newMessages);
        if (onMessagesChange) {
          onMessagesChange(newMessages);
        }
      }, 0);
    }
  }, [onMessagesChange]);

  return (
    <div className="flex flex-col h-full bg-white overflow-hidden">
      {/* Header del chat */}
      <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-inlaab-blue to-inlaab-orange p-0.5">
            <div className="w-full h-full rounded-full overflow-hidden bg-white p-0.5">
              <div className="relative w-8 h-8 rounded-full overflow-hidden">
                <Image 
                  src="/isa-logo.png" 
                  alt="ISA Logo" 
                  fill
                  sizes="32px"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-lg">ISA</h3>
            <p className="text-sm text-gray-500">Inlaab Sales Assistant</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleClearChat}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-inlaab-orange transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-inlaab-orange/30"
            aria-label="Clear conversation"
            title="Clear conversation"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
          <button
            onClick={() => setOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-inlaab-blue/30"
            aria-label="Close chat"
            title="Close chat"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Área de mensajes */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6 bg-gray-50/30">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl relative group ${
                message.role === 'user'
                  ? 'bg-inlaab-cream text-inlaab-blue rounded-br-md border outline-none'
                  : 'bg-white text-gray-800 border border-gray-100 rounded-bl-md'
              }`}
            >
              {message.role === 'assistant' ? (
                <div className="relative">
                  <div
                    className="prose prose-xs max-w-none text-gray-700 text-sm"
                    dangerouslySetInnerHTML={{
                      __html: renderMarkdown(message.content),
                    }}
                  />
                  <div className="flex justify-end mt-1 -mb-1 -mr-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        copyToClipboard(message.content);
                      }}
                      className="p-1 rounded-full text-gray-400 hover:text-inlaab-orange hover:bg-gray-50 transition-colors duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-inlaab-orange/30"
                      aria-label="Copy to clipboard"
                      title="Copy to clipboard"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-xs leading-relaxed">{message.content}</p>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-white text-gray-800 px-4 py-3 rounded-2xl rounded-bl-md shadow-sm border border-gray-100">
              <div className="flex space-x-1 items-center">
                <div className="w-2 h-2 bg-inlaab-blue rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-inlaab-blue rounded-full animate-bounce"
                  style={{ animationDelay: '0.1s' }}
                ></div>
                <div
                  className="w-2 h-2 bg-inlaab-blue rounded-full animate-bounce"
                  style={{ animationDelay: '0.2s' }}
                ></div>
              </div>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Área de input */}
      <div className="px-6 py-4 bg-white border-t border-gray-100">
        <form onSubmit={handleSubmit} className="flex items-center gap-3">
          <div className="flex-1 flex items-center">
            <div className="w-full">
              <textarea
                value={input}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="w-full min-h-[44px] resize-none border-0 bg-gray-50 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-inlaab-blue/20 focus:bg-white hover:bg-gray-100/50 transition-all duration-200 placeholder-gray-400 text-gray-700 leading-tight flex items-center"
                rows={1}
                disabled={loading}
                style={{ cursor: 'text' }}
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="w-9 h-9 p-0 bg-transparent text-inlaab-blue hover:text-inlaab-orange disabled:text-gray-300 disabled:cursor-not-allowed transition-colors duration-200 inline-flex items-center justify-center flex-shrink-0 group"
            aria-label="Send message"
          >
            <div className="relative w-6 h-6">
              <svg
                className="w-6 h-6 absolute inset-0 transition-transform duration-200 group-hover:scale-110"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </div>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatBubbleComponent;
