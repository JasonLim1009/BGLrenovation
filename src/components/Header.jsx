import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SearchBox from "./SearchBox.jsx";
import LanguageSwitcher from "./LanguageSwitcher.jsx";
import { useLanguage } from "../i18n/LanguageContext.jsx";
import "./header-actions.css";

const navLinks = (t) => [
  { to: "/", label: t("nav_home") },
  { to: "/service", label: t("nav_service") },
  { to: "/portfolio", label: t("nav_portfolio") },
  { to: "/contact", label: t("nav_contact") },
  {
    to: "https://www.facebook.com/share/17U3o6vzf5/?mibextid=wwXIfr",
    label: t("nav_facebook"),
    external: true,
  },
  {
    to: "https://www.xiaohongshu.com/user/profile/64de29ed00000000010120af?xsec_token=YBmpEAnl3p42i-dpyig4Y3bc-_qrDQNthZUKfXKLdfS5U=&xsec_source=app_share&xhsshare=CopyLink&appuid=64de29ed00000000010120af&apptime=1753355840&share_id=2495bc5327b84ddbb9093ee2a1bfa8bd",
    label: t("nav_xiaohongshu"),
    external: true,
  },
  { to: "https://wa.me/60106668311", label: t("nav_whatsapp"), external: true },
];

export default function Header() {
  const location = useLocation();
  const { t } = useLanguage();
  const [navActive, setNavActive] = useState(false);
  const [headerActive, setHeaderActive] = useState(false);
  const [headerHidden, setHeaderHidden] = useState(false);
  const lastScrollPos = useRef(0);

  const toggleNavbar = () => {
    setNavActive((prev) => {
      const next = !prev;
      document.body.classList.toggle("nav-active", next);
      return next;
    });
  };

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY >= 50) {
        setHeaderActive(true);
        const isScrollingDown = lastScrollPos.current < window.scrollY;
        setHeaderHidden(isScrollingDown);
      } else {
        setHeaderActive(false);
        setHeaderHidden(false);
      }
      lastScrollPos.current = window.scrollY;
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile nav whenever the route changes
  useEffect(() => {
    setNavActive(false);
    document.body.classList.remove("nav-active");
  }, [location.pathname]);

  const isHome = location.pathname === "/";
  const ctaTo = isHome ? "/service" : "/";
  const ctaLabel = isHome ? t("cta_find_service") : t("cta_home");
  const links = navLinks(t);

  return (
    <header
      className={`header${headerActive ? " active" : ""}${headerHidden ? " hide" : ""}`}
    >
      <div className="container">
        <Link to="/" className="logo">
          <img src="/bgllogos.png" width="160" height="160" alt="BGL Design & Build - Home" />
        </Link>

        <nav className={`navbar${navActive ? " active" : ""}`}>
          <button className="close-btn" aria-label="close menu" onClick={toggleNavbar}>
            <ion-icon name="close-outline" aria-hidden="true"></ion-icon>
          </button>

          {/* mobile logo */}
          <Link to="/" className="logo">
            <img src="/bgllogos.png" width="160" height="160" alt="BGL Design & Build - Home" />
          </Link>

          <ul className="navbar-list">
            {links.map((link) => (
              <li className="navbar-item" key={link.label}>
                {link.external ? (
                  <a href={link.to} className="navbar-link hover-underline" target="_blank" rel="noreferrer">
                    <div className="separator"></div>
                    <span className="span">{link.label}</span>
                  </a>
                ) : (
                  <Link
                    to={link.to}
                    className={`navbar-link hover-underline${location.pathname === link.to ? " active" : ""}`}
                  >
                    <div className="separator"></div>
                    <span className="span">{link.label}</span>
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <div className="text-center">
            <p className="headline-1 navbar-title">{t("visit_us")}</p>

            <address className="body-4">
              53-G, JALAN KS 5, <br />KEPAYANG SENTRAL, <br />
              70200 SEREMBAN, N.S.D.K MALAYSIA.
            </address>

            <p className="section-subtitle label-2 text-center">{t("showroom")}</p>

            <address className="body-4">
              17, JALAN PANDAN INDAH 1/11A, <br />PANDAN INDAH, <br />
              55100 KUALA LUMPUR.
            </address>

            <p className="section-subtitle label-2 text-center">{t("office_staff_only")}</p>

            <p className="body-4 navbar-text">
              Open: 10.00 am - 6.00pm <br /> (Monday to Friday)
              <br />Appointment: (Sat &amp; Sunday)
            </p>

            <a href="mailto:Bglrenovation@gmail.com" className="body-4 sidebar-link">
              Bglrenovation@gmail.com
            </a>

            <div className="separator"></div>

            <p className="contact-label">{t("booking_request")}</p>

            <a href="tel:+60106668311" className="body-1 contact-number hover-underline">
              +60 10 666 8311
            </a>
          </div>
        </nav>

        <div className="header-actions">
          <LanguageSwitcher />
          <SearchBox />

          <Link to={ctaTo} className="btn btn-secondary">
            <span className="text text-1">{ctaLabel}</span>
            <span className="text text-2" aria-hidden="true">{ctaLabel}</span>
          </Link>

          <button className="nav-open-btn" aria-label="open menu" onClick={toggleNavbar}>
            <span className="line line-1"></span>
            <span className="line line-2"></span>
            <span className="line line-3"></span>
          </button>
        </div>

        <div
          className={`overlay${navActive ? " active" : ""}`}
          onClick={toggleNavbar}
        ></div>
      </div>
    </header>
  );
}
