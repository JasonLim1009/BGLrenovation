import { createContext, useContext, useEffect, useState } from "react";
import { translations } from "./translations.js";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    if (typeof window === "undefined") return "en";
    return localStorage.getItem("bgl-lang") || "en";
  });

  useEffect(() => {
    localStorage.setItem("bgl-lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const t = (key) => translations[lang]?.[key] ?? translations.en[key] ?? key;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}
