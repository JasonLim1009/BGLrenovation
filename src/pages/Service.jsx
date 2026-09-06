import HeroSlider from "../components/HeroSlider.jsx";
import CountUp from "../components/CountUp.jsx";
import SEOHead from "../components/SEOHead.jsx";
import GalleryCategory from "../components/GalleryCategory.jsx";
import { galleries } from "../data/swiperData.js";
import "swiper/css";
import "swiper/css/pagination";
import "./service.css";

const heroSlides = [
  {
    img: "/assets/images/Service/Service1.jpeg",
    subtitleClass: "label-1",
    subtitle: "Top Ceilings",
    title: "Seamless Ceiling & Electrical Works",
    text: "Tailored for Modern Interiors",
  },
  {
    img: "/assets/images/Service/Service2.jpeg",
    subtitle: "PANEL on The Wall",
    title: "Elevate Your Interiors",
    text: "with Precision Wall Panel Systems",
  },
  {
    img: "/assets/images/Service/Service3.jpeg",
    subtitle: "Floor Design Combination",
    title: "Custom Cabinets. Premium Flooring.",
    text: "Crafted for Durability & Style.",
  },
  {
    img: "/assets/images/Service/Service4.jpeg",
    subtitle: "Deep Cleaning for Every Corner",
    title: "Deep Cleaning Solutions",
    text: "For Healthier, Spotless Spaces",
  },
];

const statRows = [
  [
    { label: "Plaster Ceiling (condo)", count: 0 },
    { label: "Electrical (condo)", count: 0 },
    { label: "Plumbing", count: 0 },
    { label: "Coring", count: 0 },
  ],
  [
    { label: "Painting (condo)", count: 2599 },
    { label: "Defect Checking", count: 300 },
    { label: "3D Drawings", count: 99 },
  ],
  [
    { label: "Wall Panel", count: 0 },
    { label: "Flooring", count: 0 },
    { label: "Polish", count: 0 },
    { label: "Curtain", count: 0 },
    { label: "Aluminum", count: 0 },
  ],
  [
    { label: "Cabinet", count: 0 },
    { label: "Deep Clean Service", count: 0 },
  ],
];

export default function Service() {
  return (
    <>
      <SEOHead
        title="Service"
        description="Explore BGL Design & Build's renovation services: ceiling & electrical, painting, wall panels, tiles, flooring, polish, cabinets, curtains and aluminum works."
        path="/service"
      />
      <HeroSlider slides={heroSlides} />

      {statRows.map((row, i) => (
        <div className="stats-container" key={i}>
          {row.map((s) => (
            <div className="stat-box" key={s.label}>
              <p className="stat-value">
                <CountUp target={s.count} prefix="$" suffix="+" mode="stat" />
              </p>
              <p className="stat-text">{s.label}</p>
            </div>
          ))}
        </div>
      ))}

      <section className="section service bg-black-10 text-center" aria-label="service">
        <div className="container">
          <p className="section-subtitle label-2">View More</p>
          <h2 className="headline-1 section-title">Designs Worth Showcasing</h2>
          <p className="section-text">
            One-Stop Interior Solutions — <br />
            Plaster Ceiling, Electrical, Painting, Wall Panels, Tiling, <br />
            Flooring, Polishing, Custom Cabinets, Curtains &amp; Aluminum Works. <br />
            Built to last, crafted with precision.
          </p>

          <div className="swiper-grid">
            {galleries.map((gallery, i) => (
              <GalleryCategory key={gallery.cls} gallery={gallery} delay={5000 + i * 500} />
            ))}
          </div>

          <img src="/assets/images/shape-1.png" width="246" height="412" loading="lazy" alt="shape" className="shape shape-1 move-anim" />
          <img src="/assets/images/shape-2.png" width="343" height="345" loading="lazy" alt="shape" className="shape shape-2 move-anim" />
        </div>
      </section>
    </>
  );
}
