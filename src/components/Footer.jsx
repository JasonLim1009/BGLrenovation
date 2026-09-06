import { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../i18n/LanguageContext.jsx";

export default function Footer() {
  const [email, setEmail] = useState("");
  const { t } = useLanguage();

  const handleSubscribe = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`网站客户留言 - 请求联系`);
    const body = encodeURIComponent(
      `有客户在网站留下了联系方式,请尽快跟进。\n\n 客户邮箱: ${email}\n\n Your WhatsApp Number: \n Which type of Renovation do you need?  \n\n How many Square Feet:  \n Is it a Landed House / Condo: \n Which area is it Located in: `
    );
    window.location.href = `mailto:bglrenovation@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <footer
      className="footer section has-bg-image text-center"
      style={{ backgroundImage: "url('/assets/images/footer-bg.jpg')" }}
    >
      <div className="container">
        <div className="footer-top grid-list">
          <div className="footer-brand has-before has-after">
            <a href="#" className="logo">
              <img src="/bgllogos.png" width="110" height="10" loading="lazy" alt="BGL Design & Build - Home" />
            </a>

            <address className="body-4">
              17, JALAN PANDAN INDAH 1/11A, <br />PANDAN INDAH, <br />
              55100 KUALA LUMPUR.
            </address>

            <p className="section-subtitle label-2 text-center">{t("office_staff_only")}</p>

            <address className="body-4">
              53-G, JALAN KS 5, <br />KEPAYANG SENTRAL, <br />
              70200 SEREMBAN, N.S.D.K MALAYSIA.
            </address>

            <p className="section-subtitle label-2 text-center">{t("showroom")}</p>

            <a href="mailto:Bglrenovation@gmail.com" className="body-4 contact-link">
              Bglrenovation@gmail.com
            </a>

            <a href="tel:+60106668311" className="body-4 contact-link">
              Booking Request : +60 10 666 8311
            </a>

            <p className="body-4">
              Open: 10.00 am - 6.00pm <br /> (Monday to Friday)
              <br />Appointment: (Sat &amp; Sunday)
            </p>

            <div className="wrapper">
              <div className="separator"></div>
              <div className="separator"></div>
              <div className="separator"></div>
            </div>

            <p className="title-1">{t("footer_get_in_touch")}</p>

            <p className="label-1">{t("footer_leave_email")}</p>

            <form id="subscribe-form" className="input-wrapper" onSubmit={handleSubscribe}>
              <div className="icon-wrapper">
                <ion-icon name="mail-outline" aria-hidden="true"></ion-icon>
                <input
                  type="email"
                  id="user-email"
                  placeholder="Your email"
                  required
                  className="input-field"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <button type="submit" className="btn btn-secondary">
                <span className="text text-1">{t("footer_send")}</span>
                <span className="text text-2" aria-hidden="true">{t("footer_send")}</span>
              </button>
            </form>
          </div>

          <ul className="footer-list">
            <li>
              <Link to="/" className="label-2 footer-link hover-underline">{t("nav_home")}</Link>
            </li>
            <li>
              <Link to="/service" className="label-2 footer-link hover-underline">{t("nav_service")}</Link>
            </li>
            <li>
              <Link to="/portfolio" className="label-2 footer-link hover-underline">{t("nav_portfolio")}</Link>
            </li>
            <li>
              <Link to="/contact" className="label-2 footer-link hover-underline">{t("nav_contact")}</Link>
            </li>
          </ul>

          <ul className="footer-list">
            <li>
              <a
                href="https://www.facebook.com/share/17U3o6vzf5/?mibextid=wwXIfr"
                className="label-2 footer-link hover-underline"
                target="_blank"
                rel="noreferrer"
              >
                Facebook
              </a>
            </li>
            <li>
              <a
                href="https://www.xiaohongshu.com/user/profile/64de29ed00000000010120af"
                className="label-2 footer-link hover-underline"
                target="_blank"
                rel="noreferrer"
              >
                小红书
              </a>
            </li>
            <li>
              <a
                href="https://maps.app.goo.gl/r6jQLjHNB4ydMgqD9"
                className="label-2 footer-link hover-underline"
                target="_blank"
                rel="noreferrer"
              >
                Google Map
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-bottom">
          <p className="copyright">{t("footer_copyright")}</p>
        </div>
      </div>
    </footer>
  );
}
