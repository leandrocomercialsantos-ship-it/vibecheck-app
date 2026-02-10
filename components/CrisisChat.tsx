
import React, { useState, useRef, useEffect } from 'react';
import { getCrisisSupportResponse } from '../services/gemini.ts';
import { ChatMessage, VoiceSettings } from '../types.ts';
import { speak } from '../services/speech.ts';
import { PelicanLogo } from './PelicanLogo.tsx';

interface CrisisChatProps {
  voiceSettings: VoiceSettings;
}

export const CrisisChat: React.FC<CrisisChatProps> = ({ voiceSettings }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      text: 'Olá, sou o Pelicano IA. Como posso ajudar com suas finanças hoje?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (textToSend?: string) => {
    const finalInput = textToSend || input;
    if (!finalInput.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      role: 'user',
      text: finalInput,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    const responseText = await getCrisisSupportResponse(finalInput, history);
    
    const modelMsg: ChatMessage = {
      role: 'model',
      text: responseText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, modelMsg]);
    setIsLoading(false);

    speak(responseText, voiceSettings);
  };

  const toggleListening = () => {
    if (isListening) {
      setIsListening(false);
      // Simulação de voz finalizada
      if (input.length === 0) handleSend("Gostaria de um conselho financeiro");
    } else {
      setIsListening(true);
      // Simulando reconhecimento de voz
      setTimeout(() => {
        setIsListening(false);
      }, 3000);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col h-[75vh] glass-premium rounded-[3rem] border border-white/10 shadow-2xl overflow-hidden">
      <div className="bg-slate-950/40 p-6 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-orange-500/10 rounded-2xl flex items-center justify-center text-orange-400 text-2xl shadow-lg">
            <PelicanLogo className="w-8 h-8" />
          </div>
          <div>
            <h3 className="font-bold text-white text-lg tracking-tight">Pelicano IA</h3>
            <p className="text-[10px] text-orange-400 font-black uppercase tracking-widest">
              {isListening ? 'Ouvindo...' : 'Sempre Ativo'}
            </p>
          </div>
        </div>
        
        {isListening && (
          <div className="flex items-center gap-1.5 px-4">
            <div className="w-1 h-4 bg-orange-500 rounded-full audio-wave-bar"></div>
            <div className="w-1 h-6 bg-orange-400 rounded-full audio-wave-bar [animation-delay:0.2s]"></div>
            <div className="w-1 h-3 bg-orange-500 rounded-full audio-wave-bar [animation-delay:0.4s]"></div>
            <div className="w-1 h-5 bg-orange-400 rounded-full audio-wave-bar [animation-delay:0.1s]"></div>
          </div>
        )}
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-950/20"
      >
        {messages.map((msg, idx) => (
          <div 
            key={idx} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[85%] p-5 rounded-[2rem] ${
              msg.role === 'user' 
                ? 'bg-orange-600 text-white rounded-tr-none' 
                : 'glass-premium border border-white/10 text-slate-100 rounded-tl-none'
            }`}>
              <p className="text-sm leading-relaxed whitespace-pre-wrap font-medium">{msg.text}</p>
              <div className="flex items-center justify-between mt-2 opacity-40">
                <p className="text-[10px]">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="glass-premium border border-white/10 p-4 rounded-2xl rounded-tl-none">
              <div className="flex gap-1.5">
                <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-6 bg-slate-950/40 border-t border-white/5 flex gap-3 items-center">
        <button 
          onClick={toggleListening}
          className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all shadow-xl active:scale-90 ${
            isListening ? 'bg-rose-500 text-white animate-pulse' : 'bg-white/5 text-orange-400 border border-white/10'
          }`}
          title="Falar com IA"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-20a3 3 0 00-3 3v8a3 3 0 003 3s3 0 3-3V7a3 3 0 00-3-3z" />
          </svg>
        </button>

        <div className="flex-1 relative">
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder={isListening ? "Ouvindo sua voz..." : "Digite ou fale..."}
            disabled={isListening}
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm text-white focus:border-orange-500 outline-none transition-all font-medium pr-14"
          />
          <button 
            onClick={() => handleSend()}
            disabled={isLoading || !input.trim() || isListening}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-orange-400 hover:text-orange-300 disabled:opacity-30"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
