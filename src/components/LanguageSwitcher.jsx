import { useLanguage } from "../i18n/LanguageContext.jsx";
import { languageLabels } from "../i18n/translations.js";
import "./language-switcher.css";

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="lang-switcher">
      {Object.keys(languageLabels).map((code) => (
        <button
          key={code}
          className={`lang-btn${lang === code ? " active" : ""}`}
          onClick={() => setLang(code)}
          aria-pressed={lang === code}
        >
          {languageLabels[code]}
        </button>
      ))}
    </div>
  );
}
