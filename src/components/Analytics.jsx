import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { initGA, trackPageView } from "../analytics/ga.js";

export default function Analytics() {
  const location = useLocation();

  useEffect(() => {
    initGA();
  }, []);

  useEffect(() => {
    trackPageView(location.pathname + location.search, document.title);
  }, [location.pathname, location.search]);

  return null;
}
