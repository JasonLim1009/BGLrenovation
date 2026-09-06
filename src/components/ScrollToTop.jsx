import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * React Router doesn't reset scroll position on navigation like a full
 * page load does. This scrolls to the top on a normal route change, or
 * to the matching element if the URL has a #hash (used by the header
 * search box to deep-link into a specific service gallery).
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // wait a tick for the new page's content to mount
      const id = hash.replace("#", "");
      const timer = setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
        else window.scrollTo(0, 0);
      }, 50);
      return () => clearTimeout(timer);
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}
