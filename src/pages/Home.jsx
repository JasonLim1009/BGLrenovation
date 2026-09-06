import HeroSlider from "../components/HeroSlider.jsx";
import CountUp from "../components/CountUp.jsx";
import SEOHead from "../components/SEOHead.jsx";
import Testimonials from "../components/Testimonials.jsx";
import BeforeAfter from "../components/BeforeAfter.jsx";
import { Link } from "react-router-dom";

const heroSlides = [
  {
    img: "/assets/images/product-1.jpeg",
    subtitleClass: "label-1",
    subtitle: "PS PANEL",
    title: "Elevate Your Walls",
    text: "Discover Our PS Panel Series",
  },
  {
    img: "/assets/images/product-2.jpeg",
    subtitle: "PU PANEL",
    title: "Create Luxury Effortlessly",
    text: "with PU Panels",
  },
  {
    img: "/assets/images/product-3.jpeg",
    subtitle: "Furniture & Cabinet",
    title: "Great Furniture & Cabinet",
    text: "Define Great Spaces",
  },
];

const stats = [
  { count: 2599, prefix: "$", suffix: "+", text: "Condo Painting" },
  { count: 10000, prefix: "$", suffix: "+", text: "Landed Painting" },
  { count: 30000, prefix: "$", suffix: "+", text: "Condo Furniture" },
  { count: 80000, prefix: "$", suffix: "+", text: "Landed Furniture" },
];

const serviceCards = [
  {
    img: "/assets/images/pspanel.jpeg",
    alt: "PS PANEL",
    title: "PS PANEL",
    spec: "(W)120MM * (T)12MM * (L)2900MM",
  },
  {
    img: "/assets/images/pupanel.jpeg",
    alt: "PU PANEL",
    title: "PU PANEL",
    spec: "(W)600MM * (L)1200MM",
  },
  {
    img: "/assets/images/cabinet.jpeg",
    alt: "ION PAINT",
    title: "Furniture & Cabinet",
    spec: "Customized",
  },
];

const features = [
  {
    icon: "/assets/images/office.png",
    hasCount: true,
    title: "Year of Expertise",
    text: "Proven expertise in home renovation and space design.",
  },
  {
    icon: "/assets/images/solutions.png",
    title: "Tailored Solutions",
    text: "Every panel and furniture piece is custom-fit to your layout.",
  },
  {
    icon: "/assets/images/concept.png",
    title: "Seamless Project Handling",
    text: "From concept to installation, we handle it all - hassle-free.",
  },
  {
    icon: "/assets/images/certificate.png",
    title: "Quality Materials Only",
    text: "We select durable, stylish and low-maintenance materials.",
  },
];

// PLACEHOLDER pairs — these reuse existing gallery photos just to demo the
// slider. Swap in real "before" (site condition) + "after" (completed) shots
// from the same project for this to actually be persuasive.
const beforeAfterPairs = [
  { before: "/assets/images/Ceiling/c1.jpeg", after: "/assets/images/Ceiling/c10.jpeg", label: "Ceiling & Electrical" },
  { before: "/assets/images/Polish/l1.jpeg", after: "/assets/images/Polish/l10.jpeg", label: "Flooring & Polish" },
  { before: "/assets/images/Tiles/T1.jpeg", after: "/assets/images/Tiles/T10.jpeg", label: "Tiling" },
];

const events = [
  {
    img: "/assets/images/psproject.jpeg",
    alt: "PU Panel walls - a perfect match for fine wine.",
    date: "2024-10-09",
    dateLabel: "09/10/2024",
    subtitle: "Premium Office",
    title: "Textured PS wall panels give this space warmth and elegance.",
  },
  {
    img: "/assets/images/wine.jpeg",
    alt: "ION WOOD for the ceiling, walls and flooring.",
    date: "2025-05-25",
    dateLabel: "20/05/2025",
    subtitle: "Wine Area",
    title: "Stylish PU wall panels elevate this wine nook into a statement piece.",
  },
  {
    img: "/assets/images/kitchencabinetproject.jpeg",
    alt: "Entire building coated with ION PAINT for a healthier, lasting finish.",
    date: "2025-06-18",
    dateLabel: "18/06/2025",
    subtitle: "Kitchen Area",
    title: "Every shelf and surface is designed to match the client's lifestyle.",
  },
];

