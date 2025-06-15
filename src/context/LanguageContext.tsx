
import React, { createContext, useContext, useEffect, useState } from "react";

type SupportedLanguage = "fr" | "ar" | "en";
interface LanguageContextProps {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
}

const defaultLang = (): SupportedLanguage => {
  // 1. Check localStorage
  const storedLang = localStorage.getItem("appLanguage") as SupportedLanguage | null;
  if (storedLang && ["fr", "ar", "en"].includes(storedLang)) return storedLang;
  // 2. Detect system/browser language
  const navigatorLang = navigator.language.slice(0, 2);
  if (navigatorLang === "fr") return "fr";
  if (navigatorLang === "ar") return "ar";
  if (navigatorLang === "en") return "en";
  // 3. Fallback
  return "fr";
};

const LanguageContext = createContext<LanguageContextProps>({
  language: "fr",
  setLanguage: () => {},
});

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<SupportedLanguage>(defaultLang());

  useEffect(() => {
    localStorage.setItem("appLanguage", language);
    document.documentElement.lang = language; // Set html lang attr
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
