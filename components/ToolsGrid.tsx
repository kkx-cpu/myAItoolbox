
import React, { useState, useMemo } from 'react';
import { useLanguage } from './LanguageContext';
import { TRANSLATIONS, AI_TOOLS } from '../constants';
import { ToolStatus } from '../types';

const ToolsGrid: React.FC = () => {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language];
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = useMemo(() => {
    const cats = new Set(AI_TOOLS.map(tool => tool.category));
    return ['All', ...Array.from(cats)];
  }, []);

  const filteredTools = useMemo(() => {
    return AI_TOOLS.filter(tool => {
      const matchesSearch = 
        tool.title[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description[language].toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || tool.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [language, searchQuery, activeCategory]);

  const getStatusStyle = (status?: ToolStatus) => {
    switch (status) {
      case 'Stable': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'Beta': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'New': return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20';
      case 'Dev': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'Internal Only': return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
      default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  return (
    <section id="tools" className="py-16 pb-32">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="flex-1">
            <div className="inline-block px-4 py-1.5 mb-4 rounded-full glass border border-cyan-500/30 text-cyan-400 text-[10px] font-bold uppercase tracking-widest">
              Project Matrix
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight text-white">
              {t.toolSectionTitle}
            </h2>
            <div className="w-20 h-1.5 bg-gradient-to-r from-cyan-500 to-indigo-600 rounded-full"></div>
          </div>

          <div className="flex flex-col space-y-4 w-full md:w-auto">
            <div className="relative group">
              <input 
                type="text" 
                placeholder={language === 'zh' ? "搜索工具..." : "Search tools..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-80 bg-slate-900/50 border border-slate-800 rounded-2xl px-5 py-3 text-sm focus:outline-none focus:border-cyan-500 transition-all glass"
              />
              <i className="fas fa-search absolute right-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors"></i>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${
                activeCategory === cat 
                ? 'bg-cyan-500 border-cyan-400 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)]' 
                : 'glass border-slate-800 text-slate-500 hover:border-slate-600 hover:text-slate-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 transition-all duration-500">
            {filteredTools.map((tool) => (
              <div 
                key={tool.id} 
                className={`group glass p-6 md:p-8 rounded-[2rem] border transition-all duration-500 hover:-translate-y-2 relative overflow-hidden flex flex-col space-y-5 ${tool.isHot ? 'border-amber-500/30 hover:border-amber-500/50' : 'border-slate-800/50 hover:border-cyan-500/30'}`}
              >
                {/* Visual Flair for Hot/New tools */}
                {tool.isHot && <div className="absolute top-4 right-4 flex items-center space-x-1.5">
                  <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse shadow-[0_0_8px_#f59e0b]"></span>
                  <span className="text-[9px] font-black text-amber-500 uppercase tracking-tighter">Trending</span>
                </div>}
                {tool.isNew && !tool.isHot && <div className="absolute top-4 right-4">
                  <span className="text-[9px] font-black text-cyan-400 uppercase tracking-tighter bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">New Arrival</span>
                </div>}

                <div className="absolute -top-16 -right-16 w-48 h-48 bg-cyan-500/5 rounded-full blur-[60px] group-hover:bg-cyan-500/10 transition-colors"></div>
                
                <div className="flex justify-between items-start">
                  <div className={`w-14 h-14 bg-slate-800/80 backdrop-blur rounded-2xl border border-slate-700 flex items-center justify-center shrink-0 transition-all duration-500 shadow-xl ${tool.isHot ? 'group-hover:bg-amber-500 group-hover:border-amber-400' : 'group-hover:bg-cyan-500 group-hover:border-cyan-400'}`}>
                    <i className={`fas ${tool.icon} text-xl group-hover:text-white transition-colors ${tool.isHot ? 'text-amber-400' : 'text-cyan-400'}`}></i>
                  </div>
                  
                  {tool.status && (
                    <span className={`text-[8px] font-black px-2.5 py-1 rounded-lg border uppercase tracking-tighter mt-1 ${getStatusStyle(tool.status)}`}>
                      {tool.status}
                    </span>
                  )}
                </div>
                
                <div className="flex-1 relative z-10 flex flex-col">
                  <div className="mb-2">
                    <span className="text-[9px] font-bold text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-2.5 py-1 rounded-lg">
                      {tool.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-cyan-400 transition-colors leading-tight min-h-[3rem] flex items-center">
                    {tool.title[language]}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
                    {tool.description[language]}
                  </p>
                  
                  <div className="pt-4 mt-auto">
                    <a 
                      href={tool.link} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group/btn relative w-full px-5 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-xs font-bold text-white transition-all flex items-center justify-center ${tool.isHot ? 'hover:bg-amber-500 hover:border-amber-400 hover:shadow-[0_0_15px_rgba(245,158,11,0.3)]' : 'hover:bg-cyan-500 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)]'}`}
                    >
                      {t.visitTool} 
                      <i className="fas fa-arrow-right ml-3 text-[10px] transition-transform group-hover/btn:translate-x-1"></i>
                    </a>
                  </div>
                </div>
              </div>
            ))}

            <div className="group glass p-8 rounded-[2.5rem] border border-dashed border-slate-800 flex flex-col items-center justify-center space-y-4 opacity-50 hover:opacity-100 transition-opacity">
               <div className="w-12 h-12 rounded-full border border-slate-700 flex items-center justify-center text-slate-600">
                  <i className="fas fa-plus"></i>
               </div>
               <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">More Tools Loading...</span>
            </div>
          </div>
        ) : (
          <div className="text-center py-32 glass rounded-[3rem] border border-slate-800">
            <i className="fas fa-search text-4xl text-slate-700 mb-6 block"></i>
            <p className="text-slate-500 font-medium">
              {language === 'zh' ? '未找到相关工具' : 'No tools found matching your criteria.'}
            </p>
            <button 
              onClick={() => {setSearchQuery(''); setActiveCategory('All');}}
              className="mt-6 text-cyan-500 text-xs font-bold uppercase tracking-widest hover:text-cyan-400 transition-colors"
            >
              {language === 'zh' ? '重置筛选' : 'Clear All Filters'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ToolsGrid;
