import SEOHead from "../components/SEOHead.jsx";

// PLACEHOLDER copy — replace the numbers/years/team size with your real details.
const stats = [
  { value: "10+", label: "Years of Expertise" },
  { value: "500+", label: "Projects Completed" },
  { value: "2", label: "Locations (Seremban & KL)" },
];

const values = [
  {
    icon: "construct-outline",
    title: "One-Stop Renovation",
    text: "From plaster ceiling and electrical to painting, flooring, and custom furniture — one team handles the whole project.",
  },
  {
    icon: "time-outline",
    title: "On-Time Delivery",
    text: "Clear timelines set upfront, with regular updates so you always know where your project stands.",
  },
  {
    icon: "pricetags-outline",
    title: "Transparent Pricing",
    text: "Detailed quotations with no hidden costs — what's agreed is what you pay.",
  },
  {
    icon: "shield-checkmark-outline",
    title: "Quality Materials",
    text: "We work with trusted suppliers and durable, low-maintenance materials built to last.",
  },
];

export default function About() {
  return (
    <>
      <SEOHead
        title="About Us"
        description="Learn about BGL Design & Build - a renovation company serving Seremban and Kuala Lumpur with wall panels, custom furniture, ceilings, electrical, flooring and painting services."
        path="/about"
      />

      <section className="section text-center" style={{ paddingTop: "160px" }}>
        <div className="container">
          <p className="section-subtitle label-2">Who We Are</p>
          <h1 className="headline-1 section-title">About BGL Design &amp; Build</h1>
          <p className="section-text">
            BGL Design &amp; Build is a renovation company based in Seremban with a showroom in
            Kuala Lumpur. We handle everything from plaster ceilings and electrical works to wall
            panels, flooring, painting, custom furniture, and deep cleaning — so homeowners don't
            have to juggle multiple contractors. <br />
            <em>(Replace this paragraph with your own founding story, mission, or what makes BGL different.)</em>
          </p>

          <ul className="grid-list" style={{ marginTop: "40px" }}>
            {stats.map((s) => (
              <li key={s.label}>
                <p className="display-2" style={{ color: "var(--gold-crayola)" }}>{s.value}</p>
                <p className="label-1">{s.label}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section bg-black-10 text-center">
        <div className="container">
          <p className="section-subtitle label-2">Why Choose BGL</p>
          <h2 className="headline-1 section-title">Our Values</h2>

          <ul className="grid-list">
            {values.map((v) => (
              <li className="feature-item" key={v.title}>
                <div className="feature-card">
                  <div className="card-icon">
                    <ion-icon name={v.icon} style={{ fontSize: "48px" }} aria-hidden="true"></ion-icon>
                  </div>
                  <h3 className="title-2 card-title">{v.title}</h3>
                  <p className="label-1 card-text">{v.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
