
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, User } from '../types';
import { ChevronLeft, Send, MoreHorizontal, CheckCheck } from 'lucide-react';

interface ChatPageProps {
  messages: ChatMessage[];
  currentUser: User;
  onSendMessage: (text: string) => void;
  onBack: () => void;
}

const ChatPage: React.FC<ChatPageProps> = ({ messages, currentUser, onSendMessage, onBack }) => {
  const [inputText, setInputText] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(inputText);
    setInputText('');
  };

  return (
    <div className="flex flex-col h-screen bg-[#F8F9FE]">
      {/* Header Premium do Chat */}
      <header className="bg-black text-white p-6 rounded-b-[2.5rem] shadow-2xl z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="p-2 bg-white/10 rounded-xl text-amber-500 active:scale-95 transition-all">
              <ChevronLeft size={24} />
            </button>
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 bg-white rounded-2xl overflow-hidden border-2 border-amber-500 shadow-lg">
                  <img src="https://i.ibb.co/L6V23S1/Logo-Paulo-Jorge.jpg" alt="Paulo Jorge" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-black animate-pulse"></div>
              </div>
              <div>
                <h2 className="text-base font-black uppercase tracking-tight italic">Paulo Jorge</h2>
                <p className="text-[10px] text-green-400 font-black uppercase tracking-widest">Online Agora</p>
              </div>
            </div>
          </div>
          <button className="p-2 text-stone-500">
            <MoreHorizontal size={24} />
          </button>
        </div>
      </header>

      {/* Área de Mensagens */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar pb-32"
      >
        <div className="text-center py-6">
          <span className="bg-stone-100 text-stone-400 text-[9px] font-black uppercase tracking-[0.2em] px-4 py-1 rounded-full">
            Início da conversa segura
          </span>
        </div>

        {messages.map((msg) => {
          const isMine = msg.sender_id === currentUser.id;
          return (
            <div 
              key={msg.id} 
              className={`flex ${isMine ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}
            >
              <div className={`max-w-[80%] p-4 rounded-[1.8rem] shadow-sm relative ${
                isMine 
                  ? 'bg-amber-500 text-black rounded-tr-none' 
                  : 'bg-white text-stone-800 border border-stone-100 rounded-tl-none'
              }`}>
                <p className="text-sm font-bold leading-relaxed">{msg.text}</p>
                <div className={`flex items-center justify-end gap-1 mt-1.5 ${isMine ? 'text-black/40' : 'text-stone-300'}`}>
                  <span className="text-[9px] font-black">
                    {new Date(msg.timestamp).toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  {isMine && <CheckCheck size={12} />}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Input de Mensagem Fixo ao Fundo */}
      <div className="p-6 bg-white border-t border-stone-100 rounded-t-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
        <form onSubmit={handleSend} className="flex gap-3">
          <input 
            type="text" 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Escreve ao Paulo..."
            className="flex-1 bg-stone-50 border border-stone-100 py-4 px-6 rounded-2xl font-bold text-sm outline-none focus:ring-2 focus:ring-amber-500/20 transition-all"
          />
          <button 
            type="submit"
            className="w-14 h-14 bg-black text-amber-500 rounded-2xl flex items-center justify-center shadow-xl active:scale-90 transition-all shrink-0"
          >
            <Send size={24} fill="currentColor" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatPage;
