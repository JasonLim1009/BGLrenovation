import { useEffect, useRef, useState } from "react";

/**
 * Mirrors the two counter scripts from the original site:
 * - "stat" mode: increments in ~150 steps of 20ms (used for .stat-value, with $ / + prefix/suffix)
 * - "feature" mode: increments by 1 every `speed`ms (used for .count, e.g. "10 Year of Expertise")
 */
export default function CountUp({ target, prefix = "", suffix = "", mode = "stat", speed = 200 }) {
  const [value, setValue] = useState(mode === "feature" ? target : 0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const runCount = () => {
      if (started.current) return;
      started.current = true;

      if (mode === "stat") {
        let count = 0;
        const increment = target / 150;
        const tick = () => {
          count += increment;
          if (count < target) {
            setValue(Math.floor(count));
            setTimeout(tick, 20);
          } else {
            setValue(target);
          }
        };
        tick();
      } else {
        let count = 0;
        const tick = () => {
          if (count < target) {
            count++;
            setValue(count);
            setTimeout(tick, speed);
          } else {
            setValue(target);
          }
        };
        tick();
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) runCount();
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [mode, target, speed]);

  return (
    <span ref={ref}>
      {prefix}
      {value.toLocaleString()}
      {suffix}
    </span>
  );
}
