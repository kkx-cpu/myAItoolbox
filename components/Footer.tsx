
import React, { useState } from 'react';
import { useLanguage } from './LanguageContext';
import { TRANSLATIONS } from '../constants';

const Footer: React.FC = () => {
  const { language } = useLanguage();
  const [copied, setCopied] = useState(false);
  const t = TRANSLATIONS[language];
  const email = "kougaisyou@yahoo.co.jp";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="py-24 border-t border-slate-900 bg-[#0b1120]/80 relative z-10 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-600/5 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-16 lg:gap-8">
          
          {/* Brand Info */}
          <div className="space-y-8 flex-1">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-slate-900 border border-cyan-500/20 rounded-2xl flex items-center justify-center shadow-xl">
                <span className="text-cyan-400 font-black text-2xl">KKX</span>
              </div>
              <div>
                <span className="font-black text-2xl tracking-tighter block leading-none text-white">
                  KAIXIANG<span className="text-cyan-500">.KANG</span>
                </span>
                <span className="text-[10px] uppercase tracking-[0.4em] text-slate-500 font-bold mt-2 block">
                  {language === 'zh' ? 'AI 实用工具箱' : 'AI Toolkit'}
                </span>
              </div>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed max-w-md">
              {language === 'zh' 
                ? '康凯翔的 AI 实用工具箱：深耕教育技术，连接智慧与创意，致力于打造赋能学术研究与跨文化交流的高效工具。' 
                : 'Kaixiang\'s AI Toolkit: Rooted in educational technology, bridging intelligence and creativity to empower academic research and cross-cultural communication.'}
            </p>
          </div>
          
          {/* Contact Hub (Replaces Social Matrix) */}
          <div className="w-full lg:w-auto space-y-6">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-6 border-b border-slate-800 pb-2 inline-block">
              {t.contactMe}
            </h4>
            
            <div className="flex flex-wrap gap-4">
              {/* Researchmap Button */}
              <a 
                href="https://researchmap.jp/kangkaixiang" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center space-x-4 glass px-6 py-4 rounded-2xl border border-slate-800 hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all duration-300"
                title={t.viewProfile}
              >
                <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center group-hover:bg-cyan-500 transition-colors">
                  <i className="fas fa-graduation-cap text-cyan-400 group-hover:text-white transition-colors"></i>
                </div>
                <div className="text-left">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1">researchmap</span>
                  <span className="text-sm font-bold text-slate-300 group-hover:text-white transition-colors uppercase tracking-tight">Profile</span>
                </div>
              </a>

              {/* Email Smart Toggle */}
              <button 
                onClick={copyToClipboard}
                className="group flex items-center space-x-4 glass px-6 py-4 rounded-2xl border border-slate-800 hover:border-indigo-500/50 hover:bg-indigo-500/5 transition-all duration-300 relative overflow-hidden"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center group-hover:bg-indigo-500 transition-colors">
                  <i className={`fas ${copied ? 'fa-check' : 'fa-envelope'} text-indigo-400 group-hover:text-white transition-colors`}></i>
                </div>
                <div className="text-left">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1">
                    {copied ? t.copied : t.copyEmail}
                  </span>
                  <span className="text-sm font-bold text-slate-300 group-hover:text-white transition-colors lowercase tracking-tight">
                    {copied ? email : email.replace('@', ' [at] ')}
                  </span>
                </div>

                {/* Copied indicator overlay */}
                <div className={`absolute inset-0 bg-indigo-500 flex items-center justify-center transition-all duration-500 ${copied ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
                   <span className="text-xs font-black uppercase tracking-widest text-white">{t.copied}</span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 pt-8 border-t border-slate-900/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-600 text-[10px] font-bold uppercase tracking-[0.2em]">
            © {new Date().getFullYear()} Kaixiang Kang
          </p>
          <div className="flex items-center space-x-6">
             <span className="text-slate-700 text-[10px] uppercase tracking-widest font-bold">Research Intelligence Hub</span>
             <div className="w-1.5 h-1.5 rounded-full bg-cyan-500/50"></div>
             <span className="text-slate-700 text-[10px] uppercase tracking-widest font-bold">Creative AI Architecture</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
