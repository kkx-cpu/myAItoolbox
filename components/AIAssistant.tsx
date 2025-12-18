
import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from './LanguageContext';
import { TRANSLATIONS } from '../constants';
import { getGeminiStream } from '../services/geminiService';

const MESSAGE_LIMIT = 10;
const STORAGE_KEY = 'kkx_ai_msg_count';

const AIAssistant: React.FC = () => {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; content: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const t = TRANSLATIONS[language];

  useEffect(() => {
    const savedCount = localStorage.getItem(STORAGE_KEY);
    if (savedCount) {
      setMessageCount(parseInt(savedCount, 10));
    }
  }, []);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim() || loading || messageCount >= MESSAGE_LIMIT) return;
    
    const userMsg = input;
    const newCount = messageCount + 1;
    
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);
    
    setMessageCount(newCount);
    localStorage.setItem(STORAGE_KEY, newCount.toString());

    // Prepare a placeholder for the AI response
    setMessages(prev => [...prev, { role: 'ai', content: '' }]);
    
    let fullResponse = '';
    try {
      const stream = getGeminiStream(userMsg, language);
      for await (const chunk of stream) {
        fullResponse += chunk;
        setMessages(prev => {
          const updated = [...prev];
          if (updated.length > 0) {
            updated[updated.length - 1] = { role: 'ai', content: fullResponse };
          }
          return updated;
        });
      }
    } catch (error) {
      console.error("Chat Stream Error", error);
      setMessages(prev => {
        const updated = [...prev];
        updated[updated.length - 1] = { role: 'ai', content: "Sorry, something went wrong." };
        return updated;
      });
    } finally {
      setLoading(false);
    }
  };

  const isLimitReached = messageCount >= MESSAGE_LIMIT;

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      {isOpen ? (
        <div className="glass w-80 md:w-96 h-[500px] rounded-[2.5rem] border border-cyan-500/30 flex flex-col shadow-2xl shadow-cyan-500/20 animate-in fade-in slide-in-from-bottom-5 overflow-hidden">
          <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-gradient-to-r from-cyan-600/20 to-transparent">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center shadow-lg shadow-cyan-500/40">
                <i className="fas fa-robot text-white text-xs"></i>
              </div>
              <div className="flex flex-col">
                <span className="font-black text-xs uppercase tracking-widest">{t.aiAssistant}</span>
                <span className={`text-[8px] font-bold ${isLimitReached ? 'text-red-400' : 'text-cyan-400'}`}>
                  {messageCount} / {MESSAGE_LIMIT} CREDITS USED
                </span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="w-8 h-8 flex items-center justify-center text-slate-500 hover:text-white transition-colors">
              <i className="fas fa-times"></i>
            </button>
          </div>
          
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
            {messages.length === 0 && (
              <div className="text-center text-slate-500 text-xs mt-20 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mb-4 opacity-50">
                  <i className="fas fa-comment-dots text-2xl"></i>
                </div>
                <p className="max-w-[200px] leading-relaxed uppercase tracking-widest opacity-60">{t.askAssistant}</p>
              </div>
            )}
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-5 py-3 rounded-2xl text-sm leading-relaxed ${msg.role === 'user' ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/20' : 'glass border border-slate-800 text-slate-200'}`}>
                  {msg.content || (loading && i === messages.length - 1 ? "..." : "")}
                </div>
              </div>
            ))}
            {isLimitReached && (
              <div className="bg-red-500/5 border border-red-500/20 p-4 rounded-2xl text-[10px] text-red-400 text-center font-bold uppercase tracking-widest animate-pulse">
                <i className="fas fa-exclamation-triangle mr-2"></i>
                {t.limitReached}
              </div>
            )}
          </div>

          <div className="p-6 bg-slate-900/50">
            <div className="flex space-x-2 relative">
              <input
                type="text"
                value={input}
                disabled={isLimitReached}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={isLimitReached ? "LIMIT EXCEEDED" : "Ask something..."}
                className="flex-1 bg-slate-800/80 border border-slate-700 rounded-2xl px-5 py-3 text-xs font-medium focus:outline-none focus:border-cyan-500 transition-colors disabled:opacity-50"
              />
              <button 
                onClick={handleSend}
                disabled={loading || isLimitReached || !input.trim()}
                className="w-12 h-12 bg-cyan-500 rounded-2xl flex items-center justify-center hover:bg-cyan-400 transition-all disabled:opacity-30 disabled:grayscale shadow-lg shadow-cyan-500/20"
              >
                <i className={`fas ${loading ? 'fa-spinner fa-spin' : 'fa-paper-plane'} text-white text-xs`}></i>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-indigo-600 rounded-2xl flex items-center justify-center text-white text-xl shadow-xl shadow-cyan-500/30 hover:scale-105 transition-all animate-float relative group"
        >
          <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <i className="fas fa-comment-alt"></i>
          {isLimitReached && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-[#0b1120] flex items-center justify-center text-[10px] font-black">!</span>
          )}
        </button>
      )}
    </div>
  );
};

export default AIAssistant;
