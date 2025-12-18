
import React, { useEffect, useState } from 'react';
import { useLanguage } from './LanguageContext';
import { TRANSLATIONS } from '../constants';
import { fetchLatestHENews, NewsItem } from '../services/geminiService';

const NewsSection: React.FC = () => {
  const { language } = useLanguage();
  const [allNews, setAllNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const t = TRANSLATIONS[language];

  const loadNews = async () => {
    setLoading(true);
    const data = await fetchLatestHENews(language);
    setAllNews(data);
    setLoading(false);
  };

  useEffect(() => {
    loadNews();
  }, [language]);

  return (
    <section id="news" className="py-24 border-t border-white/5 relative overflow-hidden bg-slate-900/20">
      {/* Subtle geometric background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-indigo-500/5 to-transparent pointer-events-none"></div>
      
      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        <div className="flex flex-col space-y-12">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-10">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 text-cyan-400 text-[10px] font-black uppercase tracking-[0.4em]">
                <span className="w-8 h-[1px] bg-cyan-500/50"></span>
                <span>Insight Journal</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
                {t.newsSectionTitle}
              </h2>
            </div>
            <button 
              onClick={loadNews}
              disabled={loading}
              className="group flex items-center space-x-3 text-slate-500 hover:text-cyan-400 transition-colors text-xs font-bold uppercase tracking-widest"
            >
              <i className={`fas fa-sync-alt ${loading ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-700'}`}></i>
              <span>{loading ? (language === 'zh' ? '获取中...' : 'Fetching...') : (language === 'zh' ? '刷新资讯' : 'Refresh News')}</span>
            </button>
          </div>

          {/* News List */}
          <div className="grid grid-cols-1 gap-12">
            {loading ? (
              // Enhanced skeleton loading
              [1, 2, 3].map(i => (
                <div key={i} className="flex flex-col space-y-4 animate-pulse">
                  <div className="h-8 bg-white/5 w-3/4 rounded-lg"></div>
                  <div className="h-4 bg-white/5 w-full rounded-lg"></div>
                  <div className="h-4 bg-white/5 w-5/6 rounded-lg"></div>
                  <div className="h-10 w-32 bg-white/5 rounded-xl"></div>
                </div>
              ))
            ) : allNews.length > 0 ? (
              allNews.map((item, index) => (
                <article 
                  key={index}
                  className="group relative flex flex-col md:flex-row gap-8 items-start p-2 rounded-[2rem] transition-all hover:bg-white/[0.02]"
                >
                  {/* Date/Source Indicator */}
                  <div className="hidden md:flex flex-col items-center justify-start pt-2 space-y-4 w-24 shrink-0">
                    <div className="text-[10px] font-black text-cyan-500 uppercase tracking-widest vertical-text rotate-180 opacity-40 group-hover:opacity-100 transition-opacity">
                      {item.date}
                    </div>
                    <div className="w-[1px] h-12 bg-gradient-to-b from-cyan-500/50 to-transparent"></div>
                  </div>

                  {/* Content Area */}
                  <div className="flex-1 space-y-5">
                    <div className="flex items-center space-x-3">
                      <span className="bg-white/5 text-slate-500 text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter group-hover:bg-cyan-500/10 group-hover:text-cyan-400 transition-colors">
                        {item.sourceLabel}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl md:text-3xl font-bold text-slate-100 leading-snug group-hover:text-white transition-colors">
                      {item.title}
                    </h3>
                    
                    <p className="text-slate-400 text-base md:text-lg leading-relaxed font-light max-w-3xl">
                      {item.summary}
                    </p>

                    <div className="pt-2">
                      <a 
                        href={item.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-3 text-cyan-500 hover:text-cyan-400 font-bold text-xs uppercase tracking-[0.2em] transition-all group/link"
                      >
                        <span>{t.readMore}</span>
                        <div className="w-8 h-8 rounded-full border border-cyan-500/20 flex items-center justify-center group-hover/link:bg-cyan-500 group-hover/link:text-white transition-all">
                          <i className="fas fa-arrow-right text-[10px]"></i>
                        </div>
                      </a>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="text-center py-20 glass rounded-[3rem] border border-dashed border-slate-800">
                <i className="fas fa-satellite-dish text-4xl text-slate-700 mb-6 block"></i>
                <p className="text-slate-500 font-medium italic">
                  {language === 'zh' ? '暂时无法连接到全球高教资讯中心' : 'Could not synchronize with global HE research data.'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
