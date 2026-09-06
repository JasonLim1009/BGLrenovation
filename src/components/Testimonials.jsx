import "./testimonials.css";

// PLACEHOLDER content — swap these for real customer quotes/photos.
// Consider pulling actual reviews from your Google Business Profile or WhatsApp chats.
const testimonials = [
  {
    name: "Mr. Tan",
    project: "Condo, Seremban",
    quote:
      "整个装修过程很顺利,师傅做工细致,PS Panel 效果比我想象中更好看,推荐给朋友们了。",
  },
  {
    name: "Puan Aminah",
    project: "Landed House, KL",
    quote:
      "BGL team was responsive and finished the ceiling & electrical work on schedule. Very happy with the result.",
  },
  {
    name: "Ms. Lee",
    project: "Condo, Pandan Indah",
    quote:
      "从报价到完工都很透明,没有中途加价的情况,厨房橱柜做得很扎实。",
  },
];

export default function Testimonials() {
  return (
    <section className="section testimonials text-center" aria-label="testimonials">
      <div className="container">
        <p className="section-subtitle label-2">What Our Clients Say</p>
        <h2 className="headline-1 section-title">Trusted By Homeowners</h2>

        <ul className="grid-list testimonials-grid">
          {testimonials.map((t) => (
            <li key={t.name}>
              <div className="testimonial-card">
                <ion-icon name="star" aria-hidden="true" className="testimonial-star"></ion-icon>
                <ion-icon name="star" aria-hidden="true" className="testimonial-star"></ion-icon>
                <ion-icon name="star" aria-hidden="true" className="testimonial-star"></ion-icon>
                <ion-icon name="star" aria-hidden="true" className="testimonial-star"></ion-icon>
                <ion-icon name="star" aria-hidden="true" className="testimonial-star"></ion-icon>
                <p className="testimonial-quote">"{t.quote}"</p>
                <p className="testimonial-name">{t.name}</p>
                <p className="testimonial-project">{t.project}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
