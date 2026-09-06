import { useEffect, useRef } from "react";
import { trackEvent } from "../analytics/ga.js";

/**
 * Attach to any section you want dwell-time analytics for (e.g. a service
 * gallery). Fires a GA4 "gallery_dwell_time" event with the number of
 * seconds the element was actually visible, each time it scrolls out of
 * view (and once more on page unload for whatever's still open).
 *
 * Usage: const ref = useDwellTracking("Ceiling & Electrical");
 *        <div ref={ref}>...</div>
 */
export function useDwellTracking(label) {
  const ref = useRef(null);
  const visibleSince = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const flush = () => {
      if (visibleSince.current == null) return;
      const seconds = Math.round((Date.now() - visibleSince.current) / 1000);
      visibleSince.current = null;
      if (seconds >= 2) {
        trackEvent("gallery_dwell_time", {
          gallery_category: label,
          dwell_seconds: seconds,
        });
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (visibleSince.current == null) visibleSince.current = Date.now();
            trackEvent("view_gallery", { gallery_category: label });
          } else {
            flush();
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    window.addEventListener("beforeunload", flush);

    return () => {
      flush();
      observer.disconnect();
      window.removeEventListener("beforeunload", flush);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [label]);

  return ref;
}
