import { useRef, useState } from "react";
import "./before-after.css";

/**
 * pairs: [{ before, after, label }]
 * Drag the divider (or tap/click anywhere) to reveal more of the "after" photo.
 */
export default function BeforeAfter({ pairs }) {
  return (
    <div className="before-after-grid">
      {pairs.map((pair) => (
        <BeforeAfterCard key={pair.label} pair={pair} />
      ))}
    </div>
  );
}

function BeforeAfterCard({ pair }) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef(null);
  const dragging = useRef(false);

  const updateFromClientX = (clientX) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, pct)));
  };

  const onPointerDown = (e) => {
    dragging.current = true;
    updateFromClientX(e.clientX ?? e.touches?.[0]?.clientX);
  };
  const onPointerMove = (e) => {
    if (!dragging.current) return;
    updateFromClientX(e.clientX ?? e.touches?.[0]?.clientX);
  };
  const stopDragging = () => {
    dragging.current = false;
  };

  return (
    <div className="before-after-card">
      <div
        className="before-after-container"
        ref={containerRef}
        style={{ backgroundImage: `url(${pair.after})` }}
        onMouseDown={onPointerDown}
        onMouseMove={onPointerMove}
        onMouseUp={stopDragging}
        onMouseLeave={stopDragging}
        onTouchStart={onPointerDown}
        onTouchMove={onPointerMove}
        onTouchEnd={stopDragging}
      >
        <div
          className="ba-before-wrapper"
          style={{
            clipPath: `inset(0 ${100 - position}% 0 0)`,
            backgroundImage: `url(${pair.before})`,
          }}
        ></div>
        <div className="ba-divider" style={{ left: `${position}%` }}>
          <span className="ba-handle">
            <ion-icon name="chevron-back" aria-hidden="true"></ion-icon>
            <ion-icon name="chevron-forward" aria-hidden="true"></ion-icon>
          </span>
        </div>
        <span className="ba-tag ba-tag-before">Before</span>
        <span className="ba-tag ba-tag-after">After</span>
      </div>
      <p className="ba-label">{pair.label}</p>
    </div>
  );
}
