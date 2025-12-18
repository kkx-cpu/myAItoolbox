
import React from 'react';
import { useLanguage } from './LanguageContext';
import { TRANSLATIONS } from '../constants';

const Hero: React.FC = () => {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Animated Blobs */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-indigo-600/30 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-cyan-600/20 rounded-full blur-[150px] animate-pulse delay-700"></div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <div className="inline-block px-4 py-1.5 mb-6 rounded-full glass border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-widest animate-bounce">
          <i className="fas fa-sparkles mr-2"></i> Innovative Higher Ed Research
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight">
          <span className="block">{t.heroTitle.split(' ')[0]}</span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500">
            {t.heroTitle.split(' ').slice(1).join(' ')}
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          {t.heroSub}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <a 
            href="#tools" 
            onClick={(e) => handleScroll(e, 'tools')}
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-indigo-600 rounded-xl font-bold text-lg hover:scale-105 transition-transform shadow-lg shadow-cyan-500/25"
          >
            {t.exploreBtn}
          </a>
          <a 
            href="#news" 
            onClick={(e) => handleScroll(e, 'news')}
            className="px-8 py-4 glass border border-slate-700 rounded-xl font-bold text-lg hover:bg-slate-800 transition-colors"
          >
            {t.navNews} <i className="fas fa-arrow-right ml-2 text-sm"></i>
          </a>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-30">
        <i className="fas fa-chevron-down text-2xl"></i>
      </div>
    </section>
  );
};

export default Hero;
