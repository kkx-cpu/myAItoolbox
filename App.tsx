
import React, { useEffect, useState } from 'react';
import { LanguageProvider } from './components/LanguageContext';
import Header from './components/Header';
import Hero from './components/Hero';
import ToolsGrid from './components/ToolsGrid';
import NewsSection from './components/NewsSection';
import AIAssistant from './components/AIAssistant';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // 鼠标跟随逻辑
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);

    // 揭幕动画逻辑
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
    };
  }, []);

  return (
    <LanguageProvider>
      <div className="min-h-screen relative selection:bg-cyan-500/30 bg-[#0b1120] overflow-x-hidden">
        {/* 交互式聚光灯背景 */}
        <div 
          className="fixed inset-0 pointer-events-none z-[1] transition-opacity duration-1000"
          style={{
            background: `radial-gradient(circle 600px at ${mousePos.x}px ${mousePos.y}px, rgba(6, 182, 212, 0.03), transparent 80%)`
          }}
        ></div>

        <Header />
        
        <main>
          <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
            <div className="absolute top-[-10%] right-[-5%] w-[50%] h-[50%] bg-blue-600/5 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-[10%] left-[-5%] w-[50%] h-[50%] bg-indigo-600/5 rounded-full blur-[120px]"></div>
            
            <div className="absolute inset-0 opacity-[0.03]" 
                 style={{backgroundImage: 'linear-gradient(#94a3b8 1px, transparent 1px), linear-gradient(90deg, #94a3b8 1px, transparent 1px)', backgroundSize: '60px 60px'}}></div>
          </div>
          
          <div className="relative z-10">
            <Hero />
            
            <div className="reveal">
              <ToolsGrid />
            </div>
            
            <div className="reveal">
              <NewsSection />
            </div>
          </div>
        </main>

        <AIAssistant />
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default App;
