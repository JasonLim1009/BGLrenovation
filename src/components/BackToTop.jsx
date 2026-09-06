import { useEffect, useState } from "react";

export default function BackToTop() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const onScroll = () => setActive(window.scrollY >= 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a href="#top" className={`back-top-btn${active ? " active" : ""}`} aria-label="back to top">
      <ion-icon name="chevron-up" aria-hidden="true"></ion-icon>
    </a>
  );
}