export default function Home() {
  return (
    <>
      <SEOHead
        title="Home"
        description="BGL Design & Build - renovation, wall panels, custom furniture, plaster ceiling, electrical, flooring, painting & deep cleaning in Seremban and Kuala Lumpur."
        path="/"
      />
      <HeroSlider slides={heroSlides} />

      <div className="stats-container">
        {stats.map((s) => (
          <div className="stat-box" key={s.text}>
            <p className="stat-value">
              <CountUp target={s.count} prefix={s.prefix} suffix={s.suffix} mode="stat" />
            </p>
            <p className="stat-text">{s.text}</p>
          </div>
        ))}
      </div>

      {/* #SERVICE */}
      <section className="section service bg-black-10 text-center" aria-label="service">
        <div className="container">
          <p className="section-subtitle label-2">Luxury Materials for the Elite</p>
          <h2 className="headline-1 section-title">We Offer Top Notch</h2>
          <p className="section-text">
            Sleek wall panels. Durable floors. Custom cabinets. <br />
            Refined selections for highend homes <br />and boutique spaces. <br />
            Built to impress. Crafted to last.
          </p>

          <ul className="grid-list">
            {serviceCards.map((c) => (
              <li key={c.title}>
                <div className="service-card">
                  <a className="has-before hover:shine">
                    <figure className="card-banner img-holder" style={{ "--width": 285, "--height": 336 }}>
                      <img src={c.img} width="285" height="336" loading="lazy" alt={c.alt} className="img-cover" />
                    </figure>
                  </a>
                  <div className="card-content">
                    <h3 className="title-4 card-title">{c.title}</h3>
                    <div className="btn-text hover-underline label-2">{c.spec}</div>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <img src="/assets/images/shape-1.png" width="246" height="412" loading="lazy" alt="shape" className="shape shape-1 move-anim" />
          <img src="/assets/images/shape-2.png" width="343" height="345" loading="lazy" alt="shape" className="shape shape-2 move-anim" />
        </div>
      </section>

      {/* #ABOUT */}
      <section className="section about text-center" aria-labelledby="about-label" id="about">
        <div className="container">
          <div className="about-content">
            <p className="label-2 section-subtitle" id="about-label">
              Crafting Spcase with Purpose &amp; Precision
            </p>
            <p className="section-text">
              With years of renovation expertise, we unite design, build, and management to
              deliver every home or resort with care and precision.
            </p>
            <div className="contact-label">Book Through Call</div>
            <a href="tel:+60106668311" className="body-1 contact-number hover-underline">
              +60 10 666 8311
            </a>
          </div>

          <div className="special-dish-banner">
            <img
              src="/assets/images/kitchencabinet.jpeg"
              style={{ width: "940", height: "auto" }}
              loading="lazy"
              alt="special dish"
              className="img-cover"
            />
          </div>
          <img src="/assets/images/shape-3.png" width="197" height="194" loading="lazy" alt="" className="shape" />
        </div>
      </section>

      {/* #SPECIAL DISH */}
      <section className="special-dish text-center" aria-labelledby="dish-label">
        <div className="special-dish-banner">
          <img src="/assets/images/floorplans.png" width="940" height="900" loading="lazy" alt="special dish" className="img-cover" />
        </div>

        <div className="special-dish-content bg-black-10">
          <div className="container">
            <img src="/assets/images/badge-1.png" width="28" height="41" loading="lazy" alt="badge" className="abs-img" />
            <p className="section-subtitle label-2">Smart Materials &amp; Thoughtful Craftsmanship</p>
            <p className="section-text">
              We use durable, moisture-resistant materials with flawless finishes. From design to
              build, every space is made to perform beautifully.
            </p>
            <div className="wrapper">
              <del className="del body-3">Ordinary Build Quality</del>
              <span className="span body-1">Smart Surface Finished</span>
            </div>
            <p className="menu-text text-center">
              During opening daily from <span className="span">10:00 am</span> to{" "}
              <span className="span">6:00 pm</span>
            </p>
          </div>
        </div>

        <img src="/assets/images/shape-4.png" width="179" height="359" loading="lazy" alt="" className="shape shape-1" />
        <img src="/assets/images/shape-9.png" width="351" height="462" loading="lazy" alt="" className="shape shape-2" />
      </section>

      {/* #BEFORE & AFTER */}
      <section className="section text-center" aria-label="before and after">
        <div className="container">
          <p className="section-subtitle label-2">See The Difference</p>
          <h2 className="headline-1 section-title">Before &amp; After</h2>
          <p className="section-text">Drag the slider to compare.</p>

          <BeforeAfter pairs={beforeAfterPairs} />
        </div>
      </section>

      {/* #FEATURES */}
      <section className="section features text-center" aria-label="features">
        <div className="container">
          <p className="section-subtitle label-2">Why Choose Us</p>
          <h2 className="headline-1 section-title">Our Strength</h2>

          <ul className="grid-list">
            {features.map((f) => (
              <li className="feature-item" key={f.title}>
                <div className="feature-card">
                  <div className="card-icon">
                    <img src={f.icon} width="100" height="80" loading="lazy" alt="icon" />
                  </div>
                  <h3 className="title-2 card-title">
                    {f.hasCount ? (
                      <>
                        <span className="count">
                          <CountUp target={10} mode="feature" speed={200} />
                        </span>{" "}
                        {f.title}
                      </>
                    ) : (
                      f.title
                    )}
                  </h3>
                  <p className="label-1 card-text">{f.text}</p>
                </div>
              </li>
            ))}
          </ul>

          <img src="/assets/images/shape-7.png" width="208" height="178" loading="lazy" alt="shape" className="shape shape-1" />
          <img src="/assets/images/shape-8.png" width="120" height="115" loading="lazy" alt="shape" className="shape shape-2" />
        </div>
      </section>

      <Testimonials />

      {/* #EVENT */}
      <section className="section event bg-black-10" aria-label="event" id="our">
        <div className="container">
          <p className="section-subtitle label-2 text-center">Coming Soon</p>
          <h2 className="section-title headline-1 text-center">Designs Worth Showcasing</h2>

          <ul className="grid-list">
            {events.map((e) => (
              <li key={e.title}>
                <div className="event-card has-before hover:shine">
                  <div className="card-banner img-holder" style={{ "--width": 350, "--height": 450 }}>
                    <img src={e.img} width="350" height="450" loading="lazy" alt={e.alt} className="img-cover" />
                    <time className="publish-date label-2" dateTime={e.date}>{e.dateLabel}</time>
                  </div>
                  <div className="card-content">
                    <p className="card-subtitle label-2 text-center">{e.subtitle}</p>
                    <h3 className="card-title title-2 text-center">{e.title}</h3>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <Link to="/service" className="btn btn-primary">
            <span className="text text-1">Coming Soon</span>
            <span className="text text-2" aria-hidden="true">Coming Soon</span>
          </Link>
        </div>
      </section>
    </>
  );
}
