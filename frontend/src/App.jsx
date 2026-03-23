import React, { useState, useEffect, useRef } from 'react';
import { sendMessage } from './services/api';
import Message from './components/Message';
import Input from './components/Input';

const HeartIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
);

function App() {
  const [messages, setMessages] = useState([
    {
      text: '¡Hola! Soy Sana, tu espacio seguro de apoyo emocional. ¿Cómo te sientes hoy?',
      sender: 'ai',
      time: 'Ahora'
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [sessionId] = useState(() => Math.random().toString(36).substring(7));
  const chatRef = useRef(null);

  // Auto-scroll logic
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSendMessage = async (text) => {
    const userMsg = { text, sender: 'user', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const data = await sendMessage(text, sessionId);
      const aiMsg = { 
        text: data.reply, 
        sender: 'ai', 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (error) {
      const errMsg = { 
        text: 'Lo siento, hubo un problema de conexión. ¿Podemos intentarlo de nuevo?', 
        sender: 'ai', 
        time: 'Error' 
      };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100 p-4 font-sans">
      <div className="w-full max-w-lg h-[90vh] bg-white rounded-[2rem] shadow-2xl flex flex-col overflow-hidden border border-white/20">
        
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md px-6 py-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-violet-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-violet-200">
              <HeartIcon size={20} />
            </div>
            <div>
              <h1 className="font-semibold text-slate-800 text-lg leading-tight">SANA</h1>
              <span className="text-[10px] text-emerald-500 font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                En línea ahora
              </span>
            </div>
          </div>
        </header>

        {/* Chat History */}
        <main ref={chatRef} className="flex-1 overflow-y-auto p-6 space-y-2 bg-[#fdfdfd] chat-scrollbar">
          {messages.map((msg, i) => (
            <Message key={i} {...msg} />
          ))}
          
          {/* Typing Indicator */}
          {loading && (
            <div className="flex items-center gap-1.5 py-4 animate-in fade-in duration-500">
              <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
              <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
              <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce"></span>
            </div>
          )}
        </main>

        {/* Input Area */}
        <Input onSendMessage={handleSendMessage} disabled={loading} />
      </div>
    </div>
  );
}

export default App;
