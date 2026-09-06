import { useState } from "react";
import SEOHead from "../components/SEOHead.jsx";
import "./faq.css";

// PLACEHOLDER answers — please review/edit these to match your actual policies
// (pricing model, deposit %, warranty period, etc.) before publishing.
const faqs = [
  {
    q: "How is the renovation quote calculated?",
    a: "Pricing depends on the scope of work (square footage, materials chosen, and complexity). Contact us on WhatsApp with your unit size and requirements for a free estimate.",
  },
  {
    q: "How long does a typical renovation take?",
    a: "It varies by scope — a single room (e.g. kitchen cabinets) may take 1–2 weeks, while a full unit renovation can take 4–8 weeks. We'll give you a project-specific timeline before starting.",
  },
  {
    q: "Do you provide a warranty on completed work?",
    a: "Yes, workmanship is covered under warranty. Ask our team for the specific warranty period for your scope of work.",
  },
  {
    q: "Can I pay in installments?",
    a: "Payment is typically staged by project milestones (deposit, progress payments, final payment on completion). Speak with our consultants for the payment schedule.",
  },
  {
    q: "Do you service both landed houses and condos?",
    a: "Yes, we handle both landed houses and condominiums/apartments across Seremban and Kuala Lumpur.",
  },
  {
    q: "Can I see samples before deciding on materials?",
    a: "Yes — visit our showroom at Pandan Indah, Kuala Lumpur, or our office in Kepayang Sentral, Seremban, to view panel finishes, tiles, and cabinet samples in person.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <>
      <SEOHead
        title="FAQ"
        description="Frequently asked questions about BGL Design & Build renovation services - pricing, timelines, warranty and payment."
        path="/faq"
      />

      <section className="section text-center" style={{ paddingTop: "160px" }}>
        <div className="container">
          <p className="section-subtitle label-2">Got Questions?</p>
          <h1 className="headline-1 section-title">Frequently Asked Questions</h1>

          <div className="faq-list">
            {faqs.map((item, i) => (
              <div className={`faq-item${openIndex === i ? " open" : ""}`} key={item.q}>
                <button
                  className="faq-question"
                  onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                  aria-expanded={openIndex === i}
                >
                  <span>{item.q}</span>
                  <ion-icon name={openIndex === i ? "remove-outline" : "add-outline"} aria-hidden="true"></ion-icon>
                </button>
                {openIndex === i && <p className="faq-answer">{item.a}</p>}
              </div>
            ))}
          </div>

          <p className="section-text" style={{ marginTop: "40px" }}>
            Still have questions?{" "}
            <a href="https://wa.me/60106668311" target="_blank" rel="noreferrer" className="hover-underline">
              Chat with us on WhatsApp
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
