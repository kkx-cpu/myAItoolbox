
import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from './LanguageContext';
import { TRANSLATIONS } from '../constants';
import { Language } from '../types';

const Header: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const t = TRANSLATIONS[language];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsLangMenuOpen(false);
      }
    };
    window.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const languages: { label: string; code: Language }[] = [
    { label: "中文", code: "zh" },
    { label: "EN", code: "en" },
    { label: "日本語", code: "ja" }
  ];

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'glass py-3' : 'bg-transparent py-6'}`}>
      {/* 滚动进度条 */}
      <div 
        className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-cyan-500 via-purple-500 to-indigo-500 transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      ></div>

      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* KKX LOGO - RE-DESIGNED TO BE MORE COOL */}
        <div 
          className="flex items-center space-x-6 group cursor-pointer" 
          onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
        >
          <div className="relative w-14 h-14 flex items-center justify-center">
            {/* Multi-layered Animated Glow */}
            <div className="absolute inset-0 bg-cyan-500/20 rounded-2xl blur-xl group-hover:bg-cyan-400/40 transition-all duration-700 animate-pulse"></div>
            <div className="absolute inset-[-4px] bg-gradient-to-tr from-cyan-500 via-indigo-600 to-purple-500 rounded-2xl opacity-20 group-hover:opacity-100 group-hover:animate-[spin_3s_linear_infinite] transition-opacity duration-500"></div>
            
            {/* Main Logo Container */}
            <div className="relative w-full h-full bg-[#0f172a] rounded-2xl flex items-center justify-center border border-white/10 z-10 overflow-hidden shadow-2xl">
              {/* Internal Moving Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="relative z-20 flex items-center justify-center">
                <span className="text-white font-black text-xl tracking-tighter italic transition-transform group-hover:scale-95 duration-300">
                  KK
                  <span className="text-cyan-400 relative">
                    X
                    {/* Tiny X decoration */}
                    <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-white rounded-full animate-ping opacity-0 group-hover:opacity-100"></span>
                  </span>
                </span>
              </div>
              
              {/* Scanline effect inside logo */}
              <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden opacity-20 group-hover:opacity-40">
                <div className="absolute w-full h-1 bg-white/20 -top-full group-hover:animate-[scan_2s_linear_infinite]"></div>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tighter leading-none text-white flex items-center">
              KAIXIANG
              <span className="relative ml-1">
                <span className="text-cyan-400">.KANG</span>
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-cyan-500 group-hover:w-full transition-all duration-500"></span>
              </span>
            </span>
            <span className="text-[10px] uppercase tracking-[0.4em] text-slate-500 font-bold mt-1.5 flex items-center">
              <span className="w-4 h-[1px] bg-slate-800 mr-2"></span>
              AI PRACTICAL TOOLKIT
            </span>
          </div>
        </div>

        <nav className="hidden md:flex items-center space-x-10">
          <a href="#tools" className="text-[10px] font-black text-slate-400 hover:text-cyan-400 transition-all uppercase tracking-[0.2em] relative group/link">
            {t.navTools}
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-cyan-500 group-hover/link:w-full transition-all"></span>
          </a>
          <a href="#news" className="text-[10px] font-black text-slate-400 hover:text-cyan-400 transition-all uppercase tracking-[0.2em] relative group/link">
            {t.navNews}
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-cyan-500 group-hover/link:w-full transition-all"></span>
          </a>
          
          <div className="relative" ref={menuRef}>
            <button 
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className={`flex items-center space-x-3 text-[9px] font-black border px-5 py-2.5 rounded-xl transition-all uppercase tracking-widest ${isLangMenuOpen ? 'border-cyan-400 bg-cyan-400/10 text-white shadow-[0_0_15px_rgba(6,182,212,0.2)]' : 'border-slate-800 text-slate-400 hover:border-cyan-500/50 hover:text-slate-200'}`}
            >
              <i className="fas fa-globe-asia text-cyan-500"></i>
              <span>{languages.find(l => l.code === language)?.label}</span>
            </button>
            
            <div className={`absolute right-0 mt-3 w-40 glass rounded-2xl overflow-hidden border border-slate-800 shadow-2xl transition-all duration-300 origin-top-right ${isLangMenuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
              <div className="py-1">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => { setLanguage(lang.code); setIsLangMenuOpen(false); }}
                    className={`w-full text-left px-5 py-3 text-[9px] font-black tracking-widest uppercase transition-colors flex items-center justify-between ${language === lang.code ? 'text-cyan-400 bg-cyan-500/10' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
                  >
                    <span>{lang.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
