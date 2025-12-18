
import React, { useState, useEffect } from 'react';
import { useLanguage } from './LanguageContext';
import { TRANSLATIONS } from '../constants';
import { getGeminiResponse } from '../services/geminiService';

const MESSAGE_LIMIT = 10;
const STORAGE_KEY = 'kkx_ai_msg_count';

const AIAssistant: React.FC = () => {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; content: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  
  const t = TRANSLATIONS[language];

  // Initialize message count from local storage
  useEffect(() => {
    const savedCount = localStorage.getItem(STORAGE_KEY);
    if (savedCount) {
      setMessageCount(parseInt(savedCount, 10));
    }
  }, []);

  const handleSend = async () => {
    if (!input.trim() || loading || messageCount >= MESSAGE_LIMIT) return;
    
    const userMsg = input;
    const newCount = messageCount + 1;
    
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);
    
    // Update count in state and storage
    setMessageCount(newCount);
    localStorage.setItem(STORAGE_KEY, newCount.toString());

    const response = await getGeminiResponse(userMsg, language);
    setMessages(prev => [...prev, { role: 'ai', content: response || "..." }]);
    setLoading(false);
  };

  const isLimitReached = messageCount >= MESSAGE_LIMIT;

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      {isOpen ? (
        <div className="glass w-80 md:w-96 h-[450px] rounded-3xl border border-cyan-500/30 flex flex-col shadow-2xl shadow-cyan-500/20 animate-in fade-in slide-in-from-bottom-5">
          <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-gradient-to-r from-cyan-600/20 to-transparent rounded-t-3xl">
            <div className="flex items-center space-x-2">
              <i className="fas fa-robot text-cyan-400"></i>
              <span className="font-bold">{t.aiAssistant}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${isLimitReached ? 'bg-red-500/20 text-red-400' : 'bg-cyan-500/10 text-cyan-400'}`}>
                {messageCount}/{MESSAGE_LIMIT}
              </span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white">
              <i className="fas fa-times"></i>
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-slate-500 text-sm mt-10">
                <i className="fas fa-comment-dots text-4xl mb-3 block opacity-20"></i>
                {t.askAssistant}
              </div>
            )}
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-cyan-600 text-white' : 'glass border border-slate-700 text-slate-200'}`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isLimitReached && (
              <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-xl text-xs text-red-400 text-center animate-pulse">
                <i className="fas fa-exclamation-triangle mr-2"></i>
                {t.limitReached}
              </div>
            )}
            {loading && (
              <div className="flex justify-start">
                <div className="glass px-4 py-2 rounded-2xl text-xs flex items-center space-x-2">
                  <div className="w-1 h-1 bg-cyan-400 rounded-full animate-bounce"></div>
                  <div className="w-1 h-1 bg-cyan-400 rounded-full animate-bounce delay-75"></div>
                  <div className="w-1 h-1 bg-cyan-400 rounded-full animate-bounce delay-150"></div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-slate-800/50 rounded-b-3xl">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                disabled={isLimitReached}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={isLimitReached ? "Limit Reached" : "..."}
                className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-cyan-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <button 
                onClick={handleSend}
                disabled={loading || isLimitReached || !input.trim()}
                className="w-10 h-10 bg-cyan-500 rounded-xl flex items-center justify-center hover:bg-cyan-400 transition-colors disabled:opacity-50"
              >
                <i className="fas fa-paper-plane text-white"></i>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-indigo-600 rounded-full flex items-center justify-center text-white text-2xl shadow-xl shadow-cyan-500/30 hover:scale-110 transition-transform animate-float neon-glow relative"
        >
          <i className="fas fa-comment-alt"></i>
          {isLimitReached && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-[#0b1120] flex items-center justify-center text-[10px] font-bold">!</span>
          )}
        </button>
      )}
    </div>
  );
};

export default AIAssistant;
