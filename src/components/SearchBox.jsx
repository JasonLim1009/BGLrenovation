import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchIndex } from "../data/searchIndex.js";
import { useLanguage } from "../i18n/LanguageContext.jsx";
import "./search-box.css";

export default function SearchBox() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { t } = useLanguage();
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);

  const results =
    query.trim().length === 0
      ? []
      : searchIndex.filter((item) =>
          item.title.toLowerCase().includes(query.trim().toLowerCase())
        );

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const goTo = (item) => {
    setOpen(false);
    setQuery("");
    navigate(item.hash ? `${item.path}#${item.hash}` : item.path);
  };

  return (
    <div className={`search-box${open ? " active" : ""}`} ref={wrapperRef}>
      <button
        className="search-toggle-btn"
        aria-label="toggle search"
        onClick={() => setOpen((prev) => !prev)}
      >
        <ion-icon name={open ? "close-outline" : "search-outline"} aria-hidden="true"></ion-icon>
      </button>

      {open && (
        <div className="search-panel">
          <input
            ref={inputRef}
            type="text"
            className="search-input"
            placeholder={t("search_placeholder")}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && results.length > 0) goTo(results[0]);
            }}
          />

          {query.trim().length > 0 && (
            <ul className="search-results">
              {results.length === 0 ? (
                <li className="search-empty">No matches for "{query}"</li>
              ) : (
                results.map((item) => (
                  <li key={`${item.path}${item.hash || ""}${item.title}`}>
                    <button className="search-result-item" onClick={() => goTo(item)}>
                      <span className="search-result-title">{item.title}</span>
                      <span className="search-result-subtitle">{item.subtitle}</span>
                    </button>
                  </li>
                ))
              )}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
