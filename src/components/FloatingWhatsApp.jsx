import "./floating-whatsapp.css";

export default function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/60106668311"
      className="floating-whatsapp-btn"
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with us on WhatsApp"
    >
      <ion-icon name="logo-whatsapp" aria-hidden="true"></ion-icon>
    </a>
  );
}
