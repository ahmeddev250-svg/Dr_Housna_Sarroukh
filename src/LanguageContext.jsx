import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from './translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('fr');

  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute('lang', lang);
    html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
  }, [lang]);

  const toggleLanguage = (newLang) => {
    if (newLang === 'fr' || newLang === 'ar') {
      setLang(newLang);
    } else {
      setLang((prev) => (prev === 'fr' ? 'ar' : 'fr'));
    }
  };

  const t = translations[lang];
  const isRTL = lang === 'ar';

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
