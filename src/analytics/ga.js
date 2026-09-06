const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

let initialized = false;

export function initGA() {
  if (!GA_ID || initialized || typeof window === "undefined") return;
  initialized = true;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;
  gtag("js", new Date());
  // send_page_view disabled here - we send our own pageviews per route
  // change so the SPA is tracked correctly (gtag's default only fires once).
  gtag("config", GA_ID, { send_page_view: false });
}

export function trackPageView(path, title) {
  if (!GA_ID || typeof window.gtag !== "function") return;
  window.gtag("event", "page_view", {
    page_path: path,
    page_title: title,
    page_location: window.location.href,
  });
}

export function trackEvent(name, params = {}) {
  if (!GA_ID || typeof window.gtag !== "function") return;
  window.gtag("event", name, params);
}
