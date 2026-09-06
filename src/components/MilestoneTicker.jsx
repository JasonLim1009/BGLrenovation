import { useMemo } from "react";
import { projects, CATEGORIES, isLiveData } from "../data/projects.js";
import "./milestone-ticker.css";

function monthKey(dateStr) {
  return dateStr?.slice(0, 7); // "2025-08"
}

function buildTickerData() {
  const now = new Date();
  const thisMonth = now.toISOString().slice(0, 7);
  const lastMonthDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const lastMonth = lastMonthDate.toISOString().slice(0, 7);

  return CATEGORIES.map((cat) => {
    const catProjects = projects.filter((p) => p.category === cat);
    const total = catProjects.length;
    const thisMonthCount = catProjects.filter((p) => monthKey(p.date) === thisMonth).length;
    const lastMonthCount = catProjects.filter((p) => monthKey(p.date) === lastMonth).length;
    const delta = thisMonthCount - lastMonthCount;
    return { category: cat, total, delta };
  }).filter((row) => row.total > 0);
}

export default function MilestoneTicker() {
  const rows = useMemo(buildTickerData, []);
  if (rows.length === 0) return null;

  // duplicate the row list so the CSS marquee loop is seamless
  const loopRows = [...rows, ...rows];

  return (
    <div className="milestone-ticker" aria-label="project milestones ticker">
      <div className="milestone-ticker-label">
        <span>BGL MILESTONES</span>
        {!isLiveData && <span className="milestone-ticker-demo-tag">DEMO DATA</span>}
      </div>
      <div className="milestone-ticker-track-wrapper">
        <div className="milestone-ticker-track">
          {loopRows.map((row, i) => (
            <span className="milestone-ticker-item" key={`${row.category}-${i}`}>
              <span className="milestone-ticker-cat">{row.category}</span>
              <span className="milestone-ticker-count">{row.total}</span>
              <span className={`milestone-ticker-delta ${row.delta > 0 ? "up" : row.delta < 0 ? "down" : "flat"}`}>
                {row.delta > 0 ? "▲" : row.delta < 0 ? "▼" : "●"} {Math.abs(row.delta)} this month
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
