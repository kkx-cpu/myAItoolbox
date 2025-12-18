
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Language } from '../types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

/**
 * 自动检测系统语言并映射到受支持的语言类型
 */
const detectSystemLanguage = (): Language => {
  const navLang = navigator.language.toLowerCase();
  
  if (navLang.startsWith('zh')) return 'zh';
  if (navLang.startsWith('ja')) return 'ja';
  
  // 默认返回英文，作为国际化通用选择
  return 'en';
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // 使用惰性初始化，只在组件首次挂载时执行一次检测
  const [language, setLanguage] = useState<Language>(() => {
    // 检查本地存储是否有用户之前的选择
    const savedLang = localStorage.getItem('kkx_pref_lang') as Language;
    if (savedLang && ['zh', 'en', 'ja'].includes(savedLang)) {
      return savedLang;
    }
    return detectSystemLanguage();
  });

  // 当语言改变时，保存到本地存储以便下次访问
  const updateLanguage = (newLang: Language) => {
    setLanguage(newLang);
    localStorage.setItem('kkx_pref_lang', newLang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: updateLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within a LanguageProvider");
  return context;
};
