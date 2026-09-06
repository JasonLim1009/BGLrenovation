import HeroSlider from "../components/HeroSlider.jsx";
import SEOHead from "../components/SEOHead.jsx";
import "./contact.css";

const heroSlides = [
  {
    img: "/assets/images/Service/contact1.jpeg",
    subtitleClass: "label-1",
    subtitle: "Kitchen",
    title: "Complete Kitchen Makeovers",
    text: "Tailored for Modern Living",
  },
  {
    img: "/assets/images/Service/contact2.jpeg",
    subtitle: "Living Room",
    title: "Redefine Your Living Room",
    text: "With Seamless Wall & Ceiling Design",
  },
  {
    img: "/assets/images/Service/contact3.jpeg",
    subtitle: "Bedroom",
    title: "Elevate Your Bedroom",
    text: "With Custom Panels & Smart Storage",
  },
];

const contacts = [
  { label: "Customer Service Line", phone: "+60 10 666 8311", href: "https://wa.me/60106668311" },
  { label: "Su Tan (Consultant)", phone: "+6019 831 6819", href: "https://wa.me/60198316819" },
  { label: "Jason Lim (Consultant)", phone: "+6016 760 4329", href: "https://wa.me/60167604329" },
];

export default function Contact() {
  return (
    <>
      <SEOHead
        title="Contact Us"
        description="Contact BGL Design & Build via WhatsApp for renovation quotes in Seremban and Kuala Lumpur."
        path="/contact"
      />
      <HeroSlider slides={heroSlides} />

      <section className="section service bg-black-10 text-center" aria-label="service">
        <div className="container">
          <p className="section-subtitle label-2">Contact US</p>
          <h2 className="headline-1 section-title">WhatsApp US</h2>

          {contacts.map((c) => (
            <div key={c.label}>
              <p className="contact-label">{c.label}</p>
              <a href={c.href} className="body-1 contact-number hover-underline" target="_blank" rel="noreferrer">
                {c.phone}
              </a>
            </div>
          ))}

          <img src="/assets/images/shape-1.png" width="246" height="412" loading="lazy" alt="shape" className="shape shape-1 move-anim" />
          <img src="/assets/images/shape-2.png" width="343" height="345" loading="lazy" alt="shape" className="shape shape-2 move-anim" />
        </div>
      </section>

      <section className="section text-center" aria-label="map">
        <div className="container">
          <p className="section-subtitle label-2">Find Us</p>
          <h2 className="headline-1 section-title">Visit Our Showroom</h2>

          <div className="map-embed-wrapper">
            <iframe
              title="BGL Design & Build - Seremban location"
              src="https://www.google.com/maps?q=53-G%2C+Jalan+KS+5%2C+Kepayang+Sentral%2C+70200+Seremban%2C+Negeri+Sembilan&output=embed"
              width="100%"
              height="400"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          <a
            href="https://maps.app.goo.gl/r6jQLjHNB4ydMgqD9"
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary"
            style={{ marginTop: "24px" }}
          >
            <span className="text text-1">Open in Google Maps</span>
            <span className="text text-2" aria-hidden="true">Open in Google Maps</span>
          </a>
        </div>
      </section>
    </>
  );
}
