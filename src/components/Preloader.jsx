import { useEffect, useState } from "react";

export default function Preloader() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const markLoaded = () => {
      setLoaded(true);
      document.body.classList.add("loaded");
    };

    if (document.readyState === "complete") {
      markLoaded();
    } else {
      window.addEventListener("load", markLoaded);
      return () => window.removeEventListener("load", markLoaded);
    }
  }, []);

  return (
    <div className={`preload${loaded ? " loaded" : ""}`}>
      <div className="circle"></div>
      <p className="text">BGL DESIGN & BUILD</p>
    </div>
  );
}
