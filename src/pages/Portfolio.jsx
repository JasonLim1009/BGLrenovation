import { useMemo, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import SEOHead from "../components/SEOHead.jsx";
import { projects, CATEGORIES, isLiveData } from "../data/projects.js";
import "./portfolio.css";

// Leaflet's default marker icon paths break under bundlers like Vite (it
// looks for images relative to the JS chunk, not the actual asset). Point
// it at CDN-hosted icons instead so pins render correctly.
const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// rough center point between Seremban and Kuala Lumpur so both clusters are visible on load
const MAP_CENTER = [2.95, 101.85];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = useMemo(
    () => (activeCategory === "All" ? projects : projects.filter((p) => p.category === activeCategory)),
    [activeCategory]
  );

  return (
    <>
      <SEOHead
        title="Portfolio"
        description="Browse BGL Design & Build's completed renovation projects across Seremban and Kuala Lumpur, filterable by service type and mapped by location."
        path="/portfolio"
      />

      <section className="section text-center" style={{ paddingTop: "160px" }}>
        <div className="container">
          <p className="section-subtitle label-2">Our Work</p>
          <h1 className="headline-1 section-title">Project Portfolio</h1>
          <p className="section-text">
            Completed projects across Seremban and Kuala Lumpur, filterable by service type.
          </p>
          {!isLiveData && (
            <p className="body-4" style={{ opacity: 0.6, marginTop: "8px" }}>
              Showing demo placeholder projects — connect the Facebook sync (see README) to show real projects.
            </p>
          )}

          <div className="portfolio-filters">
            <button
              className={`portfolio-filter-btn${activeCategory === "All" ? " active" : ""}`}
              onClick={() => setActiveCategory("All")}
            >
              All
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`portfolio-filter-btn${activeCategory === cat ? " active" : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="portfolio-map-wrapper">
            <MapContainer center={MAP_CENTER} zoom={9} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {filtered.map((p) => (
                <Marker key={p.id} position={[p.lat, p.lng]} icon={markerIcon}>
                  <Popup>
                    <strong>{p.title}</strong>
                    <br />
                    {p.category}
                    <br />
                    {p.address}
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>

          <ul className="portfolio-grid">
            {filtered.map((p) => (
              <li key={p.id}>
                <div className="portfolio-card">
                  <div className="portfolio-card-banner">
                    <img src={p.image} alt={p.title} loading="lazy" />
                    <span className="portfolio-card-category">{p.category}</span>
                  </div>
                  <div className="portfolio-card-content">
                    <h3 className="title-4">{p.title}</h3>
                    <p className="body-4" style={{ opacity: 0.7 }}>{p.address}</p>
                  </div>
                </div>
              </li>
            ))}
            {filtered.length === 0 && <p className="section-text">No projects in this category yet.</p>}
          </ul>
        </div>
      </section>
    </>
  );
}
